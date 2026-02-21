# 功能模块

UltiTools 的所有功能以独立模块的形式提供。你可以通过 UPM（UltiTools Plugin Manager）包管理器来安装、更新和卸载模块。

## UPM 命令

所有 UPM 命令需要 OP 权限，命令前缀为 `/upm`。

| 命令 | 说明 |
|------|------|
| `/upm list [页码]` | 查看可用模块列表 |
| `/upm install <模块名>` | 安装模块（最新版本） |
| `/upm install <模块名> <版本号>` | 安装指定版本的模块 |
| `/upm versions <模块名>` | 查看模块的所有可用版本 |
| `/upm uninstall <模块名>` | 卸载模块 |
| `/upm check` | 检查所有模块是否有更新 |
| `/upm update <模块名>` | 更新指定模块 |
| `/upm update all` | 更新所有模块 |

## 安装模块

### 方法一：使用 UPM（推荐）

```
/upm install UltiEssentials
```

安装完成后，**需要重启服务器**才能加载新模块。

### 方法二：手动安装

1. 下载模块 JAR 文件
2. 放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

## 查看已安装模块

```
/ul list
```

此命令会列出当前已安装并加载的所有模块。

## 更新模块

检查更新：
```
/upm check
```

更新单个模块：
```
/upm update UltiEssentials
```

更新所有模块：
```
/upm update all
```

更新后需要重启服务器。

## 卸载模块

```
/upm uninstall UltiEssentials
```

卸载后需要重启服务器。模块的配置文件（在 `pluginConfig/` 中）不会被自动删除，如需清理可手动删除。

::: warning 重要
`/ul reload` 只能重载配置文件，**不会加载或卸载模块**。所有涉及模块 JAR 的操作都需要重启服务器。
:::

## 模块列表

查看所有官方模块：[模块总览](/module/)
