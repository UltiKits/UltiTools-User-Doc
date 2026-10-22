# UltiEssentials

Essential server commands module -- teleportation, player management, bans, chest locks, scoreboard, and more.

## Feature Overview

UltiEssentials is the most feature-rich base module in the UltiTools framework, covering the majority of tools needed for day-to-day Minecraft server operation. Teleportation features include spawn point, lobby, random wild teleport, back to last teleport location, a multi-home system, warp points, and TPA player-to-player teleport requests. Player status tools provide flight toggle, health/hunger restore, movement speed adjustment, game mode switching with shortcut commands, and vanish mode. Management tools include viewing other players' inventories/ender chests/equipment, whitelist management, and a ban system (permanent bans, temporary bans, unbans, ban list). Server customization covers MOTD, Tab bar, overhead name prefixes, command aliases, scheduled command execution, chest locks, death penalties, and a configurable scoreboard. Every feature can be independently toggled on or off in the configuration.

## Installation

**Method 1: Install via UPM (UltiTools Package Manager)**

```
/upm install UltiEssentials
```

**Method 2: Manual installation**

1. Ensure your server has UltiTools-API 6.3.0 or higher installed
2. Place `UltiEssentials-2.0.0.jar` in the `plugins/UltiTools/plugins/` directory
3. Restart the server

## Upgrading to 2.0.0

Back up configuration and storage, install UltiTools-API 6.3.0 or later, replace `UltiEssentials-2.0.0.jar` and restart fully. Its catalogue identity is `ultiessentials`, used by startup update checks and `/upm update`. `/ul reload` does not load new JARs; do not overwrite your configuration with a complete new example.

Grant `ultiessentials.fly.other` separately to admins who should control another player's flight; `ultiessentials.fly` only grants self-flight. Use `/warp`, `/unban`, `/lock`, `/unlock` and `/scoreboard`: aliases `/w`, `/pardon`, `/l`, `/ul` and `/sb` were removed to avoid taking over vanilla private messages, vanilla unbanning, UltiLogin login, framework management and UltiSideBar respectively. `/ban`, `/banlist` and `/scoreboard` deliberately take over vanilla names; use `minecraft:ban`, `minecraft:banlist` and `minecraft:scoreboard` for vanilla operations.

If an existing file lists `gmc`, `gms`, `gma` or `gmsp` under `features.commandalias.aliases`, those entries still send the commands to vanilla `/gamemode`, bypassing this module's `ultiessentials.gamemode.self` permission. Remove those four entries and run `/ul reload UltiEssentials` to use the module shortcuts. Existing values are never deleted automatically; a new alias map contains only `day` and `night`. Old scheduled `broadcast` entries also remain; use `say` unless another plugin supplies `/broadcast`.

Startup repairs old homes, warps, bans and locks saved without a primary key, so deletion, moving a home, unbanning and lock removal actually persist. For JSON storage, set `features.data-repair.enabled: false` before the first start to defer this module's repair, then enable it and restart after backing up. SQLite is repaired by the framework when opening tables regardless of the switch; MySQL cannot hold those records. There is no dry-run mode. Check per-type summaries and per-record warnings: unsafe records remain readable but may still resist deletion or update; identify them from the warnings and settle them after a backup. A failed write leaves every record of that type unchanged for the next startup to retry.

## Quick Start

After installation, administrators can start using the module immediately. Here is a typical initial setup workflow:

```
1. Stand where you want the spawn point to be
   /setspawn

2. Stand where you want the lobby to be
   /setlobby

3. Create a warp point
   /setwarp shop

4. Set a home
   /sethome base

5. Test the features
   /spawn        -- teleport to spawn
   /lobby        -- teleport to lobby
   /warp shop    -- teleport to warp
   /home base    -- teleport to home
   /back         -- return to previous location
```

## Commands

### Teleport Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/back` | Return to previous teleport location (only records command-triggered teleports) | `ultiessentials.back` | Player only |
| `/spawn` | Teleport to spawn point | `ultiessentials.spawn.teleport` | Player only |
| `/setspawn` | Set current location as spawn point | `ultiessentials.spawn.set` | Player only |
| `/lobby` or `/hub` | Teleport to lobby | `ultiessentials.lobby.teleport` | Player only |
| `/setlobby` or `/sethub` | Set current location as lobby | `ultiessentials.lobby.set` | Player only |
| `/wild` or `/rtp` | Random teleport to a safe outdoor location (configurable; default 60s) | `ultiessentials.wild` | Player only |

### Home System Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/home` or `/h` | Teleport to default home (named "home"), or first home if none named "home" | `ultiessentials.home` | Player only |
| `/home <name>` | Teleport to a specific home | `ultiessentials.home` | Player only |
| `/sethome` or `/sh` | Set default home (named "home") | `ultiessentials.sethome` | Player only |
| `/sethome <name>` | Set a named home | `ultiessentials.sethome` | Player only |
| `/delhome <name>` | Delete a home (aliases: `/deletehome`, `/rmhome`) | `ultiessentials.delhome` | Player only |
| `/homes` or `/homelist` | List all homes with coordinates | `ultiessentials.homes` | Player only |

### TPA Request Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/tpa <player>` | Request to teleport to another player | `ultiessentials.tpa` | Player only |
| `/tpahere <player>` or `/tphere <player>` | Request another player to teleport to you | `ultiessentials.tpahere` | Player only |
| `/tpaccept` | Accept a teleport request (aliases: `/tpyes`, `/tpok`) | `ultiessentials.tpaccept` | Player only |
| `/tpdeny` | Deny a teleport request (aliases: `/tpno`, `/tpcancel`) | `ultiessentials.tpdeny` | Player only |

### Warp System Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/warp <name>` | Teleport to a warp point | `ultiessentials.warp.use` | Player only |
| `/warps` | List all accessible warp points (aliases: `/warplist`, `/listwarp`) | `ultiessentials.warp.list` | Player only |
| `/setwarp <name> [permission]` | Create a warp at current location, optionally with a required permission (aliases: `/swarp`, `/addwarp`) | `ultiessentials.warp.set` | Player only |
| `/delwarp <name>` | Delete a warp point (aliases: `/deletewarp`, `/rmwarp`, `/removewarp`) | `ultiessentials.warp.delete` | Player only |

