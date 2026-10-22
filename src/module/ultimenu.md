# UltiMenu - 自定义 GUI 菜单

UltiMenu 是 UltiTools 框架的自定义 GUI 菜单模块，允许服务器管理员通过简单的 YAML 配置文件创建任意数量的图形界面菜单。每个菜单支持按钮命令执行、经济扣费、子菜单跳转、物品绑定打开和 PlaceholderAPI 变量，无需编写任何 Java 代码即可实现丰富的菜单交互。

## 功能概览

UltiMenu 采用"一个菜单一个文件"的设计，所有菜单定义文件存放在 `menus/` 目录下。每个菜单可以配置 1-6 行（9-54 格）的大小、自定义标题、权限控制和物品绑定。按钮功能丰富：可以设置物品图标（Material）、显示名称、描述文本（lore）、玩家命令和控制台命令、Vault 经济扣费、子菜单跳转、独立权限和自定义模型数据（CustomModelData，用于资源包）。所有文本内容均支持 `&` 颜色代码和 PlaceholderAPI 变量。物品绑定功能让玩家可以通过右键点击特定物品直接打开菜单。

## 安装

### 方式一：通过 UPM 安装（推荐）

在服务器控制台或游戏内执行：

```
/upm install UltiMenu
```

### 方式二：手动安装

1. 确保服务器已安装 UltiTools-API 6.3.0 或更高版本
2. 将 `UltiMenu-2.0.0.jar` 放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器
4. 首次启动后会在 `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/` 目录生成 `example.yml` 示例菜单

> 注意：新安装模块需要完整重启服务器，`/ul reload` 只能重载配置文件。

## 升级到 2.0.0

先备份菜单和配置，安装 UltiTools-API 6.3.0 或更高版本，替换 `UltiMenu-2.0.0.jar` 后完整重启。目录身份是 `ultimenu`，框架更新检查与 `/upm update` 据此识别；重载和卸载用模块名 `UltiTools-Menu`。已有配置与菜单不会自动变成新默认值。

检查 `menus/*.yml`，删除旧的顶层 `command: servermenu`：它从未注册 `/servermenu`，现在每次启动或 `/menu reload` 都会按文件警告。继续用 `/menu shop`、`/menu open shop`、绑定物品或 `open-menu` 按钮打开菜单。首次启动只在 menus 目录不存在时复制中文或英文示例，其他语言用英文，已有目录不覆盖。

每条打开路径都要求 `ultikits.menu.use`，再检查目标菜单自己的 `permission`；不设置 permission 不等于免基础权限。该节点未在 plugin.yml 声明，默认仅 OP；请明确给普通玩家组授权：

```
/lp group default permission set ultikits.menu.use true
```

此前用免权限绑定物品的玩家尤其需要这一步，否则右键被拦截、物品原本用途也不执行，并提示缺少 ultikits.menu.use。提示普通「你没有权限打开此菜单！」时，再检查目标菜单的自定义权限。`/menu reload` 同时需要 use 与 admin 两个节点。

### 按钮执行、重载与语言

按钮依次检查防抖、按钮权限、目标子菜单是否存在及能否进入，之后才扣款并安排命令。子菜单缺失或权限不足时不扣费、不运行命令，当前菜单保持打开。玩家命令、控制台命令和子菜单导航都在下一个服务器 tick 执行，玩家命令保持列表顺序，`{player}` 与 PlaceholderAPI 在点击时替换；按钮自身关闭先发生，不会再关掉奖励命令刚打开的其他界面。不要把这理解为失败命令会自动退款的交易保证。

`/menu reload` 重新读取菜单定义，回复「已重新加载 N 个菜单」；修改全局 `click_cooldown_ms` 后执行 `/ul reload UltiTools-Menu`，重新打开菜单使用新值。两者不是同一重载：框架重载不重新读取 menus 文件；菜单重载也不刷新全局配置与语言。防抖由一个已打开窗口的所有按钮共用。

自定义消息请复制 `plugins/UltiTools/pluginConfig/UltiTools-Menu/lang/zh.json` 为同目录的 `zh-myserver.json`，迁移为 `menu.list.header` 等 ASCII 键，在 `plugins/UltiTools/config.yml` 设置 `language: zh-myserver` 后执行不带参数的 `/ul reload`。官方文件每次启动与模块重载都会恢复，改过的保留为 `.bak`；自定义副本缺键回退前缀官方语言，不带官方前缀则缺键回退英文并警告。菜单中的自写标题和 lore 不随语言切换自动翻译。卸载 `/upm uninstall UltiTools-Menu` 会注销 `/menu` 与绑定物品监听。

