# UltiWorlds

多世界管理模块 -- 世界创建、传送、保护、背包隔离和精细化世界规则配置。

当前模块 **2.0.0** 要求 **UltiTools-API 6.3.0 或更高版本**。新 JAR 安装与替换后完整重启；`/ul reload` 只重载配置，不加载 JAR。

## 功能概述

UltiWorlds 是 UltiTools 框架下的多世界管理模块，提供了服务器多世界运营所需的全套工具。你可以通过命令或交互式向导创建新世界（支持主世界、下界、末地三种环境），对每个世界独立配置 PVP 开关、怪物/动物生成、天气控制、难度等级等规则。传送系统支持 GUI 界面浏览和命令行直达，带冷却时间和权限检查。保护系统可以一键启用方块破坏/放置/交互/爆炸保护。访问控制包括世界锁定、封禁和隐藏。背包隔离系统支持按世界或世界组隔离背包、末影箱、经验、生命值、饥饿值和药水效果。此外还支持世界描述展示（多行、颜色代码与内置占位符）、传送后自动执行命令以及空世界自动卸载。

## 安装

**方法一：通过 UPM（UltiTools Package Manager）安装**

```
/upm install ultiworlds
```

**方法二：手动安装**

1. 确保服务器已安装 UltiTools-API 6.3.0 或更高版本
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
| `/world info [世界]` | 查看当前所在世界的详细信息 | `ultiworlds.use` | 仅玩家 |
| `/world help` | 显示帮助信息；控制台仅显示删除用法 | `ultiworlds.use` | 玩家/服务器控制台 |

### 创建与管理命令

| 命令 | 描述 | 权限 | 使用者 |
|------|------|------|--------|
| `/world wizard` | 启动交互式世界创建向导 | `ultiworlds.admin.create` | 仅玩家 |
| `/world create <名称>` | 创建主世界环境的新世界 | `ultiworlds.admin.create` | 仅玩家 |
| `/world create <名称> <类型>` | 创建指定环境类型的新世界（NORMAL / NETHER / THE_END） | `ultiworlds.admin.create` | 仅玩家 |
| `/world load <名称>` | 加载一个已存在但未加载的世界 | `ultiworlds.admin.load` | 仅玩家 |
| `/world unload <名称>` | 卸载世界（玩家会被传送到主世界） | `ultiworlds.admin.unload` | 仅玩家 |
| `/world delete <名称>` | 确认后删除世界（不可撤销） | `ultiworlds.admin.delete` | 玩家/服务器控制台，非 RCON |
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
| `/world set <世界> autoUnload <true/false>` | 设置该项开关 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> protectBreak <true/false>` | 设置该项开关 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> protectPlace <true/false>` | 设置该项开关 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> protectInteract <true/false>` | 设置该项开关 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world set <世界> protectExplosion <true/false>` | 设置该项开关 | `ultiworlds.admin.settings` | 仅玩家 |

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
| `/world postcmd <世界> list` | 查看已配置的传送后命令 | `ultiworlds.admin.settings` | 仅玩家 |
| `/world postcmd <世界> clear` | 清除所有传送后命令 | `ultiworlds.admin.settings` | 仅玩家 |

传送后命令支持 `{player}` 和 `{world}` 占位符，以控制台身份执行。

## 配置文件

所有配置文件位于 `plugins/UltiTools/pluginConfig/UltiWorlds/` 目录下。

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
  check_interval: 60                 # 检查间隔（单位：秒，1-107374182；建议至少 10）
  unload_after: 300                  # 世界空闲多久后卸载（单位：秒，60-86400）

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

```

#### 配置项速查（本语言默认值）

| 键 | 类型 | 默认值 | 说明 / 范围 |
|---|---|---|---|
| `default_world` | text | `"world"` | 默认世界名称 |
| `protected_worlds` | list | `["world", "world_nether", "world_the_end"]` | 受保护的世界（不能自动卸载或删除） |
| `load_worlds_on_start` | list | `[]` | 服务器启动时自动加载的世界 |
| `auto_unload.enabled` | boolean | `false` | 启用空世界自动卸载 |
| `auto_unload.check_interval` | number | `60` | 检查间隔（单位：秒，1-107374182；建议至少 10） |
| `auto_unload.unload_after` | number | `300` | 世界空闲多久后卸载（单位：秒，60-86400） |
| `tp_to_world.enabled` | boolean | `true` | 允许玩家在世界间传送 |
| `tp_to_world.permission_per_world` | boolean | `false` | 每个世界要求单独权限 |
| `tp_to_world.cooldown` | number | `10` | 传送冷却时间（单位：秒，0-300） |
| `tp_to_world.show_description` | boolean | `true` | 传送时显示世界描述 |
| `world_spawn.use_spawn_location` | boolean | `true` | 传送到世界出生点（而非上次离开的位置） |
| `world_isolation.enabled` | boolean | `false` | 启用背包隔离（默认关闭） |
| `world_isolation.separate_inventory` | boolean | `true` | 隔离背包 |
| `world_isolation.separate_ender_chest` | boolean | `true` | 隔离末影箱 |
| `world_isolation.separate_experience` | boolean | `false` | 隔离经验等级 |
| `world_isolation.separate_health` | boolean | `false` | 隔离生命值 |
| `world_isolation.separate_hunger` | boolean | `false` | 隔离饥饿值 |
| `world_isolation.separate_effects` | boolean | `false` | 隔离药水效果 |
| `world_isolation.shared_worlds` | text | `# 共享背包的世界组（同组内共享，逗号分隔）` | 见键名及上方完整示例 |


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

