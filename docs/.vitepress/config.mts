import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/my_website/",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/my_website/images/icon.png" }]],
  title: "得闲饮茶 | 一个懂点前端代码的人",
  description: "我的个人站点，记录学习的技术文档。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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

    docFooter: {
      prev: "上一页",
      next: "下一页",
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
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2019-${new Date().getFullYear()} 尤雨溪`,
    },

    socialLinks: [{ icon: "github", link: "https://github.com/hycg" }],

    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/src/introduction/introduction" },
    ],

    sidebar: [
      {
        text: "简介",
        collapsed: false,
        items: [
          { text: "成长路程", link: "/src/introduction/introduction" },
          { text: "联系我", link: "/src/introduction/contactMe" },
        ],
      },
      {
        text: "知识宝典",
        collapsed: false,
        items: [
          { text: "Js基础指南", link: "/src/treasureBook/jsInterview" },
          { text: "Js面向对象", link: "/src/treasureBook/jsObjectOriented" },
          { text: "Js网络请求", link: "/src/treasureBook/jsNetworkRequest" },
          { text: "Vue通关指南", link: "/src/treasureBook/vueInterview" },
          { text: "React通关指南", link: "/src/treasureBook/reactInterview" },
          { text: "实战项目集锦", link: "/src/treasureBook/actualProject" }
        ]
      },
      {
        text: "框架文档",
        collapsed: false,
        items: [
          {
            text: "Vue",
            collapsed: false,
            items: [
              { text: "基础入门", link: "/src/vue/basicEntry" },
              { text: "组件开发", link: "/src/vue/componentDevelopment" },
              { text: "状态管理", link: "/src/vue/stateManagement" },
              { text: "生态与工具", link: "/src/vue/ecologyTools" },
              { text: "进阶优化", link: "/src/vue/advancedOptimization" },
              { text: "实战项目", link: "/src/vue/actualProject" },
            ],
          },
          {
            text: "React",
            collapsed: false,
            items: [
              { text: "基础入门", link: "/src/react/basicEntry" },
              { text: "组件模式", link: "/src/react/componentPatterns" }
            ]
          },
          {
            text: "Angular",
            collapsed: false,
            items: [
              { text: "基础入门", link: "/src/angular/basicEntry" },
              { text: "模块系统", link: "/src/angular/moduleSystem" }
            ]
          }
        ],
      },
    ],
  },
});
