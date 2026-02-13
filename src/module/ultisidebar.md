# UltiSideBar - 自定义侧边栏记分板

UltiSideBar 是一个基于 UltiTools-API 的侧边栏插件模块，可以在玩家屏幕右侧显示自定义的动态信息面板。

## 功能概述

UltiSideBar 提供完全可配置的侧边栏记分板（Scoreboard Sidebar）功能。你可以自定义标题和每一行的内容，支持 Minecraft 颜色代码和 PlaceholderAPI 变量，实现动态数据实时更新。侧边栏会按照你设置的间隔自动刷新内容，例如在线人数、玩家余额、服务器时间等都能实时显示。

每位玩家可以自主选择是否显示侧边栏，开关状态会自动保存到数据库，下次上线仍然保持。你还可以为特定世界禁用侧边栏（比如小游戏世界），玩家在这些世界中侧边栏会自动隐藏，离开后自动恢复。

配置修改后执行 `/sidebar reload` 即可实时生效，无需重启服务器。

## 安装

### 前置依赖

- **UltiTools-API** 6.2.0 或更高版本
- **PlaceholderAPI**（可选，但强烈推荐安装，否则变量不会生效）

### 安装方式一：通过 UPM 安装

在服务器控制台或游戏内执行：

```
/upm install UltiSideBar
```

### 安装方式二：手动安装

1. 下载 `UltiSideBar.jar` 文件
2. 将 JAR 文件放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器
4. 编辑配置文件 `plugins/UltiTools/UltiSideBar/config/sidebar.yml`
5. 执行 `/sidebar reload` 使配置生效

## 快速开始

安装完成后，侧边栏会使用默认配置自动显示给所有在线玩家。要定制你自己的侧边栏，打开配置文件 `plugins/UltiTools/UltiSideBar/config/sidebar.yml`，修改标题和内容行：

```yaml
# 启用侧边栏
enabled: true

# 侧边栏标题（支持颜色代码和 PlaceholderAPI 变量）
title: "&6&l我的服务器"

# 更新间隔（单位：tick，20 tick = 1 秒）
update-interval: 20

# 侧边栏内容行（支持 PlaceholderAPI 变量）
lines:
  - "&7欢迎, &f%player_name%"
  - ""
  - "&e在线人数: &f%server_online%/%server_max_players%"
  - "&e世界: &f%world_name%"
  - ""
  - "&e金币: &f%vault_eco_balance_formatted%"
  - "&ePing: &f%player_ping%ms"
  - ""
  - "&7服务器时间"
  - "&f%server_time_hh:mm:ss%"
  - ""
  - "&6play.example.com"

# 禁用侧边栏的世界列表
world-blacklist:
  - "world_event"

# 玩家首次进入服务器时，侧边栏默认是否开启
default-enabled: true
```

保存后执行 `/sidebar reload`，所有在线玩家的侧边栏会立即更新。

## 命令

| 命令 | 说明 | 权限 | 执行者 | 示例 |
|------|------|------|--------|------|
| `/sidebar` | 显示帮助信息 | `ultisidebar.toggle` | 玩家 / 控制台 | `/sidebar` |
| `/sidebar toggle` | 切换侧边栏显示 | `ultisidebar.toggle` | 仅玩家 | `/sidebar toggle` |
| `/sidebar on` | 开启侧边栏 | `ultisidebar.toggle` | 仅玩家 | `/sidebar on` |
| `/sidebar off` | 关闭侧边栏 | `ultisidebar.toggle` | 仅玩家 | `/sidebar off` |
| `/sidebar reload` | 重载配置文件 | `ultisidebar.admin` | 玩家 / 控制台 | `/sidebar reload` |

命令别名：`/sb`（例如 `/sb toggle` 等价于 `/sidebar toggle`）

### 权限节点

| 权限 | 说明 | 默认 |
|------|------|------|
| `ultisidebar.toggle` | 允许玩家切换自己的侧边栏开关 | 所有玩家 |
| `ultisidebar.admin` | 允许重载配置 | OP |

## 配置文件

配置文件位置：`plugins/UltiTools/UltiSideBar/config/sidebar.yml`

