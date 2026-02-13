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

- **UltiTools-API** 6.2.0 或更高版本

### 安装方式一：通过 UPM 安装

在服务器控制台或游戏内执行：

```
/upm install UltiSocial
```

### 安装方式二：手动安装

1. 下载 `UltiSocial.jar` 文件
2. 将 JAR 文件放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器
4. 编辑配置文件 `plugins/UltiTools/UltiSocial/config/social.yml`

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
| `ultisocial.use` | 使用好友系统的所有功能 | 所有玩家 |

所有子命令（add、remove、tp、msg、block 等）共享同一个权限节点 `ultisocial.use`。

## 配置文件

配置文件位置：`plugins/UltiTools/UltiSocial/config/social.yml`

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

  # 好友进入你所在的世界时是否通知你
  friend_join_world: false

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

  # 拉黑成功
  player_blocked: "&c已将 {PLAYER} 加入黑名单"

  # 解除拉黑
  player_unblocked: "&a已将 {PLAYER} 从黑名单移除"
```

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
- 中间书本：如果有待处理的好友请求，会显示数量，点击查看

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
- UltiTools-API 版本是否 >= 6.2.0
- JAR 文件是否放在 `plugins/UltiTools/plugins/` 目录下（注意不是 `plugins/` 根目录）
- 是否重启了服务器（首次安装需要重启）
- 检查控制台是否有报错信息

### 2. 改了配置文件没效果？

保存配置文件后需要使用 `/ultitools reload` 或重启服务器来重新加载配置。注意检查 YAML 格式是否正确，缩进必须使用空格而不是 Tab。

### 3. 权限怎么设置？

UltiSocial 使用一个统一的权限节点 `ultisocial.use` 控制所有功能。默认所有玩家都有此权限。如果你想限制某些玩家使用好友系统，可以通过 LuckPerms 等权限插件进行管理：

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

### v1.1.0 (2026-02-13)

新增：
- 黑名单系统：双向屏蔽、独立 GUI 管理界面、拉黑时自动解除好友关系
- 好友传送功能，支持冷却时间配置
- 好友私聊功能，仅限好友之间使用
- 好友列表显示在线好友的游戏模式
- 配置验证：`max_friends` (1-500)、`request_timeout` (10-3600)、`tp_cooldown` (0-3600)
- 过期请求自动清理定时任务

改进：
- 数据库查询升级到 UltiTools-API v6.2.0 Query DSL
- 定时任务使用 `@Scheduled` 声明式注解
- 命令系统重构，完整的 Tab 补全支持

### v1.0.0 (2026-02-13)

初始版本发布。

新增：
- 好友请求系统（发送、接受、拒绝，支持超时自动失效）
- 好友列表 GUI 界面，分页浏览，在线/离线状态显示
- 好友收藏功能
- 好友上下线通知
- 中英文双语支持
