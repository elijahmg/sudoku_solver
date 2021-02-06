// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".wrapper {\n  width: 500px;\n  height: 500px;\n  background-color: #f3f6fa;\n  position: relative;\n}\n\nbutton {\n  align-self: center;\n  margin-left: 2rem;\n  padding: 0.75rem;\n  background-color: #344861;\n  color: #f3f6fa;\n  cursor: pointer;\n  outline: none;\n  border: 0;\n  transition: all 0.2s ease;\n  font-size: 2rem;\n  letter-spacing: 1px;\n}\nbutton:active {\n  border: 1px solid red;\n}\n\n.game-table {\n  background: #fff;\n  user-select: none;\n  border: 2px solid #344861;\n  font-size: 3rem;\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.game-table tbody {\n  overflow: hidden;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.game-table .row {\n  display: flex;\n  padding: 0;\n  margin: 0;\n  height: 11.11111%;\n}\n.game-table .row:nth-child(3n) {\n  border-bottom: 2px solid #344861;\n}\n.game-table .row .selected {\n  background: lightgray;\n}\n.game-table .row .isNew {\n  color: red;\n}\n.game-table .row .cell {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-basis: 11.11111%;\n  position: relative;\n  border-right: 1px solid #bec6d4;\n  border-bottom: 1px solid #bec6d4;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.game-table .row .cell:nth-child(3n+4) {\n  border-left: 2px solid #344861;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}