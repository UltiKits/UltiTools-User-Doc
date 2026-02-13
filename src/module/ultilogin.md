# UltiLogin - 登录验证系统

UltiLogin 是 UltiTools 的玩家登录验证模块，为离线模式（offline-mode）服务器提供安全的注册和登录系统。

## 功能概述

UltiLogin 为服务器提供完整的账号保护方案。玩家进入服务器后必须注册或登录才能进行任何操作。登录前，移动、聊天、破坏方块、交互等所有行为都会被阻止，还可以给未登录玩家添加失明效果。系统支持两种登录模式：传统的命令模式（输入 `/login <密码>`）和可视化的 GUI 模式（在数字键盘界面点击输入密码）。密码使用 SHA-256 加盐（salt）哈希加密存储。此外还支持 IP 会话保持（短时间重连免登录）、登录失败锁定（防暴力破解）、同一 IP 注册数量限制等安全措施。管理员可以重置玩家密码、强制登录、删除账号和查看账号信息。v1.0.0 版还新增了邮箱绑定和密码找回功能，以及 UltiCloud 面板登录集成。

## 安装

### 方法一：通过 UPM 安装（推荐）

在游戏内或控制台执行：

```
/upm install UltiLogin
```

### 方法二：手动安装

1. 下载 `UltiLogin` 的 JAR 文件
2. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

## 快速开始

安装后，UltiLogin 会以默认配置自动启用：

1. **新玩家加入** - 看到提示 `请使用 /register <密码> <确认密码> 注册账号`
2. **注册** - 输入 `/register mypassword mypassword`
3. **注册成功** - 自动完成登录，可以正常游戏
4. **下次加入** - 看到提示 `请使用 /login <密码> 登录`
5. **登录** - 输入 `/login mypassword`

如果想使用 GUI 数字键盘模式，在配置文件中将 `gui-mode.enabled` 设为 `true`，重启后玩家加入时会自动弹出数字键盘界面。

## 命令

### 玩家命令

| 命令 | 别名 | 说明 | 权限 | 执行者 |
|------|------|------|------|--------|
| `/login <密码>` | `/l` | 登录账号 | 无需权限 | 仅玩家 |
| `/register <密码> <确认密码>` | `/reg` | 注册账号 | 无需权限 | 仅玩家 |
| `/changepassword <旧密码> <新密码> <确认新密码>` | `/changepw`, `/cpw` | 修改密码 | `ultilogin.changepassword` | 仅玩家 |
| `/panel` | - | 打开 UltiCloud 面板（需启用） | 无需权限 | 仅玩家 |
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

文件路径：`plugins/UltiTools/UltiLogin/config/login.yml`

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
max-register-per-ip: 3

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
  lockout-type: IP

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

  # 密码错误
  wrong-password: "&c密码错误！请重试。"

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

### 邮箱配置

文件路径：`plugins/UltiTools/UltiLogin/config/email.yml`

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
系统会生成一个随机密码并显示给管理员。

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
- UltiTools-API 版本 >= 6.2.0
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
- **管理员强制登录** - 执行 `/logadmin forcelogin 玩家名`
- **重启服务器** - 锁定信息存储在内存中，重启后清除

### 邮箱绑定不可用怎么办？

邮箱功能依赖 UltiTools 框架的 EmailService。如果提示"邮件服务未启用"：
1. 确认 UltiTools 主配置中已配置 SMTP 邮件服务
2. 确认邮件服务已启用且连接正常
3. 检查服务器控制台是否有邮件相关报错

## 更新日志

### v1.0.0 (2026-02-13)

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
