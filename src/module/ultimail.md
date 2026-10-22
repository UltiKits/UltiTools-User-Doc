# UltiMail - 游戏内邮件系统

UltiMail 是 UltiTools 生态的邮件系统模块，为 Minecraft 服务器提供完整的玩家间邮件收发功能。

当前模块版本为 **2.0.0**，要求 **UltiTools-API 6.3.0 或更高版本**。先升级框架再更换 `UltiMail-2.0.0.jar`，放入 `plugins/UltiTools/plugins/` 后完整重启；`/ul reload` 不加载新 JAR。

## 功能概览

UltiMail 提供了一套完整的游戏内邮件系统。玩家可以向在线或离线的其他玩家发送文字邮件，还能把背包中的物品作为附件一并寄出。收件方登录服务器时会自动收到未读邮件的通知提示（可点击直接打开收件箱），邮件内容和附件都可以在图形化界面（GUI）中浏览和领取。管理员拥有群发邮件权限，支持一次性将通知或物品发送给全服所有玩家。此外还提供玩家召回功能，可以向所有注册玩家发送游戏内召回邮件，甚至通过 SMTP 发送真实电子邮件来召回长期未上线的玩家。

## 安装

**方式一：通过 UPM 安装（推荐）**

```
/upm install ultimail
```

**方式二：手动安装**

1. 确保服务器已安装 UltiTools-API 6.3.0 或更高版本
2. 下载 `UltiMail-2.0.0.jar`
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

系统会将你主手中的物品作为附件随邮件发出。管理员使用此命令时会打开一个图形选择界面，可以一次附带多叠物品，上限为 `max-items` 与 45 中较小值，默认 27。

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

这些权限节点未声明默认授权，默认仅 OP 拥有；普通玩家需显式授权。要使用下表的基础功能，请按需授予 `ultimail.use`、`ultimail.send`。例如用 LuckPerms 给默认玩家组授权：

```text
/lp group default permission set ultimail.use true
/lp group default permission set ultimail.send true
```

| 权限 | 说明 | 默认 |
|------|------|------|
| `ultimail.use` | 使用邮件系统（收件箱、发件箱、阅读、删除等） | OP（需显式授权普通玩家） |
| `ultimail.send` | 发送邮件 | OP（需显式授权普通玩家） |
| `ultimail.admin.sendall` | 群发邮件给全服玩家 | OP |
| `ultimail.admin.multiattach` | 发送邮件时使用多物品附件 GUI（普通玩家只能附带主手物品） | OP |
| `ultimail.recall` | 使用召回功能 | OP |

## 配置文件

配置文件路径：`plugins/UltiTools/pluginConfig/UltiMail/config/mail.yml`

