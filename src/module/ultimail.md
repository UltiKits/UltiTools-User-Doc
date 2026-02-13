# UltiMail - 游戏内邮件系统

UltiMail 是 UltiTools 生态的邮件系统模块，为 Minecraft 服务器提供完整的玩家间邮件收发功能。

## 功能概览

UltiMail 提供了一套完整的游戏内邮件系统。玩家可以向在线或离线的其他玩家发送文字邮件，还能把背包中的物品作为附件一并寄出。收件方登录服务器时会自动收到未读邮件的通知提示（可点击直接打开收件箱），邮件内容和附件都可以在图形化界面（GUI）中浏览和领取。管理员拥有群发邮件权限，支持一次性将通知或物品发送给全服所有玩家。此外还提供玩家召回功能，可以向所有注册玩家发送游戏内召回邮件，甚至通过 SMTP 发送真实电子邮件来召回长期未上线的玩家。

## 安装

**方式一：通过 UPM 安装（推荐）**

```
/upm install UltiMail
```

**方式二：手动安装**

1. 确保服务器已安装 UltiTools-API 6.2.0 或更高版本
2. 下载 `UltiMail-1.1.0.jar`
3. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
4. 重启服务器

## 快速开始

安装完成后，玩家直接在聊天框输入命令即可使用邮件功能。下面是一个典型的使用流程：

**发送一封邮件给 Steve：**

```
/sendmail Steve 你好
```

执行后系统会提示你输入邮件正文内容，输入完成后邮件会自动发送。如果中途想取消，输入 `cancel` 即可。

**发送一封带附件的邮件：**

手持你要发送的物品，输入：

```
/sendmail Steve 送你一把剑 attach
```

系统会将你主手中的物品作为附件随邮件发出。管理员使用此命令时会打开一个图形选择界面，可以一次附带多个物品。

**查看收件箱：**

```
/mail inbox
```

这会以文字列表形式显示你的所有邮件，包括已读/未读状态和是否有附件。

**用 GUI 浏览收件箱：**

```
/mail read
```

这会打开分页式图形界面，未读邮件以「可写的书」图标显示，已读邮件以「书」图标显示。点击邮件即可阅读内容并领取附件。

## 命令

### 玩家命令

| 命令 | 说明 | 示例 | 仅玩家 |
|------|------|------|--------|
| `/mail` | 显示帮助信息 | `/mail` | 是 |
| `/mail inbox` | 以文字列表查看收件箱 | `/mail inbox` | 是 |
| `/mail read` | 打开收件箱 GUI | `/mail read` | 是 |
| `/mail read <编号>` | 阅读指定编号的邮件 | `/mail read 3` | 是 |
| `/mail sent` | 以文字列表查看发件箱 | `/mail sent` | 是 |
| `/mail sentgui` | 打开发件箱 GUI | `/mail sentgui` | 是 |
| `/mail claim <编号>` | 领取指定邮件的附件物品 | `/mail claim 1` | 是 |
| `/mail delete <编号>` | 删除指定邮件（需先领取附件） | `/mail delete 2` | 是 |
| `/mail delall` | 删除所有邮件（跳过有未领取附件的） | `/mail delall` | 是 |
| `/mail delread` | 删除所有已读邮件（跳过有未领取附件的） | `/mail delread` | 是 |
| `/sendmail <玩家> <标题>` | 发送文字邮件（会进入正文输入模式） | `/sendmail Steve 你好呀` | 是 |
| `/sendmail <玩家> <标题> attach` | 发送带物品附件的邮件 | `/sendmail Steve 礼物 attach` | 是 |

命令别名：`/mail` 和 `/inbox` 等效；`/sendmail` 和 `/sm` 等效。

### 管理员命令

| 命令 | 说明 | 示例 | 仅玩家 |
|------|------|------|--------|
| `/mail sendall <内容>` | 向全服所有玩家群发文字邮件 | `/mail sendall 服务器明天维护` | 是 |
| `/mail sendall <内容> items` | 群发带附件邮件（打开物品选择 GUI） | `/mail sendall 节日礼物 items` | 是 |
| `/recall` | 向所有注册玩家发送召回通知 | `/recall` | 否 |
| `/recall <消息>` | 发送自定义内容的召回通知 | `/recall 新版本上线了快回来看看` | 否 |

命令别名：`/recall` 和 `/callback` 等效。

### 权限节点

