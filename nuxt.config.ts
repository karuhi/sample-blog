require("dotenv").config();
const { API_KEY, WRITE_API_KEY, WRITE_PASSWORD } = process.env;
export default {
  mode: "spa",
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
  build: {
    babel: {
      presets({ isServer }: { isServer: any }) {
        return [
          [
            require.resolve("@nuxt/babel-preset-app"),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? "server" : "client",
              corejs: { version: 3 }
            }
          ]
        ];
      }
    }
  },
  buildModules: ["@nuxt/typescript-build"],
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://jam-blog-956b0.web.app/"
        : "http://localhost:3000/"
  },
  serverMiddleware: ["~~/api/"]
};
