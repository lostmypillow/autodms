import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "CompassPR DMS",
    description: "Extension for automating CompassPR DMS duties",
    version: "0.0.1",
    host_permissions: [
      "https://*.digitimes.com.tw/*",
      "https://*.ctee.com.tw/*",
      "https://*.chinatimes.com/*",
      "https://buzzorange.com/*",
    ],
  },
});
