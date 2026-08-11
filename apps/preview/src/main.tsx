import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import { PreviewShell, resolvePreviewEntry } from "./preview-shell";
import "./styles.css";
import "@uidevtpl/template-blackline-saas/styles.css";
import "@uidevtpl/template-blackline-saas/blackline-saas.css";

const rootElement = document.querySelector<HTMLDivElement>("#root");

if (!rootElement) {
  throw new Error("Preview root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <PreviewShell entry={resolvePreviewEntry(window.location.pathname, rootElement.dataset.entry ?? "catalog")} />
  </StrictMode>
);
