import {DefaultTheme} from "vitepress/theme"

const navEN: DefaultTheme.NavItem[] = [
    {
        text: 'Docs',
        activeMatch: '^/en/guide/',
        items: [
            {text: 'Guide', link: '/en/guide/introduction'},
            {text: 'Quick Start', link: '/en/guide/quick-start'},
            {
                text: 'Migrate from UltiTools 5',
                link: '/en/guide/migration'
            }
        ]
    },
    {
        text: 'Modules',
        activeMatch: '^/en/module/',
        link: '/en/module/'
    },
    {
        text: 'Panel',
        link: 'https://panel.ultikits.com'
    },
]

export {navEN}
