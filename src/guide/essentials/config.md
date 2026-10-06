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

### 重置设置与留空设置（6.3.0 起）

- **恢复默认值**：删掉这个设置所在的那一行，然后重启服务器。启动时框架会把缺少的设置连同默认值和说明注释补回，文件里其他内容一个字节都不改。
- **让文字设置留空**：写成空字符串，例如 `prefix: ''`。**不要删掉这一行**——删掉的设置会在下次启动时以默认值补回，那是“恢复默认值”，不是“留空”。空字符串不会被启动、重载或保存改写。数字、true/false 这类非文字设置没有“留空”：写 `''` 时控制台会给出一条警告，并使用默认值，文件不会被改动。
- **删光了某一节下的所有设置**：例如删掉 `messages:` 下面唯一的一行，只留下 `messages:`（冒号后面什么都没有）。下次启动时，框架会把缺少的设置补回到这一行下面。这一行的键名和注释保持不变，只有多余的空格可能被整理（例如 `messages :   # 备注  ` 会变成 `messages: # 备注`）。你在下面注释掉的行会留在原处，前提是这些注释行紧跟在这一行下面、中间没有空行，并且缩进和文件其他地方一致；否则（前面有空行、两段注释之间有空行、或注释缩进得更深）框架不会补回，控制台会提示行号，删掉空行或调整缩进后再重启即可。
- **写成空值的节**：`messages: {}`、`messages: ~` 或 `messages: null` 是你自己写的值，框架不会改动它，缺少的设置也不会补进去。控制台会提示这一行的行号：删掉冒号后面的值（只留下 `messages:`），下次启动就会补回；或者手动添加这些设置。

## 重载配置

修改配置文件后，可以使用以下命令重载：

```
/ul reload          # 重载所有模块的配置
/ul reload 模块名   # 只重载指定模块的配置
```

::: tip
`/ul reload` 只重载配置文件，不会重新加载模块 JAR。如果你修改了模块的 JAR 文件，需要重启服务器。
:::
