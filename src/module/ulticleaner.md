# UltiCleaner - 高性能服务器清理模块

自动清理地面物品、怪物实体和闲置区块，支持智能清理、TPS（服务器性能指标）自适应阈值和分批处理，最大程度减少清理过程中的卡顿。

## 功能概述

UltiCleaner 为 Minecraft 服务器提供全面的自动清理能力。它能定时清理地面掉落物和指定类型的怪物实体，并在清理前向全服玩家发送倒计时警告。清理过程采用分批处理机制，每个 tick 只移除固定数量的实体，避免一次性删除大量实体造成的卡顿。此外，它支持智能清理模式——当服务器中的物品或怪物数量超过设定阈值时自动触发额外清理。TPS 自适应功能会根据服务器当前性能动态调低触发阈值，让服务器在卡顿时更积极地清理。区块卸载功能则可以释放远离玩家的已加载区块占用的内存。所有清理操作都提供自定义 Bukkit 事件（Event），其他插件可以监听并取消特定清理。

## 安装

有两种安装方式：

**方式一：通过 UPM 在线安装**

```
/upm install UltiCleaner
```

**方式二：手动安装**

1. 下载 `UltiCleaner.jar`
2. 将 JAR 文件放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

安装完成后，配置文件会自动生成在 `plugins/UltiTools/UltiCleaner/config/cleaner.yml`。

## 快速开始

安装后，UltiCleaner 默认启用物品清理（每 5 分钟）和实体清理（每 10 分钟）。你可以立即使用以下命令手动清理：

```
/clean items     # 立即清理地面物品
/clean check     # 查看服务器当前实体数量
/clean status    # 查看下次清理倒计时
```

如果你想启用智能清理（当实体数量过多时自动清理），编辑配置文件：

```yaml
smart:
  enabled: true          # 改为 true
  item-threshold: 2000   # 物品数量超过 2000 触发
  mob-threshold: 1000    # 怪物数量超过 1000 触发
  cooldown: 60           # 两次智能清理之间至少间隔 60 秒
```

保存后执行 `/ul reload` 使配置生效。

## 命令

所有命令的别名为 `/clean`、`/cleaner`、`/clear`，权限节点统一为 `ulticleaner.clean`。玩家和控制台均可执行。

| 命令 | 说明 | 示例 |
|------|------|------|
| `/clean items` | 立即清理所有世界的地面物品 | `/clean items` |
| `/clean entities` | 立即清理所有世界中配置的实体类型 | `/clean entities` |
| `/clean all` | 同时清理物品和实体 | `/clean all` |
| `/clean chunks` | 卸载远离玩家的闲置区块（需在配置中启用） | `/clean chunks` |
| `/clean check` | 显示服务器实体统计：地面物品数、可清理生物数、总实体数、已加载区块数、可卸载区块数、当前 TPS | `/clean check` |
| `/clean status` | 显示清理状态：下次物品/实体清理倒计时、当前是否正在清理、TPS 状态 | `/clean status` |

## 配置文件

配置文件路径：`plugins/UltiTools/UltiCleaner/config/cleaner.yml`

