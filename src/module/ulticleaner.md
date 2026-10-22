# UltiCleaner - 高性能服务器清理模块

自动清理地面物品和指定类型的生物实体，支持智能清理、TPS（服务器性能指标）自适应阈值和分批处理，最大程度减少清理过程中的卡顿。

## 功能概述

UltiCleaner 为 Minecraft 服务器提供全面的自动清理能力。它能定时清理地面掉落物和指定类型的怪物实体，并在清理前向全服玩家发送倒计时警告。清理过程采用分批处理机制，每个 tick 只移除固定数量的实体，避免一次性删除大量实体造成的卡顿。此外，它支持智能清理模式——当服务器中的物品或怪物数量超过设定阈值时自动触发额外清理。TPS 自适应功能会根据服务器当前性能动态调低触发阈值，让服务器在卡顿时更积极地清理。区块卸载功能已移除，闲置区块由服务端引擎管理。所有清理操作都提供自定义 Bukkit 事件（Event），其他插件可以监听并取消特定清理。

## 安装

有两种安装方式：

**方式一：通过 UPM 在线安装**

```
/upm install UltiCleaner
```

**方式二：手动安装**

1. 先安装 UltiTools-API 6.3.0 或更高版本，再下载 `UltiCleaner-2.0.0.jar`
2. 将 JAR 文件放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

安装完成后，配置文件会自动生成在 `plugins/UltiTools/pluginConfig/UltiCleaner/config/cleaner.yml`。

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

所有命令的别名为 `/clean`、`/cleaner`，权限节点统一为 `ulticleaner.clean`。玩家和控制台均可执行。

| 命令 | 说明 | 示例 |
|------|------|------|
| `/clean items` | 立即清理所有世界的地面物品 | `/clean items` |
| `/clean entities` | 立即清理所有世界中配置的实体类型 | `/clean entities` |
| `/clean all` | 同时清理物品和实体 | `/clean all` |
| `/clean check` | 显示服务器实体统计：地面物品数、可清理生物数、总实体数、已加载区块数、当前 TPS | `/clean check` |
| `/clean status` | 显示清理状态：下次物品/实体清理倒计时、当前是否正在清理、TPS 状态 | `/clean status` |

## 配置文件

配置文件路径：`plugins/UltiTools/pluginConfig/UltiCleaner/config/cleaner.yml`

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

# ============ 消息设置 ============
messages:
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

上面的消息以中文内置文本为例；其他设置的键和值与英文页一致。七条广播文本及框架生成的注释会跟随服务器 `language`，你改过的文本和注释保留。更换语言后执行完整 `/ul reload` 或重启；公告内容请改配置文件，不是解压出的语言文件。不要拿整份示例覆盖自己的配置。

重载现在会重新读文件、刷新语言、重建缓存并重置倒计时。`warn-times` 按整数秒读取，非法项会点名跳过；空列表或全部无法读取时改用 `[60, 30, 10, 5, 3, 2, 1]`，不是关闭警告。要关闭实体清理请用 `entity.enabled: false`，不要用 `entity.types: []`：空类型列表会警告并使用默认生物类型；非空但全部拼错时会逐项警告且没有实体被清理。物品白名单接受 `diamond` 等小写材料名，未知材料会警告且不受保护。

旧 `messages.prefix` 不再读取，要改前缀应改每条消息本身；残留的该键和四个 `chunk.*` 键会在启动及重载时各警告一次，可逐行删除。卸载 UltiCleaner 会停止仍在执行的批处理且不广播完成。`/clean all` 的两类清理现在都能执行；任一清理正在运行时，手动清理命令仍会拒绝。`/clean status` 显示实际配置的 TPS 降幅。

## 使用教程

### 场景一：小型生存服（10-20人）

小型服务器不需要太激进的清理，使用默认配置就够了。建议把物品清理间隔调长一点，避免玩家的物品被过早清掉：

