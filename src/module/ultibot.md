# UltiBot - 假人机器人

UltiBot 是 UltiTools 框架的假人（Fake Player）模块，可以在服务器中生成看起来和真实玩家一样的 NPC 机器人。这些机器人拥有真实的玩家实体，能执行跳跃、潜行、冲刺、攻击、挖掘、使用物品等各种动作，还能发送聊天消息和执行命令。模块内置了宏录制系统（Macro），可以录制一连串动作然后反复播放。机器人的皮肤可以从 Mojang 服务器实时获取，看起来和真实玩家一模一样。适用于测试服务器插件、模拟玩家行为、搭建 NPC 场景等用途。

:::warning
UltiBot 使用 NMS（服务器内部代码），因此对服务器版本有严格要求。目前支持 **Paper 1.20.1 ~ 1.21.4**，不支持 Spigot。请确认你的服务器版本在支持范围内。
:::

## 安装方式

有两种安装方式：

**方式一：通过 UPM 安装（推荐）**

在服务器控制台或游戏内执行：

```
/upm install UltiBot
```

**方式二：手动安装**

1. 下载 `UltiBot.jar` 文件
2. 放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

安装后会自动在 `plugins/UltiTools/UltiBot/config.yml` 生成配置文件。

## 快速上手

安装后即可使用，无需额外配置。

试一试：

```
/bot spawn TestBot             # 在你的位置生成一个名为 TestBot 的机器人
/bot list                      # 查看当前所有机器人
/bot action TestBot JUMP 40    # 让 TestBot 每 40 tick 跳一次（2秒一跳）
/bot chat TestBot 你好世界     # 让 TestBot 在聊天中说 "你好世界"
/bot skin TestBot Notch        # 把 TestBot 的皮肤改成 Notch 的
/bot remove TestBot            # 移除 TestBot
```

宏录制：

```
/bot macro record TestBot dance   # 开始录制名为 "dance" 的宏
/bot action TestBot JUMP 20       # 录制期间的动作会被记录
/bot action TestBot SNEAK 20
/bot macro stop TestBot           # 停止录制
/bot macro play TestBot dance     # 播放录制好的宏
```

## 命令

所有命令以 `/bot` 开头，玩家和控制台均可使用（标注"仅玩家"的除外）。

### 基础命令

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/bot spawn <名称>` | 在你的位置生成机器人（仅玩家） | `/bot spawn Guard` | `ultibot.use` |
| `/bot remove <名称>` | 移除指定机器人（用 `all` 移除全部） | `/bot remove Guard` | `ultibot.use` |
| `/bot list` | 列出所有活跃的机器人及其所有者 | `/bot list` | `ultibot.use` |
| `/bot tp <名称>` | 将机器人传送到你的位置（仅玩家） | `/bot tp Guard` | `ultibot.use` |
| `/bot reload` | 重新加载配置文件 | `/bot reload` | `ultibot.admin` |

### 动作命令

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/bot action <名称> <动作> <间隔>` | 让机器人重复执行某个动作 | `/bot action Guard JUMP 40` | `ultibot.use` |
| `/bot stop <名称>` | 停止机器人的所有动作 | `/bot stop Guard` | `ultibot.use` |

动作间隔的单位是 tick（1秒 = 20 tick）。

可用的动作类型：

| 动作 | 说明 |
|------|------|
| `JUMP` | 跳跃 |
| `SNEAK` | 潜行（蹲下） |
| `SPRINT` | 冲刺（跑步） |
| `USE` | 使用手持物品 |
| `ATTACK` | 攻击（挥手） |
| `MINE` | 挖掘方块 |
| `DROP_ITEM` | 丢弃一个物品 |
| `DROP_STACK` | 丢弃一整组物品 |
| `DROP_INVENTORY` | 丢弃背包全部物品 |
| `LOOK_AT_NEAREST` | 看向最近的实体 |

### 交互命令

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/bot chat <名称> <消息>` | 让机器人发送聊天消息 | `/bot chat Guard 你好` | `ultibot.use` |
| `/bot cmd <名称> <命令>` | 让机器人执行命令（不需要 `/` 前缀） | `/bot cmd Guard say hello` | `ultibot.use` |
| `/bot skin <名称> <皮肤名>` | 修改机器人皮肤（从 Mojang 获取） | `/bot skin Guard Steve` | `ultibot.use` |

### 宏命令

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/bot macro record <名称> <宏名>` | 开始录制宏 | `/bot macro record Guard patrol` | `ultibot.use` |
| `/bot macro stop <名称>` | 停止录制 | `/bot macro stop Guard` | `ultibot.use` |
| `/bot macro play <名称> <宏名>` | 播放已保存的宏 | `/bot macro play Guard patrol` | `ultibot.use` |
| `/bot macro list` | 列出所有已保存的宏 | `/bot macro list` | `ultibot.use` |