A: 请确认以下几点：(1) UltiTools-API 版本为 6.3.0 或更高；(2) JAR 文件放在 `plugins/UltiTools/plugins/` 目录下，不是 `plugins/` 目录下；(3) 完整重启了服务器。查看控制台是否有 "UltiWorlds has been enabled" 字样。

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

A: 世界描述支持颜色代码（使用 `&` 前缀，如 `&a` 为绿色）和占位符（`{player}` 替换为玩家名，`{world}` 替换为世界名）。多行描述用 `\n` 分隔。本模块在传送描述中处理上述两个占位符；不要把未验证的第三方占位符当作内置保证。

### 升级到 2.0.0：调度、配置与世界设置

安装新的 `UltiWorlds-2.0.0.jar` 前先升级 UltiTools-API 至 6.3.0 或更高版本，再完整重启。配置根是 `plugins/UltiTools/pluginConfig/UltiWorlds/`；不会为了升级替换你的世界、已有配置值或自写注释。`auto_unload.check_interval` 是秒，范围 1–107374182（建议至少 10），默认 60；第一次检查在模块加载一个间隔后执行。改值后 `/ul reload UltiWorlds` 会由框架调度器保持周期位置并调整间隔；启动时越界会拒绝模块，重载时越界保留运行间隔、点名警告并报告部分完成。不要只看“执行过重载”就认为新值已生效。

自动卸载还要求全局 `auto_unload.enabled: true`、该世界的 `autoUnload: true`、未列入 `protected_worlds` 且空置超过 `auto_unload.unload_after`；检查是周期性的，不会在刚达空置阈值的瞬间保证执行。`default_world` 无法找到时会警告并改用服务器第一个世界；无法加载的 `load_worlds_on_start` 项在启动时被报告。`world_isolation.enabled` 改动需要重启；共享组在启动时建立，改 `shared_worlds` 后也请重启，不要在在线玩家切世界期间改组。

八个失效键为 `gui_title`、`messages.world_teleport`、`messages.world_not_found`、`messages.no_permission`、`messages.world_created`、`messages.world_deleted`、`unload_empty_worlds` 与 `unload_delay`。它们从未起作用；已有文件不会自动删键，启动和每次模块重载逐项警告。请改有效的 `auto_unload.enabled`、`auto_unload.unload_after`，消息和列表标题改自定义语言文件：在同目录把官方 `lang/zh.yml` 复制为 `lang/zh-myserver.yml`，修改副本，并在 UltiTools 主配置设置 `language: zh-myserver`。官方文件在启动或模块重载恢复，旧修改仅保留为 `.bak`。

`/world info <世界>` 会列出难度与全部十二个开关；`/world set myworld autoUnload true`、`protectBreak`、`protectPlace`、`protectInteract`、`protectExplosion` 可分别设置。文字 `/world list` 与 GUI 都不再显示隐藏世界，GUI 点击在下一 tick 传送，直接 `/world tp` 不变。世界名按服务器实际名字保存，大小写不同也不会另建设置行；旧的异拼写行只警告、不合并，在 MySQL 的不区分大小写排序规则下仍可能被查询到。共享背包组名也忽略大小写，重复世界归首次出现的组并警告。

### 删除确认、控制台与面板

先备份，再对确认要删的、未受保护的世界执行 `/world delete myworld`。玩家会看到有效期 30 秒的确认窗口；只有自己的绿色 `OK` 按钮会删除，红色 `Cancel` 或关闭不删除。确认会重查权限、默认世界和 `protected_worlds`，关闭、过期或期间本模块已开始过该世界的删除，都会使旧确认不可用。删除不可撤销，确认不是备份。

