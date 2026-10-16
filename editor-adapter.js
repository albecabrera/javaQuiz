/* Browser-only Monaco adapter. It deliberately has no CDN or language-server fallback. */
(function exposeEditorAdapter(global) {
  "use strict";

  let loaderPromise;
  let editor;
  let model;
  let socket;
  let nextRequestId = 1;
  const completions = new Map();
  const notify = (message) => global.dispatchEvent && global.dispatchEvent(new CustomEvent("devquiz-editor-status", { detail: message }));

  function loadMonaco() {
    if (global.monaco) return Promise.resolve(global.monaco);
    if (loaderPromise) return loaderPromise;
    if (!global.require) return Promise.reject(new Error("Monaco loader is unavailable"));
    global.require.config({ paths: { vs: "/vendor/vs" } });
    loaderPromise = new Promise((resolve, reject) => global.require(["vs/editor/editor.main"], resolve, reject));
    return loaderPromise;
  }

  function connect() {
    if (socket || !global.WebSocket) return;
    const protocol = global.location && global.location.protocol === "https:" ? "wss:" : "ws:";
    socket = new global.WebSocket(`${protocol}//${global.location.host}/lsp`);
    socket.addEventListener("open", () => notify({ state: "connecting", text: "JDT LS conectando…" }));
    socket.addEventListener("message", (event) => {
      let message;
      try { message = JSON.parse(event.data); } catch { return; }
      if (message.type === "ready") {
        send({ type: "change", source: model.getValue() });
        notify({ state: "ready", text: "JDT LS listo · completado semántico activo" });
      }
      else if (message.type === "diagnostics") applyDiagnostics(message.diagnostics || []);
      else if (message.type === "completion") {
        const pending = completions.get(message.id);
        if (pending) { completions.delete(message.id); pending.resolve(message.items || []); }
      } else if (message.type === "error") {
        notify({ state: "unavailable", text: `JDT LS no disponible: ${message.message || "error local"}` });
        for (const pending of completions.values()) pending.reject(new Error(message.message || "completion unavailable"));
        completions.clear();
      }
    });
    socket.addEventListener("error", () => notify({ state: "unavailable", text: "JDT LS no disponible · se puede ejecutar con Docker" }));
    socket.addEventListener("close", () => { socket = null; notify({ state: "unavailable", text: "JDT LS no disponible · se puede ejecutar con Docker" }); });
  }

  function send(message) { if (socket && socket.readyState === 1) socket.send(JSON.stringify(message)); }
  function applyDiagnostics(diagnostics) {
    if (!global.monaco || !model) return;
    global.monaco.editor.setModelMarkers(model, "jdtls", diagnostics.map((diagnostic) => ({
      message: diagnostic.message || "Java error",
      severity: diagnostic.severity === 2 ? global.monaco.MarkerSeverity.Warning : global.monaco.MarkerSeverity.Error,
      startLineNumber: (diagnostic.range && diagnostic.range.start.line || 0) + 1,
      startColumn: (diagnostic.range && diagnostic.range.start.character || 0) + 1,
      endLineNumber: (diagnostic.range && diagnostic.range.end.line || 0) + 1,
      endColumn: (diagnostic.range && diagnostic.range.end.character || 0) + 1,
    })));
  }
  function requestCompletion(position) {
    if (!socket || socket.readyState !== 1) return Promise.resolve([]);
    const id = nextRequestId++;
    return new Promise((resolve, reject) => {
      completions.set(id, { resolve, reject });
      send({ type: "complete", id, line: position.lineNumber - 1, character: position.column - 1 });
      setTimeout(() => { const pending = completions.get(id); if (pending) { completions.delete(id); pending.resolve([]); } }, 15000);
    });
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
        monaco.languages.registerCompletionItemProvider("java", { triggerCharacters: ["."], provideCompletionItems: (_, position) => requestCompletion(position).then((items) => ({ suggestions: items.map((item) => {
          const edit = item.textEdit;
          const range = edit?.range || edit?.insert;
          return {
            label: item.label || item.insertText || "",
            detail: item.detail,
            documentation: typeof item.documentation === "string" ? item.documentation : item.documentation?.value,
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: edit?.newText || item.insertText || item.label || "",
            range: range ? {
              startLineNumber: range.start.line + 1, startColumn: range.start.character + 1,
              endLineNumber: range.end.line + 1, endColumn: range.end.character + 1,
            } : model.getWordUntilPosition(position) && {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: model.getWordUntilPosition(position).startColumn,
              endColumn: model.getWordUntilPosition(position).endColumn,
            },
          };
        }) })) });
        model.onDidChangeContent(() => { if (onChange) onChange(model.getValue()); send({ type: "change", source: model.getValue() }); });
      } else model.setValue(value);
      editor = editor || monaco.editor.create(container, { model, theme: "vs-dark", minimap: { enabled: false }, automaticLayout: true, language: "java", tabSize: 4, insertSpaces: true, suggestOnTriggerCharacters: true, wordWrap: "off" });
      if (onExecute && !editor.__devquizExecuteAction) {
        editor.__devquizExecuteAction = true;
        editor.onKeyDown((event) => {
          if (event.keyCode !== monaco.KeyCode.Enter || event.shiftKey || event.isComposing) return;
          // Enter accepts an open completion; otherwise it runs the current exercise.
          if (container.querySelector?.(".suggest-widget.visible")) return;
          event.preventDefault();
          event.stopPropagation();
          onExecute();
        });
        editor.addAction({ id: "devquiz.execute", label: "Ejecutar Java", keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter], run: onExecute });
      }
      container.hidden = false;
      connect();
      send({ type: "change", source: model.getValue() });
      return editor;
    }).catch((error) => { notify({ state: "unavailable", text: `Editor local no disponible: ${error.message}` }); return null; });
  }

  global.devquizEditor = { mount, getValue: () => model ? model.getValue() : null, focus: () => editor && editor.focus(), setReadOnly: (value) => editor && editor.updateOptions({ readOnly: value }), selectRange, isMounted: () => Boolean(editor) };
})(window);
