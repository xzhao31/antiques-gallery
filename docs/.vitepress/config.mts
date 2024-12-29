import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZZ's Antiques Gallery",
  // description: "6.1040 Fall 2024",
  base: "/antiques-gallery/",
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
  }
});
