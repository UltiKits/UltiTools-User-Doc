# UltiRecipe - Custom Crafting Recipes

UltiRecipe is the custom recipe module for the UltiTools ecosystem, allowing server administrators to create workbench crafting recipes through YAML configuration files without writing any code.

## Feature Overview

UltiRecipe provides a simple and intuitive way to add custom crafting recipes to your server. All recipes are defined in a YAML configuration file, supporting standard 3x3 shaped recipes using any vanilla Minecraft material as ingredients or output. Output items support custom display names and lore lines with `&` color codes for personalization. Recipes can be hot-reloaded after editing the config -- just run a single command instead of restarting the server. On first startup the recipe map is empty; add the examples below yourself.

## Installation

**Method 1: Install via UPM (Recommended)**

```
/upm install UltiRecipe
```

**Method 2: Manual Installation**

1. Make sure UltiTools-API 6.3.0 or higher is installed on your server
2. Download `UltiRecipe-2.0.0.jar`
3. Place the JAR file in the `plugins/UltiTools/plugins/` directory
4. Restart the server
5. Edit `plugins/UltiTools/pluginConfig/UltiRecipe/config/recipes.yml` to add your recipes

> A new JAR needs a full restart. Recipe files can reload live, but changing enabled also requires a full restart.

## Upgrading to 2.0.0

Back up `config/recipes.yml`, install UltiTools-API 6.3.0 or later, replace `UltiRecipe-2.0.0.jar` and restart fully. Catalogue identity `ultirecipe` is used by framework update checks and `/upm update`; framework reload/uninstall uses `UltiRecipe`. Older frameworks refuse api-version 630; 6.2.5 may first print a missing ConfigConverter stack trace, but the outdated-version warning identifies the cause. Existing configuration values are not replaced with new defaults.

The complete freshly generated default file is only:

```yaml
# Enable custom recipes; restart fully after changing this
enabled: true
# Empty by default; add the worked examples yourself
recipes: {}
```

| Key | Type | Default | How it applies |
|---|---|---|---|
| `enabled` | Boolean | true | Creates commands and recipe service at startup; restart after changing |
| `recipes` | Map | {} | Run `/recipe reload` after editing, then check list/count |

There is no automatically supplied Golden Egg recipe. The file below is a complete worked example you can save yourself, not the shipped default. `/recipe` intentionally takes over the vanilla command; use `/minecraft:recipe` to grant/take vanilla recipes. `/ultirecipe` remains the module alias.

### Validation and reload failures

`output.amount` must be an unquoted whole number from 1–64. 2.0 is accepted; 2.5, 0.5, 100 and the string "1" refuse that entry rather than truncate or clamp it. Output material must not be blank. Unknown materials, multi-character ingredient keys, and shape letters with no ingredient refuse the entire recipe, never register a cheaper pattern. Use three equal-width rows, 1–3 characters per row; the examples use 3×3. A malformed entry, a valueless `hollow:`, or a valueless ingredient `D:` is skipped by name while other valid entries register. Check `/recipe list` and `/recipe count`, not just a reload-success reply.

`/recipe reload` re-reads the file first. Unreadable/invalid YAML re-registers the old recipes and replies `Recipes reloaded only in part, N recipes total: reason`. `/ul reload UltiRecipe` first runs framework configuration/language reload: failure there refuses the module reload and leaves old recipes active; a later failed module re-read is reported as partial. Fix the file, then reload again. `enabled` is a startup switch: neither reload recreates/removes its command or service; restart fully. `/upm uninstall UltiRecipe` removes recipes, then unregisters `/recipe` and `/ultirecipe`.

For custom messages copy `plugins/UltiTools/pluginConfig/UltiRecipe/lang/en.json` to `en-myserver.json` beside it, migrate edits to ASCII keys such as `recipe.help.header`, select `language: en-myserver` in framework `plugins/UltiTools/config.yml`, then run a bare `/ul reload`. Do not edit official files, restored at every start/module reload with edits kept as `.bak`. Missing custom keys fall back to the official prefix language; without a matching prefix they fall back to English with a warning. Generated enabled/recipes comments follow language on startup/full reload; your own comments and configuration values stay intact. Starting alone does not rewrite existing recipes; a panel rewrite drops unknown extra keys inside an entry, so back it up first.

## Quick Start

