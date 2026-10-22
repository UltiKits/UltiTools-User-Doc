# UltiLogin - 登录验证系统

UltiLogin 是 UltiTools 的玩家登录验证模块，为离线模式（offline-mode）服务器提供安全的注册和登录系统。

当前模块版本为 **2.0.0**，要求 **UltiTools-API 6.3.0 或更高版本**。先升级框架再更换 `UltiLogin-2.0.0.jar`，放入 `plugins/UltiTools/plugins/` 后完整重启；`/ul reload` 不加载新 JAR。

## 功能概述

UltiLogin 为服务器提供完整的账号保护方案。玩家进入服务器后必须注册或登录才能进行任何操作。登录前，移动、聊天、破坏方块、交互等所有行为都会被阻止，还可以给未登录玩家添加失明效果。系统支持两种登录模式：传统的命令模式（输入 `/login <密码>`）和可视化的 GUI 模式（在数字键盘界面点击输入密码）。密码使用 SHA-256 加盐（salt）哈希加密存储。此外还支持 IP 会话保持（短时间重连免登录）、登录失败锁定（防暴力破解）、同一 IP 注册数量限制等安全措施。管理员可以重置玩家密码、强制登录、删除账号和查看账号信息。v1.0.0 版还新增了邮箱绑定和密码找回功能，以及 UltiCloud 面板登录集成。

## 安装

### 方法一：通过 UPM 安装（推荐）

在游戏内或控制台执行：

```
/upm install ultilogin
```

### 方法二：手动安装

1. 先安装 UltiTools-API 6.3.0 或更高版本，再下载 `UltiLogin-2.0.0.jar`
2. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

## 快速开始

安装后，UltiLogin 会以默认配置自动启用：

1. **新玩家加入** - 看到提示 `请使用 /register <密码> <确认密码> 注册账号`
2. **注册** - 输入 `/register mypassword mypassword`
3. **注册成功** - 自动完成登录，可以正常游戏
4. **下次加入** - 看到提示 `请使用 /login <密码> 登录`
5. **登录** - 输入 `/login mypassword`

如果想使用 GUI 数字键盘模式，在配置文件中将 `gui-mode.enabled` 设为 `true`，执行 `/ul reload UltiLogin` 后，下次提示时使用数字键盘；网页创建且尚无游戏密码的账号除外。

## 命令

### 玩家命令

| 命令 | 别名 | 说明 | 权限 | 执行者 |
|------|------|------|------|--------|
| `/login <密码>` | `/l` | 登录账号 | 无需权限 | 仅玩家 |
| `/register <密码> <确认密码>` | `/reg` | 注册账号 | 无需权限 | 仅玩家 |
| `/changepassword <旧密码> <新密码> <确认新密码>` | `/changepw`, `/cpw` | 修改密码 | `ultilogin.changepassword` | 仅玩家 |
| `/panel` | - | 获取网页登录链接（需启用且服务器已登录 UltiCloud） | 无需权限 | 仅玩家 |
| `/setpassword <新密码> <确认新密码>` | `/setpw` | 已登录的无游戏密码账号设置首个密码 | 无需权限 | 仅玩家 |
| `/regs <邮箱>` | - | 绑定邮箱 | `ultilogin.email` | 仅玩家 |
| `/regs <验证码>` | - | 验证邮箱绑定 | `ultilogin.email` | 仅玩家 |
| `/recover` | - | 请求密码找回验证码 | `ultilogin.recover` | 仅玩家 |
| `/recover <验证码> <新密码> <确认密码>` | - | 用验证码重置密码 | `ultilogin.recover` | 仅玩家 |

### 管理员命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/logadmin reset <玩家> [密码]` | 重置玩家密码（省略密码则随机生成） | `/logadmin reset Steve abc123` |
| `/logadmin forcelogin <玩家>` | 强制让在线玩家完成登录 | `/logadmin forcelogin Steve` |
| `/logadmin unregister <玩家>` | 删除玩家账号 | `/logadmin unregister Steve` |
| `/logadmin info <玩家>` | 查看玩家账号详细信息 | `/logadmin info Steve` |

管理员命令别名：`/loginadmin`。所有管理员命令需要 `ultilogin.admin` 权限，支持玩家和控制台执行。

## 权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultilogin.changepassword` | 允许修改密码 | 所有玩家 |
| `ultilogin.admin` | 管理员命令权限 | OP |
| `ultilogin.email` | 邮箱绑定功能 | 所有玩家 |
| `ultilogin.recover` | 密码找回功能 | 所有玩家 |

## 配置

### 登录主配置

文件路径：`plugins/UltiTools/pluginConfig/UltiLogin/config/login.yml`

