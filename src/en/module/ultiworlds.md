# UltiWorlds

Multi-world management module -- world creation, teleportation, protection, inventory isolation, and per-world rule configuration.

## Feature Overview

UltiWorlds is the multi-world management module for the UltiTools framework, providing a complete toolkit for operating servers with multiple worlds. You can create new worlds via commands or an interactive wizard (supporting Normal, Nether, and End environments), and independently configure PVP toggle, monster/animal spawning, weather control, and difficulty level for each world. The teleportation system supports both a GUI browser and command-line access, with cooldowns and permission checks. The protection system can enable block breaking/placing/interaction/explosion protection with a single command. Access control includes world locking, blocking, and hiding. The inventory isolation system supports isolating inventories, ender chests, experience, health, hunger, and potion effects per world or world group. Additional features include multi-line world descriptions (with color codes and PlaceholderAPI), post-teleport command execution, and automatic unloading of empty worlds.

## Installation

**Method 1: Install via UPM (UltiTools Package Manager)**

```
/upm install UltiWorlds
```

**Method 2: Manual installation**

1. Ensure your server has UltiTools-API 6.2.0 or higher installed
2. Place `UltiWorlds-2.0.0.jar` in the `plugins/UltiTools/plugins/` directory
3. Restart the server

## Quick Start

After installation, follow these steps to get started quickly:

```
1. Open the world list GUI
   /world

2. Create a new world
   /world create myworld

3. Teleport to the new world
   /world tp myworld

4. Set the world spawn point
   /world setspawn

5. View world information
   /world info

6. Use the creation wizard (interactive)
   /world wizard
```

## Commands

### Basic Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/world` | Open world list GUI | `ultiworlds.use` | Player only |
| `/world list` | List all worlds with player counts | `ultiworlds.use` | Player only |
| `/world tp <world>` | Teleport to a world (5s cooldown) | `ultiworlds.use` | Player only |
| `/world info` | View detailed info about your current world | `ultiworlds.use` | Player only |
| `/world help` | Display help information | `ultiworlds.use` | Player only |

### Creation and Management Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/world wizard` | Start interactive world creation wizard | `ultiworlds.admin.create` | Player only |
| `/world create <name>` | Create a new world with Normal environment | `ultiworlds.admin.create` | Player only |
| `/world create <name> <type>` | Create a new world with specified environment (NORMAL / NETHER / THE_END) | `ultiworlds.admin.create` | Player only |
| `/world load <name>` | Load an existing but unloaded world | `ultiworlds.admin.load` | Player only |
| `/world unload <name>` | Unload a world (players are teleported to the default world) | `ultiworlds.admin.unload` | Player only |
| `/world delete <name>` | Delete a world (unloads and deletes files, irreversible) | `ultiworlds.admin.delete` | Player only |
| `/world setspawn` | Set the current world's spawn to your location | `ultiworlds.admin.setspawn` | Player only |

### Settings Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/world set <world> pvp <true/false>` | Toggle PVP | `ultiworlds.admin.settings` | Player only |
| `/world set <world> monsters <true/false>` | Toggle monster spawning | `ultiworlds.admin.settings` | Player only |
| `/world set <world> animals <true/false>` | Toggle animal spawning | `ultiworlds.admin.settings` | Player only |
| `/world set <world> weather <true/false>` | Toggle weather changes | `ultiworlds.admin.settings` | Player only |
| `/world set <world> hidden <true/false>` | Hide world from list | `ultiworlds.admin.settings` | Player only |
| `/world set <world> locked <true/false>` | Lock world access | `ultiworlds.admin.settings` | Player only |
| `/world set <world> blocked <true/false>` | Block world entry | `ultiworlds.admin.settings` | Player only |
| `/world set <world> displayname <name>` | Set display name | `ultiworlds.admin.settings` | Player only |
| `/world set <world> description <text>` | Set description text | `ultiworlds.admin.settings` | Player only |
| `/world set <world> icon <material>` | Set GUI icon material | `ultiworlds.admin.settings` | Player only |
| `/world set <world> difficulty <level>` | Set difficulty (PEACEFUL / EASY / NORMAL / HARD) | `ultiworlds.admin.settings` | Player only |

### Difficulty Command

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/world difficulty <world> <level>` | Directly set world difficulty | `ultiworlds.admin.settings` | Player only |

Difficulty options: `PEACEFUL`, `EASY`, `NORMAL`, `HARD`.

### Protection Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/world protect <world>` | Enable full protection (block break/place/interact/explosion) | `ultiworlds.admin.protect` | Player only |
| `/world unprotect <world>` | Disable all protection | `ultiworlds.admin.protect` | Player only |

