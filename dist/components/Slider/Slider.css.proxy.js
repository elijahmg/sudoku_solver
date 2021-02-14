// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wrapper {\n  position: relative;\n  width: 200px;\n  height: 42px;\n}\n.wrapper .line {\n  position: absolute;\n  left: 0;\n  top: calc(50% - 2px);\n  height: 4px;\n  background: #344861;\n  width: 100%;\n}\n.wrapper .block {\n  height: 30px;\n  width: 30px;\n  background: #344861;\n  display: block;\n  border-radius: 9999px;\n  border: 4px solid #344861;\n  cursor: pointer;\n  top: 5%;\n  position: absolute;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}