```yaml
# ==================== 基础设置 ====================

# 登录超时时间（单位：秒），超时将被踢出
# 范围：10-600
login-timeout: 60

# 启用会话功能（同一IP短期内无需重新登录）
session-enabled: true

# 会话过期时间（单位：分钟）
# 范围：1-1440
session-timeout: 30

# 同一IP最大注册账户数（0为不限制）
# 范围：0-100
max-register-per-ip: 0

# ==================== GUI 模式设置 ====================

gui-mode:
  # 启用 GUI 登录模式（数字键盘界面）
  enabled: false

  # GUI 模式密码位数（1-9 数字，推荐 4-6 位）
  # 范围：1-9
  password-length: 4

  # GUI 登录界面标题（支持颜色代码）
  title-login: "&6请输入密码"

  # GUI 注册界面标题
  title-register: "&6请设置密码"

  # GUI 确认密码界面标题
  title-confirm: "&6请再次输入密码"

# ==================== 命令模式密码设置 ====================

password:
  # 命令模式密码最小长度
  # 范围：4-32
  min-length: 6

  # 命令模式密码最大长度
  # 范围：6-128
  max-length: 32

# ==================== 登录安全保护 ====================

security:
  # 最大登录失败次数（0为不限制）
  # 范围：0-20
  max-login-attempts: 5

  # 登录失败封禁时长（单位：秒）
  # 范围：60-86400
  lockout-duration: 900

  # 封禁类型：IP / UUID / BOTH
  lockout-type: BOTH

# ==================== 位置设置 ====================

spawn-location:
  # 未登录时传送到指定位置
  enabled: false

  # 出生点世界名
  world: world

  # 出生点坐标
  x: 0
  y: 64  # 范围：-64 到 320
  z: 0

# ==================== 其他设置 ====================

# 未登录时允许执行的命令列表
allowed-commands:
  - login
  - l
  - register
  - reg
  - panel
  - regs
  - recover

# 未登录时给予失明效果
blind-effect: true

# ==================== UltiCloud 集成 ====================

ulticloud:
  # 启用 UltiCloud 集成（允许通过 /panel 命令打开网页面板登录）
  enabled: false

# ==================== 消息配置 ====================

messages:
  # 注册提示（命令模式）
  register-prompt: "&e请使用 /register <密码> <确认密码> 注册账号"

  # 注册提示（GUI模式）
  register-prompt-gui: "&e请在弹出的界面中设置密码"

  # 登录提示（命令模式）
  login-prompt: "&e请使用 /login <密码> 登录"

  # 登录提示（GUI模式）
  login-prompt-gui: "&e请在弹出的界面中输入密码"

  # 注册成功
  register-success: "&a注册成功！欢迎加入服务器！"

  # 登录成功
  login-success: "&a登录成功！欢迎回来！"

  # 已经登录
  already-logged: "&e你已经登录了！"

  # 未注册
  not-registered: "&c你还没有注册！请先注册。"

  # 已注册
  already-registered: "&c你已经注册过了！请直接登录。"

  # 密码不匹配
  password-mismatch: "&c两次输入的密码不一致！"

  # 密码太短（{MIN} 会被替换为最小长度）
  password-too-short: "&c密码太短！至少需要 {MIN} 个字符。"

  # 密码太长（{MAX} 会被替换为最大长度）
  password-too-long: "&c密码太长！最多 {MAX} 个字符。"

  # 超时踢出
  timeout-kick: "&c登录超时！请重新连接。"

  # 账户被锁定（{TIME} 会被替换为秒数）
  account-locked: "&c登录失败次数过多！请在 {TIME} 秒后重试。"

  # 剩余尝试次数（{COUNT} 会被替换为次数）
  attempts-remaining: "&c密码错误！剩余尝试次数: {COUNT}"

  # GUI密码无效（{LENGTH} 会被替换为位数）
  gui-password-invalid: "&c密码必须是 {LENGTH} 位数字！"

  # ==================== 管理员消息 ====================

  admin:
    # 管理员重置密码成功（{PLAYER}=玩家名, {PASSWORD}=新密码）
    password-reset: "&a已重置玩家 {PLAYER} 的密码为: {PASSWORD}"

    # 管理员强制登录
    force-login: "&a已强制登录玩家 {PLAYER}"

    # 管理员删除账号
    unregister: "&a已删除玩家 {PLAYER} 的账号"

    # 玩家不在线
    player-not-found: "&c找不到玩家 {PLAYER}"

    # 账号不存在
    account-not-found: "&c玩家 {PLAYER} 尚未注册"
```

#### 配置项速查（本语言默认值）

| 键 | 类型 | 默认值 | 说明 / 范围 |
|---|---|---|---|
| `login-timeout` | number | `60` | 登录超时时间（单位：秒），超时将被踢出；范围：10-600 |
| `session-enabled` | boolean | `true` | 启用会话功能（同一IP短期内无需重新登录） |
| `session-timeout` | number | `30` | 会话过期时间（单位：分钟）；范围：1-1440 |
| `max-register-per-ip` | number | `0` | 同一IP最大注册账户数（0为不限制）；范围：0-100 |
| `gui-mode.enabled` | boolean | `false` | 启用 GUI 登录模式（数字键盘界面） |
| `gui-mode.password-length` | number | `4` | GUI 模式密码位数（1-9 数字，推荐 4-6 位）；范围：1-9 |
| `gui-mode.title-login` | text | `"&6请输入密码"` | GUI 登录界面标题（支持颜色代码） |
| `gui-mode.title-register` | text | `"&6请设置密码"` | GUI 注册界面标题 |
| `gui-mode.title-confirm` | text | `"&6请再次输入密码"` | GUI 确认密码界面标题 |
| `password.min-length` | number | `6` | 命令模式密码最小长度；范围：4-32 |
| `password.max-length` | number | `32` | 命令模式密码最大长度；范围：6-128 |
| `security.max-login-attempts` | number | `5` | 最大登录失败次数（0为不限制）；范围：0-20 |
| `security.lockout-duration` | number | `900` | 登录失败封禁时长（单位：秒）；范围：60-86400 |
| `security.lockout-type` | text | `BOTH` | 封禁类型：IP / UUID / BOTH |
| `spawn-location.enabled` | boolean | `false` | 未登录时传送到指定位置 |
| `spawn-location.world` | text | `world` | 出生点世界名 |
| `spawn-location.x` | number | `0` | 出生点坐标 |
| `spawn-location.y` | number | `64` | 范围：-64 到 320 |
| `spawn-location.z` | number | `0` | 见键名及上方完整示例 |
| `allowed-commands` | list | `[login, l, register, reg, panel, regs, recover]` | ==================== 其他设置 ====================；未登录时允许执行的命令列表 |
| `blind-effect` | boolean | `true` | 未登录时给予失明效果 |
| `ulticloud.enabled` | boolean | `false` | 启用 UltiCloud 集成（允许通过 /panel 命令打开网页面板登录） |
| `messages.register-prompt` | text | `"&e请使用 /register <密码> <确认密码> 注册账号"` | 注册提示（命令模式） |
| `messages.register-prompt-gui` | text | `"&e请在弹出的界面中设置密码"` | 注册提示（GUI模式） |
| `messages.login-prompt` | text | `"&e请使用 /login <密码> 登录"` | 登录提示（命令模式） |
| `messages.login-prompt-gui` | text | `"&e请在弹出的界面中输入密码"` | 登录提示（GUI模式） |
| `messages.register-success` | text | `"&a注册成功！欢迎加入服务器！"` | 注册成功 |
| `messages.login-success` | text | `"&a登录成功！欢迎回来！"` | 登录成功 |
| `messages.already-logged` | text | `"&e你已经登录了！"` | 已经登录 |
| `messages.not-registered` | text | `"&c你还没有注册！请先注册。"` | 未注册 |
| `messages.already-registered` | text | `"&c你已经注册过了！请直接登录。"` | 已注册 |
| `messages.password-mismatch` | text | `"&c两次输入的密码不一致！"` | 密码不匹配 |
| `messages.password-too-short` | text | `"&c密码太短！至少需要 {MIN} 个字符。"` | 密码太短（{MIN} 会被替换为最小长度） |
| `messages.password-too-long` | text | `"&c密码太长！最多 {MAX} 个字符。"` | 密码太长（{MAX} 会被替换为最大长度） |
| `messages.timeout-kick` | text | `"&c登录超时！请重新连接。"` | 超时踢出 |
| `messages.account-locked` | text | `"&c登录失败次数过多！请在 {TIME} 秒后重试。"` | 账户被锁定（{TIME} 会被替换为秒数） |
| `messages.attempts-remaining` | text | `"&c密码错误！剩余尝试次数: {COUNT}"` | 剩余尝试次数（{COUNT} 会被替换为次数） |
| `messages.gui-password-invalid` | text | `"&c密码必须是 {LENGTH} 位数字！"` | GUI密码无效（{LENGTH} 会被替换为位数） |
| `messages.admin.password-reset` | text | `"&a已重置玩家 {PLAYER} 的密码为: {PASSWORD}"` | 管理员重置密码成功（{PLAYER}=玩家名, {PASSWORD}=新密码） |
| `messages.admin.force-login` | text | `"&a已强制登录玩家 {PLAYER}"` | 管理员强制登录 |
| `messages.admin.unregister` | text | `"&a已删除玩家 {PLAYER} 的账号"` | 管理员删除账号 |
| `messages.admin.player-not-found` | text | `"&c找不到玩家 {PLAYER}"` | 玩家不在线 |
| `messages.admin.account-not-found` | text | `"&c玩家 {PLAYER} 尚未注册"` | 账号不存在 |