### Player Status Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/fly` | Toggle your flight mode | `ultiessentials.fly` | Player only |
| `/fly <player>` | Toggle another player's flight mode | `ultiessentials.fly.other` | Player only |
| `/heal` | Restore your health to full | `ultiessentials.heal.self` | Player only |
| `/heal <player>` | Restore another player's health | `ultiessentials.heal.other` | Player only |
| `/feed` | Restore your hunger to full | `ultiessentials.heal.self` | Player only |
| `/feed <player>` | Restore another player's hunger | `ultiessentials.heal.other` | Player only |
| `/speed <0-10>` | Set movement speed (0 = reset, 1-10 = multiplier) | `ultiessentials.speed` | Player only |
| `/speed reset` | Reset movement speed to default | `ultiessentials.speed` | Player only |
| `/gm <mode>` | Change your game mode | `ultiessentials.gamemode.self` | Player only |
| `/gm <mode> <player>` | Change another player's game mode | `ultiessentials.gamemode.other` | Player only |
| `/gms` | Shortcut to survival mode | `ultiessentials.gamemode.self` | Player only |
| `/gmc` | Shortcut to creative mode | `ultiessentials.gamemode.self` | Player only |
| `/gmsp` | Shortcut to spectator mode | `ultiessentials.gamemode.self` | Player only |
| `/hide` or `/vanish` | Toggle vanish mode (invisible to other players) | `ultiessentials.hide` | Player only |

Game mode arguments: `0` / `s` / `survival` = Survival, `1` / `c` / `creative` = Creative, `2` / `a` / `adventure` = Adventure, `3` / `sp` / `spectator` = Spectator.

### Ban System Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/ban <player> [reason]` | Permanently ban a player (alias: `/eban`) | `ultiessentials.ban` | Player + Console |
| `/tempban <player> <duration> [reason]` | Temporarily ban a player (alias: `/tban`) | `ultiessentials.ban.temp` | Player + Console |
| `/unban <player>` | Unban a player | `ultiessentials.unban` | Player + Console |
| `/banlist [page]` | View the ban list (alias: `/bans`) | `ultiessentials.banlist` | Player + Console |

Temporary ban duration format: `1d` = 1 day, `2h` = 2 hours, `30m` = 30 minutes, `1w` = 1 week. Combinations work: `1d12h30m` = 1 day 12 hours 30 minutes.

### Management Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/invsee <player>` | Open and view a player's inventory | `ultiessentials.invsee` | Player only |
| `/endersee <player>` or `/echest <player>` | View a player's ender chest | `ultiessentials.endersee` | Player only |
| `/armorsee <player>` | View a player's armor and offhand | `ultiessentials.armorsee` | Player only |
| `/lock` | Lock the container you are looking at | `ultiessentials.lock` | Player only |
| `/unlock` | Unlock the container you are looking at | `ultiessentials.lock` | Player only |
| `/unlock info` | View lock information for a container | `ultiessentials.lock` | Player only |
| `/scoreboard` | Toggle scoreboard display | `ultiessentials.scoreboard` | Player only |
| `/scoreboard on` | Enable scoreboard | `ultiessentials.scoreboard` | Player only |
| `/scoreboard off` | Disable scoreboard | `ultiessentials.scoreboard` | Player only |

### Whitelist Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/wl add <player>` | Add player to whitelist | `ultiessentials.whitelist.manage` | Player + Console |
| `/wl remove <player>` | Remove player from whitelist | `ultiessentials.whitelist.manage` | Player + Console |
| `/wl list` | View whitelist | `ultiessentials.whitelist.manage` | Player + Console |
| `/wl on` | Enable whitelist | `ultiessentials.whitelist.manage` | Player + Console |
| `/wl off` | Disable whitelist | `ultiessentials.whitelist.manage` | Player + Console |
| `/wl status` | View whitelist status | `ultiessentials.whitelist.manage` | Player + Console |

## Configuration

All configuration files are located in `plugins/UltiTools/pluginConfig/UltiEssentials/`.

### Main Config: config/essentials.yml

```yaml
features:
  # ===== Teleport Features =====
  back:
    enabled: true                    # Enable /back command
  spawn:
    enabled: true                    # Enable /spawn command
  lobby:
    enabled: true                    # Enable /lobby command
  wild:
    enabled: true                    # Enable /wild random teleport
    max-range: 10000                 # Maximum teleport range (blocks)
    min-range: 100                   # Minimum teleport range (blocks)
    cooldown: 60                     # Cooldown time (seconds)

  # ===== Player Status Features =====
  fly:
    enabled: true                    # Enable /fly command
  heal:
    enabled: true                    # Enable /heal and /feed commands
  speed:
    enabled: true                    # Enable /speed command
    max-speed: 10                    # Maximum speed multiplier (1-10)
  gamemode:
    enabled: true                    # Enable /gm game mode command
  hide:
    enabled: true                    # Enable /hide vanish command

  # ===== Management Tools =====
  invsee:
    enabled: true                    # Enable /invsee /endersee /armorsee commands
  whitelist:
    enabled: true                    # Enable /wl whitelist command

  # ===== Server Customization =====
  motd:
    enabled: true                    # Enable MOTD customization
  tab-bar:
    enabled: true                    # Enable Tab bar customization

  # ===== Home System =====
  home:
    enabled: true                    # Enable /home system
    default-max-homes: 3             # Default maximum number of homes (1-100)
    teleport-warmup: 3               # Teleport warmup time (seconds, 0 = instant)
    cancel-on-move: true             # Cancel warmup on movement

  # ===== TPA System =====
  tpa:
    enabled: true                    # Enable /tpa requests
    timeout: 30                      # Request timeout (seconds, 5-300)
    cooldown: 10                     # Send request cooldown (seconds, 0-600)
    allow-cross-world: true          # Allow cross-world TPA

  # ===== Warp System =====
  warp:
    enabled: true                    # Enable /warp system
    teleport-warmup: 3               # Warp teleport warmup (seconds)

  # ===== Ban System =====
  ban:
    enabled: true                    # Enable ban system
    broadcast-ban: true              # Broadcast ban messages
    broadcast-unban: true            # Broadcast unban messages

  # ===== Scoreboard =====
  scoreboard:
    enabled: true                    # Enable scoreboard
    auto-enable: true                # Auto-enable for joining players
    update-interval: 1               # Update interval (seconds, 1-60)
    title: "&6&lServer Info"         # Scoreboard title (supports PlaceholderAPI)
    lines:                           # Scoreboard lines (supports PlaceholderAPI)
      - "&7Welcome, &e%player_name%"
      - "&7"
      - "&6Online: &f%online_players%/%max_players%"
      - "&6World: &f%player_world%"
      - "&7"
      - "&6Health: &c%player_health%"
      - "&6Food: &a%player_food%"
      - "&6Level: &e%player_level%"
      - "&7"
      - "&ewww.example.com"

  # ===== Scheduled Commands =====
  scheduled-commands:
    enabled: false                   # Enable scheduled command execution
    commands:                        # Format: interval_seconds:command
      - "300:say Server is online!"
      - "600:say Reminder: follow server rules!"

  # ===== Chest Lock =====
  chestlock:
    enabled: true                    # Enable chest lock feature
    admin-bypass: true               # Admins can bypass locks

  # ===== Death Penalty =====
  deathpunish:
    enabled: false                   # Enable death penalty (off by default)
    money:
      enabled: false                 # Enable money penalty (requires Vault)
      percent: 10.0                  # Percentage of balance lost (0-100)
      max: 1000.0                    # Maximum money loss (0 = unlimited)
    item:
      enabled: false                 # Enable item drop penalty
      drop-chance: 50.0              # Chance each item drops (%, 0-100)
      keep-other: true               # Keep items that weren't dropped
      whitelist:                     # Items that never drop
        - "DIAMOND_SWORD"
        - "DIAMOND_PICKAXE"
    exp:
      enabled: false                 # Enable additional XP loss
      percent: 20.0                  # Additional XP loss percentage (0-100)
    command:
      enabled: false                 # Enable command execution on death
      commands:                      # Commands to run ({PLAYER} = player name)
        - "say {PLAYER} died!"
    world-whitelist:                 # Worlds exempt from death penalty
      - "world_creative"

  # ===== Name Prefix =====
  nameprefix:
    enabled: false                   # Enable overhead name prefix (off by default)
    prefix-format: "&7[&e%vault_prefix%&7] "  # Prefix format (supports PlaceholderAPI)
    suffix-format: ""                # Suffix format (supports PlaceholderAPI)
    update-interval: 5               # Update interval (seconds, 1-60)

  data-repair:
    enabled: true                    # Startup repair of old JSON records; not SQLite

  # ===== Command Aliases =====
  commandalias:
    enabled: true                    # Enable command aliases
    aliases:                         # Alias mappings (alias: original command)
      day: "time set day"
      night: "time set night"
```

