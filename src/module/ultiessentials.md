# UltiEssentials

服务器基础功能模块 -- 传送、玩家管理、封禁、箱子锁、计分板等一站式解决方案。

## 功能概述

UltiEssentials 是 UltiTools 框架下功能最丰富的基础插件模块，涵盖了 Minecraft 服务器日常运营所需的绝大多数工具。传送方面支持出生点、主城、随机野外传送、回到上一次传送点、家系统（多个家）、地标系统（Warp）以及 TPA 玩家间传送请求；玩家状态方面提供飞行开关、生命值/饱食度恢复、移动速度调整、游戏模式切换及快捷命令、隐身模式；管理工具包括查看他人背包/末影箱/装备、白名单管理、封禁系统（永久封禁、临时封禁、解封、封禁列表）；服务器自定义则涵盖 MOTD 定制、Tab 栏自定义、头顶称号显示、命令别名、定时命令执行、箱子锁、死亡惩罚和计分板（Scoreboard）。所有功能均可在配置中独立开关。

## 安装

**方法一：通过 UPM（UltiTools Package Manager）安装**

```
/upm install UltiEssentials
```

**方法二：手动安装**

1. 确保服务器已安装 UltiTools-API 6.2.0 或更高版本
2. 将 `UltiEssentials-1.0.0.jar` 放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

## 快速入门

安装完成后，管理员可以立即开始使用。下面是一个典型的初始配置流程：

```
1. 站在你想要设置为出生点的位置
   /setspawn

2. 站在你想要设置为主城的位置
   /setlobby

3. 创建一个地标点
   /setwarp shop

4. 设置一个家
   /sethome base

5. 测试功能
   /spawn        -- 传送到出生点
   /lobby        -- 传送到主城
   /warp shop    -- 传送到地标点
   /home base    -- 传送到家
   /back         -- 返回上一个位置
```

## 命令列表

### 传送类命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/back` | 返回上一个传送位置（仅记录命令触发的传送） | `ultiessentials.back` | 仅玩家 |
| `/spawn` | 传送到出生点 | `ultiessentials.spawn.teleport` | 仅玩家 |
| `/setspawn` | 将当前位置设为出生点 | `ultiessentials.spawn.set` | 仅玩家 |
| `/lobby` 或 `/hub` | 传送到主城 | `ultiessentials.lobby.teleport` | 仅玩家 |
| `/setlobby` 或 `/sethub` | 将当前位置设为主城 | `ultiessentials.lobby.set` | 仅玩家 |
| `/wild` 或 `/rtp` | 随机传送到野外安全位置（60秒冷却） | `ultiessentials.wild` | 仅玩家 |

### 家系统命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/home` 或 `/h` | 传送到默认的家（名为 "home"），若无则传送到第一个家 | `ultiessentials.home` | 仅玩家 |
| `/home <名称>` | 传送到指定名称的家 | `ultiessentials.home` | 仅玩家 |
| `/sethome` 或 `/sh` | 设置默认家（名为 "home"） | `ultiessentials.sethome` | 仅玩家 |
| `/sethome <名称>` | 设置一个带名称的家 | `ultiessentials.sethome` | 仅玩家 |
| `/delhome <名称>` | 删除一个家（别名：`/deletehome`、`/rmhome`） | `ultiessentials.delhome` | 仅玩家 |
| `/homes` 或 `/homelist` | 列出所有家及坐标 | `ultiessentials.homes` | 仅玩家 |

### TPA 传送请求命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/tpa <玩家>` | 请求传送到某玩家身边 | `ultiessentials.tpa` | 仅玩家 |
| `/tpahere <玩家>` 或 `/tphere <玩家>` | 请求某玩家传送到你身边 | `ultiessentials.tpahere` | 仅玩家 |
| `/tpaccept` | 接受传送请求（别名：`/tpyes`、`/tpok`） | `ultiessentials.tpaccept` | 仅玩家 |
| `/tpdeny` | 拒绝传送请求（别名：`/tpno`、`/tpcancel`） | `ultiessentials.tpdeny` | 仅玩家 |

### 地标系统命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/warp <名称>` 或 `/w <名称>` | 传送到地标点 | `ultiessentials.warp.use` | 仅玩家 |
| `/warps` | 列出所有可用的地标点（别名：`/warplist`、`/listwarp`） | `ultiessentials.warp.list` | 仅玩家 |
| `/setwarp <名称> [权限]` | 在当前位置创建地标点，可选指定访问权限（别名：`/swarp`、`/addwarp`） | `ultiessentials.warp.set` | 仅玩家 |
| `/delwarp <名称>` | 删除地标点（别名：`/deletewarp`、`/rmwarp`、`/removewarp`） | `ultiessentials.warp.delete` | 仅玩家 |