### 邮箱配置

文件路径：`plugins/UltiTools/pluginConfig/UltiLogin/config/email.yml`

邮箱功能需要在 UltiTools 主配置中启用 EmailService（邮件服务）。

```yaml
# ==================== 验证码设置 ====================

verification:
  # 验证码长度（范围：4-8）
  code-length: 6

  # 验证码有效期（单位：秒，范围：60-1800）
  code-expiry-seconds: 300

  # 每个验证码最大尝试次数（范围：1-10）
  max-attempts: 3

  # 重新发送验证码冷却时间（单位：秒，范围：30-600）
  cooldown-seconds: 60

# ==================== 邮箱域名黑名单 ====================

# 被屏蔽的临时邮箱域名
domain-blacklist:
  - 10minutemail.com
  - tempmail.com
  - guerrillamail.com
  - mailinator.com
  - throwaway.email

# ==================== 账号限制 ====================

# 每个邮箱最多绑定账号数（范围：1-10）
max-accounts-per-email: 1

# ==================== 绑定奖励 ====================

reward:
  # 启用绑定邮箱奖励
  enabled: false

  # 绑定奖励命令（%player% 会被替换为玩家名）
  commands:
    - "givemoney %player% 500"
```

#### 配置项速查（本语言默认值）

| 键 | 类型 | 默认值 | 说明 / 范围 |
|---|---|---|---|
| `verification.code-length` | number | `6` | 验证码长度（范围：4-8） |
| `verification.code-expiry-seconds` | number | `300` | 验证码有效期（单位：秒，范围：60-1800） |
| `verification.max-attempts` | number | `3` | 每个验证码最大尝试次数（范围：1-10） |
| `verification.cooldown-seconds` | number | `60` | 重新发送验证码冷却时间（单位：秒，范围：30-600） |
| `domain-blacklist` | list | `[10minutemail.com, tempmail.com, guerrillamail.com, mailinator.com, throwaway.email]` | ==================== 邮箱域名黑名单 ====================；被屏蔽的临时邮箱域名 |
| `max-accounts-per-email` | number | `1` | ==================== 账号限制 ====================；每个邮箱最多绑定账号数（范围：1-10） |
| `reward.enabled` | boolean | `false` | 启用绑定邮箱奖励 |
| `reward.commands` | list | `["givemoney %player% 500"]` | 绑定奖励命令（%player% 会被替换为玩家名） |


## 使用教程

### 命令模式登录（默认）

这是最基本的使用方式，玩家通过输入命令完成注册和登录：

**新玩家注册流程：**
1. 进入服务器，屏幕显示 `请使用 /register <密码> <确认密码> 注册账号`
2. 输入 `/register MyPass123 MyPass123`（密码长度需在 6-32 个字符之间）
3. 看到 `注册成功！欢迎加入服务器！` 提示后即可正常游戏

**老玩家登录流程：**
1. 进入服务器，屏幕显示 `请使用 /login <密码> 登录`
2. 输入 `/login MyPass123`
3. 看到 `登录成功！欢迎回来！` 提示后即可正常游戏

### GUI 数字键盘模式

启用后，玩家加入时会自动弹出一个数字键盘界面：

**启用方法：** 在 `config/login.yml` 中设置 `gui-mode.enabled: true`

**界面说明：**
- 数字按钮 1-9：用不同颜色的羊毛方块表示，数量对应数字
- 密码显示：顶部纸张图标显示已输入/未输入位数（`●` 和 `○`）
- 确认按钮（绿色）：手动确认提交
- 清空按钮（红色）：清除已输入的密码
- 退出按钮（橙色）：关闭 GUI（但仍需登录才能游戏）

**注册流程：**
1. 弹出界面标题为"请设置密码"
2. 依次点击数字按钮输入密码（默认 4 位）
3. 输入完毕自动进入确认阶段，标题变为"请再次输入密码"
4. 再次输入相同密码
5. 密码匹配则注册成功

**登录流程：**
1. 弹出界面标题为"请输入密码"
2. 依次点击数字按钮输入密码
3. 输入完毕自动提交验证

