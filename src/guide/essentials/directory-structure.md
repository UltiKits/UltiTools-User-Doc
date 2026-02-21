# 目录结构

UltiTools 安装后，会在 `plugins/UltiTools/` 下生成以下目录结构：

```
plugins/UltiTools/
├── plugins/           模块 JAR 文件
├── pluginConfig/      模块配置文件目录
│   ├── UltiEssentials/
│   ├── UltiChat/
│   └── ...
├── sqliteDB/          SQLite 数据库文件（使用 sqlite 存储时）
├── backups/           UltiBackup 模块的备份文件
├── config.yml         核心配置文件
├── data.json          核心数据（服务器 UUID 等）
└── ultitools.db       主 SQLite 数据库
```

## 详解

### plugins/

存放所有功能模块的 JAR 文件。通过 `/upm install` 安装的模块会自动下载到此目录。你也可以手动放入模块 JAR 文件。

### pluginConfig/

每个模块的配置和数据文件都存放在 `pluginConfig/模块名/` 目录下。例如 UltiEssentials 的配置在 `pluginConfig/UltiEssentials/` 中。

### config.yml

UltiTools 的核心配置文件，包含以下设置：

- **数据存储方式**（`datasource.type`）：json、sqlite 或 mysql
- **语言**（`language`）：zh 或 en
- **UltiKits 账号**（`account`）：绑定网页面板的账号
- **MySQL 连接**（`mysql`）：使用 MySQL 存储时的数据库配置

详见 [配置文件](/guide/essentials/config)。

### data.json

存储服务器 UUID 等核心数据，**请勿手动修改此文件**。
