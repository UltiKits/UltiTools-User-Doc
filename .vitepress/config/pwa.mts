import {PwaOptions} from "@vite-pwa/vitepress"

const pwaConfig: PwaOptions = {
    registerType: 'prompt',
    outDir: '../.vitepress/dist',
    includeAssets: ['favicon.ico'],
    manifest: {
        name: 'UltiTools 官方文档',
        short_name: 'UltiToolsDoc',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'favicon.ico',
                sizes: '64x64',
                type: 'image/x-icon',
            },
        ],
    },
    workbox: {
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    },
    devOptions: {
        type: 'module',
        enabled: true,
        suppressWarnings: true,
        navigateFallback: '/',
    },
    experimental: {
        includeAllowlist: true
    }
}

export {pwaConfig}
