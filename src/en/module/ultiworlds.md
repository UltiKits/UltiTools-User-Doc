# UltiWorlds

Multi-world management module -- world creation, teleportation, protection, inventory isolation, and per-world rule configuration.

The current module **2.0.0** requires **UltiTools-API 6.3.0 or later**. Fully restart after installing or replacing the JAR; `/ul reload` reloads configuration, not JARs.

## Feature Overview

UltiWorlds is the multi-world management module for the UltiTools framework, providing a complete toolkit for operating servers with multiple worlds. You can create new worlds via commands or an interactive wizard (supporting Normal, Nether, and End environments), and independently configure PVP toggle, monster/animal spawning, weather control, and difficulty level for each world. The teleportation system supports both a GUI browser and command-line access, with cooldowns and permission checks. The protection system can enable block breaking/placing/interaction/explosion protection with a single command. Access control includes world locking, blocking, and hiding. The inventory isolation system supports isolating inventories, ender chests, experience, health, hunger, and potion effects per world or world group. Additional features include multi-line world descriptions (with color codes and built-in placeholders), post-teleport command execution, and automatic unloading of empty worlds.

## Installation

**Method 1: Install via UPM (UltiTools Package Manager)**

```
/upm install ultiworlds
```

**Method 2: Manual installation**

1. Ensure your server has UltiTools-API 6.3.0 or higher installed
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
| `/world info [world]` | View detailed info about your current world | `ultiworlds.use` | Player only |
| `/world help` | Show help; console lists deletion only | `ultiworlds.use` | Player / server console |

### Creation and Management Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/world wizard` | Start interactive world creation wizard | `ultiworlds.admin.create` | Player only |
| `/world create <name>` | Create a new world with Normal environment | `ultiworlds.admin.create` | Player only |
| `/world create <name> <type>` | Create a new world with specified environment (NORMAL / NETHER / THE_END) | `ultiworlds.admin.create` | Player only |
| `/world load <name>` | Load an existing but unloaded world | `ultiworlds.admin.load` | Player only |
| `/world unload <name>` | Unload a world (players are teleported to the default world) | `ultiworlds.admin.unload` | Player only |
| `/world delete <name>` | Delete after confirmation (irreversible) | `ultiworlds.admin.delete` | Player / server console; not RCON |
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
| `/world set <world> autoUnload <true/false>` | Set this flag | `ultiworlds.admin.settings` | Player only |
| `/world set <world> protectBreak <true/false>` | Set this flag | `ultiworlds.admin.settings` | Player only |
| `/world set <world> protectPlace <true/false>` | Set this flag | `ultiworlds.admin.settings` | Player only |
| `/world set <world> protectInteract <true/false>` | Set this flag | `ultiworlds.admin.settings` | Player only |
| `/world set <world> protectExplosion <true/false>` | Set this flag | `ultiworlds.admin.settings` | Player only |

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
| `/world postcmd <world> list` | View configured post-teleport commands | `ultiworlds.admin.settings` | Player only |
| `/world postcmd <world> clear` | Clear all post-teleport commands | `ultiworlds.admin.settings` | Player only |

Post-teleport commands support `{player}` and `{world}` placeholders and run as console.

## Configuration

All configuration files are located in `plugins/UltiTools/pluginConfig/UltiWorlds/`.

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
  check_interval: 60                 # Check interval (seconds, 1-107374182; at least 10 recommended)
  unload_after: 300                  # Unload after being empty for (seconds, 60-86400)

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

