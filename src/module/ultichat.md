# UltiChat - 智能聊天管理

UltiChat 是 UltiTools 框架的独立聊天模块，提供全面的聊天管理功能。它集成了自动回复、聊天格式化、入退服消息定制、定时广播、@提及、聊天频道、防刷屏和自定义表情八大功能，所有特性均可通过 YAML 配置文件灵活调整，无需编写代码即可打造个性化的服务器聊天体验。

## 功能概览

UltiChat 将原来 UltiEssentials 中分散的聊天功能提取为独立模块，并做了大量增强。自动回复系统支持三种匹配模式（精确匹配、包含匹配和正则表达式），每条规则可以配置多行回复、触发冷却和控制台命令执行。聊天格式化功能支持 PlaceholderAPI 变量，可以自由设计聊天消息的显示样式。聊天频道系统允许创建多个频道（全局、本地、员工等），通过距离范围和跨世界设置控制消息的传播范围。防刷屏系统提供发送冷却、重复消息检测、大写字母比例限制功能。触发检测只拒绝当前消息，不会自动禁言。

## 安装

### 方式一：通过 UPM 安装（推荐）

在服务器控制台或游戏内执行：

```
/upm install UltiChat
```

### 方式二：手动安装

1. 确保服务器已安装 UltiTools-API 6.3.0 或更高版本
2. 将 `UltiChat-2.0.0.jar` 放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

> 注意：修改 JAR 文件后需要完整重启服务器，`/ul reload` 只能重载配置文件。

## 快速开始

安装完成后，UltiChat 会使用默认配置立即生效。以下是一个常见场景——为你的服务器配置聊天格式和自动回复：

**1. 自定义聊天格式**

编辑 `plugins/UltiTools/pluginConfig/UltiTools-Chat/config/chat.yml`：

```yaml
chat:
  format-enabled: true
  format: "&7[&f%player_world%&7] &f{player}&7: &f{message}"
```

将 `format` 修改为你想要的样式。`{player}` 代表玩家名，`{message}` 代表消息内容，`%xxx%` 是 PlaceholderAPI 变量。

**2. 添加一条自动回复规则**

编辑 `plugins/UltiTools/pluginConfig/UltiTools-Chat/config/autoreply.yml`，在 `rules` 下添加：

```yaml
autoreply:
  enabled: true
  cooldown: 10  # 全局冷却时间（单位：秒）
  rules:
    greeting:
      keyword: "hello"
      response:
        - "&aWelcome to the server!"
        - "&7Type /help for assistance"
      mode: contains
      case-sensitive: false
```

**3. 重载配置**

在游戏内或控制台执行：

```
/uchat reload
```

现在，当有玩家在聊天中输入包含 "hello" 的消息时，系统会自动回复两行欢迎文字。

## 命令

### 管理命令

基础命令：`/uchat`，别名无。需要权限 `ultichat.admin`。玩家和控制台均可执行。

| 命令 | 说明 | 示例 |
|------|------|------|
| `/uchat reload` | 重新加载所有配置文件 | `/uchat reload` |
| `/uchat autoreply list` | 列出所有自动回复规则 | `/uchat autoreply list` |
| `/uchat autoreply add <名称> <回复内容>` | 添加一条自动回复规则（默认为包含匹配模式） | `/uchat autoreply add faq 服务器地址是 play.example.com` |
| `/uchat autoreply setkeyword <名称> <关键词...>` | 设置完整词组为关键词 | `/uchat autoreply setkeyword faq server IP` |
| `/uchat autoreply remove <名称>` | 移除一条自动回复规则 | `/uchat autoreply remove faq` |

### 频道命令

基础命令：`/ch` 或 `/channel`。需要权限 `ultichat.channel`。频道切换和列表均只向玩家提供功能，控制台会收到仅限玩家的提示。

| 命令 | 说明 | 示例 |
|------|------|------|
| `/ch list` | 列出你有权限加入的所有频道 | `/ch list` |
| `/ch <频道名>` | 切换到指定频道 | `/ch local` |

> 频道系统受 `config/channels.yml` 中 `channels.enabled` 控制，关闭后频道命令将不可用。

## 配置文件

