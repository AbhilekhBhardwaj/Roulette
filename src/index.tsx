import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import RouletteWrapper from "./RouletteWrapper";
import "./styles.css";

// Dev overlay in CRA4 may expect Node globals in browser
// @ts-ignore
window.process = window.process || { env: { NODE_ENV: "development" } };
// @ts-ignore
window.global = window.global || window;

const rootElement = document.getElementById("app");
if (!rootElement) {
  throw new Error("Root element not found");
}
// @ts-ignore - allow createRoot to accept the element without TS casting
const root = createRoot(rootElement);
console.log(555);

function App() {
  return <RouletteWrapper username={"Player"} />;
}
export default App;
root.render(<App />);