```

#### Configuration reference (defaults for this language)

| Key | Type | Default | Description / range |
|---|---|---|---|
| `default_world` | text | `"world"` | Default world name |
| `protected_worlds` | list | `["world", "world_nether", "world_the_end"]` | Protected worlds (cannot be auto-unloaded or deleted) |
| `load_worlds_on_start` | list | `[]` | Worlds to auto-load on server start |
| `auto_unload.enabled` | boolean | `false` | Enable auto-unloading of empty worlds |
| `auto_unload.check_interval` | number | `60` | Check interval (seconds, 1-107374182; at least 10 recommended) |
| `auto_unload.unload_after` | number | `300` | Unload after being empty for (seconds, 60-86400) |
| `tp_to_world.enabled` | boolean | `true` | Allow players to teleport between worlds |
| `tp_to_world.permission_per_world` | boolean | `false` | Require permission for each world |
| `tp_to_world.cooldown` | number | `10` | Teleport cooldown (seconds, 0-300) |
| `tp_to_world.show_description` | boolean | `true` | Show world description on teleport |
| `world_spawn.use_spawn_location` | boolean | `true` | Teleport to world spawn (instead of last location) |
| `world_isolation.enabled` | boolean | `false` | Enable inventory isolation (off by default) |
| `world_isolation.separate_inventory` | boolean | `true` | Isolate inventories |
| `world_isolation.separate_ender_chest` | boolean | `true` | Isolate ender chests |
| `world_isolation.separate_experience` | boolean | `false` | Isolate XP levels |
| `world_isolation.separate_health` | boolean | `false` | Isolate health |
| `world_isolation.separate_hunger` | boolean | `false` | Isolate hunger |
| `world_isolation.separate_effects` | boolean | `false` | Isolate potion effects |
| `world_isolation.shared_worlds` | text | `# World groups that share inventory (comma-separated)` | See the key and complete example above |


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

A: Check the following: (1) UltiTools-API version is 6.3.0 or higher; (2) The JAR is in `plugins/UltiTools/plugins/`, not in `plugins/`; (3) You fully restarted the server. Check the console for the "UltiWorlds has been enabled!" message.

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

A: World descriptions support color codes (using `&` prefix, e.g., `&a` for green) and placeholders (`{player}` for player name, `{world}` for world name). Multi-line descriptions use `\n` as separator. This module handles the two placeholders above in teleport descriptions; unverified third-party placeholders are not an inbuilt guarantee.

### Upgrading to 2.0.0: Scheduling, Configuration and World Settings

Upgrade UltiTools-API to 6.3.0 or later before installing `UltiWorlds-2.0.0.jar`, then restart fully. The configuration root is `plugins/UltiTools/pluginConfig/UltiWorlds/`; upgrading does not replace your worlds, existing configuration values or custom comments. `auto_unload.check_interval` is in seconds, accepts 1–107374182 (at least 10 recommended), and defaults to 60. The first check is one interval after module load. `/ul reload UltiWorlds` applies a changed interval while preserving the cycle position. An out-of-range startup value refuses the module; at reload it keeps the running interval, warns with the key and reports partial completion. Running reload alone is not proof that the new value applied.

Automatic unloading also needs global `auto_unload.enabled: true`, the world's own `autoUnload: true`, no `protected_worlds` match, and emptiness longer than `auto_unload.unload_after`. Checks are periodic, not guaranteed at the exact threshold instant. An unknown `default_world` warns and falls back to the server's first world; failed `load_worlds_on_start` entries are reported at startup. Changing `world_isolation.enabled` needs a restart. Shared groups are built at startup, so restart after changing `shared_worlds` too; do not regroup while online players change worlds.

The eight unused keys are `gui_title`, `messages.world_teleport`, `messages.world_not_found`, `messages.no_permission`, `messages.world_created`, `messages.world_deleted`, `unload_empty_worlds` and `unload_delay`. They never took effect. Existing files keep them and warn for each at startup and module reload. Use `auto_unload.enabled` and `auto_unload.unload_after` instead. Customize messages and the list title by copying official `lang/en.yml` to `lang/en-myserver.yml` in the same folder, editing the copy and setting `language: en-myserver` in the UltiTools main configuration. Official files are restored at startup or module reload; previous edits remain only in `.bak`.

`/world info <world>` lists difficulty and all twelve flags. `/world set myworld autoUnload true`, `protectBreak`, `protectPlace`, `protectInteract` and `protectExplosion` set individual flags. Both text `/world list` and the GUI omit hidden worlds. A GUI click teleports next tick; direct `/world tp` is unchanged. Settings use the world's real name regardless of typed case. Old differently-cased rows are warned about, not merged; MySQL's case-insensitive collation may still find them. Shared inventory groups also ignore case, warning on duplicates and keeping the first group.

### Deletion Confirmation, Console and Panel

Back up first, then run `/world delete myworld` only for an unprotected world you intend to remove. Players receive a 30-second confirmation window. Only its own green `OK` deletes; red `Cancel` or closing does not. Confirmation rechecks permission, the default world and `protected_worlds`. Closing, expiry or this module starting another deletion of that name invalidates the old confirmation. Deletion is irreversible; confirmation is not a backup.

