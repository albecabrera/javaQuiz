/* Browser-only Monaco adapter. It deliberately has no CDN or language-server fallback. */
(function exposeEditorAdapter(global) {
  "use strict";

  let loaderPromise;
  let editor;
  let model;
  let socket;
  let reconnectTimer;
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

  function mount(container, value, onChange, onExecute) {
    return loadMonaco().then((monaco) => {
      if (!model) {
        model = monaco.editor.createModel(value, "java");
        monaco.languages.setLanguageConfiguration("java", { indentationRules: { increaseIndentPattern: /\{[^}"']*$/, decreaseIndentPattern: /^\s*\}/ }, brackets: [["{", "}"], ["[", "]"], ["(", ")"]] });
        model.onDidChangeContent(() => {
          if (onChange) onChange(model.getValue());
          send({ type: "change", source: model.getValue() });
        });
      } else model.setValue(value);
      editor = editor || monaco.editor.create(container, { model, theme: "vs-dark", minimap: { enabled: false }, automaticLayout: true, language: "java", tabSize: 4, insertSpaces: true, suggestOnTriggerCharacters: false, quickSuggestions: false, wordBasedSuggestions: "off", wordWrap: "off" });
      editor.updateOptions({ readOnly: false });
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

  global.devquizEditor = { mount, getValue: () => model ? model.getValue() : null, focus: () => editor && editor.focus(), setReadOnly: (value) => editor && editor.updateOptions({ readOnly: value }), selectRange, isMounted: () => Boolean(editor) };
})(window);