## 快速开始

安装完成后，UltiMenu 会自动生成一个示例菜单。以下是创建你自己的菜单的完整步骤：

**1. 创建菜单文件**

在 `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/` 目录下创建一个新文件，比如 `shop.yml`：

```yaml
# 菜单标题，支持颜色代码和 PlaceholderAPI
title: "&6&l商店菜单"
# 菜单大小，必须是 9 的倍数（9/18/27/36/45/54）
size: 27

buttons:
  diamond:
    item: DIAMOND
    position: 13
    name: "&b&l购买钻石"
    lore:
      - "&7点击购买一颗钻石"
      - "&7价格：&e$500"
    price: 500
    console-commands:
      - "give {player} diamond 1"
```

**2. 加载菜单**

执行命令重载菜单：

```
/menu reload
```

**3. 打开菜单**

在游戏内执行：

```
/menu shop
```

现在你可以看到一个包含钻石购买按钮的菜单了。点击钻石按钮会扣除 500 金币并给予玩家一颗钻石。

## 命令

基础命令：`/menu`。需要权限 `ultikits.menu.use`。玩家和控制台均可执行列表和重载命令，打开菜单仅限玩家。

| 命令 | 说明 | 执行者 | 示例 |
|------|------|--------|------|
| `/menu <菜单名>` | 快捷打开指定菜单 | 仅玩家 | `/menu shop` |
| `/menu open <菜单名>` | 显式打开指定菜单 | 仅玩家 | `/menu open shop` |
| `/menu list` | 列出所有已加载的菜单 | 玩家/控制台 | `/menu list` |
| `/menu reload` | 重新加载所有菜单配置（需要 use 与 `ultikits.menu.admin` 权限） | 玩家/控制台 | `/menu reload` |

> 菜单名是 YAML 文件名（不含 `.yml` 后缀），不区分大小写。例如文件 `Shop.yml` 的菜单名是 `shop`。

## 配置文件

### 全局配置 - config/config.yml

位于 `plugins/UltiTools/pluginConfig/UltiTools-Menu/config/config.yml`：

```yaml
# 全局点击防抖时间（单位：毫秒，范围：50-5000）
# 防止玩家快速连点导致重复执行
click_cooldown_ms: 200
```

### 菜单文件 - menus/*.yml

所有菜单文件位于 `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/` 目录。每个 `.yml` 文件代表一个菜单。

以下是完整的菜单文件结构说明：

```yaml
# 菜单标题，支持 & 颜色代码和 PlaceholderAPI 变量
# {player} 会被替换为玩家名
title: "&6&lServer Menu &r&7- {player}"

# 菜单大小，必须是 9 的倍数：9 / 18 / 27 / 36 / 45 / 54
size: 27

# 打开菜单所需权限（可选，null 或留空只是不增加菜单权限，仍需 ultikits.menu.use）
permission: null

# 物品绑定（可选）— 玩家右键点击匹配的物品时自动打开此菜单
bind-item: COMPASS  # 绑定物品类型（Material 名称）
bind-name: "&6Server Menu"  # 绑定物品的显示名称（可选，用于精确匹配）
bind-lore: "&eRight-click to open"  # 绑定物品的 lore 关键词（可选，包含匹配）

# 按钮定义
buttons:
  info:  # 按钮唯一标识
    item: BOOK  # 物品类型（Material 名称，必填）
    position: 10  # 在菜单中的位置，0-53，从左上角开始，从左到右从上到下
    name: "&b&lServer Info"  # 按钮显示名称，支持颜色代码和 PlaceholderAPI
    lore:  # 按钮描述文本（列表），支持颜色代码和 PlaceholderAPI
      - "&7Welcome to the server!"
      - "&7Online: &a%server_online%"
    player-commands: []  # 以玩家身份执行的命令列表
    console-commands: []  # 以控制台身份执行的命令列表
    price: 0  # 点击扣费金额（需要 Vault，0 = 免费）
    close-on-click: false  # 点击后是否关闭菜单（默认 true）

  spawn:
    item: ENDER_PEARL
    position: 12
    name: "&d&lSpawn"
    lore:
      - "&7Teleport to spawn"
      - "&7Cost: &aFree"
    player-commands:  # 玩家命令，{player} 会被替换为玩家名
      - "spawn"
    console-commands: []
    price: 0

  kit-starter:
    item: IRON_SWORD
    position: 14
    name: "&e&lStarter Kit"
    lore:
      - "&7Get starter items"
      - "&7Cost: &c$100"
    player-commands: []
    console-commands:  # 控制台命令，{player} 会被替换为玩家名
      - "give {player} iron_sword 1"
      - "give {player} iron_pickaxe 1"
      - "give {player} bread 16"
    price: 100  # 需要扣除 100 金币

  rules:
    item: WRITABLE_BOOK
    position: 16
    name: "&c&lServer Rules"
    lore:
      - "&7Click to view rules"
    open-menu: rules  # 点击后打开另一个菜单（菜单名对应 menus/rules.yml）
    price: 0
    close-on-click: false

  vip-item:
    item: GOLD_INGOT
    position: 22
    name: "&6&lVIP Item"
    lore:
      - "&7Only VIP players can use"
    permission: "server.vip"  # 按钮独立权限，没有权限的玩家点击会提示无权限
    console-commands:
      - "give {player} diamond 5"
    custom-model-data: 1001  # 自定义模型数据（资源包使用，默认 0 = 不设置）
```