UltiChat 使用 5 个独立的配置文件，全部位于 `plugins/UltiTools/pluginConfig/UltiTools-Chat/config/` 目录下。

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
  duplicate-window: 0  # 秒，0-600；0 不按窗口过期，但 24 小时未发消息后清除记录
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
      keyword: "hello"
      mode: contains
      case-sensitive: false
      response:  # 多行回复
        - "&aWelcome to the server!"
        - "&7Type /help for assistance"
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
      permission: ""  # 加入权限，留空表示所有人可用
      range: -1  # 消息传播范围（-1 = 无限）
      cross-world: true  # 是否跨世界传播
    local:
      display-name: "&a[Local]"
      permission: ""
      range: 100  # 100 格范围内的玩家才能看到消息
      cross-world: false  # 不跨世界
    staff:
      display-name: "&c[Staff]"
      format: "{display} &f{player}&7: {message}"
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
    interval: 300  # 广播间隔（单位：秒，范围：1-107374182）
    prefix: "&6[Announcement] &f"  # 广播前缀
    messages:  # 广播消息列表，轮播显示
      - "Welcome! Type /help for assistance."
      - "Please follow server rules!"

  # Boss 栏广播
  bossbar:
    enabled: false  # 是否启用 Boss 栏广播
    interval: 60  # 广播间隔（单位：秒，范围：1-107374182）
    duration: 10  # Boss 栏显示时长（单位：秒，范围：1-60）
    color: BLUE  # Boss 栏颜色：BLUE / GREEN / PINK / PURPLE / RED / WHITE / YELLOW
    messages:  # 广播消息列表
      - "&eWelcome to the server!"

  # 标题广播
  title:
    enabled: false  # 是否启用标题广播
    interval: 600  # 广播间隔（单位：秒，范围：1-107374182）
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

上面的文本示例以英文配置为例。公告、进出服文本、出厂频道显示名与两条示例回复会按框架 `language` 写入配置；仍为内置文本的值跟随语言，你编辑过的值保留。修改语言后用完整 `/ul reload` 或重启，`/uchat reload` 不重读框架语言。请编辑这些配置文件，而不是指望修改解压出的语言文件改变公告文本。

### 从旧版本升级

不要用整份示例覆盖已有文件。旧文件的 `duplicate-window: 60` 现在真的生效，使慢速重复更容易通过；设为 `0` 后 `/uchat reload` 可恢复不按窗口过期的计数方式，但闲置 24 小时仍清除历史。重连不会重置反刷屏或自动回复冷却。删去旧 `anti-spam.mute-duration` 只消除弃用警告，不会失去禁言功能——本模块从未自动禁言。

三个公告间隔现在按配置运行，升级前改过的值也会立即开始生效，单位秒，1-107374182。重载保持周期位置；启动时非法间隔拒绝加载，重载时忽略非法值并保留运行间隔。`/uchat reload` 会报告部分完成或失败原因，不再一律报成功。

出厂频道不再设置 `format`；上方 staff 的格式是自定义示例，可删除该行回到“频道显示名 + 全局聊天格式”。仅当 `channels.enabled` 与 `chat.format-enabled` 都为 true 时，频道格式生效。旧版的三条原样格式会在启动时删除；自定义格式应含 `{player}` 或 `{displayname}` 及 `{message}`，`{display}` 是频道显示名。默认频道不存在时会警告并优先回退到不需要权限的 global，否则选文件中第一个免权限频道；没有合适频道时保留未定义名称，聊天无世界或范围过滤。重载删除了玩家所在频道时，会移动玩家到这个默认目标并通知。

命令创建规则可用完整句子回复，再用 `setkeyword` 设置词组；新规则名不能包含点。成功时只持久化点名的规则（`setkeyword` 只改关键词），保留其他规则和文件内容。重复名称会被拒绝；缺少关键词行时需手动补上。写入失败会回滚并说明原因，面板同时替换规则则提示重新执行。删除过 `autoreply.yml` 后先 `/uchat reload` 再 add，否则只生成新规则，不恢复出厂示例。无法识别的颜色、音效或匹配模式会在日志说明回退值；非法正则不会触发。

## 使用教程

### 场景一：配置服务器入退消息

想让玩家进服和退服时看到自定义消息？编辑 `config/chat.yml`：

