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

1. Ensure your server has UltiTools-API 6.3.0 or higher installed
2. Place `UltiMenu-2.0.0.jar` in the `plugins/UltiTools/plugins/` directory
3. Restart the server
4. On first launch, an `example.yml` sample menu will be generated in `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/`

> Note: New module installations require a full server restart. `/ul reload` only reloads configuration files.

## Upgrading to 2.0.0

Back up menus and configuration, install UltiTools-API 6.3.0 or later, replace `UltiMenu-2.0.0.jar` and restart fully. Its catalogue identity is `ultimenu`, used for framework update checks and `/upm update`; framework reload/uninstall uses `UltiTools-Menu`. Existing values and menus are not automatically replaced with new defaults.

Check `menus/*.yml` and delete old top-level `command: servermenu`: it never registered `/servermenu`, and now warns by filename at every start or `/menu reload`. Continue opening with `/menu shop`, `/menu open shop`, bound items or `open-menu` buttons. Only a missing menus folder receives a Chinese or English example at startup; other languages get English. An existing folder is untouched.

Every open path requires `ultikits.menu.use`, then the target menu's own `permission`. An unset permission does not bypass the base node. The node is undeclared in plugin.yml and therefore OP-only by default; explicitly grant it to ordinary players:

```
/lp group default permission set ultikits.menu.use true
```

Players previously relying on permission-free bound items particularly need this: otherwise right-click is cancelled, including the item's ordinary use, and the refusal names ultikits.menu.use. A plain "You don't have permission to open this menu!" instead means you should check the target menu's custom node. `/menu reload` requires both use and admin.

### Button execution, reload and language

A click checks debounce, button permission, and target sub-menu existence/access before charging or scheduling commands. A missing or forbidden sub-menu costs nothing, runs nothing, and leaves the current menu open. Player commands, console commands and sub-menu navigation run next server tick; player commands keep list order, with `{player}` and PlaceholderAPI resolved at click time. The button's own close happens first, so it does not close another GUI a reward command opens. This is not a transaction guarantee or automatic refund for failed commands.

`/menu reload` reads menu definitions again and replies `Reloaded N menus`. After changing global `click_cooldown_ms`, use `/ul reload UltiTools-Menu`, then reopen the menu. These reloads are different: framework reload does not re-read menus; menu reload does not refresh global configuration or language. All buttons in one open window share a debounce timer.

For custom messages copy `plugins/UltiTools/pluginConfig/UltiTools-Menu/lang/en.json` to `en-myserver.json` in the same folder, migrate to ASCII keys such as `menu.list.header`, select `language: en-myserver` in `plugins/UltiTools/config.yml`, then run a bare `/ul reload`. Official files are restored at every start/module reload, keeping edits as `.bak`. A custom copy's missing keys fall back to its official prefix language; without an official prefix they fall back to English with a warning. Your menu titles and lore are not automatically translated on a language switch. `/upm uninstall UltiTools-Menu` unregisters `/menu` and its bound-item listener.

## Quick Start

After installation, UltiMenu automatically generates a sample menu. Here is a complete walkthrough of creating your own menu:

**1. Create a menu file**

Create a new file in `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/`, for example `shop.yml`:

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
| `/menu reload` | Reload all menu configs (requires use and `ultikits.menu.admin`) | Player / Console | `/menu reload` |

> The menu name is the YAML filename without the `.yml` extension, case-insensitive. For example, `Shop.yml` has the menu name `shop`.

## Configuration

### Global Config - config/config.yml

Located at `plugins/UltiTools/pluginConfig/UltiTools-Menu/config/config.yml`:

```yaml
# Global click debounce in milliseconds (range: 50-5000)
# Prevents rapid clicks from causing duplicate execution
click_cooldown_ms: 200
```

### Menu Files - menus/*.yml

All menu files are located in `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/`. Each `.yml` file represents one menu.

Below is a complete menu file structure reference:

```yaml
# Menu title, supports & color codes and PlaceholderAPI variables
# {player} is replaced with the player's name
title: "&6&lServer Menu &r&7- {player}"

# Menu size, must be a multiple of 9: 9 / 18 / 27 / 36 / 45 / 54
size: 27

# Permission required to open the menu (optional, null or empty = no extra menu node; ultikits.menu.use still required)
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

Create file `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/shop.yml`:

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

First, create the main menu `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/main.yml`:

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

Then create the sub-menu `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/teleport.yml`:

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

Commands are interpreted by their owning plugins. This example uses vanilla effects for ten minutes of slow falling rather than assuming a timed-flight plugin; `heal` requires a plugin that provides it.

```yaml
title: "&6&lVIP Privileges"
size: 45
permission: "server.vip"

buttons:
  fly:
    item: ELYTRA
    position: 20
    name: "&b&lSlow Falling (10 min)"
    lore:
      - "&7Get slow falling for 10 minutes"
      - "&7Cost: &e$2000"
    price: 2000
    console-commands:
      - "effect give {player} slow_falling 600 0"

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
| `ultikits.menu.use` | All menu-open paths and `/menu` commands | OP (grant explicitly to players) |
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
1. Confirm UltiTools-API version is 6.3.0 or higher
2. Confirm the JAR file is in `plugins/UltiTools/plugins/` (not the root `plugins/` directory)
3. Restart the server completely (not `/ul reload` -- new module installations require a full restart)
4. Check the console log for any UltiMenu-related error messages
5. Confirm there are `.yml` files in the `plugins/UltiTools/pluginConfig/UltiTools-Menu/menus/` directory

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

### v2.0.0

The Unreleased README server/Java badge claim was withdrawn at finalization; this release requires UltiTools-API 6.3.0 or later. Deferring commands by a tick does not mean every button closes the window; when configured to close, that close precedes the commands.

#### Changed

