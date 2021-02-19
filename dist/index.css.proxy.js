// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "html {\n  min-height: 100vh;\n  box-sizing: border-box;\n  font-size: 62.5%;\n}\n@media only screen and (max-width: 768px) {\n  html {\n    font-size: 55%;\n  }\n}\n@media only screen and (max-width: 600px) {\n  html {\n    font-size: 50%;\n  }\n}\n@media only screen and (max-width: 450px) {\n  html {\n    font-size: 40%;\n  }\n}\n\nbody {\n  margin: 0;\n  font-family: \"Roboto\", sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}