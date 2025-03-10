import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/images/icon.png" }]],
  title: "得闲饮茶 | 一位普通的技术爱好者",
  description: "我的个人站点，记录学习的技术文档。",
  themeConfig: {
    logo: "/images/icon.png",
    siteTitle: "得闲饮茶",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "文档", link: "/introduction" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/hycg" }],

    sidebar: [
      {
        text: "简介",
        collapsed: false,
        items: [{ text: "引言", link: "/introduction" }],
      },
      {
        text: "技术文档",
        collapsed: false,
        items: [
          {
            text: "Vue",
            collapsed: false,
            items: [
              { text: "基础入门", link: "/src/vue/basicEntry" },
              // { text: "组件开发", link: "/src/vue/componentDevelopment" },
              // { text: "状态管理", link: "/src/vue/stateManagement" },
              // { text: "生态与工具", link: "/src/vue/ecologyTools" },
              // { text: "进阶优化", link: "/src/vue/advancedOptimization" },
              // { text: "实战项目", link: "/src/vue/actualProject" },
            ],
          },
          // {
          //   text: "React",
          //   collapsed: false,
          //   items: [{ text: "基础入门", link: "/src/react/" }],
          // },
          // {
          //   text: "Angular",
          //   collapsed: false,
          //   items: [{ text: "基础入门", link: "/src/angular/" }],
          // },
        ],
      },
    ],

    outlineTitle: "页面导航",

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    footer: {
      message: "根据 MIT 许可证发布。",
      copyright: "版权所有 © 2015-至今 陈有护",
    },
  },
});