- This version requires UltiTools 6.3.0 or later and declares `api-version: 630` in `plugin.yml`
  (the released 1.0.0 declared `620`). An older framework now refuses the module before its start-up runs, with a warning
  that the UltiTools version is outdated; the refusal names the module by its `plugin.yml` `name:`,
  `UltiTools-Menu`. The README states the framework minimum as UltiTools 6.3.0 or later
  (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultimenu`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- A menu button's `player-commands` now run on the next server tick, after the click and any menu
  close performed by the button, like its `console-commands` and `open-menu` already did. UltiTools 6.3.0 runs a
  module command's body at the moment it is dispatched, so a command run inside the click would have
  opened its menu inside the click event and the button's own close would then have shut it: a button
  whose command opens another module's menu (for example `player-commands: ["kits"]`) would have failed
  to open it or lost it straight away.
  The commands keep their order and their `{player}`/PlaceholderAPI replacement; the only difference
  is that the effects of the command now come one tick after the click (UltiKits/UltiMenu#28).

- A player refused a menu because he lacks `ultikits.menu.use` is now told so by name: "You don't have
  permission to open this menu: you need ultikits.menu.use." A menu's own `permission` key still gives
  "You don't have permission to open this menu!". Both refusals used the second line, so neither the
  player nor an operator could tell which node to grant (UltiKits/UltiMenu#21).

- The example menu copied into a new `menus/` folder at first start now follows the server's
  `language`: the jar ships `menus/en/example.yml` and `menus/zh/example.yml`, and a language without
  its own example gets the English one. It was English whatever `language` said. An existing `menus/`
  folder is never touched, so existing installs keep the menus they have (UltiKits/UltiMenu#26).

- Language keys were renamed from Chinese sentences to ASCII keys (for example `menu.list.header`).
  If you customised this module's messages in your own language file -- a copy of an official file
  whose name starts with that file's language code and a hyphen (for example `lang/zh-myserver.json`),
  selected with `language: zh-myserver` in `plugins/UltiTools/config.yml` -- re-apply those edits to the new
  keys; until then each renamed message shows the text of the official language the name starts with. A copy
  whose name does not start with an official language code and a hyphen is still read, but every message
  it lacks then shows in English, with one warning. An edit made directly in an official
  language file (`lang/en.json`, `lang/zh.json`) is not kept: the framework restores the official files at
  every start and on every module reload and keeps the edited file as `.bak` (UltiKits/UltiTools-Reborn#616). A server that never
  customised messages needs no action.

#### Removed

- The per-menu `command` key never took effect and has been removed; it can be deleted from existing
  menu files. A menu definition file could set a top-level `command` key, and the shipped
  `menus/example.yml` set `command: servermenu`, but no command was ever registered from it, so
  `/servermenu` never existed. Menus open exactly as before: `/menu <name>`, `/menu open <name>`, a
  matching bound item, or another menu's `open-menu` button. The shipped example no longer sets the
  key. Removing the setting is not a rejection of the feature: a menu's own slash command is
  requested as UltiKits/UltiMenu#23 (UltiKits/UltiMenu#12).

- A menu file that still sets `command` now logs one warning each time it is loaded — at every start
  and every `/menu reload` — naming the module, the file and the key. Removing a key from the code does
  not remove it from anybody's file, so without this an operator who had set it would see no trace of
  the removal. A server first started on an earlier version still has the old example's
  `command: servermenu` line in `menus/example.yml` and will see this warning for that file until the
  line is deleted (UltiKits/UltiMenu#12).

#### Fixed

- `language: en` now applies to the `/menu` command description and to the refusal a console sender
  gets from `/menu <name>`, which showed a Chinese sentence in every language because neither had an
  English entry (UltiKits/UltiMenu#11); and to the five `/menu help` lines and the menu service's
  display name, which were fixed Chinese text. `language: zh` now also applies to the title a menu
  file without `title` gets (`Menu`) and to the console lines written while menu files load, which
  were fixed English text: an invalid menu size, a button with no item or an unknown material, a
  failed copy of the example menu, and the warning about a leftover `command` key. Their English wording is
  unchanged; under `language: zh` they are Chinese, except the file name, path and offending value,
  which are printed as written.

- Uninstalling this module with `/upm uninstall UltiTools-Menu` now really removes its commands
  (`/menu`) and stops its bound-item listener from firing; this module has no unload work of its
  own. Previously this module's empty unload method replaced the framework's, so both stayed active
  until the server restarted (UltiKits/UltiMenu#16).

- A button carrying both a `price` and an `open-menu` key no longer charges the player when the
  navigation is then refused. The sub-menu is now resolved and checked before the charge and before
  the button's player and console commands, so a button leading to a menu that does not exist — or
  that the player may not enter — costs nothing and runs nothing. Previously the charge, the
  `Deducted …` confirmation and the commands all happened first and the refusal came afterwards, with
  no refund, repeatable on every click (UltiKits/UltiMenu#20).

#### Security

- Opening a menu now requires `ultikits.menu.use` on every path, and a menu's own `permission`
  key is honoured on every path. Two paths did not enforce this: a bound item opened a menu that
  set no `permission` key for any player holding a matching item, including one denied
  `ultikits.menu.use` (UltiKits/UltiMenu#14), and a button's `open-menu` key opened the menu it
  named with no check of any kind, so a menu's own `permission` key did not restrict who could
  reach it from a parent menu (UltiKits/UltiMenu#15). **Operators who relied on permission-free
  bound items must now grant `ultikits.menu.use` to the players who use them.** Until it is granted,
  a matching bound item is swallowed on right-click — it performs no ordinary use — and its holder is
  told he lacks permission every time, which is the form this arrives in as a support question. The
  node is not declared in `plugin.yml`, so it defaults to operators only.


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