```yaml
# 是否启用侧边栏功能
# 设为 false 将完全关闭侧边栏，所有玩家都看不到
enabled: true

# 侧边栏标题
# 支持 & 颜色代码和 PlaceholderAPI 变量
# 长度限制：1-32 个字符
title: "&6&l我的服务器"

# 内容刷新间隔（单位：tick，20 tick = 1 秒）
# 范围：1-1200（最短 0.05 秒，最长 60 秒）
# 推荐值：20（每秒刷新一次）
# 如果侧边栏内容不需要频繁更新，可以设大一些来降低性能开销
update-interval: 20

# 侧边栏内容行
# 每一行支持 & 颜色代码和 PlaceholderAPI 变量
# 空字符串 "" 表示空行
# 行数限制：1-15 行
lines:
  - "&7欢迎, &f%player_name%"          # 欢迎信息，显示玩家名
  - ""                                  # 空行
  - "&e在线人数: &f%server_online%/%server_max_players%"  # 在线/最大人数
  - "&e世界: &f%world_name%"            # 当前世界名
  - ""                                  # 空行
  - "&e金币: &f%vault_eco_balance_formatted%"  # Vault 经济余额
  - "&ePing: &f%player_ping%ms"         # 玩家网络延迟
  - ""                                  # 空行
  - "&7服务器时间"                       # 静态文字
  - "&f%server_time_hh:mm:ss%"          # 服务器当前时间
  - ""                                  # 空行
  - "&6play.example.com"                # 服务器地址

# 禁用侧边栏的世界
# 进入列表中的世界时，侧边栏会自动隐藏
# 离开这些世界后会自动恢复
world-blacklist:
  - "world_event"

# 玩家首次进入服务器时是否默认开启侧边栏
# true: 新玩家自动看到侧边栏
# false: 新玩家需要手动执行 /sidebar on 才能看到
default-enabled: true
```

### 颜色代码参考

使用 `&` 加颜色字符来设置颜色：

| 代码 | 颜色 | 代码 | 颜色 | 代码 | 样式 |
|------|------|------|------|------|------|
| `&0` | 黑色 | `&8` | 深灰 | `&l` | 粗体 |
| `&1` | 深蓝 | `&9` | 蓝色 | `&m` | 删除线 |
| `&2` | 深绿 | `&a` | 浅绿 | `&n` | 下划线 |
| `&3` | 深青 | `&b` | 青色 | `&o` | 斜体 |
| `&4` | 深红 | `&c` | 红色 | `&r` | 重置 |
| `&5` | 紫色 | `&d` | 粉色 | | |
| `&6` | 金色 | `&e` | 黄色 | | |
| `&7` | 灰色 | `&f` | 白色 | | |

### 常用 PlaceholderAPI 变量

| 变量 | 说明 |
|------|------|
| `%player_name%` | 玩家名称 |
| `%player_ping%` | 玩家延迟（ms） |
| `%player_health%` | 玩家生命值 |
| `%player_food_level%` | 玩家饥饿值 |
| `%server_online%` | 在线人数 |
| `%server_max_players%` | 最大人数 |
| `%server_tps%` | 服务器 TPS |
| `%world_name%` | 当前世界名称 |
| `%vault_eco_balance%` | 玩家余额 |
| `%vault_eco_balance_formatted%` | 格式化余额（带货币符号） |
| `%server_time_hh:mm:ss%` | 服务器时间 |