```yaml
# 每封邮件最多附带物品数量（范围：1-54）
max-items: 27

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

# 在线收件人收到新邮件的提示
messages:
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

#### 配置项速查（本语言默认值）

| 键 | 类型 | 默认值 | 说明 / 范围 |
|---|---|---|---|
| `max-items` | number | `27` | 每封邮件最多附带物品数量（范围：1-54） |
| `notify-on-join` | boolean | `true` | 玩家登录时是否通知未读邮件 |
| `notify-delay` | number | `3` | 登录通知延迟（单位：秒，范围：0-60） |
| `max-subject-length` | number | `50` | 邮件标题最大长度（范围：10-200） |
| `max-content-length` | number | `500` | 邮件内容最大长度（范围：50-5000） |
| `send-cooldown` | number | `10` | 发送邮件冷却时间（单位：秒，范围：0-300） |
| `messages.mail-received` | text | `"&e[邮件] &f你收到了来自 &a{SENDER} &f的新邮件！"` | 收到新邮件消息（{SENDER}=发件人名称） |
| `recall.server-name` | text | `"Minecraft服务器"` | 服务器名称，用于召回邮件显示 |
| `recall.subject` | text | `"[{SERVER}] 回归召唤"` | 游戏内召回邮件标题（{SERVER}=服务器名称） |
| `recall.content` | text | `"亲爱的玩家，{SERVER}想念你了！\n\n快回来看看吧，我们期待与你重逢！\n\n发送者: {SENDER}"` | 游戏内召回邮件内容（{SERVER}=服务器名称，{SENDER}=发送者名称） |
| `email.enabled` | boolean | `false` | 是否启用真实邮件发送功能（需要 javax.mail 库） |
| `email.smtp-host` | text | `"smtp.example.com"` | SMTP 服务器地址 |
| `email.smtp-port` | number | `587` | SMTP 端口（范围：1-65535） |
| `email.smtp-username` | text | `""` | SMTP 用户名 |
| `email.smtp-password` | text | `""` | SMTP 密码 |
| `email.smtp-from-email` | text | `"noreply@example.com"` | 发件人邮箱地址 |
| `email.smtp-ssl` | boolean | `false` | 是否使用 SSL 加密 |
| `email.smtp-starttls` | boolean | `true` | 是否使用 STARTTLS 加密 |
| `email.recall-subject` | text | `"[{SERVER}] 我们想念你！"` | 召回电子邮件标题（{SERVER}=服务器名称） |
| `email.recall-content` | text | `"亲爱的 {PLAYER}，\n\n{SERVER} 服务器想念你了！快回来看看吧，我们期待与你重逢！\n\n发送者: {SENDER}"` | 召回电子邮件内容（{SERVER}=服务器名称，{PLAYER}=玩家名称，{SENDER}=发送者名称） |


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

系统会打开一个 45 格的物品选择界面，实际最多放 `min(max-items, 45)` 叠（默认 27）；支持 shift-click 与拖拽。点击确认按钮即可群发。

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
- 确认 UltiTools-API 版本为 6.3.0 或更高
- 确认 JAR 文件放在 `plugins/UltiTools/plugins/` 目录下（不是 `plugins/` 根目录）
- 检查服务器日志中是否有 `UltiMail 已启用` 的信息
- 如果通过 `/upm install` 安装，需要重启服务器才能生效

### Q: 改了配置文件没效果？

A: 修改 `plugins/UltiTools/pluginConfig/UltiMail/config/mail.yml` 后，使用 `/ul reload` 重载配置即可生效，无需重启服务器。数值超出范围时，启动会拒绝加载模块；在 `/ul reload` 时会拒绝这整个配置文件的变更，保留原运行值（同文件中其他有效改动也不会生效），不会自动改写文件。请先修正越界值，再重新执行重载。更换 JAR 仍需重启。

### Q: 权限怎么设置？

A: UltiMail 使用标准 Bukkit 权限系统，你可以通过任意权限管理插件（如 LuckPerms）来分配权限。例如：
- 允许所有玩家使用邮件：`ultimail.use` 和 `ultimail.send`（需显式授权普通玩家）
- 禁止某个玩家发送邮件：取消 `ultimail.send` 权限
- 允许管理员群发邮件：添加 `ultimail.admin.sendall` 权限

### Q: 普通玩家能附带多个物品吗？

A: 不能。普通玩家使用 `attach` 参数时只能附带主手中的一个物品，系统会自动从手中取走。拥有 `ultimail.admin.multiattach` 权限的管理员可以打开多物品选择界面，实际最多附带 `max-items` 与 45 中较小值的物品叠数，默认 27。

### Q: 邮件附件物品没领取就删除会怎样？

A: 不会发生。如果邮件包含未领取的附件物品，删除操作会被阻止，系统会提示你先领取附件再删除。批量删除操作（`/mail delall` 和 `/mail delread`）也会自动跳过有未领取附件的邮件。

### Q: 领取附件时背包满了怎么办？

A: 系统会在领取前检查你的背包是否有足够空位。如果空间不够，会提示你需要多少个空位，不会直接丢弃物品。

### Q: 召回功能需要 UltiLogin 吗？

A: 不需要。召回功能会优先尝试从 UltiLogin 获取注册玩家列表（如果已安装），但即使没有 UltiLogin，它也会从邮件记录和服务器的离线玩家数据中查找玩家。真实邮件发送功能需要玩家在 UltiLogin 中绑定过邮箱。

### Q: SMTP 邮件发送需要额外安装什么吗？

A: 召回邮件沿用服务器现有的 JavaMail（`javax.mail`）环境与 `config/mail.yml` 的 `email` 设置。若环境缺少该库，控制台会记录真实邮件发送失败；游戏内邮件不受影响。本次升级不要求修改 JAR、换服务商或轮换 SMTP 凭据。

### 升级、语言与附件处理

本页说明 UltiMail 2.0.0。配置中的 `mail-expire-days` 从未生效，本模块没有任何邮件过期机制；邮件保留到玩家删除。`messages.new-mail`、`messages.mail-sent` 也从未被读取。旧文件不会自动删键，启动与每次模块重载都会警告，可手动删除这些无效键。

登录未读通知与发出成功提示来自同一模块目录下 `lang/<语言>.yml` 的 `notify_new_mail`（保留 `{0}`）和 `mail_sent_success`（保留 `{RECEIVER}`）。自定义时复制官方文件为 `lang/zh-myserver.yml`，修改副本，并在 UltiTools 主配置设置 `language: zh-myserver`；直接修改官方文件会在启动或模块重载恢复，旧修改保留为 `.bak`。不要把旧的 `{COUNT}`、`{PLAYER}` 占位符直接搬过来。

`messages.mail-received` 与召回标题、内容、服务器名等六个文本设置仍为内置文本时，在启动与 `/ul reload` 后跟随语言；服主改过的值保留。若希望出厂文本不随语言，至少改一个字符。请在 `config/mail.yml` 修改它们，改已解压语言文件不会替代这些配置值。框架写入的配置注释也跟随语言，自写注释保留。

附件选择器有 45 个附件格，但实际接收上限为 `max-items` 与 45 中的较小值，默认 27。支持从自己的背包 shift-click 及拖拽进附件区；超限会提示，物品仍在背包，底部按钮行不能放物品。未确认关闭、取消、卸载，或正文输入在未发送时结束（任意大小写 `cancel`、120 秒超时、退出等）会归还附件；背包放不下的部分掉在脚下。发送失败与确认时超额的物品也按此处理。邮件创建之前这些物品仅在内存中，不代表停机后可恢复。

领取附件和执行附带命令先写入状态；记录失败就不发放，命令记录失败则一条都不执行并提示重新阅读。GUI 点击内的附件先领取，附带命令在下一 tick 执行，按原顺序执行；失败或未知命令记日志且不阻断后面的命令，也不会单独重试。旧版留下未完成状态的邮件，下次阅读可能重新执行一次。直接 `/mail read <编号>` 的时序不变。删除失败会显示未保存；批量删除继续处理并分别报告成功数和未删除数。不要把它理解为跨服务器或停机下的“恰好一次”保证。

### 已知限制与重载

标题末词 `attach`、群发正文末词 `items` 是附件开关；要以该词作为正文结尾，请换一种写法。只有开关、没有内容时不发送并显示帮助。主动把 `messages` 写成 `{}`、`~` 或 `null` 会保留该空值并使用默认文本；非中文服务器可能另有两条保存警告，不会覆盖值。需要默认子键时让 `messages:` 的冒号后留空，或明确写出 `mail-received`。

修改配置后可执行 `/ul reload UltiMail`（或全局 `/ul reload`）重读配置和语言，后续邮件使用新值；无效值会告警，条件组件的开关变化需要按框架提示重启，不会因重载自动创建或移除组件。新的 JAR 始终需要重启。召回仍使用现有邮件环境，本次升级不引入 SMTP 轮换或新服务商前提；不要修改模块 JAR 内的 `plugin.yml` 来配置邮件。

## 更新日志

### v2.0.0

#### 变更

- 本版本需要 UltiTools 6.3.0 或更高版本，并将 `plugin.yml` 中的 `api-version` 从 `620`（已发布的 1.1.0 的声明）
  提高到 `630`。更换模块 JAR 前请先升级 UltiTools；旧框架会在加载时拒绝本模块，并给出点名 `UltiMail` 的
  “UltiTools 版本过旧”警告。本模块使用的 `DataOperator.updateCounted` 在 6.2.1 至 6.2.5 的框架中不存在
  （UltiKits/UltiMail#7、UltiKits/UltiTools-Reborn#544）。

- `plugin.yml` 现在声明 `identify-string: ultimail`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。

- `config/mail.yml` 中的消息与标题设置——新邮件提醒（`messages.mail-received`）、召回邮件使用的服务器名称
  （`recall.server-name`）以及召回邮件和电子邮件的文本（`recall.subject`、`recall.content`、`email.recall-subject`、
  `email.recall-content`）——在模块启动时按服务器语言写入，文件内容即模块显示的内容；此前它们是写死的中文，
  `language: en` 对新邮件提醒和召回邮件都不起作用。仍为内置文本（任一语言的内置文本，或旧版本的出厂默认值）的设置会跟随
  `language`：模块启动或执行 `/ul reload` 后改写为当前语言的文本。你改过的设置保持不变，因此你已改成自己服务器名字的
  `recall.server-name` 会原样保留。若想保留内置文本又不让它跟随语言，请至少改动一个字符（UltiKits/UltiMail#22）。
  写入的是本模块的内置文本：请在 `config/mail.yml` 中修改这些设置；修改已解压的语言文件不会改变它们（旧版本同样从不从
  语言文件读取它们）。新邮件提醒仍用 `{SENDER}` 表示发件人。

#### 修复

- 邮件的存储行在此期间被移除时，对该邮件的改动现在在所有存储类型上都按“未保存”处理。此前若管理员或共享数据库上的另一台服务器在玩家打开
  收件箱期间删除了某封邮件，点击该邮件仍会记为已领取，并从已不存在的邮件里发放附件、执行附带命令。现在领取会被拒绝
  （`Your claim could not be recorded, so nothing was given. Please try again.`），附带命令不会执行，并记录日志；标记已读和删除邮件
  同样记录日志。此前只有 JSON 存储会报告缺行，并且报的是错误（UltiKits/UltiMail#44）。

- 在收件箱（`/mail read`）中点击邮件时，邮件附带的命令现在在点击之后的下一个服务器 tick 执行，而不是在点击事件内执行。
  框架现在在命令被派发的当下就运行它，因此会开关界面的附带命令（`/kits`、其他模块的菜单、`/mail sentgui`）
  原本会在点击事件内执行，Paper 不允许这样做，可能失败或让收件箱处于异常状态。邮件仍然先于任何命令被记录为已执行，
  失败的命令仍会记录日志且不会中断后面的命令，命令仍按书写顺序且只执行一次。同一次点击中的附件领取现在先于命令执行，
  因此发放物品的附带命令不会再占用领取所需的背包格子。以命令形式输入的 `/mail read <序号>`
  不变（UltiKits/UltiMail#43）。

- `config/mail.yml` 的注释现在跟随服务器语言。此前有二十条注释（文件中的每个设置）只有中文，`language: en`
  的全新安装得到的文件注释是中文。现在每条注释都是一个语言文件键，框架每次写入文件时按服务器的 `language` 解析，
  `lang/en.yml` 与 `lang/zh.yml` 各有英文和中文条目。已有服务器上框架在这二十个设置上写下的注释（包括旧版本写下的中文注释）
  会在下次启动时、以及你修改 `language` 并执行不带参数的 `/ul reload` 后切换为服务器语言；设置值不受影响，你自己写的注释保持原样
  （UltiKits/UltiTools-Reborn#611）（UltiKits/UltiMail#42）。

- 附件选择界面现在支持从自己背包 shift-click 放入物品（放进第一个空的附件格），也支持拖拽放入附件区域；此前两者都会被拒绝，
  只能逐个点击放入。界面中的附件已达上限（`max-items`，最多 45）时，会增加附件的 shift-click 或拖拽会被拒绝并提示上限，物品留在背包中；
  对 `/sendmail … attach` 而言，该上限现在就是 `max-items`（默认 27），与发送时的检查一致，此前窗口允许 45 个。
  拖入底部按钮行仍会被拒绝（UltiKits/UltiMail#32）。该检查取代了一个永远不会触发的 shift-click 守卫（UltiKits/UltiMail#26）。

- 存储无法记录删除时，`/mail delete`、`/mail delall`、`/mail delread` 不再中途停止。`/mail delete` 会提示邮件没有被删除；
  `delall` 和 `delread` 继续处理其余邮件，报告已删除的数量，并另行提示有多少封因存储未能记录而没有被删除、仍在收件箱中。
  此前数据库错误会在部分邮件已删除后中断命令，玩家只看到通用错误（UltiKits/UltiMail#38）。

- 控制台日志和召回邮件中插入的值按原样显示：同一行的所有占位符一次性替换。此前，值中若包含后面的占位符会被再次替换——
  安装目录名含 `{KEY}` 或 `{REASON}` 的服务器，已移除配置键警告会给出不存在的路径；召回电子邮件发送失败时，错误文本含
  `{EMAIL}` 会显示错误的地址；`recall.server-name` 含 `{SENDER}` 或 `{PLAYER}` 时会在召回邮件中被替换（UltiKits/UltiMail#37）。

- 修复：邮件附件与附带命令先写入已领取记录再发放，记录写失败时拒绝领取，不再可以重复领取。存储无法记录领取时，`/mail claim`
  和收件箱界面会回复「领取记录无法保存，未发放任何物品，请重试。」且不发放任何物品；无法记录附带命令已执行时，一条命令都不执行，
  并提示读者重新阅读邮件。执行失败或被服务器报告为未执行（如未知命令）的附带命令会连同邮件和命令一起记入日志，不会再次执行，也不再阻止其后的命令。对无法读取的附件执行
  `/mail claim` 现在回复「这封邮件没有附件！」，而不是报告领取了 0 个物品；标记邮件已读时的存储错误会被记入日志，不再中断阅读。
  旧版本未执行完附带命令的邮件（命令中途失败或记录写入失败），下次阅读时会把这些命令再执行一次，之后不再执行。调用 `MailService` 的插件：
  `claimItems` 签名不变，被拒绝的领取返回空数组；新增的 `claimAttachment` 还能区分「被拒绝」与「无可领取」（UltiKits/UltiMail#31）。

- `/mail help` 现在会列出 `/mail sentgui`，而且每行帮助只显示一次命令，`/sendmail` 帮助中关于附件的那一行也是如此。
  此前这些行都会把命令打印两遍，因为语言文件里的帮助文本本身已经以命令开头（UltiKits/UltiMail#21）。

- `language: en` 现在对其他模块可通过 UltiMail 的邮件服务发送的未读邮件提醒生效（原先是写死的中文，UltiKits/UltiMail#21），
  也对 `/recall` 打印的全部内容生效——权限拒绝、进度与汇总行以及帮助——并对召回邮件和电子邮件的文本生效
  （UltiKits/UltiMail#22）。三个命令的描述（由 `/help` 显示）也跟随 `language`。

- 登录时的邮件提醒现在会显示真实的未读数量、`[Click to view]` 只有一对方括号，原先显示 `&` 代码的地方现在显示为颜色：
  此前它显示为 `&e[Mail] &fYou have &a{0} &funread mail(s)! [&e[Click to view]]`。点击它仍会打开收件箱
  （UltiKits/UltiMail#24）。

- 控制台上的启用日志现在跟随 `language`（它原先查找的是任何语言文件都没有的中文句子），`language: zh` 下登录提醒的
  悬停文本来自中文语言文件（UltiKits/UltiMail#28）。`language: zh` 也对原先写死为英文的控制台日志生效：读取、领取、
  执行命令、更新邮件或转换物品失败，召回电子邮件发送失败，`/recall` 找不到 UltiLogin 的提示、模块卸载时无法关闭附件选择界面（现在通过本模块自己的日志器输出），
  以及本版本不再读取的配置键的警告。它们的英文措辞不变，只是残留的 `messages.new-mail` 的警告不再说提醒会漏掉数量。

- 重载本模块（`/ul reload UltiMail`，或对所有模块执行 `/ul reload`）现在会重新读取 `config/mail.yml`
  并刷新语言文件，修改后的 `max-subject-length` 等配置无需重启即可对下一封邮件生效。此前本模块的
  重载方法替换了框架的重载方法且只输出一行日志，这两步都不会执行。UltiTools 6.3.0 还会在此时报告
  `@ConditionalOnConfig` 漂移并输出框架自身的模块重载日志（UltiKits/UltiMail#20）。

- 卸载本模块（`/upm uninstall UltiMail`）现在会先由框架注销命令，再注销监听器，本模块的命令会被真正移除，
  其监听器也不再触发。模块的卸载钩子会在监听器被移除之前归还打开着的附件选择界面中的物品。此前本模块的卸载方法替换了框架的卸载方法且只输出一行日志，
  因此执行 `/upm uninstall UltiMail` 后，其命令和监听器都会保持生效，直到服务器重启（UltiKits/UltiMail#20）。

- 放入附件选择界面的物品在未点击"确认"就关闭该界面时会被归还——该界面可由持有
  `ultimail.admin.multiattach` 的发送者执行 `/sendmail <玩家> <主题> attach`，或执行
  `/mail sendall <内容> items` 打开。此前物品会被销毁：模块通过容器 holder 判断关闭的是哪个界面，
  而 GUI 库打开界面时 holder 始终为空，因此归还物品的代码永远不会执行。现在物品只会被归还一次，
  发送者背包放不下的部分会掉落在其脚下，而不再消失（UltiKits/UltiMail#27）。

- 另外三处归还邮件附件的位置现在同样会把放不下的物品掉落在发送者脚下，而不再销毁：点击"确认"时超出
  `max-items` 的部分、内容输入在未发送的情况下结束、以及服务器拒绝发送（例如收件人不存在）。此前这三处
  都会丢弃发送者背包容纳不下的物品（UltiKits/UltiMail#27）。

- 卸载本模块（`/upm uninstall UltiMail`）现在会在模块停止监听之前，把仍留在打开着的附件选择界面中的
  每一件物品归还发送者，并关闭该界面。此前这些物品会被销毁：归还物品的代码由容器关闭事件触发，而卸载
  模块会注销其监听器，因此不会有任何关闭事件到达它。放入该界面的物品在邮件创建之前只存在于内存中，
  所以事后也无从恢复（UltiKits/UltiMail#27）。

- 等在内容输入提示处的附件，现在只要该提示在邮件未发出的情况下结束就会被归还，无论以何种方式结束：
  输入任意大小写的 `cancel`、该提示 120 秒超时、发送者离开服务器，或由其他插件结束该提示。此前只有
  输入全小写的 `cancel` 才会归还。输入 `Cancel` 或 `CANCEL` 会走另一条路径结束该提示，既不输出任何
  提示也会销毁附件——因此手持一个铜锭、执行 `/sendmail <玩家> <主题> attach` 后输入 `Cancel` 的发送者，
  既拿不回铜锭，地上也没有掉落物，邮件同样不存在。现在上述每一条路径都会告知发送者发送已取消，而不再
  只有其中一部分会告知（UltiKits/UltiMail#27）。

#### 移除

- 从 `lang/en.yml` 与 `lang/zh.yml` 中移除 27 条从未被任何代码显示的条目：`gui_*` 翻页与按钮文字（页面使用 UltiTools 自带的）、
  `delete_confirm_*`（并不存在删除确认页面）、已被其他条目取代的 `send_*`（`input_content_prompt`、`mail_sent_success`、
  `error_no_item_in_hand`）、`attachment_gui_title`、`lore_subject`、`lore_items_count`、`error_no_permission`、
  `sendall_no_permission`（权限拒绝消息来自 UltiTools 自身）、`arg_number`、`arg_content` 与 `notify_mail_received`
  （新邮件提醒是 `config/mail.yml` 中的 `messages.mail-received`，其内置文本为 `mail_received`）；并从 `lang/en.yml` 中移除
  `notify_hover_hint`，登录提醒的悬停文本现在读取 `notify_hover_text`。

- 移除本模块在卸载与重载时输出的"UltiMail 已禁用！"与"UltiMail 配置已重载！"控制台行，以及未被使用的
  `mail_disabled`、`mail_reloaded` 语言键。UltiTools 6.3.0 会为每个模块输出一行重载日志
  （UltiKits/UltiMail#20）。

- 移除 `config/mail.yml` 中的 `mail-expire-days` 设置项（默认 `30`）。它在任何版本中都从未生效：没有任何代码
  读取它，本模块也没有任何形式的邮件过期，无论取值为何，邮件都会一直保留到玩家自行删除为止。邮件的行为不变。
  移除该设置项并不代表否决邮件过期功能：真正的实现需要决定的事情之一，是附件从未领取的邮件过期后如何处理，
  该功能请求由 UltiKits/UltiMail#34 跟踪。从旧版本升级的服务器，其 `mail.yml` 中仍会保留该键，因为框架从不删除
  运维文件中的键；只要该键还在，本模块会在启动时以及每次重载本模块时（`/ul reload` 或
  `/ul reload UltiMail`）记录一条警告，指出文件与键名，直接删除该键即可（UltiKits/UltiMail#23）。

- 移除 `config/mail.yml` 中的 `messages.new-mail` 与 `messages.mail-sent` 设置项。二者都从未生效：没有任何代码
  读取它们，修改它们从未改变玩家看到的内容。玩家登录时的未读邮件提醒，以及发送者发出邮件后收到的确认消息，
  本来就从本模块的语言文件读取文本——`config` 文件夹旁 `lang/<语言>.yml` 中的 `notify_new_mail` 与
  `mail_sent_success` 条目——因此会跟随服务器的 `language` 设置。要自定义它们，请把官方语言文件复制为以其语言代码加连字符开头的文件
  （例如 `lang/zh-myserver.yml`），在副本中修改这些条目，并在 `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver`；
  直接修改官方文件的改动会在下次启动或模块重载时被恢复，修改过的文件保留为 `.bak`（UltiKits/UltiTools-Reborn#616）。这两个条目的占位符与被移除的
  键不同：`notify_new_mail` 使用 `{0}`（旧键为 `{COUNT}`），`mail_sent_success` 以 `{RECEIVER}`
  （而非 `{PLAYER}`）表示收件人名称；照搬旧占位符的文本会被框架拒绝，并改用内置文本。登录提醒现在会把未读数量
  填入 `{0}`（UltiKits/UltiMail#24）。移除这些未使用的设置不会改变玩家看到的内容。
  同一段中的 `messages.mail-received`（在线收件人收到新邮件时看到的消息）会被读取，予以保留。从旧版本升级的
  服务器，其 `mail.yml` 中仍会保留这两个被移除的键；只要其中任一个还在，本模块会在启动时以及每次重载本模块时
  为它记录一条警告，指出文件、键名以及现在保存该文本的语言条目，直接删除该键即可（UltiKits/UltiMail#23）。


### v1.1.0 (2026-02-18)

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

以下基础功能也属于首次发布的 v1.1.0；本仓库没有单独发布过 v1.0.0：
- 基础邮件收发功能（发送、接收、阅读、删除）
- 物品附件支持（Base64 序列化存储）
- 登录时未读邮件通知
- 发件箱查看功能
- 发送冷却和长度限制