### 按钮属性参考

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `item` | Material 名称 | 是 | - | 按钮图标物品类型 |
| `position` | 整数 (0-53) | 否 | 0 | 按钮在菜单中的位置 |
| `name` | 字符串 | 否 | 空 | 按钮显示名称 |
| `lore` | 字符串列表 | 否 | 空 | 按钮描述文本 |
| `player-commands` | 字符串列表 | 否 | 空 | 以玩家身份执行的命令 |
| `console-commands` | 字符串列表 | 否 | 空 | 以控制台身份执行的命令 |
| `price` | 小数 | 否 | 0 | 点击扣费金额 |
| `open-menu` | 字符串 | 否 | null | 点击后打开的子菜单名 |
| `close-on-click` | 布尔值 | 否 | true | 点击后是否关闭菜单 |
| `permission` | 字符串 | 否 | null | 使用按钮所需权限 |
| `custom-model-data` | 整数 | 否 | 0 | 自定义模型数据 |

> 命令中的 `{player}` 会被替换为点击按钮的玩家名。PlaceholderAPI 变量（如 `%player_name%`）也可在命令中使用。

## 使用教程

### 场景一：创建商店菜单

创建文件 `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/shop.yml`：

```yaml
title: "&6&l商 店"
size: 27

buttons:
  bread:
    item: BREAD
    position: 10
    name: "&e面包 x16"
    lore:
      - "&7购买 16 个面包"
      - "&7价格：&e$50"
    price: 50
    console-commands:
      - "give {player} bread 16"

  iron-set:
    item: IRON_CHESTPLATE
    position: 12
    name: "&f铁甲套装"
    lore:
      - "&7购买完整铁甲套装"
      - "&7价格：&e$500"
    price: 500
    console-commands:
      - "give {player} iron_helmet 1"
      - "give {player} iron_chestplate 1"
      - "give {player} iron_leggings 1"
      - "give {player} iron_boots 1"

  diamond-sword:
    item: DIAMOND_SWORD
    position: 14
    name: "&b&l钻石剑"
    lore:
      - "&7购买一把钻石剑"
      - "&7价格：&e$1000"
      - ""
      - "&c需要 VIP 权限"
    price: 1000
    permission: "server.vip"
    console-commands:
      - "give {player} diamond_sword 1"
```

### 场景二：创建多级子菜单

先创建主菜单 `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/main.yml`：

```yaml
title: "&6&l服务器主菜单"
size: 27

buttons:
  shop:
    item: EMERALD
    position: 11
    name: "&a&l商店"
    lore:
      - "&7打开商店菜单"
    open-menu: shop
    close-on-click: false

  teleport:
    item: ENDER_PEARL
    position: 13
    name: "&d&l传送"
    lore:
      - "&7打开传送菜单"
    open-menu: teleport
    close-on-click: false

  info:
    item: BOOK
    position: 15
    name: "&b&l服务器信息"
    lore:
      - "&7服务器地址：play.example.com"
      - "&7当前在线：&a%server_online%"
    close-on-click: false
```

然后创建子菜单 `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/teleport.yml`：

