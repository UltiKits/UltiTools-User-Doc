import {navZH} from "./nav.zh.mjs"
import {sidebarModuleZH, sidebarGuideZH} from "./sidebar.zh.mjs"
import {textCN} from "./text.zh.mjs"
import {socialZH} from "./social.zh.mjs"

const localeZH = {
    root: {
        title: 'UltiTools 官方文档',
        description: 'UltiTools - 新一代 Spigot 基础插件',
        label: '简体中文',
        lang: 'zh-CN',
        themeConfig: {
            nav: navZH,
            sidebar: {
                '/module/': sidebarModuleZH,
                '/guide/': sidebarGuideZH,
            },
            socialLinks: socialZH,
            ...textCN,
        }
    }
}

export {localeZH}
