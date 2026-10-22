# UltiSocial - 好友系统

UltiSocial 是一个基于 UltiTools-API 的好友系统插件模块，提供完整的好友管理、私聊、传送和黑名单功能。

## 功能概述

UltiSocial 为你的服务器添加一套完整的社交系统。玩家可以互相发送好友请求，成为好友后可以查看对方的在线状态、传送到对方身边、发送私聊消息，还能把不想打交道的玩家加入黑名单。

好友关系是双向的：A 添加 B 后，B 的好友列表里也会有 A。好友请求有超时机制，超时后自动失效。如果双方同时向对方发送请求，系统会自动匹配并建立好友关系。

插件提供美观的 GUI 界面来管理好友列表和黑名单，支持分页浏览。好友列表中会显示在线状态、所在世界、游戏模式等信息，还支持收藏功能把常联系的好友排在前面。

黑名单功能是双向屏蔽的：一旦拉黑对方，双方都无法发送好友请求。拉黑操作会自动解除已有的好友关系。

所有数据（好友关系、黑名单）都通过 UltiTools-API 的数据层自动持久化到 JSON、SQLite 或 MySQL，无需额外配置。

## 安装

### 前置依赖

- **UltiTools-API** 6.3.0 或更高版本

### 安装方式一：通过 UPM 安装

在服务器控制台或游戏内执行：

```
/upm install UltiSocial
```

### 安装方式二：手动安装

1. 下载 `UltiSocial-2.0.0.jar` 文件
2. 将 JAR 文件放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器
4. 编辑配置文件 `plugins/UltiTools/pluginConfig/UltiSocial/config/social.yml`

## 升级到 2.0.0

备份配置与好友数据，先安装 UltiTools-API 6.3.0 或更高版本，替换 `UltiSocial-2.0.0.jar` 后完整重启。目录身份 `ultisocial` 用于框架更新检查和 `/upm update`，框架重载/卸载用 `UltiSocial`。旧文档列出的 v1.1.0 不是本模块实际发布版本，现不再当成版本历史；正式新版本为 2.0.0。新 JAR 不能靠 `/ul reload` 加载。

实际配置是 `plugins/UltiTools/pluginConfig/UltiSocial/config/social.yml`，不是 social_config.yml 或 Java 字段名；`tp_to_friend.cooldown` 默认为 30 秒。删除从未生效的 `notifications.friend_join_world`、`messages.player_blocked`、`messages.player_unblocked` 可消除启动/每次重载的逐键警告。没有“好友进入你所在世界时通知”功能，也没有替代设置；不删键不会改变玩家看到的内容。

### 语言、GUI 和收藏失败

`gui_title` 和十个有效 `messages.*` 设置仍为任一语言的内置/旧默认文本时，会在启动或 `/ul reload UltiSocial` 后按服务器语言改写并保存；自写值保留，要让内置句子不跟随 language，至少改一个字符。这些文本来自 JAR 内置内容，直接改 social.yml，不改已解压的语言文件。`/friend block` 与 unblock 回复则来自本模块 lang 文件：把 `lang/zh.yml` 复制成同目录 `lang/zh-myserver.yml`，在副本改 player_blocked/player_unblocked，在框架 `plugins/UltiTools/config.yml` 设置 `language: zh-myserver` 并完整 `/ul reload`。官方语言文件每次启动/模块重载恢复，修改保留为 `.bak`；自定义副本缺键按官方前缀回退，无前缀则缺键英文并警告。私聊正文保持玩家输入原文。

请求按钮在第 47 格（从 0 编号），不是中间页码书本；点击后下一个 tick 关闭菜单，在聊天栏显示 `/friend requests` 的结果。传送、私聊提示、删除好友和黑名单返回也在下一 tick 完成相关开关界面及后续操作，传送执行时再次检查冷却，连点不会多次传送。备注仅显示已有数据，本模块没有设置备注的命令或菜单，不要寻找不存在的入口。

收藏星标在存储失败或好友行已被其他服删除时会记录“更新好友数据失败”，仍可能提示“已更新好友收藏状态”；缓存随后丢弃，刷新看到的是实际存储结果，不把这条聊天提示当成持久化成功。拉黑好友现在还会另提示“已自动解除好友关系”，在线与离线都适用。

### 重载与权限

