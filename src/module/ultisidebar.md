# UltiSideBar - 自定义侧边栏记分板

UltiSideBar 是一个基于 UltiTools-API 的侧边栏插件模块，可以在玩家屏幕右侧显示自定义的动态信息面板。

## 功能概述

UltiSideBar 提供完全可配置的侧边栏记分板（Scoreboard Sidebar）功能。你可以自定义标题和每一行的内容，支持 Minecraft 颜色代码和 PlaceholderAPI 变量，实现动态数据实时更新。侧边栏会按照你设置的间隔自动刷新内容，例如在线人数、玩家余额、服务器时间等都能实时显示。

每位玩家可以自主选择是否显示侧边栏，开关状态会自动保存到数据库，下次上线仍然保持。你还可以为特定世界禁用侧边栏（比如小游戏世界），玩家在这些世界中侧边栏会自动隐藏，离开后自动恢复。

配置修改后执行 `/sidebar reload` 即可实时生效，无需重启服务器。

## 安装

### 前置依赖

- **UltiTools-API** 6.3.0 或更高版本
- **PlaceholderAPI**（可选，但强烈推荐安装，否则变量不会生效）

### 安装方式一：通过 UPM 安装

在服务器控制台或游戏内执行：

```
/upm install UltiSideBar
```

### 安装方式二：手动安装

1. 下载 `UltiSideBar-2.0.0.jar` 文件
2. 将 JAR 文件放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器
4. 编辑配置文件 `plugins/UltiTools/pluginConfig/UltiSideBar/config/sidebar.yml`
5. 执行 `/sidebar reload` 使配置生效

## 升级到 2.0.0

先备份配置和偏好数据，安装 UltiTools-API 6.3.0 或更高版本，换入 `UltiSideBar-2.0.0.jar` 后完整重启。目录身份 `ultisidebar` 用于更新检查与 `/upm update`；重载/卸载名为 `UltiSideBar`。配置根目录含 pluginConfig，见下文。

标题和整份内容行如果仍与任一语言的内置/旧出厂文本完全相同，会在启动或 `/ul reload` 后按 language 改写并保存；自己的标题和行保留。例外是自写列表中完整匹配旧默认行 `&e世界: &f%world_name%` 或 `&f%server_time_hh:mm:ss%` 的条目，仍分别迁移为 player_world 与 server_time_HH:mm:ss 并保存；其他行不动。要保留内置文案却不跟随语言，至少改一个字符。这里读取的是 JAR 内置文本，改已解压的语言文件不会改标题/内容，直接改 sidebar.yml。六项框架注释也会在启动/不带参数的 `/ul reload` 后随语言更新，手写注释保留。

### 配置拒绝、计分板共享与偏好

`lines: []`、`~` 或非列表值改用服务器语言的 12 条出厂行，框架警告一次，文件原样保留，不再额外报告模块未写入。超过 15 行则加载时拒绝模块，指出条数及 [1, 15]，不截断、不改文件；修到 15 行内再重启。不要靠空列表关闭侧边栏，应改 enabled: false。若删除 title/lines 键后在英文等非中文语言下重载，仍可能有“更改未写入”额外警告与停机报告；重启而不是反复重载即可补齐缺键，无内容丢失。

侧边栏遇到其他插件的私有计分板会让路，回到主计分板才显示；主计分板上的原版侧边栏仍会被本模块替代。on/toggle 会说明位置被占用但仍保存选择，off 不会移除别人的侧边栏。UltiEssentials 的侧边栏同时开启时，启动后控制台有提示，可关闭其中一个或设置世界黑名单。不要让其他插件向本模块专属计分板写目标/队伍，此类写入不受支持，可能被覆盖。

主计分板队伍和名字前缀会复制到本模块计分板并随刷新更新；与队伍成员同名的内容行保留原样。其他插件注销目标、抢显示位置或清分数后，下一次刷新会重建并重画本侧边栏；只清本模块原有行，不清其他目标的分数。第 40 字符后才不同的两行都能出现，但不是承诺无限长度：每个显示条目最多 40 字符，重复时会加不可见区分符。

`default-enabled` 只用于没有保存过选择的玩家；已有主动开启的玩家在 default-enabled: false 后重载也会保留。`/sidebar reload` 与 `/ul reload UltiSideBar` 都经框架重载一次配置并刷新语言，然后重建侧边栏；新 JAR 仍需重启。卸载 `/upm uninstall UltiSideBar` 先关闭本模块侧边栏，再注销命令与监听器。