```yaml
title: "&d&l传送菜单"
size: 27

buttons:
  spawn:
    item: RED_BED
    position: 11
    name: "&c&l出生点"
    lore:
      - "&7传送到出生点"
    player-commands:
      - "spawn"

  home:
    item: OAK_DOOR
    position: 13
    name: "&6&l我的家"
    lore:
      - "&7传送到家"
    player-commands:
      - "home"

  back:
    item: ARROW
    position: 22
    name: "&7返回主菜单"
    open-menu: main
    close-on-click: false
```

现在执行 `/menu main` 就可以看到主菜单，点击"传送"按钮会打开传送子菜单。

### 场景三：物品绑定菜单

如果你想让玩家拿着特定物品右键就能打开菜单，添加绑定配置：

```yaml
title: "&6&l导航菜单"
size: 27
bind-item: COMPASS  # 绑定到指南针
bind-name: "&6导航仪"  # 可选：还要求物品名称匹配

buttons:
  # ... 你的按钮配置
```

给玩家一个名为"导航仪"（使用 `&6` 颜色代码）的指南针，右键点击即可打开此菜单。

> 绑定匹配逻辑：先匹配物品类型（`bind-item`），如果设置了 `bind-name` 则还要求显示名称匹配（颜色代码无关），如果设置了 `bind-lore` 则要求 lore 中包含指定文本。

### 场景四：带费用的 VIP 功能菜单

命令由对应插件解释。此例用原版药水命令提供十分钟缓降，不假定存在定时飞行插件；`heal` 需先安装提供该命令的插件。

```yaml
title: "&6&lVIP 特权中心"
size: 45
permission: "server.vip"

buttons:
  fly:
    item: ELYTRA
    position: 20
    name: "&b&l缓降 (10分钟)"
    lore:
      - "&7获得缓降效果 10 分钟"
      - "&7费用：&e$2000"
    price: 2000
    console-commands:
      - "effect give {player} slow_falling 600 0"

  heal:
    item: GOLDEN_APPLE
    position: 22
    name: "&c&l满血恢复"
    lore:
      - "&7完全恢复生命值"
      - "&7费用：&e$100"
    price: 100
    console-commands:
      - "heal {player}"

  night-vision:
    item: ENDER_EYE
    position: 24
    name: "&9&l夜视 (5分钟)"
    lore:
      - "&7获得 5 分钟夜视效果"
      - "&7费用：&e$500"
    price: 500
    console-commands:
      - "effect give {player} night_vision 300 1"
```

## 权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultikits.menu.use` | 所有路径打开菜单和 `/menu` 命令 | OP（普通玩家需授权） |
| `ultikits.menu.admin` | 使用 `/menu reload` 重载菜单配置 | OP |

此外，每个菜单和按钮都可以通过 `permission` 字段设置额外的自定义权限。

## 软依赖

| 插件 | 用途 |
|------|------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | 在菜单标题、按钮名称、lore 和命令中使用 `%xxx%` 变量 |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | 按钮点击扣费功能（`price` 字段） |

不安装 PlaceholderAPI 时，`%xxx%` 变量会原样显示，但 `{player}` 占位符始终可用。不安装 Vault 时，设置了 `price` 的按钮点击会提示"经济系统不可用"。

## 常见问题

### 安装后不生效怎么办？

请按以下步骤排查：
1. 确认 UltiTools-API 版本为 6.3.0 或更高
2. 确认 JAR 文件放在了 `plugins/UltiTools/plugins/` 目录（不是 `plugins/` 根目录）
3. 重启服务器（不是 `/ul reload`，新安装模块需要完整重启）
4. 检查控制台日志是否有 UltiMenu 相关的报错信息
5. 确认 `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/` 目录下有 `.yml` 文件

### 改了配置文件没效果？

执行 `/menu reload` 重新加载所有菜单文件。如果还是没效果，检查 YAML 格式是否正确——缩进必须使用空格而不是 Tab，冒号后面要有空格。控制台会显示加载失败的菜单及错误原因。

### 权限怎么设置？

UltiMenu 的权限通过你使用的权限插件来管理。例如在 LuckPerms 中：

```
/lp group default permission set ultikits.menu.use true
/lp group admin permission set ultikits.menu.admin true
/lp group vip permission set server.vip true
```

### 菜单大小报错怎么办？

菜单大小（`size`）必须是 9 的倍数，且范围为 9-54：
- `9` = 1 行
- `18` = 2 行
- `27` = 3 行（默认）
- `36` = 4 行
- `45` = 5 行
- `54` = 6 行