```yaml
# ============ 物品清理 ============
item:
  enabled: true                              # 是否启用物品清理
  interval: 300                              # 清理间隔（单位：秒，范围：10-3600）
  warn-times:                                # 清理前的警告时间点（单位：秒）
    - 60
    - 30
    - 10
    - 5
    - 3
    - 2
    - 1
  whitelist:                                 # 物品白名单，这些物品不会被清理（使用 Material 名称）
    - DIAMOND
    - EMERALD
    - NETHER_STAR
    - BEACON
    - ELYTRA
  ignore-named: true                         # 忽略有自定义名称的物品（通过铁砧命名的物品）
  ignore-recent: 30                          # 忽略最近掉落的物品（单位：秒，范围：0-300，0 表示不忽略）

# ============ 实体清理 ============
entity:
  enabled: true                              # 是否启用实体清理
  interval: 600                              # 清理间隔（单位：秒，范围：10-7200）
  warn-times:                                # 实体清理前的警告时间点（单位：秒）
    - 60
    - 30
    - 10
    - 5
    - 3
    - 2
    - 1
  types:                                     # 要清理的实体类型（使用 EntityType 名称）
    - ZOMBIE
    - SKELETON
    - CREEPER
    - SPIDER
    - CAVE_SPIDER
    - ENDERMAN
    - WITCH
    - SLIME
    - PHANTOM
  whitelist-named: true                      # 不清理有自定义名称的实体（如用命名牌命名的）
  whitelist-leashed: true                    # 不清理被拴绳栓住的实体
  whitelist-tamed: true                      # 不清理被驯服的实体（如驯服的狼/猫）

# ============ 世界设置 ============
worlds:
  blacklist:                                 # 不进行清理的世界（世界名称）
    - world_creative

# ============ 智能清理 ============
smart:
  enabled: false                             # 是否启用智能清理（基于实体数量阈值自动触发）
  item-threshold: 2000                       # 物品数量阈值（范围：100-10000，超过触发清理）
  mob-threshold: 1000                        # 生物数量阈值（范围：100-5000，超过触发清理）
  cooldown: 60                               # 智能清理冷却时间（单位：秒，范围：30-600）

# ============ 分批处理 ============
batch:
  size: 50                                   # 每 tick 清理的实体数量（范围：10-500）
  show-progress: false                       # 是否向 OP 显示清理进度

# ============ TPS 自适应 ============
tps:
  adaptive-enabled: true                     # 是否启用 TPS 自适应阈值调整
  sample-window: "1m"                        # TPS 采样窗口（可选值：1m / 5m / 15m）
  low-threshold: 18.0                        # 低 TPS 阈值（范围：10-20，低于此值时降低清理阈值）
  critical-threshold: 15.0                   # 严重低 TPS 阈值（范围：5-18）
  low-reduction: 30                          # 低 TPS 时阈值降低百分比（范围：0-80）
  critical-reduction: 50                     # 严重低 TPS 时阈值降低百分比（范围：0-90）

# ============ 区块卸载 ============
chunk:
  enabled: false                             # 是否启用区块卸载（卸载远离玩家的区块释放内存）
  max-distance: 20                           # 最大区块距离（范围：5-50，区块单位，超出此距离的区块将被卸载）
  batch-size: 5                              # 每 tick 卸载的区块数量（范围：1-20）
  timeout: 5                                 # 异步卸载超时时间（单位：秒，范围：1-30）

# ============ 消息设置 ============
messages:
  prefix: "&a[清理]"                         # 消息前缀
  warn: "&c[清理] &f地面物品将在 &e{TIME} &f秒后清理！"
  entity-warn: "&c[清理] &f实体将在 &e{TIME} &f秒后清理！"
  item-cleaned: "&a[清理] &f已清理 &e{COUNT} &f个地面物品！"
  entity-cleaned: "&a[清理] &f已清理 &e{COUNT} &f个实体！"
  smart-triggered: "&e[清理] &f检测到实体数量过多，正在进行智能清理..."
  clean-progress: "&7[清理] &f清理进度: &e{CURRENT}&f/&e{TOTAL}"
  clean-cancelled: "&c[清理] &f清理操作被其他插件取消！"
```

### 消息占位符说明

| 占位符 | 说明 |
|--------|------|
| `{TIME}` | 清理倒计时剩余秒数 |
| `{COUNT}` | 清理的物品/实体数量 |
| `{CURRENT}` | 当前已清理数量 |
| `{TOTAL}` | 需要清理的总数量 |

## 使用教程

### 场景一：小型生存服（10-20人）

小型服务器不需要太激进的清理，使用默认配置就够了。建议把物品清理间隔调长一点，避免玩家的物品被过早清掉：

```yaml
item:
  interval: 600        # 10 分钟清理一次
  ignore-recent: 60    # 忽略最近 1 分钟内掉落的物品
smart:
  enabled: false       # 关闭智能清理
chunk:
  enabled: false       # 关闭区块卸载
```

### 场景二：中型服务器（50人左右）

中型服务器建议启用智能清理，适当调高批量大小：

```yaml
item:
  interval: 300        # 5 分钟清理一次
smart:
  enabled: true
  item-threshold: 1500
  mob-threshold: 800
batch:
  size: 100            # 每 tick 清理 100 个，加快速度
```

### 场景三：大型服务器（100人以上）

大型服务器需要更激进的清理策略，建议全部功能都开启：

```yaml
item:
  interval: 180        # 3 分钟清理一次
smart:
  enabled: true
  item-threshold: 1000
  mob-threshold: 500
  cooldown: 30         # 缩短冷却到 30 秒
tps:
  adaptive-enabled: true
  low-threshold: 19.0  # 更敏感的 TPS 检测
chunk:
  enabled: true
  max-distance: 15     # 更积极的区块卸载
batch:
  size: 200
  show-progress: true  # 给 OP 显示进度，方便监控
```

### 场景四：保护特定物品不被清理

如果你的服务器有用钻石方块做地标的习惯，或者有些自定义物品需要保留：

```yaml
item:
  whitelist:
    - DIAMOND
    - EMERALD
    - NETHER_STAR
    - BEACON
    - ELYTRA
    - DIAMOND_BLOCK      # 添加钻石方块
    - TOTEM_OF_UNDYING   # 添加不死图腾
  ignore-named: true     # 保护所有命名物品
```