| 权限 | 说明 | 默认 |
|------|------|------|
| `ultimail.use` | 使用邮件系统（收件箱、发件箱、阅读、删除等） | 所有玩家 |
| `ultimail.send` | 发送邮件 | 所有玩家 |
| `ultimail.admin.sendall` | 群发邮件给全服玩家 | OP |
| `ultimail.admin.multiattach` | 发送邮件时使用多物品附件 GUI（普通玩家只能附带主手物品） | OP |
| `ultimail.recall` | 使用召回功能 | OP |

## 配置文件

配置文件路径：`plugins/UltiTools/UltiMail/config/mail.yml`

```yaml
# 每封邮件最多附带物品数量（范围：1-54）
max-items: 27

# 邮件过期天数（单位：天，0为永不过期，范围：0-365）
mail-expire-days: 30

# 玩家登录时是否通知未读邮件
notify-on-join: true

# 登录通知延迟（单位：秒，范围：0-60）
notify-delay: 3

# 邮件标题最大长度（范围：10-200）
max-subject-length: 50

# 邮件内容最大长度（范围：50-5000）
max-content-length: 500

# 发送邮件冷却时间（单位：秒，范围：0-300）
send-cooldown: 10

# 通知消息模板（支持颜色代码，{COUNT}=未读数量）
messages:
  new-mail: "&e[邮件] &f你有 &a{COUNT} &f封未读邮件！使用 /mail inbox 查看"
  # 邮件发送成功消息（{PLAYER}=收件人名称）
  mail-sent: "&a邮件已发送给 {PLAYER}！"
  # 收到新邮件消息（{SENDER}=发件人名称）
  mail-received: "&e[邮件] &f你收到了来自 &a{SENDER} &f的新邮件！"

# ========== 召回玩家功能配置 ==========

recall:
  # 服务器名称，用于召回邮件显示
  server-name: "Minecraft服务器"
  # 游戏内召回邮件标题（{SERVER}=服务器名称）
  subject: "[{SERVER}] 回归召唤"
  # 游戏内召回邮件内容（{SERVER}=服务器名称，{SENDER}=发送者名称）
  content: "亲爱的玩家，{SERVER}想念你了！\n\n快回来看看吧，我们期待与你重逢！\n\n发送者: {SENDER}"

# ========== 真实邮件发送配置（可选） ==========

email:
  # 是否启用真实邮件发送功能（需要 javax.mail 库）
  enabled: false
  # SMTP 服务器地址
  smtp-host: "smtp.example.com"
  # SMTP 端口（范围：1-65535）
  smtp-port: 587
  # SMTP 用户名
  smtp-username: ""
  # SMTP 密码
  smtp-password: ""
  # 发件人邮箱地址
  smtp-from-email: "noreply@example.com"
  # 是否使用 SSL 加密
  smtp-ssl: false
  # 是否使用 STARTTLS 加密
  smtp-starttls: true
  # 召回电子邮件标题（{SERVER}=服务器名称）
  recall-subject: "[{SERVER}] 我们想念你！"
  # 召回电子邮件内容（{SERVER}=服务器名称，{PLAYER}=玩家名称，{SENDER}=发送者名称）
  recall-content: "亲爱的 {PLAYER}，\n\n{SERVER} 服务器想念你了！快回来看看吧，我们期待与你重逢！\n\n发送者: {SENDER}"
```

## 使用教程

### 场景一：给朋友寄一封信

你想告诉朋友 Alex 明天一起挖矿：

1. 输入 `/sendmail Alex 明天挖矿`
2. 系统提示：*请输入邮件内容 (输入 'cancel' 取消):*
3. 输入：`明天下午三点老地方集合，记得带好钻石镐！`
4. 邮件自动发送，你会看到确认消息

即使 Alex 当前不在线，他下次登录时也会收到通知。

### 场景二：给朋友寄一把钻石剑

你想把一把钻石剑送给 Alex：

1. 把钻石剑拿在主手上
2. 输入 `/sendmail Alex 送你一把剑 attach`
3. 系统会从你的主手取走剑，然后提示你输入邮件正文
4. 输入随便一句话，比如 `用这把剑去打龙吧`
5. 邮件连同物品一起发送成功

Alex 收到邮件后，使用 `/mail claim 1`（假设是第 1 封）即可将剑领取到背包。

### 场景三：管理员群发维护通知

你是管理员，想通知全服明天维护：

```
/mail sendall 服务器明天凌晨两点维护，预计持续两小时
```

如果还想附带补偿物品给每个人，使用：

```
/mail sendall 维护补偿 items
```