```yaml
join-quit:
  join-message-enabled: true
  join-message-format: "&a&l>>> &e%player_name% &ajoined the game &7| &fOnline: %online_players%"
  quit-message-enabled: true
  quit-message-format: "&c&l<<< &e%player_name% &cleft the game"
  welcome-enabled: true
  welcome-lines:
    - ""
    - "&6&l    Welcome back, &e%player_name%&6!"
    - "&7    Currently &f%online_players% &7players online"
    - "&7    Type &a/help &7for assistance"
    - ""
  title:
    enabled: true
    main: "&6&lWelcome Back"
    sub: "&e%player_name%"
  first-join-message: "&b&l* &6New player &e%player_name% &6has joined for the first time! Welcome! &b*"
```

### 场景二：创建员工专属频道

编辑 `config/channels.yml`，在 `channels` 下添加：

```yaml
channels:
  channels:
    staff:
      display-name: "&c[Staff]"
      format: "{display} &f{player}&7: {message}"
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
    prefix: "&6[Announcement] &f"
    messages:
      - "Server rules: /rules"
      - "Need help? Contact an admin: /msg admin"
      - "Daily check-in for rewards: /checkin"
```

消息会按顺序轮播，第一次显示第一条，第二次显示第二条，依此类推。

### 场景四：使用正则表达式自动回复

如果你想匹配更复杂的聊天内容，可以使用正则表达式模式。编辑 `config/autoreply.yml`：

```yaml
autoreply:
  rules:
    ip-question:
      keyword: "(?i)(ip|address|server address|how.+join)"
      mode: regex
      case-sensitive: false
      response:
        - "&aServer address: &fplay.example.com"
        - "&aPort: &f25565"
```

这条规则会在玩家消息中包含"ip"、"address"、"server address" 或类似 "how to join" 的英文词组时自动回复。

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
1. 确认 UltiTools-API 版本为 6.3.0 或更高
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

### v2.0.0

#### 变更

- 需要 UltiTools-API 6.3.0 或更高版本。模块的 `api-version` 从已发布的 `v1.0.0` 中的 `620`
  提升至 `630`；更早的框架会拒绝加载本模块。

- `plugin.yml` 现在声明 `identify-string: ultichat`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。更早的框架会拒绝加载本模块，并给出 UltiTools 版本过旧的警告
  （拒绝信息以 `plugin.yml` 的 `name:` 即 `UltiTools-Chat` 指称本模块）。

- `/uchat autoreply add <名称> <回复...>` 现在把该行剩余内容作为回复，`/uchat autoreply setkeyword <名称> <关键词...>`
  把该行剩余内容作为关键词，因此通过命令创建的规则可以用一句话回复、匹配词组。此前两者都只接受一个词，更长的内容会被当作用法错误拒绝
  （UltiKits/UltiChat#26）。

- `config/announcements.yml`、`config/chat.yml`、`config/channels.yml` 与 `config/autoreply.yml`
  中的消息与标题设置（公告、进出服消息、出厂频道的显示名与两条示例自动回复规则）在模块启动时按服务器语言写入，
  文件内容即模块显示的内容；此前它们是写死的英文，`language: zh` 对它们不起作用。
  仍为内置文本（任一语言的内置文本，或旧版本的出厂默认值）的设置会跟随 `language`：模块启动或执行 `/ul reload` 后改写为当前语言的文本。你改过的设置保持不变。若想保留内置文本又不让它跟随语言，
  请至少改动一个字符。示例自动回复规则只有在关键词与回复合起来仍是同一语言的内置文本时才算内置；关键词或回复任一被改过，
  该规则即归你所有。请在配置文件中修改这些设置：修改解压出的语言文件不会改变它们，已发布的版本也从不从语言文件读取它们。
  修改后的 `language` 在重启或完整的 `/ul reload` 后生效，单个模块的重载（如 `/uchat reload` 或 `/ul reload UltiChat`）不会读取它（UltiKits/UltiChat#18）。

- 早期版本出厂的三条频道格式（`{display}&f: {message}`、`{display}&7: {message}`、
  `&c[Staff] &f{player}&7: {message}`）现在会在模块启动时从 `config/channels.yml` 中移除，
  使文件与聊天显示一致；聊天行保持不变（UltiKits/UltiChat#16、#18）。