```yaml
item:
  interval: 600        # 10 分钟清理一次
  ignore-recent: 60    # 忽略最近 1 分钟内掉落的物品
smart:
  enabled: false       # 关闭智能清理
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

UltiCleaner 提供了三个自定义事件，其他插件可以监听并干预清理过程：

| 事件 | 触发时机 | 是否可取消 |
|------|----------|-----------|
| `PreItemCleanEvent` | 物品清理开始前 | 可取消 |
| `PreEntityCleanEvent` | 实体清理开始前 | 可取消 |
| `CleanCompleteEvent` | 清理完成后（异步） | 不可取消 |

`PreItemCleanEvent` 和 `PreEntityCleanEvent` 的 `getItemUuids()` / `getEntityUuids()` 返回的列表是可修改的，你可以从中移除不想清理的实体。

## 常见问题

### 1. 安装后不生效怎么办？

检查以下几点：
- 确认 JAR 文件放在了 `plugins/UltiTools/plugins/` 目录（不是 `plugins/` 根目录）
- 确认服务器安装了 UltiTools-API 6.3.0 或更高版本
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

### 5. 旧的区块卸载设置和 /clear 命令去哪了？

区块卸载已完整移除，服务端自行管理闲置区块。`/clean chunks` 不再存在；旧文件的四个 `chunk.*` 设置只会产生弃用警告，可删除这些行。`/clear` 已交还原版，不要用它调用本模块；使用 `/clean` 或 `/cleaner`。`/clean check` 的已加载区块数只是统计，不代表仍有区块清理功能。

### 6. 智能清理和定时清理有什么区别？

定时清理按固定间隔执行，不管实体数量多少。智能清理只在实体数量超过阈值时触发，相当于一个"保险机制"。两者可以同时启用。

### 7. 如何让其他插件阻止某次清理？

其他插件可以监听 `PreItemCleanEvent` 或 `PreEntityCleanEvent`，调用 `setCancelled(true)` 即可阻止该次清理。也可以从事件的 UUID 列表中移除特定实体，实现部分阻止。

## 更新日志

### v2.0.0

#### 新增

- 本模块现在会在启动时、以及每次 `/ul reload` 时检查你自己的 `config/cleaner.yml` 中是否仍存在本版本
  不再读取的配置项，并为每个残留键各记一条警告，点明模块、文件与键名，并说明该设置改去哪里。
  从模块中删除一个键，只会让**新生成**的文件里不再有它，对你已有的文件没有任何影响——框架只为**缺失**的键
  写入默认值——因此若没有这条警告，一个被改过的值会就此悄无声息地失效。当前检查的键为 `messages.prefix`、
  `chunk.enabled`、`chunk.max-distance`、`chunk.batch-size`、`chunk.timeout`；把它们从文件中删除即可不再提示。

#### 变更

- 本版本需要 UltiTools 6.3.0 或更高版本，并在 `plugin.yml` 中声明 `api-version: 630`（已发布的 1.0.0 声明为 `620`）。
  更早的框架现在会在模块的启动逻辑运行之前拒绝加载它，并给出 UltiTools 版本过旧的警告；拒绝信息按 `plugin.yml` 的
  `name:` 指明模块，此处为 `UltiCleaner`（UltiKits/UltiTools-Reborn#544）。

- `plugin.yml` 现在声明 `identify-string: ulticleaner`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。

- `config/cleaner.yml` 中的消息设置——七条广播消息（`messages.warn`、`messages.entity-warn`、`messages.item-cleaned`、
  `messages.entity-cleaned`、`messages.smart-triggered`、`messages.clean-progress`、`messages.clean-cancelled`）——
  在模块启动时按服务器语言写入，文件内容即模块广播的内容；此前它们是写死的中文，`language: en` 对任何清理广播都不起作用。
  仍为内置文本（任一语言的内置文本，或旧版本的出厂默认值）的设置会跟随 `language`：模块启动或执行 `/ul reload` 后改写为
  当前语言的文本。你改过的设置保持不变。若想保留内置文本又不让它跟随语言，请至少改动一个字符（UltiKits/UltiCleaner#17）。写入的是本模块的内置文本：请在 `config/cleaner.yml` 中修改这些设置；修改已解压的语言文件不会改变它们（旧版本同样从不从语言文件读取它们）。

#### 修复

- `config/cleaner.yml` 中各配置项上方的注释现在取自模块的语言文件：`language: en` 的服务器全新安装时写入英文注释
  （此前所有语言下都写入纯中文注释）。框架在这 33 项上写下的注释（包括旧版本写下的中文注释）会在下次启动时、以及你修改
  `language` 并执行不带参数的 `/ul reload` 后切换为服务器语言；你自己写的注释保持原样（UltiKits/UltiTools-Reborn#611）。
  `/ul reload` 时本模块只为一件事写入 `config/cleaner.yml`：把仍为另一种语言内置文本的广播消息改写为当前语言（修改 `language` 后
  所有这样的消息都会被改写）。
  这次写入只改动这些消息所在的行：框架无法读取的值（例如 `interval: 3O0`）、你删除的键以及你自己的注释都保持原样
  （UltiKits/UltiTools-Reborn#611）。如果重载时既没有这样的消息、也没有另一种语言的框架注释，则不会写入该文件——未修改
  `language` 时通常如此（UltiKits/UltiCleaner#33）。

- `item.whitelist` 中的条目现在按服务器解析材料名的方式读取，因此 `diamond` 这样的小写条目也能保护钻石。不是材料名的
  条目（例如拼写错误）会被忽略，并在启动和 `/ul reload` 时于控制台警告中点名；此前它会被静默接受，却不保护任何物品。

- `/upm uninstall UltiCleaner` 现在会停止仍在移除物品或实体的清理。此前分批任务属于 UltiTools 插件，模块卸载后它仍会
  继续删除实体，直到处理完整个列表。以这种方式停止的清理不会发出任何广播（UltiKits/UltiCleaner#26）。

- 定时清理前的倒计时警告（「地面物品将在 T 秒后清理！」及实体那一行）恢复广播。此前的框架把 `config/cleaner.yml` 中
  `item.warn-times` / `entity.warn-times` 的每一项读成文本，而模块拿它与数字比较，所以文件存在后从未发出过任何警告。
  现在每一项都按整数秒读取，旧文件中以文本形式保存的数字也一样。读不成整数的项（例如 `abc` 或 `2.5`）会被跳过，
  并在控制台记一条警告，写明键名、该项的位置与原值，其余项照常使用。列表为空、或其中没有任何一项能读成整数时，该列表不予采用，改用默认值
  `[60, 30, 10, 5, 3, 2, 1]`，并在启动和每次 `/ul reload` 时记一条警告，写明键名与默认值；此前这样的列表会让所有倒计时
  警告悄无声息地失效（UltiKits/UltiCleaner#22、UltiKits/UltiCleaner#34）。

- `config/cleaner.yml` 中的 `entity.types: []` 不再悄无声息地关闭实体清理。框架的 `@NotEmpty` 现已覆盖列表，
  因此空的 `entity.types` 改用声明的默认类型（`ZOMBIE`、`SKELETON`、`CREEPER`、`SPIDER`、`CAVE_SPIDER`、`ENDERMAN`、
  `WITCH`、`SLIME`、`PHANTOM`），并由框架记一条警告，写明键名、空值与默认值；文件不被改动。两个 `warn-times` 列表保留本模块自己的
  空列表警告。只包含非实体类型名称的列表不算空：每个未知名称都会被警告，且不清理任何实体（UltiKits/UltiCleaner#34）。

- 关于本版本已不再读取的配置键的警告，现在会原样打印配置文件路径。此前路径中若含有 `{KEY}` 或 `{REASON}`，
  会被随后填入的占位符改写。

- 面向插件作者：`/clean all` 现在会在两半都完成后触发一次类型为 `ALL` 的 `CleanCompleteEvent`，计数为两者之和、
  触发方式为 `MANUAL`。清理列表非空且未被取消的那一半仍会像以前一样先触发自己的 `ITEMS` 或 `ENTITIES` 事件；
  列表为空或被取消的那一半不触发该分项事件。`CleanType.ALL` 此前只声明、从未被触发（UltiKits/UltiCleaner#16）。

- `/clean all` 现在会同时清理实体和地面物品。此前物品清理与实体清理共用同一个「清理进行中」标记，与物品清理
  在同一 tick 开始的实体清理会被静默跳过，而 `/clean all` 仍报告这些实体已开始清理。同一冲突也会让智能清理在
  两个阈值同时超出时漏掉生物清理，并在两个定时倒计时同一秒归零时漏掉其中一个。现在两种清理各有自己的标记；
  任一清理进行中时，`/clean items`、`/clean entities` 与 `/clean all` 仍会拒绝执行（UltiKits/UltiCleaner#15）。

- `language: en` 现在对 `/clean` 打印的全部内容（开始清理、清理进行中、`check`、`status` 与帮助）以及命令描述生效；
  这些内容原先在任何语言下都是写死的中文，而语言文件中其实已有其中大部分的英文文本（UltiKits/UltiCleaner#17）。
  `language: zh` 现在也对原先写死为英文的控制台日志生效：检测到的服务端与 TPS 监控启动行、`entity.types` 中的未知实体类型、
  `/clean check` 与 `/clean status` 显示的 TPS 档位（`Normal`、`Low`、`Critical`），以及本版本不再读取的配置键的警告。英文措辞保持不变。

- `/ul reload UltiCleaner`（以及不带参数的 `/ul reload`）现在会先重新读取 `config/cleaner.yml` 并刷新本模块的
  语言文件，再由本模块重建清理服务的缓存并重置清理倒计时。此前本模块替换了框架的重载方法，该文件从不会被
  重新读取，修改 `item.interval` 等配置要到重启后才生效（UltiKits/UltiCleaner#14）。

- 执行 `/upm uninstall UltiCleaner` 后，本模块的 `/clean` 命令现在会被真正移除。此前本模块用一个只打印
  日志的方法替换了框架的卸载方法，因此该命令会一直保持生效，直到服务器重启（UltiKits/UltiCleaner#14）。

- `/clean status` 现在会显示 `tps.low-reduction`、`tps.critical-reduction` 中实际配置的 TPS 阈值降低百分比。
  此前那行警告无论这两个键被改成什么，都固定显示「30%」和「50%」，因此调高过任一项的运维看到的是一个
  模块并未在使用的数字（UltiKits/UltiCleaner#21）。

#### 移除

- 删除了 `/clean` 的别名 `clear`。它接管了原版的 `/clear` 命令，导致 `/clear <玩家>` 只显示本模块的帮助、不会清空背包。
  现在 `/clear` 重新归原版所有；本模块请使用 `/clean` 或 `/cleaner`（UltiKits/UltiCleaner#30）。

- 面向插件作者：删除了 `CleanCompleteEvent.CleanType.CHUNKS`。区块卸载功能删除后已没有任何代码能触发它，监听器里的
  `CHUNKS` 分支永远不会执行。引用了这个常量的插件需删掉该分支，才能基于本版本编译（UltiKits/UltiCleaner#16）。

- 从 `lang/en.yml` 与 `lang/zh.yml` 中删除了五个从未被任何代码显示的条目：`smart_clean_items`、`smart_clean_mobs`、
  `clean_complete`、`tps_low_warning`、`tps_critical_warning`。任何消息都不受影响；已解压的语言文件中的副本只是不再被读取。

- 移除了本模块自身的"UltiCleaner 已禁用！"控制台日志行及其 `cleaner_disabled` 语言键；
  打印该行的卸载覆写方法没有其他工作，因此直接删除，而非迁移到新的卸载钩子。

- **完整移除区块卸载功能。** 服务端引擎本身已经会卸载闲置区块，因此这个功能唯一够得着的，恰好是服务端
  刻意保留的那些区块。实测零玩家在线时三个世界共 147 个已加载区块，正好是每个世界 49 个出生点保留区块，
  而本模块的判定门把这 147 个全部拒绝。该判定门所依赖的那个已弃用平台接口，其自身说明也是同一句话：
  「除非区块在被使用，否则不会被加载超过 1 tick」。**移除不等于否决该功能**：测量结果与「何时把它补回来」
  的条件记录在 `UltiKits/UltiCleaner#27`（UltiKits/UltiCleaner#23、UltiKits/UltiCleaner#20）。逐项如下：
  - 命令 `/clean chunks` 已不存在，现在会落到未知子命令的帮助输出；
  - 每 30 秒执行一次的定时区块卸载任务；
  - `config/cleaner.yml` 中的配置项 `chunk.enabled`、`chunk.max-distance`、`chunk.batch-size`、
    `chunk.timeout` —— 这四个键仍留在你现有的配置文件里，但已不再生效（模块启动时会为每个残留键各记一条警告）；
  - 扩展点 `PreChunkUnloadEvent`，此前只有这个功能会触发它；
  - `/clean check` 的「可卸载区块」一行，以及 `chunk_unloaded`、`cmd_help_chunks`、
    `stats_chunks_unloadable` 三个语言键。
  `/clean check` 的「已加载区块」一行保留：它是一项普通的服务器统计数字，不是该功能的读数。

- 移除了 `config/cleaner.yml` 中的配置项 `messages.prefix`。此前没有任何代码读取它，因此从来没有任何消息
  用过它作前缀，删除它不会改变你看到的任何内容。清理广播里的前缀是那条广播自身文本的一部分——即同一文件中
  另外七个 `messages.*` 键，它们仍然从配置读取，也各自带着自己的标记（英文内置文本为 `[Cleaner]`，中文为 `[清理]`）
  ——所以要改前缀，就去改它所属的那条消息。这些广播现在会跟随服务器的 `language` 设置，见上文「Changed」一节
  （UltiKits/UltiCleaner#17）。被删除的键仍留在你现有的配置文件里，但已不再生效；模块启动时会为它记一条警告
  （UltiKits/UltiCleaner#18）。


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
