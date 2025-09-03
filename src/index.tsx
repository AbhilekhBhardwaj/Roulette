import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouletteGame } from "./components/RouletteGame";
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

const root = createRoot(rootElement);

function App() {
  return (
    <StrictMode>
      <RouletteGame />
    </StrictMode>
  );
}

root.render(<App />);