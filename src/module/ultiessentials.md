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

1. 确保服务器已安装 UltiTools-API 6.3.0 或更高版本
2. 将 `UltiEssentials-2.0.0.jar` 放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

## 升级到 2.0.0

先备份配置与数据库，安装 UltiTools-API 6.3.0 或更高版本，再替换 `UltiEssentials-2.0.0.jar` 并完整重启。目录身份为 `ultiessentials`，启动更新检查和 `/upm update` 使用这个身份；不要用 `/ul reload` 加载新 JAR，也不要整份覆盖自己的配置。

给需要控制他人飞行的管理员单独授予 `ultiessentials.fly.other`，自己的 `ultiessentials.fly` 不再授予这项能力。请使用 `/warp`、`/unban`、`/lock`、`/unlock`、`/scoreboard`：旧别名 `/w`、`/pardon`、`/l`、`/ul`、`/sb` 已删除，分别避免抢占原版私聊、原版解封、UltiLogin 登录、框架管理、UltiSideBar 侧边栏。`/ban`、`/banlist`、`/scoreboard` 则有意接管同名原版命令；原版用 `minecraft:ban`、`minecraft:banlist`、`minecraft:scoreboard`。

旧文件若含 `features.commandalias.aliases` 下的 `gmc`、`gms`、`gma`、`gmsp`，它们仍会把命令转发到原版 `/gamemode`，不受本模块的 `ultiessentials.gamemode.self` 控制。要使用模块快捷命令，逐行删掉这四条后执行 `/ul reload UltiEssentials`；已有配置不会自动删改。新的默认别名表只有 `day` 与 `night`。旧定时命令里的 `broadcast` 也会保留；没有提供该命令的插件时，请改用 `say`。

启动会修复旧版缺少主键的家、地标、封禁和锁记录，让删除、移动家、解封和拆锁真正写入。JSON 存储可在首次启动前设置 `features.data-repair.enabled: false` 暂缓本模块修复，备份完成后再开启并重启；SQLite 由框架打开表时修复，不受此开关控制，MySQL 不会存有这种记录。没有试运行模式。检查逐类型汇总与逐条警告：无法安全修复的记录原样保留，仍可读但删除或更新可能继续失败；按警告定位，备份后由管理员处理。某次写入失败会使该类型全部保持原样，下次启动重试。

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
| `/wild` 或 `/rtp` | 随机传送到野外安全位置（默认60秒冷却，可配置） | `ultiessentials.wild` | 仅玩家 |

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
| `/warp <名称>` | 传送到地标点 | `ultiessentials.warp.use` | 仅玩家 |
| `/warps` | 列出所有可用的地标点（别名：`/warplist`、`/listwarp`） | `ultiessentials.warp.list` | 仅玩家 |
| `/setwarp <名称> [权限]` | 在当前位置创建地标点，可选指定访问权限（别名：`/swarp`、`/addwarp`） | `ultiessentials.warp.set` | 仅玩家 |
| `/delwarp <名称>` | 删除地标点（别名：`/deletewarp`、`/rmwarp`、`/removewarp`） | `ultiessentials.warp.delete` | 仅玩家 |

### 玩家状态命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/fly` | 切换自己的飞行模式 | `ultiessentials.fly` | 仅玩家 |
| `/fly <玩家>` | 切换其他玩家的飞行模式 | `ultiessentials.fly.other` | 仅玩家 |
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
| `/gma` | 快捷切换自己到冒险模式 | `ultiessentials.gamemode.self` | 仅玩家 |
| `/gmsp` | 快捷切换到旁观模式 | `ultiessentials.gamemode.self` | 仅玩家 |
| `/hide` 或 `/vanish` | 切换隐身模式（对其他玩家不可见） | `ultiessentials.hide` | 仅玩家 |

游戏模式参数说明：`0` / `s` / `survival` = 生存，`1` / `c` / `creative` = 创造，`2` / `a` / `adventure` = 冒险，`3` / `sp` / `spectator` = 旁观。

### 封禁系统命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/ban <玩家> [原因]` | 永久封禁玩家（别名：`/eban`） | `ultiessentials.ban` | 玩家 + 控制台 |
| `/tempban <玩家> <时长> [原因]` | 临时封禁玩家（别名：`/tban`） | `ultiessentials.ban.temp` | 玩家 + 控制台 |
| `/unban <玩家>` | 解除玩家封禁 | `ultiessentials.unban` | 玩家 + 控制台 |
| `/banlist [页码]` | 查看封禁列表（别名：`/bans`） | `ultiessentials.banlist` | 玩家 + 控制台 |

临时封禁时长格式：`1d` = 1天，`2h` = 2小时，`30m` = 30分钟，`1w` = 1周。可以组合使用，例如 `1d12h30m` = 1天12小时30分钟。

### 管理工具命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/invsee <玩家>` | 打开并查看目标玩家的背包 | `ultiessentials.invsee` | 仅玩家 |
| `/endersee <玩家>` 或 `/echest <玩家>` | 查看目标玩家的末影箱 | `ultiessentials.endersee` | 仅玩家 |
| `/armorsee <玩家>` | 查看目标玩家的装备栏和副手 | `ultiessentials.armorsee` | 仅玩家 |
| `/lock` | 锁定你正在看向的容器（箱子等） | `ultiessentials.lock` | 仅玩家 |
| `/unlock` | 解锁你正在看向的容器 | `ultiessentials.lock` | 仅玩家 |
| `/unlock info` | 查看容器的锁定信息 | `ultiessentials.lock` | 仅玩家 |
| `/scoreboard` | 切换计分板显示 | `ultiessentials.scoreboard` | 仅玩家 |
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