### 玩家状态命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/fly` | 切换自己的飞行模式 | `ultiessentials.fly` | 仅玩家 |
| `/fly <玩家>` | 切换其他玩家的飞行模式 | `ultiessentials.fly` | 仅玩家 |
| `/heal` | 恢复自己的生命值到满 | `ultiessentials.heal.self` | 仅玩家 |
| `/heal <玩家>` | 恢复其他玩家的生命值 | `ultiessentials.heal.other` | 仅玩家 |
| `/feed` | 恢复自己的饱食度到满 | `ultiessentials.heal.self` | 仅玩家 |
| `/feed <玩家>` | 恢复其他玩家的饱食度 | `ultiessentials.heal.other` | 仅玩家 |
| `/speed <0-10>` | 设置移动速度（0 为重置，1-10 为倍数） | `ultiessentials.speed` | 仅玩家 |
| `/speed reset` | 重置移动速度为默认值 | `ultiessentials.speed` | 仅玩家 |
| `/gm <模式>` | 切换自己的游戏模式 | `ultiessentials.gamemode.self` | 仅玩家 |
| `/gm <模式> <玩家>` | 切换其他玩家的游戏模式 | `ultiessentials.gamemode.other` | 仅玩家 |
| `/gms` | 快捷切换到生存模式 | `ultiessentials.gamemode.self` | 仅玩家 |
| `/gmc` | 快捷切换到创造模式 | `ultiessentials.gamemode.self` | 仅玩家 |
| `/gmsp` | 快捷切换到旁观模式 | `ultiessentials.gamemode.self` | 仅玩家 |
| `/hide` 或 `/vanish` | 切换隐身模式（对其他玩家不可见） | `ultiessentials.hide` | 仅玩家 |

游戏模式参数说明：`0` / `s` / `survival` = 生存，`1` / `c` / `creative` = 创造，`2` / `a` / `adventure` = 冒险，`3` / `sp` / `spectator` = 旁观。

### 封禁系统命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/ban <玩家> [原因]` | 永久封禁玩家（别名：`/eban`） | `ultiessentials.ban` | 玩家 + 控制台 |
| `/tempban <玩家> <时长> [原因]` | 临时封禁玩家（别名：`/tban`） | `ultiessentials.ban.temp` | 玩家 + 控制台 |
| `/unban <玩家>` | 解除玩家封禁（别名：`/pardon`） | `ultiessentials.unban` | 玩家 + 控制台 |
| `/banlist [页码]` | 查看封禁列表（别名：`/bans`） | `ultiessentials.banlist` | 玩家 + 控制台 |

临时封禁时长格式：`1d` = 1天，`2h` = 2小时，`30m` = 30分钟，`1w` = 1周。可以组合使用，例如 `1d12h30m` = 1天12小时30分钟。

### 管理工具命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/invsee <玩家>` | 打开并查看目标玩家的背包 | `ultiessentials.invsee` | 仅玩家 |
| `/endersee <玩家>` 或 `/echest <玩家>` | 查看目标玩家的末影箱 | `ultiessentials.endersee` | 仅玩家 |
| `/armorsee <玩家>` | 查看目标玩家的装备栏和副手 | `ultiessentials.armorsee` | 仅玩家 |
| `/lock` 或 `/l` | 锁定你正在看向的容器（箱子等） | `ultiessentials.lock` | 仅玩家 |
| `/unlock` 或 `/ul` | 解锁你正在看向的容器 | `ultiessentials.lock` | 仅玩家 |
| `/unlock info` | 查看容器的锁定信息 | `ultiessentials.lock` | 仅玩家 |
| `/scoreboard` 或 `/sb` | 切换计分板显示 | `ultiessentials.scoreboard` | 仅玩家 |
| `/scoreboard on` | 开启计分板 | `ultiessentials.scoreboard` | 仅玩家 |
| `/scoreboard off` | 关闭计分板 | `ultiessentials.scoreboard` | 仅玩家 |

