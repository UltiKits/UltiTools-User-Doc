# 网页面板

UltiTools 提供了网页面板（UltiPanel），让你可以通过浏览器远程管理 Minecraft 服务器。

## 功能概览

- 远程执行服务器命令
- 实时查看服务器日志
- 在线编辑服务器文件
- 查看服务器性能指标
- 管理玩家
- 管理模块和配置

## 访问面板

面板地址：[panel.ultikits.com](https://panel.ultikits.com)

## 连接服务器

要将你的 Minecraft 服务器连接到面板，你需要：

在**服务器控制台**执行（不是游戏内）：

```
ulticloud login
```

在浏览器打开控制台输出的登录链接（magic link），登录 UltiKits 账号并批准关联服务器。使用 `ulticloud status` 查看关联状态，使用 `ulticloud logout` 解除关联。凭据保存在服务器根目录下的 `.ultikits/credentials.json`；请勿手动修改或分享该文件，也不要将账号密码填入 `config.yml`。

详见 [账号绑定](/guide/essentials/account-bind)。

## 网络要求

服务器需要能够访问外部网络（出站连接）。面板通过 WebSocket 连接，不需要额外开放端口。
