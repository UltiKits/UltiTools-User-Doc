# 配置文件

## 核心配置（config.yml）

UltiTools 的核心配置文件位于 `plugins/UltiTools/config.yml`。

### 完整配置示例

```yaml
# 数据存储方式：json, sqlite, mysql
datasource:
  type: "sqlite"
  # 仅对 json 存储有效，自动保存间隔（秒）
  flushRate: 10

# 语言：zh 中文, en 英文
language: "zh"

# UltiKits 账号（用于网页面板和云端模块下载）
account:
  username: ""
  password: ""

# MySQL 数据库配置（仅当 datasource.type 为 mysql 时生效）
mysql:
  enable: true
  host: localhost
  port: 3306
  username: root
  password: "your_password"
  database: ultitools
  connectionTimeout: 30000
  keepaliveTime: 60000
  maxLifetime: 1800000
  connectionTestQuery: "select 1"
  maximumPoolSize: 8
  cachePrepStmts: true
  prepStmtCacheSize: 250
  prepStmtCacheSqlLimit: 2048
```

### 配置项说明

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `datasource.type` | 数据存储方式 | `sqlite` |
| `datasource.flushRate` | JSON 自动保存间隔（秒） | `10` |
| `language` | 界面语言 | `zh` |
| `account.username` | UltiKits 账号 | 空 |
| `account.password` | UltiKits 密码 | 空 |

## 模块配置

每个模块的配置文件存放在 `plugins/UltiTools/pluginConfig/模块名/` 目录下。具体配置项请参考各模块的文档。

## 重载配置

修改配置文件后，可以使用以下命令重载：

```
/ul reload          # 重载所有模块的配置
/ul reload 模块名   # 只重载指定模块的配置
```

::: tip
`/ul reload` 只重载配置文件，不会重新加载模块 JAR。如果你修改了模块的 JAR 文件，需要重启服务器。
:::
