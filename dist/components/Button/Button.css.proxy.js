// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "button {\n  align-self: center;\n  padding: 0.75rem;\n  background-color: rgba(52, 72, 97, 0.7);\n  color: white;\n  cursor: pointer;\n  outline: none;\n  border: 0;\n  transition: all 0.2s ease;\n  font-size: 2rem;\n  letter-spacing: 1px;\n  font-family: inherit;\n}\nbutton:active {\n  background-color: rgba(52, 72, 97, 0.3);\n  color: #344861;\n  transform: translateY(2px);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}