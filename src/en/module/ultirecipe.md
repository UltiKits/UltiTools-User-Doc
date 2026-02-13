# UltiRecipe - Custom Crafting Recipes

UltiRecipe is the custom recipe module for the UltiTools ecosystem, allowing server administrators to create workbench crafting recipes through YAML configuration files without writing any code.

## Feature Overview

UltiRecipe provides a simple and intuitive way to add custom crafting recipes to your server. All recipes are defined in a YAML configuration file, supporting standard 3x3 shaped recipes using any vanilla Minecraft material as ingredients or output. Output items support custom display names and lore lines with `&` color codes for personalization. Recipes can be hot-reloaded after editing the config -- just run a single command instead of restarting the server. On first startup, the plugin automatically generates an example recipe for reference.

## Installation

**Method 1: Install via UPM (Recommended)**

```
/upm install UltiRecipe
```

**Method 2: Manual Installation**

1. Make sure UltiTools-API 6.2.0 or higher is installed on your server
2. Download `UltiRecipe-1.0.0.jar`
3. Place the JAR file in the `plugins/UltiTools/plugins/` directory
4. Restart the server
5. Edit `plugins/UltiTools/UltiRecipe/config/recipes.yml` to add your recipes

> **Note:** UltiRecipe requires Minecraft 1.13 or higher because it uses the `NamespacedKey` API.

## Quick Start

After installation, the plugin automatically generates an example recipe. You can test it immediately at a crafting table:

**Testing the example recipe (Golden Egg):**

Arrange materials in the crafting table as follows:

```
Apple       Apple        Apple
Apple       Dark Oak     Apple
Dark Oak    (empty)      Dark Oak
```

The result is an egg named "Golden Egg" with a custom lore description.

**Adding your own recipes:**

1. Open the config file `plugins/UltiTools/UltiRecipe/config/recipes.yml`
2. Add your recipe definitions under `recipes:`
3. Run `/recipe reload` to apply changes

## Commands

| Command | Description | Example | Player/Console |
|---------|-------------|---------|----------------|
| `/recipe list` | List all registered custom recipes | `/recipe list` | Both |
| `/recipe reload` | Reload recipe configuration (removes old recipes, registers new ones) | `/recipe reload` | Both |
| `/recipe count` | Show the number of currently registered recipes | `/recipe count` | Both |

Command aliases: `/recipe` and `/ultirecipe` are equivalent.

Tab completion is supported for subcommands (`list`, `reload`, `count`).

### Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultirecipe.admin` | Use all UltiRecipe management commands | OP |

## Configuration

Configuration file path: `plugins/UltiTools/UltiRecipe/config/recipes.yml`

```yaml
# Enable or disable custom recipes
# Setting to false disables all recipe commands and the service entirely
enabled: true

# Custom recipe definitions
# Each recipe has a unique name as its identifier
recipes:

  # ===== Example Recipe: Golden Egg =====
  golden_egg:
    # Output item configuration
    output:
      material: EGG            # Output item material (vanilla Minecraft material name)
      amount: 1                # Output quantity (range: 1-64)
      name: "&e&lGolden Egg"   # Custom display name (supports & color codes, optional)
      lore:                    # Custom lore lines (supports & color codes, optional)
        - "&7A magical egg made from apples and wood"

    # Recipe shape
    # Exactly 3 rows of 3 characters each
    # Space means no item in that slot
    # Other characters map to materials defined in ingredients below
    shape:
      - "xxx"    # Row 1: Apple Apple Apple
      - "xyx"    # Row 2: Apple DarkOak Apple
      - "y y"    # Row 3: DarkOak (empty) DarkOak

    # Ingredient mappings
    # Maps characters used in shape to Minecraft materials
    # Each key must be a single character (not a space)
    ingredients:
      x: APPLE           # x = Apple
      y: DARK_OAK_WOOD   # y = Dark Oak Wood

  # ===== You can add more recipes below =====
  # custom_sword:
  #   output:
  #     material: DIAMOND_SWORD
  #     amount: 1
  #     name: "&b&lHoly Sword"
  #     lore:
  #       - "&7A legendary weapon"
  #       - "&7Attack +100"
  #   shape:
  #     - " D "
  #     - " D "
  #     - " S "
  #   ingredients:
  #     D: DIAMOND
  #     S: STICK
```

### Shape Rules

- Must be exactly 3 rows with 3 characters per row
- A space ` ` means no item is required in that slot
- Any other character is mapped to a material in `ingredients`
- The same character appearing in multiple positions means those slots use the same material

### Material Name Reference

Material names use the standard uppercase Minecraft names, for example:

| Common Material | Material Name |
|-----------------|---------------|
| Diamond | `DIAMOND` |
| Iron Ingot | `IRON_INGOT` |
| Gold Ingot | `GOLD_INGOT` |
| Stick | `STICK` |
| Stone | `STONE` |
| Cobblestone | `COBBLESTONE` |
| Oak Planks | `OAK_PLANKS` |
| Apple | `APPLE` |
| String | `STRING` |
| Leather | `LEATHER` |
| Redstone | `REDSTONE` |