修改配置后 `/ul reload UltiSocial` 会真正重新读取文件并刷新语言；`tp_to_friend.enabled` 对下一条命令生效，不必为普通配置更改重启。卸载 `/upm uninstall UltiSocial` 注销 friend/friends/f 与通知、GUI 监听；只保留框架的模块重载日志，不再输出模块自有的停用/重载行。唯一实际命令权限是 `ultisocial.use`，未在 plugin.yml 声明，默认 OP；请用下文 LuckPerms 命令授予普通玩家，不照 README 中过时的 friend/tp/msg 分拆节点授权。

## 快速开始

安装完成后，玩家就可以在游戏中使用好友系统了。下面是一个典型的使用流程：

1. 玩家 A 想和玩家 B 成为好友，执行 `/friend add B`
2. 玩家 B 收到提示消息，执行 `/friend accept A` 接受请求
3. 双方成为好友，可以看到对方的在线状态
4. 玩家 A 想传送到 B 身边，执行 `/friend tp B`
5. 玩家 A 想给 B 发私聊，执行 `/friend msg B 你好!`
6. 执行 `/friend` 打开好友列表 GUI 界面，可以直接点击操作

## 命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/friend` | 打开好友列表 GUI | `/friend` |
| `/friend list` | 文字列出所有好友（含在线状态和收藏标记） | `/friend list` |
| `/friend add <玩家>` | 向在线玩家发送好友请求 | `/friend add Steve` |
| `/friend accept <玩家>` | 接受来自某玩家的好友请求 | `/friend accept Steve` |
| `/friend deny <玩家>` | 拒绝来自某玩家的好友请求 | `/friend deny Steve` |
| `/friend remove <玩家>` | 删除好友（双向解除） | `/friend remove Steve` |
| `/friend requests` | 查看所有待处理的好友请求 | `/friend requests` |
| `/friend tp <好友>` | 传送到在线好友的位置 | `/friend tp Steve` |
| `/friend msg <好友> <消息>` | 向在线好友发送私聊消息 | `/friend msg Steve 你好!` |
| `/friend block <玩家>` | 将玩家加入黑名单 | `/friend block Griefer` |
| `/friend unblock <玩家>` | 将玩家从黑名单移除 | `/friend unblock Griefer` |
| `/friend blocklist` | 打开黑名单管理 GUI | `/friend blocklist` |
| `/friend help` | 显示帮助信息 | `/friend help` |

所有命令仅限玩家执行（不支持控制台）。

命令别名：`/friends`、`/f`（例如 `/f add Steve` 等价于 `/friend add Steve`）

### 权限节点

| 权限 | 说明 | 默认 |
|------|------|------|
| `ultisocial.use` | 使用好友系统的所有功能 | OP（需授权普通玩家） |

所有子命令（add、remove、tp、msg、block 等）共享同一个权限节点 `ultisocial.use`。

## 配置文件

配置文件位置：`plugins/UltiTools/pluginConfig/UltiSocial/config/social.yml`

```yaml
# 每位玩家最多拥有的好友数量
# 范围：1-500
max_friends: 50

# 好友请求超时时间（单位：秒）
# 超过此时间未处理的请求自动失效
# 范围：10-3600
request_timeout: 60

# 通知设置
notifications:
  # 好友上线时是否通知你
  friend_online: true

  # 好友下线时是否通知你
  friend_offline: true

# 好友传送设置
tp_to_friend:
  # 是否启用好友传送功能
  enabled: true

  # 传送冷却时间（单位：秒）
  # 范围：0-3600（0 表示无冷却）
  cooldown: 30

# 好友列表 GUI 标题
# {COUNT} = 当前好友数，{MAX} = 最大好友数
# 支持 & 颜色代码
gui_title: "&6好友列表 &7({COUNT}/{MAX})"

# 消息模板
# {PLAYER} 会被替换为对应的玩家名
# 支持 & 颜色代码
messages:
  # 成为好友时双方收到的消息
  friend_added: "&a你和 {PLAYER} 成为了好友！"

  # 删除好友时你收到的消息
  friend_removed: "&c你已删除好友 {PLAYER}"

  # 好友上线通知
  friend_online: "&a你的好友 {PLAYER} 上线了！"

  # 好友下线通知
  friend_offline: "&7你的好友 {PLAYER} 下线了"

  # 好友请求已发送
  request_sent: "&a已向 {PLAYER} 发送好友请求！"

  # 收到好友请求
  request_received: "&e{PLAYER} 想和你成为好友！输入 /friend accept {PLAYER} 接受"

  # 拒绝好友请求
  request_denied: "&c已拒绝 {PLAYER} 的好友请求"

  # 好友数量已达上限
  max_friends_reached: "&c你的好友数量已达上限！"

  # 已经是好友
  already_friends: "&c你已经和 {PLAYER} 是好友了！"

  # 黑名单阻止（双向屏蔽提示）
  blocked: "&c无法与 {PLAYER} 进行好友操作，因为存在黑名单关系"

```


