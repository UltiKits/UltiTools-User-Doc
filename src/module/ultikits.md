# UltiKits - 礼包系统

UltiKits 是 UltiTools 的礼包（Kit）管理模块，让你可以创建、管理和分发物品礼包给玩家。

## 功能概述

UltiKits 提供了一套完整的礼包系统。管理员可以在游戏内通过命令快速创建礼包，也可以用可视化编辑器修改礼包内容。玩家可以通过分页 GUI 界面浏览所有可用礼包，点击即可领取。每个礼包支持独立的价格设定（需要 Vault 经济插件）、等级要求、权限节点、冷却时间和一次性领取限制。领取礼包时还可以自动执行指定的玩家命令和控制台命令。礼包配置采用每个礼包一个 YAML 文件的形式，方便管理。

## 安装

### 方法一：通过 UPM 安装（推荐）

在游戏内或控制台执行：

```
/upm install UltiKits
```

### 方法二：手动安装

1. 下载 `UltiKits` 的 JAR 文件
2. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

## 快速开始

安装完成后，按照以下步骤创建你的第一个礼包：

1. **准备物品** - 在你的物品栏里放入想要包含在礼包里的物品
2. **创建礼包** - 执行 `/kits create starter`，插件会将你物品栏中的所有物品保存为一个名为 `starter` 的礼包
3. **查看礼包** - 执行 `/kits` 打开 GUI 浏览器，你应该能看到刚创建的礼包
4. **领取礼包** - 在 GUI 中点击礼包图标，或执行 `/kits claim starter`
5. **编辑礼包** - 执行 `/kits edit starter` 打开可视化编辑器，可以直接拖放物品来修改礼包内容

插件首次启动时会自动生成一个名为 `starter` 的示例礼包配置文件，你可以参考它来手动编写更多礼包。

## 命令

| 命令 | 说明 | 执行者 | 示例 |
|------|------|--------|------|
| `/kits` | 打开礼包浏览 GUI | 仅玩家 | `/kits` |
| `/kits claim <名称>` | 领取指定礼包 | 仅玩家 | `/kits claim starter` |
| `/kits list` | 列出所有礼包 | 玩家/控制台 | `/kits list` |
| `/kits create <名称>` | 将当前物品栏保存为新礼包 | 仅玩家 | `/kits create vip` |
| `/kits edit <名称>` | 打开礼包内容编辑器 | 仅玩家 | `/kits edit starter` |
| `/kits delete <名称>` | 删除指定礼包 | 玩家/控制台 | `/kits delete oldkit` |
| `/kits reload` | 重新加载所有礼包配置 | 玩家/控制台 | `/kits reload` |

命令别名：`/kit` 和 `/kits` 均可使用。

## 权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultikits.kits.use` | 使用基础功能：浏览 GUI、领取礼包、查看列表 | 所有玩家 |
| `ultikits.kits.admin` | 管理员功能：创建、编辑、删除、重载礼包 | OP |

此外，每个礼包可以配置独立的权限节点（见礼包配置中的 `permission` 字段）。

## 配置

### 主配置文件

文件路径：`plugins/UltiTools/UltiKits/config/config.yml`

```yaml
# 启用礼包系统
enabled: true

# GUI 点击防抖毫秒数（防止连续点击重复领取）
# 范围：50-5000
click_cooldown_ms: 200

# 浏览界面每页显示的礼包数量
# 范围：7-28
kits_per_page: 28
```

### 礼包配置文件

每个礼包对应一个独立的 YAML 文件，存放在 `plugins/UltiTools/UltiKits/kits/` 目录下。文件名即为礼包名（全小写）。

以下是自带的示例文件 `kits/starter.yml` 的完整内容：

```yaml
# 礼包显示名称（支持颜色代码）
displayName: "&a新手礼包"

# 描述行（显示在 GUI 图标的 lore 中）
description:
  - "&7新手专属礼包"
  - "&7包含基础装备和工具"

# GUI 中显示的图标材质名（Bukkit Material 枚举名）
icon: GRASS_BLOCK

# 领取费用（0 = 免费，需要安装 Vault 经济插件）
price: 0

# 最低玩家等级要求（0 = 无要求）
levelRequired: 0

# 需要的权限节点（空字符串 = 无要求）
permission: ""

# 是否可重复领取（false = 一次性礼包）
reBuyable: false

# 重复领取的冷却时间（单位：秒，仅 reBuyable 为 true 时生效）
cooldown: 0

# 领取时以玩家身份执行的命令（支持 {player} 占位符）
playerCommands: []

# 领取时以控制台身份执行的命令（支持 {player} 占位符）
consoleCommands: []

# 物品数据（Base64 序列化，由 /kits create 或 /kits edit 自动生成，请勿手动修改）
items: ""
```

## 使用教程

### 创建一个付费 VIP 礼包

假设你想创建一个价格为 500 游戏币的 VIP 礼包，需要 VIP 权限才能领取：

1. 在物品栏里放入钻石剑、钻石甲等 VIP 专属物品
2. 执行 `/kits create vip`
3. 编辑配置文件 `plugins/UltiTools/UltiKits/kits/vip.yml`：