服务器控制台现在也可删除：第一次 `world delete myworld` 只给提示，30 秒内按完全相同的拼写和大小写再次发送才确认；过期会成为新请求。RCON、命令方块不支持；其余 `/world` 子命令仍仅玩家。所有真正以服务器控制台身份执行的命令共用 `CONSOLE` 身份，因此控制台、UltiPanel、定时任务、菜单、礼包、邮件和传送后命令可以互相完成这两次确认。

UltiPanel 成功分派时 `data.output` 是 `Command dispatched to the server console. Its output appears in the server log stream.`，只表示已分派。请在服务器日志（或开启日志流的面板日志视图）看确认提示、结果或拒绝原因。**不要把 `world delete` 配成传送后命令**：任意两名玩家在 30 秒内传送进去，或一次传送加其他控制台发送，就可能删除；传送玩家不会收到提示。因此 `ultiworlds.admin.settings` 实际上足以通过这些命令删除未受保护世界，必须仅交给可信管理员。

默认世界与 `protected_worlds` 按忽略大小写保护。删除按世界实际文件夹名执行；符号链接仅删除链接本身，不跟随目标；删除不完整时保留设置并警告。确认不识别外部删掉又同名重建的世界：其他插件或手工在 30 秒内这样操作，旧确认可能作用到新世界；不要在待确认期间用外部工具换世界。

### 已有地图加载与已知限制

加载已有下界/末地前备份世界文件夹，再用 `/world load myworld`；每次重新读取文件夹形态，不沿用本次运行的旧推断。只有一个真实的顶层 `DIM-1` 或 `DIM1` 且没有顶层 `region` 时，才分别提供 NETHER 或 THE_END。两个维度、符号链接或维度与 `region` 共存都不猜测，沿服务器默认值并按实际观察记日志；没有维度目录的普通主世界保持原行为。需要整理时**移出而不是删除**目录，两个目录里都可能有玩家建筑。

上面所述形态的完整对照表（与英文页相同）：

| folder holds | applied | move X out -> |
|---|---|---|
| `DIM-1` | NETHER | `DIM-1` -> none |
| `DIM1` | THE_END | `DIM1` -> none |
| `DIM-1`, `region` | none | `region` -> NETHER; `DIM-1` -> none |
| `DIM1`, `region` | none | `region` -> THE_END; `DIM1` -> none |
| `DIM-1`, `DIM1`, `region` | none | `DIM1` -> none; `DIM-1` -> none |
| `DIM-1`, `DIM1` | none | `DIM1` -> NETHER; `DIM-1` -> THE_END |
| `DIM-1(link)`, `region` | none | `region` -> none |
| `DIM-1(dangling)` | none | `DIM-1` -> none |
| `region` | none | |

共享数据库的世界设置每次修改会重读，并在值仍与读取时相同才写入；冲突最多重试三次，之后告警且改动只留本服内存，直到本服下次成功修改该世界或重启。其他服的改动要等本服下次改该世界任一设置或重启才进入本服检查；世界自身 PvP 要等玩家切入，难度要等重启。不要把成功聊天提示当作持久写入保证，尤其记录已删除时只有控制台记录失败。

不要在运行中手改内部表。若处理遗留共享 SQLite 记录，布尔只写 `0`/`1`，不要把布尔或数字写 `NULL`；其他拼写/空值会使后续比较一直冲突，直到改回有效值。多服并发写同一个 SQLite 文件可能直接使设置命令失败，重试命令即可；多服共享设置请用 MySQL。背包保存失败会记日志，但切世界流程不是原子事务，不能保证在故障、断联或停机下绝不丢失；启用隔离、换组之前先备份并安排无人在线的维护窗口。

## 更新日志

### v2.0.0

原 Unreleased 中未使用的旧世界列表实现 WorldListGUI 已移除，不改变玩家或服主能看到的行为；失效配置以本页八键清单为准。以下采用实际 2.0.0 发布版本与更正后的面板回执语义，不把命令已分派当作删除成功。

#### 新增

- 本模块现在会在启动时、以及每次 `/ul reload` 时检查你自己的 `config/worlds.yml` 中是否仍存在本版本不再读取的
  八个配置键（见下方 Removed 中的条目），并为每个残留键各记一条警告，点明模块、文件与键名，并说明文本来自哪里。
  从模块中删除一个键，只会让**新生成**的文件里不再有它，对你已有的文件没有任何影响，因此若没有这条警告，被改过的值
  会继续悄无声息地不起作用。把这些键从文件中删除即可不再提示（UltiKits/UltiWorlds#38 的一部分）。

#### 变更

- **需要 UltiTools 6.3.0。** `plugin.yml` 的 `api-version` 从已发布的 1.0.0 中的 `620` 提升到 `630`。
  UltiTools 6.2.x 会因该 `api-version` 拒绝加载本模块。

