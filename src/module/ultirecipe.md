# UltiRecipe - 自定义合成配方

UltiRecipe 是 UltiTools 生态的自定义配方模块，让服务器管理员通过 YAML 配置文件创建工作台合成配方，无需编写任何代码。

## 功能概览

UltiRecipe 提供了一种简单直观的方式来为你的服务器添加自定义合成配方。所有配方通过 YAML 文件配置，支持标准的 3x3 有序配方（Shaped Recipe），可以使用 Minecraft 所有原版材料作为原料和产出。产出物品支持自定义显示名称和描述（Lore），并且可以使用 `&` 颜色代码让物品更加个性化。配方支持热重载，修改配置后无需重启服务器，执行一条命令即可刷新。首次启动只生成空配方表，下面的示例需要自己写入。

## 安装

**方式一：通过 UPM 安装（推荐）**

```
/upm install UltiRecipe
```

**方式二：手动安装**

1. 确保服务器已安装 UltiTools-API 6.3.0 或更高版本
2. 下载 `UltiRecipe-2.0.0.jar`
3. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
4. 重启服务器
5. 编辑 `plugins/UltiTools/pluginConfig/UltiRecipe/config/recipes.yml` 添加你的配方

> 新 JAR 需要完整重启；配方文件可热重载，但 enabled 改动也需要完整重启。

## 升级到 2.0.0

备份 `config/recipes.yml`，安装 UltiTools-API 6.3.0 或更高版本，替换 `UltiRecipe-2.0.0.jar` 后完整重启。目录身份 `ultirecipe` 用于框架更新检查和 `/upm update`，框架重载/卸载使用 `UltiRecipe`。旧框架拒绝 api-version 630；6.2.5 还可能先打印 ConfigConverter 缺类堆栈，版本过旧警告才是原因。配置值不会自动替换为新默认值。

首次生成的完整默认配置只有：

```yaml
# 是否启用自定义配方；修改后完整重启
enabled: true
# 默认没有配方；下文示例需要你自己添加
recipes: {}
```

| 配置项 | 类型 | 默认值 | 如何生效 |
|---|---|---|---|
| `enabled` | 布尔值 | true | 决定启动时是否创建命令和配方服务；改变后重启 |
| `recipes` | 映射 | {} | 写入配方后 `/recipe reload`，再用 list/count 核对 |

不存在自动赠送的金苹果蛋配方；下面的文件是可以自行保存的完整示例，不是默认值。`/recipe` 有意接管原版同名命令；授予/收回原版配方请用 `/minecraft:recipe`。模块别名 `/ultirecipe` 不变。

### 配方校验和重载失败

`output.amount` 必须是未加引号的 1–64 整数；2.0 可用，2.5、0.5、100 或字符串 "1" 会拒绝该条配方，不截断或夹成范围内值。产出材料不能为空，未知材料、不是单字符的配料键、形状中没有对应材料的字母也会拒绝整个配方，绝不悄悄用更少原料注册。形状为三行、每行 1–3 个字符、三行等宽；本文示例用 3×3。配方结构错误或 `hollow:`、配料 `D:` 没有值会点名跳过，其他有效配方继续注册；用 `/recipe list` 和 `/recipe count` 核对结果，不只看重载成功提示。

`/recipe reload` 先重新读文件，文件不可读或 YAML 错误时重新注册旧配方，回复「配方只重载了一部分，共 N 个配方：原因」。`/ul reload UltiRecipe` 则由框架先读配置与语言：这个阶段失败会明确回复模块重载失败，旧配方仍有效；之后模块再次读取失败才报告部分重载。修好文件后再重载。`enabled` 是启动开关，两种重载都不会重新创建或删除相关命令/服务，需完整重启。卸载 `/upm uninstall UltiRecipe` 会先移除配方，再注销 `/recipe` 与 `/ultirecipe`。

自定义消息从 `plugins/UltiTools/pluginConfig/UltiRecipe/lang/zh.json` 复制到同目录 `zh-myserver.json`，按 `recipe.help.header` 等 ASCII 键修改，在框架 `plugins/UltiTools/config.yml` 设置 `language: zh-myserver` 后执行不带参数的 `/ul reload`。不要直接编辑每次启动/模块重载都会恢复的官方文件，修改会保留为 `.bak`。副本缺键回退官方前缀语言，无对应前缀则回退英文并警告。框架生成的 enabled/recipes 注释随语言在启动或完整重载后更新，自写注释与配置值保留。单纯启动不会重写已有配方；若通过面板改写配方，条目中不认识的额外键会被丢弃，先备份。