```yaml
displayName: "&b&lVIP 专属礼包"
description:
  - "&7VIP 玩家专属物品"
  - "&e包含全套钻石装备"
icon: DIAMOND_SWORD
price: 500
levelRequired: 0
permission: "ultikits.kit.vip"
reBuyable: false
cooldown: 0
playerCommands: []
consoleCommands:
  - "broadcast &a{player} 领取了 VIP 礼包！"
items: "..."  # 由 /kits create 自动生成
```

4. 执行 `/kits reload` 使配置生效
5. 给 VIP 玩家添加权限 `ultikits.kit.vip`

### 创建一个每日礼包

每天可以免费领一次：

```yaml
displayName: "&e&l每日签到礼包"
description:
  - "&7每天领取一次"
  - "&a免费"
icon: CAKE
price: 0
levelRequired: 0
permission: ""
reBuyable: true
cooldown: 86400  # 24小时 = 86400秒
playerCommands: []
consoleCommands: []
items: "..."
```

### 创建一个带命令奖励的礼包

领取后同时执行命令（比如给玩家经验）：

```yaml
displayName: "&d&l奖励礼包"
description:
  - "&7领取后获得额外奖励"
icon: EXPERIENCE_BOTTLE
price: 100
levelRequired: 10
permission: ""
reBuyable: true
cooldown: 3600  # 1小时
playerCommands:
  - "me 领取了奖励礼包"
consoleCommands:
  - "xp give {player} 100"
  - "broadcast &e{player} 领取了奖励礼包"
items: "..."
```

### 用 GUI 编辑器修改礼包内容

1. 执行 `/kits edit starter`，会打开一个 6 行的箱子界面
2. 前 5 行（45 个格子）是物品区，你可以自由拖放物品
3. 最后一行是控制栏：
   - **绿宝石** - 保存
   - **书本** - 显示礼包信息
   - **屏障** - 取消退出
4. 摆放好物品后点击绿宝石保存

## 常见问题

### 安装后不生效怎么办？

确认以下几点：
- JAR 文件放在 `plugins/UltiTools/plugins/` 目录下（不是 `plugins/` 根目录）
- 服务器已完全重启（不是 `/reload`）
- 控制台没有报错信息
- UltiTools-API 版本 >= 6.2.0

### 改了配置文件没效果？

修改礼包 YAML 文件后，执行 `/kits reload` 重新加载。修改主配置 `config.yml` 后，需要执行 `/ul reload` 或重启服务器。

### 权限怎么设置？

1. 基础使用权限 `ultikits.kits.use` 默认所有玩家都有
2. 管理权限 `ultikits.kits.admin` 默认只有 OP
3. 单个礼包的权限在礼包配置文件的 `permission` 字段设置，留空表示所有人可领取
4. 使用权限插件（如 LuckPerms）给玩家或权限组添加对应权限

### 经济系统不生效怎么办？

UltiKits 的价格功能需要安装 Vault 插件和一个经济插件（如 EssentialsX、CMI 等）。确保：
- 服务器安装了 Vault
- 安装了至少一个支持 Vault 的经济插件
- 礼包的 `price` 字段设置了大于 0 的值

### 物品栏为空怎么创建礼包？

`/kits create` 命令会自动读取你当前物品栏中的非空物品。如果你的物品栏完全为空，命令会提示"物品栏为空"。请先在物品栏里放入需要的物品后再执行命令。你也可以先创建一个礼包，然后用 `/kits edit <名称>` 打开编辑器，在编辑器中直接放入物品。

### 冷却时间怎么设置？

1. 首先将 `reBuyable` 设为 `true`（允许重复领取）
2. 然后设置 `cooldown` 为冷却秒数，例如：
   - `cooldown: 3600` 表示 1 小时
   - `cooldown: 86400` 表示 1 天
   - `cooldown: 604800` 表示 1 周
3. 如果 `reBuyable` 为 `false`，则礼包只能领取一次，冷却时间无效

## 更新日志

### v1.0.0 (2026-02-13)

新增：礼包系统核心功能
- 新增：分页 GUI 浏览器，支持翻页显示所有可用礼包
- 新增：GUI 编辑器，管理员可拖放物品编辑礼包内容
- 新增：`/kits create` 命令从当前物品栏快速创建礼包
- 新增：`/kits claim` 命令和 GUI 点击领取礼包
- 新增：`/kits list` 命令列出所有礼包
- 新增：`/kits edit` 命令打开可视化编辑器
- 新增：`/kits delete` 命令删除礼包
- 新增：`/kits reload` 命令重新加载配置
- 新增：Vault 经济系统集成（礼包定价）
- 新增：每礼包独立冷却时间
- 新增：一次性礼包（不可重复领取）
- 新增：等级要求限制
- 新增：每礼包独立权限节点
- 新增：领取时执行玩家命令和控制台命令（支持 `{player}` 占位符）
- 新增：YAML 配置，每礼包一个文件
- 新增：Base64 物品序列化存储
- 新增：中英文双语支持
