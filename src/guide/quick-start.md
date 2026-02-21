---
footer: false
---

# 快速上手

本页将引导你在 5 分钟内完成 UltiTools 的安装和基本配置。

## 前置条件

- Paper 1.21+ 服务端（[下载 Paper](https://papermc.io/downloads)）
- Java 21

::: tip 可选前置插件
- [Vault](https://www.spigotmc.org/resources/vault.34315/) — 经济系统和权限前置（UltiEconomy、UltiKits 等模块需要）
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) — 变量占位符（UltiSideBar 等模块需要）
- [LuckPerms](https://luckperms.net/) — 权限管理（推荐）
:::

## 安装步骤

### 1. 下载 UltiTools

从 [GitHub Releases](https://github.com/UltiKits/UltiTools-Reborn/releases) 下载最新版本的 UltiTools JAR 文件。

### 2. 安装插件

1. 关闭服务端
2. 将 `UltiTools-x.x.x.jar` 放入服务器的 `plugins/` 文件夹
3. 启动服务端

首次启动时，UltiTools 将自动生成配置文件和目录结构。

### 3. 安装功能模块

UltiTools 核心只是一个框架，你需要安装模块来获得实际功能。

**方法一：使用 UPM 包管理器（推荐）**

在服务器控制台或游戏中（需要 OP 权限）执行：

```
/upm install UltiEssentials
```

安装完成后需要重启服务器。

**方法二：手动安装**

从 [UltiCloud](https://panel.ultikits.com) 下载模块 JAR 文件，放入 `plugins/UltiTools/plugins/` 目录，然后重启服务器。

### 4. 基本配置

编辑 `plugins/UltiTools/config.yml`：

```yaml
# 数据存储方式：json, sqlite, mysql
datasource:
  type: "sqlite"

# 语言：zh 中文, en 英文
language: "zh"
```

修改配置后执行 `/ul reload` 使配置生效。

## 常用命令

| 命令 | 说明 |
|------|------|
| `/ul list` | 查看已安装的模块 |
| `/ul reload` | 重载所有配置文件 |
| `/ul reload <模块名>` | 重载指定模块的配置 |
| `/upm list` | 查看可用模块列表 |
| `/upm install <模块名>` | 安装模块 |
| `/upm update all` | 更新所有模块 |

::: warning 注意
以上命令均需要 OP 权限。`/ul reload` 只能重载配置文件，安装新模块或更新 JAR 后需要重启服务器。
:::

## 下一步

- [目录结构](/guide/essentials/directory-structure) — 了解 UltiTools 的文件结构
- [模块管理](/guide/essentials/module) — 详细了解 UPM 包管理器
- [配置文件](/guide/essentials/config) — 深入了解配置选项
- [浏览模块](/module/) — 查看所有可用模块
