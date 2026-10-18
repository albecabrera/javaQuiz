/* Browser-only Monaco adapter. It deliberately has no CDN or language-server fallback. */
(function exposeEditorAdapter(global) {
  "use strict";

  let loaderPromise;
  let editor;
  let model;
  let socket;
  let reconnectTimer;
  let editorContainer;
  let reconnectAttempt = 0;
  const notify = (message) => global.dispatchEvent && global.dispatchEvent(new CustomEvent("devquiz-editor-status", { detail: message }));

  function loadMonaco() {
    if (global.monaco) return Promise.resolve(global.monaco);
    if (loaderPromise) return loaderPromise;
    if (!global.require) return Promise.reject(new Error("Monaco loader is unavailable"));
    global.require.config({ paths: { vs: "/vendor/vs" } });
    loaderPromise = new Promise((resolve, reject) => global.require(["vs/editor/editor.main"], resolve, reject));
    return loaderPromise;
  }

  function scheduleReconnect() {
    if (reconnectTimer || !model || !global.WebSocket) return;
    if (socket) {
      try { socket.close(); } catch {}
      return;
    }
    const delay = Math.min(1000 * (2 ** reconnectAttempt), 10000);
    reconnectAttempt = Math.min(reconnectAttempt + 1, 4);
    notify({ state: "connecting", text: "JDT LS wird neu verbunden…" });
    reconnectTimer = setTimeout(() => { reconnectTimer = null; connect(); }, delay);
  }

  function connect() {
    if (socket || !global.WebSocket) return;
    const protocol = global.location && global.location.protocol === "https:" ? "wss:" : "ws:";
    socket = new global.WebSocket(`${protocol}//${global.location.host}/lsp`);
    socket.addEventListener("open", () => {
      reconnectAttempt = 0;
      notify({ state: "connecting", text: "JDT LS verbindet…" });
    });
    socket.addEventListener("message", (event) => {
      let message;
      try { message = JSON.parse(event.data); } catch { return; }
      if (message.type === "ready") {
        send({ type: "change", source: model.getValue() });
        notify({ state: "ready", text: "JDT LS bereit · Live-Diagnosen aktiv" });
      }
      else if (message.type === "diagnostics") applyDiagnostics(message.diagnostics || []);
      else if (message.type === "error") scheduleReconnect();
    });
    socket.addEventListener("error", () => scheduleReconnect());
    socket.addEventListener("close", () => { socket = null; scheduleReconnect(); });
  }

  function send(message) { if (socket && socket.readyState === 1) socket.send(JSON.stringify(message)); }
  function applyDiagnostics(diagnostics) {
    if (!global.monaco || !model) return;
    global.monaco.editor.setModelMarkers(model, "jdtls", diagnostics.map((diagnostic) => ({
      message: diagnostic.message || "Java-Fehler",
      severity: diagnostic.severity === 2 ? global.monaco.MarkerSeverity.Warning : global.monaco.MarkerSeverity.Error,
      startLineNumber: (diagnostic.range && diagnostic.range.start.line || 0) + 1,
      startColumn: (diagnostic.range && diagnostic.range.start.character || 0) + 1,
      endLineNumber: (diagnostic.range && diagnostic.range.end.line || 0) + 1,
      endColumn: (diagnostic.range && diagnostic.range.end.character || 0) + 1,
    })));
  }
  function selectRange(start, end) {
    if (!editor || !model) return;
    editor.setSelection({ startLineNumber: model.getPositionAt(start).lineNumber, startColumn: model.getPositionAt(start).column, endLineNumber: model.getPositionAt(end).lineNumber, endColumn: model.getPositionAt(end).column });
    editor.focus();
  }

  function adaptEditorTypography(value) {
    if (!editor || !editorContainer) return;
    const source = String(value ?? model?.getValue?.() ?? "");
    const lines = source.split("\n");
    const longestLine = Math.max(1, ...lines.map((line) => line.length));
    const lineCount = lines.length;
    const availableWidth = Math.max(320, editorContainer.clientWidth || 900);
    const widthFit = availableWidth / Math.max(1, longestLine * 0.62);
    const fontSize = Math.round(Math.max(18, Math.min(42, widthFit)));
    const lineHeight = Math.round(fontSize * 1.55);
    const editorHeight = Math.min(680, Math.max(340, lineCount * lineHeight + 36));
    editor.updateOptions({ fontSize, lineHeight });
    editorContainer.style.height = `${editorHeight}px`;
    editor.layout();
  }

  function mount(container, value, onChange, onExecute) {
    return loadMonaco().then((monaco) => {
      if (!model) {
        model = monaco.editor.createModel(value, "java");
        monaco.languages.setLanguageConfiguration("java", { indentationRules: { increaseIndentPattern: /\{[^}"']*$/, decreaseIndentPattern: /^\s*\}/ }, brackets: [["{", "}"], ["[", "]"], ["(", ")"]] });
        model.onDidChangeContent(() => {
          if (onChange) onChange(model.getValue());
          adaptEditorTypography(model.getValue());
          send({ type: "change", source: model.getValue() });
        });
      } else model.setValue(value);
      editorContainer = container;
      monaco.editor.defineTheme("devquiz-atom-one-dark", {
        base: "vs-dark", inherit: true,
        rules: [
          { token: "comment", foreground: "5C6370", fontStyle: "italic" },
          { token: "keyword", foreground: "C678DD" },
          { token: "string", foreground: "98C379" },
          { token: "number", foreground: "D19A66" },
          { token: "type", foreground: "E5C07B" }
        ],
        colors: {
          "editor.background": "#282C34", "editor.foreground": "#ABB2BF",
          "editorCursor.foreground": "#528BFF", "editor.lineHighlightBackground": "#2C313C",
          "editorBracketHighlight.foreground1": "#E5C07B",
          "editorBracketHighlight.foreground2": "#C678DD",
          "editorBracketHighlight.foreground3": "#61AFEF",
          "editorBracketHighlight.foreground4": "#98C379",
          "editorBracketHighlight.foreground5": "#D19A66",
          "editorBracketHighlight.foreground6": "#56B6C2"
        }
      });
      editor = editor || monaco.editor.create(container, {
        model, theme: "devquiz-atom-one-dark", fontFamily: '"Fira Code", monospace', fontLigatures: true,
        bracketPairColorization: { enabled: true }, guides: { bracketPairs: true, highlightActiveBracketPair: true },
        minimap: { enabled: false }, automaticLayout: true, language: "java", tabSize: 4, insertSpaces: true,
        suggestOnTriggerCharacters: false, quickSuggestions: false, wordBasedSuggestions: "off", wordWrap: "off"
      });
      editor.updateOptions({ readOnly: false });
      adaptEditorTypography(model.getValue());
      if (onExecute && !editor.__devquizExecuteAction) {
        editor.__devquizExecuteAction = true;
        editor.onKeyDown((event) => {
          if (event.keyCode !== monaco.KeyCode.Enter || event.shiftKey || event.isComposing) return;
          event.preventDefault();
          event.stopPropagation();
          onExecute();
        });
        editor.addAction({ id: "devquiz.execute", label: "Java ausführen", keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, monaco.KeyMod.Shift | monaco.KeyCode.F10], run: onExecute });
      }
      if (!editor.__devquizShortcuts) {
        editor.__devquizShortcuts = true;
        const isMac = /Mac|iPhone|iPad/.test(global.navigator?.platform || global.navigator?.userAgent || "");
        const ctrlCmd = monaco.KeyMod.CtrlCmd;
        const alt = monaco.KeyMod.Alt;
        const addAction = (id, label, keybindings, command) => editor.addAction({ id: `devquiz.${id}`, label, keybindings, run: () => editor.trigger("keyboard", command, {}) });
        addAction("toggleComment", "Zeilenkommentar umschalten", [ctrlCmd | monaco.KeyCode.Slash], "editor.action.commentLine");
        addAction("duplicateLine", "Zeile duplizieren", [ctrlCmd | monaco.KeyCode.KeyD], "editor.action.duplicateSelection");
        addAction("deleteLine", "Zeile löschen", [isMac ? ctrlCmd | monaco.KeyCode.Backspace : ctrlCmd | monaco.KeyCode.KeyY], "editor.action.deleteLines");
        addAction("quickFix", "Intentionen und Schnellkorrekturen", [alt | monaco.KeyCode.Enter], "editor.action.quickFix");
        addAction("format", "Code neu formatieren", [ctrlCmd | alt | monaco.KeyCode.KeyL], "editor.action.formatDocument");
      }
      container.hidden = false;
      connect();
      send({ type: "change", source: model.getValue() });
      return editor;
    }).catch((error) => { notify({ state: "unavailable", text: `Editor local nicht verfügbar: ${error.message}` }); return null; });
  }

  global.addEventListener?.("resize", () => adaptEditorTypography());
  global.devquizEditor = { mount, getValue: () => model ? model.getValue() : null, focus: () => editor && editor.focus(), setReadOnly: (value) => editor && editor.updateOptions({ readOnly: value }), selectRange, adaptTypography: adaptEditorTypography, isMounted: () => Boolean(editor) };
})(window);
