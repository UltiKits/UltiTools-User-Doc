# 配置文件

## 核心配置（config.yml）

UltiTools 的核心配置文件位于 `plugins/UltiTools/config.yml`。

### 完整配置示例（6.3.0 自带默认值）

```yaml
datasource:
  type: "sqlite"
  flushRate: 10
language: "zh"
mysql:
  enable: false
  host: localhost
  port: 3306
  username: root
  password: password
  database: ultitools
  connectionTimeout: 30000
  keepaliveTime: 60000
  maxLifetime: 1800000
  connectionTestQuery: "select 1"
  maximumPoolSize: 8
  cachePrepStmts: true
  prepStmtCacheSize: 250
  prepStmtCacheSqlLimit: 2048
email:
  enable: false
  smtp:
    host: "smtp.example.com"
    port: 587
    username: ""
    password: ""
    ssl: false
    starttls: true
    connectionTimeout: 10000
    readTimeout: 10000
  from:
    address: "noreply@example.com"
    name: "UltiTools Server"
  debug: false
ultipanel:
  logging:
    error-reporting:
      enabled: true
      dedup-window-seconds: 300
      max-errors-per-batch: 10
      sample-after-count: 10
      sample-rate: 0.1
    action-log:
      max-size-bytes: 1048576
      max-files: 5
    batch:
      enabled: true
      size: 10
      interval: 5000
  commands:
    blocklist:
      - op
      - deop
      - stop
      - restart
      - reload
      - ban-ip
      - pardon-ip
      - whitelist
      - save-off
      - save-all
  files:
    editable-roots:
      - plugins
      - logs
  capabilities:
    monitoring: true
    logs: true
    player-events: true
    file-read: true
    file-write: false
    file-delete: false
    commands: false
    server-properties: false
```

### 配置项说明

| 配置项 | 说明 | 默认值 |
|--------|------|--------|
| `datasource.type` | 数据存储方式 | `sqlite` |
| `datasource.flushRate` | JSON 自动保存间隔（秒） | `10` |
| `language` | 界面语言 | `zh` |
| `mysql.enable` | 启用 MySQL 连接 | `false` |
| `email.enable` | 启用可选的 SMTP 邮件服务 | `false` |
| `email.smtp` / `email.from` | SMTP 连接与发件人设置 | 见上方示例 |
| `ultipanel` | 面板能力、命令禁用列表、可编辑目录与日志 | 见上方示例 |

`language` 也可以填写[自定义语言名称](/guide/essentials/language)，例如 `zh-myserver`。绑定面板请在服务器控制台执行 `ulticloud login`；自带配置没有 `account.username` 或 `account.password` 设置。

## 模块配置

每个模块的配置文件存放在 `plugins/UltiTools/pluginConfig/模块名/` 目录下。具体配置项请参考各模块的文档。

### 重置设置与留空设置（6.3.0 起）

本节适用于模块配置文件。核心配置 `plugins/UltiTools/config.yml` 不同：文件不存在时会创建，但删掉普通核心键不会把它补回文件，而是在内存中使用自带默认值。部分缺少的面板键会由另一项启动迁移补入。

- **恢复默认值**：删掉这个设置，然后重启服务器。要删的是：它的键所在的那一行、下面属于它的值的所有行（列表就是每一行 `- ...`），以及紧挨在它上面的说明注释。启动时框架会把缺少的设置连同默认值和说明注释补回，能安全写入时，文件里其他内容一个字节都不改。遇到手动对齐的行尾注释、行尾空格、YAML 锚点，或缺少的设置需要紧接在另一个冒号后没有值的设置后面插入（不同于下文整节删空的情况）等布局时，框架可能拒绝写入：文件保持不动，在内存中使用默认值。如果控制台显示 `Configuration file <path> was not written: <reason>. Keys this write would have changed: <keys>. The values in memory are used; the file is unchanged.`，请修改原因中指出的行；若没有行号，则检查列出的键，然后重启（锚点则按整份文件的警告处理）。如果列表只删了键那一行，留下了下面的 `- ...` 行，文件通常就无法读取了：控制台会显示 `Cannot load <文件>: ...; file will not be overwritten`，在你删掉这些行之前，这个文件里的所有设置都使用默认值；否则这些行会被上面那个设置当成它的值的一部分。
- **让文字设置留空**：写成空字符串，例如 UltiChat `chat.yml` 里 `join-quit.title` 下的进服标题副文本 `sub: ''`。**不要删掉这一行**——删掉的设置会在下次启动时以默认值补回，那是“恢复默认值”，不是“留空”。空字符串不会被启动、重载或保存改写。数字、true/false 这类非文字设置没有“留空”：写 `''` 时控制台会给出一条警告，并使用默认值，文件不会被改动。有些文字设置不能为空，例如 UltiChat 公告的 `prefix`：在这类设置上写 `''`，控制台会提示模块 `refused to load` 并指出字段（例如 `field 'prefix' must not be empty`），模块不会加载；如果是 `/ul reload`，这次重载会被拒绝，继续使用运行中的值。这类设置请改写成别的文字。
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