- `config/chat.yml` 中的 `anti-spam.duplicate-window` 现在会生效。它此前被文档描述为重复检测的时间窗口，
  但从未被读取：只要玩家最近 `anti-spam.max-duplicate` 条被接受的消息都是同一内容，无论发送于多久以前，
  新消息都会被判为重复。现在它的含义是：`0`（新的声明默认值）表示不按窗口过期，即上述旧的计数规则，
  但玩家 24 小时未发消息后其重复记录会被清除（内存上限，见下文 UltiKits/UltiChat#40 的条目）；
  正值（最大 600）表示以秒为单位的时间窗口，早于该窗口的保留消息不再计数。允许范围改为 0-600（原为 10-600）。
  **升级后果：**运行过早期版本的服务器，其自己的文件中已有 `duplicate-window: 60`（框架曾把旧默认值写入该文件），
  这个 60 现在会生效，因此该服务器上的重复检测会比升级前更宽松：在默认 `max-duplicate: 3` 下，
  同一消息发送三次后，只有当这三次中的第一次发送于 60 秒以内时，第四次才会被拦截。
  模块启动时与每次重载时，只要时间窗口大于 0，就会记录一条指明文件、键名与当前值的警告；
  将其设为 `0` 并执行 `/uchat reload`，即可恢复之前的重复计数规则（UltiKits/UltiChat#14）。

- 你在本版本之前编辑过的频道格式现在会生效。频道格式此前从未被应用，因此编辑它（例如把出厂的
  `{display}&f: {message}` 改色为 `{display}&e: {message}`）不会有任何显示；改动后它已不再是三条旧出厂字符串之一，
  因此现在会按原样生效：不含 `{player}` 或 `{displayname}` 的格式不会显示发送者名字，不含 `{message}` 的格式不会显示消息内容。
  模块启动时与每次重载时，对每个格式生效且缺少上述内容的频道，会记录一条指明文件、频道与需要添加什么的警告（UltiKits/UltiChat#16）。

#### 移除

- 从 `lang/en.json` 与 `lang/zh.json` 中移除语言文件条目 `spam_muted` 与 `no_permission`：从未有任何代码显示它们。
  玩家从不会被自动禁言（自动禁言已作为功能请求记录在 UltiKits/UltiChat#30），权限拒绝消息来自 UltiTools 自身已翻译的消息。

- 从 `config/chat.yml` 中移除了自动禁言设置 `anti-spam.mute-duration`。自动禁言此前有文档说明，
  但从未真正发生：本应禁言玩家的代码从未被调用，因此无论该设置为何值，都没有任何玩家被禁言过。
  反刷屏的行为与之前完全相同——触发冷却、重复或大写字母检测的消息会被拦截，玩家之后仍可照常发送合规消息。
  自己的文件中仍保留该键的升级服务器，会在模块启动与每次重载时收到一条指明文件与键名的警告；
  删除该键即可消除警告。移除该设置并不是否决自动禁言：它已作为功能请求记录在 UltiKits/UltiChat#30 中
  （UltiKits/UltiChat#15）。

#### 修复

- `/uchat autoreply add`、`setkeyword` 和 `remove` 现在只把被点名的那条规则写入 `config/autoreply.yml`（`remove` 则删除它），
  不写其他内容：其他每条规则（包括服务器运行期间服主手动添加或修改的规则）以及文件的其他每一行都逐字节保持不变。`add` 会拒绝文件中
  已有的规则名（包括上次重载后服主手动添加的规则），回复「规则 '<名称>' 已存在」；`setkeyword` 只写该规则的关键词，因此该规则
  响应内容的手动修改会保留；若服主已手动删除该规则，则不写入任何内容（回复见下文 UltiKits/UltiChat#51）。
  规则名按整体读取（包括其中的点）。此前命令保存整个配置：在框架 6.3.0 的写入规则下，手动改过的规则不会被修改或删除，
  命令却报告成功；框架拒绝的写入也被报告为成功。现在被拒绝的写入会回滚，并回复「规则 '<名称>' 未保存：<原因>。更改已回滚；
  请按服务器日志的提示修正 config/autoreply.yml，然后重新执行该命令。」模块自己关于覆盖服主修改的那一行，以及本版本早先用来
  取代它的框架覆盖警告（UltiTools-Reborn#527）都已不存在：服主写下的内容不再被覆盖（UltiKits/UltiChat#50）。

