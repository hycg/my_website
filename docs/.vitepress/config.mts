import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/my_website/',
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/images/icon.png" }]],
  title: "得闲饮茶 | 一位普通的技术爱好者",
  description: "我的个人站点，记录学习的技术文档。",
  themeConfig: {
    logo: "/images/icon.png",
    siteTitle: "得闲饮茶",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详细列表",
            resetButtonTitle: "清除查询条件",
            backButtonTitle: "关闭搜索",
            noResultsText: "无法找到相关结果",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "进行选择",
              navigateText: "切换",
              navigateUpKeyAriaLabel: "向上",
              navigateDownKeyAriaLabel: "下降",
              closeText: "关闭",
              closeKeyAriaLabel: "esc",
            },
          },
        },
      },
    },
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

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    outlineTitle: "页面导航",
    lastUpdated: {
      text: "最后更新于",
    },
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    footer: {
      message: "根据 MIT 许可证发布。",
      copyright: "版权所有 © 2015-至今 陈有护",
    },
  },
});