其他数值会导致菜单加载失败，控制台会提示 `Invalid menu size`。

### 按钮物品名称（Material）写什么？

物品名称使用 Minecraft 的 Material 枚举名，全部大写，用下划线分隔。例如：
- `DIAMOND_SWORD`（钻石剑）
- `IRON_CHESTPLATE`（铁胸甲）
- `ENDER_PEARL`（末影珍珠）
- `OAK_PLANKS`（橡木板）
- `GOLDEN_APPLE`（金苹果）

完整列表参考 [Spigot Material 文档](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html)。写错名称时控制台会提示 `invalid material`。

### 经济扣费不生效？

确保以下条件满足：
1. 安装了 Vault 插件
2. 安装了支持 Vault 的经济插件（如 EssentialsX、UltiEconomy 等）
3. 按钮的 `price` 值大于 0

### 子菜单打不开？

检查 `open-menu` 的值是否与目标菜单文件名匹配。例如 `open-menu: rules` 需要存在 `menus/rules.yml` 文件。菜单名不区分大小写。

## 更新日志

### v2.0.0

原 Unreleased 的 README 服务端/Java 徽章说法在定版时撤回；本次只要求 UltiTools-API 6.3.0 或更高版本。命令延后一 tick 不表示所有按钮都会关闭窗口；只有配置要求关闭时，关闭先于命令执行。

#### 变更

- 本版本需要 UltiTools 6.3.0 或更高版本，并在 `plugin.yml` 中声明 `api-version: 630`（已发布的 1.0.0 声明的是 `620`）。更早的框架会在模块的启动逻辑
  运行之前拒绝加载它，并给出 UltiTools 版本过旧的警告；拒绝信息以 `plugin.yml` 的 `name:` 即 `UltiTools-Menu` 指代本模块。
  README 标明框架最低版本为 UltiTools 6.3.0 或更高版本（UltiKits/UltiTools-Reborn#544）。

- `plugin.yml` 现在声明 `identify-string: ultimenu`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。

- 菜单按钮的 `player-commands` 现在在点击之后的下一个服务器 tick 执行；若按钮会关闭菜单，关闭也先于命令执行，与 `console-commands`、`open-menu`
  一致。UltiTools 6.3.0 在命令被分派的那一刻就运行模块命令的正文，在点击中执行会让命令在点击事件内打开菜单，随后按钮自己的关闭
  又会把它关掉，所以打开其他模块菜单的按钮（例如 `player-commands: ["kits"]`）原本会打开失败或被立刻关掉。命令的顺序与 `{player}`/PlaceholderAPI 替换不变，
  唯一区别是命令的效果比点击晚一个 tick（UltiKits/UltiMenu#28）。

- 因缺少 `ultikits.menu.use` 而被拒绝打开菜单的玩家，现在会看到点名该权限的提示：「你没有权限打开此菜单：需要
  ultikits.menu.use。」菜单自身的 `permission` 键仍给出「你没有权限打开此菜单！」。此前两种拒绝都用后者，玩家和运维都无法
  判断应授予哪个权限（UltiKits/UltiMenu#21）。

- 首次启动时复制到新建 `menus/` 目录的示例菜单现在跟随服务器的 `language`：jar 内附带 `menus/en/example.yml` 与
  `menus/zh/example.yml`，没有对应语言的示例时使用英文版。此前无论 `language` 为何都是英文。已有的 `menus/` 目录不会被改动，
  现有安装保留原有菜单（UltiKits/UltiMenu#26）。

- 语言键已从中文句子改为 ASCII 键（例如 `menu.list.header`）。如果你在自己的语言文件中自定义过本模块的消息——即把官方文件复制一份，文件名以该文件的语言代码加连字符开头
  （例如 `lang/zh-myserver.json`），并在 `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver` 选择它——请把改动重新套到新键上；
  在此之前，改名的消息显示文件名开头那种官方语言的文本。文件名不以官方语言代码加连字符开头的副本仍会被读取，但其中缺少的消息
  都显示英文，并记录一条警告。
  直接在官方语言文件（`lang/en.json`、`lang/zh.json`）中做的修改不会保留：框架会在每次启动以及每次模块重载时恢复官方文件，并把修改过的文件
  保留为 `.bak`（UltiKits/UltiTools-Reborn#616）。从未自定义过消息的服务器无需任何操作。

#### 移除

