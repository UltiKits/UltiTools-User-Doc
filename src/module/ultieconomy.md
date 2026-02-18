# UltiEconomy - 经济系统

UltiEconomy 是 UltiTools 框架的经济模块，提供完整的 Vault 经济系统实现。它使用双钱包设计：玩家同时拥有现金（cash）和银行存款（bank）两个独立余额。现金用于日常交易，银行存款可以产生利息。模块内置了转账、存取款、财富排行榜、管理员经济操作等功能，同时作为 Vault 经济提供者（Economy Provider），与所有支持 Vault 的插件（商店、领地、抽奖等）无缝兼容。支持 PlaceholderAPI，可以在记分板、Tab 列表等地方显示玩家余额和排名。

## 安装方式

有两种安装方式：

**方式一：通过 UPM 安装（推荐）**

在服务器控制台或游戏内执行：

```
/upm install UltiEconomy
```

**方式二：手动安装**

1. 下载 `UltiEconomy.jar` 文件
2. 放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

安装后会自动在 `plugins/UltiTools/UltiEconomy/config/config.yml` 生成配置文件。

:::tip
前置依赖：服务器必须已安装 [Vault](https://www.spigotmc.org/resources/vault.34315/) 插件，UltiEconomy 才能正常注册为经济提供者。PlaceholderAPI 为可选依赖。
:::

## 快速上手

安装后无需额外配置，插件会自动注册为 Vault 经济提供者。玩家首次进入服务器时会自动创建账户，初始现金为 1000（可在配置中修改）。

试一试：

```
/money                  # 查看自己的余额
/bank                   # 查看银行存款
/deposit 500            # 存入 500 到银行
/withdraw 200           # 从银行取出 200
/pay Steve 100          # 转账 100 给 Steve
```

管理员可以使用 `/eco` 命令管理玩家经济：

```
/eco check Steve        # 查看 Steve 的余额
/eco give Steve 1000    # 给 Steve 1000 现金
/eco take Steve 500     # 扣除 Steve 500 现金
/eco set Steve 5000     # 设置 Steve 余额为 5000
```

## 命令

所有命令均为玩家专用（标注"控制台可用"的除外）。

### 玩家命令

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/money` | 查看现金余额、银行存款和总资产 | `/money` | `ultieconomy.money` |
| `/bank` | 查看银行存款余额 | `/bank` | `ultieconomy.bank` |
| `/pay <玩家> <金额>` | 转账现金给其他在线玩家 | `/pay Steve 500` | `ultieconomy.pay` |
| `/deposit <金额>` | 将现金存入银行 | `/deposit 1000` | `ultieconomy.deposit` |
| `/withdraw <金额>` | 从银行取出现金 | `/withdraw 500` | `ultieconomy.withdraw` |

命令别名：`/bal`（等同于 `/money`）、`/ck`（等同于 `/deposit`）、`/qk`（等同于 `/withdraw`）

### 管理员命令

以下命令均支持控制台执行，目标玩家不需要在线。

| 命令 | 说明 | 示例 | 权限 |
|------|------|------|------|
| `/eco give <玩家> <金额>` | 给予玩家现金 | `/eco give Steve 1000` | `ultieconomy.admin` |
| `/eco take <玩家> <金额>` | 扣除玩家现金 | `/eco take Steve 500` | `ultieconomy.admin` |
| `/eco set <玩家> <金额>` | 设置玩家现金余额 | `/eco set Steve 5000` | `ultieconomy.admin` |
| `/eco check <玩家>` | 查看玩家的现金、银行存款和总资产 | `/eco check Steve` | `ultieconomy.admin` |

## 权限

| 权限节点 | 说明 | 默认 |
|----------|------|------|
| `ultieconomy.money` | 查看自己的余额 | 所有玩家 |
| `ultieconomy.bank` | 查看银行存款 | 所有玩家 |
| `ultieconomy.pay` | 转账给其他玩家 | 所有玩家 |
| `ultieconomy.deposit` | 存款到银行 | 所有玩家 |
| `ultieconomy.withdraw` | 从银行取款 | 所有玩家 |
| `ultieconomy.admin` | 管理员经济操作（give/take/set/check） | OP |

## 配置

配置文件路径：`plugins/UltiTools/UltiEconomy/config/config.yml`

```yaml
# 新玩家初始现金余额
initial-cash: 1000.0

# 货币显示名称（用于消息文本中）
currency-name: "Coins"

# 货币符号（显示在金额前面，如 $1,000.00）
currency-symbol: "$"

# 银行功能设置
bank:
  enabled: true          # 是否启用银行功能（关闭后 /bank、/deposit、/withdraw 将不可用）
  min-deposit: 100.0     # 最低存款金额
  max-balance: -1        # 银行余额上限（-1 表示无限制）

# 利息设置
interest:
  enabled: true          # 是否启用银行利息
  rate: 0.03             # 每次利息发放的利率（0.03 = 3%）
  interval: 1800         # 利息发放间隔（单位：秒，1800 = 30分钟）
  max-interest: 10000.0  # 单次利息上限（防止超大存款产生过多利息）

# 排行榜设置
leaderboard:
  update-interval: 60    # 排行榜刷新间隔（单位：秒）
  display-count: 10      # 默认显示前几名
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `initial-cash` | 小数 | 1000.0 | 新玩家首次进入服务器时获得的初始现金 |
| `currency-name` | 字符串 | "Coins" | 货币名称，出现在消息和 Vault 查询中 |
| `currency-symbol` | 字符串 | "$" | 货币符号，格式化金额时显示在数字前 |
| `bank.enabled` | 布尔值 | true | 是否启用银行系统（存取款和利息） |
| `bank.min-deposit` | 小数 | 100.0 | 单次最低存款金额，低于此金额的存款会被拒绝 |
| `bank.max-balance` | 小数 | -1 | 银行余额上限，-1 表示无限制 |
| `interest.enabled` | 布尔值 | true | 是否启用银行利息功能 |
| `interest.rate` | 小数 | 0.03 | 利率（每次发放时，利息 = 银行余额 × 利率） |
| `interest.interval` | 整数 | 1800 | 利息发放间隔，单位秒（1800秒 = 30分钟） |
| `interest.max-interest` | 小数 | 10000.0 | 单次利息上限（即使银行余额很大也不会超过这个数） |
| `leaderboard.update-interval` | 整数 | 60 | 排行榜数据缓存刷新间隔，单位秒 |
| `leaderboard.display-count` | 整数 | 10 | 排行榜默认显示的玩家数量 |

## PlaceholderAPI 变量

如果服务器安装了 PlaceholderAPI，UltiEconomy 会自动注册以下占位符，可用于记分板、Tab 列表、聊天格式等插件。

| 占位符 | 说明 | 示例输出 |
|--------|------|----------|
| `%ultieconomy_cash%` | 现金余额（纯数字） | `1000.00` |
| `%ultieconomy_bank%` | 银行存款（纯数字） | `5000.00` |
| `%ultieconomy_total%` | 总资产（现金 + 银行） | `6000.00` |
| `%ultieconomy_cash_formatted%` | 现金余额（带货币符号） | `$1,000.00` |
| `%ultieconomy_rank%` | 财富排名（如果未上榜显示 `-`） | `3` |
| `%ultieconomy_top_name_1%` | 第 1 名玩家名 | `Steve` |
| `%ultieconomy_top_balance_1%` | 第 1 名总资产 | `100000.00` |

`top_name_N` 和 `top_balance_N` 中的 N 是排名序号（从 1 开始），可以用来制作排行榜记分板。

## 使用教程

### 场景一：日常经济流转

你在服务器开了一个小店，需要用到经济系统：

1. 玩家首次进入服务器时自动获得 1000 初始现金
2. 玩家之间可以用 `/pay Steve 200` 直接转账
3. 暂时不用的钱可以用 `/deposit 5000` 存进银行
4. 银行存款每 30 分钟自动产生 3% 的利息（在线时会收到提示消息）
5. 需要现金时用 `/withdraw 1000` 从银行取出

### 场景二：配合商店插件使用

UltiEconomy 注册为 Vault 经济提供者后，所有支持 Vault 的插件（如 ShopGUI+、ChestShop、Essentials 等）会自动使用它管理玩家余额。

需要注意的一点：**Vault 只操作现金余额**。也就是说，当商店插件扣款时，扣的是现金而不是银行存款。如果玩家的现金不够但银行里有钱，需要先用 `/withdraw` 取出来。

### 场景三：设置银行利息

默认配置下，利息功能已经开启。如果你想调整利率或关掉利息功能：

打开 `plugins/UltiTools/UltiEconomy/config/config.yml`，找到 `interest` 部分：

```yaml
interest:
  enabled: true       # 改成 false 可以关掉利息
  rate: 0.03          # 利率，0.03 = 3%，改成 0.05 就是 5%
  interval: 1800      # 发放间隔，1800秒=30分钟
  max-interest: 10000.0  # 单次利息上限
```

修改后执行 `/ul reload` 重载配置即可生效。

利息计算公式：`利息 = 银行余额 × 利率`，但不会超过 `max-interest` 设定的上限。比如银行存了 50 万，利率 3%，计算出的利息是 15000，但因为上限是 10000，所以实际到账 10000。

### 场景四：管理员修正玩家余额

如果有玩家反馈经济数据异常，管理员可以直接修正：

```
/eco check Steve        # 先查看当前余额
/eco set Steve 5000     # 直接设置为正确的金额
```

`/eco` 命令操作的是现金余额。这些命令也可以在服务器控制台执行，且支持离线玩家（只要该玩家之前登录过服务器）。

### 场景五：制作财富排行榜记分板

如果你使用了记分板插件（如 UltiSideBar 或其他 PlaceholderAPI 兼容的记分板插件），可以用以下占位符制作排行榜：

```
排行榜第1名: %ultieconomy_top_name_1% - %ultieconomy_top_balance_1%
排行榜第2名: %ultieconomy_top_name_2% - %ultieconomy_top_balance_2%
排行榜第3名: %ultieconomy_top_name_3% - %ultieconomy_top_balance_3%
我的排名: %ultieconomy_rank%
我的余额: %ultieconomy_cash_formatted%
```

注意：排行榜是按**总资产**（现金 + 银行存款）排序的，不是只看现金。排行榜数据每 60 秒刷新一次（可在配置中调整）。

## 常见问题

**Q: 安装后不生效怎么办？**

A: 检查以下几项：
1. 确保服务器已安装 Vault 插件（UltiEconomy 依赖 Vault 注册经济服务）
2. 确认 JAR 文件放在 `plugins/UltiTools/plugins/` 目录下，不是 `plugins/` 根目录
3. 安装新模块后必须重启服务器，`/ul reload` 只能重载配置文件，不能加载新 JAR
4. 检查控制台是否有报错信息
5. 确认 UltiTools-API 版本不低于 6.2.1

**Q: 改了配置文件没效果？**

A: 修改 `plugins/UltiTools/UltiEconomy/config/config.yml` 后，执行 `/ul reload` 即可重载配置。确保没有破坏 YAML 格式（缩进用空格不要用 Tab）。

**Q: 权限怎么设置？**

A: 所有 UltiEconomy 权限节点（permission node，控制谁能用什么命令）都以 `ultieconomy.` 开头。推荐用 LuckPerms 权限插件管理：

```
/lp group default permission set ultieconomy.money true
/lp group default permission set ultieconomy.pay true
/lp group admin permission set ultieconomy.admin true
```

基本权限（money、bank、pay、deposit、withdraw）默认对所有玩家开放，管理权限（admin）默认只有 OP。

**Q: Vault 操作的是哪个余额？**

A: Vault API 只操作**现金余额**。银行存款是 UltiEconomy 的私有功能，只能通过 `/deposit`、`/withdraw`、`/bank` 命令访问。当其他插件（商店、领地、抽奖等）通过 Vault 扣钱或加钱时，操作的都是现金。如果玩家"余额不足"但银行里有钱，需要先取出来。

**Q: 利息功能的细节是什么？**

A: 利息按固定时间间隔（默认 30 分钟）自动发放给所有有银行存款的玩家（不需要在线）。在线玩家会收到绿色提示消息。利息计算公式：银行余额 × 利率，但不超过单次上限。关闭利息：在配置中设置 `interest.enabled: false`。

**Q: 转账有什么限制？**

A: 转账（`/pay`）的限制：金额必须大于零，不能给自己转账，现金余额必须够。转账操作是原子性的（atomic，意思是要么双方都成功，要么都不变），不用担心中途出错导致钱丢失。

**Q: 数据存在哪里？**

A: 玩家账户数据存储在 UltiTools-API 配置的数据库中（SQLite、MySQL 或 JSON，取决于 UltiTools 的全局数据库设置）。表名为 `economy_accounts`。

## 更新日志

### v1.0.0

首次发布。

新增：完整的 Vault 经济提供者实现（UUID 模式）
新增：双钱包系统（现金 + 银行存款）
新增：转账功能（`/pay`），支持玩家间即时转账
新增：银行存取款（`/deposit`、`/withdraw`），可配置最低存款和余额上限
新增：银行利息系统，按固定间隔自动发放利息
新增：财富排行榜，按总资产排序，定时缓存刷新
新增：管理员命令（`/eco give/take/set/check`），支持控制台和离线玩家
新增：PlaceholderAPI 集成，7 种占位符支持（余额、排名、排行榜）
新增：玩家首次登录自动创建账户并发放初始现金
新增：中文和英文语言支持