### Spawn Config: config/spawn.yml

```yaml
spawn:
  location:
    world: "world"                   # Spawn world name
    x: 0.0                          # X coordinate
    y: 64.0                         # Y coordinate
    z: 0.0                          # Z coordinate
    yaw: 0.0                        # Horizontal rotation
    pitch: 0.0                      # Vertical rotation
  teleport-on-first-join: true       # Teleport to spawn on first join
  teleport-on-respawn: true          # Teleport to spawn on respawn
```

### Lobby Config: config/lobby.yml

```yaml
lobby:
  location:
    world: "world"                   # Lobby world name
    x: 0.0                          # X coordinate
    y: 64.0                         # Y coordinate
    z: 0.0                          # Z coordinate
    yaw: 0.0                        # Horizontal rotation
    pitch: 0.0                      # Vertical rotation
```

### MOTD Config: config/motd.yml

```yaml
motd:
  line1: "&6Welcome to our server!"  # MOTD first line (supports color codes)
  line2: "&7Powered by UltiTools"    # MOTD second line
  max-players: -1                    # Displayed max players (-1 = use server default)
```

### Tab Bar Config: config/tabbar.yml

```yaml
tabbar:
  header: "&6=== Server Name ==="    # Tab list header (supports color codes)
  footer: "&7Online: &e%online%&7/&e%max%"  # Tab list footer (supports %online% and %max%)
```

### Reload, language and runtime behavior

`/ul reload UltiEssentials` re-reads configuration, refreshes language and restarts scheduled commands, scoreboard and name prefixes separately. One failure does not stop the other services; the reply names the partial reload and its cause. Scheduled-command intervals start again on reload, so frequent reloads postpone them. After changing the framework's `language`, use a full `/ul reload` or restart, not only a module reload.

`features.wild.cooldown` defaults to 60 seconds and accepts 0-2147483647; 0 disables cooldown. A negative value refuses startup; reload keeps the running value, warns and completes the other work. Existing cooldowns keep their end time. `/wild` loads candidate chunks asynchronously, then checks safety and teleports on the main thread; its height message is the player's feet position. A player who disconnects or a search pending at unload is not teleported later. `/back` records only this module's `/home`, `/warp`, `/spawn`, `/lobby`, `/wild`, accepted teleport requests and `/back`, not vanilla `/tp` or another plugin's teleports; quitting clears it.

`features.ban.broadcast-ban: false` sends the reason only to the issuer; `broadcast-unban: false` keeps the issuer's confirmation without broadcasting. `features.recall.enabled` was removed: there never was a `/recall` command. Remove that old key to silence startup and reload warnings. `/unbanip` does not exist. A teleport request is silently cleared when either party leaves; `/tpaccept` and `/tpdeny` then report no pending request. Vanish applies to later joiners too; senders who cannot see a vanished player cannot find them through teleport requests or ban completion. An already vanished player can un-vanish even if the feature is switched off.

`/setspawn` and `/setlobby` write only the six coordinates under their location setting, preserving every other line including hand edits. A refused write says not saved, logs the reason and restores the running location from before the command. Failed home moves, warp deletions, unbans and lock removals report failure: do not mistake that for deletion. Either half of a double chest checks the shared lock; unlock removes all its records together or leaves it locked.

The sidebar yields to the plugin shown first, appearing only after the other sidebar is closed. `/scoreboard on` reports an occupied slot; `off` does not remove another plugin's board. Turning it off immediately after joining lasts until quitting or turning it on. Reload preserves individual choices while the feature stays enabled; disabling removes it, and enabling applies auto-enable to online players. Main-scoreboard team prefixes remain visible. The private board is updated in place rather than rebuilt, and lines differing only after character 40 no longer overwrite each other. Other plugins must not write onto this private board; its own objective, slot and lines are restored if altered. One player's failed refresh affects only that player, retried every update without log spam. Built-in placeholders are filled first, then optional PlaceholderAPI placeholders; `%online_players%` and the other built-ins do not require PlaceholderAPI.

The module's comments on 78 keys in five files follow the server language; hand-written comments and values are preserved. The examples above show `language: en` defaults; corresponding defaults on Chinese servers are Chinese. Untouched built-in scoreboard, MOTD, tab-list, scheduled-command and death-command text follows language at startup or full reload; edited values are kept. Change at least one character to pin built-in text. Edit these values in the configuration, not the language file. A blank scoreboard title is invalid; an empty line list or blank tab header/footer stays empty.

For custom chat and console messages, copy the official `en.json` to `plugins/UltiTools/pluginConfig/UltiEssentials/lang/en-myserver.json`, edit using new keys such as `essentials.home.set`, and select `language: en-myserver` in the framework's `plugins/UltiTools/config.yml`. Missing keys fall back to the prefix's official language. Edited official `en.json`/`zh.json` files are restored at startup with a backup, so do not edit them directly. Commands, kick screens, bans and logs now follow language; the death-penalty summary is sent only when a penalty was applied.

