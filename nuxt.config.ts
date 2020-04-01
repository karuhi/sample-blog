require("dotenv").config();
const { API_KEY, WRITE_API_KEY, WRITE_PASSWORD } = process.env;
export default {
  srcDir: "./client/",
  env: { API_KEY, WRITE_API_KEY, WRITE_PASSWORD },
  head: {
    title: "sample-blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Nuxt.js TypeScript project"
      }
    ],
    htmlAttrs: {
      lang: "ja"
    },
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#3B8070" },
  css: ["~/assets/css/mvp.css"],
  build: {},
  buildModules: ["@nuxt/typescript-build"],
  modules: ["@nuxtjs/axios", "@tui-nuxt/editor"],
  axios: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://jam-blog-956b0.web.app/"
        : "http://localhost:3000/"
  },
  serverMiddleware: ["~~/api/"],
  tui: {
    editor: {
      language: "ja_JP"
      //exts: ['colorSyntax', 'scrollSync', 'table', 'uml']
    }
  }
};