## 快速开始

安装完成后，先把下方「配置文件」中的完整示例保存到 recipes.yml，再执行 `/recipe reload`。确认 `/recipe list` 出现 golden_egg 后才在工作台中测试：

**测试示例配方（金苹果蛋）：**

按照如下布局在工作台中摆放材料：

```
苹果      苹果      苹果
苹果      深色橡木  苹果
深色橡木  (空)      深色橡木
```

合成结果是一个名为「金苹果蛋」的蛋，带有描述文字。

**添加自己的配方：**

1. 打开配置文件 `plugins/UltiTools/pluginConfig/UltiRecipe/config/recipes.yml`
2. 在 `recipes:` 下添加你的配方定义
3. 执行 `/recipe reload` 即可生效

## 命令

| 命令 | 说明 | 示例 | 玩家/控制台 |
|------|------|------|-------------|
| `/recipe list` | 列出所有已注册的自定义配方 | `/recipe list` | 两者均可 |
| `/recipe reload` | 重新加载配方配置（移除旧配方，注册新配方） | `/recipe reload` | 两者均可 |
| `/recipe count` | 显示当前已注册的配方数量 | `/recipe count` | 两者均可 |

命令别名：`/recipe` 和 `/ultirecipe` 等效。

命令执行时支持 Tab 补全子命令（`list`、`reload`、`count`）。

### 权限节点

| 权限 | 说明 | 默认 |
|------|------|------|
| `ultirecipe.admin` | 使用所有 UltiRecipe 管理命令 | OP |

## 配置文件

配置文件路径：`plugins/UltiTools/pluginConfig/UltiRecipe/config/recipes.yml`

```yaml
# 是否启用自定义配方功能
# 设为 false 并完整重启后禁用配方命令和服务
enabled: true

# 自定义配方列表
# 每个配方有一个唯一的名称作为标识
recipes:

  # ===== 示例配方：金苹果蛋 =====
  golden_egg:
    # 产出物品配置
    output:
      material: EGG            # 产出物品的材料名称（Minecraft 原版材料名）
      amount: 1                # 产出数量（范围：1-64）
      name: "&e&l金苹果蛋"      # 自定义显示名称（支持 & 颜色代码，可省略）
      lore:                    # 自定义描述行（支持 & 颜色代码，可省略）
        - "&7由苹果和木头合成的神奇蛋"

    # 配方形状
    # 由 3 行字符串组成，每行 3 个字符
    # 空格表示该位置不放物品
    # 其他字符在下方 ingredients 中定义对应材料
    shape:
      - "xxx"    # 第一行：苹果 苹果 苹果
      - "xyx"    # 第二行：苹果 深色橡木 苹果
      - "y y"    # 第三行：深色橡木 (空) 深色橡木

    # 材料映射
    # 将 shape 中的字符映射到 Minecraft 材料
    # 字符必须是单个字符（不能用空格）
    ingredients:
      x: APPLE           # x = 苹果
      y: DARK_OAK_WOOD   # y = 深色橡木

  # ===== 你可以继续添加更多配方 =====
  # custom_sword:
  #   output:
  #     material: DIAMOND_SWORD
  #     amount: 1
  #     name: "&b&l神圣之剑"
  #     lore:
  #       - "&7传说中的神器"
  #       - "&7攻击力 +100"
  #   shape:
  #     - " D "
  #     - " D "
  #     - " S "
  #   ingredients:
  #     D: DIAMOND
  #     S: STICK
```

### 配方形状（Shape）规则

- 必须恰好 3 行，每行 1–3 个字符，三行等宽；本页示例用 3 个字符
- 空格 ` ` 表示该格位不需要放置任何物品
- 其他任意字符在 `ingredients` 中定义对应的材料
- 同一个字符在多个位置出现表示这些位置使用相同材料

### 材料名称参考

材料名称使用 Minecraft 原版的大写英文名称，例如：

