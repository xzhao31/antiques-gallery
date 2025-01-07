import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZZ's Antiques Gallery",
  base: '/antiques-gallery/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About Me", link: "/about_me" },
    ],
    sidebar: [
      {
        text: "About Me",
        link: "/about_me",
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/xzhao31/antiques-gallery" }],
  },
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  // vite: {
  //   resolve: {
  //     alias: {
  //       '@public': ''
  //     }
  //   }
  // }
});
