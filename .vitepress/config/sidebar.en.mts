import {DefaultTheme} from "vitepress/theme"

const sidebarModuleEN: DefaultTheme.SidebarItem[] = [
    {
        text: 'Modules',
        items: [
            {text: 'Overview', link: '/en/module/'},
            {text: 'UltiEssentials — Essentials', link: '/en/module/ultiessentials'},
            {text: 'UltiWorlds — Multi-World', link: '/en/module/ultiworlds'},
            {text: 'UltiLogin — Auth System', link: '/en/module/ultilogin'},
            {text: 'UltiChat — Smart Chat', link: '/en/module/ultichat'},
            {text: 'UltiMenu — Custom Menus', link: '/en/module/ultimenu'},
            {text: 'UltiKits — Kit System', link: '/en/module/ultikits'},
            {text: 'UltiMail — In-Game Mail', link: '/en/module/ultimail'},
            {text: 'UltiBackup — Inventory Backup', link: '/en/module/ultibackup'},
            {text: 'UltiRemoteBag — Remote Inventory', link: '/en/module/ultiremotebag'},
            {text: 'UltiSideBar — Sidebar', link: '/en/module/ultisidebar'},
            {text: 'UltiSocial — Friends System', link: '/en/module/ultisocial'},
            {text: 'UltiTrade — Player Trade', link: '/en/module/ultitrade'},
            {text: 'UltiCleaner — Auto Cleaner', link: '/en/module/ulticleaner'},
            {text: 'UltiRecipe — Custom Recipes', link: '/en/module/ultirecipe'},
        ]
    }
]

const sidebarGuideEN: DefaultTheme.SidebarItem[] = [
    {
        text: 'Getting Started',
        items: [
            {text: 'Introduction', link: '/en/guide/introduction'},
            {text: 'Quick Start', link: '/en/guide/quick-start'},
            {text: 'Compatibility', link: '/en/guide/compatibility'},
            {text: 'Known Issues', link: '/en/guide/problem'},
            {text: 'FAQ', link: '/en/guide/q-a'},
            {text: 'Support UltiKits', link: '/en/guide/sponsor'},
            {text: 'Roadmap', link: '/en/guide/roadmap'},
        ]
    },
    {
        text: 'Essentials',
        items: [
            {text: 'Directory Structure', link: '/en/guide/essentials/directory-structure'},
            {text: 'Modules', link: '/en/guide/essentials/module'},
            {text: 'Configuration', link: '/en/guide/essentials/config'},
            {text: 'RESTful API', link: '/en/guide/essentials/restful-api'},
            {text: 'Account Binding', link: '/en/guide/essentials/account-bind'},
            {text: 'Database & Sync', link: '/en/guide/essentials/database'},
            {text: 'Permissions', link: '/en/guide/essentials/permission'},
            {text: 'Localization', link: '/en/guide/essentials/language'},
            {text: 'Troubleshooting', link: '/en/guide/essentials/troubleshoot'},
        ]
    },
]

export {sidebarModuleEN, sidebarGuideEN}