- 空世界检查现在由框架自身的配置绑定调度执行，绑定到 `auto_unload.check_interval`（UltiTools 6.3.0，
  UltiKits/UltiTools-Reborn#531），不再使用模块内部的每秒计数。首次检查在模块加载一个间隔之后进行。`/ul reload`
  会应用修改后的值，并保持检查在其周期中的位置；超出 1 到 107374182 秒的值会在启动时令模块被拒绝加载，在 `/ul reload`
  时不会生效：保留正在运行的间隔，一条警告点明该键，且重载被报告为部分完成。**最小值从 10 秒降为 1 秒**；建议至少 10 秒。
  不会改写你的 `config/worlds.yml`；只有新生成的文件、或由框架新插入的键，才带有新的注释。

- `plugin.yml` 现声明 `identify-string: ultiworlds`，即 UltiKits 模块目录中本模块的标识。有了它，框架启动时的更新检查与
  `/upm update` 会包含本模块；此前会跳过它。此前发布、不带该标识的模块 jar 不能作为本版本的更新来源。

- `/world delete <名称>` 现在会在删除前先询问。它在原有检查（权限、该名称的世界存在、不是默认世界、
  不在 `protected_worlds` 中）之后，不再立即删除，而是打开标题为"Confirm Delete: &lt;名称&gt;"的确认窗口；
  只有点击窗口中绿色的 `OK` 按钮才会删除世界。点击红色的 `Cancel` 按钮，或以其他任何方式关闭窗口，都
  不会删除任何内容。点击 `OK` 时会再次检查权限、默认世界与 `protected_worlds`，因为窗口打开期间它们可能
  发生变化；并且一个窗口最多只执行一次删除，关闭后不再执行，且只响应窗口自身 `OK` 按钮的点击（不会响应在
  自己背包同一格位的点击）。窗口有效期为 30 秒，与控制台确认使用相同的时限和时钟：超过后点击 `OK` 不会删除
  任何内容，并提示重新执行命令。若窗口打开期间本模块因另一个请求删除了该世界（或开始删除但中途失败），你的 `OK` 同样不会删除任何内容。
  聊天提示也随之改变：原来的"正在删除世界……"、"世界已删除"、
  "删除世界失败"三行（`world.delete.deleting`、`world.delete.success`、`world.delete.failed`）不再发送给玩家；
  改由窗口发送"世界 &lt;名称&gt; 已删除"或"删除世界 &lt;名称&gt; 失败"（`command.delete.success`、
  `command.delete.failed`），点击 `Cancel` 时发送"已取消删除操作"（`command.delete.cancelled`）。如果你为玩家
  自定义过旧的三行文本，请把文本迁移到自定义语言文件的新键上，而不是官方的 `lang/*.yml`：在同一 `lang/` 目录中把
  官方文件复制为以其语言代码加连字符开头的文件（例如 `lang/zh-myserver.yml`），并在 `plugins/UltiTools/config.yml`
  中设置 `language: zh-myserver`。在官方文件中做过的修改不会保留：升级后的首次启动会恢复该文件，并把原文件保留为
  `.bak`，你原来的文本就在其中（UltiKits/UltiTools-Reborn#616）。旧的三行现在由控制台使用（见下一条）
  （UltiKits/UltiWorlds#19）。

- **服务器控制台现在可以删除世界，但需要打字确认。** 此前整个 `/world` 命令仅限玩家使用，控制台完全无法
  执行 `/world delete`。现在可以执行，但第一次请求绝不会删除：控制台执行 `/world delete <名称>` 时会做与
  玩家相同的检查（存在该名称的世界、不是默认世界、不在 `protected_worlds` 中），不删除任何内容，并提示在
  30 秒内再次执行同一条命令。只有这次重复——世界名称的拼写和大小写完全相同、且在 30 秒内——才会删除，并且
  删除前会再次完成全部检查；随后输出"正在删除世界……"，再输出"世界已删除"或"删除世界失败"。超过 30 秒的
  重复不会删除任何内容，而是重新开始 30 秒等待；若在请求之后本模块因另一个请求删除（或开始删除）了该名称的世界，重复不会删除
  任何内容，会给出提示，并视为新的请求；请求或重复被任一检查拒绝时，待确认的请求随之取消；每个
  请求只允许一次删除。待确认的请求只保存在内存中，重启后即失效；这 30 秒按不受系统时间调整影响的时钟计算。命令方块等既非玩家也非控制台的发送者会被
  拒绝，RCON（`mcrcon` 及许多聊天桥接工具使用的远程控制台协议）同样被拒绝：它不能删除世界。其余所有 `/world` 子命令与以前一样仅限玩家；控制台执行 `/world help` 时现在只列出
  `/world delete`（UltiKits/UltiWorlds#19）。