| 常用材料 | 材料名称 |
|----------|----------|
| 钻石 | `DIAMOND` |
| 铁锭 | `IRON_INGOT` |
| 金锭 | `GOLD_INGOT` |
| 木棍 | `STICK` |
| 石头 | `STONE` |
| 圆石 | `COBBLESTONE` |
| 橡木木板 | `OAK_PLANKS` |
| 苹果 | `APPLE` |
| 线 | `STRING` |
| 皮革 | `LEATHER` |
| 红石 | `REDSTONE` |

完整材料名称列表请参考 [Spigot Material 文档](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html)。

## 使用教程

### 教程一：创建一把自定义钻石剑

我们来创建一把名为「神圣之剑」的钻石剑，原料是钻石和木棍。

在 `recipes.yml` 的 `recipes:` 下添加：

```yaml
  holy_sword:
    output:
      material: DIAMOND_SWORD
      amount: 1
      name: "&b&l神圣之剑"
      lore:
        - "&7传说中的神器"
        - "&d攻击时有概率触发神圣光芒"
    shape:
      - " D "
      - " D "
      - " S "
    ingredients:
      D: DIAMOND
      S: STICK
```

保存文件后执行 `/recipe reload`，然后在工作台中按如下摆放：

```
(空)  钻石  (空)
(空)  钻石  (空)
(空)  木棍  (空)
```

即可合成「神圣之剑」。

### 教程二：创建压缩铁块配方

用 9 个铁锭合成 9 个铁块（相当于压缩）：

```yaml
  compressed_iron:
    output:
      material: IRON_BLOCK
      amount: 9
    shape:
      - "III"
      - "III"
      - "III"
    ingredients:
      I: IRON_INGOT
```

注意这个例子中 `output` 没有设置 `name` 和 `lore`，产出的就是普通的铁块，只是数量为 9 个。

### 教程三：创建不对称配方

配方不需要对称。比如一个 L 形状的配方：

```yaml
  magic_stick:
    output:
      material: BLAZE_ROD
      amount: 1
      name: "&6魔法棒"
    shape:
      - "G  "
      - "GG "
      - " G "
    ingredients:
      G: GOLD_INGOT
```

### 教程四：一次添加多个配方

你可以在同一个配置文件中定义任意多个配方，每个配方用不同的名称即可：

```yaml
recipes:
  recipe_one:
    output:
      material: GOLDEN_APPLE
      amount: 1
    shape:
      - "GGG"
      - "GAG"
      - "GGG"
    ingredients:
      G: GOLD_INGOT
      A: APPLE

  recipe_two:
    output:
      material: ENDER_PEARL
      amount: 4
      name: "&5末影珍珠包"
    shape:
      - "OOO"
      - "OEO"
      - "OOO"
    ingredients:
      O: OBSIDIAN
      E: ENDER_EYE
```

添加完毕后执行 `/recipe reload`，所有新配方立即生效。

## 常见问题

### Q: 安装后不生效怎么办？

A: 检查以下几点：
- 确认 UltiTools-API 版本为 6.3.0 或更高
- 确认 JAR 文件放在 `plugins/UltiTools/plugins/` 目录下（不是 `plugins/` 根目录）
- 新 JAR 安装后完整重启，不能只执行 `/ul reload`
- 检查日志中的启用信息与配方注册数量，不只看一条启用日志
- 检查 `recipes.yml` 中 `enabled` 是否为 `true`

### Q: 改了配置文件没效果？

A: 修改 `plugins/UltiTools/pluginConfig/UltiRecipe/config/recipes.yml` 后，需要执行 `/recipe reload` 来重新加载配方。这个命令先尝试读文件，再移除并重注册；文件无法读取时用旧配方并报告部分重载。你也可以使用 `/ul reload` 重载整个插件。

### Q: 权限怎么设置？

A: UltiRecipe 的命令只有一个权限节点 `ultirecipe.admin`，默认只有 OP 可以使用。自定义配方本身不需要权限，所有玩家都可以在工作台中使用已注册的配方进行合成。如果需要限制配方使用，可以考虑结合其他插件实现。

### Q: 材料名称填错了会怎样？