更多变量请参考 [PlaceholderAPI Wiki](https://github.com/PlaceholderAPI/PlaceholderAPI/wiki/Placeholders)。使用变量前需要先安装 PlaceholderAPI 插件和对应的扩展包（ecloud）。

## 使用教程

### 场景一：给服务器配置一个简洁的信息栏

假设你想显示服务器名称、在线人数和服务器IP，配置这样写就够了：

```yaml
enabled: true
title: "&b&l星辰生存服"
update-interval: 40
lines:
  - "&f欢迎来到星辰生存服!"
  - ""
  - "&e在线: &a%server_online% &7/ &f%server_max_players%"
  - ""
  - "&dplay.starsurv.com"
default-enabled: true
world-blacklist: []
```

`update-interval: 40` 表示每 2 秒刷新一次，内容简单的话不用太频繁。

### 场景二：在小游戏世界隐藏侧边栏

如果你的服务器有小游戏世界（比如 `minigames`、`bedwars`），这些世界有自己的记分板，UltiSideBar 的侧边栏会和它们冲突。把这些世界加入黑名单：

```yaml
world-blacklist:
  - "minigames"
  - "bedwars"
  - "world_event"
```

玩家从这些世界回到普通世界时，侧边栏会自动恢复。

### 场景三：玩家自己关闭侧边栏

有些玩家不喜欢侧边栏遮挡视野。玩家可以随时使用 `/sidebar off` 关闭，下次上线也不会重新出现。想恢复的话执行 `/sidebar on` 即可。

如果你希望新玩家默认不看到侧边栏（让玩家自己选择开启），把 `default-enabled` 改为 `false`：

```yaml
default-enabled: false
```

### 场景四：显示多种经济信息

如果你的服务器安装了 Vault 和经济插件，可以显示详细的经济信息：

```yaml
lines:
  - "&6&l经济信息"
  - "&e金币: &f%vault_eco_balance_formatted%"
  - "&e点券: &f%playerpoints_points%"
  - ""
  - "&6&l个人信息"
  - "&ePing: &f%player_ping%ms"
  - "&e游戏时长: &f%statistic_hours_played%h"
```

注意：`%playerpoints_points%` 需要安装 PlayerPoints 插件和对应的 PAPI 扩展。

## 常见问题

### 1. 安装后不生效怎么办？

确认以下几点：
- UltiTools-API 版本是否 >= 6.2.0
- JAR 文件是否放在 `plugins/UltiTools/plugins/` 目录下（注意不是 `plugins/` 根目录）
- 是否重启了服务器（首次安装需要重启，`/ultitools reload` 可能不够）
- 检查控制台是否有报错信息

### 2. 改了配置文件没效果？

保存配置文件后需要执行 `/sidebar reload` 命令才能生效。注意检查 YAML 格式是否正确，缩进必须使用空格而不是 Tab。

### 3. 权限怎么设置？

UltiSideBar 使用两个权限节点：
- `ultisidebar.toggle` — 控制玩家是否能使用 `/sidebar toggle/on/off` 命令。默认所有玩家都有此权限。
- `ultisidebar.admin` — 控制谁能执行 `/sidebar reload`。默认只有 OP。

使用 LuckPerms 等权限插件来管理。例如给 VIP 组添加切换权限：
```
/lp group vip permission set ultisidebar.toggle true
```

### 4. PlaceholderAPI 变量显示原始文本（没有被替换）？

- 确认已安装 PlaceholderAPI 插件
- 确认已安装对应的扩展包，例如 `%vault_eco_balance%` 需要执行 `/papi ecloud download Vault` 然后 `/papi reload`
- 如果变量来自第三方插件（如 PlayerPoints），需要安装该插件对应的 PAPI 扩展
- 控制台如果显示 "PlaceholderAPI not found! Variables will not work." 说明 PAPI 没装或没加载成功

### 5. 侧边栏和其他插件的记分板冲突了怎么办？

Minecraft 每个玩家同时只能显示一个侧边栏记分板。如果其他插件（如小游戏插件）也设置了侧边栏，会互相覆盖。解决方法：
- 把有记分板冲突的世界加入 `world-blacklist`
- 玩家在冲突的世界中手动执行 `/sidebar off`

### 6. 侧边栏太卡了怎么办？

- 增大 `update-interval` 的值，比如改成 `40`（2 秒刷新）或 `100`（5 秒刷新）
- 减少 `lines` 的行数
- 减少使用计算开销大的 PlaceholderAPI 变量

## 数据存储

玩家的侧边栏开关偏好自动保存到 UltiTools 配置的数据源中（JSON / SQLite / MySQL），无需额外配置。

- 数据表名：`sidebar_preferences`
- 字段：`player_uuid`（玩家 UUID）、`enabled`（是否启用，布尔值）

## 更新日志

### v1.0.0 (2026-02-13)

初始版本发布。

新增：
- 自定义侧边栏标题和多行内容，支持颜色代码
- PlaceholderAPI 变量支持，动态数据实时显示
- 玩家偏好持久化存储（开关状态保存到数据库）
- 内容缓存性能优化，仅在内容变化时更新记分板
- 世界黑名单功能，特定世界自动隐藏侧边栏
- 可配置的刷新间隔（1-1200 tick）
- `/sidebar toggle/on/off` 玩家自主控制
- `/sidebar reload` 配置热重载
- 玩家加入/离开/切换世界时自动处理侧边栏状态
- 中英文双语支持
