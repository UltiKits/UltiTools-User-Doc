# UltiChat - 智能聊天管理

UltiChat 是 UltiTools 框架的独立聊天模块，提供全面的聊天管理功能。它集成了自动回复、聊天格式化、入退服消息定制、定时广播、@提及、聊天频道、防刷屏和自定义表情八大功能，所有特性均可通过 YAML 配置文件灵活调整，无需编写代码即可打造个性化的服务器聊天体验。

## 功能概览

UltiChat 将原来 UltiEssentials 中分散的聊天功能提取为独立模块，并做了大量增强。自动回复系统支持三种匹配模式（精确匹配、包含匹配和正则表达式），每条规则可以配置多行回复、触发冷却和控制台命令执行。聊天格式化功能支持 PlaceholderAPI 变量，可以自由设计聊天消息的显示样式。聊天频道系统允许创建多个频道（全局、本地、员工等），通过距离范围和跨世界设置控制消息的传播范围。防刷屏系统提供发送冷却、重复消息检测、大写字母比例限制和自动临时禁言功能。

## 安装

### 方式一：通过 UPM 安装（推荐）

在服务器控制台或游戏内执行：

```
/upm install UltiChat
```

### 方式二：手动安装

1. 确保服务器已安装 UltiTools-API 6.2.0 或更高版本
2. 将 `UltiChat-1.0.0.jar` 放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

> 注意：修改 JAR 文件后需要完整重启服务器，`/ul reload` 只能重载配置文件。

## 快速开始

安装完成后，UltiChat 会使用默认配置立即生效。以下是一个常见场景——为你的服务器配置聊天格式和自动回复：

**1. 自定义聊天格式**

编辑 `plugins/UltiTools/UltiChat/config/chat.yml`：

```yaml
chat:
  format-enabled: true
  format: "&7[&f%player_world%&7] &f{player}&7: &f{message}"
```

将 `format` 修改为你想要的样式。`{player}` 代表玩家名，`{message}` 代表消息内容，`%xxx%` 是 PlaceholderAPI 变量。

**2. 添加一条自动回复规则**

编辑 `plugins/UltiTools/UltiChat/config/autoreply.yml`，在 `rules` 下添加：

```yaml
autoreply:
  enabled: true
  cooldown: 10  # 全局冷却时间（单位：秒）
  rules:
    greeting:
      keyword: "你好"
      response:
        - "&a欢迎来到服务器！"
        - "&7输入 /help 查看帮助"
      mode: contains
      case-sensitive: false
```

**3. 重载配置**

在游戏内或控制台执行：

```
/uchat reload
```

现在，当有玩家在聊天中输入包含"你好"的消息时，系统会自动回复两行欢迎文字。

## 命令

### 管理命令

基础命令：`/uchat`，别名无。需要权限 `ultichat.admin`。玩家和控制台均可执行。

| 命令 | 说明 | 示例 |
|------|------|------|
| `/uchat reload` | 重新加载所有配置文件 | `/uchat reload` |
| `/uchat autoreply list` | 列出所有自动回复规则 | `/uchat autoreply list` |
| `/uchat autoreply add <名称> <回复内容>` | 添加一条自动回复规则（默认为包含匹配模式） | `/uchat autoreply add faq 服务器地址是 play.example.com` |
| `/uchat autoreply remove <名称>` | 移除一条自动回复规则 | `/uchat autoreply remove faq` |

### 频道命令

基础命令：`/ch` 或 `/channel`。需要权限 `ultichat.channel`。频道切换仅限玩家执行，列表命令在控制台也可用但只对玩家显示有意义的信息。

| 命令 | 说明 | 示例 |
|------|------|------|
| `/ch list` | 列出你有权限加入的所有频道 | `/ch list` |
| `/ch <频道名>` | 切换到指定频道 | `/ch local` |

> 频道系统受 `config/channels.yml` 中 `channels.enabled` 控制，关闭后频道命令将不可用。

## 配置文件

UltiChat 使用 5 个独立的配置文件，全部位于 `plugins/UltiTools/UltiChat/config/` 目录下。

### chat.yml - 主聊天配置