关闭 GUI 后会自动重新打开，直到登录成功。

### 修改密码

已登录的玩家可以使用 `/changepassword` 命令修改密码：

```
/changepassword 旧密码 新密码 确认新密码
```

例如：`/cpw OldPass123 NewPass456 NewPass456`

### 绑定邮箱

登录后可以绑定邮箱用于密码找回：

1. 输入 `/regs your@email.com`
2. 收到邮件后，输入 `/regs 123456`（替换为实际验证码）
3. 看到绑定成功提示

注意事项：
- 必须先登录才能绑定邮箱
- 临时邮箱域名会被屏蔽
- 每个邮箱默认只能绑定 1 个账号
- 发送验证码有 60 秒冷却

### 密码找回

如果忘记密码但已绑定邮箱，可以通过邮箱找回：

1. 在登录前（未登录状态）输入 `/recover`
2. 收到验证码邮件
3. 输入 `/recover 123456 新密码 确认新密码`
4. 密码重置成功，自动完成登录

### 管理员操作

**重置玩家密码（指定密码）：**
```
/logadmin reset Steve newpassword
```

**重置玩家密码（随机生成）：**
```
/logadmin reset Steve
```
系统会生成一个随机密码并显示给管理员。请在游戏内执行重置；控制台回复含密码并进入日志，面板远程重置的命令本身也进入远程审计日志。

**强制在线玩家登录：**
```
/logadmin forcelogin Steve
```

**删除玩家账号（允许重新注册）：**
```
/logadmin unregister Steve
```

**查看玩家账号信息：**
```
/logadmin info Steve
```
显示玩家名、UUID、注册 IP、最后 IP、登录次数、邮箱绑定状态、注册和最后登录时间。

### 配置登录保护出生点

如果你希望未登录的玩家被传送到一个安全的区域（而不是停在他们退出时的位置）：

```yaml
spawn-location:
  enabled: true
  world: world
  x: 0
  y: 100
  z: 0
```

登录成功后，玩家会被自动传送回原来的位置。

## 常见问题

### 安装后不生效怎么办？

确认以下几点：
- JAR 文件放在 `plugins/UltiTools/plugins/` 目录下（不是 `plugins/` 根目录）
- 服务器已完全重启（不是 `/reload`）
- 控制台没有报错信息
- UltiTools-API 版本 >= 6.3.0
- 服务器是离线模式（`server.properties` 中 `online-mode=false`）

### 改了配置文件没效果？

修改 `config/login.yml` 或 `config/email.yml` 后，需要执行 `/ul reload` 或重启服务器。

### 权限怎么设置？

- `/login` 和 `/register` 不需要任何权限，所有玩家都能使用
- `/changepassword` 需要 `ultilogin.changepassword` 权限（默认所有玩家有）
- `/logadmin` 系列需要 `ultilogin.admin` 权限（默认只有 OP）
- `/regs` 需要 `ultilogin.email` 权限（默认所有玩家有）
- `/recover` 需要 `ultilogin.recover` 权限（默认所有玩家有）
- 使用权限插件（如 LuckPerms）按需调整

### GUI 模式和命令模式有什么区别？

| 对比项 | 命令模式（默认） | GUI 模式 |
|--------|-----------------|----------|
| 密码类型 | 任意字符 | 纯数字（1-9） |
| 密码长度 | 6-32 字符（可配置） | 固定位数（默认 4 位） |
| 操作方式 | 输入命令 | 点击数字按钮 |
| 安全性 | 较高（密码复杂） | 较低（纯数字短密码） |
| 便利性 | 需要打字 | 点击即可 |

推荐对安全性要求高的服务器使用命令模式，对便利性要求高的服务器（如小游戏服）使用 GUI 模式。

### 会话保持（Session）是什么意思？

启用后，玩家用相同 IP 地址在短时间内（默认 30 分钟）重新连接服务器时，不需要再次输入密码，系统会自动登录。这对掉线重连的玩家很方便。可以在配置中调整会话超时时间或禁用此功能。

### 玩家被锁定了怎么解除？

如果玩家因登录失败次数过多被锁定：
- **等待锁定时间到期** - 默认 900 秒（15 分钟）
- **管理员强制登录** - 执行 `/logadmin forcelogin 玩家名` 可让玩家游戏，但不解除或缩短已有封禁；不是清除 IP 封禁的办法
- **重启服务器** - 锁定信息存储在内存中，重启后清除

### 邮箱绑定不可用怎么办？

邮箱功能依赖 UltiTools 框架的 EmailService。如果提示"邮件服务未启用"：
1. 确认 UltiTools 主配置中已配置 SMTP 邮件服务
2. 确认邮件服务已启用且连接正常
3. 检查服务器控制台是否有邮件相关报错

### 网页面板登录与首个游戏密码

`/panel` 不要求玩家先在游戏内登录，但要求服主先在服务器控制台执行 `ulticloud login`，并在 `config/login.yml` 设置 `ulticloud.enabled: true`。创建和轮询链接都使用服务器所有者的 UltiCloud 凭据；旧匿名路径立即停用，没有匿名回退或宽限期。未登录 UltiCloud、连接失败或凭据被拒绝时，不生成链接；请按游戏和控制台提示处理，不要关闭认证来绕过。

1. 玩家执行 `/panel`，点击聊天中的链接（有效期五分钟）。仅打开链接不会登录。
2. 已关联的游戏名需要关联账号的密码，或点击一次该账号先前记住的设备；已在游戏内登录的玩家可以由已登录的网站账号确认关联；没有本服 UltiLogin 账号的名字可在网页新建账号。
3. 已有游戏账号但既未游戏内登录也未关联时，网页会拒绝并要求先执行 `/login`，然后重新执行 `/panel`。普通游戏 `/login`、正常网站账号登录，以及带链接代码的浏览器验证、完成和取消均仍可用。
4. 网页新建账号会在本服创建无游戏密码的账号并登录，提示 `/setpassword <新密码> <确认新密码>`。例如登录后输入 `/setpassword MyPass123 MyPass123`。已有密码请用 `/changepassword`。无游戏密码时 `/login` 始终拒绝，且不计为密码错误；GUI 模式也不会弹出无法验证的数字键盘。

