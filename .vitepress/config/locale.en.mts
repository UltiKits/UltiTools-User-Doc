import {navEN} from "./nav.en.mjs"
import {sidebarModuleEN, sidebarGuideEN} from "./sidebar.en.mjs"
import {textEN} from "./text.en.mjs"
import {socialEN} from "./social.en.mjs"

const localeEN = {
    en: {
        title: 'UltiTools Documentation',
        description: 'UltiTools - Next-Gen Spigot Plugin Framework',
        label: 'English',
        lang: 'en-US',
        link: '/en/',
        themeConfig: {
            nav: navEN,
            sidebar: {
                '/en/module/': sidebarModuleEN,
                '/en/guide/': sidebarGuideEN,
            },
            socialLinks: socialEN,
            ...textEN,
        }
    }
}

export {localeEN}