For a complete list of material names, see the [Spigot Material documentation](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html).

## Usage Tutorials

### Tutorial 1: Creating a Custom Diamond Sword

Let's create a diamond sword named "Holy Sword" crafted from diamonds and a stick.

Add the following under `recipes:` in `recipes.yml`:

```yaml
  holy_sword:
    output:
      material: DIAMOND_SWORD
      amount: 1
      name: "&b&lHoly Sword"
      lore:
        - "&7A legendary weapon"
        - "&dHas a chance to trigger holy light on attack"
    shape:
      - " D "
      - " D "
      - " S "
    ingredients:
      D: DIAMOND
      S: STICK
```

Save the file and run `/recipe reload`, then arrange in the crafting table:

```
(empty)  Diamond  (empty)
(empty)  Diamond  (empty)
(empty)  Stick    (empty)
```

This crafts the "Holy Sword".

### Tutorial 2: Creating a Compressed Iron Block Recipe

Craft 9 iron blocks from 9 iron ingots (a compression recipe):

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

Note that this example omits `name` and `lore` in `output`, so the result is a regular iron block -- just 9 of them at once.

### Tutorial 3: Creating an Asymmetric Recipe

Recipes don't need to be symmetrical. Here is an L-shaped recipe:

```yaml
  magic_stick:
    output:
      material: BLAZE_ROD
      amount: 1
      name: "&6Magic Wand"
    shape:
      - "G  "
      - "GG "
      - " G "
    ingredients:
      G: GOLD_INGOT
```

### Tutorial 4: Adding Multiple Recipes at Once

You can define any number of recipes in the same configuration file, each with a unique name:

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
      name: "&5Ender Pearl Pack"
    shape:
      - "OOO"
      - "OEO"
      - "OOO"
    ingredients:
      O: OBSIDIAN
      E: ENDER_EYE
```

After adding, run `/recipe reload` and all new recipes take effect immediately.

## FAQ

### Q: What if the plugin doesn't work after installation?

A: Check the following:
- Confirm UltiTools-API version is 6.2.0 or higher
- Confirm the JAR file is in `plugins/UltiTools/plugins/` (not the root `plugins/` directory)
- Confirm the server version is 1.13 or higher (older versions don't support NamespacedKey)
- Check the server log for a `UltiRecipe enabled!` message
- Check that `enabled` is set to `true` in `recipes.yml`

### Q: Config changes not taking effect?

A: After modifying `plugins/UltiTools/UltiRecipe/config/recipes.yml`, you need to run `/recipe reload` to reload recipes. This command removes all old recipes and re-registers them from the updated config. You can also use `/ul reload` to reload the entire plugin.

### Q: How to set up permissions?

A: UltiRecipe commands use a single permission node: `ultirecipe.admin`, which is granted to OPs by default. The custom recipes themselves do not require any permission -- all players can use registered recipes at any crafting table. If you need to restrict recipe usage, consider combining with another plugin.

### Q: What happens if a material name is wrong?

A: If the `output` material name is invalid, the entire recipe is skipped and a warning is printed to the console. If an `ingredients` material name is invalid, that ingredient mapping is skipped but the recipe may still register (the crafting slot without a valid material won't work properly). Use `/recipe list` to verify which recipes were successfully registered.

### Q: Can I create shapeless recipes?

A: The current version only supports shaped recipes, meaning materials must be placed in the exact positions defined by `shape`. Shapeless recipes are not supported at this time.

### Q: Are there restrictions on recipe names?

A: Recipe names are YAML keys that become part of the internal Minecraft NamespacedKey (prefixed with `ultirecipe_`). Use lowercase letters, numbers, and underscores. Avoid spaces and special characters. Each recipe name must be unique.

### Q: Can the output item have custom enchantments?

A: The current version's configuration supports custom names (`name`) and lore lines (`lore`) only. Enchantments and other NBT attributes are not supported. If you need enchanted output items, consider using another plugin (such as UltiMail's command API) to grant them after crafting.

### Q: What happens when I set enabled to false?

A: When set to `false`, neither `RecipeService` nor `RecipeCommand` are registered in the framework container. No recipes are loaded and the `/recipe` command is unavailable. This effectively disables the entire module.

## Changelog

### v1.0.0 (2026-02-13)

Added:
- YAML-driven shaped crafting recipes
- Support for all vanilla Minecraft materials
- Custom output item names and lore (with `&` color codes)
- Custom output quantities (1-64)
- Hot reload recipes (`/recipe reload`)
- Recipe listing (`/recipe list`)
- Recipe count display (`/recipe count`)
- Tab completion support
- `@ConditionalOnConfig` conditional registration, can be fully disabled via config
- Auto-generated example recipe on first run
- Chinese and English language packs