待处理链接暂停未登录玩家的登录倒计时，但不解除移动、聊天等限制。网页取消、拒绝或过期后按剩余时间继续，绝不重新计满；创建失败静默恢复剩余倒计时。取消的链接到期前仍可在浏览器完成。玩家退出后待处理链接作废，之后网页完成不会登录任何人。网页结果和拒绝原因会在游戏显示，服务器凭据被拒绝也会记入控制台。再次执行 `/panel` 可继续按每个链接五分钟暂停倒计时，但仍受其他登录限制。

### 登录封禁与升级配置

新文件的 `max-register-per-ip` 为 `0`（不限），因为校园、移动网络等玩家可能共用公网地址。已有的 `3` 等取值不改写；若主动设上限，网页注册也受限，可能网页已注册而游戏因 IP 上限拒绝创建账号。

`security.lockout-type` 新默认是 `BOTH`：同一地址与同一账号组成一对，失败达到阈值封禁该组合；同一地址失败的不同账号数达到阈值，另封禁整个地址。`UUID` 仅按账号，`IP` 按地址共享。成功只清除自身 UUID 或组合计数，不清除 IP 计数或 BOTH 地址集合，也不缩短已有封禁。IP 计数及地址集合每个成员在各自最近失败的 `lockout-duration` 秒后过期；未锁定的 UUID/组合计数不随时间过期，对应成功或封禁到期才重置。

升级保留现有模式（含 `IP`、小写 `uuid`），不会自动启用新默认。若要切换，主动写入 `security.lockout-type: BOTH` 后执行 `/ul reload UltiLogin`。值忽略大小写和两端空格；无法使用的值警告并仅在内存用 BOTH，文件不改写。`security.max-login-attempts: 0` 不建立新的失败计数或封禁，输错时提示密码错误；不是解除已有封禁的命令。未转发真实玩家地址的代理会使多名玩家共用地址防护；这些措施也不能阻止跨许多地址分散猜测。

`allowed-commands: []` 或 `~` 不能用来禁止所有命令：运行中回退到出厂非空列表并警告，保留磁盘原值。要增减放行命令，请逐条修改列表。

### 语言、重载与已知限制

配置中的三个 GUI 标题与二十一条消息仍为内置文本（包括其他语言或旧出厂文本）时，会在启动和 `/ul reload` 后跟随服务器语言；服主改过的文本不变。若想保留出厂文本又不跟随语言，至少改一个字符。请在 `config/login.yml` 改这些文本，不要改语言文件来替代它们。框架已写的配置注释跟随语言更新，自写注释保留。官方 JSON 语言文件在启动和模块重载会恢复，旧修改保留为 `.bak`；自定义请复制为 `lang/zh-myserver.json`，在 UltiTools 主配置设置 `language: zh-myserver`。`messages.wrong-password` 从未生效，已不再写入新配置；旧文件中残留会警告，可删除。实际错误密码提示来自自定义语言文件的 `wrong_password`。

模块启用期间会遮蔽 Paper 玩家命令日志中的密码参数（含别名、大小写和命名空间），不遮蔽所有可能的输出：通过面板远程控制台发送密码重置仍写入远程命令与审计日志；在服务器控制台重置的回复仍含新密码并同步到面板日志流。请在游戏内执行管理员重置，回复仅发给执行者。若日志过滤器安装失败，启动会警告，不能假定已遮蔽。

会话自动登录也算游戏内已登录；共用公网 IP 的离线模式服务器上，别人可能在有效窗口以尚未关联的名字接管网页关联，请关闭会话（`session-enabled: false`）或尽早关联自己的名字。网页注册完成前已在游戏注册的账号保持不变。账号写入失败会记日志，但登录、面板登录和邮箱绑定仍沿原有失败路径继续；尤其绑定写入丢失仍可能提示成功并给奖励，不应把提示当成持久保存保证。仅更新 JAR 必须重启，`/ul reload UltiLogin` 只重读配置和语言；卸载会注销命令和监听器。

## 更新日志

### v2.0.0

#### 新增

- `/setpassword <新密码> <确认>`（别名 `/setpw`）为通过 `/panel` 在网页上创建的账号设置第一个游戏密码。仅在玩家已登录且账号没有
  游戏密码时可用，密码规则与 `/register` 相同；之后即可用 `/login` 登录。已有密码的账号会被提示使用 `/changepassword`。

- 网页注册视同 UltiLogin 注册。名字在本服务器上没有 UltiLogin 账号的玩家在 `/panel` 页面上新建 UltiKits 账号后，游戏会为其创建
  一个没有游戏密码的 UltiLogin 账号、让其登录，并提示一次用 `/setpassword` 设置游戏密码。在设置游戏密码之前，无论输入什么
  `/login` 都会拒绝该账号，且不计为密码错误。若玩家先在游戏内注册，则保留该账号不变。设置了 `max-register-per-ip` 时同样适用。
  在 `gui-mode.enabled: true` 下，这样的账号不会弹出任何数字都无法通过的数字键盘：进入服务器及每次再次提示时，玩家都会被告知
  用 `/panel` 登录，然后设置游戏密码。

- `/panel` 链接在网页上的每种结果都会在游戏内显示：网页取消、网页拒绝（附原因）、链接过期、登录成功，或服务器的 UltiCloud 凭据被
  拒绝（同时写入控制台）。未登录的玩家持有待处理链接期间，登录倒计时暂停；链接被取消、拒绝或过期后，按暂停时剩余的时间继续，
  绝不重新计满。其他限制保持不变。玩家离开服务器后其待处理链接作废，
  此后在网页上完成的登录不会让任何人登录。

#### 变更

- **登录封禁重构（UltiKits/UltiLogin#50）：** BOTH 改为按（地址、账号 UUID）组合计数并封禁，同一账号在其他地址不受该组合封禁影响；
  同一地址失败的不同账号数达到 `max-login-attempts` 时另封禁整个地址。成功只清除自身组合计数，不清除地址集合。
  IP 模式成功不再清除共用地址计数，修复成功登录清零绕过；IP 计数和 BOTH 的每个地址集合成员在最近一次失败的 `lockout-duration` 秒后过期。
  未封禁的 UUID/组合计数仍只在自身成功或对应封禁到期时重置。新文件或缺少键时默认 BOTH；现有值（含 IP、小写 uuid）逐字节保留，
  无效值只警告并在内存回退到 BOTH。已识别的旧出厂注释更新，自写注释不覆盖。

