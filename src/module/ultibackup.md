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

1. 先安装 UltiTools-API 6.3.0 或更高版本，再下载 `UltiBackup-2.0.0.jar`
2. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

安装完成后，配置文件会自动生成在 `plugins/UltiTools/pluginConfig/UltiBackup/config/backup.yml`。

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

配置文件路径：`plugins/UltiTools/pluginConfig/UltiBackup/config/backup.yml`

```yaml
# 自动备份设置
auto_backup:
  enabled: true        # 是否启用自动备份
  interval_seconds: 1800  # 自动备份间隔（秒，1-107374182）；首次备份也等待此间隔
  interval: 30            # 旧分钟键，已弃用，不再控制间隔；仍需在 1-1440 内
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

升级旧配置时，只在现有文件中设置 `auto_backup.interval_seconds`，不要用上面的整份示例覆盖自己的文件。旧的 `interval` 不会自动换算；非默认值会在加载与重载时警告，且它仍按 1-1440 校验，越界会拒绝加载或使模块重载失败。新秒数在 `/ul reload` 后生效，首个定时备份在启动后一个间隔执行；秒数越界时启动拒绝加载，重载保留运行间隔并报告部分完成。

| 配置项 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `auto_backup.enabled` | 布尔 | `true` | 启用定时备份 |
| `auto_backup.interval_seconds` | 整数 | `1800` | 秒，1-107374182 |
| `auto_backup.interval` | 整数 | `30` | 已弃用，仍校验 1-1440 |
| `auto_backup.on_death` / `auto_backup.on_quit` | 布尔 | `true` | 死亡 / 退出备份 |
| `max_backups_per_player` | 整数 | `10` | 保留数量，1-1000 |
| `backup_armor` / `backup_enderchest` / `backup_exp` | 布尔 | `true` | 护甲与副手 / 末影箱 / 经验 |

## 使用教程

### 恢复与删除前要知道的事

`force` 只跳过校验和，不跳过数据解析；损坏或无法读取的物品部分会拒绝恢复，保持背包原样。`backup_armor: false` 或备份本身未保存护甲时，不会覆盖当前护甲与副手；未保存经验的新备份也不会覆盖当前经验，预览显示未备份。旧备份仍恢复它实际保存的经验。删除先删数据库记录再删文件；若控制台报告文件删除失败，应检查该文件而不是以为记录还在。新备份已保存但旧备份清理失败时，新备份仍有效，错误会写入日志。

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
1. 确保 UltiTools-API 版本是 6.3.0 或更高
2. 确认 JAR 文件放在了 `plugins/UltiTools/plugins/` 目录，不是 `plugins/` 根目录
3. 安装后需要重启服务器，`/ul reload` 只能重载配置，不能加载新的模块 JAR
4. 查看服务器控制台是否有报错信息

**Q: 改了配置文件没效果？**

A: 修改 `plugins/UltiTools/pluginConfig/UltiBackup/config/backup.yml` 后，执行 `/ul reload` 重载配置即可。注意不要修改 YAML 的缩进格式。

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

A: `/backup create`、`/backup saveall` 和 `/backup admin create <玩家>` 在命令执行时于主线程读取物品与经验，再在后台写文件和数据库；并非整个命令异步。死亡、退出和定时备份仍同步执行，备份量大或磁盘较慢时应观察服务器耗时，不能保证完全没有影响。

**Q: 为什么有些备份恢复时提示校验失败？**

A: 备份文件（`backups/` 目录下的 YAML 文件）被手动编辑或损坏了。每个备份文件头部都有 SHA-256 校验和，任何修改都会导致校验不通过。如果你确认内容没问题，可以使用 `force` 参数或在 GUI 确认页面中选择强制恢复。

**Q: 达到备份上限后会怎样？**

A: 当某个玩家的备份数量超过 `max_backups_per_player` 的设定值（默认 10），系统会自动删除最旧的备份。删除时会同时清理数据库中的元数据和磁盘上的 YAML 文件。

## 更新日志

### v2.0.0

#### 变更

- 要求使用已发布的 UltiTools-API 6.3.0 依赖。这是相对于当前提供的 1.0.0 版本线的独立主版本升级：模块的 UltiTools API
  级别从 620 升至 630，因此管理员必须先升级框架，再替换模块 JAR。模块目录中的标识仍为 `ultibackup`。

- 自动备份现在按新的键 `config/backup.yml` 中的 `auto_backup.interval_seconds` 执行，单位为秒（默认 1800，即与之前相同的
  30 分钟；范围 1 到 107374182）。间隔由 UltiTools 6.3.0 的配置绑定调度负责：修改后的值在 `/ul reload` 时生效，下一次备份
  不会因此提前或推迟到新间隔允许的范围之外；超出范围的值会被拒绝，保持当前运行的间隔，并将重载报告为部分完成。第一次自动备份
  仍在模块启动后一个间隔时执行。旧的分钟键 `auto_backup.interval` 不再生效，也从不被改写或换算，因为把 `30` 当作秒读取
  将意味着每 30 秒备份一次。若它不是默认值 30，模块会在加载时以及每次 `/ul reload` 后按服务器语言警告一次，并指出
  `auto_backup.interval_seconds`。旧键仍按 1-1440 校验，超出范围的值仍会使模块被拒绝加载（见 README 的已知限制）。
  服务器已有的配置文件会在首次启动时加入带默认值的新键，其中已有的内容不会改变。

- 本版本需要 UltiTools 6.3.0 或更高版本，并在 `plugin.yml` 中声明 `api-version: 630`（已发布的 1.0.0 声明的是 `620`）。上述配置绑定调度
  只在 UltiTools 6.3.0 及以上存在：更早的框架会忽略它，只在加载时执行一次自动备份而不是按间隔执行，因此现在更早的框架会
  拒绝加载本模块并记录一条警告。README 中的框架最低版本已改为 UltiTools 6.3.0+（UltiKits/UltiTools-Reborn#544）。

- `plugin.yml` 现在声明 `identify-string: ultibackup`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。

#### 修复

- 删除备份时现在先删除数据库记录、再删除内容文件，数据库删除失败不再留下指向已丢失文件的记录。删除一个记录已不存在的备份
  （例如两名管理员在各自打开的菜单中删除同一个备份）时，现在提示"找不到备份"而不是"备份已删除"；记录删除后若文件无法删除，
  控制台会写出该文件。保存新备份时数据库出错，现在会在查询确认没有写入记录后删除刚写入的备份文件并告知玩家备份失败，不再留下孤立文件且无任何回复；
  若记录其实已写入，或无法确认，则保留文件并在控制台说明；
  新备份保存后清理旧备份出错时只记录日志，不再把已保存的备份报告为失败（UltiKits/UltiBackup#29）。

- 在 `backup_exp: false` 时创建的备份，在之后开启 `backup_exp` 再恢复时，不再把玩家经验重置为 0 级。这类备份现在完全不含经验，
  恢复时保持玩家当前经验不变；其预览中等级显示为未备份。旧版本写出的备份文件仍可加载，并照旧恢复其中的经验
  （UltiKits/UltiBackup#27）。

- `config/backup.yml` 中的自动备份间隔现在会生效。此前无论文件写多少，自动备份都每 30 分钟执行一次：没有任何代码读取
  `auto_backup.interval`。间隔现在由 `auto_backup.interval_seconds` 设置（见上方"Changed"），第一次自动备份在模块启动后
  一个间隔时执行；此前模块启动时就会立即执行一次（UltiKits/UltiBackup#24）。

- `/backup create`、`/backup saveall` 与 `/backup admin create <玩家>` 现在在命令执行时于服务器主线程读取玩家的背包、护甲、副手、
  末影箱与经验，只有写入文件和数据库在后台进行。此前整个命令都在后台运行，备份可能在背包变化的同时读取到不一致的内容
  （UltiKits/UltiBackup#13）。

- 修复：恢复一个物品数据无法读取的备份时，不再清空玩家背包并报告成功；恢复被拒绝，背包保持原样。
  不是合法 YAML、缺少物品栏部分、在结尾之前被截断，或条目不是本模块写入的形式（某部分不是文本、有护甲而无副手条目或反之、经验值缺失或不是数字）的备份文件按加载失败处理；某一部分中超出其所恢复到的物品栏范围的槽位视为无法读取。恢复经验时，负的等级或 0-1 之外的经验进度同样在任何改动之前被拒绝（部分名为 `expLevel` 或 `expProgress`）。控制台会写明备份、玩家和无法读取的部分，
  备份预览遇到无法读取的部分也会同样记录（UltiKits/UltiBackup#21）。

- 修复：没有可恢复的护甲时（`backup_armor: false`，或备份是在该设置为 `false` 时创建的），恢复备份不再销毁玩家
  正穿戴的护甲与副手物品；恢复只替换背包的存储格（UltiKits/UltiBackup#25）。

- 重载本模块（`/ul reload` 或 `/ul reload UltiBackup`）现在会重新读取 `config/backup.yml` 并刷新语言文件，修改后的
  `max_backups_per_player` 等配置无需重启即可对下一次备份生效。此前本模块的重载方法替换了框架的重载方法且
  只输出一行日志，这两步都不会执行，重载报告成功却什么也没有重载。UltiTools 6.3.0 还会在此时执行
  `@ConditionalOnConfig` 漂移检查（本模块没有条件注册的 Bean，因此不会报告任何内容）并输出框架自身的模块重载日志
  （UltiKits/UltiBackup#14）。

- 执行 `/upm uninstall UltiBackup` 后，本模块的命令现在会被真正移除，其监听器也不再触发。此前本模块的卸载
  方法替换了框架的卸载方法且只输出一行日志，因此两者都会一直保持生效，直到服务器重启
  （UltiKits/UltiBackup#14）。

- `/backup list`、备份浏览界面物品说明和备份预览信息面板现在按服务器的 `language` 用语言文件中的文字标注
  每个备份的原因（`死亡备份`、`退出备份`、`自动备份`、`手动备份`、`管理员备份`，缺失或无法识别时为 `未知`）。
  此前三处都显示存储的常量（`DEATH`、`QUIT`、`AUTO`、`MANUAL`、`ADMIN` 或 `UNKNOWN`），不随语言变化，
  六个 `backup.reason.*` 语言键从未被使用（UltiKits/UltiBackup#15）。

- 本模块的九条控制台日志现在取自语言文件，随框架的 `language` 设置变化：启用日志、备份已创建、备份创建失败、
  备份校验和无法读取、备份内容无法加载、恢复成功、恢复失败、自动备份汇总，以及强制恢复警告。此前无论 `language`
  如何设置都是英文；英文措辞不变。

#### 移除

- 移除本模块自身的控制台行 `UltiBackup has been disabled!`（卸载时）和
  `UltiBackup configuration reloaded!`（`/ul reload` 或 `/ul reload UltiBackup` 时）。两者均为英文字面量而非语言键，
  因此语言文件没有变化。UltiTools 6.3.0 会为每个模块输出一行重载日志（`Module 'UltiBackup' reloaded.`）（UltiKits/UltiBackup#14）。


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
