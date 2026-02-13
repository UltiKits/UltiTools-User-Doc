# UltiMenu - Custom GUI Menus

UltiMenu is a custom GUI menu module for the UltiTools framework, allowing server administrators to create any number of graphical menus through simple YAML configuration files. Each menu supports button command execution, economy costs, sub-menu navigation, item binding, and PlaceholderAPI variables -- no Java coding required.

## Feature Overview

UltiMenu uses a "one menu, one file" design, with all menu definition files stored in the `menus/` directory. Each menu can be configured with 1-6 rows (9-54 slots), a custom title, permission controls, and item binding. Buttons offer rich functionality: you can set item icons (Material), display names, lore text, player commands and console commands, Vault economy costs, sub-menu navigation, independent permissions, and custom model data (CustomModelData for resource packs). All text content supports `&` color codes and PlaceholderAPI variables. The item binding feature lets players open menus by right-clicking specific items in their hand.

## Installation

### Method 1: Install via UPM (Recommended)

Run in the server console or in-game:

```
/upm install UltiMenu
```

### Method 2: Manual Installation

1. Ensure your server has UltiTools-API 6.2.0 or higher installed
2. Place `UltiMenu-1.0.0.jar` in the `plugins/UltiTools/plugins/` directory
3. Restart the server
4. On first launch, an `example.yml` sample menu will be generated in `plugins/UltiTools/UltiMenu/menus/`

> Note: New module installations require a full server restart. `/ul reload` only reloads configuration files.

## Quick Start

After installation, UltiMenu automatically generates a sample menu. Here is a complete walkthrough of creating your own menu:

**1. Create a menu file**

Create a new file in `plugins/UltiTools/UltiMenu/menus/`, for example `shop.yml`:

```yaml
# Menu title, supports color codes and PlaceholderAPI
title: "&6&lShop Menu"
# Menu size, must be a multiple of 9 (9/18/27/36/45/54)
size: 27

buttons:
  diamond:
    item: DIAMOND
    position: 13
    name: "&b&lBuy Diamond"
    lore:
      - "&7Click to buy one diamond"
      - "&7Price: &e$500"
    price: 500
    console-commands:
      - "give {player} diamond 1"
```

**2. Load the menu**

Reload menus with the command:

```
/menu reload
```

**3. Open the menu**

Run in-game:

```
/menu shop
```

Now you can see a menu with a diamond purchase button. Clicking the diamond button will deduct 500 coins and give the player one diamond.

## Commands

Base command: `/menu`. Requires permission `ultikits.menu.use`. List and reload commands work from both players and console; opening menus is player-only.

| Command | Description | Who Can Use | Example |
|---------|-------------|-------------|---------|
| `/menu <name>` | Quick-open a menu | Player only | `/menu shop` |
| `/menu open <name>` | Explicitly open a menu | Player only | `/menu open shop` |
| `/menu list` | List all loaded menus | Player / Console | `/menu list` |
| `/menu reload` | Reload all menu configs (requires `ultikits.menu.admin`) | Player / Console | `/menu reload` |

> The menu name is the YAML filename without the `.yml` extension, case-insensitive. For example, `Shop.yml` has the menu name `shop`.

## Configuration

### Global Config - config/config.yml

Located at `plugins/UltiTools/UltiMenu/config/config.yml`:

```yaml
# Global click debounce in milliseconds (range: 50-5000)
# Prevents rapid clicks from causing duplicate execution
click_cooldown_ms: 200
```

### Menu Files - menus/*.yml

All menu files are located in `plugins/UltiTools/UltiMenu/menus/`. Each `.yml` file represents one menu.

Below is a complete menu file structure reference:

```yaml
# Menu title, supports & color codes and PlaceholderAPI variables
# {player} is replaced with the player's name
title: "&6&lServer Menu &r&7- {player}"

# Menu size, must be a multiple of 9: 9 / 18 / 27 / 36 / 45 / 54
size: 27

# Registered command name (optional, not currently used in this version)
command: servermenu

# Permission required to open the menu (optional, null or empty = no restriction)
permission: null

# Item binding (optional) -- right-click matching item to auto-open this menu
bind-item: COMPASS  # Bound item type (Material name)
bind-name: "&6Server Menu"  # Optional: also require item display name match
bind-lore: "&eRight-click to open"  # Optional: require lore contains this text

# Button definitions
buttons:
  info:  # Button unique identifier
    item: BOOK  # Item type (Material name, required)
    position: 10  # Position in menu, 0-53, left-to-right top-to-bottom starting from top-left
    name: "&b&lServer Info"  # Button display name, supports color codes and PlaceholderAPI
    lore:  # Button description text (list), supports color codes and PlaceholderAPI
      - "&7Welcome to the server!"
      - "&7Online: &a%server_online%"
    player-commands: []  # Commands executed as the player
    console-commands: []  # Commands executed as console
    price: 0  # Click cost (requires Vault, 0 = free)
    close-on-click: false  # Close menu after click (default: true)

  spawn:
    item: ENDER_PEARL
    position: 12
    name: "&d&lSpawn"
    lore:
      - "&7Teleport to spawn"
      - "&7Cost: &aFree"
    player-commands:  # Player commands, {player} is replaced with the player's name
      - "spawn"
    console-commands: []
    price: 0

  kit-starter:
    item: IRON_SWORD
    position: 14
    name: "&e&lStarter Kit"
    lore:
      - "&7Get starter items"
      - "&7Cost: &c$100"
    player-commands: []
    console-commands:  # Console commands, {player} is replaced with the player's name
      - "give {player} iron_sword 1"
      - "give {player} iron_pickaxe 1"
      - "give {player} bread 16"
    price: 100  # Deducts 100 coins

  rules:
    item: WRITABLE_BOOK
    position: 16
    name: "&c&lServer Rules"
    lore:
      - "&7Click to view rules"
    open-menu: rules  # Opens another menu on click (name corresponds to menus/rules.yml)
    price: 0
    close-on-click: false

  vip-item:
    item: GOLD_INGOT
    position: 22
    name: "&6&lVIP Item"
    lore:
      - "&7Only VIP players can use"
    permission: "server.vip"  # Button-level permission, players without it see a no-permission message
    console-commands:
      - "give {player} diamond 5"
    custom-model-data: 1001  # Custom model data for resource packs (default 0 = not set)
```

