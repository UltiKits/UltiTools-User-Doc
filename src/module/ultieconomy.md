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

1. 先安装 UltiTools-API 6.3.0 或更高版本，再下载 `UltiEconomy-3.0.0.jar`
2. 放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

安装后会自动在 `plugins/UltiTools/pluginConfig/UltiTools-Economy/config/config.yml` 生成配置文件。

:::tip
前置依赖：服务器必须已安装 [Vault](https://www.spigotmc.org/resources/vault.34315/) 插件，UltiEconomy 才能正常注册为经济提供者。PlaceholderAPI 为可选依赖。
:::

## 升级到 3.0.0 前

先升级 UltiTools-API 至 6.3.0 或更高版本，备份经济数据库与配置；共用数据库时先停掉所有仍运行 2.0.0 的服务器，之后不要再让旧版本连接它。新 JAR 放在 `plugins/UltiTools/plugins/` 后完整重启；不要用整份新配置覆盖原文件。

首次启动会尝试把第二个主货币钱包的现金和存款并入账户钱包，仅删除成功合并的第二钱包。若总和无法被精确存储，该玩家的第二钱包原样保留并警告，模块仍启动，命令与 Vault 只使用账户钱包；查看总计中的未合并人数，交由运维处理，之后启动仍可能发现这些钱包。重复发放过的初始金额仍保留在流通中。查看逐玩家及总计日志；存储失败时模块不启动，修复存储后重启续做，不要手工编辑合并记录。多服共享 SQLite/MySQL 时会认领合并，其余服等待，认领中断后 30 秒可接手。JSON 文件不能由多服共享，写文件中止仍有文件损坏风险。合并后存款可能超过银行上限，此时存款和利息受上限阻止。

重点检查旧文件：`interest.enabled: true` 现在会真的付息，默认每 1800 秒发 3%，会产生新货币；若不想开启，设 false 后 `/ul reload UltiTools-Economy`。共享数据库只能在一台服开启利息。旧 `tax.enabled: false` 现在会阻止所有转账税；若要保留税收，设 true 后同样重载。新默认 false（利息）和 true（税收）不会覆盖文件中已有值。利息与排行榜间隔均必须为 1-107374182 秒，非法值在启动时拒绝整个模块（含 Vault），即使利息关闭也一样；重载则保留运行间隔并警告。

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

配置文件路径：`plugins/UltiTools/pluginConfig/UltiTools-Economy/config/config.yml`

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
  enabled: false         # 是否发放利息；升级旧文件的 true 不会被自动改为 false
  rate: 0.03             # 每次利息发放的利率（0.03 = 3%）
  interval: 1800         # 利息发放间隔（单位：秒，1800 = 30分钟）
  max-interest: 10000.0  # 单次利息上限（防止超大存款产生过多利息）

# 排行榜设置
leaderboard:
  update-interval: 60    # 排行榜刷新间隔（单位：秒）

# 转账税
tax:
  enabled: true
  transaction-tax:
    enabled: true
    rate: 0.05  # 5%；范围 0-1
    exempt-permission: "ultieconomy.tax.exempt"
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
| `interest.enabled` | 布尔值 | false | 是否发放利息；已有文件以其现值为准 |
| `interest.rate` | 小数 | 0.03 | 利率（每次发放时，利息 = 银行余额 × 利率） |
| `interest.interval` | 整数 | 1800 | 利息发放间隔，单位秒（1800秒 = 30分钟） |
| `interest.max-interest` | 小数 | 10000.0 | 单次利息上限（即使银行余额很大也不会超过这个数） |
| `leaderboard.update-interval` | 整数 | 60 | 排行榜数据缓存刷新间隔，单位秒 |
| `tax.enabled` | 布尔值 | true | 全部税收总开关 |
| `tax.transaction-tax.enabled` | 布尔值 | true | 转账税开关 |
| `tax.transaction-tax.rate` | 小数 | 0.05 | 税率，范围 0-1 |
| `tax.transaction-tax.exempt-permission` | 字符串 | `ultieconomy.tax.exempt` | 付款人免税权限 |

`interest.rate` 与转账税率范围 0-1，非法值警告并回退至 0.03 / 0.05。`interest.max-interest` 默认 10000，-1 或 0 都不设单次上限；其他负数和无穷值回退默认，禁用利息应使用开关而不是 0 上限。银行上限只接受 -1 或正数，0 不是禁用银行，而会警告并回退为无限。旧 `leaderboard.display-count` 与三个 `tax.wealth-tax.*` 键不再使用，可逐行删除；前 N 名由各占位符自身的 N 指定。

### 多货币文件与命令

`plugins/UltiTools/pluginConfig/UltiTools-Economy/config/currencies.yml` 的完整出厂示例如下。主货币的名称、符号和钱包设置以 `config.yml` 为准，修改此处主货币同名设置不会覆盖它；不同值会在启动时警告。其他货币各有独立钱包；编辑此文件后重启加载。

```yaml
currencies:
  coins:
    display-name: 'Coins'
    symbol: '$'
    initial-cash: 1000.0
    bank-enabled: true
    min-deposit: 100.0
    max-bank-balance: -1
    primary: true
```

`/money`、`/bank` 可追加货币名，`/pay`、`/deposit`、`/withdraw` 和管理员 give/take/set/check 也可在末尾追加货币名，如 `/money coins`、`/pay Steve 100 coins`。coins 主货币与不带货币参数及 Vault 看到的是同一钱包，不再各有一份。未知货币会在余额变动前被拒绝。

| 命令 | 示例 | 权限 | 执行者 |
|---|---|---|---|
| `/note <amount> [currency]` | `/note 100 coins` | `ultieconomy.note` | 玩家 |
| `/note redeem` | `/note redeem` | `ultieconomy.note` | 玩家，手持纸币 |
| `/eco treasury` | `/eco treasury` | `ultieconomy.admin` | 玩家或控制台 |
| `/eco treasury withdraw <amount> [currency]` | `/eco treasury withdraw 100 coins` | `ultieconomy.admin` | 玩家或控制台 |

纸币也可手持右键兑换。移除货币后其纸币不能兑换但会保留，加回货币后可再次兑换；旧纸币按存储数据识别，旧名称不妨碍兑换。转账税默认 5%，付款人有 `ultieconomy.tax.exempt` 时免税；默认未豁免的 `/pay Steve 100` 收款人实际得 95，双方提示实际到账额。国库取款只减少国库余额，不是自动存入执行者的钱包。

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
4. 新安装默认不发利息；明确开启后，默认每 30 分钟发放 3%（受单次及银行上限约束，在线玩家入账后收到提示）
5. 需要现金时用 `/withdraw 1000` 从银行取出

### 场景二：配合商店插件使用

UltiEconomy 注册为 Vault 经济提供者后，所有支持 Vault 的插件（如 ShopGUI+、ChestShop、Essentials 等）会自动使用它管理玩家余额。

需要注意的一点：**Vault 只操作现金余额**。也就是说，当商店插件扣款时，扣的是现金而不是银行存款。如果玩家的现金不够但银行里有钱，需要先用 `/withdraw` 取出来。

### 场景三：设置银行利息

新安装默认关闭利息；旧文件中的 true 会保持且从本版开始真实付息。若明确要开启或调整利率，可编辑以下部分（此例主动开启，不是出厂默认）：

打开 `plugins/UltiTools/pluginConfig/UltiTools-Economy/config/config.yml`，找到 `interest` 部分：

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

### 自定义语言与已知限制

消息键已改为 `economy.money.header` 等 ASCII 标识。如果有自定义语言，把对应修改迁移到新键；推荐复制官方文件为 `lang/zh-myserver.json`，在框架 `plugins/UltiTools/config.yml` 选择 `language: zh-myserver`。缺少的键回退到文件名前缀对应的官方语言，不带官方语言前缀的自定义文件缺键时回退英文并警告。不要直接改 `lang/zh.json` 或 `lang/en.json`：启动及模块重载会恢复官方文件并将改过的文件保留为 `.bak`。未自定义的服无需处理。日志过滤器应匹配 `[UltiTools-Economy]` 而不是旧的额外 `UltiEconomy: `。

MariaDB 的条件写入尚未验证；转账跨扣款和入账不具备进程中止时的原子保证。不要共享 JSON 数据文件，不要运行中手改内部经济或钱包合并记录，也不要让 2.0.0 与本版共用数据库。这些是仍存在的限制，不是 3.0.0 宣称已修复的内容。

## 常见问题

**Q: 安装后不生效怎么办？**

A: 检查以下几项：
1. 确保服务器已安装 Vault 插件（UltiEconomy 依赖 Vault 注册经济服务）
2. 确认 JAR 文件放在 `plugins/UltiTools/plugins/` 目录下，不是 `plugins/` 根目录
3. 安装新模块后必须重启服务器，`/ul reload` 只能重载配置文件，不能加载新 JAR
4. 检查控制台是否有报错信息
5. 确认 UltiTools-API 版本不低于 6.3.0

**Q: 改了配置文件没效果？**

A: 修改 `plugins/UltiTools/pluginConfig/UltiTools-Economy/config/config.yml` 后，执行 `/ul reload` 即可重载配置。确保没有破坏 YAML 格式（缩进用空格不要用 Tab）。

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

A: 只有 `interest.enabled: true` 才付息，新安装默认为 false。开启后按配置间隔（默认 30 分钟）发放给有正银行余额的账户（不需要在线），主货币只对账户钱包计一次，其他启用银行的货币分别计息。在线玩家会收到绿色提示消息。利息计算公式：银行余额 × 利率，但不超过单次上限。关闭利息：在配置中设置 `interest.enabled: false`。

**Q: 转账有什么限制？**

A: `/pay` 金额必须大于零、不能给自己转账、对方须在线且现金足够。接收方入账失败时尝试退还发送方，退款也失败则日志列出双方、金额和货币供管理员恢复；不能承诺跨两次写入的原子性：扣款后、入账前服务器进程中止仍可能丢失金额。共享数据库的竞争会重读重试，持续竞争提示稍后再试，不误报余额不足。

**Q: 数据存在哪里？**

A: 玩家账户数据存储在 UltiTools-API 配置的数据库中（SQLite、MySQL 或 JSON，取决于 UltiTools 的全局数据库设置）。表名为 `economy_accounts`。

## 更新日志

### v3.0.0

移除：旧 Unreleased 记录中的 22 条未被任何代码显示的语言条目已随消息键整理移除；这不是额外的玩家功能变更，也不改变实际显示内容。自定义消息请按下方新语言键规则迁移。

#### 变更

- 启动和重载时的警告不再自带第二个 `UltiEconomy: ` 前缀；框架已在本模块的每一行日志前写上 `[UltiTools-Economy] `。
  匹配旧 `UltiEconomy: ` 文本的日志过滤器应改为匹配 `[UltiTools-Economy]`。

- 语言键已从中文句子改为 ASCII 键（例如 `economy.money.header`）。如果你在自己的语言文件中自定义过本模块的消息——即把官方文件复制一份，文件名以该文件的语言代码加连字符开头
  （例如 `lang/zh-myserver.json`），并在 `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver` 选择它——请把改动重新套到新键上；
  在此之前，改名的消息显示文件名开头那种官方语言的文本。文件名不以官方语言代码加连字符开头的副本仍会被读取，但其中缺少的消息
  都显示英文，并记录一条警告。
  直接在官方语言文件（`lang/en.json`、`lang/zh.json`）中做的修改不会保留：框架会在每次启动以及每次模块重载时恢复官方文件，并把修改过的文件
  保留为 `.bak`（UltiKits/UltiTools-Reborn#616）。从未自定义过消息的服务器无需任何操作。

- **需要 UltiTools 6.3.0。** `plugin.yml` 将 `api-version` 从已发布的 2.0.0 中的 `620` 提高到 `630`。
  利息发放与排行榜刷新通过 UltiTools 6.3.0 新增的框架功能
  （UltiKits/UltiTools-Reborn#531）从 `interest.interval` 与 `leaderboard.update-interval` 读取间隔。UltiTools 6.2.x
  会因该 `api-version` 拒绝加载本模块。

- `plugin.yml` 现在声明 `identify-string: ultieconomy`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者（UltiKits/UltiTools-Reborn#474）。

- 已发布的 2.0.0 为何是这个版本号（UltiKits/UltiEconomy#3）。模块版本号遵循 UltiKits/UltiTools-Dev-Doc#7（版本号规范）及其在
  UltiKits/UltiTools-Dev-Doc#12 中的判据清单：看的是服主换 JAR 之后要做什么，而抬高 `api-version` 地板属于 MAJOR，
  因为服主必须先升级 UltiTools。2.0.0 的 JAR 已经引用了只存在于 UltiTools 6.2.1 起的框架符号
  （`DataOperator.insert` 与 `DataOperator.update` 自 6.2.1 起接收 `BaseDataEntity`，6.2.0 中接收 `AbstractDataEntity`），
  实际上把地板抬到了其 `plugin.yml` 所声明的 `620` 之上。仅就多货币的新增内容（带默认值的配置项、自动建表、可选的货币参数）
  本应是 MINOR。因此已发布的 2.0.0 保留其版本号，不会降回；模块版本只增不减。3.0.0 将 `api-version` 从
  `620`（2.0.0 发布时的声明）提高到 `630`，按同一规则属于 MAJOR 变更。

- **升级后果——可能开始发放利息。** `config/config.yml` 中的 `interest.enabled` 现在生效
  （UltiKits/UltiEconomy#15）。此前从未有任何代码调度利息发放，因此无论该键如何设置，任何服务器上都从未发放过利息。
  1.0.0 与 2.0.0 的出厂文件都写的是 `interest.enabled: true`，所以所有运行过其中任一版本的服务器，除非运维改过，文件里都是 `true`——
  **这样的服务器升级后开始发放利息，这会凭空产生货币**：每 `interest.interval` 秒（模块加载后满一个间隔首次发放），
  玩家的主货币银行余额——即 `/bank`、`/money`、`/eco check <玩家>` 与 Vault 显示的那一个，`/bank <主货币>` 显示的也是它；
  每名玩家只计一次，不会再对任何残留的旧主货币记录重复计息（UltiKits/UltiEconomy#25）——以及其在 `config/currencies.yml`
  中其他所有 `bank-enabled: true` 货币的银行余额，各自获得其自身
  `interest.rate`（默认 `0.03`，即 3%）的利息，仅在 `interest.max-interest` 大于 0 时按其限制单次利息（默认 `10000.0`；
  `0` 与 `-1` 均表示不设单次上限，而不是停发利息），
  且不会使余额超过其银行上限（`bank.max-balance`，或该货币自己的 `max-bank-balance`，大于 0 时生效——已达上限的余额不再获得利息），
  利息写入成功后在线玩家才会收到聊天提示。**若多台服务器共用同一个数据库，每台开启利息的服务器都会对其中每个余额按全额利率发放：
  请只在其中一台上开启利息。** 以文件中的值为准。该值为 `true` 时，本模块每次启动都会记录一条 WARNING，点名利率、间隔、上限与共用数据库的规则。
  `/ul reload UltiTools-Economy` 会应用修改后的 `interest.interval` 并保持发放节拍：下一次发放 = 上一次发放（首次发放前则为模块加载时刻）
  加新间隔，若该时刻已过则立即发放——重载既不会提前发放，也不会推迟发放。**生效的是你文件里的间隔。** 1.0.0 与 2.0.0 出厂写的是
  `interest.interval: 1800`（30 分钟），但从未被读取；你文件中的值——例如改过的 `60`，即每分钟发放一次——自本版本起生效，
  `1800` 只是缺少该键的文件得到的值。小于 1 或大于 107374182 的值在加载时使**整个经济模块**拒载并点名该键——包括 Vault 经济提供者，
  所有使用 Vault 的插件都会失去它，`/money`、`/pay` 等命令也不可用，即使 `interest.enabled` 为 `false` 也是如此——直到修正该值并重启服务器；
  在 `/ul reload` 时则不生效，保留正在使用的间隔并记录一条点名该键的 WARNING。
  若不想发放利息，请设置 `interest.enabled: false` 并执行 `/ul reload UltiTools-Economy`；该开关在每次发放时读取，
  下一次发放即被跳过。声明默认值与出厂文件现均为 `false`，只影响尚未包含该键的文件。

- **升级后果——转账税可能停止征收。** `config/config.yml` 中的 `tax.enabled` 现在生效，作为全部税收的总开关：
  其为 `false` 时，`/pay` 不收取交易税，也不向国库存入任何金额，无论 `tax.transaction-tax.*` 如何设置
  （UltiKits/UltiEconomy#16）。此前没有任何代码读取该键，只要 `tax.transaction-tax.enabled` 为 true，
  转账就按 `tax.transaction-tax.rate`（默认 5%）征税。该键不在出厂文件中，而框架会在首次启动时把缺失的键按
  其声明默认值写入运维的文件；在加入税收设置的 2.0.0 版本中，该默认值为 `false`，因此所有运行过 2.0.0 的服务器，
  除非运维改过，文件里都是 `tax.enabled: false`——**这样的服务器升级后，转账税停止征收。** 以文件中的值为准。该值为 `false` 时，
  本模块每次启动都会记录一条 WARNING 说明这一点。若要继续对转账征税，请设置 `tax.enabled: true` 并执行
  `/ul reload UltiTools-Economy`；该开关在每次转账时读取。声明默认值现为 `true`，只影响尚未包含该键的文件。

- **主货币现在只有一个钱包**（UltiKits/UltiEconomy#25）。自 2.0.0 起，每位玩家还有第二个主货币钱包，首次进服时按其自身的
  初始金额入账。带货币名的命令与占位符——`/money coins`、`/bank coins`、`/pay <玩家> <金额> coins`、`/deposit <金额> coins`、
  `/withdraw <金额> coins`、`/eco give|take|set|check <玩家> … coins`、`/note <金额> coins`、`%ultieconomy_coins_*%` 以及
  `coins` 排行榜——使用的是这第二个钱包，而 Vault、`/money`、`/pay`、`/bank` 使用账户钱包。现在它们全部使用账户钱包，
  新玩家首次进服只获得一次 `initial-cash`。主货币的初始金额、银行开关（存款与取款都受其约束）、最低存款与银行上限读取 `config/config.yml`；
  `config/currencies.yml` 中主货币条目的 `initial-cash`、`bank-enabled`、`min-deposit`、`max-bank-balance` 不再被读取
  （显示名称和符号也取自 `config/config.yml` 的 `currency-name` 与 `currency-symbol`，而非该条目的 `display-name` 与 `symbol`）。
  其他货币仍各自拥有独立的钱包。

- **升级后果——第二钱包在可合并时并入**（UltiKits/UltiEconomy#25）。升级后首次启动时，在任何余额可以被读取或变动之前，模块会尝试将每位玩家的
  第二个主货币钱包并入其账户钱包——现金并入现金，存款并入存款——成功合并的第二钱包随后删除。若总和无法被精确存储，该玩家的金额不会被转移：
  模块记录警告，保留第二钱包等待运维处理。模块仍会启动，主货币命令与 Vault 使用账户钱包，而非未合并的第二钱包。
  服务器日志为每位被合并的玩家记录一行（含金额与合并后余额），并记录包含未合并人数的一行总计。
  之后的启动仍可能发现未合并的钱包；只有没有残留时才无内容可合并。没有人的余额会减少：第二钱包中低于零的金额（本模块的任何命令都无法产生）不会从账户扣除，
  并会记入日志。合并后的存款可能高于 `bank.max-balance`；此后存款与利息照旧在上限处停止。**已知取舍：** 2.0.0 重复发放的初始金额会继续流通——
  在一台 103 名玩家的测试服务器上，共并入 103,588.95，其中 101,000 是从未动用的重复初始金额。若合并过程中存储出错，模块不会启动
  （因此任何余额都不会变化）；修复存储后重启，合并会从中断处继续，不会重复并入。使用 SQLite 与 MySQL 时，
  在合并过程中的任何时刻停止服务器都是安全的；使用 JSON 存储时同样安全，只是在某个玩家的文件正被改写时停止，可能使该文件无法读取——
  这是 JSON 存储每次保存都存在的风险。**多台服务器共用一个数据库时**可以同时启动：其中一台执行合并——它先取得认领，即新表
  `economy_wallet_merge_claim` 中的一行，合并完成后由它删除——其余服务器等待它完成（每 10 秒记录一次正在等待），随后启动且不再重复合并。
  若执行合并的服务器中途停止，下一台服务器会在 30 秒后接手认领并完成合并，不会重复并入。启动第一台升级后的服务器之前，
  请停止所有仍在运行 2.0.0 的服务器，此后也不要再让 2.0.0 连接该数据库——2.0.0 服务器会给每位进服玩家新建一个第二钱包，
  下次启动时会被当作更多的钱并入，而且它不参与认领。JSON 存储根本无法由两台服务器共用（每台服务器各自保留一份记录副本）。
  某位玩家的合并进行期间，其第二钱包记录的 `currency_id` 以 `~merging-into-account.marker:` 开头；任何货币都不可能使用这样的 ID
  （`currencies.yml` 中键名里的 `.` 会使该键成为嵌套键）。

- 当 `config/currencies.yml` 中主货币的 `initial-cash`、`bank-enabled`、`min-deposit` 或 `max-bank-balance` 与
  `config/config.yml` 的 `initial-cash`、`bank.enabled`、`bank.min-deposit` 或 `bank.max-balance` 不一致时，启动时会记录一条
  WARNING，写明两个文件、两个键与两个值，并说明以 `config.yml` 的值为准（UltiKits/UltiEconomy#25）。

#### 移除

- 从 `config.yml` 删除 `leaderboard.display-count`。它从未被读取：没有任何命令或变量显示固定数量的排行榜条目，每个前 N 名
  变量（`%ultieconomy_top_name_<N>%`、`%ultieconomy_top_balance_<N>%`）都自己指定 N。仍含有该键的 `config.yml` 会在启动时
  给出一条警告，说明它已不再起作用、可以删除；文件不会被修改（UltiKits/UltiEconomy#36）。

- 删除财富税的设置 `tax.wealth-tax.enabled`、`tax.wealth-tax.interval` 和 `tax.wealth-tax.exempt-permission`。财富税
  从未收取过任何税款：从未被调度、从未扣款，也没有定义税率档位的设置。仍含有这些键的 `config.yml` 会在启动时每个键给出一条
  警告，说明它已不再起作用、可以删除；文件不会被修改。财富税本身作为功能请求排到以后的版本（UltiKits/UltiEconomy#38；
  维护者 2026-09-29 的决定，UltiKits/UltiEconomy#27）。

#### 修复

- 因其他服务器持续修改而放弃的余额变动，现在提示「该余额正在被另一台服务器修改，请稍后再试」（`/pay`、`/deposit`、`/withdraw`、
  `/note` 及兑换纸币（纸币保留）、`/eco give`/`take`/`set`、`/eco treasury withdraw`，Vault 返回 `FAILURE`），而不是「余额不足」。转账在扣除发送方后、接收方
  写入抛出存储错误时，现在也会退款；若退款也无法写入，会记录一条错误日志，写明双方玩家、金额和货币，便于管理员手动恢复。已完成转账的
  税款存入国库时出现存储错误，会记录日志而不是报告转账失败。已知限制：转账扣款后、入账前服务器中止可能丢失该笔金额
  （UltiKits/UltiEconomy#44）。这些条件写入未在 MariaDB 上测试（UltiKits/UltiEconomy#41）。

- 多台服务器共用一个数据库时，不再互相覆盖余额变动。所有现金、银行和国库变动——`/pay`、`/deposit`、`/withdraw`、
  `/eco give`/`take`/`set`、Vault、纸币、利息、交易税以及 `/eco treasury withdraw`——现在只在余额仍是本服读到的值时才生效，否则重新
  读取再决定，最多三次，之后按原有的写入失败方式处理（报告未完成并记录日志；无法给接收方入账的转账会退还发送方）。两台服务器同时为
  某货币首次存入交易税时只会创建一条国库记录。此前后写入的服务器会覆盖先写入的修改，凭空增减货币（UltiKits/UltiEconomy#41）。

- 货币已从 `config/currencies.yml` 删除的纸币，现在按设计拒绝兑换（`/note redeem` 与右键均如此）：不入账，玩家保留纸币并收到该货币已
  不存在的提示，控制台记录一条警告，写明玩家、面值和货币。把该货币加回后可再次兑换。此前仍持有该货币钱包的玩家会兑换成功——纸币被消耗，
  钱进入一个任何命令都看不到的钱包（UltiKits/UltiEconomy#37）。

- 余额或国库变动若在读取后对应记录被其他写入方删除，现在在所有存储类型上都按失败处理（与写入失败一致）：记录失败日志
  （「数据库中已没有这条记录」），并报告未完成——发送方记录已不存在的 `/pay` 不会给任何人入账，接收方记录已不存在时会把发送方的钱
  写回，`/eco treasury withdraw` 会报告取款失败。国库记录已不存在时，交易税会存入一条新的国库记录而不是丢失。此前这些写入什么都
  没写却被当作成功（UltiKits/UltiEconomy#42）。

- 多台服务器共用一个数据库时，一次性钱包合并在负责合并的服务器卡住超过 30 秒的接手时间、又在接手的服务器合并期间继续执行时，
  不会再把玩家的第二钱包加两次，也不会撤销之后对账户的修改：每次写账户和第二钱包记录都只在记录仍是合并读到的值时才生效，
  否则重新读取再决定；合并新建的账户使用由玩家 UUID 推导的唯一 id，数据库只接受一次，不会被创建两次
  （UltiKits/UltiEconomy#39）。

- `config.yml` 的 `bank.max-balance` 以及 `currencies.yml` 中每种非主货币的 `max-bank-balance` 现在必须为 `-1`（不设
  上限）或大于 0。其他值（`0`、其他负数、`.inf`）不会被使用：不设上限（`-1`），并发出警告写明配置项、原值和默认值——
  `config.yml` 在启动和每次重载后检查，`currencies.yml` 在启动时检查。此前 `0` 和所有负数也悄悄表示「不设上限」，而注释只写了
  `-1`，因此写 `0` 想表示「禁止存款」实际上得到的是无上限的银行（UltiKits/UltiEconomy#35）。

- 利息发放读取某条银行余额记录后，若该记录已被其他写入方删除，现在在所有存储类型上都报告为未入账：记录失败日志
  （原因为「数据库中已没有这条余额记录」），余额不变，也不会告诉玩家利息已到账。此前只有 JSON 后端会报告；SQLite 和
  MySQL 上会当作已发放（UltiKits/UltiEconomy#40）。

- `tax.transaction-tax.rate` 超出 0 到 1 的值不再使用：改用默认值 0.05，并在启动和每次重载后发出警告，写明键名、所写的值和
  默认值。此前负税率会让收款人收到比付款人付出更多的钱，大于 1 的税率则让收款人收到负数金额。

- 主货币的名称和符号现在一律取自 `config.yml`（`currency-name`、`currency-symbol`）：Vault、`/eco treasury` 以及所有
  显示它们的地方都是如此。`currencies.yml` 中主货币那一条跟随它，若在那里写了不同的 `display-name` 或 `symbol`，启动
  时会发出警告。`currency-name` 仍为出厂的 `Coins` 时，会按服务器语言写入（`language: zh` 下为 `金币`）。此前两个文件由
  不同代码路径读取，只改其中一个只会影响一半的输出（UltiKits/UltiEconomy#32）。

- `interest.rate` 现在必须在 0 到 1 之间，`interest.max-interest` 必须为 -1 或不小于 0。
  `0` 与 `-1` 均表示不设单次上限；只有正值会限制单次利息。要停发利息，请设置 `interest.enabled: false` 并执行 `/ul reload UltiTools-Economy`。
  超出范围的值不会被使用，而是改用默认值（`0.03`、`10000`），并在启动与每次重载后发出警告，写明配置项、原值和默认值。此前任何值都会被
  直接使用，`rate: 3` 这样的笔误会让每次付息 300%（UltiKits/UltiEconomy#29）。

- 卸载本模块（`/upm uninstall UltiTools-Economy`）现在也会注销其 PlaceholderAPI 扩展；此前 `%ultieconomy_...%` 变量会在
  重启前一直由已卸载的模块应答（UltiKits/UltiEconomy#23）。

- 未安装 PlaceholderAPI 的服务器不再在每次启动时为本模块的变量扩展记录类加载错误：扩展只在确认已安装 PlaceholderAPI
  之后才加载（UltiKits/UltiEconomy#20）。

- `tax.transaction-tax.exempt-permission` 现在生效：持有该权限（默认 `ultieconomy.tax.exempt`）的玩家使用 `/pay` 时不再
  缴纳交易税；此前该配置项只有声明、从未检查（UltiKits/UltiEconomy#26）。

- `/pay` 现在告诉双方收款人扣税后实际到账的金额（例如默认税率 5% 时 `/pay <玩家> 100` 显示 `$95.00`）；此前显示的是
  发出的金额（UltiKits/UltiEconomy#18）。

- 带货币名的 `/deposit`、`/withdraw`、`/pay` 现在会在动用任何余额之前拒绝不存在的货币，并如实提示“货币不存在”；
  此前回复的是通用的余额不足提示（UltiKits/UltiEconomy#13）。

- `language: en` 现在对以下命令消息生效（它们的键在两份语言文件中都缺失，因此在任何语言下都显示中文源文本）：`/money` 与
  `/bank` 的余额行，`/pay`、`/deposit`、`/withdraw` 的成功提示，`/eco give`、`take`、`set`、`check` 的提示，主货币利息到账通知，
  以及 `/bank`、`/deposit`、`/withdraw`、`/pay`、`/money` 的帮助与命令描述和 `/eco`、`/note` 的命令描述（UltiKits/UltiEconomy#14）。`language: zh` 现在也对
  原先写死为英文的文本生效：六个帮助标题（`=== UltiEconomy Bank ===` 等）、纸币的名称与说明、`interest.enabled` 与
  `tax.enabled` 的两条启动警告、三条控制台错误（账户、余额或利息写入失败），以及 Vault 接口在扣款或存款失败时返回的消息
  （商店插件会把它显示给玩家）。英文措辞不变，唯一例外是向自己 `/pay` 时现在提示“不能向自己转账”，而不是“无效的金额”。改动前制作的纸币保留原名称；
  纸币按存储的数据识别而非名称，新旧纸币都能兑换。

- 财富排行榜现在会刷新：模块加载后立即刷新一次，之后每 `leaderboard.update-interval` 秒一次（默认 60；`/ul reload` 生效，
  小于 1 或大于 107374182 的值在加载时使整个经济模块（包括 Vault 提供者）拒载直到修正，在重载时不生效并记录 WARNING；
  生效的是你文件里的值，1.0.0 与 2.0.0 出厂写的 `60` 从未被读取，`60` 只是缺少该键的文件得到的值）。此前从未刷新，因此无论玩家余额如何，
  `%ultieconomy_rank%` 与 `%ultieconomy_<currency>_rank%` 始终返回 `-`，`%ultieconomy_top_name_<N>%` 始终为 `-`，
  `%ultieconomy_top_balance_<N>%` 始终为 `0.00`（UltiKits/UltiEconomy#15）。

- `/upm uninstall UltiTools-Economy` 现在会在本模块自身的清理工作（从 Bukkit 服务管理器移除其 Vault 经济提供者，
  行为不变）之后，执行框架自身的命令与监听器清理：执行后，本模块的命令会被真正移除，其监听器也不再触发；此前两者都会
  保持生效，直到服务器重启（UltiKits/UltiEconomy#22）。重载不受影响：本模块从未替换框架的重载方法。


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