- **`/panel` 要求服务器先登录 UltiCloud。** 创建和轮询链接都使用服务器所有者的凭据；没有匿名回退，也不为旧插件保留宽限期。
  服务器未登录时不生成链接，玩家会被提示请服主在控制台执行 `ulticloud login`。创建失败会按剩余时间静默恢复登录倒计时，
  不会重新给予完整超时。凭据被拒绝（HTTP 401/403）时会在游戏内及控制台提示，绝不改用无凭据请求重试。仅打开链接不会让玩家登录：
  网页会要求输入关联账号的密码、使用该账号让其记住的设备（点击一次）、由已登录账号确认（仅限已在游戏内登录的玩家），或新建账号
  （仅限没有 UltiLogin 账号的名字）。已有 UltiLogin 账号、但既未在游戏内登录也未关联的名字会被拒绝，直到玩家先执行一次 `/login`。
  正常网站账号登录、浏览器链接验证／完成／取消，以及游戏 `/login` 均保留。

- UltiLogin 2.0.0 需要 UltiTools-API 6.3.0 或更高版本，`plugin.yml` 中的 `api-version` 从上一个发布版本 1.0.0 的 `620`
  提高到 `630`。更早的框架无法加载本模块；请先升级 UltiTools，再安装本模块。新的模块 JAR 需要重启服务器，`/ul reload` 只会
  重载配置（UltiKits/UltiTools-Reborn#544）。

- `plugin.yml` 现在声明 `identify-string: ultilogin`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和 `/upm update`
  会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，并可用 `/upm update` 安装
  （UltiKits/UltiTools-Reborn#474）。

- `config/login.yml` 中的 `max-register-per-ip` 出厂值由 `3` 改为 `0`（不限制同一 IP 的注册数）。许多玩家可能共用同一个公网
  IP（运营商级 NAT，在中国大陆以及移动网络、校园网中很常见），限制可能导致正常玩家无法注册；该键上方的注释现已写明这一点。
  只有缺少该键的文件才写入新默认值：文件中已有的值（包括 `3`）保持不变，只替换旧版本写在其上方的注释。设置限制后，它同样
  适用于通过 `/panel` 在网页上创建的账号：网页会显示注册成功，但游戏内拒绝创建账号，玩家会看到 IP 上限提示。

- `config/login.yml` 中的 `allowed-commands: []`（或 `~`）不再让未登录玩家的所有命令都被拒绝。该设置声明了 `@NotEmpty`，
  自 UltiTools 6.3.0 起框架把此类列表的空值视为不可用：模块改用出厂列表（`login, l, register, reg, panel, regs,
  recover`），并记录一条 WARNING，写明 `allowed-commands`、你写下的值与该默认值；文件保持你写的原样。此前 `[]` 按空列表
  加载，连 `/login` 与 `/register` 也会被拒绝；`~` 会使用默认列表，但文件会被改写。想放行更少的命令，请逐条列出；
  想放行更多，请追加（UltiKits/UltiLogin#52）。

- `config/login.yml` 中的消息与标题设置——三个界面标题（`gui-mode.title-login`、`gui-mode.title-register`、
  `gui-mode.title-confirm`）与二十一条消息（`messages.register-prompt`、`register-prompt-gui`、`login-prompt`、
  `login-prompt-gui`、`register-success`、`login-success`、`already-logged`、`not-registered`、`already-registered`、
  `password-mismatch`、`password-too-short`、`password-too-long`、`timeout-kick`、`account-locked`、`attempts-remaining`、
  `gui-password-invalid`，以及 `messages.admin.password-reset`、`force-login`、`unregister`、`player-not-found`、
  `account-not-found`）——在模块启动时按服务器语言写入，文件内容即模块显示的内容；此前它们是写死的中文，`language: en`
  对它们不起作用。仍为内置文本（任一语言的内置文本，或旧版本的出厂默认值）的设置会跟随 `language`：模块启动或执行
  `/ul reload` 后改写为当前语言的文本。你改过的设置保持不变。若想保留内置文本又不让它跟随语言，请至少改动一个字符
  （UltiKits/UltiLogin#20）。写入的是本模块的内置文本：请在 `config/login.yml` 中修改这些设置；修改已解压的语言文件不会改变它们（旧版本同样从不从语言文件读取它们）。

- `language: en` 现在对本模块显示或记录的全部内容生效：`/login`、`/register`、`/changepassword`、`/logadmin`、`/panel`
  的帮助，`/changepassword` 与 `/logadmin` 的回复，`/logadmin info` 信息块，IP 注册数达到上限时的拒绝提示，会话自动登录
  提示，登录与注册数字键盘（物品名称、说明、确认步骤与注册失败提示），七个命令描述以及控制台日志。其中大部分原先在任何
  语言下都是写死的中文，而语言文件中其实已有其中许多内容的无人读取的英文文本；控制台日志原先写死为英文，现在也跟随
  `language: zh`（UltiKits/UltiLogin#20）。

- 登录与注册数字键盘的按钮现在在任何语言以及你自定义的标题下都能正常使用；键盘如何识别见 `### Fixed` 中 UltiKits/UltiLogin#35
  一条。此前的识别方式是
  物品栏标题是否包含"密码"、"登录"或"注册"：标题不含这些词的键盘会取消每一次点击——标题跟随 `language` 后英文标题也会如此；
  而其他插件的物品栏只要标题恰好含有其中一个词，未登录的玩家就能在其中点击（UltiKits/UltiLogin#20）。

- `/recover <验证码> <密码> <确认密码>` 输错验证码时，现在会显示剩余尝试次数，例如 `验证码错误！剩余尝试次数: 2`。
  此前找回密码流程从未填入该值，直接显示占位符 `{COUNT}`；`/regs <验证码>` 一直是正常的（UltiKits/UltiLogin#21）。

