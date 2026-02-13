# UltiBackup - 背包备份

UltiBackup 是 UltiTools 框架的一个模块，为 Minecraft 服务器提供完整的玩家背包备份与恢复功能。它可以自动在玩家死亡、退出或按固定间隔时创建背包快照，包括主背包、装备栏（Armor）、副手、末影箱（Ender Chest）和经验值。每个备份都带有 SHA-256 校验和（Checksum），确保数据完整性。恢复时如果校验不通过，会弹出确认页面让你选择是否强制恢复。所有操作都可以通过 GUI 界面或命令完成，支持分页浏览、预览备份内容、管理员查看和操作其他玩家的备份。

## 安装

有两种安装方式：

**方式一：通过 UltiTools 插件管理器安装**

在服务器控制台或游戏内输入：

```
/upm install UltiBackup
```

**方式二：手动安装**

1. 下载 `UltiBackup.jar` 文件
2. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

安装完成后，配置文件会自动生成在 `plugins/UltiTools/UltiBackup/config/backup.yml`。

## 快速开始

安装后不需要任何额外配置就能直接使用。默认配置已经开启了自动备份功能：

1. 玩家死亡时自动备份
2. 玩家退出时自动备份
3. 每 30 分钟自动备份一次所有在线玩家

玩家只需要输入 `/backup` 就能打开 GUI 管理界面，查看自己的所有备份。

试一试：

```
/backup create     # 手动创建一个备份
/backup list       # 查看最近的备份列表
/backup            # 打开 GUI 管理界面
```

在 GUI 界面中：
- 左键点击某个备份可以恢复
- Shift+左键可以预览备份内容（不会恢复）
- 右键点击可以删除备份

## 命令

所有命令都只能由玩家在游戏内执行，不支持控制台。

命令别名：`/backup`、`/invbackup`、`/bk`

### 玩家命令

| 命令 | 说明 | 示例 | 权限 | 冷却 |
|------|------|------|------|------|
| `/backup` | 打开备份管理 GUI | `/backup` | `ultibackup.use` | 无 |
| `/backup list` | 列出最近 5 个备份 | `/backup list` | `ultibackup.use` | 无 |
| `/backup create` | 手动创建一个备份 | `/backup create` | `ultibackup.create` | 30 秒 |
| `/backup restore <编号>` | 恢复指定编号的备份 | `/backup restore 1` | `ultibackup.use` | 30 秒 |
| `/backup restore <编号> force` | 强制恢复（跳过校验和验证） | `/backup restore 2 force` | `ultibackup.use` | 30 秒 |
| `/backup help` | 显示帮助信息 | `/backup help` | `ultibackup.use` | 无 |

### 管理员命令

| 命令 | 说明 | 示例 | 权限 | 冷却 |
|------|------|------|------|------|
| `/backup saveall` | 备份所有在线玩家 | `/backup saveall` | `ultibackup.admin` | 60 秒 |
| `/backup admin <玩家>` | 打开指定玩家的备份 GUI | `/backup admin Steve` | `ultibackup.admin` | 无 |
| `/backup admin create <玩家>` | 为指定玩家创建备份 | `/backup admin create Steve` | `ultibackup.admin` | 30 秒 |

## 权限

### 玩家权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultibackup.use` | 使用备份基础功能（打开 GUI、查看列表、恢复备份） | 所有玩家 |
| `ultibackup.create` | 创建手动备份 | 所有玩家 |
| `ultibackup.delete` | 删除备份（在 GUI 中右键点击） | 所有玩家 |
| `ultibackup.auto` | 享受自动备份（死亡/退出/定时） | 所有玩家 |

### 管理员权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultibackup.admin` | 管理员权限（查看/创建他人备份、批量备份） | OP |

## 配置

配置文件路径：`plugins/UltiTools/UltiBackup/config/backup.yml`

```yaml
# 自动备份设置
auto_backup:
  enabled: true        # 是否启用自动备份
  interval: 30         # 自动备份间隔（单位：分钟，范围：1-1440）
  on_death: true       # 玩家死亡时自动备份
  on_quit: true        # 玩家退出时自动备份

# 每个玩家最多保留的备份数量（单位：个，范围：1-1000）
# 超出上限时自动删除最旧的备份
max_backups_per_player: 10

# 备份内容设置
backup_armor: true       # 是否备份装备栏（头盔、胸甲、护腿、靴子、副手）
backup_enderchest: true  # 是否备份末影箱
backup_exp: true         # 是否备份经验等级和经验进度
```

## 使用教程

### 场景一：死亡后恢复背包

小明在探险时不幸掉入岩浆，物品全部消失。幸好 UltiBackup 在死亡时自动创建了备份。

1. 小明复活后输入 `/backup` 打开 GUI
2. 在 GUI 中找到标记为「死亡备份」的最新备份
3. 左键点击该备份，物品就恢复到死亡前的状态了

如果想先看看备份里有什么，可以 Shift+左键点击进入预览模式，预览界面有三个标签页：背包、护甲、末影箱。

### 场景二：管理员帮玩家恢复物品

玩家小红反馈物品丢失，管理员需要帮她恢复。

1. 管理员输入 `/backup admin 小红` 打开小红的备份 GUI
2. 浏览小红的备份列表，找到合适的时间点
3. Shift+左键预览确认内容无误
4. 左键点击恢复