```yaml
# UltiChat - 主聊天配置

# 聊天格式化
chat:
  format-enabled: true  # 是否启用自定义聊天格式
  # 聊天格式，支持 PlaceholderAPI 变量
  # {player} = 玩家名，{message} = 消息内容，{displayname} = 显示名
  format: "&7[&f%player_world%&7] &f{player}&7: &f{message}"

# 入退服消息
join-quit:
  join-message-enabled: true  # 是否启用自定义进入消息
  # 进入消息格式，支持 PlaceholderAPI 变量
  join-message-format: "&a[+] &e%player_name% &7joined the server"
  quit-message-enabled: true  # 是否启用自定义离开消息
  # 离开消息格式
  quit-message-format: "&c[-] &e%player_name% &7left the server"
  welcome-enabled: true  # 是否启用入服欢迎消息（仅发送给进入的玩家）
  # 欢迎消息内容，每行一条
  welcome-lines:
    - "&7========================================"
    - "&6Welcome, &e%player_name%&6!"
    - "&7Online: &f%online_players%&7/&f%max_players%"
    - "&7========================================"
  title:
    enabled: true  # 是否在入服时显示标题
    main: "&6Welcome Back"  # 标题主文本
    sub: "&7%player_name%"  # 标题副文本
  # 首次入服广播消息（全服可见），留空则不广播
  first-join-message: "&6Welcome new player &e%player_name%&6!"

# @提及功能
mentions:
  enabled: true  # 是否启用 @提及
  format: "&e@{player}&r"  # 提及高亮格式，{player} = 被提及的玩家名
  sound: "ENTITY_EXPERIENCE_ORB_PICKUP"  # 被提及时播放的音效
  self-mention: false  # 是否允许 @自己

# 防刷屏
anti-spam:
  enabled: true  # 是否启用防刷屏
  cooldown: 2  # 两条消息之间的最小间隔（单位：秒，范围：0-60）
  max-duplicate: 3  # 允许的最大连续重复消息数（范围：1-20）
  duplicate-window: 60  # 重复消息检测窗口（单位：秒，范围：10-600）
  mute-duration: 30  # 触发防刷屏后的自动禁言时长（单位：秒，范围：5-600）
  caps-limit: 70  # 大写字母占比上限，超过则拒绝消息（百分比，范围：0-100，0=不限制）
```

### autoreply.yml - 自动回复配置

```yaml
# UltiChat - 自动回复配置

autoreply:
  enabled: true  # 是否启用自动回复
  cooldown: 10  # 全局冷却时间，同一玩家触发自动回复后需等待的秒数（范围：0-300）
  rules:
    server-ip:  # 规则名称（唯一标识）
      keyword: "server IP"  # 匹配关键词
      response: "Server address: play.example.com"  # 回复内容（字符串或列表）
      mode: contains  # 匹配模式：contains（包含）/ exact（精确）/ regex（正则表达式）
      case-sensitive: false  # 是否区分大小写
    rules-info:
      keyword: "rules"
      response: "Please check /rules for server rules."
      mode: contains
      case-sensitive: false
```

自动回复规则的高级用法：

```yaml
autoreply:
  enabled: true
  cooldown: 10
  rules:
    welcome:
      keyword: "你好"
      mode: contains
      case-sensitive: false
      response:  # 多行回复
        - "&a欢迎来到服务器！"
        - "&7输入 /help 查看帮助"
      permission: ""  # 留空表示所有人都能触发
      commands:  # 触发后以控制台身份执行的命令
        - "give {player} bread 5"
```

### channels.yml - 频道配置

```yaml
# UltiChat - 频道配置

channels:
  enabled: true  # 是否启用频道系统
  default-channel: global  # 新玩家的默认频道
  channels:
    global:  # 频道名称
      display-name: "&f[Global]"  # 频道显示名称，支持颜色代码
      format: "{display}&f: {message}"  # 频道聊天格式
      permission: ""  # 加入权限，留空表示所有人可用
      range: -1  # 消息传播范围（-1 = 无限）
      cross-world: true  # 是否跨世界传播
    local:
      display-name: "&a[Local]"
      format: "{display}&7: {message}"
      permission: ""
      range: 100  # 100 格范围内的玩家才能看到消息
      cross-world: false  # 不跨世界
    staff:
      display-name: "&c[Staff]"
      format: "&c[Staff] &f{player}&7: {message}"
      permission: "ultichat.channel.staff"  # 需要权限才能加入
      range: -1
      cross-world: true
```

### announcements.yml - 定时广播配置