- **所有以服务器控制台身份执行的命令都算作控制台**，并且它们共用同一个身份：都报告名称 `CONSOLE`，因此对每个
  世界名称，它们合起来只有一个待确认请求，其中任何一个都能确认由另一个发起的请求。这包括 UltiPanel 远程命令、
  用 `/world postcmd add` 添加的传送后命令，以及其他模块或插件以控制台身份执行的命令（例如定时命令、菜单
  动作、礼包命令、邮件命令）。
  - **UltiPanel。** 面板用户在 30 秒内发送两次 `world delete <名称>` 即可删除世界。服务器接受命令分派时，
    `command_result` 的 `data.output` 为
    "Command dispatched to the server console. Its output appears in the server log stream."
    这只确认命令已分派，不代表删除成功：命令以服务器控制台身份执行，确认提示、执行结果与拒绝原因写入服务器日志，
    不会写入 `data.output`。请查看服务器日志中的这些行（若开启了日志流，也可在面板的日志视图中查看）。
  - **传送后命令。** 作为传送后命令保存的 `world delete <名称>`，会在任何玩家通过 `/world tp` 或世界列表传送
    进该世界时执行。30 秒内任意两次这样的传送（同一玩家或不同玩家）都会删除该世界；30 秒内一次这样的传送加上
    来自控制台、面板或任何其他控制台命令的同一条命令，同样会删除。若保存为 `world delete {world}`，它会作用于
    被传送进入的那个世界。确认提示发给控制台，传送的玩家不会得到任何提示。请不要添加这样的命令。添加传送后
    命令需要 `ultiworlds.admin.settings` 权限，因此该权限实际上足以删除任何未受保护的世界
    （UltiKits/UltiWorlds#19）。

- **已知限制。** 删除确认（无论来自玩家还是控制台）不会尝试识别"是否还是同一个世界"：它只受 30 秒时限和本模块
  自身删除操作的约束。若某个世界在这 30 秒内被其他插件或手工删除、又以同名重新创建，为原世界给出的确认会删除
  新创建的世界（UltiKits/UltiWorlds#19）。

#### 修复

- **共享同一数据库的多台服务器上的世界设置。** 在一台服务器上修改的世界设置，不会再被共享该数据库的另一台服务器的下一条设置命令撤销。
  此前每台服务器从首次读取起就把每个世界的设置记录保存在内存里，每次修改都把整份副本写回，因此期间在别处做的修改——
  `/world set`、`protect`、`unprotect`、`block`、`unblock`、`difficulty`、`postcmd add`/`clear` 或 `setspawn`，
  涉及该世界的任一设置——都会被还原。现在每次修改都会从数据库重新读取该世界的记录，只改动命令所设置的内容，并且仅当记录仍是读取时的
  内容时才写入；若另一台服务器在此期间写过该记录，则重新读取并重新应用这次修改，最多三次，之后控制台记录“更新世界设置失败”，
  这次修改只保留在本服务器内存中，与任何写入失败时相同，直到本服务器下次成功修改该世界或重启为止。另一台服务器做的修改，会在本服务器下次修改该世界的任一设置时、或重启后，
  进入本服务器自身的检查（模块的 PvP 伤害检查、保护、进入权限、世界列表）；世界本身的 PvP 开关要等玩家切换进该世界时才跟上，
  难度修改要到重启后才作用到本服务器的世界。一项范围很窄的限制记录在 `FEATURES.md`
  （`ultiworlds.settings.shared-db-external-change-kept`）（UltiKits/UltiWorlds#55）。

- 以与世界名不同的大小写输入的 `/world delete` 现在会删除该世界自己的文件夹。此前世界按不区分大小写找到并被卸载，
  文件夹却按输入的文字去找；在区分大小写的文件系统（Linux）上该文件夹并不存在，所以什么也没删除，却报告已删除，
  世界仍留在磁盘上（UltiKits/UltiWorlds#52）。

- 世界设置的改动若发现其对应的已存记录已不存在，现在会在控制台记录为失败（“更新世界设置失败”）；此前它会不留痕迹地被当作已保存。
  两台服务器共用一个数据库、其中一台删除了某世界的记录而另一台内存里仍有它时，或有人手动删除该记录时都会这样：命令回复成功，
  下次重启后设置却没了。命令本身的回复不变，只多了这条控制台输出。需要 UltiTools-API 6.3.0
  （UltiKits/UltiWorlds#51，UltiKits/UltiTools-Reborn#558）。

- 在世界列表中点击一个世界后，现在会在点击的下一个 tick 传送，而不是在点击事件之内。传送会运行该世界的传送后命令，
  而自 UltiTools 6.3.0 起，UltiTools 模块的命令在被分派的那一刻就运行；若某条命令会打开另一个模块的界面（例如菜单），
  就会在点击事件之内尝试打开，而 Paper 不允许这样做。在那一个 tick 内离线的玩家不会被传送。作为命令输入的 `/world tp` 不变
  （UltiKits/UltiWorlds#50）。