The server console can now delete too: the first `world delete myworld` only prompts, and the same spelling and case repeated within 30 seconds confirms. An expired repeat becomes a new request. RCON and command blocks are refused; other `/world` subcommands stay player-only. All commands actually executed as the server console share the `CONSOLE` identity. The console, UltiPanel, scheduled commands, menus, kits, mail and post-teleport commands can therefore complete one another's two-step confirmation.

After UltiPanel accepts dispatch, `data.output` says `Command dispatched to the server console. Its output appears in the server log stream.` This proves dispatch only. Read confirmation prompts, outcomes and refusals in the server log, or the panel log view with streaming enabled. **Never configure `world delete` as a post-teleport command**: two players teleporting within 30 seconds, or one teleport plus another console dispatch, may delete the world without prompting those players. Thus `ultiworlds.admin.settings` is effectively enough to delete an unprotected world through these commands; grant it only to trusted admins.

The default world and `protected_worlds` match ignoring case. Deletion uses the world's real folder name; a symbolic link is removed without following its target. Incomplete deletion keeps settings and warns. Confirmation does not recognize external delete-and-recreate: another plugin or hand replacement under the same name within 30 seconds can make the old confirmation delete the new world. Do not replace worlds externally while a confirmation is pending.

### Loading Existing Maps and Known Limitations

Back up an existing Nether or End world before `/world load myworld`. Every load reads the current folder shape instead of reusing an earlier inference. Only one real top-level `DIM-1` or `DIM1` without top-level `region` supplies NETHER or THE_END. Both dimensions, symbolic links, or a dimension plus `region` supply no guess, leave the server default and log what was observed. An ordinary overworld with no dimension directory keeps its previous behavior. If reorganizing, **move directories out, never delete them**: either can hold player builds.

Complete folder-shape reference (also reproduced in the Chinese page):

| folder holds | applied | move X out -> |
|---|---|---|
| `DIM-1` | NETHER | `DIM-1` -> none |
| `DIM1` | THE_END | `DIM1` -> none |
| `DIM-1`, `region` | none | `region` -> NETHER; `DIM-1` -> none |
| `DIM1`, `region` | none | `region` -> THE_END; `DIM1` -> none |
| `DIM-1`, `DIM1`, `region` | none | `DIM1` -> none; `DIM-1` -> none |
| `DIM-1`, `DIM1` | none | `DIM1` -> NETHER; `DIM-1` -> THE_END |
| `DIM-1(link)`, `region` | none | `region` -> none |
| `DIM-1(dangling)` | none | `DIM-1` -> none |
| `region` | none | |

Each shared-database setting change re-reads the row and writes only if it still matches. Contention is retried up to three times; afterwards it warns and the change is held in this server's memory only until its next successful change to that world or restart. Another server's changes reach this server's checks on its next change to any setting of that world or restart; the world's own PvP flag follows on a player entering, and difficulty after restart. A success chat line is not proof of durable storage; a removed row, for example, adds only a console failure.

Do not hand-edit internal tables while running. When repairing legacy shared SQLite data, write booleans only as `0`/`1`, and never write boolean or numeric settings as `NULL`; other spellings/nulls can make comparisons conflict until corrected. Several servers writing one SQLite file can make a settings command fail immediately; retry it. Use MySQL for shared settings. Inventory-save failures are logged, but changing worlds is not an atomic transaction or a no-loss guarantee under failure, disconnection or shutdown. Back up and schedule an empty-server maintenance window before enabling isolation or regrouping.

## Changelog

### v2.0.0

The unused old WorldListGUI implementation recorded in Unreleased was removed without changing anything visible to players or operators; the eight-key list on this page is authoritative for unused configuration. The entries below use the actual 2.0.0 release and corrected panel acknowledgment semantics: dispatch is not proof of deletion.

#### Added