## 快速开始

安装完成后，侧边栏会使用默认配置自动显示给所有在线玩家。要定制你自己的侧边栏，打开配置文件 `plugins/UltiTools/pluginConfig/UltiSideBar/config/sidebar.yml`，修改标题和内容行：

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
  - "&e世界: &f%player_world%"
  - ""
  - "&e金币: &f%vault_eco_balance_formatted%"
  - "&ePing: &f%player_ping%ms"
  - ""
  - "&7服务器时间"
  - "&f%server_time_HH:mm:ss%"
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
| `ultisidebar.toggle` | 允许玩家切换自己的侧边栏开关 | OP（需授权玩家） |
| `ultisidebar.admin` | 允许重载配置 | OP |

## 配置文件

配置文件位置：`plugins/UltiTools/pluginConfig/UltiSideBar/config/sidebar.yml`

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
  - "&e世界: &f%player_world%"            # 当前世界名
  - ""                                  # 空行
  - "&e金币: &f%vault_eco_balance_formatted%"  # Vault 经济余额
  - "&ePing: &f%player_ping%ms"         # 玩家网络延迟
  - ""                                  # 空行
  - "&7服务器时间"                       # 静态文字
  - "&f%server_time_HH:mm:ss%"          # 服务器当前时间
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
| `%player_world%` | 当前世界名称 |
| `%vault_eco_balance%` | 玩家余额 |
| `%vault_eco_balance_formatted%` | 格式化余额（带货币符号） |
| `%server_time_HH:mm:ss%` | 服务器时间 |

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

如果你的服务器有小游戏世界（比如 `minigames`、`bedwars`），这些世界有自己的记分板，本模块会对它们的私有计分板让路；若不希望在那里尝试显示，可加黑名单：

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
- UltiTools-API 版本是否 >= 6.3.0
- JAR 文件是否放在 `plugins/UltiTools/plugins/` 目录下（注意不是 `plugins/` 根目录）
- 是否重启了服务器（首次安装需要重启，`/ul reload` 不能加载新 JAR）
- 检查控制台是否有报错信息

### 2. 改了配置文件没效果？

保存配置文件后需要执行 `/sidebar reload` 命令才能生效。注意检查 YAML 格式是否正确，缩进必须使用空格而不是 Tab。

### 3. 权限怎么设置？

UltiSideBar 使用两个权限节点：
- `ultisidebar.toggle` — 控制玩家是否能使用 `/sidebar toggle/on/off` 命令。节点未声明，默认 OP，需明确授予玩家。
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

Minecraft 每个玩家同时只能显示一个侧边栏记分板。如果其他插件（如小游戏插件）也设置了侧边栏，私有计分板会优先保留，主计分板的侧边栏仍会被本模块顶替。可选操作：
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

### v2.0.0

#### 变更

- 本版本需要 UltiTools-API 6.3.0 或更高版本，并将 `plugin.yml` 中的 `api-version` 从上一个发布版本 1.0.0
  的 `620` 提升到 `630`。更早的框架会在模块启动逻辑运行之前拒绝加载本模块。加载新的模块 JAR 需要重启服务器；
  `/ul reload` 不会加载它（UltiKits/UltiTools-Reborn#544）。

- `plugin.yml` 现在声明 `identify-string: ultisidebar`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。

- `config/sidebar.yml` 中的 `lines: []`（或 `lines: ~`），以及不是列表的 `lines` 值（`''`、一个词、一个映射），现在改用出厂的 12 行。
  该设置声明了 `@NotEmpty`，在 UltiTools 6.3.0 上框架把这类值视为不可用：侧边栏改用出厂行，框架记录一条 WARNING，写明 `lines`、
  你写下的值与该默认值。文件保持你写的原样。早期版本（UltiTools 6.2.x、UltiSideBar 1.0.0）会把 `[]` 重置为默认值并给出警告，
  `~` 则会把默认值写入文件。侧边栏按服务器语言显示出厂行（与其他内置文本相同），模块也不再在启动或 `/ul reload` 时额外记录
  一条“模块对 'lines' 的更改未写入”的 WARNING，服务器停止时也不再报告未保存的更改（UltiKits/UltiSideBar#36）。

- 超过 15 条的 `lines` 列表现在会在加载时拒绝本模块，并指出字段、条数与上限（`field 'lines' size 16 is out of bounds [1, 15]`），
  文件保持原样。早期版本（UltiTools 6.2.x）会把过长的列表重置为默认值并给出警告（UltiKits/UltiSideBar#31）。