```yaml
# UltiChat - 定时广播配置

announcements:
  # 聊天消息广播
  chat:
    enabled: true  # 是否启用聊天广播
    interval: 300  # 广播间隔（单位：秒，范围：10-3600）
    prefix: "&6[Announcement] &f"  # 广播前缀
    messages:  # 广播消息列表，轮播显示
      - "Welcome! Type /help for assistance."
      - "Please follow server rules!"

  # Boss 栏广播
  bossbar:
    enabled: false  # 是否启用 Boss 栏广播
    interval: 60  # 广播间隔（单位：秒，范围：10-3600）
    duration: 10  # Boss 栏显示时长（单位：秒，范围：1-60）
    color: BLUE  # Boss 栏颜色：BLUE / GREEN / PINK / PURPLE / RED / WHITE / YELLOW
    messages:  # 广播消息列表
      - "&eWelcome to the server!"

  # 标题广播
  title:
    enabled: false  # 是否启用标题广播
    interval: 600  # 广播间隔（单位：秒，范围：10-3600）
    fade-in: 10  # 标题淡入时间（单位：tick，1秒=20tick，范围：0-100）
    stay: 70  # 标题停留时间（单位：tick，范围：1-200）
    fade-out: 20  # 标题淡出时间（单位：tick，范围：0-100）
    messages:  # 广播消息列表，用 || 分隔主标题和副标题
      - "&6Welcome!||&7Enjoy your stay"
```

### emojis.yml - 表情符号配置

```yaml
# UltiChat - 表情符号配置

emojis:
  enabled: true  # 是否启用表情符号
  mappings:  # 短代码到 Unicode 字符的映射
    ":heart:": "\u2764"  # 心形 ❤
    ":star:": "\u2605"  # 星星 ★
    ":smile:": "\u263A"  # 笑脸 ☺
    ":sword:": "\u2694"  # 剑 ⚔
```

你可以添加更多自定义映射，格式为 `":短代码:": "替换文本"`。

## 使用教程

### 场景一：配置服务器入退消息

想让玩家进服和退服时看到自定义消息？编辑 `config/chat.yml`：

```yaml
join-quit:
  join-message-enabled: true
  join-message-format: "&a&l>>> &e%player_name% &a加入了游戏 &7| &f在线: %online_players%"
  quit-message-enabled: true
  quit-message-format: "&c&l<<< &e%player_name% &c离开了游戏"
  welcome-enabled: true
  welcome-lines:
    - ""
    - "&6&l    欢迎回来, &e%player_name%&6!"
    - "&7    当前在线 &f%online_players% &7人"
    - "&7    输入 &a/help &7查看帮助"
    - ""
  title:
    enabled: true
    main: "&6&l欢迎回来"
    sub: "&e%player_name%"
  first-join-message: "&b&l✦ &6新玩家 &e%player_name% &6首次加入服务器！欢迎！ &b✦"
```

### 场景二：创建员工专属频道

编辑 `config/channels.yml`，在 `channels` 下添加：

```yaml
channels:
  channels:
    staff:
      display-name: "&c[Staff]"
      format: "&c[Staff] &f{player}&7: {message}"
      permission: "ultichat.channel.staff"
      range: -1
      cross-world: true
```

给管理员添加权限 `ultichat.channel.staff` 后，他们就可以用 `/ch staff` 切换到员工频道，在这个频道里的消息只有同频道的人能看到。

### 场景三：配置定时广播

想在聊天中定期提醒服务器规则？编辑 `config/announcements.yml`：

```yaml
announcements:
  chat:
    enabled: true
    interval: 600  # 每 10 分钟广播一次
    prefix: "&6[公告] &f"
    messages:
      - "服务器规则请查看 /rules"
      - "有问题请联系管理员：/msg admin"
      - "每日签到可获得奖励：/checkin"
```

消息会按顺序轮播，第一次显示第一条，第二次显示第二条，依此类推。

### 场景四：使用正则表达式自动回复

如果你想匹配更复杂的聊天内容，可以使用正则表达式模式。编辑 `config/autoreply.yml`：

```yaml
autoreply:
  rules:
    ip-question:
      keyword: "(?i)(ip|地址|服务器地址|怎么[进入连])"
      mode: regex
      case-sensitive: false
      response:
        - "&a服务器地址：&fplay.example.com"
        - "&a端口：&f25565"
```