- `/uchat autoreply add` 和 `setkeyword` 现在向框架询问 `config/autoreply.yml` 是否已有该规则，询问与写入基于对文件的同一次读取
  （框架的 `MUST_BE_ABSENT` 与 `MUST_BE_PRESENT` 写入条件），不再在模块内部第二次读取该文件。有效的文件不再被拒绝：
  文件没有 `autoreply` 段、没有 `rules` 键、`rules:` 留空、`rules: {}`、只有注释，或设置写成扁平的 `"autoreply.rules":` 形式时，
  `add` 都会写入规则。此前命令回复「config/autoreply.yml 无法按当前内容读取，请执行 /uchat reload」，而该建议并无帮助，
  因为重载后文件依然如此。服主在上次重载后手动写入的规则仍不会被替换（「规则 '<名称>' 已存在」；只写了 `~` 的条目也算同名规则）。
  `setkeyword` 针对服主已删除的规则、或条目中没有 `keyword:` 行的规则，不写入任何内容，并回复「规则 '<名称>' 在
  config/autoreply.yml 中没有 keyword 行（……），因此未保存任何内容」；要给这样的规则设置第一个关键词，请直接编辑文件。
  框架无法读取或解析的文件，回复框架给出的原因（「规则 '<名称>' 未保存：<原因>。更改已回滚；……」）。被拒绝或失败的写入现在
  无论出于什么原因都会回滚内存中的规则集；此前只在 `IOException` 时回滚。**变更：** 服务器运行期间被服主删除的文件不含任何规则，
  因此 `add` 现在会重新创建该文件并只写入新规则（服主写下的内容不会被覆盖）；`setkeyword` 仍不写入任何内容。
  删除 `config/autoreply.yml` 后，请先执行 `/uchat reload` 再执行 `/uchat autoreply add`，否则文件中只有新规则，出厂示例规则
  `server-ip` 与 `rules-info` 不会恢复（UltiKits/UltiChat#51）。

- `/uchat reload` 现在如实反映框架的重载结果。框架只完成部分重载时，回复未重载的部分；重载失败时回复失败原因；
  只有全部重载成功才回复「UltiChat 配置已重新加载」。此前回复总是成功，重载失败时还会表现为未处理的错误
  （UltiKits/UltiChat#48）。

- `/uchat reload` 或 `/ul reload` 之后，已切换到某个已从 `channels.channels` 删除的频道的玩家，会被移到新玩家所进入的频道
  （见下方 `channels.default-channel` 条目：不需要权限的频道），并收到一行提示。此前该玩家仍留在被删除的频道里：
  聊天只在持有同一名称的玩家之间、不受范围或世界限制，不再送达其他人，也没有任何日志（UltiKits/UltiChat#45）。

- 当 `channels.default-channel` 指向 `channels.channels` 下没有定义的频道时，模块启动和每次重载时（频道启用的情况下）
  会在控制台点名，并说明新玩家改为进入哪个频道：已定义且不需要权限的 `global` 时用 `global`，否则用文件中第一个不需要权限的频道
  （不会选中 `/ch` 会拒绝玩家加入的频道）。此前该设置被无声接受，新玩家被放进一个不存在的频道。没有这样的频道时，
  新玩家都被放进那一个未定义的频道，警告中会如实说明（UltiKits/UltiChat#44）。

- 装有 PlaceholderAPI 时，进入、退出和欢迎文本现在会把模块自己的 `%online_players%` 与 `%max_players%` 显示为数字。
  出厂欢迎语此前把它们原样显示为占位符，因为文本先交给了 PlaceholderAPI，而没有任何扩展提供这两个占位符。
  现在先一次性替换模块自己的占位符，再把结果交给 PlaceholderAPI；昵称里含有的 `%token%` 仍按原样显示。
  这些文本里模块自己的 `{player}` 与 `{displayname}` 现在也会被替换；装有 PlaceholderAPI 时它们此前同样原样显示
  （UltiKits/UltiChat#42）。

- 在 `anti-spam.duplicate-window: 600` 时，与玩家保留的最新副本恰好相隔 600 秒的重复消息，现在按窗口设定被当作重复消息拦截；
  此前历史记录被提早一毫秒清除，该重复消息会被放行。冷却时间的比较已在同一轮核对，与它自己的清理一致（UltiKits/UltiChat#41）。

- UltiChat 无法使用的配置值现在会在模块启动和每次重载时于控制台点名，并说明实际做法：不是 Boss 栏颜色的
  `announcements.bossbar.color`（使用蓝色）、不是音效的 `mentions.sound`（现在播放默认音效，此前不播放）、
  不是 `contains`、`exact` 或 `regex` 的自动回复规则 `mode`（按 `contains` 匹配），以及无法编译的自动回复正则表达式（该规则永远不会触发）。
  此前这些情况都不会有任何提示。