- 每个菜单的 `command` 键从未生效，现已移除；可从现有菜单文件中删除。菜单定义文件可以设置顶层 `command` 键，
  随附的 `menus/example.yml` 也设置了 `command: servermenu`，但本模块从未根据它注册任何命令，因此 `/servermenu`
  从未存在。打开菜单的方式与以前完全相同：`/menu <名称>`、`/menu open <名称>`、匹配的绑定物品，或另一个菜单按钮的
  `open-menu`。随附示例不再设置该键。移除该设置并不代表否决这项功能：为菜单单独绑定斜杠命令的需求已记录为
  UltiKits/UltiMenu#23（UltiKits/UltiMenu#12）。

- 仍设置 `command` 的菜单文件现在每次加载时（每次启动以及每次 `/menu reload`）都会输出一条警告，点名模块、文件与
  该键。从代码中移除一个键并不会把它从任何人的文件中移除，若没有这条警告，设置过该键的服主将看不到任何移除的痕迹。
  在更早版本上首次启动的服务器，其 `menus/example.yml` 中仍保留旧示例的 `command: servermenu` 一行，在删除该行
  之前会一直看到针对该文件的这条警告（UltiKits/UltiMenu#12）。

#### 修复

- `language: en` 现在对 `/menu` 命令描述、以及控制台执行 `/menu <name>` 时收到的拒绝提示生效（二者都没有英文条目，
  因此任何语言下都显示中文句子，UltiKits/UltiMenu#11）；也对 `/menu help` 的五行帮助与菜单服务的显示名称（原先写死为中文）生效。
  `language: zh` 现在也对未写 `title` 的菜单文件所得的默认标题（`Menu`）以及加载菜单文件时写出的控制台日志生效（原先写死为英文）：
  菜单大小无效、按钮未指定物品或物品材质无效、复制示例菜单失败，以及残留 `command` 键的警告。
  英文措辞不变；`language: zh` 下为中文，只有文件名、路径与出错的取值按原样打印。

- 使用 `/upm uninstall UltiTools-Menu` 卸载本模块后，其命令（`/menu`）现在会被真正移除，其绑定物品监听器
  也不再触发；本模块自身没有卸载工作。此前本模块的空卸载方法替换了框架的卸载方法，因此两者都会一直生效到
  服务器重启（UltiKits/UltiMenu#16）。

- 同时设置了 `price` 与 `open-menu` 的按钮，在导航被拒绝时不再扣费。子菜单现在会在扣费以及执行该按钮的玩家
  命令和控制台命令之前完成解析与权限校验，因此指向不存在或玩家无权进入的菜单的按钮既不扣费也不执行任何命令。
  此前扣费、“已扣除”提示和命令都会先发生，拒绝提示随后出现，且不退款，每次点击都会重复
  （UltiKits/UltiMenu#20）。

#### 安全

- 现在每条打开菜单的路径都要求 `ultikits.menu.use`，并且每条路径都会检查菜单自身的 `permission` 键。此前
  有两条路径未作检查：绑定物品会为任何持有匹配物品的玩家打开未设置 `permission` 键的菜单，即使该玩家被明确
  拒绝了 `ultikits.menu.use`（UltiKits/UltiMenu#14）；按钮的 `open-menu` 键打开其所指菜单时不做任何检查，
  因此菜单自身的 `permission` 键无法限制谁能从父菜单进入（UltiKits/UltiMenu#15）。**此前依赖免权限绑定
  物品的服主，现在必须为使用这些物品的玩家授予 `ultikits.menu.use`。** 在授予之前，匹配的绑定物品右键会被
  拦截（不会产生其原本的使用效果），持有者每次右键都会收到无权限提示——这通常就是此问题被反馈时的表现。该
  权限节点未在 `plugin.yml` 中声明，因此默认只有管理员拥有。


### v1.0.0 (2026-02-13)

新增：多文件 YAML 菜单系统，每个菜单一个配置文件
新增：可配置菜单大小（9/18/27/36/45/54 格）
新增：按钮支持物品图标、显示名称、描述文本（lore）
新增：按钮支持玩家命令和控制台命令执行
新增：Vault 经济集成，支持按钮点击扣费
新增：子菜单跳转功能（open-menu）
新增：物品绑定打开菜单，支持物品类型、名称和 lore 匹配
新增：PlaceholderAPI 变量支持（标题、按钮名称、lore、命令）
新增：按钮和菜单独立权限控制
新增：自定义模型数据（custom-model-data）支持
新增：可配置全局点击防抖
新增：首次启动自动生成示例菜单