- On startup, and again on every `/ul reload`, this module now checks your own `config/worlds.yml`
  for the eight keys this version no longer reads (the entries under Removed) and logs one warning per
  leftover, naming the module, the file and the key, and saying where the text comes from. Deleting
  a key from the module stops a *fresh* file being written with it but does nothing to the file you
  already have, so without this warning an edited value would go on meaning nothing, silently. Delete
  the keys from the file to silence it (part of UltiKits/UltiWorlds#38).

#### Changed

- **Requires UltiTools 6.3.0.** `plugin.yml` raises `api-version` from `620` in released 1.0.0 to `630`.
  UltiTools 6.2.x refuses to load this module because of that `api-version`.

- The empty-world check now runs on the framework's own config-bound scheduling, bound to
  `auto_unload.check_interval` (UltiTools 6.3.0, UltiKits/UltiTools-Reborn#531), instead of a one-second tick
  inside this module. The first check comes one interval after the module loads. `/ul reload` applies a changed
  value keeping the check's place in its cycle; a value outside 1 to 107374182 seconds refuses the module at
  start, and at `/ul reload` is not applied: the running interval is kept, a warning names the key, and the
  reload is reported as partial. **The minimum drops from 10 seconds to 1 second**; at least 10 seconds is
  recommended. Your `config/worlds.yml` is not rewritten; only a newly written file, or a key the framework newly inserts,
  carries the new comment.

- `plugin.yml` now declares `identify-string: ultiworlds`, the identifier the UltiKits catalogue lists this
  module under. With it the framework's update check at start and `/upm update` include this module; without
  it they skipped it. A module jar published before this change carries no identifier and cannot be an update
  source for this version.

- `/world delete <name>` now asks before it deletes. After the checks it always made (permission,
  a world by that name exists, not the default world, not in `protected_worlds`), it opens a
  confirmation window titled "Confirm Delete: &lt;name&gt;" instead of deleting on the spot; the world is
  deleted only when you click the window's green `OK` button. The red `Cancel` button, or closing
  the window any other way, deletes nothing. Clicking `OK` checks the permission, the default world
  and `protected_worlds` again, because they can change while the window is open, and a window
  deletes at most once, never after it has been closed, and only for a click on its own `OK` button
  (not for a click at the same slot in your own inventory). The window is valid for 30 seconds, the
  same limit and clock as the console's confirmation: `OK` after that deletes nothing and asks you
  to run the command again. If this module deletes that world for another request while your window
  is open -- or starts to and fails part-way -- your `OK` deletes nothing either. The chat lines change with it: the old "Deleting world &lt;name&gt;, please
  wait..." / "World &lt;name&gt; has been deleted!" / "Failed to delete the world!" lines
  (`world.delete.deleting`, `world.delete.success`, `world.delete.failed`) are no longer sent to a
  player; the window sends "World &lt;name&gt; has been deleted" or "Failed to delete world &lt;name&gt;"
  (`command.delete.success`, `command.delete.failed`), and "Delete operation cancelled"
  (`command.delete.cancelled`) for `Cancel`. If you customised those three old lines for players, carry
  your text over to the new keys in a custom language file, not in the official `lang/*.yml`: copy the
  official file in the same `lang/` folder to a name that starts with its language code and a hyphen
  (for example `lang/en-myserver.yml`) and set `language: en-myserver` in `plugins/UltiTools/config.yml`.
  An earlier edit made in an official file is not kept: the first start after the upgrade restores the
  file and keeps your previous file as `.bak`, where your old text is (UltiKits/UltiTools-Reborn#616). The
  old lines are now the console's (next entry) (UltiKits/UltiWorlds#19).

- **The server console can now delete a world, behind a typed confirmation.** Until now the whole
  `/world` command was player-only, so the console could not run `/world delete` at all. It now
  can, and it never deletes on the first request: `/world delete <name>` from the console makes the
  same checks as for a player (a world by that name exists, it is not the default world, it is not
  in `protected_worlds`), deletes nothing, and asks you to run the same command again within 30
  seconds. Only that repeat -- same world name, spelled and cased exactly the same, within 30
  seconds -- deletes, and it makes every check again first; it then prints "Deleting world &lt;name&gt;,
  please wait..." followed by "World &lt;name&gt; has been deleted!" or "Failed to delete the world!". A
  repeat after 30 seconds deletes nothing and starts a new 30-second wait; a repeat made after this
  module has deleted (or started deleting) a world by that name for another request deletes nothing, says so, and counts
  as a new request; a check that refuses the
  request or the repeat cancels the pending request; each request allows one deletion. A pending
  request lives in memory only and is lost on restart, and the 30 seconds are measured on a clock
  that changes to the system time do not affect. Command blocks and other non-player,
  non-console senders are refused, and so is RCON (the remote console protocol used by tools such
  as `mcrcon` and many chat bridges): it cannot delete a world. Every other `/world` subcommand stays player-only, as before;
  `/world help` from the console now lists only `/world delete` (UltiKits/UltiWorlds#19).

- **Every command that runs as the server console counts as the console**, and they all share one
  identity: each reports the name `CONSOLE`, so there is one pending confirmation per world name
  for all of them together, and any one of them confirms a request made by any other. That
  includes UltiPanel remote commands, post-teleport commands added with `/world postcmd add`, and
  console commands run by other modules or plugins (for example scheduled commands, menu actions,
  kit commands and mail commands).
  - **UltiPanel.** A panel user can delete a world by sending `world delete <name>` twice within 30
    seconds. When the server accepts the command dispatch, `command_result`'s `data.output` reads
    "Command dispatched to the server console. Its output appears in the server log stream."
    This acknowledges dispatch, not deletion: the command runs as the server console, and its prompt,
    outcome and any refusal go to the server log, not to `data.output`. Read those lines in the
    server log (or in the panel's log view, if log streaming is on).
  - **Post-teleport commands.** A `world delete <name>` stored as a post-teleport command runs every
    time any player teleports into that world with `/world tp` or the world list. Any two such
    teleports within 30 seconds, by the same player or by different players, delete the named world;
    so do one such teleport plus the same command from the console, the panel or any other
    console-run command within 30 seconds. Stored as `world delete {world}`, it targets whichever
    world is teleported into. The prompt goes to the console, so the teleporting players are never
    told. Do not add one. Adding post-teleport commands requires `ultiworlds.admin.settings`, so that
    permission is in effect enough to delete any unprotected world (UltiKits/UltiWorlds#19).

- **Known limitation.** A delete confirmation, from a player or from the console, does not try to
  recognise "the same world": it is bound to its 30 seconds and to this module's own deletions. A
  world deleted by another plugin or by hand, and created again under the same name within those 30
  seconds, is deleted by a confirmation given for the one before it (UltiKits/UltiWorlds#19).

#### Fixed

- **World settings on servers that share one database.** A world setting changed on one server is no longer
  undone by the next settings command on another server that shares the database. Each server kept every
  world's settings row in memory from its first read and wrote that whole copy back on every change, so a
  change made elsewhere in the meantime -- `/world set`, `protect`, `unprotect`, `block`, `unblock`,
  `difficulty`, `postcmd add`/`clear` or `setspawn`, on any setting of that world -- was reverted. Every change
  now reads the world's row from the database, changes only what the command sets, and writes it only if the
  row still holds what was read; if another server wrote the row in between, the change is read again and
  re-applied, up to three times, after which the console logs "Failed to update world settings" and the change
  is kept in this server's memory only, as after any failed write, until this server's next successful change to
  that world or a restart. A change made on another server reaches this server's own checks (the module's PvP
  damage check, protection, access, the world list) when this server next changes any setting of that world, or
  after a restart; the world's own PvP flag follows when a player changes into that world, and a difficulty
  change reaches this server's world only after a restart. One narrow limit is documented in `FEATURES.md`
  (`ultiworlds.settings.shared-db-external-change-kept`) (UltiKits/UltiWorlds#55).

- `/world delete` typed in another letter case than the world's name now deletes the world's own folder.
  The world was found ignoring case and unloaded, but the folder was looked up under the typed text; on a
  case-sensitive filesystem (Linux) that folder does not exist, so nothing was removed and the deletion
  was reported as done, leaving the world on disk (UltiKits/UltiWorlds#52).

- A world-settings change whose stored row no longer exists is now logged on the console as failed
  ("Failed to update world settings"); before, it passed as saved without a trace. This can happen when
  two servers share one database and one deletes a world's row while the other still has it in memory,
  or when someone deletes the row by hand: the command answered success and the setting was gone after
  the next restart. The command's own reply is unchanged; only the console line is new. Needs
  UltiTools-API 6.3.0 (UltiKits/UltiWorlds#51, UltiKits/UltiTools-Reborn#558).

- Clicking a world in the world list now teleports you one tick after the click, not inside it. The
  teleport runs the world's post-teleport commands, and since UltiTools 6.3.0 a command of an
  UltiTools module runs the moment it is dispatched; one that opens another module's window (a menu,
  say) would otherwise try to open it inside the click event, which Paper refuses. A player who
  leaves in that tick is not teleported. `/world tp` typed as a command is unchanged
  (UltiKits/UltiWorlds#50).

- A world-inventory save whose stored row no longer exists is now reported as failed on every storage
  type, in the same console line a failed write always produced ("Failed to save inventory for
  &lt;player&gt;"). Before, only the JSON storage reported it; on SQLite and MySQL the save wrote nothing
  and passed as saved. Needs UltiTools-API 6.3.0 (UltiKits/UltiWorlds#49, UltiKits/UltiTools-Reborn#558).

- `/world list` no longer lists a world you marked hidden (`/world set <world> hidden true`). The world
  list window already left it out; the text list showed it anyway, and counted it in the total
  (UltiKits/UltiWorlds#48).

- Every `/world` command now reads and writes a world's settings under the world's own name, however
  you type it. `/world set MYWORLD pvp false` found `myworld` (the server ignores case) but stored the
  change in a new settings row named `MYWORLD` that nothing reads, so the change applied once and was
  undone the next time a player entered the world, while the command reported success. `set`,
  `protect`, `unprotect`, `block`, `unblock`, `difficulty`, `postcmd`, `tp` (and a click in the world
  list) and `delete` all use the world's own name now; `/world tp` also no longer opens a blocked or
  locked world typed in another case. Rows already stored under another spelling are not merged:
  at start-up each one that matches a loaded world only when case is ignored is listed in one warning,
  naming the row and the world, and is otherwise left alone; the warning says that on MySQL, whose default
  collation ignores case, a lookup may still reach such a row (UltiKits/UltiWorlds#46).

- A value UltiWorlds cannot use is now named instead of being passed over silently: a
  `default_world` that is no loaded world is reported at start and on `/ul reload`, with the world
  players are sent to instead (the server's first world); a `load_worlds_on_start` entry that cannot
  be loaded is reported at start; and `/world set <world> icon <item>` refuses a name that is no
  item, where it stored it and showed the default icon.

- `auto_unload.check_interval` now decides how often empty worlds are checked, in seconds; a value
  changed with `/ul reload` applies at that reload (see the UltiTools 6.3.0 entry above). The check ran every
  60 seconds whatever the key said (UltiKits/UltiWorlds#38).

- `world_isolation.shared_worlds` now matches world names ignoring case, as the server does. An
  entry typed in another case than the world's name (`MyWorld` for `myworld`) matched nothing, so
  each world became its own group and walking through a portal between them emptied the player's
  inventory. A world listed twice, in any case, is reported at start and stays in the group of its
  first entry (UltiKits/UltiWorlds#34).

- Console and chat lines show a path, a world name or text you typed exactly as it is. A value that
  contained a later placeholder of its line, such as `{KEY}` in the configuration file's path, or
  `{WORLD}` in a description set with `/world set`, was rewritten by it. This covers the removed-key
  warning, the world-environment and invalid-difficulty warnings, the `/world list` lines and the
  `/world set` confirmation (UltiKits/UltiWorlds#43).

- `/world info` shows every setting a world stores: its difficulty and all twelve flags by name
  (PvP, monsters, animals, weather, the four protections, hidden, locked, blocked and auto-unload).
  It showed four, one of them a single "protection" line for all four protections. `/world info <world>` shows a named world. `/world set` now also accepts `autoUnload`, `protectBreak`,
  `protectPlace`, `protectInteract` and `protectExplosion`, which had no command to change them
  (UltiKits/UltiWorlds#17).

- A world description with several lines shows every line in the world list's icon. The whole
  description was one lore line, and the client shows nothing after a line break inside one, so
  only the first line appeared. A Windows line break (`\r\n`) now splits the same way in the list
  and in the lines shown on teleport (UltiKits/UltiWorlds#26).

- A player who hits another player in a world with PvP off is now told "PVP is disabled in this
  world!". The hit was stopped, but the line never arrived: the server stops such a hit before the
  module's damage handler runs, so the line is now sent on the attack attempt (UltiKits/UltiWorlds#23).

- A world with weather disabled (`/world set <world> weather false`) now also keeps thunder from
  starting. Rain was blocked, but thunder is a separate state, so a world could still turn
  thundering (UltiKits/UltiWorlds#24).

- `language: zh` now applies to this module's console lines that were fixed English text: the
  lines about a world's environment when it is loaded, the refusal to delete a protected world, the
  symbolic-link and incomplete-deletion lines of `/world delete`, the empty-world auto-unload line,
  an invalid stored difficulty, and a failed save of world settings or of a player's inventory.
  Their English wording is unchanged. The `/world` command's description (shown by `/help`) now
  follows `language` too; it was fixed Chinese text.

- `/world help` now shows an admin the `/world unprotect` and `/world unblock` lines. Both commands
  worked, and the language files carried their help text, but the help never printed it.

- `/world load` now brings a NETHER or THE_END world back as itself instead of as an overworld.
  Reloading such a world previously reported success while rebinding it to the `NORMAL`
  environment, so overworld terrain generated over the stored world. The environment is read from
  the dimension folder the server writes inside the world folder, and it is read again every time
  the command runs -- so it survives a restart, and it describes the folder as it is now rather
  than as it was earlier in the session. That is what makes the `move X out ->` column below
  something you can act on without restarting the server (UltiKits/UltiWorlds#22).

- `/world load` now works out a world's environment when it has to, refuses to work it out when
  the world folder is ambiguous, and says in the console which of those happened and what it saw.
  The console line reports what was found; it never tells you what to do, because the module has
  just said it cannot read the folder. The shapes below are listed in the order the module tries
  them, and the first one that matches decides — so a folder answering to more than one description,
  both dimension directories and no `region`, say, is the earlier shape:
  - **shape 1 — a dimension entry that is a link leading nowhere** — an unmounted volume or a moved
    directory. Nothing is applied. Restore what the link points at, or replace the link with a real
    directory.
  - **shape 2 — no dimension entry at all** — the ordinary overworld case. Nothing is worked out,
    nothing is logged, and nothing changes from previous versions.
  - **shape 3 — a dimension entry that is a symbolic link** — the module does not follow links when
    reading a world folder, so it did not read what the link points at. Nothing is applied. Because
    the order above reaches this before the two shapes under it, moving other directories out cannot
    help while the link is still a link; replace it with a real directory and the folder is read as
    whichever shape it then matches.
  - **shape 4 — both `DIM-1` and `DIM1` at the top level** — a single-player save or a downloaded
    map, where all three dimensions share one folder. Nothing is applied. Moving the dimension
    directory you do not want out leaves you in shape 5 if the folder also has a top-level `region`
    directory, as a single-player save does, and in shape 6 if it does not.
  - **shape 5 — a dimension directory AND a top-level `region` directory** — two worlds' terrain in
    one folder, which is what `UltiKits/UltiWorlds#22` produced. Nothing is applied. Whichever
    directory you move out, **move** it and do not delete it: players may have built in either one.
  - **shape 6 — a dimension directory and no top-level `region`** — an ordinary nether (or end)
    world, and the one shape where an environment is applied.
  The outcomes are the table below rather than prose, because a test reads this table and fails if
  it and the code ever disagree. `folder holds` lists the world folder's top-level entries,
  `(link)` marking a symbolic link to a directory and `(dangling)` one whose target is missing;
  `applied` is the environment the server is given, `none` meaning the module supplies none and the
  server uses its own default; `move X out ->` is what you get after moving that entry to a path
  outside the world folder.

  | folder holds | applied | move X out -> |
  |---|---|---|
  | `DIM-1` | NETHER | `DIM-1` -> none |
  | `DIM1` | THE_END | `DIM1` -> none |
  | `DIM-1`, `region` | none | `region` -> NETHER; `DIM-1` -> none |
  | `DIM1`, `region` | none | `region` -> THE_END; `DIM1` -> none |
  | `DIM-1`, `DIM1`, `region` | none | `DIM1` -> none; `DIM-1` -> none |
  | `DIM-1`, `DIM1` | none | `DIM1` -> NETHER; `DIM-1` -> THE_END |
  | `DIM-1(link)`, `region` | none | `region` -> none |
  | `DIM-1(dangling)` | none | `DIM-1` -> none |
  | `region` | none | |

  (UltiKits/UltiWorlds#22)

- `/world unload` and `/world delete` now compare the name you typed against `default_world`
  without regard to letter case. With `default_world: lobby`, `/world unload LOBBY` used to miss
  the "Cannot unload the default world!" refusal and unload the lobby anyway, after which players
  ejected from other worlds landed somewhere else; and `/world delete WORLD` could be told it was
  "listed in protected_worlds" when that list was empty (UltiKits/UltiWorlds#20).

- `/world delete` now refuses a world listed in `protected_worlds`, as that key's own comment
  ("Worlds that cannot be auto-unloaded or deleted") always promised. The sender is told
  "World `<name>` is listed in protected_worlds and cannot be deleted!" and nothing is removed —
  neither the world folder nor its stored settings. With the shipped defaults this means
  `/world delete world_nether` and `/world delete world_the_end` no longer permanently delete those
  worlds. The refusal lives in the service rather than in the command, so any future caller
  inherits it (UltiKits/UltiWorlds#20).

- `/world delete` no longer deletes through a symbolic link. A world folder that is itself a link
  had that link followed: everything under the directory it pointed at was deleted, and only the
  link entry was removed, so the command reported success for data that lived somewhere else
  entirely. The module already held that a linked directory is not part of a world folder and that
  only the link entry is removed — that rule covered a link found inside a world folder and not one
  standing in the world folder's own position, and it now covers both. A link whose own name is not
  in `protected_worlds` is therefore not a route to a protected world's data. The console says when
  the thing named is a link, and says it as a statement of what the command can reach rather than of
  what it has already done, so the line stays true even when the link cannot be removed; a link that
  could not be removed is reported as a link left in place, not as files left in a folder
  (UltiKits/UltiWorlds#20).

- `protected_worlds` is now matched without regard to letter case, both when refusing a deletion and
  when the empty-world auto-unload task skips a world. A world listed as `MyWorld` while the server
  calls it `myworld` is now covered by both; previously only an exact spelling matched
  (UltiKits/UltiWorlds#20).

- After `/upm uninstall UltiWorlds`, this module's commands are now really removed and its
  listeners stop firing. Previously this module's unload method replaced the framework's and only
  logged a line, so both stayed active until the server restarted (UltiKits/UltiWorlds#27).

#### Removed

- The `/w` alias of `/world`. `w` is a vanilla command label (`/msg`'s alias, with `/tell`), so
  `/w <player> <message>` could reach this module instead of a private message. Use `/world` or
  `/worlds` (UltiKits/UltiWorlds#45).

- Six `config/worlds.yml` keys that no code ever read: `gui_title` and `messages.world_teleport`,
  `messages.world_not_found`, `messages.no_permission`, `messages.world_created`,
  `messages.world_deleted`. Changing any of them never changed anything: the world list's title and
  every world message come from the language files (`lang/en.yml`, `lang/zh.yml`); to customise them, copy
  the official language file to one whose name starts with its language code and a hyphen (for example
  `lang/en-myserver.yml`), edit the entries there and set `language: en-myserver` in
  `plugins/UltiTools/config.yml` (an edit made in the official file itself is restored at the next start or module reload,
  UltiKits/UltiTools-Reborn#616). They are gone from the shipped `config/worlds.yml` too, so a new server's file no
  longer carries them. A leftover key in an existing file is reported at startup and on reload (see
  Added) (part of UltiKits/UltiWorlds#38).

- Two deprecated `config/worlds.yml` keys that no code read: `unload_empty_worlds` (the key that
  decides is `auto_unload.enabled`) and `unload_delay` (`auto_unload.unload_after`). They are gone
  from the shipped file, and a leftover in an existing file is reported like the six above
  (UltiKits/UltiWorlds#38).

- 38 language-file entries that no code displayed, from `lang/en.yml` and `lang/zh.yml`: the older
  `command.help.*` help lines (other than `unprotect`, `unblock`, `difficulty` and `postcmd`, which
  `/world help` shows), `command.usage`, `command.set_options`, the unused `common` words for on and
  off, the `error.*` and `success.*` lines whose messages come from other entries, the
  `gui.delete.confirm`, `gui.delete.cancel` and `gui.delete.warning` lines (the confirmation window's
  buttons come from UltiTools itself), and the four `inventory.*` lines.

- The module's own console lines "UltiWorlds has been disabled!" on unload (and its
  `worlds_disabled` language key in `lang/en.yml` and `lang/zh.yml`) and
  "UltiWorlds configuration reloaded!" on `/ul reload UltiWorlds` (printed in English under either
  `language` setting). UltiTools 6.3.0 logs one reload line per module
  (`Module 'UltiWorlds' reloaded.`); reloading still re-reads `config/worlds.yml` and reports
  `@ConditionalOnConfig` drift, because the framework's reload method does both
  (UltiKits/UltiWorlds#27).


### v1.0.0 (2026-02-15)

First published UltiWorlds module. The changes in the current 2.0.0 release are listed above.