系统会打开一个 45 格的物品选择界面，把要发的物品拖进去，点击确认按钮即可群发。

### 场景四：通过 GUI 管理邮件

1. `/mail read` 打开收件箱 GUI
2. 未读邮件显示为「可写的书」图标，已读邮件显示为「书」图标
3. 点击一封邮件：自动标记为已读，如果有附件且背包有空间则自动领取
4. 底部有翻页按钮和关闭按钮
5. `/mail sentgui` 可以打开发件箱 GUI，查看自己发出的邮件的状态

### 场景五：召回长期不上线的玩家

服务器更新了大版本，想召回老玩家：

```
/recall 服务器1.21大更新，新增了很多玩法，快回来看看吧！
```

系统会自动向所有注册玩家发送游戏内邮件。如果你在配置中启用了 SMTP 邮件功能，还会同时向绑定了邮箱的玩家发送真实电子邮件。

## 常见问题

### Q: 安装后不生效怎么办？

A: 检查以下几点：
- 确认 UltiTools-API 版本为 6.2.0 或更高
- 确认 JAR 文件放在 `plugins/UltiTools/plugins/` 目录下（不是 `plugins/` 根目录）
- 检查服务器日志中是否有 `UltiMail 已启用` 的信息
- 如果通过 `/upm install` 安装，需要重启服务器才能生效

### Q: 改了配置文件没效果？

A: 修改 `plugins/UltiTools/UltiMail/config/mail.yml` 后，使用 `/ul reload` 重载配置即可生效，无需重启服务器。注意配置文件中的数值有范围限制，超出范围的值会被忽略。

### Q: 权限怎么设置？

A: UltiMail 使用标准 Bukkit 权限系统，你可以通过任意权限管理插件（如 LuckPerms）来分配权限。例如：
- 允许所有玩家使用邮件：`ultimail.use` 和 `ultimail.send`（默认已有）
- 禁止某个玩家发送邮件：取消 `ultimail.send` 权限
- 允许管理员群发邮件：添加 `ultimail.admin.sendall` 权限

### Q: 普通玩家能附带多个物品吗？

A: 不能。普通玩家使用 `attach` 参数时只能附带主手中的一个物品，系统会自动从手中取走。拥有 `ultimail.admin.multiattach` 权限的管理员可以打开多物品选择界面，一次最多附带 45 个物品。

### Q: 邮件附件物品没领取就删除会怎样？

A: 不会发生。如果邮件包含未领取的附件物品，删除操作会被阻止，系统会提示你先领取附件再删除。批量删除操作（`/mail delall` 和 `/mail delread`）也会自动跳过有未领取附件的邮件。

### Q: 领取附件时背包满了怎么办？

A: 系统会在领取前检查你的背包是否有足够空位。如果空间不够，会提示你需要多少个空位，不会直接丢弃物品。

### Q: 召回功能需要 UltiLogin 吗？

A: 不需要。召回功能会优先尝试从 UltiLogin 获取注册玩家列表（如果已安装），但即使没有 UltiLogin，它也会从邮件记录和服务器的离线玩家数据中查找玩家。真实邮件发送功能需要玩家在 UltiLogin 中绑定过邮箱。

### Q: SMTP 邮件发送需要额外安装什么吗？

A: 需要服务器环境中包含 `javax.mail` 库。如果使用 Paper 服务端，可以将 JavaMail 库添加到 `plugin.yml` 的 `libraries` 部分自动下载。如果没有该库，游戏内邮件仍可正常使用，只是真实邮件发送功能不可用。

## 更新日志

### v1.1.0 (2026-02-13)

新增：
- 收件箱/发件箱分页 GUI 界面
- 群发邮件功能（`/mail sendall`）
- 批量删除命令（`/mail delall`、`/mail delread`）
- 登录通知支持可点击消息（点击直接打开收件箱）
- 管理员多物品附件 GUI
- 命令执行 API（邮件可携带命令，阅读时自动执行）
- 玩家召回功能（`/recall`），支持游戏内邮件和 SMTP 电子邮件
- SMTP 电子邮件发送配置
- GameMailService 接口实现，供其他模块通过框架 API 发送邮件
- 完善的 i18n 国际化（中英文语言包）

### v1.0.0 (2026-02-13)

新增：
- 基础邮件收发功能（发送、接收、阅读、删除）
- 物品附件支持（Base64 序列化存储）
- 登录时未读邮件通知
- 发件箱查看功能
- 发送冷却和长度限制