注意：恢复操作会通知目标玩家「管理员 XXX 已恢复你的背包备份」。

### 场景三：校验和验证失败

恢复时如果看到红色警告「备份文件校验失败」，说明备份文件可能被手动修改过或损坏。

- 你可以使用命令 `/backup restore <编号> force` 强制恢复
- 或者在 GUI 中操作时，系统会弹出一个确认页面，提示风险并让你选择是否继续
- 强制恢复可能导致物品数据异常，请谨慎操作

### 场景四：批量备份所有在线玩家

服务器即将进行大版本更新，管理员想先备份所有人的背包：

```
/backup saveall
```

这会为所有在线且拥有 `ultibackup.auto` 权限的玩家创建备份。

### 场景五：查看备份列表（命令方式）

如果不想打开 GUI，可以用命令快速查看：

```
/backup list
```

输出示例：
```
=== 你的备份 ===
1. 2026-02-13 14:30:22 手动备份
2. 2026-02-13 14:00:00 自动备份
3. 2026-02-13 13:45:10 死亡备份
... 还有 2 个备份
```

然后用 `/backup restore 3` 恢复第 3 个备份。

## 备份存储说明

UltiBackup 采用冷热数据分离的存储方式：

- **元数据**（备份时间、原因、位置、校验和等）存储在数据库中，由 UltiTools-API 的存储后端决定（SQLite/MySQL/JSON）
- **备份内容**（物品数据）存储为 YAML 文件，路径为 `plugins/UltiTools/backups/{玩家UUID}_{时间戳}.yml`

每个备份文件的开头有一个 SHA-256 校验和，用来验证文件是否被篡改。备份文件头部会有如下警告：

```
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# DO NOT MODIFY THIS FILE! 请勿修改此文件！
# Any modification will cause checksum verification failure
# 任何修改都会导致校验和验证失败，备份将无法恢复
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
```

备份原因类型：

| 原因 | 触发方式 |
|------|----------|
| MANUAL | 玩家手动执行 `/backup create` |
| AUTO | 定时自动备份（默认每 30 分钟） |
| DEATH | 玩家死亡时自动触发 |
| QUIT | 玩家退出服务器时自动触发 |
| ADMIN | 管理员通过 `/backup admin create` 触发 |

## 常见问题

**Q: 安装后不生效怎么办？**

A: 检查以下几点：
1. 确保 UltiTools-API 版本是 6.2.0 或更高
2. 确认 JAR 文件放在了 `plugins/UltiTools/plugins/` 目录，不是 `plugins/` 根目录
3. 安装后需要重启服务器，`/ul reload` 只能重载配置，不能加载新的模块 JAR
4. 查看服务器控制台是否有报错信息

**Q: 改了配置文件没效果？**

A: 修改 `plugins/UltiTools/UltiBackup/config/backup.yml` 后，执行 `/ul reload` 重载配置即可。注意不要修改 YAML 的缩进格式。

**Q: 权限怎么设置？**

A: UltiBackup 的权限节点都以 `ultibackup.` 开头。推荐使用 LuckPerms 等权限插件来管理。基础权限 `ultibackup.use`、`ultibackup.create`、`ultibackup.delete`、`ultibackup.auto` 默认所有玩家都有，管理员权限 `ultibackup.admin` 默认只有 OP 才有。

示例（LuckPerms）：
```
/lp group default permission set ultibackup.use true
/lp group admin permission set ultibackup.admin true
```

**Q: 备份文件存在哪里？怎么手动备份数据？**

A: 备份文件（YAML 格式）存储在 `plugins/UltiTools/backups/` 目录。元数据在数据库中。如果要手动备份整个系统，你需要同时备份 `backups/` 目录和数据库文件。

**Q: 自动备份会影响服务器性能吗？**

A: 影响很小。手动创建备份（`/backup create`）和批量备份（`/backup saveall`）使用异步执行，不会卡住主线程。死亡和退出时的备份在事件回调中同步执行，但物品序列化操作本身很快。

**Q: 为什么有些备份恢复时提示校验失败？**

A: 备份文件（`backups/` 目录下的 YAML 文件）被手动编辑或损坏了。每个备份文件头部都有 SHA-256 校验和，任何修改都会导致校验不通过。如果你确认内容没问题，可以使用 `force` 参数或在 GUI 确认页面中选择强制恢复。

**Q: 达到备份上限后会怎样？**

A: 当某个玩家的备份数量超过 `max_backups_per_player` 的设定值（默认 10），系统会自动删除最旧的备份。删除时会同时清理数据库中的元数据和磁盘上的 YAML 文件。

## 更新日志

### v1.0.0 (2026-02-13)

初始版本发布。

新增：
- 新增：完整的背包备份功能，支持主背包、装备栏、副手、末影箱、经验值
- 新增：自动备份功能（定时备份、死亡备份、退出备份）
- 新增：GUI 管理界面，支持分页浏览、恢复、删除
- 新增：备份预览功能，三个标签页（背包/护甲/末影箱）只读查看
- 新增：SHA-256 数据完整性校验，检测文件篡改
- 新增：强制恢复功能，校验失败时可选择跳过验证
- 新增：管理员命令，查看/创建其他玩家的备份
- 新增：批量备份所有在线玩家
- 新增：命令冷却机制，防止滥用
- 新增：自动清理旧备份，超过上限自动删除最旧的
- 新增：中文和英文双语言支持
