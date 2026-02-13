import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from 'vitepress-theme-vue'
// @ts-ignore
import baseConfig from 'vitepress-theme-vue/config'
import { headerPlugin } from './headerMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: '文档 (v6.0.0)',
    activeMatch: `^/guide/`,
    items: [
      { text: '深度指南', link: '/guide/introduction' },
      { text: '快速上手', link: '/guide/quick-start' },
      {
        text: 'UltiTools 5 文档',
        link: 'https://v5.ultitools.ultikits.com'
      },
      {
        text: '从 UltiTools 5 迁移',
        link: '/guide/migration'
      }
    ]
  },
  {
    text: '官方模块文档',
    activeMatch: `^/module/`,
    link: '/module/'
  },
  {
    text: '用户面板',
    link: 'https://panel.ultikits.com'
  },
  {
    text: '网页编辑器',
    link: 'https://editor.ultikits.com'
  },
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/module/': [
    {
      text: '功能模块',
      items: [
        { text: '模块总览', link: '/module/' },
        { text: 'UltiEssentials — 基础功能', link: '/module/ultiessentials' },
        { text: 'UltiWorlds — 多世界管理', link: '/module/ultiworlds' },
        { text: 'UltiLogin — 登录注册', link: '/module/ultilogin' },
        { text: 'UltiChat — 智能聊天', link: '/module/ultichat' },
        { text: 'UltiMenu — 自定义菜单', link: '/module/ultimenu' },
        { text: 'UltiKits — 礼包系统', link: '/module/ultikits' },
        { text: 'UltiMail — 游戏邮箱', link: '/module/ultimail' },
        { text: 'UltiBackup — 背包备份', link: '/module/ultibackup' },
        { text: 'UltiRemoteBag — 远程背包', link: '/module/ultiremotebag' },
        { text: 'UltiSideBar — 侧边栏', link: '/module/ultisidebar' },
        { text: 'UltiSocial — 好友系统', link: '/module/ultisocial' },
        { text: 'UltiTrade — 一对一交易', link: '/module/ultitrade' },
        { text: 'UltiCleaner — 智能清道夫', link: '/module/ulticleaner' },
        { text: 'UltiRecipe — 自定义合成', link: '/module/ultirecipe' },
      ]
    }
  ],
  '/guide/': [
    {
      text: '开始',
      items: [
        {
          text: '简介',
          link: '/guide/introduction'
        },
        {
          text: '快速上手',
          link: '/guide/quick-start'
        },
        {
          text: '兼容性',
          link: '/guide/compatibility'
        },
        {
          text: '从v5迁移',
          link: '/guide/migration'
        },
        {
          text: '已知问题',
          link: '/guide/problem'
        },
        {
          text: '常见问答',
          link: '/guide/q-a'
        },
        {
          text: '支持UltiKits',
          link: '/guide/sponsor'
        },
        {
          text: '路线图',
          link: '/guide/roadmap'
        }
      ]
    },
    {
      text: '基础',
      items: [
        {
          text: '目录结构',
          link: '/guide/essentials/directory-structure'
        },
        {
          text: '功能模块',
          link: '/guide/essentials/module'
        },
        {
          text: '配置文件',
          link: '/guide/essentials/config'
        },
        {
          text: '插件 RESTful API',
          link: '/guide/essentials/restful-api'
        },
        {
          text: '账号绑定与会员',
          link: '/guide/essentials/account-bind'
        },
        {
          text: '数据库与多端同步',
          link: '/guide/essentials/database'
        },
        {
          text: '权限与LuckPerms',
          link: '/guide/essentials/permission'
        },
        {
          text: '自定义语言与国际化',
          link: '/guide/essentials/language'
        },
        {
          text: '故障排除',
          link: 'guide/essentials/troubleshoot'
        },
      ]
    },
    {
      text: '附录',
      items: [
        {
          text: '物品名称表',
          link: 'https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html',
        },
        {
          text: 'YAML 快速上手',
          link: 'https://www.runoob.com/w3cnote/yaml-intro.html'
        },
        {
          text: '颜色代码表',
          link: 'https://minecraft.fandom.com/zh/wiki/%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%BB%A3%E7%A0%81'
        },
        {
          text: '官方QQ群',
          link: 'https://jq.qq.com/?_wv=1027&k=Q6f7vT3k'
        }
      ]
    }
  ]
}

const i18n: ThemeConfig['i18n'] = {
  search: '搜索',
  menu: '菜单',
  toc: '本页目录',
  returnToTop: '返回顶部',
  appearance: '外观',
  previous: '前一篇',
  next: '下一篇',
  pageNotFound: '页面未找到',
  deadLink: {
    before: '你打开了一个不存在的链接：',
    after: '。'
  },
  deadLinkReport: {
    before: '不介意的话请提交到',
    link: '这里',
    after: '，我们会跟进修复。'
  },
  footerLicense: {
    before: '',
    after: ''
  },
  ariaDarkMode: '切换深色模式',
  ariaSkipToContent: '直接跳到内容',
  ariaToC: '当前页面的目录',
  ariaMainNav: '主导航',
  ariaMobileNav: '移动版导航',
  ariaSidebarNav: '侧边栏导航',
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'zh-CN',
  title: 'UltiTools 官方文档',
  description: 'UltiTools - 新一代 Spigot 基础插件',
  srcDir: 'src',
  scrollOffset: 'header',
  lastUpdated: true,

  themeConfig: {
    nav,
    sidebar,
    i18n,

    localeLinks: [
      {
        link: 'ultitools.doc.ultikits.com',
        text: '简体中文',
        repo: 'https://github.com/UltiKits/UltiTools-User-Doc'
      },
      {
        link: 'UltiKits/UltiTools-User-Doc',
        text: '帮助我们翻译！',
        isTranslationsDesc: true
      }
    ],

    //algolia: {
    //  indexName: 'XXX',
    //  appId: 'XXXXXXXXXX',
    //  apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    //  searchParameters: {
    //    //
    //  }
    //},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/UltiKits' },
      { icon: 'discord', link: 'https://discord.gg/P3fpQSRPGu' }
    ],

    editLink: {
      repo: 'UltiKits/UltiTools-User-Doc',
      text: '在 GitHub 上编辑此页'
    },
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

  vue: {
    reactivityTransform: true
  }
})