### 测试/调试命令

这些命令主要用于开发者测试插件交互：

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/bot messages <名称>` | 查看机器人收到的消息 | `/bot messages Guard` | `ultibot.use` |
| `/bot clearmsg <名称>` | 清除机器人的消息记录 | `/bot clearmsg Guard` | `ultibot.use` |
| `/bot op <名称>` | 给机器人 OP 权限 | `/bot op Guard` | `ultibot.admin` |
| `/bot deop <名称>` | 移除机器人 OP 权限 | `/bot deop Guard` | `ultibot.admin` |
| `/bot click <名称> <格子>` | 让机器人点击背包格子 | `/bot click Guard 0` | `ultibot.use` |
| `/bot inv <名称>` | 查看机器人打开的 GUI | `/bot inv Guard` | `ultibot.use` |
| `/bot closeinv <名称>` | 关闭机器人的 GUI | `/bot closeinv Guard` | `ultibot.use` |

## 权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultibot.use` | 基础机器人命令（生成、移除、列表、传送、动作、聊天、皮肤、宏） | 所有玩家 |
| `ultibot.action` | 重复动作命令 | 所有玩家 |
| `ultibot.admin` | 管理命令（reload、op/deop） | OP |

## 配置

配置文件路径：`plugins/UltiTools/UltiBot/config.yml`