### Access Control Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/world block <world>` | Block all players from entering (players in the world are kicked to default world) | `ultiworlds.admin.block` | Player only |
| `/world unblock <world>` | Allow players to enter the world | `ultiworlds.admin.block` | Player only |

### Post-Teleport Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/world postcmd <world> add <command>` | Add a command to execute after teleporting | `ultiworlds.admin.settings` | Player only |
| `/world postcmd <world> list` | View configured post-teleport commands | `ultiworlds.use` | Player only |
| `/world postcmd <world> clear` | Clear all post-teleport commands | `ultiworlds.admin.settings` | Player only |

Post-teleport commands support `{player}` and `{world}` placeholders and run as console.

## Configuration

All configuration files are located in `plugins/UltiTools/UltiWorlds/`.

### Main Config: config/worlds.yml

```yaml
# Default world name
default_world: "world"

# Protected worlds (cannot be auto-unloaded or deleted)
protected_worlds:
  - "world"
  - "world_nether"
  - "world_the_end"

# Worlds to auto-load on server start
load_worlds_on_start: []

# ===== Auto-Unload Settings =====
auto_unload:
  enabled: false                     # Enable auto-unloading of empty worlds
  check_interval: 60                 # Check interval (seconds, 10-3600)
  unload_after: 300                  # Unload after being empty for (seconds, 60-86400)

# ===== GUI Settings =====
gui_title: "&6World List"            # World list GUI title

# ===== Teleport Settings =====
tp_to_world:
  enabled: true                      # Allow players to teleport between worlds
  permission_per_world: false        # Require permission for each world
  cooldown: 10                       # Teleport cooldown (seconds, 0-300)
  show_description: true             # Show world description on teleport

world_spawn:
  use_spawn_location: true           # Teleport to world spawn (instead of last location)

# ===== Inventory Isolation Settings =====
world_isolation:
  enabled: false                     # Enable inventory isolation (off by default)
  separate_inventory: true           # Isolate inventories
  separate_ender_chest: true         # Isolate ender chests
  separate_experience: false         # Isolate XP levels
  separate_health: false             # Isolate health
  separate_hunger: false             # Isolate hunger
  separate_effects: false            # Isolate potion effects
  shared_worlds:                     # World groups that share inventory (comma-separated)
    - "world,world_nether,world_the_end"

# ===== Messages =====
messages:
  world_teleport: "&aTeleported to world: {WORLD}"
  world_not_found: "&cWorld {WORLD} does not exist!"
  no_permission: "&cYou don't have permission to enter world {WORLD}!"
  world_created: "&aWorld {WORLD} has been created!"
  world_deleted: "&cWorld {WORLD} has been deleted!"
```

## Usage Tutorials

### Tutorial 1: Creating a World with the Wizard

The wizard provides step-by-step guidance, ideal for admins unfamiliar with command parameters:

```
/world wizard
```

The wizard will ask you in sequence:
1. World name (letters, numbers, underscores, and hyphens only)
2. Environment type (1 = Normal / 2 = Nether / 3 = The End)
3. Terrain type (1 = Normal / 2 = Flat / 3 = Amplified / 4 = Large Biomes)
4. Whether to generate structures (villages, temples, etc.)
5. World seed (leave empty for random)
6. Confirmation

Each step has a 60-second input limit. Type `cancel` at any time to abort.

### Tutorial 2: Configuring World Rules

After creating a world, you can customize its rules:

```
/world set myworld pvp false           -- disable PVP
/world set myworld monsters false      -- disable monster spawning
/world set myworld weather false       -- lock weather to clear
/world set myworld displayname "&aMy World"  -- set display name
/world set myworld description "A peaceful world"  -- set description
/world set myworld icon DIAMOND_BLOCK  -- set GUI icon
/world difficulty myworld PEACEFUL     -- set difficulty to peaceful
```

### Tutorial 3: Setting Up World Protection

Enable full protection with one command (ideal for lobbies, showcases, etc.):

```
/world protect lobby                   -- enables all protection:
                                        block breaking disabled
                                        block placing disabled
                                        interaction disabled
                                        explosions disabled

/world unprotect lobby                 -- disables all protection
```

Players with `ultiworlds.bypass.protection` permission are not affected by protection.

### Tutorial 4: Configuring Inventory Isolation

Enable inventory isolation in `config/worlds.yml`:

```yaml
world_isolation:
  enabled: true
  separate_inventory: true
  separate_ender_chest: true
  separate_experience: true
  shared_worlds:
    - "world,world_nether,world_the_end"   # Overworld dimensions share inventory
    - "creative_world"                      # Creative world has its own inventory
```

With this configuration:
- The overworld (world), nether (world_nether), and end (world_the_end) share the same inventory
- creative_world has a separate inventory
- All other worlds have their own individual inventories

Player inventories and ender chests are automatically saved and loaded when switching worlds.

