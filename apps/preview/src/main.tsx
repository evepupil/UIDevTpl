import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PreviewShell } from "./preview-shell";
import "./styles.css";

const rootElement = document.querySelector<HTMLDivElement>("#root");

if (!rootElement) {
  throw new Error("Preview root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <PreviewShell entry={rootElement.dataset.entry ?? "catalog"} />
  </StrictMode>
);