- 未登录的玩家现在无法再为盔甲架穿脱物品、对实体身体的精确位置进行交互，也无法交换主手与副手的物品。此前这三种
  操作均可执行：登录保护已经拦截了普通的实体交互，但 Bukkit 通过各自独立的事件分发上述操作，因此原有的拦截从未
  收到它们。其中被报告并复现的是盔甲架穿戴——未登录玩家成功把一个方块装备到盔甲架上，其手持物品数量随之减少一个。

- 登录前书写告示牌现在会被拒绝。其他插件可以为尚未登录的玩家打开告示牌编辑界面，这一路径不经过该玩家自身的任何
  交互，因此此前没有任何拦截。除写入之外，打开编辑界面本身也会被拒绝。

- 登录前书写成书现在会被拒绝。未登录玩家确实能打开成书编辑界面——该界面由客户端自行打开，不询问服务器，因此
  任何拦截都无法阻止它打开——写入随后会独立到达服务器，而此前没有任何拦截。编辑界面仍会打开，但输入的正文与
  签名不再产生任何效果，成书保持空白。

- 以下操作在登录前同样会被拒绝，但并未证实存在可触发的路径，也可能本就不存在：在物品栏内拖拽物品、中键取物、
  将手持物品与装备栏互换，以及配方书点击。此处选择明确拒绝，而不是继续依赖"其他拦截使其无法触发"这一预期
  （UltiKits/UltiLogin#24）。

- 执行 `/upm uninstall UltiLogin` 后，本模块的命令（`/login`、`/register`、`/changepassword`、
  `/logadmin`、`/recover`、`/regs`、`/panel`）现在会被真正移除，其 `LoginProtectionListener` 监听器也不再
  触发。此前本模块用一个只打印日志的方法替换了框架的卸载方法，因此两者都会一直保持生效，直到服务器重启
  （UltiKits/UltiLogin#29）。

- 设置 `security.max-login-attempts: 0`（不限制尝试次数）时，输错密码现在回复“密码错误！请重试。”，不再在实际未封禁时声称
  账号已锁定。该回复取自本模块语言文件的 `wrong_password`，跟随 `language`。设置次数上限时，输错密码会显示剩余次数，
  只有实际达到封禁条件时才显示 `messages.account-locked`（UltiKits/UltiLogin#23）。

#### 移除

- 移除 `lang/en.yml` 与 `lang/zh.yml`。框架只读取 `lang/en.json` 与 `lang/zh.json`，两个 YAML 文件中的每一条都是同语言
  JSON 文件中某一条的副本，因此修改它们从未产生任何效果。若你在磁盘上自定义过 `lang/*.yml`，请把这些修改放进自定义语言文件，
  而不是官方的 `lang/*.json`：在同一 `lang/` 目录中把官方文件复制为以其语言代码加连字符开头、扩展名不变的文件
  （例如 `lang/zh-myserver.json`），并在 `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver`。在官方文件中
  做的修改会在每次启动和模块重载恢复该文件时被撤销，只保留在其 `.bak` 中（UltiKits/UltiTools-Reborn#616）。

- 移除 `email_bind_reward` 与 `panel_auth_success` 两个语言条目。从未有代码读取它们，因此移除它们不会改变玩家看到的任何内容。

- 移除本模块卸载时输出的"UltiLogin 已禁用！"控制台行、`/ul reload UltiLogin` 时输出的
  "UltiLogin 配置已重载！"控制台行，以及未被读取的 `login_disabled`、`login_reloaded` 语言键。
  UltiTools 6.3.0 会为每个模块输出一行重载日志（`Module 'UltiLogin' reloaded.`）。重载仍会像以前一样把
  `login.yml` 重新读入运行中的模块：此前本模块的重载方法已先调用框架的重载方法完成这一步
  （UltiKits/UltiLogin#29）。

- 移除 `config/login.yml` 中的 `messages.wrong-password` 设置项。它在任何版本中都从未生效：没有任何代码读取它，
  修改它从未改变玩家看到的内容。现在新增的"密码错误"回复（见 `### Fixed`）改为从本模块的语言文件读取文本——
  `config` 文件夹旁 `lang/<语言>.json` 中的 `wrong_password` 条目——因此会跟随服务器的 `language` 设置，
  要自定义它，请把官方语言文件复制为以其语言代码加连字符开头的文件（例如 `lang/zh-myserver.json`），在副本中修改
  `wrong_password`，并在 `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver`；直接修改官方文件的改动会在
  下次启动或模块重载时被恢复，修改过的文件保留为 `.bak`（UltiKits/UltiTools-Reborn#616）。
  从旧版本升级的服务器，其 `login.yml` 中仍会保留该键，因为框架从不删除运维文件中的键；只要该键还在，
  本模块会在启动时以及每次重载本模块时（`/ul reload` 或 `/ul reload UltiLogin`）记录一条警告，指出文件与键名，直接删除该键即可
  （UltiKits/UltiLogin#23）。

#### 修复

- 密码不再以明文进入服务器日志。Paper 会把玩家输入的每条命令写入控制台和 `logs/latest.log`，UltiTools-API 6.3.0 还会把控制台同步到
  UltiPanel 面板日志流，因此 `/login`、`/register`、`/changepassword`、`/setpassword`、`/recover` 和 `/logadmin reset`
  （含所有别名）过去会连同密码一起被记录。现在模块启用期间，服务器 Log4j 根日志器上的过滤器会把这些命令的参数替换为 `******`
  （`Steve issued server command: /login ******`），不区分大小写、带任何命名空间前缀均可；其他命令照常记录，模块卸载时过滤器随之
  移除。有两条路径未覆盖，已写入"已知限制"：通过面板远程控制台发送的重置，以及在控制台执行 `logadmin reset` 时的回复
  （UltiKits/UltiLogin#57）。