```yaml
# 每个玩家最多可以生成的机器人数量（范围：1-100）
max-bots-per-player: 5

# 服务器中最多同时存在的机器人总数（范围：1-200）
max-total-bots: 20

# 默认皮肤名称（新机器人没有指定皮肤时使用）
default-skin: "Steve"

# 是否启用机器人物理 tick（关闭后机器人不会受重力等影响）
tick-bots: true

# 是否允许机器人所在的区块保持加载
allow-chunk-loading: false

# 机器人名称前缀（显示在聊天和 Tab 列表中）
bot-prefix: "[Bot] "

# 当机器人的主人离开服务器时，是否自动移除该玩家生成的所有机器人
auto-remove-on-quit: true

# 机器人死亡后是否自动重生
auto-respawn: true
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `max-bots-per-player` | 整数 | 5 | 每个玩家同时在线的机器人上限 |
| `max-total-bots` | 整数 | 20 | 服务器中所有机器人的总上限 |
| `default-skin` | 字符串 | "Steve" | 未指定皮肤时使用的默认皮肤（必须非空） |
| `tick-bots` | 布尔值 | true | 机器人是否参与服务器 tick（重力、碰撞等） |
| `allow-chunk-loading` | 布尔值 | false | 机器人是否能保持区块加载（建议保持关闭，否则影响性能） |
| `bot-prefix` | 字符串 | "[Bot] " | 机器人名称前缀 |
| `auto-remove-on-quit` | 布尔值 | true | 主人退出时自动移除其机器人 |
| `auto-respawn` | 布尔值 | true | 机器人死亡后自动重生在原位 |

## 支持的服务器版本

UltiBot 使用 NMS（Net Minecraft Server）代码实现假人功能，因此只支持特定的服务器版本。

| Minecraft 版本 | 支持情况 |
|----------------|----------|
| 1.20.1 | 支持 |
| 1.20.2 ~ 1.20.3 | 支持 |
| 1.20.4 | 支持 |
| 1.20.5 ~ 1.20.6 | 支持 |
| 1.21 ~ 1.21.1 | 支持 |
| 1.21.2 ~ 1.21.3 | 支持 |
| 1.21.4 | 支持 |

:::warning
UltiBot 只支持 Paper 服务端，不支持 Spigot。需要 Java 21 运行环境（Paper 1.20.4+ 的标准要求）。
:::

## 使用教程

### 场景一：生成你的第一个机器人

最简单的用法就是在你脚下生成一个机器人：

```
/bot spawn MyBot
```

机器人会出现在你的位置，使用默认皮肤（Steve）。你可以给它换个皮肤：

```
/bot skin MyBot Notch
```

皮肤会从 Mojang 的服务器实时获取。第一次获取某个皮肤时需要几秒钟，之后会被缓存。

### 场景二：让机器人执行动作

你可以让机器人重复执行某个动作：

```
/bot action MyBot JUMP 40     # 每 2 秒跳一次
/bot action MyBot SNEAK 20    # 每 1 秒蹲一次
```

动作间隔单位是 tick（20 tick = 1 秒）。比如间隔 40 就是每 2 秒执行一次。

要停止所有动作：

```
/bot stop MyBot
```

### 场景三：录制和播放宏

宏（Macro）可以把一系列动作录制下来，以后一键重放。

1. 开始录制：
```
/bot macro record MyBot patrol
```

2. 在录制期间执行动作（这些动作和时间间隔会被记录）：
```
/bot action MyBot JUMP 20
/bot action MyBot SPRINT 40
/bot action MyBot SNEAK 20
```

3. 停止录制：
```
/bot macro stop MyBot
```

4. 之后随时可以播放：
```
/bot macro play MyBot patrol
```

查看已保存的所有宏：
```
/bot macro list
```

### 场景四：用机器人测试插件

UltiBot 的一个重要用途是测试其他插件。机器人可以执行命令、点击 GUI、捕获消息，帮助你测试插件交互。

```
/bot spawn Tester                    # 生成测试用机器人
/bot op Tester                       # 给 OP 权限（方便测试）
/bot cmd Tester warp spawn           # 让机器人执行命令
/bot messages Tester                 # 查看机器人收到了什么消息
/bot click Tester 0                  # 让机器人点击 GUI 的第 0 个格子
/bot inv Tester                      # 查看机器人打开的 GUI 内容
/bot closeinv Tester                 # 关闭 GUI
```

### 场景五：批量清理机器人

如果机器人太多想全部清除：

```
/bot remove all
```

或者配置 `auto-remove-on-quit: true`（默认就是 true），这样玩家离开服务器时，他生成的所有机器人会自动消失。

## 常见问题

**Q: 安装后不生效怎么办？**

A: 检查以下几项：
1. 确认 JAR 文件放在 `plugins/UltiTools/plugins/` 目录下，不是 `plugins/` 根目录
2. 安装新模块后必须重启服务器，`/ul reload` 只能重载配置文件
3. 确认你使用的是 **Paper** 服务端，不是 Spigot（UltiBot 依赖 Paper 的 NMS 映射）
4. 确认 Minecraft 版本在 1.20.1 ~ 1.21.4 范围内
5. 确认 UltiTools-API 版本不低于 6.2.1
6. 检查控制台是否有 "unsupported version" 的报错

**Q: 改了配置文件没效果？**

A: 修改 `plugins/UltiTools/UltiBot/config.yml` 后，可以用 `/bot reload` 重新加载配置，或者用 `/ul reload`。

**Q: 权限怎么设置？**

A: UltiBot 的权限节点（permission node）以 `ultibot.` 开头。推荐用 LuckPerms 管理：

```
/lp group default permission set ultibot.use true
/lp group admin permission set ultibot.admin true
```

`ultibot.use` 和 `ultibot.action` 默认对所有玩家开放，`ultibot.admin` 默认只有 OP。

**Q: 机器人会影响服务器性能吗？**

A: 每个机器人相当于一个真实玩家实体，所以大量机器人确实会增加服务器负担。建议：
- 控制机器人总数（默认上限 20 个）
- 保持 `allow-chunk-loading: false`，这样机器人不会导致额外的区块加载
- 不用的机器人及时移除

**Q: 为什么我的服务器版本不支持？**

A: UltiBot 使用 NMS（Net Minecraft Server，Minecraft 服务器内部代码）来实现假人功能，NMS 在每个 Minecraft 版本都会变化。目前已实现 1.20.1 到 1.21.4 的适配。如果你的版本不在支持范围内，需要等待开发者添加对应版本的适配模块。

**Q: 机器人能做什么不能做什么？**

A: 机器人能做的事情：跳跃、潜行、冲刺、使用物品、攻击、挖掘、丢弃物品、发消息、执行命令、换皮肤、录制/播放宏。机器人是真实的玩家实体，其他插件会把它当成真实玩家处理。不能做的事情：机器人没有真正的 AI，不会自己寻路或做决策，所有行为都需要通过命令触发。

**Q: 皮肤获取失败怎么办？**

A: 皮肤从 Mojang 的 API 获取。如果失败可能是：输入的玩家名不存在、Mojang API 暂时不可用、服务器无法访问外网。获取成功后皮肤会被缓存，不需要每次都重新下载。

## 更新日志

### v1.0.0

首次发布。

新增：完整的假人机器人系统，支持生成、移除、传送、列表管理
新增：10 种动作类型（跳跃、潜行、冲刺、使用物品、攻击、挖掘、丢弃、看向最近实体）
新增：重复动作功能，可设定 tick 间隔自动执行动作
新增：宏录制系统（录制、停止、播放、列表），可保存并重放动作序列
新增：皮肤系统，从 Mojang API 实时获取并缓存玩家皮肤
新增：机器人聊天和命令执行功能
新增：自动管理功能（主人退出时自动移除、死亡自动重生）
新增：测试辅助功能（消息捕获、OP 切换、GUI 交互、背包查看）
新增：多版本 NMS 支持（Paper 1.20.1 ~ 1.21.4）
新增：中文和英文语言支持