### 配置项速查

| 键 | 类型 | 默认值（当前语言） | 约束 |
|---|---|---|---|
| `max_friends` | number | `50` | 1–500 |
| `request_timeout` | number | `60` | 10–3600 s |
| `notifications.friend_online` | bool | `true` | 开启/关闭 |
| `notifications.friend_offline` | bool | `true` | 开启/关闭 |
| `tp_to_friend.enabled` | bool | `true` | 开启/关闭 |
| `tp_to_friend.cooldown` | number | `30` | 0–3600 s |
| `gui_title` | text | `"&6好友列表 &7({COUNT}/{MAX})"` | 非空文本 |
| `messages.friend_added` | text | `"&a你和 {PLAYER} 成为了好友！"` | 非空文本 |
| `messages.friend_removed` | text | `"&c你已删除好友 {PLAYER}"` | 非空文本 |
| `messages.friend_online` | text | `"&a你的好友 {PLAYER} 上线了！"` | 非空文本 |
| `messages.friend_offline` | text | `"&7你的好友 {PLAYER} 下线了"` | 非空文本 |
| `messages.request_sent` | text | `"&a已向 {PLAYER} 发送好友请求！"` | 非空文本 |
| `messages.request_received` | text | `"&e{PLAYER} 想和你成为好友！输入 /friend accept {PLAYER} 接受"` | 非空文本 |
| `messages.request_denied` | text | `"&c已拒绝 {PLAYER} 的好友请求"` | 非空文本 |
| `messages.max_friends_reached` | text | `"&c你的好友数量已达上限！"` | 非空文本 |
| `messages.already_friends` | text | `"&c你已经和 {PLAYER} 是好友了！"` | 非空文本 |
| `messages.blocked` | text | `"&c无法与 {PLAYER} 进行好友操作，因为存在黑名单关系"` | 非空文本 |

## GUI 界面说明

### 好友列表 GUI

执行 `/friend` 打开。54 格界面，上方 45 格显示好友头像，底部 9 格为导航栏。

每位好友显示为一个玩家头颅物品：
- 绿色名字 = 在线，灰色名字 = 离线
- 金色星号标记 = 收藏的好友
- 如果设置了备注，会显示"备注名 (原名)"格式
- 在线好友还会显示所在世界和游戏模式

鼠标操作：
- **左键点击**（在线好友）：传送到好友身边
- **右键点击**（在线好友）：提示使用私聊命令
- **右键点击**（离线好友）：删除好友
- **Shift + 左键**：收藏 / 取消收藏好友
- **Shift + 右键**：删除好友

底部导航栏：
- 左下角箭头：上一页
- 右下角箭头：下一页
- 第 47 格的书本：有待处理请求时显示数量，点击下一 tick 关闭并在聊天显示；中间第 49 格为页码

### 黑名单管理 GUI

执行 `/friend blocklist` 打开。显示所有被拉黑的玩家。

每位被拉黑的玩家显示为红色 X 标记的头颅：
- 显示拉黑时间
- 如果有拉黑原因也会显示

鼠标操作：
- **左键点击**：解除拉黑

底部导航栏有"返回好友列表"按钮，点击可以切换到好友列表界面。

## 使用教程

### 场景一：添加好友的完整流程

假设你想和一个叫 Alex 的玩家成为好友：

1. 确认 Alex 在线，执行 `/friend add Alex`
2. Alex 会收到消息提示，告诉他你想成为好友
3. Alex 可以执行 `/friend accept 你的名字` 接受，或者 `/friend deny 你的名字` 拒绝
4. 如果 Alex 在 60 秒（默认超时时间）内没有回应，请求自动失效
5. 接受后，双方都会收到"你和 XX 成为了好友！"的消息

小技巧：如果你向 Alex 发了请求，同时 Alex 也向你发了请求，系统会自动匹配，直接建立好友关系。

### 场景二：使用好友传送

当你想找好友一起玩的时候：