- 失败登录次数现在按 `security.lockout-type` 所封禁的对象计数。使用 `UUID` 时按账号计数：一个账号被封禁后，同一地址上
  的其他账号不再只差一次输错就被封禁，一个账号输错密码也不再算到另一个账号头上；`messages.attempts-remaining`
  同样按账号。使用 `IP` 时仍按地址计数（同一地址背后的账号共用，设计如此）。使用 `BOTH` 时按（地址、账号 UUID）组合计数，
  另统计每个地址上失败的不同账号数，详见上面的登录封禁重构；显示的剩余次数按组合计数
  （UltiKits/UltiLogin#48、UltiKits/UltiLogin#45）。

- 账号记录已不存在时的写入，现在在所有存储类型上都按失败处理。多台服务器共用数据库时，另一台服务器的
  `/logadmin unregister` 恰好发生在本模块读与写之间，过去这次写入会悄悄落空。六处写入（登录、面板登录、`/changepassword`、
  管理员重置密码、找回密码重置、绑定邮箱）现在都会先输出该处原有的错误日志，再附上“已存储的账号记录已不存在，未写入任何内容”，
  并沿用该处对失败写入原有的结果：管理员或找回重置不会给出新密码，`/changepassword` 不会改动任何内容；登录、面板登录和
  绑定邮箱则和写入失败时一样继续（绑定丢失的玩家仍会被告知绑定成功并领取奖励）（UltiKits/UltiLogin#47）。

- `config/login.yml` 与 `config/email.yml` 中各配置项上方的注释（分别 42 条和 8 条）现在取自模块的语言文件：
  `language: en` 的服务器全新安装时写入英文注释（此前所有语言下都写入纯中文注释）。框架在这些项上写下的注释（包括旧版本写下的
  中文注释，`security.lockout-type` 上方的旧注释也在内，UltiKits/UltiLogin#51）会在下次启动时、以及你修改 `language` 并执行
  不带参数的 `/ul reload` 后切换为服务器语言；配置值不变，你自己写的注释保持原样（UltiKits/UltiTools-Reborn#611）。`security.lockout-type` 上方的注释同时写明各类型计数和封禁的对象（见失败登录次数一条）（UltiKits/UltiLogin#46、UltiKits/UltiLogin#45）。

- 关于本版本已不再读取的配置项的控制台警告现在按原样给出文件路径：此前路径先于 `{KEY}`、`{REASON}` 占位符插入，
  安装目录名含这两个占位符的服务器会看到不存在的路径。现在同一行的所有占位符一次性替换（与 UltiKits/UltiMail#37 相同的修复）。

- 插件 NPC 不再被当作未登录玩家：带有 Citizens 等 NPC 插件所设 `NPC` 元数据的玩家型 NPC 不受登录保护的任何限制——可以受伤、乘骑和移动，
  也不会收到登录提示或因超时被踢出。此前这样的 NPC 无敌、无法乘骑，行驶中的载具还会让其下车（UltiKits/UltiLogin#42）。

- 在 `security.lockout-type: UUID` 下，封禁到期后玩家重新获得完整的 `security.max-login-attempts` 次机会。
  此前失败计数被保留，封禁结束后第一次输错密码就会立即再次锁定（UltiKits/UltiLogin#38）。

- `config/login.yml` 中无法使用的 `security.lockout-type`（忽略大小写及两端空格后，仍不是 `IP`、`UUID` 或 `BOTH` 的值）现在仅在
  内存中回退到 `BOTH`。模块在启动和 `/ul reload` 时会在控制台警告中原样引用该值，文件不变。此前无法识别的值会关闭登录封禁，
  而密码错误的回复仍称账号已被锁定（UltiKits/UltiLogin#37）。

- 注册窗口（`gui-mode.enabled: true`）在输入第一次密码后会显示 `gui-mode.title-confirm`，密码不一致后重新显示
  `gui-mode.title-register`：页面以新标题重新打开窗口，已输入的内容保留。此前标题只被记录，已打开的窗口仍显示最初的标题，
  两个阶段看起来一样（UltiKits/UltiLogin#25）。

- 修复：未登录玩家不能再在登录界面整理自己的背包。登录或注册数字键盘打开时，玩家自己背包那几行的点击此前是被允许的，因为键盘是按
  整个窗口的标题识别的，而窗口包含玩家自己的背包行。现在按打开的是哪个窗口识别——本模块自己的登录或注册页面，无论标题如何——并且
  只允许点击键盘本身；标题看起来像键盘的其他物品栏不再对未登录玩家打开（UltiKits/UltiLogin#35）。

- 修复：未登录玩家不能再被载具带着移动。此前矿车乘客、船的第二座乘客、被铁轨或水流带着走的玩家会在未登录状态下跨方块移动，
  因为只有操控载具的玩家会被拦住；坐在行驶中的矿车里下线的玩家重进时会被放回矿车并继续移动。现在未登录玩家不乘坐任何载具：
  上载具被拒绝，坐着下线的玩家重进后一刻会被请下载具（载具留在原处），登录被撤销时会下载具，行驶中的矿车或船会让这样的乘客下车。
  登录后可以重新上载具（UltiKits/UltiLogin#41）。

### v1.0.0 (2026-02-15)

新增：登录验证系统核心功能
- 新增：玩家注册和登录，支持命令模式和 GUI 数字键盘模式
- 新增：SHA-256 + Salt 密码加密存储
- 新增：IP 会话保持（同一 IP 短期重连免登录）
- 新增：登录超时自动踢出
- 新增：登录前全操作保护（移动、聊天、破坏、交互等全部阻止）
- 新增：未登录时失明效果
- 新增：未登录时传送到指定出生点
- 新增：登录失败锁定机制（支持 IP / UUID / BOTH 封禁）
- 新增：同一 IP 注册数量限制
- 新增：修改密码命令（`/changepassword`）
- 新增：管理员命令（重置密码、强制登录、删除账号、查看信息）
- 新增：GUI 数字键盘登录模式（可选）
- 新增：邮箱绑定（`/regs <邮箱>`）和验证码验证
- 新增：邮箱密码找回（`/recover`）
- 新增：邮箱绑定奖励（可配置命令奖励）
- 新增：临时邮箱域名黑名单
- 新增：UltiCloud 面板集成（`/panel` 命令）
- 新增：登录前允许命令白名单
- 新增：所有消息可自定义（配置文件中的 messages 部分）
- 新增：中英文双语支持
