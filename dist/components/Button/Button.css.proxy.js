// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "button {\n  align-self: center;\n  padding: 1.3rem 3rem;\n  border: 2px solid #344861;\n  color: #344861;\n  cursor: pointer;\n  outline: none;\n  transition: all 0.2s ease;\n  font-size: 2rem;\n  letter-spacing: 1px;\n  font-family: inherit;\n}\nbutton:active {\n  background-color: rgba(52, 72, 97, 0.3);\n  transform: translateY(2px);\n}\nbutton:hover {\n  background-color: rgba(52, 72, 97, 0.8);\n  color: whitesmoke;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}