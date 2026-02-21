# 常见问题

## 安装和配置

### 如何安装功能模块？

使用 UPM 包管理器：
```
/upm install 模块名
```
安装后需要重启服务器。详见 [模块管理](/guide/essentials/module)。

### 配置文件在哪里？

- 核心配置：`plugins/UltiTools/config.yml`
- 模块配置：`plugins/UltiTools/pluginConfig/模块名/`

详见 [配置文件](/guide/essentials/config)。

### 如何切换数据存储方式？

编辑 `plugins/UltiTools/config.yml` 中的 `datasource.type` 字段，可选值为 `json`、`sqlite`、`mysql`。

::: warning 注意
切换存储方式不会自动迁移数据，请提前做好备份。
:::

### 如何将服务器连接到网页面板？

1. 在 [panel.ultikits.com](https://panel.ultikits.com) 注册账号
2. 在 `config.yml` 中填写账号密码
3. 重启服务器

详见 [账号绑定](/guide/essentials/account-bind)。

## 使用问题

### `/ul reload` 后新安装的模块没有加载？

`/ul reload` 只能重载配置文件，不会加载新模块。安装新模块后必须重启服务器。

### 模块命令和其他插件冲突怎么办？

如果出现命令冲突，可以在对应模块的配置文件中禁用冲突的功能，或者卸载冲突的模块。

### 为什么某些模块需要 Vault？

Vault 是 Minecraft 服务器通用的经济和权限 API。涉及经济功能的模块（如 UltiEconomy、UltiKits）需要 Vault 来提供经济接口。

## 其他问题

### UltiTools 是免费的吗？

是的，UltiTools 及其所有官方模块均为免费开源软件。

### 如何反馈问题或建议？

- GitHub Issues：[github.com/UltiKits/UltiTools-Reborn/issues](https://github.com/UltiKits/UltiTools-Reborn/issues)
- QQ 群：[点击加入](https://jq.qq.com/?_wv=1027&k=Q6f7vT3k)

### 如何支持 UltiKits？

详见 [支持UltiKits](/guide/sponsor)。