- 世界背包的保存若发现其对应的已存记录已不存在，现在在所有存储类型上都会报告失败，沿用保存失败时一贯的那一行控制台输出
  （“保存 &lt;玩家&gt; 的背包失败”）。此前只有 JSON 存储会报告；SQLite 和 MySQL 上这次保存什么也没写，却被当作已保存。
  需要 UltiTools-API 6.3.0（UltiKits/UltiWorlds#49，UltiKits/UltiTools-Reborn#558）。

- `/world list` 不再列出被你标记为隐藏的世界（`/world set <世界> hidden true`）。世界列表界面本来就不显示它，
  文字列表却照样列出并计入总数（UltiKits/UltiWorlds#48）。

- 现在每条 `/world` 命令都按世界自己的名字读写该世界的设置，不论你怎么输入。此前 `/world set MYWORLD pvp false`
  能找到 `myworld`（服务器不区分大小写），却把改动存进一行名为 `MYWORLD`、无人读取的新设置里，于是改动只生效一次，
  下次有玩家进入该世界时就被撤销，而命令却报告成功。`set`、`protect`、`unprotect`、`block`、`unblock`、`difficulty`、
  `postcmd`、`tp`（以及世界列表中的点击）和 `delete` 现在都使用世界自己的名字；`/world tp` 也不再让以其他大小写输入的
  被封锁或被锁定的世界放行。已按其他写法保存的旧行不会被合并：启动时，只有忽略大小写才与某个已加载世界同名的每一行，
  会各用一条警告列出，点明该行与该世界，其余保持原样；警告中说明，在默认排序规则忽略大小写的 MySQL 上，查找仍可能读到这样的行
  （UltiKits/UltiWorlds#46）。

- UltiWorlds 无法使用的值现在会被点名，而不是被悄悄忽略：不是已加载世界的 `default_world` 会在启动和 `/ul reload` 时提示，
  并说明玩家实际会被送往的世界（服务器的第一个世界）；无法加载的 `load_worlds_on_start` 条目会在启动时提示；
  `/world set <世界> icon <物品>` 会拒绝不是物品的名字，此前它会被保存并显示为默认图标。

- `auto_unload.check_interval` 现在决定检查无人世界的间隔（秒）；用 `/ul reload` 修改后在该次重载时生效（见上方 UltiTools 6.3.0
  条目）。此前无论该键为何值，都每 60 秒检查一次（UltiKits/UltiWorlds#38）。

- `world_isolation.shared_worlds` 现在与服务器一样按不区分大小写的方式匹配世界名。此前大小写与世界名不同的条目（例如用
  `MyWorld` 指 `myworld`）匹配不到任何世界，于是每个世界各自成组，玩家在它们之间穿过传送门时背包会被清空。
  同一个世界（不论大小写）被列出两次时，会在启动时提示，并保留在第一次出现的组中（UltiKits/UltiWorlds#34）。

- 控制台与聊天中的行现在按原样显示路径、世界名或你输入的文字。此前若值中含有该行随后的占位符（例如配置文件路径中的
  `{KEY}`，或用 `/world set` 设置的描述中的 `{WORLD}`），会被其改写。涉及已移除配置键的警告、世界环境与无效难度的警告、
  `/world list` 的各行以及 `/world set` 的确认消息（UltiKits/UltiWorlds#43）。

- `/world info` 现在显示世界保存的全部设置：难度，以及按名称列出的全部十二个开关（PvP、怪物、动物、天气、四项保护、隐藏、
  锁定、禁止进入和自动卸载）。此前只显示四项，其中一项是把四种保护合并成的一行。`/world info <世界>` 可查看指定世界。
  `/world set` 现在还接受 `autoUnload`、`protectBreak`、`protectPlace`、`protectInteract` 与 `protectExplosion`，
  此前没有任何命令能修改它们（UltiKits/UltiWorlds#17）。

- 多行的世界描述现在会在世界列表图标中显示每一行。此前整段描述是一行 lore，而客户端不显示一行 lore 中换行之后的内容，
  因此只显示了第一行。Windows 换行（`\r\n`）现在在列表和传送时显示的描述中按同样方式拆分（UltiKits/UltiWorlds#26）。

- 在关闭 PvP 的世界中攻击其他玩家时，攻击者现在会收到“此世界已禁用 PVP”的提示。此前攻击会被阻止，但提示从未送达：
  服务器会在模块的伤害处理之前拦下这次攻击，因此提示现在改为在攻击发起时发送（UltiKits/UltiWorlds#23）。

