# 账号绑定

UltiKits 账号用于将你的 Minecraft 服务器连接到网页面板和 UltiCloud 模块仓库。

## 注册账号

访问 [panel.ultikits.com](https://panel.ultikits.com)，点击注册，创建你的 UltiKits 账号。

## 绑定服务器

在**服务器控制台**执行（不是游戏内）：

```
ulticloud login
```

在浏览器打开控制台输出的登录链接（magic link），登录 UltiKits 账号并批准关联服务器。使用 `ulticloud status` 查看关联状态，使用 `ulticloud logout` 解除关联。凭据保存在服务器根目录下的 `.ultikits/credentials.json`；请勿手动修改或分享该文件，也不要将账号密码填入 `config.yml`。

## 绑定后可以做什么？

| 功能 | 说明 |
|------|------|
| 网页面板 | 通过 [panel.ultikits.com](https://panel.ultikits.com) 远程管理服务器 |
| UPM 模块下载 | 使用 `/upm install` 从云端安装模块 |
| 模块自动更新 | 使用 `/upm update` 更新已安装的模块 |

::: tip
即使不绑定账号，你也可以通过手动下载 JAR 文件来安装模块。但绑定账号后，使用 UPM 在线安装更加方便。
:::