- 反刷屏与自动回复冷却记录现在按经过时间清理，而不是在玩家离开服务器时清理。重连不会重置这两类记录，
  因此不能通过重连绕过检测。消息冷却检测会丢弃已满 60 秒的记录；`anti-spam.duplicate-window` 为正数时，
  超过 600 秒未发送被接受的消息后清除重复记录；为 `0` 时则在超过 24 小时后清除。自动回复冷却记录
  在 300 秒后过期。每分钟也会清理一次过期记录，因此停止聊天的玩家不会在服务器整个运行期间一直留下记录。
  并发聊天处理在清理过期记录时不再丢失刚记录的重复消息；每条聊天消息或匹配的自动回复也不再扫描所有
  被追踪的玩家（UltiKits/UltiChat#20、#34、#40）。

- 使用 `{displayname}` 的聊天格式现在按原样插入玩家显示名。此前显示名在填入 `{message}` 与 PlaceholderAPI 之前就放进了格式，
  因此含有 `{message}` 的昵称会让消息重复出现，含有 PlaceholderAPI 占位符（如 `%server_name%`）的昵称会像管理员写入的一样被展开。
  显示名中的颜色代码仍显示为颜色。出厂的 `chat.format` 使用 `{player}`，不受影响（UltiKits/UltiChat#32）。

- 消息中的引号现在只显示一个，例如 `Auto-reply rule 'greet' added.`。此前语言条目把每个引号都写成两个，玩家会看到两个。
  jar 中的文字已更正，服务器上由旧版本解压出的语言文件中的双引号也会显示为一个（UltiKits/UltiChat#37）。

- `/ch` 频道列表现在按配置原样显示频道显示名；未安装 PlaceholderAPI 时，加入、退出与欢迎消息按原样插入玩家显示名。此前值中若含有
  随后的占位符（如 `{1}`、`%online_players%`），会被其改写。

- `/uchat autoreply list` 与 `/uchat autoreply setkeyword` 现在按原样显示规则名、关键词和回复。此前值中若含有 `{1}`、`{2}`
  或 `{3}`，会被随后填入的占位符改写，显示出规则并不具有的内容（UltiKits/UltiChat#39）。

- `/uchat autoreply add`、`setkeyword` 或 `remove` 的保存恰好与面板更新自动回复规则同时发生时，命令现在会说明更改未生效（保存时面板替换了规则，
  请重新执行）。面板更新会整体替换规则集，因此命令的更改既未生效也未保存，而命令此前却报告成功。面板写入的规则保持不变
  （UltiKits/UltiChat#29）。

- `/uchat autoreply add` 现在拒绝包含 `.` 的规则名并说明原因。配置文件以规则名作为路径保存规则，`my.rule` 写入文件时会被拆成两个键：
  规则被改名为 `my` 且永远不会触发，而命令却报告已添加（UltiKits/UltiChat#25）。

- 反垃圾消息的拒绝提示现在跟随 `language` 设置。冷却、重复与大写字母过多三种拒绝提示原先在任何语言下都是写死的中文，
  而语言文件里其实已有它们；现在分别来自 `spam_cooldown`、`spam_duplicate` 与 `spam_caps`（`language: en` 下为
  `Please wait before sending another message.`、`Stop sending duplicate messages!`、
  `Please reduce the amount of uppercase letters.`），以红色显示。`language: zh` 下的措辞取自语言文件，与原先写死的文本
  略有不同（UltiKits/UltiChat#18）。

- `language: zh` 现在也对原先写死为英文的内容生效：`/ch` 与 `/uchat` 的帮助、从控制台执行 `/ch` 时的「仅限玩家」提示、
  两个命令的描述（由 `/help` 显示），以及关于频道格式缺少发送者或消息占位符、已应用的 `anti-spam.duplicate-window`、
  本版本不再读取的配置键与 `config/autoreply.yml` 保存失败的控制台日志。它们的英文措辞不变。