### 白名单管理命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/wl add <玩家>` | 添加玩家到白名单 | `ultiessentials.whitelist.manage` | 玩家 + 控制台 |
| `/wl remove <玩家>` | 从白名单移除玩家 | `ultiessentials.whitelist.manage` | 玩家 + 控制台 |
| `/wl list` | 查看白名单列表 | `ultiessentials.whitelist.manage` | 玩家 + 控制台 |
| `/wl on` | 启用白名单 | `ultiessentials.whitelist.manage` | 玩家 + 控制台 |
| `/wl off` | 禁用白名单 | `ultiessentials.whitelist.manage` | 玩家 + 控制台 |
| `/wl status` | 查看白名单状态 | `ultiessentials.whitelist.manage` | 玩家 + 控制台 |

## 配置文件

所有配置文件位于 `plugins/UltiTools/UltiEssentials/` 目录下。

### 主配置 config/essentials.yml

```yaml
features:
  # ===== 传送类功能 =====
  back:
    enabled: true                    # 启用 /back 返回命令
  spawn:
    enabled: true                    # 启用 /spawn 出生点命令
  lobby:
    enabled: true                    # 启用 /lobby 主城命令
  wild:
    enabled: true                    # 启用 /wild 随机传送
    max-range: 10000                 # 随机传送最大范围（单位：方块）
    min-range: 100                   # 随机传送最小范围（单位：方块）
    cooldown: 60                     # 冷却时间（单位：秒）
  recall:
    enabled: true                    # 启用 /recall 召回命令

  # ===== 玩家状态功能 =====
  fly:
    enabled: true                    # 启用 /fly 飞行命令
  heal:
    enabled: true                    # 启用 /heal 和 /feed 命令
  speed:
    enabled: true                    # 启用 /speed 速度命令
    max-speed: 10                    # 最大速度倍数（1-10）
  gamemode:
    enabled: true                    # 启用 /gm 游戏模式命令
  hide:
    enabled: true                    # 启用 /hide 隐身命令

  # ===== 管理工具 =====
  invsee:
    enabled: true                    # 启用 /invsee /endersee /armorsee 查看命令
  whitelist:
    enabled: true                    # 启用 /wl 白名单命令

  # ===== 服务器自定义 =====
  motd:
    enabled: true                    # 启用 MOTD 自定义
  tab-bar:
    enabled: true                    # 启用 Tab 栏自定义

  # ===== 家系统 =====
  home:
    enabled: true                    # 启用 /home 系统
    default-max-homes: 3             # 默认最大家数量（1-100）
    teleport-warmup: 3               # 传送预热时间（单位：秒，0 为立即传送）
    cancel-on-move: true             # 移动时取消传送预热

  # ===== TPA 传送请求 =====
  tpa:
    enabled: true                    # 启用 /tpa 传送请求
    timeout: 30                      # 请求超时时间（单位：秒，5-300）
    cooldown: 10                     # 发送请求冷却时间（单位：秒，0-600）
    allow-cross-world: true          # 允许跨世界 TPA

  # ===== 地标系统 =====
  warp:
    enabled: true                    # 启用 /warp 地标系统
    teleport-warmup: 3               # 地标传送预热时间（单位：秒）

  # ===== 封禁系统 =====
  ban:
    enabled: true                    # 启用封禁系统
    broadcast-ban: true              # 封禁时广播消息
    broadcast-unban: true            # 解封时广播消息

  # ===== 计分板 =====
  scoreboard:
    enabled: true                    # 启用计分板功能
    auto-enable: true                # 玩家进入时自动启用计分板
    update-interval: 1               # 更新间隔（单位：秒，1-60）
    title: "&6&l服务器信息"           # 计分板标题（支持 PlaceholderAPI）
    lines:                           # 计分板内容行（支持 PlaceholderAPI）
      - "&7欢迎, &e%player_name%"
      - "&7"
      - "&6在线玩家: &f%online_players%/%max_players%"
      - "&6当前世界: &f%player_world%"
      - "&7"
      - "&6生命值: &c%player_health%"
      - "&6饥饿值: &a%player_food%"
      - "&6等级: &e%player_level%"
      - "&7"
      - "&ewww.example.com"

  # ===== 定时命令 =====
  scheduled-commands:
    enabled: false                   # 启用定时命令执行
    commands:                        # 格式: 间隔秒数:命令
      - "300:say Server is online!"
      - "600:broadcast &cReminder: follow server rules!"

  # ===== 箱子锁 =====
  chestlock:
    enabled: true                    # 启用箱子锁功能
    admin-bypass: true               # 管理员可以绕过锁定

  # ===== 死亡惩罚 =====
  deathpunish:
    enabled: false                   # 启用死亡惩罚（默认关闭）
    money:
      enabled: false                 # 启用金币惩罚（需要 Vault 经济插件）
      percent: 10.0                  # 掉落金币百分比（0-100）
      max: 1000.0                    # 最大掉落金币（0 为无限制）
    item:
      enabled: false                 # 启用物品掉落惩罚
      drop-chance: 50.0              # 物品掉落概率（百分比，0-100）
      keep-other: true               # 保留未掉落的物品
      whitelist:                     # 不会掉落的物品类型
        - "DIAMOND_SWORD"
        - "DIAMOND_PICKAXE"
    exp:
      enabled: false                 # 启用额外经验损失
      percent: 20.0                  # 额外经验损失百分比（0-100）
    command:
      enabled: false                 # 启用命令惩罚
      commands:                      # 死亡时执行的命令（{PLAYER} 替换为玩家名）
        - "say {PLAYER} 死亡了!"
    world-whitelist:                 # 不进行惩罚的世界
      - "world_creative"

  # ===== 头顶称号 =====
  nameprefix:
    enabled: false                   # 启用头顶称号（默认关闭）
    prefix-format: "&7[&e%vault_prefix%&7] "  # 前缀格式（支持 PlaceholderAPI）
    suffix-format: ""                # 后缀格式（支持 PlaceholderAPI）
    update-interval: 5               # 更新间隔（单位：秒，1-60）

  # ===== 命令别名 =====
  commandalias:
    enabled: true                    # 启用命令别名
    aliases:                         # 别名映射（别名: 原命令）
      gmc: "gamemode creative"
      gms: "gamemode survival"
      gma: "gamemode adventure"
      gmsp: "gamemode spectator"
      day: "time set day"
      night: "time set night"
```