1. 执行 `/friend tp Alex`
2. 如果传送功能已启用且 Alex 在线，你会直接传送到 Alex 的位置
3. 传送后会进入冷却时间（默认 30 秒），冷却期间无法再次传送
4. 也可以在好友列表 GUI 中直接左键点击在线好友的头像来传送

如果管理员关闭了传送功能（`tp_to_friend.enabled: false`），使用传送命令会收到"传送到好友功能已禁用"的提示。

### 场景三：好友私聊

好友之间可以发送只有对方能看到的私聊消息：

1. 执行 `/friend msg Alex 今晚一起挖矿吗？`
2. Alex 会收到紫色的 `[私聊]` 前缀消息
3. 你也会看到发送确认
4. 只有好友才能互相发送私聊，非好友玩家无法发送

### 场景四：管理黑名单

如果有人骚扰你，可以把他拉黑：

1. 执行 `/friend block Griefer`（可以对在线或离线玩家使用）
2. 如果 Griefer 之前是你的好友，好友关系会自动解除
3. 拉黑后，Griefer 无法向你发送好友请求，你也无法向 Griefer 发请求（双向屏蔽）
4. 执行 `/friend blocklist` 打开黑名单界面查看和管理
5. 想解除拉黑时，执行 `/friend unblock Griefer`

### 场景五：收藏好友

如果你经常和某些好友一起玩，可以把他们收藏，收藏的好友会排在好友列表最前面：

1. 执行 `/friend` 打开好友列表 GUI
2. 按住 Shift 键，左键点击想收藏的好友头像
3. 头像名字前会出现金色星号标记
4. 再次 Shift + 左键可以取消收藏

## 常见问题

### 1. 安装后不生效怎么办？

确认以下几点：
- UltiTools-API 版本是否 >= 6.3.0
- JAR 文件是否放在 `plugins/UltiTools/plugins/` 目录下（注意不是 `plugins/` 根目录）
- 是否重启了服务器（首次安装需要重启）
- 检查控制台是否有报错信息

### 2. 改了配置文件没效果？

保存配置文件后需要使用 `/ul reload UltiSocial` 或重启服务器来重新加载配置。注意检查 YAML 格式是否正确，缩进必须使用空格而不是 Tab。

### 3. 权限怎么设置？

UltiSocial 使用一个统一的权限节点 `ultisocial.use` 控制所有功能。该节点未声明，默认 OP，需要明确授予普通玩家。如果你想限制某些玩家使用好友系统，可以通过 LuckPerms 等权限插件进行管理：

```
/lp group default permission set ultisocial.use true
/lp user Griefer permission set ultisocial.use false
```

### 4. 好友请求发出去了但对方没收到？

- 确认对方确实在线（执行 `/friend add` 时对方必须在线）
- 确认双方之间没有黑名单关系（任意一方拉黑了对方都无法发送请求）
- 确认你没有重复发送过（每个对象只能有一个未处理的请求）
- 请求有超时时间（默认 60 秒），超时后自动失效

### 5. 好友传送不了怎么办？

检查以下几点：
- 配置中 `tp_to_friend.enabled` 是否为 `true`
- 对方是否在线（不能传送到离线好友）
- 是否在冷却时间内（默认 30 秒冷却，命令会提示剩余时间）
- 对方是否确实是你的好友

### 6. 好友列表 GUI 中点击没有反应？

- 确认你是用正确的鼠标操作（左键传送、右键私聊/删除、Shift+左键收藏、Shift+右键删除）
- 传送操作需要对方在线
- 如果传送功能被管理员禁用，左键点击在线好友不会触发传送

### 7. 拉黑了对方但对方仍然能给我发消息？

黑名单只阻止好友请求和好友操作。它不会阻止服务器聊天中的公共消息。如果你需要完全屏蔽某人的聊天，请使用聊天管理插件（如 UltiChat）的功能。

## 数据存储

所有数据通过 UltiTools-API 的数据层自动保存，支持 JSON、SQLite 和 MySQL 三种存储方式（取决于 UltiTools 的全局配置）。

数据表：
- **friendships** — 好友关系表。字段：`player_uuid`、`friend_uuid`、`friend_name`、`created_time`、`nickname`（备注名）、`favorite`（是否收藏）
- **blacklist** — 黑名单表。字段：`player_uuid`、`blocked_uuid`、`blocked_name`、`created_time`、`reason`（拉黑原因）

好友请求不持久化，存储在内存中，服务器重启后清空。过期请求由定时任务每 60 秒自动清理。

