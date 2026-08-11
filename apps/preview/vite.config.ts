import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const templateThemeCss = "/packages/templates/web/react/shadcn/blackline-saas/src/index.css";

export default defineConfig({
  plugins: [
    {
      name: "preview-template-theme-adapter",
      enforce: "pre",
      transform(code, id) {
        if (!id.replaceAll("\\", "/").includes(templateThemeCss)) {
          return null;
        }

        return {
          code: code.replace('@import "@fontsource-variable/geist";\n', ""),
          map: null
        };
      }
    },
    react()
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        catalog: fileURLToPath(new URL("./index.html", import.meta.url)),
        preview: fileURLToPath(new URL("./preview/index.html", import.meta.url)),
        componentLab: fileURLToPath(new URL("./component-lab/index.html", import.meta.url))
      }
    }
  }
});