### 出生点配置 config/spawn.yml

```yaml
spawn:
  location:
    world: "world"                   # 出生点世界名称
    x: 0.0                          # X 坐标
    y: 64.0                         # Y 坐标
    z: 0.0                          # Z 坐标
    yaw: 0.0                        # 水平朝向
    pitch: 0.0                      # 垂直朝向
  teleport-on-first-join: true       # 首次加入时传送到出生点
  teleport-on-respawn: true          # 重生时传送到出生点
```

### 主城配置 config/lobby.yml

```yaml
lobby:
  location:
    world: "world"                   # 主城世界名称
    x: 0.0                          # X 坐标
    y: 64.0                         # Y 坐标
    z: 0.0                          # Z 坐标
    yaw: 0.0                        # 水平朝向
    pitch: 0.0                      # 垂直朝向
```

### MOTD 配置 config/motd.yml

```yaml
motd:
  line1: "&6Welcome to our server!"  # MOTD 第一行（支持颜色代码）
  line2: "&7Powered by UltiTools"    # MOTD 第二行
  max-players: -1                    # 显示的最大玩家数（-1 使用服务器默认值）
```

### Tab 栏配置 config/tabbar.yml

```yaml
tabbar:
  header: "&6=== 服务器名称 ==="      # Tab 栏头部（支持颜色代码）
  footer: "&7在线: &e%online%&7/&e%max%"  # Tab 栏底部（支持 %online% 和 %max% 变量）
```

## 使用教程

### 教程一：设置出生点和主城

1. 在游戏中走到你想设置为出生点的位置
2. 输入 `/setspawn` -- 此后新玩家首次加入和死亡重生都会被传送到这里
3. 走到你想设置为主城的位置
4. 输入 `/setlobby` -- 此后所有玩家可以使用 `/lobby` 传送到这里

### 教程二：使用家系统

```
/sethome                 -- 设置默认的家
/sethome farm            -- 设置一个叫 "farm" 的家
/sethome mine            -- 设置一个叫 "mine" 的家
/homes                   -- 查看你所有的家
/home                    -- 传送到默认的家
/home farm               -- 传送到 "farm"
/delhome mine            -- 删除 "mine"
```

默认每个玩家最多可设置 3 个家（可在配置中修改 `features.home.default-max-homes`）。

### 教程三：使用 TPA 传送

```
/tpa Steve               -- 请求传送到 Steve 身边
                           Steve 会看到提示
Steve 输入: /tpaccept    -- 接受请求，你会被传送过去
Steve 输入: /tpdeny      -- 拒绝请求

/tpahere Steve           -- 请求 Steve 传送到你身边
Steve 输入: /tpaccept    -- Steve 被传送到你身边
```