`/upm uninstall UltiEssentials` reveals vanished players, stops scheduled commands, sidebar, prefixes and teleport warmups, cancels request expiry and delayed join tasks, and unregisters commands and listeners. Cancelled warmups leave players where they are without a message. Sidebars return to the main scoreboard; `up_` teams lose their members but remain registered and can be removed with vanilla `team remove`. A cleanup failure is reported while other services still stop, not called a clean uninstall.

## Usage Tutorials

### Tutorial 1: Setting Up Spawn and Lobby

1. Walk to the location where you want the spawn point
2. Type `/setspawn` -- new players and respawning players will be teleported here
3. Walk to the location where you want the lobby
4. Type `/setlobby` -- all players can now use `/lobby` to get here

### Tutorial 2: Using the Home System

```
/sethome                 -- set your default home
/sethome farm            -- set a home called "farm"
/sethome mine            -- set a home called "mine"
/homes                   -- list all your homes
/home                    -- teleport to default home
/home farm               -- teleport to "farm"
/delhome mine            -- delete "mine"
```

By default each player can have up to 3 homes (configurable via `features.home.default-max-homes`).

### Tutorial 3: Using TPA Teleport

```
/tpa Steve               -- request to teleport to Steve
                           Steve sees a notification
Steve types: /tpaccept   -- accepts, you are teleported to Steve
Steve types: /tpdeny     -- denies the request

/tpahere Steve           -- request Steve to teleport to you
Steve types: /tpaccept   -- Steve is teleported to you
```

Requests expire after 30 seconds by default, with a 10-second cooldown between requests.

### Tutorial 4: Creating and Using Warps

```
/setwarp shop                      -- create a warp named "shop" at current location
/setwarp vip vip.warp.access       -- create a permission-restricted warp
/warps                             -- list all accessible warps
/warp shop                         -- teleport to "shop"
/delwarp shop                      -- delete the "shop" warp
```

### Tutorial 5: Configuring Scheduled Commands

Enable scheduled commands in `config/essentials.yml`:

```yaml
features:
  scheduled-commands:
    enabled: true
    commands:
      - "300:say Server has been online for 5 minutes!"  # Runs every 300 seconds
      - "600:say Reminder: follow server rules!" # Runs every 600 seconds
      - "3600:save-all"                                  # Auto-save every hour
```

The format is `interval_seconds:console_command`. Commands run as console with full permissions.

### Tutorial 6: Configuring Death Penalty

```yaml
features:
  deathpunish:
    enabled: true
    money:
      enabled: true          # Lose money on death (requires Vault)
      percent: 10.0          # Lose 10% of balance
      max: 1000.0            # Max loss of 1000
    item:
      enabled: true
      drop-chance: 50.0      # 50% chance each item drops
      keep-other: true       # Keep items that didn't drop
      whitelist:
        - "DIAMOND_SWORD"    # Diamond sword never drops
    exp:
      enabled: true
      percent: 20.0          # Lose an additional 20% XP
    world-whitelist:
      - "world_creative"     # No penalty in creative world
```

Players with `ultiessentials.deathpunish.bypass` permission are exempt from death penalties.

### Tutorial 7: Using Chest Locks

1. Look at the chest (or other container) you want to lock
2. Type `/lock` -- the chest is now locked, only you can open it
3. To unlock, look at the chest and type `/unlock`
4. To view lock info, type `/unlock info`