A: 如果 `output` 中的材料名称无效，该配方会被跳过并在控制台输出警告。如果 `ingredients` 中材料无效、键不是单字符或 shape 字母缺少材料，整个配方都拒绝注册，并逐项警告。建议使用 `/recipe list` 确认配方是否成功注册。

### Q: 可以创建无序配方（Shapeless Recipe）吗？

A: 当前版本仅支持有序配方（Shaped Recipe），即材料在工作台中的位置必须与 `shape` 定义一致。暂不支持无序配方。

### Q: 配方名称有什么限制？

A: 配方名称是 YAML 中的键名，会被用作 Minecraft 内部的 NamespacedKey（加上 `ultirecipe_` 前缀）。建议使用小写字母、数字和下划线，避免空格和特殊字符。每个配方名称必须唯一。

### Q: 产出物品可以有自定义附魔吗？

A: 当前版本的配置仅支持自定义名称（`name`）和描述（`lore`），不支持附魔和其他 NBT 属性。如果需要附魔物品，建议通过其他插件（如 UltiMail 的命令 API）提供；本模块不会因 lore 文字自动产生技能。

### Q: 把 enabled 设为 false 后会怎样？

A: 设为 `false` 并完整重启后，`RecipeService` 和 `RecipeCommand` 都不会被注册到框架容器中，所有配方不会加载，`/recipe` 命令也不可用。这相当于完全禁用了整个模块的功能。

## 更新日志

### v2.0.0

原 Unreleased 记录的未调用示例生成方法已删除，删的是虚假声明而非用户行为：全新配置仍为 enabled: true 与 recipes: {}，金苹果蛋需自行写入，随附示例的需求尚未实现。定版撤回 README 服务端/Java 徽章说法，只保留框架 6.3.0+ 要求；配方转换器的共同发布要求现在以实际框架最低版本说明。

#### 变更

- 本版本需要 UltiTools 6.3.0 或更高版本，并在 `plugin.yml` 中声明 `api-version: 630`（已发布的 1.0.0 声明为 `620`）。本模块此前就已需要
  6.3.0：在 UltiTools 6.2.5 上，旧的声明会让模块自身的启动逻辑先运行（控制台打印 `UltiRecipe enabled!`），随后因缺少
  6.3.0 的类而以 `NoClassDefFoundError` 加载失败。现在更早的框架会在模块的启动逻辑运行之前拒绝加载它，并给出警告
  `[UltiTools-API] UltiRecipe load failed！UltiTools version is outdated！`。UltiTools 6.2.5 在这条警告之前仍会打印一段
  `com/ultikits/ultitools/config/convert/ConfigConverter` 的 `NoClassDefFoundError` 堆栈，因为它在检查版本之前就读取
  模块的配置类；指明原因的是那条警告（UltiKits/UltiRecipe#19）。

- `plugin.yml` 现在声明 `identify-string: ultirecipe`，即本模块在 UltiCloud 模块目录中的条目键。框架的更新检查和
  `/upm update` 会跳过未声明该键的模块，因此本模块现在会参与两者：带有同一键的更高发布版本会在启动时提示，
  并可用 `/upm update` 安装（UltiKits/UltiTools-Reborn#474）。

- `/recipe` 按维护者决定有意接管同名的原版 `/recipe` 命令，现已写入文档；原版命令仍可用 `minecraft:recipe` 调用
  （UltiKits/UltiRecipe#27）。

- 语言键已从中文句子改为 ASCII 键（例如 `recipe.help.header`）。如果你在自己的语言文件中自定义过本模块的消息——即把官方文件复制一份，文件名以该文件的语言代码加连字符开头
  （例如 `lang/zh-myserver.json`），并在 `plugins/UltiTools/config.yml` 中设置 `language: zh-myserver` 选择它——请把改动重新套到新键上；
  在此之前，改名的消息显示文件名开头那种官方语言的文本。文件名不以官方语言代码加连字符开头的副本仍会被读取，但其中缺少的消息
  都显示英文，并记录一条警告。
  直接在官方语言文件（`lang/en.json`、`lang/zh.json`）中做的修改不会保留：框架会在每次启动以及每次模块重载时恢复官方文件，并把修改过的文件
  保留为 `.bak`（UltiKits/UltiTools-Reborn#616）。从未自定义过消息的服务器无需任何操作。

