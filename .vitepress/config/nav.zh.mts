import {DefaultTheme} from "vitepress/theme"

const navZH: DefaultTheme.NavItem[] = [
    {
        text: '文档',
        activeMatch: '^/guide/',
        items: [
            {text: '深度指南', link: '/guide/introduction'},
            {text: '快速上手', link: '/guide/quick-start'},
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
        text: '官方模块',
        activeMatch: '^/module/',
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

export {navZH}