- 关闭天气的世界（`/world set <世界> weather false`）现在也会阻止雷暴开始。此前只阻止了下雨，而雷暴是独立的状态，
  因此世界仍可能进入雷暴（UltiKits/UltiWorlds#24）。

- `language: zh` 现在也对本模块原先写死为英文的控制台日志生效：加载世界时关于其环境的日志、拒绝删除受保护世界的日志、
  `/world delete` 遇到符号链接与未能完整删除时的日志、空世界自动卸载日志、已存储的无效难度，以及保存世界设置或玩家背包
  失败的日志。它们的英文措辞不变。`/world` 命令的描述（由 `/help` 显示）现在也跟随 `language`；原先是写死的中文。

- `/world help` 现在会向管理员显示 `/world unprotect` 与 `/world unblock` 两行。这两个命令本来就能用，语言文件里
  也有它们的帮助文本，但帮助从未打印过。

- `/world load` 现在会把下界或末地世界按其原本维度载入，而不再变为主世界。此前重新载入这类世界会提示成功，
  却把世界改绑到 `NORMAL` 维度，导致主世界地形覆盖原有世界。维度读取自服务器写入世界文件夹中的维度目录，
  且每次执行该命令时都会重新读取——因此重启后同样有效，并且反映文件夹当前的状态，而不是本次会话中较早时
  的状态。这也是下方 `move X out ->` 一列无需重启服务器即可生效的原因（UltiKits/UltiWorlds#22）。

- `/world load` 在需要时推断世界维度；当世界文件夹自相矛盾时则拒绝推断，并在控制台说明发生了哪一种
  情况、以及它看到了什么。该控制台行只陈述观察到的事实，不会告诉你该怎么做——因为模块刚刚声明自己无法
  读懂这个文件夹。下列形态按模块实际判断的顺序排列，第一个匹配的形态即为结果——因此同时符合多条描述的
  文件夹（例如两个维度目录都在、又没有 `region`）按靠前的那一条处理：
  - **形态 1 —— 维度目录是指向不存在位置的链接** —— 例如卷未挂载或目录被移走。不应用任何维度。请恢复
    链接指向的内容，或用真实目录替换该链接。
  - **形态 2 —— 完全没有维度目录条目** —— 普通主世界。不推断、不输出日志，与旧版本完全一致。
  - **形态 3 —— 维度目录是符号链接** —— 本模块读取世界文件夹时不跟随链接，因此没有读取链接指向的内容。
    不应用任何维度。由于上述顺序会在下面两种形态之前到达这一项，只要链接还是链接，移动其他目录都无济
    于事；用真实目录替换该链接后，该文件夹会按它当时匹配的形态重新判断。
  - **形态 4 —— 顶层同时有 `DIM-1` 与 `DIM1`** —— 单人存档或下载的地图，三个维度共用一个文件夹。不应用
    任何维度。移出不需要的那个维度目录后：若该文件夹还有顶层 `region` 目录（单人存档就是如此），会落到
    形态 5；若没有，则落到形态 6。
  - **形态 5 —— 同时有维度目录与顶层 `region` 目录** —— 一个文件夹里存着两个世界的地形，正是
    `UltiKits/UltiWorlds#22` 造成的。不应用任何维度。无论移出哪一个目录，都请**移动**而不要删除：两个
    目录里都可能有玩家建造的地形。
  - **形态 6 —— 有维度目录且没有顶层 `region`** —— 普通的下界（或末地）世界，也是唯一会应用维度的形态。
  各形态的结果见上方英文表格，而不是散在正文里：有一项测试会读取那张表，一旦表与代码不一致即失败
  （UltiKits/UltiWorlds#22）。

- `/world unload` 与 `/world delete` 现在在与 `default_world` 比对时忽略字母大小写。此前在
  `default_world: lobby` 下，`/world unload LOBBY` 不会触发"无法卸载默认世界！"的拒绝，仍会把
  lobby 卸载，随后从其他世界被移出的玩家会落到别处；`/world delete WORLD` 也可能被告知它"已列入
  protected_worlds"，而那份列表其实是空的（UltiKits/UltiWorlds#20）。

- `/world delete` 现在会拒绝删除列入 `protected_worlds` 的世界，兑现该配置项自身注释
  （"Worlds that cannot be auto-unloaded or deleted"）一直以来的承诺。执行者会收到
  "World `<名称>` is listed in protected_worlds and cannot be deleted!"，并且不会移除任何内容——
  世界文件夹和已保存的设置都会保留。按出厂默认配置，这意味着 `/world delete world_nether` 与
  `/world delete world_the_end` 不再永久删除这两个世界。该拒绝逻辑位于服务层而非命令层，因此今后
  新增的调用方也会自动受到同一保护（UltiKits/UltiWorlds#20）。