#### 修复

- UltiRecipe 可在 UltiTools-API 6.3.0 上加载。该框架在模块加载时拒绝它无法存储的配置值类型，此前会以
  `no config converter for ...RecipeConfig$RecipeDefinition`（文件 `config/recipes.yml`，键 `recipes`）拒绝本模块；
  现在本模块为配方注册了转换器。已有的 `recipes.yml` 读出的值不变，文件也不会被改写；读不成配方的条目仍以原来的警告跳过。
  Bukkit 解析器以前会悄悄丢掉的两种写法现在会被点名：完全没有值的配方（`hollow:`）以
  `Skipped recipe 'hollow': expected a mapping, found nothing` 跳过；没有写材料的配料（`D:`）以
  `Skipped recipe '<名称>': ingredients.D: has no value` 跳过该配方（此前它会消失，配方要么被当成无效定义拒绝，要么在有其他配料时
  让那个形状字母变成空格）（UltiKits/UltiRecipe#32）。

- `config/recipes.yml` 中两个配置项（`enabled`、`recipes`）上方的注释现在取自模块的语言文件：`language: en` 的服务器全新安装时
  写入英文注释（此前所有语言下都是中文）。框架在这两项上写下的注释（包括旧版本写下的中文注释）会在下次启动时、以及你修改
  `language` 并执行不带参数的 `/ul reload` 后切换为服务器语言；配置值不变，你自己写的注释保持原样（UltiKits/UltiTools-Reborn#611）
  （UltiKits/UltiRecipe#31）。

- 重新读取 `config/recipes.yml` 失败时，`/ul reload UltiRecipe` 不再一律回复成功。YAML 写错或文件不可读会在框架自己的配置重载中被发现，
  它在本模块的重载代码之前执行（UltiKits/UltiTools-Reborn#589）：回复为 `Module UltiRecipe failed to reload: <原因>`，原因写明
  `config/recipes.yml`，控制台显示框架的 SEVERE 行，之前加载的配方仍然有效。若之后本模块自己的再次读取失败，本模块会把它记进框架的
  重载报告，回复会说明这次重载只完成了一部分，并写明文件和错误（UltiKits/UltiRecipe#30）。

- 重新读取 `config/recipes.yml` 失败（文件不可读、YAML 写错）时，`/recipe reload` 不再回复「配方已重载！」，而是回复
  `配方只重载了一部分，共 <n> 个配方：<原因>`，原因写明文件和错误；之前加载的配方仍然有效（UltiKits/UltiRecipe#33）。

- `config/recipes.yml` 中 `shape` 用到了 `ingredients` 下没有的字母的配方不再注册，控制台警告会点名该配方和按原样书写的字母，例如
  `Recipe 'sword' not registered: shape letter 'S' has no ingredient`；每个这样的字母只点名一次。此前服务器会把该字母当成空格，
  配方变成按一个谁也没写过的图案合成（UltiKits/UltiRecipe#29）。

- `config/recipes.yml` 中带小数的 `output.amount`（例如 `2.5`）现在会让该配方被拒绝，警告按原样引用所写的值：
  `Skipped recipe '<名称>': output.amount: expected a whole number, found 2.5`。此前它会被静默截断，`2.5` 注册为 2 个，
  `0.5` 则被报告为谁也没写过的 `value 0`。`2.0` 仍表示 2（UltiKits/UltiRecipe#24）。

- `config/recipes.yml` 中含有模块无法使用的材料（未知材料，或多于一个字符的材料键）的配方不再注册，控制台警告会按原样点名
  每一个这样的材料，例如 `Recipe 'partial' not registered: ingredient 'S' names an unknown material 'NOT_A_MATERIAL'`。
  此前会跳过该材料并注册配方的其余部分，服务器会把它变成一个用更少材料就能合成的另一张配方，或者报出无从解释的索引错误
  （UltiKits/UltiRecipe#21）。未知产出材料和形状不是三行的警告现在也会按原样引用所写的值。

- `/recipe reload` 现在会先重新读取 `config/recipes.yml` 再重新注册配方，服务器运行中修改文件后无需重启即可生效。
  此前它只会重新注册启动时加载到内存中的配方。若文件无法读取，会重新注册之前已加载的配方，并在控制台警告中写明
  错误（UltiKits/UltiRecipe#12）。

