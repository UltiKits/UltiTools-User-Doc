import {DefaultTheme} from "vitepress/theme"

const sidebarModuleZH: DefaultTheme.SidebarItem[] = [
    {
        text: '功能模块',
        items: [
            {text: '模块总览', link: '/module/'},
            {text: 'UltiEssentials — 基础功能', link: '/module/ultiessentials'},
            {text: 'UltiWorlds — 多世界管理', link: '/module/ultiworlds'},
            {text: 'UltiLogin — 登录注册', link: '/module/ultilogin'},
            {text: 'UltiChat — 智能聊天', link: '/module/ultichat'},
            {text: 'UltiMenu — 自定义菜单', link: '/module/ultimenu'},
            {text: 'UltiKits — 礼包系统', link: '/module/ultikits'},
            {text: 'UltiMail — 游戏邮箱', link: '/module/ultimail'},
            {text: 'UltiBackup — 背包备份', link: '/module/ultibackup'},
            {text: 'UltiRemoteBag — 远程背包', link: '/module/ultiremotebag'},
            {text: 'UltiSideBar — 侧边栏', link: '/module/ultisidebar'},
            {text: 'UltiSocial — 好友系统', link: '/module/ultisocial'},
            {text: 'UltiTrade — 一对一交易', link: '/module/ultitrade'},
            {text: 'UltiCleaner — 智能清道夫', link: '/module/ulticleaner'},
            {text: 'UltiRecipe — 自定义合成', link: '/module/ultirecipe'},
            {text: 'UltiEconomy — 经济系统', link: '/module/ultieconomy'},
            {text: 'UltiBot — 假人机器人', link: '/module/ultibot'},
        ]
    }
]

const sidebarGuideZH: DefaultTheme.SidebarItem[] = [
    {
        text: '开始',
        items: [
            {text: '简介', link: '/guide/introduction'},
            {text: '快速上手', link: '/guide/quick-start'},
            {text: '兼容性', link: '/guide/compatibility'},
            {text: '已知问题', link: '/guide/problem'},
            {text: '常见问答', link: '/guide/q-a'},
            {text: '支持UltiKits', link: '/guide/sponsor'},
            {text: '路线图', link: '/guide/roadmap'},
        ]
    },
    {
        text: '基础',
        items: [
            {text: '目录结构', link: '/guide/essentials/directory-structure'},
            {text: '功能模块', link: '/guide/essentials/module'},
            {text: '配置文件', link: '/guide/essentials/config'},
            {text: '网页面板', link: '/guide/essentials/restful-api'},
            {text: '账号绑定', link: '/guide/essentials/account-bind'},
            {text: '数据库与多端同步', link: '/guide/essentials/database'},
            {text: '权限与LuckPerms', link: '/guide/essentials/permission'},
            {text: '自定义语言与国际化', link: '/guide/essentials/language'},
            {text: '故障排除', link: '/guide/essentials/troubleshoot'},
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

export {sidebarModuleZH, sidebarGuideZH}
