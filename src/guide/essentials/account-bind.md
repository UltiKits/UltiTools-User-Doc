# 账号绑定

UltiKits 账号用于将你的 Minecraft 服务器连接到网页面板和 UltiCloud 模块仓库。

## 注册账号

访问 [panel.ultikits.com](https://panel.ultikits.com)，点击注册，创建你的 UltiKits 账号。

## 绑定服务器

在 `plugins/UltiTools/config.yml` 中填写你的账号信息：

```yaml
account:
  username: "你的用户名"
  password: "你的密码"
```

重启服务器后，UltiTools 会自动连接到 UltiCloud。

## 绑定后可以做什么？

| 功能 | 说明 |
|------|------|
| 网页面板 | 通过 [panel.ultikits.com](https://panel.ultikits.com) 远程管理服务器 |
| UPM 模块下载 | 使用 `/upm install` 从云端安装模块 |
| 模块自动更新 | 使用 `/upm update` 更新已安装的模块 |

::: tip
即使不绑定账号，你也可以通过手动下载 JAR 文件来安装模块。但绑定账号后，使用 UPM 在线安装更加方便。
:::