- `config/announcements.yml` 中的公告间隔设置 `announcements.chat.interval`、
  `announcements.bossbar.interval` 与 `announcements.title.interval` 现在会生效。它们此前有文档说明却从未被读取：
  无论文件中写什么，公告一直分别每 300、60、600 秒播报一次。数值单位为秒，默认值不变（300 / 60 / 600），
  因此从未改过的服务器不会看到任何变化；改过的服务器现在会按其配置的间隔播报——**包括升级前编辑过的值：
  它此前不起作用，本版本首次加载时开始生效**。原先 10 到 3600 秒的允许范围已取消，范围改为框架的 1 秒到约 3.4 年，
  因此 1 到 9 秒（原范围不接受）以及超过一小时的间隔都会被接受并生效——聊天公告设 `interval: 1` 即每秒发送一条。
  修改后的值在执行
  `/ul reload`（或 `/uchat reload`）时生效，无需重启，并保持每条公告在周期中的位置——下一次播报在上一次之后
  一个新间隔，若该时刻已过则在下一个 tick。小于 1 秒（或大于约 3.4 年）的值会在启动时使模块拒绝加载，
  并提示键名；重载时则忽略该值并警告，继续使用正在运行的间隔。此功能使用框架的配置绑定定时器
  （UltiKits/UltiTools-Reborn#531），因此本版本需要 UltiTools 6.3.0 或更高版本，并声明 `api-version: 630`
  （UltiKits/UltiChat#13）。

- `config/channels.yml` 中频道自己的 `format:` 现在会作用于该频道成员的聊天行，前提是 `channels.enabled`
  与（`config/chat.yml` 中的）`chat.format-enabled` 均为 true（默认如此）；任一关闭时不使用任何频道格式，与之前相同。
  它此前有文档说明却从未被使用：
  每个频道的聊天行都是全局 `chat.format` 前加频道显示名，未设置自有格式的频道现在仍是如此。
  在频道格式中，`{display}` 会被替换为频道显示名，与 `{player}`、`{displayname}`、`{message}` 并用。
  本模块出厂的频道不再设置格式。**升级的服务器：**早期版本曾把三条格式写入每台服务器的 `channels.yml`
  （global 为 `{display}&f: {message}`，local 为 `{display}&7: {message}`，
  staff 为 `&c[Staff] &f{player}&7: {message}`），其中两条不含玩家名。与这三条字符串之一完全相同的格式
  会在模块启动时从 `channels.yml` 中移除，因此升级后服务器的聊天显示与之前完全相同，文件也如实反映这一点。
  代价是：无法刻意选用这三条字符串本身——只要改动任意一个字符（例如加一个空格），该格式就会被视为你自己的格式并生效
  （UltiKits/UltiChat#16、#18）。

- 使用 `/uchat autoreply add`、`/uchat autoreply setkeyword` 与 `/uchat autoreply remove`
  更改的自动回复规则，现在会在命令执行时立即写入 `config/autoreply.yml`，
  因此能在 `/uchat reload` 与 `/ul reload` 后保留；此前只有干净地停止服务器才会保存，
  任一 reload 都会静默丢弃自上次停止以来的所有规则更改。若文件无法写入，
  规则集会保持原样，且发送者会收到保存失败的提示，而不是被告知已添加、已更改或已移除。
  只写入命令点名的规则；文件其余部分的处理见上文 UltiKits/UltiChat#50（UltiKits/UltiChat#17）。

- 卸载本模块（`/upm uninstall UltiTools-Chat`）现在会真正移除其命令（`/uchat`，以及启用频道时的 `/ch`/`/channel`），
  并使其聊天、进出服、频道与自动回复监听器停止触发。此前本模块的空卸载方法替换了
  框架的卸载方法，因此执行 `/upm uninstall` 后其命令与监听器会一直生效，直到服务器重启
  （UltiKits/UltiChat#23）。


### v1.0.0 (2026-02-13)

新增：自动回复系统，支持包含/精确/正则三种匹配模式，多行回复，控制台命令触发
新增：自定义聊天格式，支持 PlaceholderAPI 变量和颜色代码
新增：入退服消息定制，包括进入消息、离开消息、欢迎文字、欢迎标题和首次入服广播
新增：定时广播系统，支持聊天消息、Boss 栏和标题三种广播方式
新增：@提及功能，高亮提示和音效通知
新增：聊天频道系统，支持全局/本地/自定义频道，范围限制和跨世界控制
新增：防刷屏功能，包括发送冷却、重复检测、大写限制和自动禁言
新增：自定义表情符号，`:shortcode:` 短代码替换为 Unicode 字符
