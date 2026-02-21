# 兼容性

## Minecraft 版本

UltiTools 6.2.x 支持 **Minecraft 1.21 及以上版本**。

::: danger 不支持旧版本
UltiTools 6 不支持 1.20.x 及以下版本。如果你使用的是旧版本服务端，请升级到 Paper 1.21+。
:::

## 服务端

### Paper（推荐）

UltiTools 专为 Paper 1.21+ 开发和测试，推荐使用 Paper 作为服务端。

### Paper 分支（Purpur、Folia 等）

基于 Paper 的分支服务端理论上可以正常运行，但不在官方测试范围内。

### Spigot

UltiTools 使用了部分 Paper 专有 API（如 Adventure 组件），在纯 Spigot 环境下可能出现兼容性问题。建议迁移到 Paper。

### 不支持的服务端

以下服务端不受支持：
- CraftBukkit
- Sponge/SpongeForge
- BDS（基岩版服务器）

### Mod 端（Mohist/Arclight 等）

Mod 端不在官方支持范围内。可能可以运行，但出现问题时不予排查。

## 前置插件

| 插件 | 必需？ | 用途 |
|------|--------|------|
| Vault | 可选 | 经济 API 前置，UltiEconomy、UltiKits 等模块需要 |
| PlaceholderAPI | 可选 | 变量占位符，UltiSideBar 等模块需要 |
| LuckPerms | 可选 | 权限管理，推荐安装 |

## 与其他插件的兼容性

### 经济类插件

UltiTools 通过 Vault API 接入经济系统，所有支持 Vault 的经济插件均可正常使用。如果你安装了 UltiEconomy 模块，它会自动注册为 Vault 经济提供者。

### 登录插件（AuthMe 等）

如果你使用了其他登录插件，请不要同时启用 UltiLogin 模块，以避免命令冲突。

### LuckPerms

UltiTools 对 LuckPerms 有官方支持，详见 [权限与LuckPerms](/guide/essentials/permission)。

### BungeeCord/Velocity 群组服

UltiTools 没有 BungeeCord/Velocity 插件。在群组服环境下，只需在每个子服安装 UltiTools，并配置 MySQL 共享数据库即可实现数据同步。

详见 [数据库与多端同步](/guide/essentials/database)。

## 与 Geyser 的兼容性

官方没有对 Geyser 进行测试。用户反馈称 GUI 界面（基于 Inventory）在基岩版客户端可能出现错位问题。
