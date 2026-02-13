# UltiRemoteBag - Remote Bag

UltiRemoteBag is a UltiTools framework module that provides virtual cloud storage (remote bag) functionality for Minecraft servers. Players can open their remote bags anytime to store and retrieve items. It supports multiple bag pages with up to 54 slots each. The module includes Vault economy integration so players can purchase additional bag pages. Admins can view, create, delete, and clear any player's bags. The bag system has full concurrent access control (a locking mechanism) that automatically puts admins into read-only mode when the owner is using a bag, preventing data conflicts. All operations have sound feedback.

## Installation

There are two ways to install:

**Option 1: Via UltiTools Plugin Manager**

Run in the server console or in-game:

```
/upm install UltiRemoteBag
```

**Option 2: Manual Installation**

1. Download the `UltiRemoteBag.jar` file
2. Place the JAR file into the `plugins/UltiTools/plugins/` directory
3. Restart the server

Optional dependency: To use the bag purchase feature, make sure [Vault](https://www.spigotmc.org/resources/vault.34315/) and an economy plugin (e.g., EssentialsX) are installed.

After installation, the configuration file is automatically generated at `plugins/UltiTools/UltiRemoteBag/config/remotebag.yml`.

## Quick Start

After installation, each player starts with 1 bag page (54 slots) by default, expandable up to 10 pages.

1. Type `/bag` to open the bag main page GUI and see all your bags
2. Click a bag icon to open it, then store items as you would in a chest
3. Items are saved automatically when you close the GUI

If your server has the Vault economy plugin installed, you will see a "Purchase New Bag" button on the main page:

```
/bag           # Open the bag main page (view all bags)
/bag 1         # Directly open bag page 1
/bag save      # Manually save bag data
```

## Commands

All commands are player-only and cannot be used from the console.

Command aliases: `/bag`, `/remotebag`, `/rb`, `/yunbag`

### Player Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bag` | Open the bag main page GUI | `/bag` | `ultibag.use` |
| `/bag <page>` | Directly open a specific bag page | `/bag 2` | `ultibag.use` |
| `/bag save` | Manually save bag data | `/bag save` | `ultibag.use` |

### Admin Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bag see <player>` | View a player's first bag page | `/bag see Steve` | `ultibag.admin.see` |
| `/bag see <player> <page>` | View a player's specific bag page | `/bag see Steve 3` | `ultibag.admin.see` |
| `/bag create <player>` | Create a new bag page for a player | `/bag create Steve` | `ultibag.admin.create` |
| `/bag delete <player> <page>` | Delete a player's bag page | `/bag delete Steve 3` | `ultibag.admin.delete` |
| `/bag clear <player> <page>` | Clear a player's bag page contents | `/bag clear Steve 2` | `ultibag.admin.clear` |
| `/bag list <player>` | List all of a player's bags | `/bag list Steve` | `ultibag.admin.list` |

## Permissions

### Player Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibag.use` | Basic remote bag functionality | All players |
| `ultibag.pages.1` | Access to 1 bag page | All players |
| `ultibag.pages.2` | Access to 2 bag pages | None |
| `ultibag.pages.3` | Access to 3 bag pages | None |
| `ultibag.pages.N` | Access to N bag pages (N is a positive integer, up to `max_pages`) | None |

Page permissions are upward-compatible: a player with `ultibag.pages.5` can have up to 5 bag pages. The system checks downward from the configured `max_pages` value and uses the highest permission number the player has as their limit.

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibag.admin.see` | View other players' bags | OP |
| `ultibag.admin.create` | Create bags for other players | OP |
| `ultibag.admin.delete` | Delete other players' bags | OP |
| `ultibag.admin.clear` | Clear other players' bags | OP |
| `ultibag.admin.list` | List other players' bags | OP |

## Configuration

Configuration file path: `plugins/UltiTools/UltiRemoteBag/config/remotebag.yml`

```yaml
# Default number of bag pages for new players (range: 1-100)
default_pages: 1

# Maximum number of bag pages a player can have (range: 1-100)
max_pages: 10

# Number of rows per page (range: 1-6, each row = 9 slots)
# 6 rows = 54 slots (maximum)
rows_per_page: 6

# GUI title, {PAGE} is current page, {MAX} is max page
gui_title: "&6Remote Bag &7Page {PAGE}/{MAX}"

# Enable permission-based page limits
# When enabled, a player's max pages is determined by ultibag.pages.N permission
# When disabled, all players share the max_pages limit
permission_based_pages: true

# Permission prefix (used to calculate page limits)
# For example, with prefix ultibag.pages., a player with ultibag.pages.5 has a limit of 5 pages
permission_prefix: "ultibag.pages."

# Auto save interval (unit: seconds, 0 to disable, range: 0-3600)
auto_save_interval: 300

# Save bag when player closes the GUI
save_on_close: true

# Message settings
messages:
  no_permission: "&cYou don't have permission to use remote bags!"
  page_locked: "&cYou don't have permission to access page {PAGE}!"
  bag_saved: "&aRemote bag saved!"

# Economy settings (requires Vault plugin)
economy:
  enabled: true              # Enable bag purchasing
  base_price: 10000          # Base price for purchasing a bag (range: 0-1000000000)
  price_increase_enabled: true  # Enable price increase per purchase
  price_increase_rate: 0.1   # Price increase rate (range: 0.0-10.0)
                             # Formula: basePrice * (1 + rate)^(n-1)
                             # 0.1 means each additional bag costs 10% more
                             # Example with base price 10000:
                             #   Bag 1 = 10000
                             #   Bag 2 = 11000
                             #   Bag 3 = 12100

# Sound settings
sound:
  enabled: true                     # Enable sound effects
  open: "BLOCK_CHEST_OPEN"          # Sound when opening a bag
  close: "BLOCK_CHEST_CLOSE"        # Sound when closing a bag
  purchase: "ENTITY_PLAYER_LEVELUP" # Sound on successful purchase
  error: "ENTITY_VILLAGER_NO"       # Sound on error
  volume: 1.0                       # Volume (range: 0.0-1.0)
  pitch: 1.0                        # Pitch (range: 0.5-2.0)

# Lock settings (concurrent access control)
lock:
  timeout_seconds: 300       # Lock timeout (unit: seconds, range: 10-3600)
                             # Locks are automatically released after timeout
                             # to prevent deadlocks from abnormal disconnects
  notify_readonly_viewers: true  # Notify read-only admins when the owner starts using the bag
```

## Usage Tutorials

### Scenario 1: Using Remote Bags for the First Time

You just joined the server and want to try the remote bag feature:

1. Type `/bag` to open the bag main page
2. You will see a chest icon representing your first bag
3. Click the chest icon to open it, and store items just like a regular chest
4. Items are saved automatically when you close the GUI
5. Next time, type `/bag` or `/bag 1` to reopen it

### Scenario 2: Purchasing More Bags

Your first bag is almost full and you want more storage space:

1. Type `/bag` to open the main page
2. At the end, you will see a "Purchase New Bag" button showing the price and your balance
3. If you can afford it (green button), click to purchase
4. If you cannot afford it (red button), you need to earn more money first

Price increase example (base price 10000, increase rate 10%):
- Bag 1: 10000
- Bag 2: 11000
- Bag 3: 12100
- Bag 4: 13310

### Scenario 3: Admin Viewing a Player's Bag

An admin suspects a player may have obtained items through cheating and wants to inspect their bags:

1. Type `/bag see PlayerName` to view their first bag page
2. Or `/bag see PlayerName 3` to view a specific page
3. If the player is currently using that bag, the admin will automatically enter read-only mode
4. In read-only mode, items cannot be moved, and a refresh button appears in the toolbar
5. After the player closes their bag, click the refresh button to switch to edit mode

### Scenario 4: Admin Managing Bags

```
/bag list Steve        # View an overview of Steve's bags (item counts, slot usage)
/bag create Steve      # Create a new bag page for Steve
/bag clear Steve 2     # Clear the contents of Steve's bag page 2 (page is kept)
/bag delete Steve 3    # Completely delete Steve's bag page 3
```

Note: If the target bag is currently in use (locked), delete and clear operations will be rejected.

### Scenario 5: Controlling Bag Pages with Permissions

You can use a permissions plugin like LuckPerms to precisely control how many bag pages different groups can have:

```
/lp group default permission set ultibag.pages.1 true   # Default group: 1 page
/lp group vip permission set ultibag.pages.3 true       # VIP group: 3 pages
/lp group svip permission set ultibag.pages.5 true      # SVIP group: 5 pages
/lp group admin permission set ultibag.pages.10 true    # Admin group: 10 pages
```

Make sure `permission_based_pages` is set to `true` in the configuration file.

## Locking Mechanism

UltiRemoteBag has a built-in concurrent access control system to prevent multiple people from editing the same bag simultaneously, which would cause data conflicts:

**Owner accessing their own bag:**
- No one is using the bag -> Enter edit mode directly
- An admin is editing it -> Blocked, told to try again later

**Admin accessing someone else's bag:**
- No one is using the bag -> Enter edit mode
- The owner is using it -> Automatically enter read-only mode
- Another admin is editing it -> Blocked, told to try again later

**Lock timeout:** Default 300 seconds (5 minutes). Locks are automatically released after timeout to prevent deadlocks caused by client crashes or abnormal disconnects.

**Cleanup on quit:** When a player leaves the server, all locks they hold are automatically released, bag data is saved to the database, and the memory cache is cleared.

## FAQ

**Q: What if the plugin doesn't work after installation?**

A: Check the following:
1. Make sure UltiTools-API is version 6.2.0 or higher
2. Confirm the JAR file is placed in `plugins/UltiTools/plugins/`, not the `plugins/` root directory
3. A server restart is required after installation; `/ul reload` only reloads configuration, it cannot load new module JARs
4. Check the server console for any error messages

**Q: Config changes not taking effect?**

A: After modifying `plugins/UltiTools/UltiRemoteBag/config/remotebag.yml`, run `/ul reload` to reload the configuration. Make sure you have not broken the YAML indentation format.

**Q: How to set up permissions?**

A: All UltiRemoteBag permissions start with `ultibag.`. We recommend using a permissions plugin like LuckPerms.

To control bag page limits, enable `permission_based_pages` and assign `ultibag.pages.N` to different groups:

```
/lp group vip permission set ultibag.pages.5 true
```

Admin permissions are separate and can be assigned as needed:
```
/lp group admin permission set ultibag.admin.see true
/lp group admin permission set ultibag.admin.create true
```

**Q: Why can't I see the purchase button?**

A: There are several possible reasons:
1. `economy.enabled` is set to `false` in the configuration
2. The server does not have the Vault plugin or an economy plugin (e.g., EssentialsX) installed
3. You have already reached the maximum bag page limit

**Q: Why is the admin view read-only?**

A: When the bag owner is currently using that bag, the admin automatically enters read-only mode to prevent data conflicts from two people editing simultaneously. After the owner closes the bag, the admin can click the "Refresh" button in the GUI toolbar to attempt switching to edit mode.

**Q: Will bag data be lost when a player logs out?**

A: No. Bag data is automatically saved to the database when a player quits, and the memory cache is cleared. Data is reloaded from the database on next login. There is also a background auto-save task (default every 300 seconds) and auto-save when closing the GUI.

**Q: Where is the data stored?**

A: It depends on the UltiTools-API storage backend configuration (in config.yml):
- **SQLite** (default): Data is stored in a database file under `plugins/UltiTools/`
- **MySQL**: Data is stored in a remote MySQL database
- **JSON**: Data is stored in JSON files under `plugins/UltiTools/`

**Q: What is the difference between delete and clear?**

A: `/bag clear` empties the contents of a bag page (all items are removed) but keeps the page itself. `/bag delete` completely removes the bag page, including the database record.

## Changelog

### v1.0.0 (2026-02-13)

Initial release.

Added:
- Added: Multi-page remote bag system with up to 54 slots per page
- Added: GUI main page showing all bag thumbnails (item counts, slot usage)
- Added: Edit mode and read-only mode with full concurrent access locking mechanism
- Added: Vault economy integration for purchasing new bag pages with price increase formula
- Added: Permission-based bag page limits (`ultibag.pages.N`)
- Added: Admin commands (see, create, delete, clear, list player bags)
- Added: Auto-save functionality (timed save, save on GUI close, save on quit)
- Added: Configurable sound effects (open, close, purchase, error sounds)
- Added: Lock timeout mechanism to prevent deadlocks from abnormal disconnects
- Added: Automatic lock release and data save on player quit
- Added: Chinese and English language support