- `config/sidebar.yml` 中的侧边栏标题与内容行设置在模块启动时按服务器语言写入，文件内容即侧边栏显示的内容
  （`language: en` 下为 `title: '&6&lMy Server'` 与英文内容行）。仍为内置文本（任一语言的内置文本，或旧版本的
  出厂默认值）的设置会跟随 `language`：模块启动或执行 `/ul reload` 后改写为当前语言的文本。你改过的标题和自定义行会保留，
  但有一个例外：即使 `lines` 列表已经编辑过，其中完整匹配旧默认行 `&e世界: &f%world_name%` 或
  `&f%server_time_hh:mm:ss%` 的条目仍会分别迁移为 `&e世界: &f%player_world%` 或
  `&f%server_time_HH:mm:ss%`，并保存结果。此次迁移不会改动其他行。
  若想保留内置文本又不让它跟随语言，请至少改动一个字符（UltiKits/UltiSideBar#24）。写入的是本模块的内置文本：请在 `config/sidebar.yml` 中修改这些设置；修改已解压的语言文件不会改变它们（旧版本同样从不从语言文件读取它们）。

- 缺少 PlaceholderAPI 以及 `sidebar.yml` 无法保存时的控制台警告现在跟随 `language` 设置。

#### 修复

- `config/sidebar.yml` 中各配置项上方的注释现在取自模块的语言文件：`language: en` 的服务器全新安装时写入英文注释
  （此前所有语言下都写入纯中文注释）。框架在这六项上写下的注释（包括旧版本写下的中文注释）会在下次启动时、以及你修改
  `language` 并执行不带参数的 `/ul reload` 后切换为服务器语言；配置值不变，你自己写的注释保持原样（UltiKits/UltiTools-Reborn#611）
  （UltiKits/UltiSideBar#32）。

- 其他插件改动侧边栏所用的计分板后，侧边栏现在会恢复：若其他插件注销了侧边栏的目标、清空或占用了其显示位置、
  或重置了分数，下一次刷新会重新注册目标、放回显示位置并重画所有内容行。内容变化时只重置本模块之前写入的行；
  此前会对计分板上的每个条目在所有目标上执行重置，同时清掉其他插件在同一计分板上的名字下方、玩家列表或侧边栏分数
  （UltiKits/UltiSideBar#30）。

- 侧边栏现在会对其它插件的私有计分板（例如 UltiEssentials 的计分板）让路：该计分板保持显示，玩家回到主计分板后
  本侧边栏才显示。主计分板上的侧边栏（包括用原版命令设置的侧边栏）仍会被顶替，与以往版本一致。
  `/sidebar on` 与 `/sidebar toggle` 在另一个计分板占用该位置时会如实说明（选择仍会保存），
  `/sidebar off` 也不再移除其它插件的侧边栏。UltiEssentials 的侧边栏同时开启时，启动后控制台会有一行提示
  （UltiKits/UltiSideBar#26）。

- 侧边栏开启时，名字前缀和主计分板上的其它队伍（UltiEssentials 的名字前缀、原版 `/team` 队伍、其它插件的队伍）
  现在都会显示：侧边栏自己的计分板会带上服务器主计分板的队伍，并在每次刷新时跟随其变化；此前开着侧边栏的
  玩家看不到任何人的队伍前缀。与某个队伍成员名字完全相同的侧边栏行保持原样，不会带上该队伍的前缀（UltiKits/UltiSideBar#27）。

- 只在第 40 个字符之后才不同的两行侧边栏内容现在都会显示；此前第二行会顶替第一行（UltiKits/UltiSideBar#17）。

- 在 `default-enabled: false` 时，重载（`/sidebar reload`、`/ul reload UltiSideBar`）现在会保留自己开启了侧边栏的在线
  玩家的侧边栏；此前重载会移除它且不再恢复。`default-enabled` 现在只作用于没有保存过选择的玩家（UltiKits/UltiSideBar#20）。

- 重载本模块（`/ul reload UltiSideBar` 或 `/sidebar reload`）现在还会刷新其语言目录——此前本模块自身的重载
  覆盖方法跳过了这一步；配置仍然只重载一次，只是改由框架而非模块执行。通过 `/upm uninstall UltiSideBar`
  卸载本模块时仍会先执行本模块自身的侧边栏关闭；之后本模块的命令现在会被真正移除，其监听器也不再触发，
  此前两者都会保持生效，直到服务器重启（UltiKits/UltiSideBar#16）。


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