请求默认 30 秒超时，发送后有 10 秒冷却时间。

### 教程四：创建和使用地标点

```
/setwarp shop                      -- 在当前位置创建名为 "shop" 的地标点
/setwarp vip vip.warp.access       -- 创建需要权限的地标点
/warps                             -- 查看所有可用地标点
/warp shop                         -- 传送到 "shop" 地标点
/delwarp shop                      -- 删除 "shop" 地标点
```

### 教程五：配置定时命令

在 `config/essentials.yml` 中启用定时命令：

```yaml
features:
  scheduled-commands:
    enabled: true
    commands:
      - "300:say 服务器已运行5分钟！"          # 每300秒执行一次
      - "600:broadcast &c温馨提示：请遵守服务器规则！"  # 每600秒执行一次
      - "3600:save-all"                       # 每小时自动保存
```

格式为 `间隔秒数:控制台命令`。命令以控制台身份执行，拥有所有权限。

### 教程六：配置死亡惩罚

```yaml
features:
  deathpunish:
    enabled: true
    money:
      enabled: true          # 死亡扣钱（需要 Vault）
      percent: 10.0          # 扣除 10% 余额
      max: 1000.0            # 最多扣 1000
    item:
      enabled: true
      drop-chance: 50.0      # 50% 概率掉落每件物品
      keep-other: true       # 没掉落的保留
      whitelist:
        - "DIAMOND_SWORD"    # 钻石剑不掉落
    exp:
      enabled: true
      percent: 20.0          # 额外损失 20% 经验
    world-whitelist:
      - "world_creative"     # 创造世界不惩罚
```

拥有 `ultiessentials.deathpunish.bypass` 权限的玩家不受死亡惩罚影响。

### 教程七：使用箱子锁

1. 看向你想要锁定的箱子（或其他容器）
2. 输入 `/lock` -- 箱子被锁定，只有你能打开
3. 要解锁，看向箱子输入 `/unlock`
4. 要查看锁定信息，输入 `/unlock info`

管理员如果设置了 `chestlock.admin-bypass: true`，则可以打开被其他玩家锁定的容器。

## 权限节点

| 权限 | 描述 | 默认 |
|------|------|------|
| `ultiessentials.back` | 使用 /back 命令 | 玩家 |
| `ultiessentials.spawn.teleport` | 传送到出生点 | 玩家 |
| `ultiessentials.spawn.set` | 设置出生点 | OP |
| `ultiessentials.lobby.teleport` | 传送到主城 | 玩家 |
| `ultiessentials.lobby.set` | 设置主城 | OP |
| `ultiessentials.wild` | 使用随机传送 | 玩家 |
| `ultiessentials.home` | 传送到家 | 玩家 |
| `ultiessentials.sethome` | 设置家 | 玩家 |
| `ultiessentials.delhome` | 删除家 | 玩家 |
| `ultiessentials.homes` | 列出所有家 | 玩家 |
| `ultiessentials.tpa` | 发送 TPA 请求 | 玩家 |
| `ultiessentials.tpahere` | 发送 TPA-here 请求 | 玩家 |
| `ultiessentials.tpaccept` | 接受传送请求 | 玩家 |
| `ultiessentials.tpdeny` | 拒绝传送请求 | 玩家 |
| `ultiessentials.warp.use` | 使用地标传送 | 玩家 |
| `ultiessentials.warp.list` | 查看地标列表 | 玩家 |
| `ultiessentials.warp.set` | 创建地标 | OP |
| `ultiessentials.warp.delete` | 删除地标 | OP |
| `ultiessentials.fly` | 切换飞行模式 | OP |
| `ultiessentials.heal.self` | 恢复自己的生命值/饱食度 | OP |
| `ultiessentials.heal.other` | 恢复其他玩家的生命值/饱食度 | OP |
| `ultiessentials.speed` | 调整移动速度 | OP |
| `ultiessentials.gamemode.self` | 切换自己的游戏模式 | OP |
| `ultiessentials.gamemode.other` | 切换他人的游戏模式 | OP |
| `ultiessentials.hide` | 使用隐身模式 | OP |
| `ultiessentials.hide.see` | 看见隐身玩家 | OP |
| `ultiessentials.ban` | 永久封禁玩家 | OP |
| `ultiessentials.ban.temp` | 临时封禁玩家 | OP |
| `ultiessentials.unban` | 解除封禁 | OP |
| `ultiessentials.banlist` | 查看封禁列表 | OP |
| `ultiessentials.invsee` | 查看玩家背包 | OP |
| `ultiessentials.endersee` | 查看玩家末影箱 | OP |
| `ultiessentials.armorsee` | 查看玩家装备 | OP |
| `ultiessentials.lock` | 使用箱子锁 | 玩家 |
| `ultiessentials.scoreboard` | 切换计分板 | 玩家 |
| `ultiessentials.whitelist.manage` | 管理白名单 | OP |
| `ultiessentials.deathpunish.bypass` | 绕过死亡惩罚 | OP |

