import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Delivery App Web (React + Laravel)</h1>
      <p>React is working ✅</p>
    </div>
  );
}

createRoot(document.getElementById("app")).render(<App />);