所有配置文件位于 `plugins/UltiTools/pluginConfig/UltiEssentials/` 目录下。

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
      - "300:say 服务器已上线!"
      - "600:say 提醒: 请遵守服务器规则!"

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

  data-repair:
    enabled: true                    # JSON 旧记录启动修复；SQLite 不受此开关控制

  # ===== 命令别名 =====
  commandalias:
    enabled: true                    # 启用命令别名
    aliases:                         # 别名映射（别名: 原命令）
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
  line1: "&6欢迎来到我们的服务器!"  # MOTD 第一行（支持颜色代码）
  line2: "&7由 UltiTools 强力驱动"    # MOTD 第二行
  max-players: -1                    # 显示的最大玩家数（-1 使用服务器默认值）
```

### Tab 栏配置 config/tabbar.yml

```yaml
tabbar:
  header: "&6=== 服务器名称 ==="      # Tab 栏头部（支持颜色代码）
  footer: "&7在线: &e%online%&7/&e%max%"  # Tab 栏底部（支持 %online% 和 %max% 变量）
```

### 重载、语言与运行行为

`/ul reload UltiEssentials` 重新读取配置、刷新语言并分别重启定时命令、计分板、头顶称号；一个失败不阻止另外两个，回复会说明部分重载并点名原因。定时命令间隔从重载重新计时，频繁重载会推迟它。修改框架的 `language` 后用完整 `/ul reload` 或重启，而非只重载模块。

`features.wild.cooldown` 默认 60 秒，范围 0-2147483647，0 不冷却；负数在启动时拒绝模块，重载时保留运行值并警告，其余重载继续。已开始的冷却保持原结束时间。`/wild` 异步加载候选区块，完成后安全检查与传送在主线程进行，提示高度是玩家脚的位置；离线或卸载后不会补传送。`/back` 只记录本模块的 `/home`、`/warp`、`/spawn`、`/lobby`、`/wild`、接受的传送请求及 `/back`；不记录原版 `/tp` 或其他插件传送，退出即清除。

`features.ban.broadcast-ban: false` 将封禁原因只发给执行者，`broadcast-unban: false` 仍给执行者确认但不广播。`features.recall.enabled` 已删除：模块从未提供 `/recall`，删除旧文件中该键可以消除启动及重载警告。`/unbanip` 不存在，请勿用它解除本模块封禁。传送请求任一方离线即无提示地清除，之后 `/tpaccept`、`/tpdeny` 报告无待处理请求；隐身对后加入者也生效，不能看见隐身者的人无法用传送请求或封禁补全发现他们，已隐身者即使关闭功能也能解除隐身。

`/setspawn`、`/setlobby` 只写所属 location 下的六个坐标项，其他行包括手改内容不变；写入被拒绝会提示未保存、记录原因并恢复命令前的运行坐标。移动家、删除地标、解封或拆锁失败会如实提示，不要把失败当作已删除；大箱子两半共同检查锁，解锁要么全部成功，要么仍保持锁定。

侧边栏让先显示的插件保留位置；其他侧边栏关闭后才显示本模块侧边栏，`/scoreboard on` 会提示位置被占用，`off` 不移除别人的板。进服立刻 `off` 会保持到退出或 `on`。重载时若功能保持开启，个人显示选择不变；关功能会移除，重新开启按 auto-enable 对在线玩家应用。开启侧边栏时仍能看到主计分板队伍前缀；本模块逐次更新而非重建，40 字符后才不同的两行也不会互相覆盖。它使用的私有计分板不供其他插件写入；自己的目标、位置或行被改动会恢复。单个玩家刷新异常只影响该玩家，每次刷新重试且不刷屏。内置变量先替换，再由可选 PlaceholderAPI 替换第三方变量；未安装它不影响 `%online_players%` 等内置变量。

五个配置文件共 78 项的模块自带注释会跟随服务器语言，手写注释保留，值不受注释切换影响。上面的文本默认值展示 `language: zh`；英文服的对应默认文字为英文。计分板、MOTD、Tab、定时命令和死亡命令中仍是自带文字的值会在启动或完整重载时随语言改写；自定义值保留，要固定自带文本也至少改一个字符。请直接在配置文件改这些文本，而不是语言文件。空计分板标题不合法；空内容行列表或空 Tab 头尾会保持为空。

自定义聊天及控制台消息使用 `plugins/UltiTools/pluginConfig/UltiEssentials/lang/zh-myserver.json`，从官方 `zh.json` 复制并按 `essentials.home.set` 等新键编辑，在框架 `plugins/UltiTools/config.yml` 设置 `language: zh-myserver`。副本缺键回退对应官方语言；官方 `zh.json`/`en.json` 被改后会在启动恢复并留备份，不要直接编辑。命令、踢出、封禁及日志现跟随语言；死亡惩罚汇总只在实际施加惩罚时发送。

卸载 `/upm uninstall UltiEssentials` 会解除隐身、停止定时命令、侧边栏、前缀及传送预热，取消请求过期与延迟入服任务，并注销命令与监听器。预热取消无提示，玩家留在原地；侧边栏回主计分板，`up_` 队伍清空成员但队伍本身保留，可用原版 `team remove` 删除。清理失败会如实报告，其余服务仍清理，而不是报告干净卸载。

## 使用教程

### 教程一：设置出生点和主城

1. 在游戏中走到你想设置为出生点的位置
2. 输入 `/setspawn` -- 此后新玩家首次加入和死亡重生都会被传送到这里
3. 走到你想设置为主城的位置
4. 输入 `/setlobby` -- 此后已获 `ultiessentials.lobby.teleport` 权限的玩家可以使用 `/lobby` 传送到这里

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
      - "600:say 温馨提示：请遵守服务器规则！"  # 每600秒执行一次
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

这些权限节点未声明默认授权，默认仅 OP 拥有；普通玩家需显式授权。要使用下表的基础功能，请按需授予 `ultiessentials.back`、`ultiessentials.spawn.teleport`、`ultiessentials.lobby.teleport`、`ultiessentials.wild`、`ultiessentials.home`、`ultiessentials.sethome`、`ultiessentials.delhome`、`ultiessentials.homes`、`ultiessentials.tpa`、`ultiessentials.tpahere`、`ultiessentials.tpaccept`、`ultiessentials.tpdeny`、`ultiessentials.warp.use`、`ultiessentials.warp.list`、`ultiessentials.lock`、`ultiessentials.scoreboard`。例如用 LuckPerms 给默认玩家组授权：

```text
/lp group default permission set ultiessentials.back true
/lp group default permission set ultiessentials.spawn.teleport true
/lp group default permission set ultiessentials.lobby.teleport true
/lp group default permission set ultiessentials.wild true
/lp group default permission set ultiessentials.home true
/lp group default permission set ultiessentials.sethome true
/lp group default permission set ultiessentials.delhome true
/lp group default permission set ultiessentials.homes true
/lp group default permission set ultiessentials.tpa true
/lp group default permission set ultiessentials.tpahere true
/lp group default permission set ultiessentials.tpaccept true
/lp group default permission set ultiessentials.tpdeny true
/lp group default permission set ultiessentials.warp.use true
/lp group default permission set ultiessentials.warp.list true
/lp group default permission set ultiessentials.lock true
/lp group default permission set ultiessentials.scoreboard true
```

| 权限 | 描述 | 默认 |
|------|------|------|
| `ultiessentials.back` | 使用 /back 命令 | OP（需显式授权普通玩家） |
| `ultiessentials.spawn.teleport` | 传送到出生点 | OP（需显式授权普通玩家） |
| `ultiessentials.spawn.set` | 设置出生点 | OP |
| `ultiessentials.lobby.teleport` | 传送到主城 | OP（需显式授权普通玩家） |
| `ultiessentials.lobby.set` | 设置主城 | OP |
| `ultiessentials.wild` | 使用随机传送 | OP（需显式授权普通玩家） |
| `ultiessentials.home` | 传送到家 | OP（需显式授权普通玩家） |
| `ultiessentials.sethome` | 设置家 | OP（需显式授权普通玩家） |
| `ultiessentials.delhome` | 删除家 | OP（需显式授权普通玩家） |
| `ultiessentials.homes` | 列出所有家 | OP（需显式授权普通玩家） |
| `ultiessentials.tpa` | 发送 TPA 请求 | OP（需显式授权普通玩家） |
| `ultiessentials.tpahere` | 发送 TPA-here 请求 | OP（需显式授权普通玩家） |
| `ultiessentials.tpaccept` | 接受传送请求 | OP（需显式授权普通玩家） |
| `ultiessentials.tpdeny` | 拒绝传送请求 | OP（需显式授权普通玩家） |
| `ultiessentials.warp.use` | 使用地标传送 | OP（需显式授权普通玩家） |
| `ultiessentials.warp.list` | 查看地标列表 | OP（需显式授权普通玩家） |
| `ultiessentials.warp.set` | 创建地标 | OP |
| `ultiessentials.warp.delete` | 删除地标 | OP |
| `ultiessentials.fly` | 切换自己的飞行模式 | OP |
| `ultiessentials.fly.other` | 切换其他玩家飞行 | OP |
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
| `ultiessentials.lock` | 使用箱子锁 | OP（需显式授权普通玩家） |
| `ultiessentials.scoreboard` | 切换计分板 | OP（需显式授权普通玩家） |
| `ultiessentials.whitelist.manage` | 管理白名单 | OP |
| `ultiessentials.deathpunish.bypass` | 绕过死亡惩罚 | OP |

## 常见问题

**Q: 安装后不生效怎么办？**

A: 请确认以下几点：(1) UltiTools-API 版本为 6.3.0 或更高；(2) JAR 文件放在 `plugins/UltiTools/plugins/` 目录下，不是 `plugins/` 目录下；(3) 重启了服务器（不是 `/ul reload`，新模块需要完整重启）。查看服务器控制台是否有 "UltiEssentials enabled" 字样。

**Q: 改了配置文件没效果？**

A: 修改 `config/essentials.yml` 等配置文件后，执行 `/ul reload` 即可热加载。部分功能（如定时命令）重载后自动重新注册。如果仍然不生效，请完整重启服务器。

**Q: 权限怎么设置？**

A: UltiEssentials 使用标准的 Bukkit 权限系统，推荐配合 LuckPerms 使用。例如给所有玩家 TPA 权限：`/lp group default permission set ultiessentials.tpa true`。管理员命令默认需要 OP，也可通过权限插件精确分配。

**Q: `/back` 命令提示"没有可返回的位置"？**

A: `/back` 只记录通过命令触发的传送（如 `/spawn`、`/home` 等），不会记录因死亡、传送门等方式产生的位置变化。此外，玩家退出游戏后位置记录会被清除。

**Q: TPA 请求一直超时怎么办？**

A: 默认超时时间为 30 秒，可以在 `features.tpa.timeout` 中调大。同时确认目标玩家有 `ultiessentials.tpaccept` 权限来接受请求。

**Q: 计分板和 PlaceholderAPI 变量不显示？**

A: `%online_players%` 等内置变量无需 PlaceholderAPI；其他扩展变量需要安装 PlaceholderAPI 及对应扩展。两者同时使用时先替换内置变量，再交给 PlaceholderAPI。

**Q: 定时命令不执行？**

A: 确认 `features.scheduled-commands.enabled` 设为 `true`。命令格式为 `间隔秒数:命令`，冒号前是数字，冒号后是控制台命令（不需要加 `/`）。查看控制台日志是否有 "Scheduled command" 字样。

## 更新日志

### v2.0.0

#### 变更

- `plugin.yml` 现在声明 `identify-string: ultiessentials`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。README 中的 UltiTools-API 徽章和安装步骤现在写明
  UltiTools 6.3.0 或更高版本，与本模块已声明的 `api-version: 630` 一致（更早的框架会拒绝加载并给出 UltiTools 版本过旧的警告）。

#### 修复

- `/setspawn` 和 `/setlobby` 现在只写它们设置的六个坐标项（`spawn.location` 或 `lobby.location` 下的 `world`、`x`、`y`、`z`、
  `yaw`、`pitch`），不写其他内容；`config/spawn.yml` 或 `config/lobby.yml` 的其他每一行（包括服务器运行期间的手动修改）都逐字节
  保持不变。手动改过的坐标项会按命令的要求被替换。此前命令保存整个配置：手动改过的坐标项不会被写入，聊天却说已设置；
  框架拒绝的写入也被报告为成功。现在被拒绝的写入会回复「出生点未保存：&lt;原因&gt;。……」（或「主城未保存：……」），文件不变，
  运行中的坐标恢复为命令执行前的值，原因记录在服务器日志中；其他写入失败照旧回复，并同样撤回（UltiKits/UltiEssentials#72）。

- `/ul reload UltiEssentials` 在三个后台服务（定时命令、计分板、头顶称号）中有服务未能重启时，不再回复模块已重载：回复会说明
  这是一次部分重载，并指出是哪个服务、原因是什么；框架记录的也是部分重载警告而不是成功日志。其他服务仍会重启
  （UltiKits/UltiEssentials#66）。

- 本模块五个配置文件（`config/essentials.yml`、`config/lobby.yml`、`config/motd.yml`、`config/spawn.yml`、`config/tabbar.yml`）
  中 78 个配置项上方的注释现在取自模块的语言文件：`language: en` 的服务器全新安装时写入英文注释（此前所有语言下都是中文）。
  已有文件中这些配置项的注释会在下次启动时切换为服务器语言；配置值不变。只有本模块写入的注释会被切换——任一语言的语言文件文本，或 v1.0.0 在
  `features.wild.cooldown` 上方写入的较短注释（UltiKits/UltiEssentials#73）；你手写的注释逐字节保留（UltiTools-API 6.3.0，
  维护者 2026-10-04 决定）（UltiKits/UltiEssentials#67）。

- 在 UltiTools-API 6.3.0 上使用 JSON 存储（`datasource.type: json`）时，启动修复重新能为 #34 修复之前写入的记录补上主键。
  6.3.0 读取记录时返回副本，修复因此什么都没写入、每次启动都记录一条错误，`/delhome`、`/delwarp`、`/unban` 以及主人拆除上锁
  容器对这些记录仍然无效。若某条记录的主键写入失败，该类型的所有记录保持原样，下次启动重试（UltiKits/UltiEssentials#69）。

- 本模块可在 UltiTools-API 6.3.0 上加载。6.3.0 删除了「已删除配置项」警告所读取的配置对象，本模块因此无法加载；现在改为
  向框架询问 `config/essentials.yml` 中是否仍有某个已删除的键，启动时和每次 `/ul reload` 时的警告与之前完全一致（值为空的
  键同样会报告），文件中没有时不报。框架无法读取或解析的文件只会出现框架自己的 `Cannot load` 日志，不再报已删除配置项
  （UltiKits/UltiEssentials#68）。

- `/back` 现在只会返回由本模块自己的命令发起的传送（`/home`、`/warp`、`/spawn`、`/lobby`、`/wild`、被接受的 `/tpa` 或
  `/tpahere`，以及 `/back` 本身）。其它插件的传送或原版 `/tp` 不再为 `/back` 记录返回点，因此重新进服后被其它来源传送
  也不会再让 `/back` 生效。连续两次 `/back` 仍会回到第一次 `/back` 出发的位置（UltiKits/UltiEssentials#39）。

- `/wild` 成功提示现在报告玩家落脚的高度（脚所在的位置）；此前报告的是下方一格的地面方块高度（UltiKits/UltiEssentials#33）。

- `/wild` 寻找落点时不再卡住服务器：每个候选区块都异步加载（新区块异步生成），加载完成后再在主线程做安全检查并传送；
  期间下线的玩家不会被传送；模块卸载时仍在等待区块的搜索不会再执行任何操作（UltiKits/UltiEssentials#24）。

- 隐身玩家不再能通过 `/tpa`、`/tpahere`（无权看见隐身玩家的发送者会被告知对方不在线，请求也不会送达）或 `/ban`、
  `/tempban` 的补全被发现；隐身玩家也总能解除隐身：`features.hide.enabled: false` 现在只拒绝新的隐身
  （UltiKits/UltiEssentials#56）。

- 卸载本模块（`/upm uninstall UltiEssentials`）现在还会取消待处理的 `/tpa`、`/tpahere` 请求的过期任务，双方不会再收到
  已卸载模块发出的过期提示；在卸载前一秒内加入的玩家也不会在卸载后被放上侧边栏或加入名字前缀队伍
  （UltiKits/UltiEssentials#51）。

- 装有 PlaceholderAPI 时，计分板现在会把内置变量（`%online_players%`、`%max_players%`、`%player_food%` 等）显示为数值，
  不再原样显示：计分板与名字前缀先填入本模块自己的变量，再交给 PlaceholderAPI（UltiKits/UltiEssentials#59）。

- 刚进服就执行的 `/scoreboard off` 现在会生效：侧边栏不会再被延迟的自动开启在片刻后重新显示，重载开启计分板功能时也不会。该选择持续到玩家退出或执行
  `/scoreboard on` 为止（UltiKits/UltiEssentials#45）。

- 侧边栏不再顶替其它插件的侧边栏（例如 UltiSideBar 的）：玩家先看到哪个侧边栏就保留哪个，另一个关闭后本侧边栏才显示。
  `/scoreboard on` 与 `/scoreboard` 在另一个计分板占用该位置时会如实说明，`/scoreboard off` 也不再移除其它插件的侧边栏。
  UltiSideBar 的侧边栏同时开启时，启动后控制台会有一行提示（UltiKits/UltiEssentials#40）。

- 本模块的侧边栏开启时，名字前缀（`features.nameprefix`）和主计分板上的其它队伍（原版 `/team` 队伍、其它插件的队伍）
  现在都会显示：侧边栏自己的计分板会带上服务器主计分板的队伍，并在每次刷新时跟随其变化；此前开着侧边栏的玩家
  看不到任何人的队伍前缀。与某个队伍成员名字完全相同的侧边栏行保持原样，不会带上该队伍的前缀（UltiKits/UltiEssentials#40）。

- 侧边栏不再每秒重建：每位玩家保留同一块侧边栏计分板并原地刷新，内容行只在变化时重写。若其他插件删除了侧边栏的目标、
  清空或占用了其显示位置、或重置了其内容行，下一次刷新会恢复它们；其他插件放在这块计分板上的内容（其队伍、目标和分数）
  不受影响（UltiKits/UltiEssentials#40）。

- 只在第 40 个字符之后才不同的两行计分板内容现在都会显示；此前第二行会顶替第一行（UltiKits/UltiEssentials#41）。

- `language: en` 现在对本模块的命令、封禁、踢出与控制台文本生效；此前大多数文本在任何语言下都显示中文
  （UltiKits/UltiEssentials#26）。162 条键在两份语言文件中都缺失的消息现在有中英文文本：所有命令的帮助与描述，
  家、地标点、传送请求、计分板、箱子锁与封禁命令的回复，以及传送预热与取消提示。原先写死为中文的文本现在进入语言文件：
  封禁玩家看到的踢出界面、封禁与临时封禁时长、封禁/临时封禁/解封广播、默认封禁原因与控制台操作者名称、
  `/warps` 中的权限标记、两种箱子锁拒绝提示以及死亡惩罚汇总。原先写死为英文的控制台日志现在也跟随 `language`：
  启动修复、重载与已删除设置的警告，定时命令、箱子锁、家、地标点、封禁、名称前缀与侧边栏的诊断信息。
  现有英文措辞保持不变，原先向英文玩家显示的中文句子除外。死亡惩罚汇总现在只在确有惩罚时发送（此前只要文本超过十个字符就发送）。传送预热提示为
  「&lt;n&gt; 秒后传送，请不要移动...」；此前显示原始键 `teleport_warmup`，取消时显示 `teleport_cancelled_moved`。

- 重载本模块（`/ul reload UltiEssentials`）现在会重新读取其配置文件并刷新语言文件，修改后的
  `features.speed.max-speed` 等配置无需重启即可生效。此前本模块的重载方法替换了框架的重载方法且只输出
  一行日志，这两步都不会执行。UltiTools 6.3.0 还会在此时报告 `@ConditionalOnConfig` 漂移并输出框架自身的
  模块重载日志（UltiKits/UltiEssentials#23）。

- `/ul reload UltiEssentials`（或 `/ul reload`）现在还会按重新读取的配置重启定时命令、计分板和头顶称号服务，
  因此修改 `features.scheduled-commands.enabled`、`features.scheduled-commands.commands`、
  `features.scoreboard.enabled`、`features.scoreboard.update-interval`、
  `features.nameprefix.enabled` 与 `features.nameprefix.update-interval` 后无需重启即可生效；通过
  `/ul reload UltiEssentials` 开启头顶称号后，称号现在会应用到在线玩家和之后加入的玩家（UltiKits/UltiEssentials#28）。
  与重启一样，重载会让每条定时命令的间隔重新开始计时。计分板在重载前后都保持开启时，每位在线玩家侧边栏的
  显示或隐藏状态保持不变，包括其通过 `/scoreboard` 做出的选择；关闭计分板的重载会移除所有侧边栏，开启计分板的
  重载会对已在线的玩家应用 `features.scoreboard.auto-enable`。三个服务中任一服务重载失败时会记录日志，另外两个
  服务仍会重载。

- 通过 `/scoreboard off` 或 `/scoreboard` 关闭侧边栏后，玩家现在会回到服务器的主计分板，头顶称号及主计分板上的
  其他队伍对该玩家变为可见。此前玩家会被分配一个空计分板，重新进入服务器前看不到这些内容
  （UltiKits/UltiEssentials#44）。

- 某位玩家的侧边栏或头顶称号无法刷新时（例如某个 PlaceholderAPI 扩展对该玩家抛出异常），不再会导致其他所有
  玩家的计分板和头顶称号停止刷新。该玩家会在每次更新时重试，失败只记录一次日志，直到该玩家刷新成功后再次失败
  才会重新记录。通过原版 `team remove` 命令删除的头顶称号队伍会在下次更新时重新创建（UltiKits/UltiEssentials#44）。

- 卸载本模块（`/upm uninstall UltiEssentials`）现在会由框架先注销命令、再注销监听器，本模块的命令会被
  真正移除，其监听器也不再触发。此前本模块的卸载方法替换了框架的卸载方法，因此执行
  `/upm uninstall UltiEssentials` 后，其命令和监听器都会保持生效，直到服务器重启（UltiKits/UltiEssentials#23）。

- `/upm uninstall UltiEssentials` 现在会停止本模块启动的全部重复后台任务：
  `features.scheduled-commands.commands` 中配置的条目不再向控制台派发命令，侧边栏刷新任务与头顶称号刷新
  任务都会停止，正在倒计时的预热传送会被取消而不是继续执行。拥有侧边栏的玩家会回到服务器的主计分板，本模块
  的头顶称号队伍会被清空成员，卸载后不会残留侧边栏或称号；已清空的 `up_` 队伍本身仍注册在主计分板上，可用
  原版 `team remove` 命令删除。此前这些任务都会继续对已卸载的模块运行，直到服务器重启，而卸载却报告成功。
  预热传送被取消的玩家会留在原地且不会收到提示。待处理传送请求的过期任务会被取消；入服时延迟添加侧边栏和
  头顶称号的任务在卸载后不再执行任何操作（UltiKits/UltiEssentials#51）。若其中
  某个服务停止失败或根本无法找到，其余服务仍会停止，并且卸载会如实报告该失败，而不是报告卸载干净
  （UltiKits/UltiEssentials#43）。

- `/ul reload UltiEssentials` 现在会在控制台以警告形式指出重载时找不到的服务——此前它只重载能找到的服务
  并一律报告成功，因此仍按旧配置运行的功能与已重载的功能在日志上无法区分。其余服务仍会正常重载。在未修改
  源码的正式版本上，这条警告不可能出现，上面卸载时“找不到某个服务”的报错同样不可能出现：两者都是针对本模块
  源码未来改动的防护，而不是可以通过配置文件进入的状态（UltiKits/UltiEssentials#43）。

- `/delhome <名称>`、`/delwarp <名称>`、`/unban <玩家>`、`/unlock`、对已存在的家再次执行
  `/sethome <名称>`，以及破坏自己上锁的容器，现在都会真正改变已保存的数据。本模块写入的每条记录——家、地标点、
  封禁和容器锁——此前保存时主键为空，之后的删除或更新语句匹配不到任何行，已保存的记录原样保留：被删除的家仍会
  出现在 `/homes` 中，被解禁的玩家登录时仍会被本模块自己的封禁提示拒绝，被破坏容器的锁会在重启后回来，移动已存在
  的家仍保留旧坐标。从本版本起写入的记录都带有该主键，更早版本写入的记录会在启动时修复一次
  （UltiKits/UltiEssentials#34、UltiKits/UltiEssentials#35、UltiKits/UltiEssentials#37）。

- `/fly <玩家>` 现在需要 `ultiessentials.fly.other` 权限，与玩家切换自己飞行所用的 `ultiessentials.fly`
  分开。此前两者共用同一个权限节点，因此只要服务器给普通玩家开放了自己飞行的权限，他们同时也能为任何在线玩家
  开启或关闭飞行，包括在其飞行途中将其关闭。请为应保留该能力的人授予 `ultiessentials.fly.other`——这与
  `/heal <玩家>`、`/gm <模式> <玩家>` 现有的做法一致（UltiKits/UltiEssentials#25）。

- 启动时，本模块现在会修复上一条所述在修复之前写入的记录，为每条记录补上保存时缺失的主键。它会为写入过记录的每类记录各输出一行日志并给出汇总，因此出现该行就说明确实写入了数据；
  被跳过的记录改为以警告形式逐条报告并说明原因。
  修复只进行一次：已修复的记录在之后的启动中不会再被处理。无法安全修复的记录会原样保留，并以警告形式报告——
  出现在记录自身没有标识、两条记录共用同一标识，或记录已带有与其标识不一致的主键时。此类记录仍可正常读取，
  但删除或更新仍会失败，警告中会指出该记录，便于手动重建（UltiKits/UltiEssentials#34）。

- `config/essentials.yml` 新增配置项 `features.data-repair.enabled`，默认 `true`：控制本模块是否对 JSON 存储执行上述启动修复。
  设为 `false` 会让这些 JSON 记录保持原样——在数据迁移进行中或尚未备份时很有用。日志会指明该配置项，
  这些未修复 JSON 记录的删除与更新在重新开启前仍会失败。使用 SQLite 时，UltiTools-API 6.3.0 会在打开数据表时
  修复缺失的主键，与此设置无关；MySQL 不会存在这类记录。本项没有“试运行”模式（UltiKits/UltiEssentials#34）。

- 删除、解禁或解锁未能改变已保存的数据时，现在会明确说明，而不再报告该记录不存在。`/delhome`、`/delwarp`、
  `/unban` 此前会把"记录仍然存在"与"记录从未存在"报告为同一种结果，导致管理员在 `/homes` 或 `/banlist`
  仍列出该记录时就不再排查。现在三者各有专门的提示，与 `/unlock` 原有的做法一致。对已存在的家再次执行
  `/sethome <名称>` 会在之后核对已保存的坐标，若新位置未写入存储则报告失败，而不再确认一次仍会把玩家传送到
  旧位置的"移动"。解锁大箱子时，只有两半的记录都被移除才报告成功；任一半的记录仍然存在即报告失败并保持上锁
  （UltiKits/UltiEssentials#34、UltiKits/UltiEssentials#35、UltiKits/UltiEssentials#37）。

- 大箱子的锁现在从任意一侧都会生效，解锁则是要么两边都解、要么都不解。由于大箱子的两半共用一个容器，任一半上的
  锁定记录现在都会拒绝他人点击任意一块——此前检查只看被点击的那一块，因此两半记录不一致的容器可以从没有记录的
  一侧打开。解锁时会把保护该容器的所有记录放在同一个事务中一起移除：只要有一条无法移除，就一条都不移除，容器
  继续显示为已锁定，并报告失败，而不会留下解锁了一半的容器（UltiKits/UltiEssentials#37）。

- `config/essentials.yml` 中的 `features.ban.broadcast-ban` 与 `features.ban.broadcast-unban` 现在会生效。此前
  `/ban`、`/tempban` 与 `/unban` 无论这两项如何设置，都会把每次成功的封禁或解禁广播给全服。两项默认均为 `true`，
  与这些命令一直以来的行为相同，因此除非其中一项为 `false`，否则没有任何变化——若你的文件中已将其中一项设为
  `false`，从本版本起即会生效。设置
  `features.ban.broadcast-ban: false` 后，封禁通知及原因改为只发送给执行者，而不再发给所有人——该通知是执行者
  唯一的确认信息，因此是改发而不是丢弃——服务器其他人不再看到它。无论如何设置，
  `/banlist` 都会列出该封禁。设置 `features.ban.broadcast-unban: false` 后，执行者仍会收到一直以来的解禁确认，
  且不再进行任何广播（UltiKits/UltiEssentials#27）。

- 待处理的 `/tpa` 或 `/tpahere` 请求现在会在其发送者或目标离开服务器时立即清除。此前该请求会一直保留到
  `features.tpa.timeout`（默认 30 秒）结束，在此期间其目标会以"已有待处理请求"为由拒绝其他所有玩家的请求。
  清除时不会向仍在线的一方发送消息：此前超时结束时他们会收到"请求已超时"的提示，而在发送者离开后执行
  `/tpaccept` 的目标会被告知发送者已离线；现在请求直接消失，因此 `/tpaccept` 与 `/tpdeny` 会报告没有待处理的
  请求（UltiKits/UltiEssentials#30）。

- 使用 `/hide` 隐身的玩家现在对其隐身之后才加入的玩家同样保持隐身。此前 `/hide` 只对当时在线的玩家生效，之后
  加入的任何人都能看见隐身者。持有 `ultiessentials.hide.see` 的加入者仍能看见隐身玩家，与 `/hide` 执行时已在线
  的玩家一致（UltiKits/UltiEssentials#32）。

- `/upm uninstall UltiEssentials` 现在会让所有使用 `/hide` 隐身的玩家对所有人重新可见，并清空隐身状态。此前隐身
  效果会在模块卸载后继续存在——这些隐藏记录属于仍处于启用状态的 UltiTools 本身——因此隐身玩家仍对其隐身时在线的
  玩家不可见，却对之后加入的玩家可见，并且由于 `/hide` 已随模块一起卸载，只能重新登录才能解除隐身。隐身玩家不会
  收到提示（在审查 UltiKits/UltiEssentials#32 时发现）。

- `config/essentials.yml` 中的 `features.wild.cooldown` 现在决定 `/wild` 的冷却时间（秒）。此前冷却时间固定为
  60 秒，该配置项从未被读取。默认值仍为 `60`，现有配置文件中除非你改过，本来就是这个值——改过的值从本版本起生效。
  `0` 表示不冷却。`/ul reload UltiEssentials` 会让新值作用于下一次 `/wild`；已经开始的冷却保持其原有的结束时间，
  新值为 `0` 时也是如此。负数会在启动时阻止模块加载，错误信息会指明该配置项和数值。在
  `/ul reload UltiEssentials` 时负数不会生效：控制台会输出一条指明该配置项的警告，`/wild` 继续使用原来的冷却时间，
  重载的其余部分——文件中的其他设置、各服务的重启——照常完成。该设置原先声明了 3600 秒的上限，该上限已取消，
  最大可接受 2147483647 秒（UltiKits/UltiEssentials#27，依赖 UltiKits/UltiTools-Reborn#531）。

#### 变更

- `/ban`、`/banlist`、`/scoreboard` 按维护者决定有意接管同名原版命令，现已写入文档；原版命令仍可用 `minecraft:ban`、
  `minecraft:banlist`、`minecraft:scoreboard` 调用（UltiKits/UltiEssentials#61）。

- 变更：`config/essentials.yml`（计分板标题与内容、定时命令文字、死亡惩罚命令文字）、`config/tabbar.yml`
  （Tab 栏头尾）与 `config/motd.yml`（两行 MOTD）中的消息与标题设置在模块启动时按服务器语言写入，文件内容即模块显示的内容。
  仍为内置文本（任一语言的内置文本，或旧版本的出厂默认值）的设置会跟随 `language`：模块启动或执行 `/ul reload` 后改写为
  当前语言的文本。你改过的设置保持不变。若想保留内置文本又不让它跟随语言，请至少改动一个字符。改动运维已解压的语言文件
  不再影响这些设置——请直接在配置文件中修改；已发布版本从未从语言文件读取过这些键，因此这不是回归。空的计分板标题会在
  启动时被拒绝，与历来发布的每个版本一致（`@NotEmpty`）；空的 `features.scoreboard.lines`、`tabbar.header` 或
  `tabbar.footer` 保持为空且不显示任何内容，与历来发布的每个版本一致。

- 语言键已改为带点的 ASCII 键（例如 `essentials.home.set`）：包括所有中文句子形式的键，以及仍在使用的旧 ASCII 键 `teleport_success`。本模块的官方语言文件
  （`plugins/UltiTools/pluginConfig/UltiEssentials/` 下的 `lang/en.json` 和 `lang/zh.json`）归 UltiTools 所有：自 UltiTools-API 6.3.0 起，
  被修改过的官方文件会在每次启动时恢复为自带内容，修改过的副本作为备份保留并在服务器日志中注明，因此在其中所做的修改不会保留。
  要自定义消息，请把官方文件复制为以语言代码加连字符开头、只含 ASCII 字母、数字、`_` 和 `-` 的新名称
  （`zh.json` → `zh-myserver.json`），按新键修改副本，然后在 `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver`
  （框架和所有模块共用这一个设置）。副本中没有的消息取自名称开头对应的官方文件（此处为 `zh`），没有该名称文件的模块使用其官方 `zh`。从未改过语言文件的服务器无需任何操作。

- 本模块 `plugin.yml` 的 `api-version` 从已发布 v1.0.0 的 `620` 升至 `630`，因此只能在 UltiTools 6.3.0 及以上版本加载。其 `/wild` 冷却使用了
  6.3.0 新增的框架功能；在旧版 UltiTools 上它会在没有任何冷却的情况下静默加载，因此现在改为直接拒绝加载
  （UltiKits/UltiEssentials#27、UltiKits/UltiTools-Reborn#531）。

#### 移除

- 删除三个与其它 UltiKits 组件冲突的别名：`/unlock` 的 `ul`（框架自己的 `/ul`）、`/lock` 的 `l`（UltiLogin 登录命令的 `/l`）、
  `/scoreboard` 的 `sb`（UltiSideBar 侧边栏命令的 `/sb`）。请使用 `/unlock`、`/lock`、`/scoreboard`（UltiKits/UltiEssentials#62）。

- 删除 `/warp` 的别名 `w`：`/w` 是原版的私聊快捷命令（`/w <玩家> <消息>`），该别名可能把它抢走。请使用 `/warp`
  （UltiKits/UltiEssentials#60）。

- 删除 `/unban` 的别名 `pardon`：`pardon` 是解除服务器自身封禁的原版命令，该别名会让这一标签视加载顺序进入本模块或原版。
  本模块的封禁请用 `/unban` 解除（UltiKits/UltiEssentials#48）。

- 删除两个没有任何命令调用的解封方法（按玩家 UUID 解封、按 IP 解封），以及 `/unban` 说明中指向不存在命令的
  `/unbanip` 一行。`/unban <玩家>` 不变；IP 解封命令作为功能需求在 UltiKits/UltiEssentials#63 跟踪（UltiKits/UltiEssentials#47）。

- 移除本模块卸载时输出的"UltiEssentials 已禁用！"控制台行、`/ul reload UltiEssentials` 时输出的
  "UltiEssentials 配置已重载！"控制台行，以及 `lang/en.json` 与 `lang/zh.json` 中对应的
  `UltiEssentials 已禁用！`、`UltiEssentials 配置已重载！` 两个语言键。UltiTools 6.3.0 会为每个模块输出
  一行重载日志（UltiKits/UltiEssentials#23）。

- 移除 `config/essentials.yml` 中的 `features.recall.enabled`。该设置从未生效：本模块没有 `/recall` 命令。
  该命令已作为功能请求记录在 UltiKits/UltiEssentials#53——删除设置并不代表否决该功能（UltiKits/UltiEssentials#27）。

- 若上述已删除的设置仍保留在你的 `config/essentials.yml` 中（运行过旧版本的服务器都会如此），启动时以及每次
  `/ul reload UltiEssentials` 都会输出一条警告，指明模块、文件和键，并说明该设置的去向。从文件中删除该键
  即可消除警告；保留它不会产生其他任何影响（UltiKits/UltiEssentials#27）。


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