## 更新日志

### v2.0.0

定版撤回原 Unreleased 中的 README 服务端/Java 徽章与中间 api-version 叙述；以下以实际 1.0.0 → 2.0.0 的声明及已发布行为为准。

#### 新增

- 新增对本版本已不再读取的设置项的警告。若已移除的 `notifications.friend_join_world`（见 `### Removed`）仍保留在
  你的 `config/social.yml` 中（运行过旧版本的服务器都会如此），本模块会在启用时以及每次重载本模块时
  （`/ul reload` 或 `/ul reload UltiSocial`）输出一条警告，指明模块、文件和键，并说明没有其他设置取代它。
  从文件中删除该键即可消除警告；保留它不会产生其他任何影响（UltiKits/UltiSocial#15）。

#### 变更

- 本版本需要 UltiTools 6.3.0 或更高版本，并在 `plugin.yml` 中声明 `api-version: 630`，上一个发布版本 1.0.0
  声明的是 `620`。6.3.0 之前的框架会在加载时拒绝本模块，警告中含 `UltiSocial load failed` 与
  `UltiTools version is outdated`，模块自身的启动逻辑不会运行；视框架版本而定，该警告之前可能先出现一段错误堆栈
  （UltiKits/UltiTools-Reborn#544）。

- `plugin.yml` 现在声明 `identify-string: ultisocial`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。

- `config/social.yml` 中的消息与标题设置——好友列表标题（`gui_title`）与十条消息（`messages.friend_added`、
  `friend_removed`、`friend_online`、`friend_offline`、`request_sent`、`request_received`、`request_denied`、
  `max_friends_reached`、`already_friends`、`blocked`）——在模块启动时按服务器语言写入，文件内容即模块显示的内容；
  此前它们是写死的中文，`language: en` 对它们不起作用（UltiKits/UltiSocial#14）。仍为内置文本（任一语言的内置文本，
  或旧版本的出厂默认值）的设置会跟随 `language`：模块启动或执行 `/ul reload` 后改写为当前语言的文本。你改过的设置
  保持不变。若想保留内置文本又不让它跟随语言，请至少改动一个字符。写入的是本模块的内置文本：请在 `config/social.yml`
  中修改这些设置；修改已解压的语言文件不会改变它们（旧版本同样从不从语言文件读取它们）。

#### 修复

- 当某个好友关系在存储中的记录已不存在（例如共用同一数据库的另一个服务器已将其删除）时，切换好友收藏星标
  （在 `/friend` 中 Shift+左键）现在在所有存储类型下都会记录 `Failed to update friend data`。此前这次写入什么也没做
  且没有任何日志（JSON 存储则以原始错误失败）。`FriendService#setNickname`（本模块没有命令或菜单调用它）同样如此。
  存储层写入失败时，模块现在会连同原因一起记录日志，点击继续进行（菜单刷新并提示 `Favorite status updated!`），
  此前该失败会使点击以控制台错误中止。两种情况下缓存的好友列表都会被丢弃，下次查看会重新读取存储中的记录
  （UltiKits/UltiSocial#29）。

- 好友列表（`/friend`）中的待处理请求按钮（第 47 格）现在会在下一个服务器 tick 关闭菜单并执行
  `/friend requests`，而不是在点击事件内执行；Paper 不允许在点击事件中改变玩家视图，框架现在也会在命令被派发的
  那一刻执行命令。玩家看到的效果不变：菜单关闭，请求列表显示在聊天栏中（UltiKits/UltiSocial#27）。好友列表中其他会
  关闭菜单的点击（传送到好友、私聊提示、删除好友）以及黑名单界面的「返回」按钮（关闭黑名单并打开好友列表）同样如此：
  关闭或打开界面以及随后的操作，现在都在下一个 tick 的同一个任务中完成，而不是在点击事件内；传送冷却在该任务运行时会再次检查，
  因此同一 tick 内的两次点击仍只传送一次（UltiKits/UltiSocial#30）。

- 关于本版本已不再读取的配置键的警告，现在会原样打印配置文件路径。此前路径中若含有 `{KEY}` 或 `{REASON}`，
  会被随后填入的占位符改写。

- README 中的配置示例现在写明实际的文件 `config/social.yml`、实际的键名（`max_friends`、`request_timeout`、`notifications.*`、
  `tp_to_friend.*`、`gui_title`、`messages.*`）与默认值（`tp_to_friend.cooldown` 为 30）。此前它写的是
  `config/social_config.yml` 和任何代码都不读取的 Java 字段名（UltiKits/UltiSocial#22）。

