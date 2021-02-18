
export let code = "label {\n  display: flex;\n  margin-right: 2rem;\n  align-items: center;\n}\nlabel input {\n  margin-left: 2rem;\n  font-size: 2rem;\n}";
let json = {};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}