- `language: en` 现在对 `/recipe` 命令描述生效（它在两份语言文件里都缺失，所以任何语言下都显示中文句子），
  也对加载、注册、移除配方时写出的十一条控制台日志生效（`Registered recipe: …`、`Skipped recipe '…': …`
  等），这些日志原先写死为英文，包括 `Skipped recipe` 与 `Invalid output for recipe` 冒号后的原因说明。
  英文措辞不变；`language: zh` 下现在是中文，只有 YAML 路径和出错的取值按原样打印。

- 配方的 `output.material` 与 `output.amount` 现在会按其字段上声明的约束校验（`@NotEmpty`，以及两端均为闭区间的
  `@Range(min = 1, max = 64)`）。此前这两条约束不被任何代码执行：框架只校验配置类自身的顶层键，不会递归进入配方条目，
  而本模块也没有自己做检查。**对运维意味着什么：** 超出 1-64 的 `output.amount` 此前会照写注册并可合成——`amount: 100`
  真的产出一组 100 个——现在会被拒绝，并输出
  `Invalid output for recipe: <name> - output.amount: value 100 is out of range [1, 64]`。是拒绝而不是截断：
  若某台服务器依赖超范围的堆叠数量，必须自行修改该条目，而日志会指明是哪一条。空的或只有空白字符的 `output.material`
  此前也会被拒绝，但走的是 `Material.matchMaterial` 失败那条路，因此与材料名拼错输出同一行
  `Invalid output material for recipe: <name>`；现在输出
  `Invalid output for recipe: <name> - output.material: must not be empty`，留空与拼错终于可以在日志里区分。
  两种情况都只跳过出问题的那一条，文件中其余配方照常注册（UltiKits/UltiRecipe#14）。

- `/ul reload UltiRecipe` 现在会先重载本模块的配置（`config/recipes.yml`）并刷新其语言文件，再由本模块重新注册
  配方。此前本模块替换了框架的重载方法，这两步都不会执行。UltiTools 6.3.0 还会在此时报告
  `@ConditionalOnConfig` 漂移并输出框架自身的模块重载日志（UltiKits/UltiRecipe#11）。

- `/upm uninstall UltiRecipe` 仍会先移除本模块的自定义配方，之后现在还会真正移除其 `/recipe`（`/ultirecipe`）
  命令。此前本模块替换了框架的卸载方法，因此该命令会一直保持生效，直到服务器重启（UltiKits/UltiRecipe#11）。

- `config/recipes.yml` 中的自定义配方现在可以加载。在本模块已发布的每一个版本中，只要 `recipes` 映射中存在
  任意一条配方，模块的加载就会因 `ClassCastException` 中断，没有任何自定义配方被注册，`/recipe list`、
  `/recipe count` 和 `/recipe reload` 都会落到 Minecraft 自带的、参数完全不同的 `/recipe` 命令上；只有随
  模块发布的空默认值（`recipes: {}`）能够加载。不存在可供回退的更早版本——该缺陷在本模块的首次提交中即已存在。
  结构无法读取的配方条目——值不是映射、`output` 不是映射、`output.amount` 不是数字、`shape` 不是列表——现在
  会被单独跳过，并输出一条指明该条目及原因的警告，文件中的其余条目仍会正常注册。完全缺少 `output`、`shape`
  或 `ingredients` 的条目，以及 `ingredients` 下没有任何可用内容的条目，现在会以
  `Invalid recipe definition for: <name>` 被拒绝，该提示会指明是哪一条配方
  （UltiKits/UltiRecipe#16）。


### v1.0.0 (2026-02-13)

新增：
- YAML 配置驱动的有序合成配方（Shaped Recipe）
- 支持所有 Minecraft 原版材料
- 自定义产出物品名称和描述（支持 `&` 颜色代码）
- 自定义产出数量（1-64）
- 热重载配方（`/recipe reload`）
- 配方列表查看（`/recipe list`）
- 配方数量统计（`/recipe count`）
- Tab 补全支持
- `@ConditionalOnConfig` 条件注册，可通过配置完全禁用
- 自动生成示例配方
- 中英文语言包
