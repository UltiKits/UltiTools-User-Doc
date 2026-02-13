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

1. 确保服务器已安装 UltiTools-API 6.2.0 或更高版本
2. 将 `UltiMenu-1.0.0.jar` 放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器
4. 首次启动后会在 `plugins/UltiTools/UltiMenu/menus/` 目录生成 `example.yml` 示例菜单

> 注意：新安装模块需要完整重启服务器，`/ul reload` 只能重载配置文件。

## 快速开始

安装完成后，UltiMenu 会自动生成一个示例菜单。以下是创建你自己的菜单的完整步骤：

**1. 创建菜单文件**

在 `plugins/UltiTools/UltiMenu/menus/` 目录下创建一个新文件，比如 `shop.yml`：

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
| `/menu reload` | 重新加载所有菜单配置（需要 `ultikits.menu.admin` 权限） | 玩家/控制台 | `/menu reload` |

> 菜单名是 YAML 文件名（不含 `.yml` 后缀），不区分大小写。例如文件 `Shop.yml` 的菜单名是 `shop`。

## 配置文件

### 全局配置 - config/config.yml

位于 `plugins/UltiTools/UltiMenu/config/config.yml`：

```yaml
# 全局点击防抖时间（单位：毫秒，范围：50-5000）
# 防止玩家快速连点导致重复执行
click_cooldown_ms: 200
```

### 菜单文件 - menus/*.yml

所有菜单文件位于 `plugins/UltiTools/UltiMenu/menus/` 目录。每个 `.yml` 文件代表一个菜单。

以下是完整的菜单文件结构说明：

```yaml
# 菜单标题，支持 & 颜色代码和 PlaceholderAPI 变量
# {player} 会被替换为玩家名
title: "&6&lServer Menu &r&7- {player}"

# 菜单大小，必须是 9 的倍数：9 / 18 / 27 / 36 / 45 / 54
size: 27

# 菜单注册的命令名（可选，当前版本暂未使用）
command: servermenu

# 打开菜单所需权限（可选，null 或留空表示无限制）
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

创建文件 `plugins/UltiTools/UltiMenu/menus/shop.yml`：

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

先创建主菜单 `plugins/UltiTools/UltiMenu/menus/main.yml`：

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

然后创建子菜单 `plugins/UltiTools/UltiMenu/menus/teleport.yml`：

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

```yaml
title: "&6&lVIP 特权中心"
size: 45
permission: "server.vip"

buttons:
  fly:
    item: ELYTRA
    position: 20
    name: "&b&l飞行模式 (10分钟)"
    lore:
      - "&7开启飞行模式 10 分钟"
      - "&7费用：&e$2000"
    price: 2000
    console-commands:
      - "fly {player} 600"

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
| `ultikits.menu.use` | 使用 `/menu` 命令打开和列出菜单 | 玩家 |
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
1. 确认 UltiTools-API 版本为 6.2.0 或更高
2. 确认 JAR 文件放在了 `plugins/UltiTools/plugins/` 目录（不是 `plugins/` 根目录）
3. 重启服务器（不是 `/ul reload`，新安装模块需要完整重启）
4. 检查控制台日志是否有 UltiMenu 相关的报错信息
5. 确认 `plugins/UltiTools/UltiMenu/menus/` 目录下有 `.yml` 文件

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
