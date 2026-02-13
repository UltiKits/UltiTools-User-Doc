# UltiWorlds

多世界管理模块 -- 世界创建、传送、保护、背包隔离和精细化世界规则配置。

## 功能概述

UltiWorlds 是 UltiTools 框架下的多世界管理模块，提供了服务器多世界运营所需的全套工具。你可以通过命令或交互式向导创建新世界（支持主世界、下界、末地三种环境），对每个世界独立配置 PVP 开关、怪物/动物生成、天气控制、难度等级等规则。传送系统支持 GUI 界面浏览和命令行直达，带冷却时间和权限检查。保护系统可以一键启用方块破坏/放置/交互/爆炸保护。访问控制包括世界锁定、封禁和隐藏。背包隔离系统支持按世界或世界组隔离背包、末影箱、经验、生命值、饥饿值和药水效果。此外还支持世界描述展示（多行+颜色代码+PlaceholderAPI）、传送后自动执行命令以及空世界自动卸载。

## 安装

**方法一：通过 UPM（UltiTools Package Manager）安装**

```
/upm install UltiWorlds
```

**方法二：手动安装**

1. 确保服务器已安装 UltiTools-API 6.2.0 或更高版本
2. 将 `UltiWorlds-2.0.0.jar` 放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

## 快速入门

安装完成后，可以按照以下步骤快速体验：

```
1. 打开世界列表 GUI
   /world

2. 创建一个新世界
   /world create myworld

3. 传送到新世界
   /world tp myworld

4. 设置世界出生点
   /world setspawn

5. 查看世界信息
   /world info

6. 使用创建向导（交互式引导）
   /world wizard
```

## 命令列表

### 基础命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/world` | 打开世界列表 GUI 界面 | `ultiworlds.use` | 仅玩家 |
| `/world list` | 以文字方式列出所有世界及玩家数 | `ultiworlds.use` | 仅玩家 |
| `/world tp <世界>` | 传送到指定世界（5秒冷却） | `ultiworlds.use` | 仅玩家 |
| `/world info` | 查看当前所在世界的详细信息 | `ultiworlds.use` | 仅玩家 |
| `/world help` | 显示帮助信息 | `ultiworlds.use` | 仅玩家 |

### 创建与管理命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/world wizard` | 启动交互式世界创建向导 | `ultiworlds.admin.create` | 仅玩家 |
| `/world create <名称>` | 创建主世界环境的新世界 | `ultiworlds.admin.create` | 仅玩家 |
| `/world create <名称> <类型>` | 创建指定环境类型的新世界（NORMAL / NETHER / THE_END） | `ultiworlds.admin.create` | 仅玩家 |
| `/world load <名称>` | 加载一个已存在但未加载的世界 | `ultiworlds.admin.load` | 仅玩家 |
| `/world unload <名称>` | 卸载世界（玩家会被传送到主世界） | `ultiworlds.admin.unload` | 仅玩家 |
| `/world delete <名称>` | 删除世界（卸载并删除文件，不可撤销） | `ultiworlds.admin.delete` | 仅玩家 |
| `/world setspawn` | 设置当前世界的出生点为你所在位置 | `ultiworlds.admin.setspawn` | 仅玩家 |

### 设置命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/world set <世界> pvp <true/false>` | 设置 PVP 开关 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> monsters <true/false>` | 设置怪物生成 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> animals <true/false>` | 设置动物生成 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> weather <true/false>` | 设置天气变化 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> hidden <true/false>` | 设置是否从列表中隐藏 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> locked <true/false>` | 设置是否锁定世界 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> blocked <true/false>` | 设置是否禁止进入世界 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> displayname <名称>` | 设置世界显示名称 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> description <描述>` | 设置世界描述文字 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> icon <材料名>` | 设置 GUI 中的图标材料 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> difficulty <难度>` | 设置世界难度（PEACEFUL / EASY / NORMAL / HARD） | `ultiworlds.admin.settings` | 仅玩家 |

### 难度命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/world difficulty <世界> <难度>` | 直接设置世界难度 | `ultiworlds.admin.settings` | 仅玩家 |

难度选项：`PEACEFUL`（和平）、`EASY`（简单）、`NORMAL`（普通）、`HARD`（困难）。

### 保护命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/world protect <世界>` | 启用完整保护（禁止破坏、放置、交互、爆炸） | `ultiworlds.admin.protect` | 仅玩家 |
| `/world unprotect <世界>` | 禁用所有保护 | `ultiworlds.admin.protect` | 仅玩家 |

### 访问控制命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/world block <世界>` | 禁止所有玩家进入世界（已在世界中的玩家会被踢回主世界） | `ultiworlds.admin.block` | 仅玩家 |
| `/world unblock <世界>` | 允许玩家进入世界 | `ultiworlds.admin.block` | 仅玩家 |