After installation, save the complete worked example from Configuration to recipes.yml and run `/recipe reload`. Confirm golden_egg appears in `/recipe list` before testing at a crafting table:

**Testing the example recipe (Golden Egg):**

Arrange materials in the crafting table as follows:

```
Apple       Apple        Apple
Apple       Dark Oak     Apple
Dark Oak    (empty)      Dark Oak
```

The result is an egg named "Golden Egg" with a custom lore description.

**Adding your own recipes:**

1. Open the config file `plugins/UltiTools/pluginConfig/UltiRecipe/config/recipes.yml`
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

Configuration file path: `plugins/UltiTools/pluginConfig/UltiRecipe/config/recipes.yml`

```yaml
# Enable or disable custom recipes
# Set false and restart fully to disable the commands and service
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

- Exactly 3 equal-width rows, each 1–3 characters; these examples use 3
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
- Confirm UltiTools-API version is 6.3.0 or higher
- Confirm the JAR file is in `plugins/UltiTools/plugins/` (not the root `plugins/` directory)
- Restart fully after replacing the JAR; `/ul reload` alone cannot load it
- Check the enabled message and registered recipe count, not an enabled line alone
- Check that `enabled` is set to `true` in `recipes.yml`

### Q: Config changes not taking effect?

A: After modifying `plugins/UltiTools/pluginConfig/UltiRecipe/config/recipes.yml`, you need to run `/recipe reload` to reload recipes. It reads the file before removal/re-registration; an unreadable file keeps the old recipes and reports a partial reload. You can also use `/ul reload` to reload the entire plugin.

### Q: How to set up permissions?

A: UltiRecipe commands use a single permission node: `ultirecipe.admin`, which is granted to OPs by default. The custom recipes themselves do not require any permission -- all players can use registered recipes at any crafting table. If you need to restrict recipe usage, consider combining with another plugin.

### Q: What happens if a material name is wrong?

A: If the `output` material name is invalid, the entire recipe is skipped and a warning is printed to the console. An invalid ingredient, multi-character key or missing shape ingredient refuses the entire recipe, with warnings naming the problem. Use `/recipe list` to verify which recipes were successfully registered.

### Q: Can I create shapeless recipes?

A: The current version only supports shaped recipes, meaning materials must be placed in the exact positions defined by `shape`. Shapeless recipes are not supported at this time.

### Q: Are there restrictions on recipe names?

A: Recipe names are YAML keys that become part of the internal Minecraft NamespacedKey (prefixed with `ultirecipe_`). Use lowercase letters, numbers, and underscores. Avoid spaces and special characters. Each recipe name must be unique.

### Q: Can the output item have custom enchantments?

A: The current version's configuration supports custom names (`name`) and lore lines (`lore`) only. Enchantments and other NBT attributes are not supported. If you need enchanted output items, consider using another plugin that explicitly supports that feature; lore text alone grants no powers.

### Q: What happens when I set enabled to false?

A: After setting `false` and restarting fully, neither `RecipeService` nor `RecipeCommand` are registered in the framework container. No recipes are loaded and the `/recipe` command is unavailable. This effectively disables the entire module.

## Changelog

### v2.0.0

The unused example-seeding method recorded in Unreleased was removed, deleting a false claim rather than user behavior: fresh configuration still has enabled: true and recipes: {}, and Golden Egg must be added manually; shipping an example remains unimplemented. The README server/Java badge claim was withdrawn at finalization, retaining only the framework 6.3.0+ requirement; the converter co-release requirement is now expressed as the actual framework minimum.

#### Changed

- This version requires UltiTools 6.3.0 or later and declares `api-version: 630` in `plugin.yml`
  (the released 1.0.0 declared `620`). The module already needed 6.3.0: on UltiTools 6.2.5 the old declaration let its own
  start-up run (the console printed `UltiRecipe enabled!`) and the load then failed with a
  `NoClassDefFoundError` for a 6.3.0 class. An older framework now refuses the module before its start-up
  runs, with the warning `[UltiTools-API] UltiRecipe load failed！UltiTools version is outdated！`.
  UltiTools 6.2.5 still prints a `NoClassDefFoundError` stack trace for
  `com/ultikits/ultitools/config/convert/ConfigConverter` just before that warning, because it reads the
  module's configuration classes before it checks the version; the warning is the line that names the
  cause (UltiKits/UltiRecipe#19).

- `plugin.yml` now declares `identify-string: ultirecipe`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- `/recipe` deliberately takes over the vanilla `/recipe` command of the same name, as the maintainer
  decided; this is now stated in the documentation. The vanilla command stays reachable as
  `minecraft:recipe` (UltiKits/UltiRecipe#27).

- Language keys were renamed from Chinese sentences to ASCII keys (for example `recipe.help.header`).
  If you customised this module's messages in your own language file -- a copy of an official file
  whose name starts with that file's language code and a hyphen (for example `lang/zh-myserver.json`),
  selected with `language: zh-myserver` in `plugins/UltiTools/config.yml` -- re-apply those edits to the new
  keys; until then each renamed message shows the text of the official language the name starts with. A copy
  whose name does not start with an official language code and a hyphen is still read, but every message
  it lacks then shows in English, with one warning. An edit made directly in an official
  language file (`lang/en.json`, `lang/zh.json`) is not kept: the framework restores the official files at
  every start and on every module reload and keeps the edited file as `.bak` (UltiKits/UltiTools-Reborn#616). A server that never
  customised messages needs no action.

#### Fixed

- UltiRecipe loads on UltiTools-API 6.3.0. That framework refuses at module load a configuration value
  type it cannot store, and refused this module with `no config converter for
  ...RecipeConfig$RecipeDefinition` (file `config/recipes.yml`, key `recipes`); the module now registers a
  converter for its recipes. An existing `recipes.yml` loads with the same values and is not rewritten,
  and a recipe that cannot be read is skipped with the same warning as before. Two values Bukkit's parser
  used to drop without a word are now named: a recipe written with no value at all (`hollow:`) is skipped
  with `Skipped recipe 'hollow': expected a mapping, found nothing`, and an ingredient written with no
  material (`D:`) skips its recipe with `Skipped recipe '<name>': ingredients.D: has no value` (it used to
  disappear, which refused the recipe as an invalid definition or, beside other ingredients, left its
  shape letter empty) (UltiKits/UltiRecipe#32).

- The comments above the two keys of `config/recipes.yml` (`enabled`, `recipes`) now come from the
  module's language files: a server set to `language: en` writes English comments on a fresh install
  (they were Chinese in every language). The comments the framework wrote on these two keys, the Chinese
  ones earlier versions wrote included, switch to the server's language at the next start, and after you
  change `language` and run a bare `/ul reload`; values are untouched, and a comment you wrote yourself is kept as
  you wrote it (UltiKits/UltiTools-Reborn#611) (UltiKits/UltiRecipe#31).

- `/ul reload UltiRecipe` no longer replies a plain success when `config/recipes.yml` cannot be read again.
  An invalid or unreadable file is caught by the framework's own configuration reload, which runs before
  this module's reload code (UltiKits/UltiTools-Reborn#589): the reply is `Module UltiRecipe failed to
  reload: <cause>`, the cause naming `config/recipes.yml`, the console shows the framework's SEVERE line,
  and the recipes loaded before stay registered. If a later re-read by the module itself fails, the module
  records it in the framework's reload report, so the reply says the reload was partial and names the file
  and the error (UltiKits/UltiRecipe#30).

- `/recipe reload` no longer replies `Recipes reloaded!` when `config/recipes.yml` could not be read again
  (an unreadable file, invalid YAML): it replies `Recipes reloaded only in part, <n> recipes total: <reason>`,
  where the reason names the file and the error, and the recipes loaded before stay registered
  (UltiKits/UltiRecipe#33).

- A recipe in `config/recipes.yml` whose `shape` uses a letter with no entry under `ingredients` is no
  longer registered, and a console warning names the recipe and the letter as written, for example
  `Recipe 'sword' not registered: shape letter 'S' has no ingredient`; every such letter is named once.
  The server used to turn that letter into an empty slot, so the recipe crafted from a pattern nobody
  wrote (UltiKits/UltiRecipe#29).

- A fractional `output.amount` in `config/recipes.yml` (for example `2.5`) now refuses that recipe with a
  warning quoting the value as written: `Skipped recipe '<name>': output.amount: expected a whole number,
  found 2.5`. It used to be truncated without a word, so `2.5` registered a stack of 2, and `0.5` was
  reported as `value 0`, a number nobody wrote. `2.0` still means 2 (UltiKits/UltiRecipe#24).

- A recipe in `config/recipes.yml` with an ingredient the module cannot use — an unknown material, or
  an ingredient key longer than one character — is no longer registered. Each such ingredient is named
  as written in a console warning, for example
  `Recipe 'partial' not registered: ingredient 'S' names an unknown material 'NOT_A_MATERIAL'`.
  The ingredient used to be skipped and the rest of the recipe registered, which the server turned into
  a different recipe that could be crafted with fewer materials, or into an unexplained index error
  (UltiKits/UltiRecipe#21). The warnings for an unknown output material and for a shape without three
  rows now also quote the value as written.

- `/recipe reload` now reads `config/recipes.yml` again before it re-registers the recipes, so an
  edit made while the server is running takes effect without a restart. It used to re-register the
  recipes held in memory since start-up. If the file cannot be read, the recipes loaded before are
  registered again and a console warning names the error (UltiKits/UltiRecipe#12).

- `language: en` now applies to the `/recipe` command description, which showed the Chinese
  sentence in every language because it was missing from both language files, and to the eleven
  console lines written while recipes are loaded, registered and removed (`Registered recipe: …`,
  `Skipped recipe '…': …`, `Invalid output for recipe: …`, `Unknown material '…' in recipe: …` and
  the rest), which were fixed English text, including the reason after the colon in
  `Skipped recipe` and `Invalid output for recipe` (`expected a mapping, found …`,
  `value 100 is out of range [1, 64]`, …). Their English wording is unchanged; under
  `language: zh` they are now Chinese, except the YAML path and the offending value, which are
  printed as written.

- A recipe's `output.material` and `output.amount` are now checked against the constraints
  declared on them (`@NotEmpty`, and `@Range(min = 1, max = 64)` inclusive at both ends). Neither
  was checked by anything before: the framework validates only a configuration class's own
  top-level keys and never recurses into a recipe entry, and this module added no check of its
  own. **What changes for an operator:** an `output.amount` outside 1-64 used to register and
  craft as written — `amount: 100` produced a stack of 100 — and is now refused with
  `Invalid output for recipe: <name> - output.amount: value 100 is out of range [1, 64]`. It is
  refused, not clamped: a server that relies on an out-of-range stack size must change that entry,
  and will be told exactly which one. An empty or whitespace-only `output.material` was already
  refused, but through `Material.matchMaterial` failing, so it produced the same
  `Invalid output material for recipe: <name>` line a misspelled material produces; it now reports
  `Invalid output for recipe: <name> - output.material: must not be empty`, so a blank field and a
  typo are finally distinguishable in the log. In both cases only the offending entry is skipped —
  every other recipe in the file still registers (UltiKits/UltiRecipe#14).

- `/ul reload UltiRecipe` now reloads this module's configuration (`config/recipes.yml`) and
  refreshes its language files before the module re-registers its recipes. Previously this module
  replaced the framework's reload method, so neither step ran. UltiTools 6.3.0 also reports
  `@ConditionalOnConfig` drift and logs its own per-module reload line at this point
  (UltiKits/UltiRecipe#11).

- `/upm uninstall UltiRecipe` still removes this module's custom recipes first, and now also really
  removes its `/recipe` (`/ultirecipe`) command afterwards. Previously this module replaced the
  framework's unload method, so the command stayed active until the server restarted
  (UltiKits/UltiRecipe#11).

- Custom recipes in `config/recipes.yml` now load. In every released build of this module, a file
  whose `recipes` map held at least one entry aborted the module's load with a
  `ClassCastException`, so no custom recipe was registered and `/recipe list`, `/recipe count` and
  `/recipe reload` fell through to Minecraft's own unrelated `/recipe` command; only the shipped
  empty default (`recipes: {}`) loaded. There is no earlier version to roll back to - the defect
  is present in this module's first commit. An entry whose structure cannot be read - a value that
  is not a mapping, an `output` that is not a mapping, an `output.amount` that is not a number, a
  `shape` that is not a list - is now skipped on its own, with a warning naming that entry and the
  reason, and every other entry in the file still registers. An entry that leaves out `output`,
  `shape` or `ingredients` entirely, or supplies an `ingredients` block with nothing usable under
  it, is refused with `Invalid recipe definition for: <name>`, which names the entry
  (UltiKits/UltiRecipe#16).


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