### 场景五：创造世界不清理

如果你的服务器有一个创造模式世界，不希望被清理：

```yaml
worlds:
  blacklist:
    - world_creative
    - creative_world
    - build_world
```

### 场景六：TPS 自适应工作原理

当 TPS 低于 18（默认低阈值），智能清理的物品阈值会从 2000 降低到 1400（降低 30%），也就是说服务器卡顿时会更早触发清理。

当 TPS 低于 15（默认严重阈值），阈值会从 2000 降低到 1000（降低 50%），更积极地清理。

TPS 恢复后，阈值自动回到正常值。

## 开发者 API

UltiCleaner 提供了四个自定义事件，其他插件可以监听并干预清理过程：

| 事件 | 触发时机 | 是否可取消 |
|------|----------|-----------|
| `PreItemCleanEvent` | 物品清理开始前 | 可取消 |
| `PreEntityCleanEvent` | 实体清理开始前 | 可取消 |
| `PreChunkUnloadEvent` | 区块卸载前 | 可取消 |
| `CleanCompleteEvent` | 清理完成后（异步） | 不可取消 |

`PreItemCleanEvent` 和 `PreEntityCleanEvent` 的 `getItemUuids()` / `getEntityUuids()` 返回的列表是可修改的，你可以从中移除不想清理的实体。

## 常见问题

### 1. 安装后不生效怎么办？

检查以下几点：
- 确认 JAR 文件放在了 `plugins/UltiTools/plugins/` 目录（不是 `plugins/` 根目录）
- 确认服务器安装了 UltiTools-API 6.2.0 或更高版本
- 重启服务器（不是 `/ul reload`，新模块需要完整重启）
- 查看控制台是否有 "UltiCleaner 已启用！" 日志

### 2. 改了配置文件没效果？

保存配置文件后，使用 `/ul reload` 命令重载配置。注意检查 YAML 格式是否正确（缩进必须用空格，不能用 Tab）。如果重载后仍无效，检查控制台是否有配置验证错误信息。

### 3. 权限怎么设置？

UltiCleaner 只有一个权限节点 `ulticleaner.clean`，控制所有 `/clean` 命令的使用。使用 LuckPerms 等权限插件设置：

```
/lp group admin permission set ulticleaner.clean true
```

普通玩家通常不需要此权限，只有管理员需要手动触发清理和查看状态。

### 4. 清理时服务器还是会卡，怎么办？

调小分批处理的 `batch.size` 值。默认是每 tick 清理 50 个，如果服务器配置较低，可以改为 20 或 30。分批处理会延长清理总时间，但每个 tick 的负载更小。

### 5. 区块卸载功能安全吗？

区块卸载在执行前会做多项安全检查：不会卸载强制加载的区块、不会卸载有玩家的区块、不会卸载正在使用的区块。Paper 服务器还会检查实体是否已加载。如果仍然担心，可以先在测试服上试用，或只在无人世界启用。

### 6. 智能清理和定时清理有什么区别？

定时清理按固定间隔执行，不管实体数量多少。智能清理只在实体数量超过阈值时触发，相当于一个"保险机制"。两者可以同时启用。

### 7. 如何让其他插件阻止某次清理？

其他插件可以监听 `PreItemCleanEvent` 或 `PreEntityCleanEvent`，调用 `setCancelled(true)` 即可阻止该次清理。也可以从事件的 UUID 列表中移除特定实体，实现部分阻止。

## 更新日志

### v1.0.0 (2026-02-13)

初始发布。

新增：定时物品清理，支持可配置间隔和倒计时警告
新增：定时实体清理，支持按实体类型配置
新增：物品白名单，保护指定类型的物品不被清理
新增：忽略有自定义名称的物品和实体
新增：忽略被拴绳栓住的实体和被驯服的实体
新增：忽略最近掉落的物品（可配置时间窗口）
新增：世界黑名单，指定世界不参与清理
新增：智能清理，基于实体数量阈值自动触发
新增：TPS 自适应阈值调整，支持 1m/5m/15m 采样窗口
新增：分批处理，每 tick 清理固定数量的实体，减少卡顿
新增：清理进度显示（向 OP 发送进度消息）
新增：区块卸载功能，自动卸载远离玩家的闲置区块
新增：Paper 服务器兼容优化（异步区块卸载、实体加载检测）
新增：四个自定义事件（PreItemCleanEvent、PreEntityCleanEvent、PreChunkUnloadEvent、CleanCompleteEvent）
新增：所有清理消息可自定义，支持颜色代码