### 传送后命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/world postcmd <世界> add <命令>` | 添加传送后自动执行的命令 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world postcmd <世界> list` | 查看已配置的传送后命令 | `ultiworlds.use` | 仅玩家 |
| `/world postcmd <世界> clear` | 清除所有传送后命令 | `ultiworlds.admin.settings` | 仅玩家 |

传送后命令支持 `{player}` 和 `{world}` 占位符，以控制台身份执行。

## 配置文件

所有配置文件位于 `plugins/UltiTools/UltiWorlds/` 目录下。

### 主配置 config/worlds.yml

```yaml
# 默认世界名称
default_world: "world"

# 受保护的世界（不能自动卸载或删除）
protected_worlds:
  - "world"
  - "world_nether"
  - "world_the_end"

# 服务器启动时自动加载的世界
load_worlds_on_start: []

# ===== 自动卸载配置 =====
auto_unload:
  enabled: false                     # 启用空世界自动卸载
  check_interval: 60                 # 检查间隔（单位：秒，10-3600）
  unload_after: 300                  # 世界空闲多久后卸载（单位：秒，60-86400）

# ===== GUI 配置 =====
gui_title: "&6世界列表"               # 世界列表 GUI 标题

# ===== 传送配置 =====
tp_to_world:
  enabled: true                      # 允许玩家在世界间传送
  permission_per_world: false        # 每个世界要求单独权限
  cooldown: 10                       # 传送冷却时间（单位：秒，0-300）
  show_description: true             # 传送时显示世界描述

world_spawn:
  use_spawn_location: true           # 传送到世界出生点（而非上次离开的位置）

# ===== 背包隔离配置 =====
world_isolation:
  enabled: false                     # 启用背包隔离（默认关闭）
  separate_inventory: true           # 隔离背包
  separate_ender_chest: true         # 隔离末影箱
  separate_experience: false         # 隔离经验等级
  separate_health: false             # 隔离生命值
  separate_hunger: false             # 隔离饥饿值
  separate_effects: false            # 隔离药水效果
  shared_worlds:                     # 共享背包的世界组（同组内共享，逗号分隔）
    - "world,world_nether,world_the_end"

# ===== 消息配置 =====
messages:
  world_teleport: "&a已传送到世界: {WORLD}"
  world_not_found: "&c世界 {WORLD} 不存在！"
  no_permission: "&c你没有权限进入世界 {WORLD}！"
  world_created: "&a世界 {WORLD} 已创建！"
  world_deleted: "&c世界 {WORLD} 已删除！"
```

## 使用教程

### 教程一：使用向导创建世界

向导模式提供交互式引导，适合不熟悉命令参数的管理员：

```
/world wizard
```

向导会依次询问：
1. 世界名称（只能使用字母、数字、下划线和连字符）
2. 环境类型（1=主世界 / 2=下界 / 3=末地）
3. 地形类型（1=标准 / 2=超平坦 / 3=放大化 / 4=巨型生物群系）
4. 是否生成建筑物（村庄、神殿等）
5. 世界种子（留空使用随机种子）
6. 确认创建

每一步有 60 秒输入时限，超时自动取消。随时输入 `cancel` 可取消操作。

### 教程二：配置世界规则

创建世界后，可以自定义各项规则：

```
/world set myworld pvp false           -- 关闭 PVP
/world set myworld monsters false      -- 关闭怪物生成
/world set myworld weather false       -- 锁定天气为晴天
/world set myworld displayname "&a我的世界"  -- 设置显示名称
/world set myworld description "这是一个和平的世界"  -- 设置描述
/world set myworld icon DIAMOND_BLOCK  -- 设置 GUI 图标
/world difficulty myworld PEACEFUL     -- 设置难度为和平
```

### 教程三：配置世界保护

一键启用完整保护（适用于大厅、展示世界等）：

```
/world protect lobby                   -- 启用完整保护
                                        禁止方块破坏
                                        禁止方块放置
                                        禁止交互
                                        禁止爆炸

/world unprotect lobby                 -- 禁用所有保护
```

拥有 `ultiworlds.bypass.protection` 权限的玩家不受保护限制。

### 教程四：配置背包隔离

在 `config/worlds.yml` 中启用背包隔离：

```yaml
world_isolation:
  enabled: true
  separate_inventory: true
  separate_ender_chest: true
  separate_experience: true
  shared_worlds:
    - "world,world_nether,world_the_end"   # 主世界三维度共享背包
    - "creative_world"                      # 创造世界独立背包
```

这样配置后：
- 主世界（world）、下界（world_nether）和末地（world_the_end）共享同一套背包
- creative_world 有独立的背包
- 其他未列出的世界各自拥有独立的背包

玩家在世界间切换时，背包和末影箱会自动保存和加载。

### 教程五：使用传送后命令

传送后命令会在玩家传送到指定世界后自动以控制台身份执行：

```
/world postcmd pvp_arena add effect {player} speed 600 1
/world postcmd pvp_arena add gamemode survival {player}
/world postcmd pvp_arena list              -- 查看已配置的命令
/world postcmd pvp_arena clear             -- 清除所有命令
```

