import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "AutoDMS",
    description: "Extension for automating DMS duties",
    version: "0.2.0",
    host_permissions: [
      "https://*.digitimes.com.tw/*",
      "https://*.ctee.com.tw/*",
      "https://*.chinatimes.com/*",
      "https://buzzorange.com/*",
      "https://www.moneydj.com/*"
    ],
  },
});
