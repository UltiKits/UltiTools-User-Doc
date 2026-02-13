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

1. Ensure your server has UltiTools-API 6.2.0 or higher installed
2. Place `UltiEssentials-1.0.0.jar` in the `plugins/UltiTools/plugins/` directory
3. Restart the server

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
| `/wild` or `/rtp` | Random teleport to a safe outdoor location (60s cooldown) | `ultiessentials.wild` | Player only |

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
| `/warp <name>` or `/w <name>` | Teleport to a warp point | `ultiessentials.warp.use` | Player only |
| `/warps` | List all accessible warp points (aliases: `/warplist`, `/listwarp`) | `ultiessentials.warp.list` | Player only |
| `/setwarp <name> [permission]` | Create a warp at current location, optionally with a required permission (aliases: `/swarp`, `/addwarp`) | `ultiessentials.warp.set` | Player only |
| `/delwarp <name>` | Delete a warp point (aliases: `/deletewarp`, `/rmwarp`, `/removewarp`) | `ultiessentials.warp.delete` | Player only |

### Player Status Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/fly` | Toggle your flight mode | `ultiessentials.fly` | Player only |
| `/fly <player>` | Toggle another player's flight mode | `ultiessentials.fly` | Player only |
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
| `/unban <player>` | Unban a player (alias: `/pardon`) | `ultiessentials.unban` | Player + Console |
| `/banlist [page]` | View the ban list (alias: `/bans`) | `ultiessentials.banlist` | Player + Console |

Temporary ban duration format: `1d` = 1 day, `2h` = 2 hours, `30m` = 30 minutes, `1w` = 1 week. Combinations work: `1d12h30m` = 1 day 12 hours 30 minutes.

### Management Commands

| Command | Description | Permission | Executor |
|---------|-------------|------------|----------|
| `/invsee <player>` | Open and view a player's inventory | `ultiessentials.invsee` | Player only |
| `/endersee <player>` or `/echest <player>` | View a player's ender chest | `ultiessentials.endersee` | Player only |
| `/armorsee <player>` | View a player's armor and offhand | `ultiessentials.armorsee` | Player only |
| `/lock` or `/l` | Lock the container you are looking at | `ultiessentials.lock` | Player only |
| `/unlock` or `/ul` | Unlock the container you are looking at | `ultiessentials.lock` | Player only |
| `/unlock info` | View lock information for a container | `ultiessentials.lock` | Player only |
| `/scoreboard` or `/sb` | Toggle scoreboard display | `ultiessentials.scoreboard` | Player only |
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

All configuration files are located in `plugins/UltiTools/UltiEssentials/`.

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
  recall:
    enabled: true                    # Enable /recall command

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
      - "600:broadcast &cReminder: follow server rules!"

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
        - "say {PLAYER} has died!"
    world-whitelist:                 # Worlds exempt from death penalty
      - "world_creative"

  # ===== Name Prefix =====
  nameprefix:
    enabled: false                   # Enable overhead name prefix (off by default)
    prefix-format: "&7[&e%vault_prefix%&7] "  # Prefix format (supports PlaceholderAPI)
    suffix-format: ""                # Suffix format (supports PlaceholderAPI)
    update-interval: 5               # Update interval (seconds, 1-60)

  # ===== Command Aliases =====
  commandalias:
    enabled: true                    # Enable command aliases
    aliases:                         # Alias mappings (alias: original command)
      gmc: "gamemode creative"
      gms: "gamemode survival"
      gma: "gamemode adventure"
      gmsp: "gamemode spectator"
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
      - "600:broadcast &cReminder: follow server rules!" # Runs every 600 seconds
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
| `ultiessentials.fly` | Toggle flight mode | OP |
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

A: Check the following: (1) UltiTools-API version is 6.2.0 or higher; (2) The JAR is in `plugins/UltiTools/plugins/`, not in `plugins/`; (3) You fully restarted the server (not just `/ul reload` -- new modules require a full restart). Check the server console for the "UltiEssentials enabled" message.

**Q: Config changes not taking effect?**

A: After editing `config/essentials.yml` or other config files, run `/ul reload` to hot-reload. Some features like scheduled commands re-register automatically on reload. If changes still don't apply, do a full server restart.

**Q: How to set up permissions?**

A: UltiEssentials uses the standard Bukkit permission system. We recommend using LuckPerms. For example, to give all players TPA permission: `/lp group default permission set ultiessentials.tpa true`. Admin commands require OP by default but can be assigned via permission plugins.

**Q: `/back` says "No location to return to"?**

A: `/back` only records locations from command-triggered teleports (like `/spawn`, `/home`, etc.), not from death, portals, or other causes. The saved location is also cleared when the player disconnects.

**Q: TPA requests keep timing out?**

A: The default timeout is 30 seconds -- you can increase it via `features.tpa.timeout`. Also make sure the target player has the `ultiessentials.tpaccept` permission.

**Q: Scoreboard shows raw PlaceholderAPI variables?**

A: Scoreboard content supports PlaceholderAPI variables (e.g., `%player_name%`), but requires PlaceholderAPI to be installed on the server. Without it, variables are displayed as-is.

**Q: Scheduled commands not executing?**

A: Confirm `features.scheduled-commands.enabled` is set to `true`. The format is `interval_seconds:command` -- the number before the colon is seconds, and the text after is a console command (no `/` prefix needed). Check the console log for "Scheduled command" entries.

## Changelog

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