- `/world delete` 不再沿符号链接删除。当世界文件夹本身就是一个链接时，该链接此前会被跟随：链接指向的
  目录下的全部内容都会被删除，而被移除的只有链接本身，于是命令为一份存放在别处的数据报告了成功。本模块
  一向认为链接目录不属于世界文件夹、只移除链接条目——此前该规则只覆盖世界文件夹内部的链接，不覆盖处于
  世界文件夹自身位置的链接，现在两者都覆盖。因此，名称本身不在 `protected_worlds` 中的链接，也不再是
  通往受保护世界数据的通路。当目标是链接时，控制台会说明这一点，并且以「本命令能触及什么」而非
  「已经做了什么」的方式陈述，因此即使链接删除失败，该行依然成立；删除失败时报告的是「链接仍留在世界
  容器中」，而不是「文件夹中还有文件残留」（UltiKits/UltiWorlds#20）。

- `protected_worlds` 现在在两处读取时都忽略字母大小写：拒绝删除时，以及空世界自动卸载任务跳过世界时。
  若配置写作 `MyWorld` 而服务器中的世界名为 `myworld`，现在两处都会生效；此前只有完全一致的拼写才匹配
  （UltiKits/UltiWorlds#20）。

- 执行 `/upm uninstall UltiWorlds` 后，本模块的命令现在会被真正移除，其监听器也不再触发。此前本模块的卸载
  方法替换了框架的卸载方法且只输出一行日志，因此两者都会一直保持生效，直到服务器重启
  （UltiKits/UltiWorlds#27）。

#### 移除

- 移除 `/world` 的别名 `/w`。`w` 是原版命令标签（`/msg` 的别名，与 `/tell` 相同），因此 `/w <玩家> <消息>`
  可能被本模块接收，而不是发送私聊。请使用 `/world` 或 `/worlds`（UltiKits/UltiWorlds#45）。

- 移除 `config/worlds.yml` 中两个从未被任何代码读取的已弃用键：`unload_empty_worlds`（起作用的是 `auto_unload.enabled`）
  与 `unload_delay`（起作用的是 `auto_unload.unload_after`）。它们已从出厂文件中删除，已有文件中残留的这两个键会像上面六个键一样被提示
  （UltiKits/UltiWorlds#38）。

- 移除 `config/worlds.yml` 中从未被任何代码读取的六个键：`gui_title` 以及 `messages.world_teleport`、
  `messages.world_not_found`、`messages.no_permission`、`messages.world_created`、`messages.world_deleted`。
  修改其中任何一个都从未改变任何东西：世界列表的标题和所有世界相关消息都来自语言文件（`lang/en.yml`、`lang/zh.yml`），
  要自定义，请把官方语言文件复制为以其语言代码加连字符开头的文件（例如 `lang/zh-myserver.yml`），在副本中修改，并在
  `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver`（直接修改官方文件的改动会在下次启动或模块重载时被恢复，
  UltiKits/UltiTools-Reborn#616）。随插件分发的 `config/worlds.yml` 中也已删除它们，新服务器的文件不再包含这些键。已有文件中残留的键会在启动和
  重载时报告（见 Added）（UltiKits/UltiWorlds#38 的一部分）。

- 从 `lang/en.yml` 与 `lang/zh.yml` 中移除 38 条从未被任何代码显示的条目：旧的 `command.help.*` 帮助行（`unprotect`、
  `unblock`、`difficulty`、`postcmd` 除外，`/world help` 会显示它们）、`command.usage`、`command.set_options`、
  `common` 中未使用的「开」「关」、其消息改由其他条目提供的 `error.*` 与 `success.*` 行、`gui.delete.confirm`、
  `gui.delete.cancel`、`gui.delete.warning`（确认窗口的按钮由 UltiTools 自身提供），以及四条 `inventory.*`。

- 移除本模块在卸载时输出的"UltiWorlds 已禁用！"控制台行（及 `lang/en.yml`、`lang/zh.yml` 中的
  `worlds_disabled` 语言键），以及在 `/ul reload UltiWorlds` 时输出的"UltiWorlds configuration
  reloaded!"控制台行（无论 `language` 设置如何均以英文输出）。UltiTools 6.3.0 会为每个模块输出一行重载日志；
  重载仍会重新读取 `config/worlds.yml` 并报告 `@ConditionalOnConfig` 漂移，因为框架的重载方法会完成这两步
  （UltiKits/UltiWorlds#27）。


### v1.0.0 (2026-02-15)

首次发布的 UltiWorlds 模块。当前 2.0.0 的具体变化见上方版本说明。
