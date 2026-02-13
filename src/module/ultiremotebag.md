# UltiRemoteBag - 远程背包

UltiRemoteBag 是 UltiTools 框架的一个模块，为 Minecraft 服务器提供虚拟云存储（远程背包）功能。玩家可以随时随地打开自己的远程背包存取物品，支持多页背包，每页最多 54 个槽位。模块内置 Vault 经济系统集成，玩家可以花钱购买更多背包页。管理员可以查看、创建、删除、清空任意玩家的背包。背包系统带有完整的并发访问控制（锁定机制），当所有者正在使用背包时管理员自动进入只读模式，防止数据冲突。所有操作都有音效反馈。

## 安装

有两种安装方式：

**方式一：通过 UltiTools 插件管理器安装**

在服务器控制台或游戏内输入：

```
/upm install UltiRemoteBag
```

**方式二：手动安装**

1. 下载 `UltiRemoteBag.jar` 文件
2. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

可选依赖：如果需要使用购买背包功能，请确保安装了 [Vault](https://www.spigotmc.org/resources/vault.34315/) 和一个经济插件（如 EssentialsX）。

安装完成后，配置文件会自动生成在 `plugins/UltiTools/UltiRemoteBag/config/remotebag.yml`。

## 快速开始

安装后默认每个玩家拥有 1 页背包（54 个槽位），最多可扩展到 10 页。

1. 输入 `/bag` 打开背包主页 GUI，可以看到你所有的背包
2. 点击某个背包图标就能打开它，像箱子一样存放物品
3. 关闭背包时自动保存

如果服务器安装了 Vault 经济插件，你会在主页看到一个「购买新背包」按钮：

```
/bag           # 打开背包主页（查看所有背包）
/bag 1         # 直接打开第 1 页背包
/bag save      # 手动保存背包数据
```

## 命令

所有命令都只能由玩家在游戏内执行，不支持控制台。

命令别名：`/bag`、`/remotebag`、`/rb`、`/yunbag`

### 玩家命令

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/bag` | 打开背包主页 GUI | `/bag` | `ultibag.use` |
| `/bag <页码>` | 直接打开指定页码的背包 | `/bag 2` | `ultibag.use` |
| `/bag save` | 手动保存背包数据 | `/bag save` | `ultibag.use` |

### 管理员命令

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/bag see <玩家>` | 查看玩家的第一页背包 | `/bag see Steve` | `ultibag.admin.see` |
| `/bag see <玩家> <页码>` | 查看玩家的指定页背包 | `/bag see Steve 3` | `ultibag.admin.see` |
| `/bag create <玩家>` | 为玩家创建新的背包页 | `/bag create Steve` | `ultibag.admin.create` |
| `/bag delete <玩家> <页码>` | 删除玩家的指定页背包 | `/bag delete Steve 3` | `ultibag.admin.delete` |
| `/bag clear <玩家> <页码>` | 清空玩家的指定页背包内容 | `/bag clear Steve 2` | `ultibag.admin.clear` |
| `/bag list <玩家>` | 列出玩家的所有背包 | `/bag list Steve` | `ultibag.admin.list` |

## 权限

### 玩家权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultibag.use` | 使用远程背包基础功能 | 所有玩家 |
| `ultibag.pages.1` | 拥有 1 页背包 | 所有玩家 |
| `ultibag.pages.2` | 拥有 2 页背包 | 无 |
| `ultibag.pages.3` | 拥有 3 页背包 | 无 |
| `ultibag.pages.N` | 拥有 N 页背包（N 为正整数，最大为 `max_pages`） | 无 |

权限页码是向上兼容的：拥有 `ultibag.pages.5` 的玩家最多可以拥有 5 页背包。系统从配置的 `max_pages` 开始向下检查，找到玩家拥有的最高权限数字即为上限。

### 管理员权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultibag.admin.see` | 查看其他玩家的背包 | OP |
| `ultibag.admin.create` | 为其他玩家创建背包 | OP |
| `ultibag.admin.delete` | 删除其他玩家的背包 | OP |
| `ultibag.admin.clear` | 清空其他玩家的背包 | OP |
| `ultibag.admin.list` | 列出其他玩家的背包 | OP |

## 配置

配置文件路径：`plugins/UltiTools/UltiRemoteBag/config/remotebag.yml`

```yaml
# 新玩家默认的背包页数（范围：1-100）
default_pages: 1

# 玩家可拥有的最大背包页数（范围：1-100）
max_pages: 10

# 每页的行数（范围：1-6，每行 9 个槽位）
# 6 行 = 54 个槽位（最大）
rows_per_page: 6

# GUI 标题，{PAGE} 为当前页码，{MAX} 为最大页码
gui_title: "&6远程背包 &7第 {PAGE}/{MAX} 页"

# 是否启用基于权限的页数限制
# 启用后，玩家的最大页数由 ultibag.pages.N 权限决定
# 未启用时，所有玩家最大页数为 max_pages
permission_based_pages: true

# 权限前缀（用于计算页数上限）
# 例如前缀为 ultibag.pages. ，拥有 ultibag.pages.5 权限的玩家上限为 5 页
permission_prefix: "ultibag.pages."

# 自动保存间隔（单位：秒，0 为禁用，范围：0-3600）
auto_save_interval: 300

# 关闭 GUI 时是否自动保存
save_on_close: true

# 消息设置
messages:
  no_permission: "&c你没有权限使用远程背包！"
  page_locked: "&c你没有权限访问第 {PAGE} 页！"
  bag_saved: "&a远程背包已保存！"

# 经济设置（需要 Vault 插件）
economy:
  enabled: true              # 是否启用购买背包功能
  base_price: 10000          # 购买背包的基础价格（范围：0-1000000000）
  price_increase_enabled: true  # 是否启用价格递增
  price_increase_rate: 0.1   # 价格递增比率（范围：0.0-10.0）
                             # 公式：basePrice * (1 + rate)^(n-1)
                             # 0.1 表示每多买一个背包价格增加 10%
                             # 例如基础价格 10000：
                             #   第 1 个 = 10000
                             #   第 2 个 = 11000
                             #   第 3 个 = 12100

# 音效设置
sound:
  enabled: true                     # 是否启用音效
  open: "BLOCK_CHEST_OPEN"          # 打开背包的音效
  close: "BLOCK_CHEST_CLOSE"        # 关闭背包的音效
  purchase: "ENTITY_PLAYER_LEVELUP" # 购买成功的音效
  error: "ENTITY_VILLAGER_NO"       # 错误提示的音效
  volume: 1.0                       # 音量（范围：0.0-1.0）
  pitch: 1.0                        # 音调（范围：0.5-2.0）

# 锁定设置（并发访问控制）
lock:
  timeout_seconds: 300       # 背包锁超时时间（单位：秒，范围：10-3600）
                             # 超时后自动释放锁，防止因异常退出导致死锁
  notify_readonly_viewers: true  # 所有者开始使用背包时，是否通知正在只读查看的管理员
```

## 使用教程

### 场景一：第一次使用远程背包

你刚进入服务器，想试试远程背包功能：

1. 输入 `/bag` 打开背包主页
2. 你会看到一个箱子图标，代表你的第一个背包
3. 点击箱子图标进入背包，你可以像箱子一样自由存放物品
4. 关闭 GUI 时物品自动保存
5. 下次输入 `/bag` 或 `/bag 1` 就能重新打开

### 场景二：购买更多背包

你的第一个背包快满了，想买更多空间：

1. 输入 `/bag` 打开主页
2. 在最后你会看到一个「购买新背包」按钮，显示价格和你的余额
3. 如果余额充足（绿色按钮），点击即可购买
4. 如果余额不足（红色按钮），需要先赚够钱

价格递增示例（基础价格 10000，递增率 10%）：
- 第 1 个背包：10000
- 第 2 个背包：11000
- 第 3 个背包：12100
- 第 4 个背包：13310

### 场景三：管理员查看玩家背包

管理员怀疑某玩家使用了作弊手段获取物品，想检查他的背包：

1. 输入 `/bag see 玩家名` 查看该玩家的第一页背包
2. 或者 `/bag see 玩家名 3` 查看指定的第 3 页
3. 如果玩家此时正在使用背包，管理员会自动进入只读模式
4. 只读模式下无法移动物品，GUI 左下方会显示刷新按钮
5. 等玩家关闭背包后，点击刷新按钮可以切换为编辑模式

### 场景四：管理员管理背包

```
/bag list Steve        # 查看 Steve 的所有背包概览（物品数量、槽位占用）
/bag create Steve      # 为 Steve 创建一个新的背包页
/bag clear Steve 2     # 清空 Steve 第 2 页背包的内容（保留页面）
/bag delete Steve 3    # 完全删除 Steve 的第 3 页背包
```

注意：如果目标背包正在被使用（处于锁定状态），删除和清空操作会被拒绝。

### 场景五：使用权限控制背包页数

你可以用权限插件（如 LuckPerms）精确控制不同组的玩家能拥有几页背包：

```
/lp group default permission set ultibag.pages.1 true   # 默认组：1 页
/lp group vip permission set ultibag.pages.3 true       # VIP 组：3 页
/lp group svip permission set ultibag.pages.5 true      # SVIP 组：5 页
/lp group admin permission set ultibag.pages.10 true    # 管理组：10 页
```

确保配置文件中 `permission_based_pages` 设为 `true`。

## 锁定机制说明

UltiRemoteBag 内置了一套完整的并发访问控制，防止多人同时编辑同一个背包导致数据冲突：

**所有者访问自己的背包：**
- 背包无人使用 -> 直接进入编辑模式
- 管理员正在编辑 -> 被阻止，提示稍后再试

**管理员访问他人的背包：**
- 背包无人使用 -> 进入编辑模式
- 所有者正在使用 -> 自动进入只读模式
- 其他管理员正在编辑 -> 被阻止，提示稍后再试

**锁超时：** 默认 300 秒（5 分钟），超时后自动释放。防止因客户端崩溃等异常情况导致死锁。

**退出时清理：** 玩家退出服务器时，自动释放所有持有的锁、保存背包数据、清理内存缓存。

## 常见问题

**Q: 安装后不生效怎么办？**

A: 检查以下几点：
1. 确保 UltiTools-API 版本是 6.2.0 或更高
2. 确认 JAR 文件放在了 `plugins/UltiTools/plugins/` 目录，不是 `plugins/` 根目录
3. 安装后需要重启服务器，`/ul reload` 只能重载配置，不能加载新的模块 JAR
4. 查看服务器控制台是否有报错信息

**Q: 改了配置文件没效果？**

A: 修改 `plugins/UltiTools/UltiRemoteBag/config/remotebag.yml` 后，执行 `/ul reload` 重载配置即可。注意不要修改 YAML 的缩进格式。

**Q: 权限怎么设置？**

A: UltiRemoteBag 的权限节点以 `ultibag.` 开头。推荐使用 LuckPerms 等权限插件管理。基础权限 `ultibag.use` 默认所有玩家都有。

要控制背包页数，启用 `permission_based_pages` 后给不同权限组设置 `ultibag.pages.N`：

```
/lp group vip permission set ultibag.pages.5 true
```

管理员权限独立分开，可以按需分配：
```
/lp group admin permission set ultibag.admin.see true
/lp group admin permission set ultibag.admin.create true
```

**Q: 购买背包按钮看不到？**

A: 有几种可能：
1. 配置文件中 `economy.enabled` 设为了 `false`
2. 服务器没有安装 Vault 插件或经济插件（如 EssentialsX）
3. 你已经达到了最大背包页数上限

**Q: 管理员查看背包时为什么是只读的？**

A: 当背包所有者正在使用该背包时，管理员自动进入只读模式，防止两人同时编辑导致数据冲突。等所有者关闭背包后，管理员可以点击 GUI 工具栏中的「刷新」按钮尝试切换为编辑模式。

**Q: 玩家退出后背包数据会丢失吗？**

A: 不会。玩家退出时自动保存背包数据到数据库并清理内存缓存。下次登录时会从数据库重新加载。另外，后台还有定时自动保存任务（默认每 300 秒），以及关闭 GUI 时的自动保存。

**Q: 数据存储在哪里？**

A: 取决于 UltiTools-API 的存储后端配置（config.yml 中的设置）：
- **SQLite**（默认）：数据存储在 `plugins/UltiTools/` 目录下的数据库文件中
- **MySQL**：数据存储在远程 MySQL 数据库中
- **JSON**：数据存储在 `plugins/UltiTools/` 目录下的 JSON 文件中

**Q: 删除和清空有什么区别？**

A: `/bag clear` 清空背包页的内容（物品全部删除），但保留这一页。`/bag delete` 彻底删除这一页背包，数据库中的记录也会被移除。

## 更新日志

### v1.0.0 (2026-02-13)

初始版本发布。

新增：
- 新增：多页远程背包系统，每页最多 54 个槽位
- 新增：GUI 主页，显示所有背包缩略图（物品数量、槽位占用）
- 新增：编辑模式和只读模式，完整的并发访问锁定机制
- 新增：Vault 经济集成，购买新背包页，支持价格递增公式
- 新增：基于权限的背包页数控制（`ultibag.pages.N`）
- 新增：管理员命令（查看、创建、删除、清空、列出玩家背包）
- 新增：自动保存功能（定时保存、关闭 GUI 时保存、退出时保存）
- 新增：可配置的音效系统（打开、关闭、购买、错误音效）
- 新增：锁超时机制，防止异常退出导致死锁
- 新增：退出时自动释放所有锁并保存数据
- 新增：中文和英文双语言支持
