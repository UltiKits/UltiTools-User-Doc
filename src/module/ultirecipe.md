# UltiRecipe - 自定义合成配方

UltiRecipe 是 UltiTools 生态的自定义配方模块，让服务器管理员通过 YAML 配置文件创建工作台合成配方，无需编写任何代码。

## 功能概览

UltiRecipe 提供了一种简单直观的方式来为你的服务器添加自定义合成配方。所有配方通过 YAML 文件配置，支持标准的 3x3 有序配方（Shaped Recipe），可以使用 Minecraft 所有原版材料作为原料和产出。产出物品支持自定义显示名称和描述（Lore），并且可以使用 `&` 颜色代码让物品更加个性化。配方支持热重载，修改配置后无需重启服务器，执行一条命令即可刷新。插件启动时会自动生成一个示例配方供参考。

## 安装

**方式一：通过 UPM 安装（推荐）**

```
/upm install UltiRecipe
```

**方式二：手动安装**

1. 确保服务器已安装 UltiTools-API 6.2.0 或更高版本
2. 下载 `UltiRecipe-1.0.0.jar`
3. 将 JAR 文件放入 `plugins/UltiTools/plugins/` 目录
4. 重启服务器
5. 编辑 `plugins/UltiTools/UltiRecipe/config/recipes.yml` 添加你的配方

> **注意：** UltiRecipe 需要 Minecraft 1.13 或更高版本，因为使用了 `NamespacedKey` API。

## 快速开始

安装完成后，插件会自动生成一个示例配方。你可以直接在工作台中测试：

**测试示例配方（金苹果蛋）：**

按照如下布局在工作台中摆放材料：

```
苹果      苹果      苹果
苹果      深色橡木  苹果
深色橡木  (空)      深色橡木
```

合成结果是一个名为「金苹果蛋」的蛋，带有描述文字。

**添加自己的配方：**

1. 打开配置文件 `plugins/UltiTools/UltiRecipe/config/recipes.yml`
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

配置文件路径：`plugins/UltiTools/UltiRecipe/config/recipes.yml`

```yaml
# 是否启用自定义配方功能
# 设为 false 后所有配方命令和服务都会禁用
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

- 必须恰好 3 行，每行 3 个字符
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
- 确认 UltiTools-API 版本为 6.2.0 或更高
- 确认 JAR 文件放在 `plugins/UltiTools/plugins/` 目录下（不是 `plugins/` 根目录）
- 确认服务器版本为 1.13 或更高（低版本不支持 NamespacedKey）
- 检查服务器日志中是否有 `UltiRecipe enabled!` 的信息
- 检查 `recipes.yml` 中 `enabled` 是否为 `true`

### Q: 改了配置文件没效果？

A: 修改 `plugins/UltiTools/UltiRecipe/config/recipes.yml` 后，需要执行 `/recipe reload` 来重新加载配方。这个命令会先移除所有旧配方，然后根据新配置重新注册。你也可以使用 `/ul reload` 重载整个插件。

### Q: 权限怎么设置？

A: UltiRecipe 的命令只有一个权限节点 `ultirecipe.admin`，默认只有 OP 可以使用。自定义配方本身不需要权限，所有玩家都可以在工作台中使用已注册的配方进行合成。如果需要限制配方使用，可以考虑结合其他插件实现。

### Q: 材料名称填错了会怎样？

A: 如果 `output` 中的材料名称无效，该配方会被跳过并在控制台输出警告。如果 `ingredients` 中某个材料名称无效，该材料映射会被跳过但配方仍可能注册（缺少该材料的合成位置不会正常工作）。建议使用 `/recipe list` 确认配方是否成功注册。

### Q: 可以创建无序配方（Shapeless Recipe）吗？

A: 当前版本仅支持有序配方（Shaped Recipe），即材料在工作台中的位置必须与 `shape` 定义一致。暂不支持无序配方。

### Q: 配方名称有什么限制？

A: 配方名称是 YAML 中的键名，会被用作 Minecraft 内部的 NamespacedKey（加上 `ultirecipe_` 前缀）。建议使用小写字母、数字和下划线，避免空格和特殊字符。每个配方名称必须唯一。

### Q: 产出物品可以有自定义附魔吗？

A: 当前版本的配置仅支持自定义名称（`name`）和描述（`lore`），不支持附魔和其他 NBT 属性。如果需要附魔物品，建议通过其他插件（如 UltiMail 的命令 API）在合成后给予。

### Q: 把 enabled 设为 false 后会怎样？

A: 设为 `false` 后，`RecipeService` 和 `RecipeCommand` 都不会被注册到框架容器中，所有配方不会加载，`/recipe` 命令也不可用。这相当于完全禁用了整个模块的功能。

## 更新日志

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
