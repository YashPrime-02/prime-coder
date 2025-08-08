// src/components/Editor/Templates.ts

export const languages = ["html", "css", "js", "jsx", "tsx"];

export const initialCodes: Record<string, string> = {
  html: `<!-- HTML Template -->
<div id="app">
  <h1>Hello from HTML</h1>
</div>`,
  css: `/* CSS Template */
body {
  font-family: sans-serif;
  background: #f5f5f5;
  color: #333;
}`,
  js: `// JavaScript Template
document.getElementById("app").innerHTML += "<p>JS is working!</p>";`,

  jsx: `// JSX Template
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello from JSX</h1>;
}

ReactDOM.render(<App />, document.getElementById('app'));
`,
  tsx: `// TSX Template
import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  return <h1>Hello from TSX</h1>;
};

ReactDOM.render(<App />, document.getElementById('app'));
`
};
