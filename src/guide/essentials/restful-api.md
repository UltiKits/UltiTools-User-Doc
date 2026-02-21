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

1. 在面板注册账号
2. 在 `plugins/UltiTools/config.yml` 中填写账号信息：

```yaml
account:
  username: "你的用户名"
  password: "你的密码"
```

3. 重启服务器

服务器启动后会自动通过 WebSocket 连接到面板。连接成功后，你可以在面板上看到你的服务器并进行管理。

详见 [账号绑定](/guide/essentials/account-bind)。

## 网络要求

服务器需要能够访问外部网络（出站连接）。面板通过 WebSocket 连接，不需要额外开放端口。