### Button Properties Reference

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `item` | Material name | Yes | - | Button icon item type |
| `position` | Integer (0-53) | No | 0 | Button position in the menu |
| `name` | String | No | empty | Button display name |
| `lore` | String list | No | empty | Button description text |
| `player-commands` | String list | No | empty | Commands executed as the player |
| `console-commands` | String list | No | empty | Commands executed as console |
| `price` | Decimal | No | 0 | Click cost amount |
| `open-menu` | String | No | null | Sub-menu to open on click |
| `close-on-click` | Boolean | No | true | Close menu after click |
| `permission` | String | No | null | Permission required to use button |
| `custom-model-data` | Integer | No | 0 | Custom model data value |

> `{player}` in commands is replaced with the name of the player who clicked the button. PlaceholderAPI variables (e.g., `%player_name%`) also work in commands.

## Usage Tutorials

### Scenario 1: Create a Shop Menu

Create file `plugins/UltiTools/UltiMenu/menus/shop.yml`:

```yaml
title: "&6&lShop"
size: 27

buttons:
  bread:
    item: BREAD
    position: 10
    name: "&eBread x16"
    lore:
      - "&7Buy 16 bread"
      - "&7Price: &e$50"
    price: 50
    console-commands:
      - "give {player} bread 16"

  iron-set:
    item: IRON_CHESTPLATE
    position: 12
    name: "&fIron Armor Set"
    lore:
      - "&7Buy a full iron armor set"
      - "&7Price: &e$500"
    price: 500
    console-commands:
      - "give {player} iron_helmet 1"
      - "give {player} iron_chestplate 1"
      - "give {player} iron_leggings 1"
      - "give {player} iron_boots 1"

  diamond-sword:
    item: DIAMOND_SWORD
    position: 14
    name: "&b&lDiamond Sword"
    lore:
      - "&7Buy a diamond sword"
      - "&7Price: &e$1000"
      - ""
      - "&cRequires VIP"
    price: 1000
    permission: "server.vip"
    console-commands:
      - "give {player} diamond_sword 1"
```

### Scenario 2: Create Multi-Level Sub-Menus

First, create the main menu `plugins/UltiTools/UltiMenu/menus/main.yml`:

```yaml
title: "&6&lServer Main Menu"
size: 27

buttons:
  shop:
    item: EMERALD
    position: 11
    name: "&a&lShop"
    lore:
      - "&7Open the shop menu"
    open-menu: shop
    close-on-click: false

  teleport:
    item: ENDER_PEARL
    position: 13
    name: "&d&lTeleport"
    lore:
      - "&7Open the teleport menu"
    open-menu: teleport
    close-on-click: false

  info:
    item: BOOK
    position: 15
    name: "&b&lServer Info"
    lore:
      - "&7Server address: play.example.com"
      - "&7Online: &a%server_online%"
    close-on-click: false
```

Then create the sub-menu `plugins/UltiTools/UltiMenu/menus/teleport.yml`:

```yaml
title: "&d&lTeleport Menu"
size: 27

buttons:
  spawn:
    item: RED_BED
    position: 11
    name: "&c&lSpawn"
    lore:
      - "&7Teleport to spawn"
    player-commands:
      - "spawn"

  home:
    item: OAK_DOOR
    position: 13
    name: "&6&lMy Home"
    lore:
      - "&7Teleport home"
    player-commands:
      - "home"

  back:
    item: ARROW
    position: 22
    name: "&7Back to Main Menu"
    open-menu: main
    close-on-click: false
```

Now run `/menu main` to see the main menu, and click "Teleport" to open the teleport sub-menu.

### Scenario 3: Item-Bound Menu

If you want players to open a menu by right-clicking a specific item, add binding configuration:

```yaml
title: "&6&lNavigation Menu"
size: 27
bind-item: COMPASS  # Bind to compass
bind-name: "&6Navigator"  # Optional: also require item name match

buttons:
  # ... your button configuration
```

Give a player a compass named "Navigator" (with `&6` color code), and right-clicking it opens this menu.

> Binding match logic: first matches item type (`bind-item`), then if `bind-name` is set it also requires display name match (color codes are stripped for comparison), and if `bind-lore` is set it checks that the item's lore contains the specified text.

### Scenario 4: VIP Features Menu with Costs

```yaml
title: "&6&lVIP Privileges"
size: 45
permission: "server.vip"

buttons:
  fly:
    item: ELYTRA
    position: 20
    name: "&b&lFlight Mode (10 min)"
    lore:
      - "&7Enable flight for 10 minutes"
      - "&7Cost: &e$2000"
    price: 2000
    console-commands:
      - "fly {player} 600"

  heal:
    item: GOLDEN_APPLE
    position: 22
    name: "&c&lFull Heal"
    lore:
      - "&7Fully restore health"
      - "&7Cost: &e$100"
    price: 100
    console-commands:
      - "heal {player}"

  night-vision:
    item: ENDER_EYE
    position: 24
    name: "&9&lNight Vision (5 min)"
    lore:
      - "&7Get night vision for 5 minutes"
      - "&7Cost: &e$500"
    price: 500
    console-commands:
      - "effect give {player} night_vision 300 1"
```

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultikits.menu.use` | Use `/menu` command to open and list menus | Player |
| `ultikits.menu.admin` | Use `/menu reload` to reload menu configs | OP |

Additionally, each menu and button can have custom permissions set via the `permission` field.

## Soft Dependencies

| Plugin | Purpose |
|--------|---------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Use `%xxx%` variables in menu titles, button names, lore, and commands |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Button click cost feature (`price` field) |

Without PlaceholderAPI, `%xxx%` variables display as-is, but the `{player}` placeholder always works. Without Vault, buttons with `price` set will show an "Economy system is not available" message on click.

## FAQ

### What if the plugin doesn't work after installation?

Follow these troubleshooting steps:
1. Confirm UltiTools-API version is 6.2.0 or higher
2. Confirm the JAR file is in `plugins/UltiTools/plugins/` (not the root `plugins/` directory)
3. Restart the server completely (not `/ul reload` -- new module installations require a full restart)
4. Check the console log for any UltiMenu-related error messages
5. Confirm there are `.yml` files in the `plugins/UltiTools/UltiMenu/menus/` directory

### Config changes not taking effect?

Run `/menu reload` to reload all menu files. If changes still don't apply, check your YAML formatting -- indentation must use spaces (not tabs), and there must be a space after colons. The console will show which menus failed to load and why.

### How to set up permissions?

UltiMenu permissions are managed through your permission plugin. For example, with LuckPerms:

```
/lp group default permission set ultikits.menu.use true
/lp group admin permission set ultikits.menu.admin true
/lp group vip permission set server.vip true
```

### Menu size error?

The menu size (`size`) must be a multiple of 9, in the range 9-54:
- `9` = 1 row
- `18` = 2 rows
- `27` = 3 rows (default)
- `36` = 4 rows
- `45` = 5 rows
- `54` = 6 rows

Other values will cause the menu to fail loading, and the console will show `Invalid menu size`.

### What Material names should I use for buttons?

Material names use Minecraft's Material enum names, all uppercase with underscores. For example:
- `DIAMOND_SWORD` (Diamond Sword)
- `IRON_CHESTPLATE` (Iron Chestplate)
- `ENDER_PEARL` (Ender Pearl)
- `OAK_PLANKS` (Oak Planks)
- `GOLDEN_APPLE` (Golden Apple)

See the full list at [Spigot Material Documentation](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html). Invalid names will show an `invalid material` warning in the console.

### Economy costs not working?

Ensure the following conditions are met:
1. Vault plugin is installed
2. A Vault-compatible economy plugin is installed (e.g., EssentialsX, UltiEconomy, etc.)
3. The button's `price` value is greater than 0

### Sub-menu not opening?

Check that the `open-menu` value matches the target menu filename. For example, `open-menu: rules` requires a `menus/rules.yml` file to exist. Menu names are case-insensitive.

## Changelog

### v1.0.0 (2026-02-13)

Added: Multi-file YAML menu system with one config file per menu
Added: Configurable menu sizes (9/18/27/36/45/54 slots)
Added: Button support for item icons, display names, and lore text
Added: Button support for player commands and console commands
Added: Vault economy integration for button click costs
Added: Sub-menu navigation feature (open-menu)
Added: Item binding to open menus, with item type, name, and lore matching
Added: PlaceholderAPI variable support in titles, button names, lore, and commands
Added: Independent permission controls for menus and buttons
Added: Custom model data (custom-model-data) support for resource packs
Added: Configurable global click debounce
Added: Auto-generated example menu on first launch