这条规则会在玩家消息中包含"ip"、"地址"、"服务器地址"或"怎么进"/"怎么入"/"怎么连"时自动回复。

### 场景五：添加自定义表情

编辑 `config/emojis.yml`：

```yaml
emojis:
  enabled: true
  mappings:
    ":heart:": "&c❤&r"
    ":star:": "&e★&r"
    ":check:": "&a✔&r"
    ":cross:": "&c✘&r"
    ":fire:": "&c&l🔥&r"
```

玩家在聊天中输入 `:heart:` 就会自动替换为红色的心形符号。使用表情需要 `ultichat.emoji` 权限。

## 权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultichat.admin` | 使用管理命令（`/uchat`） | OP |
| `ultichat.channel` | 使用频道命令（`/ch`） | 玩家 |
| `ultichat.channel.<频道名>` | 加入指定频道（在频道配置中的 `permission` 字段设置） | 视配置 |
| `ultichat.color` | 在聊天消息中使用 `&` 颜色代码 | OP |
| `ultichat.emoji` | 在聊天中使用表情短代码 | 玩家 |
| `ultichat.spam.bypass` | 豁免防刷屏检测 | OP |
| `ultichat.autoreply.bypass` | 豁免自动回复触发 | OP |

## 软依赖

| 插件 | 用途 |
|------|------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | 在聊天格式、入退消息、广播等处使用 `%xxx%` 变量 |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | 保留用于未来经济相关功能 |

不安装这些插件时，PlaceholderAPI 变量会原样显示（如 `%player_world%`），但 `{player}` 和 `{displayname}` 等内置占位符始终可用。

## 常见问题

### 安装后不生效怎么办？

请按以下步骤排查：
1. 确认 UltiTools-API 版本为 6.2.0 或更高
2. 确认 JAR 文件放在了 `plugins/UltiTools/plugins/` 目录（不是 `plugins/` 根目录）
3. 重启服务器（不是 `/ul reload`，新安装模块需要完整重启）
4. 查看控制台日志是否有 UltiChat 相关的报错信息

### 改了配置文件没效果？

执行 `/uchat reload` 重新加载配置。如果还是没效果，检查 YAML 格式是否正确——缩进必须使用空格而不是 Tab，冒号后面要有空格。

### 权限怎么设置？

UltiChat 的权限通过你使用的权限插件（如 LuckPerms、PermissionsEx 等）来管理。例如在 LuckPerms 中：

```
/lp group default permission set ultichat.channel true
/lp group admin permission set ultichat.admin true
/lp group admin permission set ultichat.channel.staff true
```

### PlaceholderAPI 变量不解析？

确保已安装 PlaceholderAPI 并下载了对应的扩展包。例如要使用 `%player_world%`，需要执行 `/papi ecloud download Player` 安装 Player 扩展。

### 频道切换后消息还是全服可见？

确认 `config/channels.yml` 中 `channels.enabled` 为 `true`。同时检查你切换的频道的 `range` 设置——如果是 `-1` 表示无限范围，消息确实全服可见。想限制范围请设置为具体数字（如 `100`）。

### 自动回复的正则表达式不生效？

确保 `mode` 设置为 `regex`，并且正则表达式语法正确。常见错误包括忘记转义特殊字符（如 `.` 应该写成 `\\.`）。可以先在在线正则测试工具中验证表达式。

### 防刷屏误判正常玩家？

可以调整 `config/chat.yml` 中的防刷屏参数：
- 降低 `cooldown` 值（如从 2 改为 1）
- 增大 `max-duplicate` 值（如从 3 改为 5）
- 给信任玩家添加 `ultichat.spam.bypass` 权限

## 更新日志

### v1.0.0 (2026-02-13)

新增：自动回复系统，支持包含/精确/正则三种匹配模式，多行回复，控制台命令触发
新增：自定义聊天格式，支持 PlaceholderAPI 变量和颜色代码
新增：入退服消息定制，包括进入消息、离开消息、欢迎文字、欢迎标题和首次入服广播
新增：定时广播系统，支持聊天消息、Boss 栏和标题三种广播方式
新增：@提及功能，高亮提示和音效通知
新增：聊天频道系统，支持全局/本地/自定义频道，范围限制和跨世界控制
新增：防刷屏功能，包括发送冷却、重复检测、大写限制和自动禁言
新增：自定义表情符号，`:shortcode:` 短代码替换为 Unicode 字符