## 常见问题

**Q: 安装后不生效怎么办？**

A: 请确认以下几点：(1) UltiTools-API 版本为 6.2.0 或更高；(2) JAR 文件放在 `plugins/UltiTools/plugins/` 目录下，不是 `plugins/` 目录下；(3) 重启了服务器（不是 `/ul reload`，新模块需要完整重启）。查看服务器控制台是否有 "UltiEssentials enabled" 字样。

**Q: 改了配置文件没效果？**

A: 修改 `config/essentials.yml` 等配置文件后，执行 `/ul reload` 即可热加载。部分功能（如定时命令）重载后自动重新注册。如果仍然不生效，请完整重启服务器。

**Q: 权限怎么设置？**

A: UltiEssentials 使用标准的 Bukkit 权限系统，推荐配合 LuckPerms 使用。例如给所有玩家 TPA 权限：`/lp group default permission set ultiessentials.tpa true`。管理员命令默认需要 OP，也可通过权限插件精确分配。

**Q: `/back` 命令提示"没有可返回的位置"？**

A: `/back` 只记录通过命令触发的传送（如 `/spawn`、`/home` 等），不会记录因死亡、传送门等方式产生的位置变化。此外，玩家退出游戏后位置记录会被清除。

**Q: TPA 请求一直超时怎么办？**

A: 默认超时时间为 30 秒，可以在 `features.tpa.timeout` 中调大。同时确认目标玩家有 `ultiessentials.tpaccept` 权限来接受请求。

**Q: 计分板和 PlaceholderAPI 变量不显示？**

A: 计分板内容支持 PlaceholderAPI 变量（如 `%player_name%`），但需要服务器安装了 PlaceholderAPI 插件。如果没安装，变量会原样显示。

**Q: 定时命令不执行？**

A: 确认 `features.scheduled-commands.enabled` 设为 `true`。命令格式为 `间隔秒数:命令`，冒号前是数字，冒号后是控制台命令（不需要加 `/`）。查看控制台日志是否有 "Scheduled command" 字样。

## 更新日志

### v1.0.0 (2026-02-13)

新增：/back 返回上一次传送位置命令
新增：/spawn 和 /setspawn 出生点系统，支持首次加入传送和重生传送
新增：/lobby 和 /setlobby 主城系统
新增：/wild 随机传送，可配置范围、冷却时间，自动寻找安全位置
新增：/home 家系统，支持多个家、传送预热、移动取消
新增：/tpa、/tpahere、/tpaccept、/tpdeny TPA 传送请求系统，支持超时、冷却、跨世界控制
新增：/warp 地标系统，支持带权限的地标、地标列表
新增：/fly 飞行模式切换（支持为其他玩家切换）
新增：/heal、/feed 生命值和饱食度恢复
新增：/speed 移动速度调整（0-10 倍速）
新增：/gm 游戏模式切换及 /gms /gmc /gmsp 快捷命令
新增：/hide 隐身模式，支持 ultiessentials.hide.see 看穿权限
新增：/ban /tempban /unban /banlist 完整封禁系统
新增：/invsee /endersee /armorsee 远程查看玩家物品
新增：/wl 白名单管理（添加/移除/列表/启用/禁用/状态）
新增：/lock /unlock 箱子锁功能，管理员可配置绕过
新增：/scoreboard 计分板显示，支持 PlaceholderAPI
新增：MOTD 和 Tab 栏自定义
新增：头顶称号显示（NamePrefix），支持 PlaceholderAPI 和 Vault
新增：命令别名系统，可在配置中自定义
新增：定时命令执行服务
新增：死亡惩罚系统（金币/物品/经验/命令四种惩罚，世界白名单，绕过权限）
新增：中文和英文语言支持