If `chestlock.admin-bypass` is set to `true`, admins can open containers locked by other players.

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultiessentials.back` | Use /back command | Player |
| `ultiessentials.spawn.teleport` | Teleport to spawn | Player |
| `ultiessentials.spawn.set` | Set spawn point | OP |
| `ultiessentials.lobby.teleport` | Teleport to lobby | Player |
| `ultiessentials.lobby.set` | Set lobby | OP |
| `ultiessentials.wild` | Use random teleport | Player |
| `ultiessentials.home` | Teleport to home | Player |
| `ultiessentials.sethome` | Set a home | Player |
| `ultiessentials.delhome` | Delete a home | Player |
| `ultiessentials.homes` | List all homes | Player |
| `ultiessentials.tpa` | Send TPA request | Player |
| `ultiessentials.tpahere` | Send TPA-here request | Player |
| `ultiessentials.tpaccept` | Accept teleport request | Player |
| `ultiessentials.tpdeny` | Deny teleport request | Player |
| `ultiessentials.warp.use` | Use warp teleport | Player |
| `ultiessentials.warp.list` | View warp list | Player |
| `ultiessentials.warp.set` | Create warps | OP |
| `ultiessentials.warp.delete` | Delete warps | OP |
| `ultiessentials.fly` | Toggle own flight mode | OP |
| `ultiessentials.fly.other` | Toggle another player's flight | OP |
| `ultiessentials.heal.self` | Restore own health/hunger | OP |
| `ultiessentials.heal.other` | Restore other players' health/hunger | OP |
| `ultiessentials.speed` | Adjust movement speed | OP |
| `ultiessentials.gamemode.self` | Change own game mode | OP |
| `ultiessentials.gamemode.other` | Change other players' game mode | OP |
| `ultiessentials.hide` | Use vanish mode | OP |
| `ultiessentials.hide.see` | See vanished players | OP |
| `ultiessentials.ban` | Permanently ban players | OP |
| `ultiessentials.ban.temp` | Temporarily ban players | OP |
| `ultiessentials.unban` | Unban players | OP |
| `ultiessentials.banlist` | View ban list | OP |
| `ultiessentials.invsee` | View player inventory | OP |
| `ultiessentials.endersee` | View player ender chest | OP |
| `ultiessentials.armorsee` | View player equipment | OP |
| `ultiessentials.lock` | Use chest lock | Player |
| `ultiessentials.scoreboard` | Toggle scoreboard | Player |
| `ultiessentials.whitelist.manage` | Manage whitelist | OP |
| `ultiessentials.deathpunish.bypass` | Bypass death penalty | OP |

## FAQ

**Q: What if the plugin doesn't work after installation?**

A: Check the following: (1) UltiTools-API version is 6.3.0 or higher; (2) The JAR is in `plugins/UltiTools/plugins/`, not in `plugins/`; (3) You fully restarted the server (not just `/ul reload` -- new modules require a full restart). Check the server console for the "UltiEssentials enabled" message.

**Q: Config changes not taking effect?**

A: After editing `config/essentials.yml` or other config files, run `/ul reload` to hot-reload. Some features like scheduled commands re-register automatically on reload. If changes still don't apply, do a full server restart.

**Q: How to set up permissions?**

A: UltiEssentials uses the standard Bukkit permission system. We recommend using LuckPerms. For example, to give all players TPA permission: `/lp group default permission set ultiessentials.tpa true`. Admin commands require OP by default but can be assigned via permission plugins.

**Q: `/back` says "No location to return to"?**

A: `/back` only records locations from command-triggered teleports (like `/spawn`, `/home`, etc.), not from death, portals, or other causes. The saved location is also cleared when the player disconnects.

**Q: TPA requests keep timing out?**

A: The default timeout is 30 seconds -- you can increase it via `features.tpa.timeout`. Also make sure the target player has the `ultiessentials.tpaccept` permission.

**Q: Scoreboard shows raw PlaceholderAPI variables?**

A: Built-ins such as `%online_players%` do not require PlaceholderAPI. Other expansion placeholders need PlaceholderAPI and their expansion. Built-ins are filled first, then PlaceholderAPI runs.

**Q: Scheduled commands not executing?**

A: Confirm `features.scheduled-commands.enabled` is set to `true`. The format is `interval_seconds:command` -- the number before the colon is seconds, and the text after is a console command (no `/` prefix needed). Check the console log for "Scheduled command" entries.

## Changelog

### v2.0.0

The original Unreleased README server/Java badge claim was withdrawn at finalization; the README states only the framework requirement. Seven unused old language entries (`feature_disabled` and six `teleport_*` messages) were also removed without changing visible output. The entries below describe the finalized release.

#### Changed

- `plugin.yml` now declares `identify-string: ultiessentials`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).
  The README's UltiTools-API badge and install step now say UltiTools 6.3.0 or later, matching the
  `api-version: 630` the module already declares (an older framework refuses it with a warning that the
  UltiTools version is outdated).

#### Fixed

- `/setspawn` and `/setlobby` now write exactly the six location settings they set (`world`, `x`, `y`, `z`,
  `yaw`, `pitch` under `spawn.location` or `lobby.location`) and nothing else; every other line of
  `config/spawn.yml` or `config/lobby.yml`, a hand edit made while the server runs included, stays byte for
  byte. A location setting edited by hand is replaced by the command's value, as the command asks. Before, the
  commands saved the whole configuration: a hand-edited location setting was left unwritten while chat said the
  location was set, and a write the framework refused was reported as success. Now a refused write is answered
  `Spawn point not saved: <reason>. …` (or `Lobby not saved: …`), the file is unchanged, and the running
  location is restored to the values held before the command, with the reason logged once; any other failed write is answered as before and rolled back the
  same way (UltiKits/UltiEssentials#72).

- `/ul reload UltiEssentials` no longer replies that the module reloaded when one of its three background
  services (scheduled commands, scoreboard, name prefixes) did not restart: the reply now says the reload was
  partial and names the service and why, and the framework logs its partial-reload warning instead of its
  success line. The other services still restart (UltiKits/UltiEssentials#66).

- The comments above the 78 keys of this module's five configuration files (`config/essentials.yml`,
  `config/lobby.yml`, `config/motd.yml`, `config/spawn.yml`, `config/tabbar.yml`) now come from the module's
  language files: a server set to `language: en` writes English comments on a fresh install (they were
  Chinese in every language). An existing file's comments on these keys switch to the server's language at
  the next start; values are untouched. Only a comment this module wrote is switched - its catalogue text in
  either language, or the shorter comment release v1.0.0 wrote above `features.wild.cooldown`
  (UltiKits/UltiEssentials#73); a comment you wrote by hand stays byte for byte (UltiTools-API 6.3.0, maintainer
  decision 2026-10-04) (UltiKits/UltiEssentials#67).

- On UltiTools-API 6.3.0 with JSON storage (`datasource.type: json`), the start-up repair of records written
  before UltiKits/UltiEssentials#34 gives them their primary key again. 6.3.0 hands out copies of stored
  records, so the repair wrote nothing there, logged an error at every start, and `/delhome`, `/delwarp`,
  `/unban` and an owner's lock removal kept failing on those records. If writing a record's key fails, every
  record of that type is left exactly as it was and the next start tries again (UltiKits/UltiEssentials#69).

- The module loads on UltiTools-API 6.3.0. 6.3.0 removes the configuration object the removed-settings
  warning read, so this module was refused at load; the warning now asks the framework whether a removed key
  is in `config/essentials.yml`, and warns exactly as before at start-up and on every `/ul reload` for a file
  holding one (a key left with an empty value included) and not at all otherwise. A file the framework could
  not read or parse produces the framework's own `Cannot load` line and no removed-setting warning
  (UltiKits/UltiEssentials#68).

- `/back` now returns only from teleports this module's own commands started (`/home`, `/warp`,
  `/spawn`, `/lobby`, `/wild`, an accepted `/tpa` or `/tpahere`, and `/back` itself). Another plugin's
  teleport or a vanilla `/tp` no longer gives `/back` a place to return to, so a teleport by something
  else after a rejoin no longer re-arms it. A second `/back` still returns to where the first one started
  (UltiKits/UltiEssentials#39).

- `/wild`'s success message now reports the height the player lands at (the feet position); it used to
  report the ground block one below (UltiKits/UltiEssentials#33).

- `/wild` no longer stalls the server while it looks for a place: each candidate chunk is loaded (and
  generated, if new) asynchronously, and the safety check and the teleport run on the main thread once it
  has loaded. A player who logs out meanwhile is not teleported, and a search still waiting for a chunk
  when the module is unloaded does nothing (UltiKits/UltiEssentials#24).

- A vanished player is no longer found through `/tpa` or `/tpahere` (a sender who may not see vanished
  players is told the player is not online, and no request is delivered) or through `/ban` and
  `/tempban` completion, and a vanished player can always un-vanish: `features.hide.enabled: false`
  now refuses only a new vanish (UltiKits/UltiEssentials#56).

- Unloading this module (`/upm uninstall UltiEssentials`) now also cancels a pending `/tpa` or
  `/tpahere` request's expiry, so neither player gets an expiry message from the uninstalled module, and
  a player who joined in the second before the uninstall is no longer put on a sidebar or into a
  name-prefix team afterwards (UltiKits/UltiEssentials#51).

- With PlaceholderAPI installed, the scoreboard now shows its built-in placeholders (`%online_players%`,
  `%max_players%`, `%player_food%` and the others) as values instead of the raw tokens: the module's own
  placeholders are filled first and PlaceholderAPI's afterwards, in the scoreboard and in name prefixes
  (UltiKits/UltiEssentials#59).

- `/scoreboard off` run right after joining now sticks: the sidebar no longer appears a moment later
  from the delayed auto-enable, nor from a reload that turns the scoreboard feature on. The choice lasts
  until the player quits or runs `/scoreboard on` (UltiKits/UltiEssentials#45).

- The sidebar no longer replaces another plugin's sidebar (such as UltiSideBar's): whichever sidebar a
  player sees first stays, and this one appears once the other is turned off. `/scoreboard on` and
  `/scoreboard` now say when another scoreboard keeps the slot, and `/scoreboard off` no longer removes
  another plugin's sidebar. When UltiSideBar's sidebar is also enabled, one console line says so after
  start-up (UltiKits/UltiEssentials#40).

- Name prefixes (`features.nameprefix`) and other main-scoreboard teams (vanilla `/team` teams, other
  plugins' teams) now show while this module's sidebar is on: the sidebar's own scoreboard now carries
  the server's main-scoreboard teams and follows their changes on every update. Previously every
  player with the sidebar on saw no team prefix on anybody. A sidebar line that reads exactly like a
  team member's name keeps its own look rather than taking that team's prefix (UltiKits/UltiEssentials#40).

- The sidebar is no longer rebuilt every second: each player keeps one sidebar scoreboard that is
  updated in place, and its lines are rewritten only when they change. If another plugin removes the
  sidebar's objective, clears or takes its slot, or resets its lines, the next update restores them;
  what another plugin puts on that board (its own teams, objectives and scores) is left alone
  (UltiKits/UltiEssentials#40).

- Two scoreboard lines that differ only after their 40th character now both show; previously the
  second one replaced the first (UltiKits/UltiEssentials#41).

- `language: en` now applies to this module's command, ban, kick and console text; most of it showed
  Chinese in every language (UltiKits/UltiEssentials#26). 162 messages whose keys were missing from
  both language files now have English and Chinese text: every command's help and description, the
  home, warp, teleport-request, scoreboard, lock and ban command replies, and the teleport warmup and
  cancel lines. Text that was fixed Chinese is now catalogued: the kick screen shown to a banned
  player, ban and temp-ban durations, the ban, temp-ban and unban announcements, the default ban
  reason (`No reason`) and the console's operator name (`Console`), the permission marker in
  `/warps`, both chest-lock refusals and the death-penalty summary. Console lines that were fixed
  English now follow `language` too: the start-up repair, reload and removed-setting warnings,
  scheduled-command, chest-lock, home, warp, ban, name-prefix and sidebar diagnostics. English
  wording of existing lines is unchanged except where it was a Chinese sentence shown to English
  players. The death-penalty summary is now sent only when a penalty was applied; it used to be sent
  whenever the line grew past ten characters. The teleport warmup line reads
  `Teleporting in <n>s, please do not move...`; it used to show the raw key `teleport_warmup`, and a
  cancelled warmup showed `teleport_cancelled_moved`.

- Reloading this module (`/ul reload UltiEssentials`) now re-reads its configuration files and
  refreshes its language files, so an edited value such as `features.speed.max-speed` applies
  without a restart. Previously this module's reload method replaced the framework's and only
  logged a line, so neither step ran. UltiTools 6.3.0 also reports `@ConditionalOnConfig` drift and
  logs its own per-module reload line at this point (UltiKits/UltiEssentials#23).

- `/ul reload UltiEssentials` (or `/ul reload`) now also restarts the scheduled-command, scoreboard
  and name-prefix services against the re-read configuration, so changes to
  `features.scheduled-commands.enabled`, `features.scheduled-commands.commands`,
  `features.scoreboard.enabled`, `features.scoreboard.update-interval`,
  `features.nameprefix.enabled` and `features.nameprefix.update-interval` apply without a restart;
  turning name prefixes on through `/ul reload UltiEssentials` now applies them to online players
  and later joins (UltiKits/UltiEssentials#28). As on a restart, a reload starts each scheduled
  command's interval again. While the scoreboard stays enabled across a reload, each online
  player's sidebar stays shown or hidden as it was, including a `/scoreboard` choice; a reload that
  turns the scoreboard off removes every sidebar, and a reload that turns it on applies
  `features.scoreboard.auto-enable` to players already online. If one of the three services fails
  to reload, the failure is logged and the other two are still reloaded.

- Turning the sidebar off with `/scoreboard off` or `/scoreboard` now returns the player to the
  server's main scoreboard, so name prefixes and other teams on it become visible to that player.
  Previously the player was given an empty scoreboard and saw none of them until they rejoined
  (UltiKits/UltiEssentials#44).

- One player whose sidebar or name prefix cannot be refreshed (for example because a PlaceholderAPI
  expansion throws for that player) no longer stops the scoreboard and name-prefix refreshes for
  every other player. That player is retried on every update, and the failure is logged once and
  again only after a refresh for that player has succeeded in between. A name-prefix team removed
  with the vanilla `team remove` command is re-created on the next update (UltiKits/UltiEssentials#44).

- Unloading this module (`/upm uninstall UltiEssentials`) now runs the framework's command
  unregistration and then its listener unregistration, so the module's commands are really removed
  and its listeners stop firing. Previously this module's unload method replaced the framework's, so
  after `/upm uninstall UltiEssentials` both its commands and its listeners stayed active until the
  server restarted (UltiKits/UltiEssentials#23).

- `/upm uninstall UltiEssentials` now stops every repeating background task this module started:
  configured entries of `features.scheduled-commands.commands` stop being dispatched to the console,
  the sidebar update timer and the name-prefix update timer stop, and a teleport warmup still
  counting down is cancelled rather than completed. Players who had a sidebar are returned to the
  server's main scoreboard and this module's name-prefix teams are emptied of their members, so no
  leftover sidebar or prefix survives the uninstall; the now-empty `up_` teams themselves stay
  registered on the main scoreboard and can be removed with the vanilla `team remove` command.
  Previously all of these kept running against the uninstalled module until the server was
  restarted, while the uninstall reported success. A player whose warmup is cancelled stays where
  they are and is not told. Pending teleport-request expiry is cancelled, and delayed sidebar and
  name-prefix join tasks do nothing after unload (UltiKits/UltiEssentials#51).
  If one of these services fails to stop, or cannot be reached at all,
  the others are still stopped and the uninstall reports that failure rather than a clean removal
  (UltiKits/UltiEssentials#43).

- `/ul reload UltiEssentials` now names, as a warning in the console, any of those services it could
  not reach — previously it reloaded the ones it found and reported success either way, so a feature
  left running on its old configuration looked identical to one that had been reloaded. The other
  services are still reloaded. On a stock install nothing can make this warning appear, and likewise
  nothing can make the uninstall above report a service it could not reach: both are guards against a
  future change to this module's own source, not settings you can reach from a configuration file
  (UltiKits/UltiEssentials#43).

- `/delhome <name>`, `/delwarp <name>`, `/unban <player>`, `/unlock`, re-running
  `/sethome <name>` on an existing home, and breaking your own locked container now actually change
  what is stored. Every record this module writes — homes, warps, bans and container locks — was
  previously saved with an empty primary key, so the later delete or update matched no row at all
  and the stored record survived untouched: a deleted home reappeared in `/homes`, an unbanned
  player was still rejected at login with this module's own ban message, a broken container's lock
  came back after a restart, and moving an existing home kept the old coordinates. Records written
  from this version on carry that key, and records written by earlier versions are repaired once at
  start-up (UltiKits/UltiEssentials#34, UltiKits/UltiEssentials#35, UltiKits/UltiEssentials#37).

- `/fly <player>` now requires `ultiessentials.fly.other`, a separate node from the
  `ultiessentials.fly` that lets a player toggle their own flight. Previously the two shared one
  node, so any server granting ordinary players self-flight was also letting them force flight on or
  off for anyone online, including cutting another player's flight mid-air. Grant
  `ultiessentials.fly.other` to whoever should keep that ability — this matches how `/heal <player>`
  and `/gm <mode> <player>` already work (UltiKits/UltiEssentials#25).

- At start-up, this module now repairs records it wrote before the fix above, giving each the primary
  key it was saved without. It reports one line per kind of record it wrote and a summary, so such a
  line always means records were written; a record it leaves alone is reported as a warning instead,
  one line each with the reason. It runs once: a repaired record is not visited again on later start-ups. A record it
  cannot repair safely is left exactly as it is and reported as a warning — this happens when the
  record carries no identity of its own, when two stored records share one identity, or when a record
  already carries a key that disagrees with its identity. Such a record still reads normally, but
  deleting or updating it keeps failing, and the warning names it so it can be re-created by hand
  (UltiKits/UltiEssentials#34).

- New configuration key `features.data-repair.enabled` in `config/essentials.yml`, default `true`:
  whether the module's start-up repair described above runs on JSON storage. Set it to `false` to
  leave those JSON records unchanged — useful during a migration or before taking a backup. One log
  line names the key; deleting or updating those unrepaired JSON records keeps failing until you turn
  it back on. On SQLite, UltiTools-API 6.3.0 repairs missing primary keys when it opens the tables,
  regardless of this setting; MySQL cannot hold such records. There is no dry-run setting
  (UltiKits/UltiEssentials#34).

- A deletion, unban or unlock that could not change what is stored now says so, instead of saying the
  record does not exist. `/delhome`, `/delwarp` and `/unban` previously reported a surviving record
  the same way they report one that was never there, which told an operator to stop looking while
  `/homes` or `/banlist` still listed it. Each now has its own message for that case, as `/unlock`
  already did. Re-running `/sethome <name>` on an existing home checks the stored coordinates
  afterwards and reports a failure rather than confirming a move that would still teleport you to the
  old location. Unlocking a double chest reports success only when BOTH halves' records are gone; a
  surviving half is reported as a failure and stays locked (UltiKits/UltiEssentials#34,
  UltiKits/UltiEssentials#35, UltiKits/UltiEssentials#37).

- A lock on a double chest is now enforced from either side, and unlocking one is all or nothing.
  Because the two halves are one shared inventory, a lock record on either half now refuses strangers
  clicking either block — previously the check looked only at the block clicked, so a container whose
  halves disagreed could be opened from the unrecorded side. Unlocking removes every record protecting
  the container together: if any of them cannot be removed, none is, the container keeps reporting as
  locked, and the failure is reported rather than a half-unlocked container being left behind
  (UltiKits/UltiEssentials#37).

- `features.ban.broadcast-ban` and `features.ban.broadcast-unban` in `config/essentials.yml` now
  take effect. Previously `/ban`, `/tempban` and `/unban` announced every successful ban or unban to
  the whole server whatever these were set to. Both default to `true`, which is what the commands
  always did, so nothing changes unless one is `false` — and if your file already has one set to
  `false`, it takes effect from this version. With `features.ban.broadcast-ban: false`, a ban's
  notice and reason go to whoever issued it instead of to everyone — the notice was the issuer's
  only confirmation, so it is redirected rather than dropped — and the rest of the server no longer
  sees it. `/banlist` lists the ban either way. With `features.ban.broadcast-unban: false`, the
  issuer still gets the unban confirmation they always got, and nothing is broadcast
  (UltiKits/UltiEssentials#27).

- A pending `/tpa` or `/tpahere` request is now cleared as soon as its sender or its target leaves
  the server. Previously it stayed pending until `features.tpa.timeout` ran out (30 seconds by
  default), and for that whole time its target refused every other player's request as already
  having one. The player who stays online is not messaged when this happens: previously they were
  told the request had timed out once the timeout ran out, and a target who ran `/tpaccept` after the
  sender had left was told the sender was offline; now the request is simply gone, so `/tpaccept`
  and `/tpdeny` report that there is no pending request (UltiKits/UltiEssentials#30).

- A player vanished with `/hide` now stays hidden from players who join after they vanished.
  Previously `/hide` hid them only from the players online at that moment, so anyone who joined
  later could see them. A joiner holding `ultiessentials.hide.see` still sees vanished players, as
  players online at the time of the `/hide` already did (UltiKits/UltiEssentials#32).

- `/upm uninstall UltiEssentials` now shows every player vanished with `/hide` to everyone again and
  forgets the vanish state. Previously the vanish outlived the module — the hides belong to UltiTools
  itself, which stays enabled — so a vanished player stayed hidden from the players who were online
  when they vanished, was visible to anyone who joined afterwards, and could not un-vanish until they
  relogged, because `/hide` had been uninstalled with the module. The vanished player is not told
  (found by review of UltiKits/UltiEssentials#32).

- `features.wild.cooldown` in `config/essentials.yml` now sets `/wild`'s cooldown, in seconds.
  Previously the cooldown was a fixed 60 seconds and the key was never read. The default is still
  `60`, which is what every existing file already holds unless you edited it — an edited value takes
  effect from this version. `0` means no cooldown. `/ul reload UltiEssentials` applies a new value to
  the next `/wild`; a cooldown already running keeps the end time it started with, also when the new
  value is `0`. A negative value stops the module loading at start-up, with an error naming the key
  and the value. On `/ul reload UltiEssentials` a negative value is not applied: the console shows a
  warning naming the key, `/wild` keeps the cooldown it was using, and the rest of the reload —
  other settings in the file, the service restarts — completes as usual. The setting used to be
  declared with a 3600-second maximum; that limit is gone, and any value up to 2147483647 seconds is
  accepted (UltiKits/UltiEssentials#27, through UltiKits/UltiTools-Reborn#531).

#### Changed

- `/ban`, `/banlist` and `/scoreboard` deliberately take over the vanilla commands of the same name, as
  the maintainer decided; this is now stated in the documentation. The vanilla commands stay reachable as
  `minecraft:ban`, `minecraft:banlist` and `minecraft:scoreboard` (UltiKits/UltiEssentials#61).

- Changed: message and title settings in `config/essentials.yml` (the scoreboard title and lines, the
  scheduled-command text and the death-punishment command text), `config/tabbar.yml` (the tab-list
  header and footer) and `config/motd.yml` (the two MOTD lines) are written in the server's language
  when the module starts, and the file is what the module shows. A setting that is still built-in
  text — in any language, or a default an earlier version shipped — follows `language`: it is
  rewritten when the module starts or after `/ul reload`. A setting you edited is kept. To keep a
  built-in text but stop it following `language`, change at least one character. An edit of the
  extracted language file no longer flows into these settings — customise them in the config file
  instead; released versions never read these keys from the language file, so this is no regression.
  A blank scoreboard title is refused at load, exactly as every released version (`@NotEmpty`); a
  blank `features.scoreboard.lines`, `tabbar.header` or `tabbar.footer` is kept blank and shows
  nothing, exactly as every released version.

- Language keys were renamed to dotted ASCII keys (for example `essentials.home.set`): every key that
  was a Chinese sentence, and `teleport_success`, the one older ASCII key still in use.
  This module's official language files (`lang/en.json` and `lang/zh.json` under
  `plugins/UltiTools/pluginConfig/UltiEssentials/`) belong to UltiTools: from UltiTools-API 6.3.0 an edited
  official file is restored to the shipped text at every start, its edited copy kept as a backup and named in
  the server log, so edits made there are not kept. To customise messages, copy the official file under a new
  name that starts with its language code and a hyphen and holds only ASCII letters, digits, `_` and `-`
  (`en.json` to `en-myserver.json`), edit the copy against the new keys, and set `language: en-myserver` in
  `plugins/UltiTools/config.yml` (one setting for the framework and every module). Messages the copy lacks come
  from the official file its name starts with (`en` here), and a module with no file under that name uses its
  official `en`. A server whose
  language files were never edited needs no action.

- This module raises `api-version` in `plugin.yml` from `620` in the released v1.0.0 to `630`,
  so it loads only on UltiTools 6.3.0 or later. Its `/wild` cooldown uses a framework feature new in 6.3.0; on an older UltiTools
  it would load with no cooldown at all, silently, so it now refuses to load there instead
  (UltiKits/UltiEssentials#27, UltiKits/UltiTools-Reborn#531).

#### Removed

- Removed three aliases other UltiKits components own: `ul` of `/unlock` (the framework's own `/ul`),
  `l` of `/lock` (UltiLogin's `/l` for `/login`) and `sb` of `/scoreboard` (UltiSideBar's `/sb` for
  `/sidebar`). Use `/unlock`, `/lock` and `/scoreboard` (UltiKits/UltiEssentials#62).

- Removed the `w` alias of `/warp`: `/w` is vanilla's private-message shortcut (`/w <player> <message>`),
  which the alias could take over. Use `/warp` (UltiKits/UltiEssentials#60).

- Removed the `pardon` alias of `/unban`: `pardon` is the vanilla command that lifts the server's own
  ban, and the alias made the bare label reach this module or vanilla depending on load order. Use
  `/unban` for this module's bans (UltiKits/UltiEssentials#48).

- Removed the two unban helpers that no command reached — unbanning by player UUID and by IP address —
  and the `/unbanip` line in `/unban`'s documentation, which named a command that does not exist.
  `/unban <player>` is unchanged; an IP-unban command is tracked as a feature request,
  UltiKits/UltiEssentials#63 (UltiKits/UltiEssentials#47).

- The module's own "disabled" console line on unload (`UltiEssentials disabled!` under
  `language: en`) and its "configuration reloaded" console line on `/ul reload UltiEssentials`
  (`UltiEssentials config reloaded!`), together with the two language keys, present in both
  `lang/en.json` and `lang/zh.json`, that translated them. UltiTools 6.3.0 logs one reload line per
  module (`Module 'UltiEssentials' reloaded.`) (UltiKits/UltiEssentials#23).

- `features.recall.enabled` in `config/essentials.yml`. It never had any effect: this module has no
  `/recall` command. The command is recorded as a feature request, UltiKits/UltiEssentials#53 —
  removing the setting does not reject the feature (UltiKits/UltiEssentials#27).

- If the removed setting is still in your `config/essentials.yml`, which it will be on any server
  that has run an earlier version, start-up and every `/ul reload UltiEssentials` log one warning
  naming the module, the file and the key, and saying where the setting went. Deleting the key
  from the file silences the warning; leaving it there changes nothing else
  (UltiKits/UltiEssentials#27).


### v1.0.0 (2026-02-13)

Added: /back command to return to last teleport location
Added: /spawn and /setspawn spawn point system with first-join and respawn teleport
Added: /lobby and /setlobby lobby system
Added: /wild random teleport with configurable range, cooldown, and safe location finding
Added: /home multi-home system with teleport warmup and movement cancellation
Added: /tpa, /tpahere, /tpaccept, /tpdeny TPA request system with timeout, cooldown, and cross-world control
Added: /warp system with permission-restricted warps and warp list
Added: /fly flight mode toggle (supports toggling for other players)
Added: /heal, /feed health and hunger restoration
Added: /speed movement speed adjustment (0-10 multiplier)
Added: /gm game mode switching with /gms /gmc /gmsp shortcuts
Added: /hide vanish mode with ultiessentials.hide.see see-through permission
Added: /ban /tempban /unban /banlist full ban system
Added: /invsee /endersee /armorsee remote player inventory viewing
Added: /wl whitelist management (add/remove/list/on/off/status)
Added: /lock /unlock chest lock feature with admin bypass option
Added: /scoreboard display with PlaceholderAPI support
Added: MOTD and Tab bar customization
Added: Overhead name prefix display with PlaceholderAPI and Vault support
Added: Command alias system with configurable mappings
Added: Scheduled command execution service
Added: Death penalty system (money/item/XP/command penalties, world whitelist, bypass permission)
Added: Chinese and English language support