### Tutorial 5: Using Post-Teleport Commands

Post-teleport commands execute automatically as console when a player teleports to a world:

```
/world postcmd pvp_arena add effect {player} speed 600 1
/world postcmd pvp_arena add gamemode survival {player}
/world postcmd pvp_arena list              -- view configured commands
/world postcmd pvp_arena clear             -- clear all commands
```

Supported placeholders:
- `{player}` -- player name
- `{world}` -- target world name

### Tutorial 6: Managing World Access

```
/world block event_world               -- block entry (players inside are kicked to default world)
/world unblock event_world             -- allow entry
/world set event_world locked true     -- lock world (requires permission to enter)
/world set event_world hidden true     -- hide world from list
```

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultiworlds.use` | Basic usage (open GUI, teleport, view info) | Player |
| `ultiworlds.admin` | Admin permission (includes all sub-permissions) | OP |
| `ultiworlds.admin.create` | Create worlds | OP |
| `ultiworlds.admin.delete` | Delete worlds | OP |
| `ultiworlds.admin.load` | Load worlds | OP |
| `ultiworlds.admin.unload` | Unload worlds | OP |
| `ultiworlds.admin.setspawn` | Set world spawn | OP |
| `ultiworlds.admin.settings` | Modify world settings | OP |
| `ultiworlds.admin.protect` | Manage world protection | OP |
| `ultiworlds.admin.block` | Manage world access control | OP |
| `ultiworlds.bypass.locked` | Bypass world lock restriction | OP |
| `ultiworlds.bypass.blocked` | Bypass world block restriction | OP |
| `ultiworlds.bypass.protection` | Bypass world protection | OP |
| `ultiworlds.world.*` | Access all worlds (when `permission_per_world` is enabled) | OP |
| `ultiworlds.world.<worldname>` | Access a specific world (when `permission_per_world` is enabled) | - |

## FAQ

**Q: What if the plugin doesn't work after installation?**

A: Check the following: (1) UltiTools-API version is 6.2.0 or higher; (2) The JAR is in `plugins/UltiTools/plugins/`, not in `plugins/`; (3) You fully restarted the server. Check the console for the "UltiWorlds has been enabled!" message.

**Q: Config changes not taking effect?**

A: After editing `config/worlds.yml`, run `/ul reload` to hot-reload most settings. However, core toggles like `world_isolation.enabled` require a full server restart to take effect.

**Q: How to set up permissions?**

A: Use the standard Bukkit permission system; we recommend LuckPerms. The basic permission `ultiworlds.use` should be given to all players. Admin commands require OP by default. To control per-world access, set `tp_to_world.permission_per_world: true` in the config, then assign `ultiworlds.world.<worldname>` to the appropriate groups.

**Q: Can a deleted world be recovered?**

A: No. `/world delete` unloads the world and then recursively deletes all files in the world folder. This is irreversible. Please confirm or make a backup before deleting. Worlds listed in `protected_worlds` cannot be deleted.

**Q: What happens to existing items when inventory isolation is enabled?**

A: When inventory isolation is first enabled, the player's current inventory in their current world is saved as the initial inventory for that world group. Other world groups start with empty inventories. It is recommended to enable this feature when no players are online to avoid data confusion.

**Q: What if the wizard times out?**

A: Each wizard step has a 60-second input limit. On timeout, the creation process is cancelled automatically with no side effects. You can start a new wizard at any time with `/world wizard`.

**Q: What format does the world description support?**

A: World descriptions support color codes (using `&` prefix, e.g., `&a` for green) and placeholders (`{player}` for player name, `{world}` for world name). Multi-line descriptions use `\n` as separator. If PlaceholderAPI is installed, PAPI variables can also be used in descriptions.

## Changelog

### v2.0.0 (2026-02-13)

Added: Interactive world creation wizard with environment/terrain/structures/seed options
Added: Command-line world creation supporting NORMAL / NETHER / THE_END environments
Added: World load/unload/delete management
Added: Auto-unload of empty worlds with configurable check interval and delay
Added: GUI world list browser
Added: Cross-world teleportation with cooldown
Added: Per-world spawn point setting
Added: Per-world difficulty configuration (PEACEFUL / EASY / NORMAL / HARD)
Added: Post-teleport command execution (add / list / clear management)
Added: Multi-line world descriptions with color codes and PlaceholderAPI support
Added: Independent PVP / monster / animal / weather rules per world
Added: Full world protection (break / place / interact / explosion)
Added: World locking, blocking, and hiding access controls
Added: Inventory isolation system (inventory / ender chest / XP / health / hunger / potion effects)
Added: World groups for shared inventory
Added: Permission system (basic access, admin operations, bypass restrictions, per-world permissions)
Added: Delete confirmation GUI
Added: Chinese and English language support
