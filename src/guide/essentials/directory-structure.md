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
- **语言**（`language`）：`zh`、`en` 或 `zh-myserver` 等自定义名称
- **邮件**（`email`）：可选的 SMTP 服务
- **面板**（`ultipanel`）：远程能力与日志；在服务器控制台执行 `ulticloud login` 绑定
- **MySQL 连接**（`mysql`）：使用 MySQL 存储时的数据库配置

详见 [配置文件](/guide/essentials/config)。

### .ultikits/credentials.json（服务器根目录，6.3.0 起）

服务器凭据保存在服务器根目录下的 `.ultikits/credentials.json`，不在 `plugins/UltiTools/` 中。已有的 `plugins/UltiTools/data.json` 会迁移到此处。**请勿手动修改或分享凭据文件。** 绑定面板请在服务器控制台执行 `ulticloud login`。