- 用 `/friend block <玩家>` 拉黑好友时，现在会另外提示好友关系已被自动解除（对在线和离线玩家都有效）。此前命令在拉黑已经
  解除好友关系之后才判断两人是否为好友，所以这行提示从不发送（UltiKits/UltiSocial#17）。

- `language: en` 现在对本模块显示或记录的全部内容生效：`/friend` 的所有回复与帮助、两个界面（标题、说明、游戏模式名称、
  点击提示、按钮）、界面点击的回复、命令描述以及控制台日志。其中大部分原先在任何语言下都是写死的中文，而语言文件中其实已有
  无人读取的英文文本；控制台日志原先写死为英文，现在也跟随 `language: zh`（UltiKits/UltiSocial#14）。私聊消息本身按原样显示。
  启用日志现为 `UltiSocial has been enabled!`，此前其中写的版本号 v1.1.0 本模块从未有过。

- 重载本模块（`/ul reload UltiSocial`，或对所有模块执行 `/ul reload`）现在会重新读取 `config/social.yml`
  并刷新语言文件，修改后的 `tp_to_friend.enabled` 等配置无需重启即可对下一条命令生效。框架的重载本已执行这两步，
  但本模块的重载方法替换了它且只输出一行日志，因此这两步都不会执行，重载报告成功却什么也没有重载。
  UltiTools 6.3.0 还会在此时执行 `@ConditionalOnConfig` 漂移检查（本模块没有条件注册的 Bean，因此不会报告任何
  内容）并输出框架自身的模块重载日志（UltiKits/UltiSocial#13）。

- 执行 `/upm uninstall UltiSocial` 后，本模块的 `/friend` 命令（及其 `/friends`、`/f` 别名）现在会被真正移除，
  其监听器（好友上线/下线通知，以及好友列表与黑名单界面的点击）也不再触发；本模块自身没有卸载工作。
  此前两者都会一直生效到服务器重启（UltiKits/UltiSocial#13）。

#### 移除

- `messages.player_blocked` 与 `messages.player_unblocked` 从未生效，现已移除，可从现有的 `config/social.yml` 中删除。
  从未有代码读取它们：`/friend block` 与 `/friend unblock` 的回复原为写死的文本，现在来自语言文件（`lang/en.yml`、
  `lang/zh.yml`）；要自定义这两条回复，请把官方语言文件复制为以其语言代码加连字符开头的文件（例如 `lang/zh-myserver.yml`），
  在副本中修改，并在 `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver`（直接修改官方文件的改动会在下次启动或模块重载时被恢复，
  UltiKits/UltiTools-Reborn#616）。仍含其中任一键的文件，会在启动时以及每次重载本模块时收到与
  `notifications.friend_join_world` 相同的警告（UltiKits/UltiSocial#23）。

- 移除本模块自身的控制台行 `UltiSocial has been disabled!`（卸载时）和 `UltiSocial configuration reloaded!`
  （`/ul reload UltiSocial` 或 `/ul reload` 时）。两者均为英文字面量而非语言键；同时从两个语言文件中移除描述
  卸载行但从未被使用的 `social_disabled` 语言键。UltiTools 6.3.0 会为每个模块输出一行重载日志
  （`Module 'UltiSocial' reloaded.`）（UltiKits/UltiSocial#13）。

- 移除 `config/social.yml` 中的 `notifications.friend_join_world` 设置项（默认 `false`，说明为"好友进入你所在
  世界时通知"）。它在任何版本中都从未生效：没有任何代码读取它，本模块也根本没有"好友进入你所在世界"的通知，
  因此开启或关闭它从未改变玩家看到的任何内容。该通知已作为功能请求记录在 UltiKits/UltiSocial#21——删除设置
  并不代表否决该功能。从旧版本升级的服务器，其 `social.yml` 中仍会保留该键，因为框架从不删除运维文件中的键；
  直接删除该键即可，保留它也不会改变玩家看到的任何内容（UltiKits/UltiSocial#15）。


### v1.0.0 (2026-02-13)

初始版本发布。

新增：
- 好友请求系统（发送、接受、拒绝，支持超时自动失效）
- 好友列表 GUI 界面，分页浏览，在线/离线状态显示
- 好友收藏功能
- 好友上下线通知
- 中英文双语支持