支持的占位符：
- `{player}` -- 玩家名
- `{world}` -- 目标世界名

### 教程六：管理世界访问

```
/world block event_world               -- 禁止进入（已在里面的玩家被踢回主世界）
/world unblock event_world             -- 允许进入
/world set event_world locked true     -- 锁定世界（需要权限才能进入）
/world set event_world hidden true     -- 从列表中隐藏世界
```

## 权限节点

| 权限 | 描述 | 默认 |
|------|------|------|
| `ultiworlds.use` | 基础使用权限（打开 GUI、传送、查看信息） | 玩家 |
| `ultiworlds.admin` | 管理员权限（包含所有子权限） | OP |
| `ultiworlds.admin.create` | 创建世界 | OP |
| `ultiworlds.admin.delete` | 删除世界 | OP |
| `ultiworlds.admin.load` | 加载世界 | OP |
| `ultiworlds.admin.unload` | 卸载世界 | OP |
| `ultiworlds.admin.setspawn` | 设置世界出生点 | OP |
| `ultiworlds.admin.settings` | 修改世界设置 | OP |
| `ultiworlds.admin.protect` | 管理世界保护 | OP |
| `ultiworlds.admin.block` | 管理世界访问控制 | OP |
| `ultiworlds.bypass.locked` | 绕过世界锁定限制 | OP |
| `ultiworlds.bypass.blocked` | 绕过世界封禁限制 | OP |
| `ultiworlds.bypass.protection` | 绕过世界保护限制 | OP |
| `ultiworlds.world.*` | 访问所有世界（启用 `permission_per_world` 时） | OP |
| `ultiworlds.world.<世界名>` | 访问指定世界（启用 `permission_per_world` 时） | - |

## 常见问题

**Q: 安装后不生效怎么办？**

A: 请确认以下几点：(1) UltiTools-API 版本为 6.2.0 或更高；(2) JAR 文件放在 `plugins/UltiTools/plugins/` 目录下，不是 `plugins/` 目录下；(3) 完整重启了服务器。查看控制台是否有 "UltiWorlds has been enabled" 字样。

**Q: 改了配置文件没效果？**

A: 修改 `config/worlds.yml` 后执行 `/ul reload` 即可热加载大部分配置。但 `world_isolation.enabled` 等核心开关的更改需要重启服务器才能生效。

**Q: 权限怎么设置？**

A: 使用标准 Bukkit 权限系统，推荐 LuckPerms。基础使用权限 `ultiworlds.use` 建议给所有玩家。管理员命令默认需要 OP。如果你想控制每个世界的访问权限，在配置中设置 `tp_to_world.permission_per_world: true`，然后通过 `ultiworlds.world.世界名` 来分配。

**Q: 删除世界后还能恢复吗？**

A: 不能。`/world delete` 会先卸载世界，然后递归删除世界文件夹中的所有文件。这个操作不可逆，请在操作前确认或备份。受保护的世界（配置在 `protected_worlds` 中的）不能被删除。

**Q: 背包隔离开启后已有的物品怎么办？**

A: 首次启用背包隔离时，玩家当前所在世界的背包会被作为该世界组的初始背包保存。其他世界组的背包数据为空（新背包）。建议在服务器没有玩家在线时启用此功能，避免数据混乱。

**Q: 创建向导输入超时了怎么办？**

A: 向导每一步有 60 秒输入时限。超时后创建流程自动取消，不会有副作用。可以重新输入 `/world wizard` 开始新的创建流程。

**Q: 世界描述支持什么格式？**

A: 世界描述支持颜色代码（使用 `&` 前缀，如 `&a` 为绿色）和占位符（`{player}` 替换为玩家名，`{world}` 替换为世界名）。多行描述用 `\n` 分隔。如果安装了 PlaceholderAPI，也可以在描述中使用 PAPI 变量。

## 更新日志

### v2.0.0 (2026-02-13)

新增：世界创建向导（交互式对话引导，支持环境/地形/建筑/种子选项）
新增：命令行世界创建，支持 NORMAL / NETHER / THE_END 环境类型
新增：世界加载/卸载/删除管理
新增：空世界自动卸载功能（可配置检查间隔和等待时间）
新增：GUI 世界列表浏览
新增：带冷却时间的跨世界传送
新增：世界出生点设置
新增：每世界独立难度配置（PEACEFUL / EASY / NORMAL / HARD）
新增：传送后自动执行命令（支持 add / list / clear 管理）
新增：多行世界描述，支持颜色代码和 PlaceholderAPI
新增：PVP / 怪物 / 动物 / 天气 独立世界规则
新增：完整世界保护（破坏/放置/交互/爆炸四项）
新增：世界锁定、封禁和隐藏访问控制
新增：背包隔离系统（背包/末影箱/经验/生命值/饥饿值/药水效果）
新增：世界分组，同组世界共享背包
新增：权限控制（基础访问、管理员操作、绕过限制、每世界单独权限）
新增：删除确认 GUI
新增：中文和英文语言支持
