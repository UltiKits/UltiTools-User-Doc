# UltiBot - Fake Player Bots

UltiBot is a UltiTools framework module that spawns fake player bots on your server. These bots are real player entities that look and behave like actual players — they can jump, sneak, sprint, attack, mine, use items, send chat messages, and execute commands. The module includes a macro recording system that lets you record a sequence of actions and replay them later. Bot skins are fetched in real-time from Mojang's servers, so they look identical to real players. UltiBot is useful for testing server plugins, simulating player behavior, and building NPC scenes.

:::warning
UltiBot uses NMS (Net Minecraft Server internals) and has strict server version requirements. It currently supports **Paper 1.20.1 through 1.21.4** only. Spigot is not supported. Make sure your server version is within the supported range.
:::

## Installation

There are two ways to install:

**Option 1: Via UltiTools Plugin Manager (Recommended)**

Run in the server console or in-game:

```
/upm install UltiBot
```

**Option 2: Manual Installation**

1. Download the `UltiBot.jar` file
2. Place the JAR file into the `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file is automatically generated at `plugins/UltiTools/UltiBot/config.yml`.

## Quick Start

No extra configuration is needed after installation. Just start spawning bots:

```
/bot spawn TestBot             # Spawn a bot named TestBot at your location
/bot list                      # List all active bots
/bot action TestBot JUMP 40    # Make TestBot jump every 40 ticks (every 2 seconds)
/bot chat TestBot Hello world  # Make TestBot say "Hello world" in chat
/bot skin TestBot Notch        # Change TestBot's skin to Notch's
/bot remove TestBot            # Remove TestBot
```

Macro recording:

```
/bot macro record TestBot dance   # Start recording a macro named "dance"
/bot action TestBot JUMP 20       # Actions during recording are captured
/bot action TestBot SNEAK 20
/bot macro stop TestBot           # Stop recording
/bot macro play TestBot dance     # Play back the recorded macro
```

## Commands

All commands start with `/bot` and work from both in-game and the console (unless noted as "player-only").

### Basic Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bot spawn <name>` | Spawn a bot at your location (player-only) | `/bot spawn Guard` | `ultibot.use` |
| `/bot remove <name>` | Remove a specific bot (use `all` to remove all) | `/bot remove Guard` | `ultibot.use` |
| `/bot list` | List all active bots and their owners | `/bot list` | `ultibot.use` |
| `/bot tp <name>` | Teleport a bot to your location (player-only) | `/bot tp Guard` | `ultibot.use` |
| `/bot reload` | Reload the configuration file | `/bot reload` | `ultibot.admin` |

### Action Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bot action <name> <action> <interval>` | Make a bot repeat an action | `/bot action Guard JUMP 40` | `ultibot.use` |
| `/bot stop <name>` | Stop all actions on a bot | `/bot stop Guard` | `ultibot.use` |

The interval is in ticks (20 ticks = 1 second).

Available action types:

| Action | Description |
|--------|-------------|
| `JUMP` | Jump |
| `SNEAK` | Sneak (crouch) |
| `SPRINT` | Sprint (run) |
| `USE` | Use held item |
| `ATTACK` | Attack (swing arm) |
| `MINE` | Mine a block |
| `DROP_ITEM` | Drop a single item |
| `DROP_STACK` | Drop an entire stack |
| `DROP_INVENTORY` | Drop all inventory items |
| `LOOK_AT_NEAREST` | Look at the nearest entity |

### Interaction Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bot chat <name> <message>` | Make a bot send a chat message | `/bot chat Guard Hello` | `ultibot.use` |
| `/bot cmd <name> <command>` | Make a bot execute a command (no `/` prefix needed) | `/bot cmd Guard say hello` | `ultibot.use` |
| `/bot skin <name> <skinName>` | Change a bot's skin (fetched from Mojang) | `/bot skin Guard Steve` | `ultibot.use` |

### Macro Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bot macro record <name> <macroName>` | Start recording a macro | `/bot macro record Guard patrol` | `ultibot.use` |
| `/bot macro stop <name>` | Stop recording | `/bot macro stop Guard` | `ultibot.use` |
| `/bot macro play <name> <macroName>` | Play a saved macro | `/bot macro play Guard patrol` | `ultibot.use` |
| `/bot macro list` | List all saved macros | `/bot macro list` | `ultibot.use` |

### Testing/Debug Commands

These commands are primarily for developers testing plugin interactions:

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bot messages <name>` | View messages the bot received | `/bot messages Guard` | `ultibot.use` |
| `/bot clearmsg <name>` | Clear the bot's message history | `/bot clearmsg Guard` | `ultibot.use` |
| `/bot op <name>` | Grant OP status to the bot | `/bot op Guard` | `ultibot.admin` |
| `/bot deop <name>` | Remove OP status from the bot | `/bot deop Guard` | `ultibot.admin` |
| `/bot click <name> <slot>` | Make the bot click an inventory slot | `/bot click Guard 0` | `ultibot.use` |
| `/bot inv <name>` | View the bot's open GUI inventory | `/bot inv Guard` | `ultibot.use` |
| `/bot closeinv <name>` | Close the bot's open GUI | `/bot closeinv Guard` | `ultibot.use` |

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibot.use` | Basic bot commands (spawn, remove, list, teleport, actions, chat, skin, macros) | All players |
| `ultibot.action` | Repeating action commands | All players |
| `ultibot.admin` | Admin commands (reload, op/deop) | OP |

## Configuration

Configuration file path: `plugins/UltiTools/UltiBot/config.yml`

```yaml
# Maximum bots each player can spawn (range: 1-100)
max-bots-per-player: 5

# Maximum total bots on the server (range: 1-200)
max-total-bots: 20

# Default skin name for new bots when no skin is specified
default-skin: "Steve"

# Enable bot physics ticking (disable to stop gravity and other physics)
tick-bots: true

# Allow bots to keep their chunks loaded
allow-chunk-loading: false

# Prefix shown before bot names in chat and tab list
bot-prefix: "[Bot] "

# Remove all bots owned by a player when they disconnect
auto-remove-on-quit: true

# Automatically respawn bots after death
auto-respawn: true
```

### Configuration Details

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `max-bots-per-player` | integer | 5 | Per-player bot limit |
| `max-total-bots` | integer | 20 | Server-wide bot limit |
| `default-skin` | string | "Steve" | Default skin name (must not be empty) |
| `tick-bots` | boolean | true | Whether bots participate in server ticks (gravity, collisions, etc.) |
| `allow-chunk-loading` | boolean | false | Whether bots keep their chunks loaded (keep false for performance) |
| `bot-prefix` | string | "[Bot] " | Name prefix for bots |
| `auto-remove-on-quit` | boolean | true | Auto-remove a player's bots when they leave |
| `auto-respawn` | boolean | true | Auto-respawn bots after death |

## Supported Server Versions

UltiBot uses NMS (Net Minecraft Server) code to implement fake players, so it only supports specific server versions.

| Minecraft Version | Status |
|-------------------|--------|
| 1.20.1 | Supported |
| 1.20.2 ~ 1.20.3 | Supported |
| 1.20.4 | Supported |
| 1.20.5 ~ 1.20.6 | Supported |
| 1.21 ~ 1.21.1 | Supported |
| 1.21.2 ~ 1.21.3 | Supported |
| 1.21.4 | Supported |

:::warning
UltiBot only supports Paper servers, not Spigot. Requires Java 21 runtime (standard requirement for Paper 1.20.4+).
:::

## Usage Tutorials

### Scenario 1: Spawning Your First Bot

The simplest way to start is spawning a bot at your location:

```
/bot spawn MyBot
```

The bot appears at your position with the default skin (Steve). You can change its skin:

```
/bot skin MyBot Notch
```

The skin is fetched from Mojang's servers in real-time. The first fetch takes a few seconds, but the skin is cached afterwards.

### Scenario 2: Making Bots Perform Actions

You can make bots repeat actions at regular intervals:

```
/bot action MyBot JUMP 40     # Jump every 2 seconds
/bot action MyBot SNEAK 20    # Sneak every 1 second
```

The interval is in ticks (20 ticks = 1 second). An interval of 40 means the action runs every 2 seconds.

To stop all actions:

```
/bot stop MyBot
```

### Scenario 3: Recording and Playing Macros

Macros let you record a series of actions and replay them later.

1. Start recording:
```
/bot macro record MyBot patrol
```

2. Execute actions during recording (these are captured with their timing):
```
/bot action MyBot JUMP 20
/bot action MyBot SPRINT 40
/bot action MyBot SNEAK 20
```

3. Stop recording:
```
/bot macro stop MyBot
```

4. Play it back anytime:
```
/bot macro play MyBot patrol
```

View all saved macros:
```
/bot macro list
```

### Scenario 4: Using Bots for Plugin Testing

One of UltiBot's key use cases is testing other plugins. Bots can execute commands, click GUI slots, and capture messages, helping you test plugin interactions.

```
/bot spawn Tester                    # Spawn a test bot
/bot op Tester                       # Give it OP for testing
/bot cmd Tester warp spawn           # Make the bot run a command
/bot messages Tester                 # See what messages the bot received
/bot click Tester 0                  # Click slot 0 in the bot's open GUI
/bot inv Tester                      # View the bot's open GUI contents
/bot closeinv Tester                 # Close the GUI
```

### Scenario 5: Cleaning Up All Bots

To remove all bots at once:

```
/bot remove all
```

Alternatively, the `auto-remove-on-quit: true` setting (enabled by default) automatically removes all bots owned by a player when they disconnect.

## FAQ

**Q: What if the plugin doesn't work after installation?**

A: Check the following:
1. Confirm the JAR file is placed in `plugins/UltiTools/plugins/`, not the `plugins/` root directory
2. A server restart is required after installation; `/ul reload` only reloads configuration, it cannot load new module JARs
3. Make sure you are using a **Paper** server, not Spigot (UltiBot requires Paper's NMS mappings)
4. Confirm your Minecraft version is between 1.20.1 and 1.21.4
5. Make sure UltiTools-API is version 6.2.1 or higher
6. Check the console for "unsupported version" error messages

**Q: Config changes not taking effect?**

A: After modifying `plugins/UltiTools/UltiBot/config.yml`, use `/bot reload` to reload the configuration, or `/ul reload`.

**Q: How to set up permissions?**

A: UltiBot permissions start with `ultibot.`. We recommend using LuckPerms:

```
/lp group default permission set ultibot.use true
/lp group admin permission set ultibot.admin true
```

`ultibot.use` and `ultibot.action` are available to all players by default. `ultibot.admin` is OP-only by default.

**Q: Will bots affect server performance?**

A: Each bot is a real player entity, so many bots will increase server load. Recommendations:
- Keep the bot limit reasonable (default: 20 total)
- Keep `allow-chunk-loading: false` so bots don't cause extra chunk loading
- Remove unused bots promptly

**Q: Why is my server version not supported?**

A: UltiBot uses NMS (Net Minecraft Server internals) to implement fake players, and NMS changes with every Minecraft version. Currently versions 1.20.1 through 1.21.4 are supported. If your version is outside this range, you'll need to wait for the developer to add support for that version.

**Q: What can and can't bots do?**

A: Bots can: jump, sneak, sprint, use items, attack, mine, drop items, send messages, execute commands, change skins, and record/play macros. They are real player entities, so other plugins treat them as real players. What bots cannot do: they have no AI — they won't pathfind or make decisions on their own. All behavior must be triggered through commands.

**Q: What if skin fetching fails?**

A: Skins are fetched from Mojang's API. Failure could mean: the player name doesn't exist, Mojang's API is temporarily down, or the server can't reach the internet. Successfully fetched skins are cached and don't need to be re-downloaded.

## Changelog

### v1.0.0

Initial release.

Added: Full fake player bot system with spawn, remove, teleport, and list management
Added: 10 action types (jump, sneak, sprint, use item, attack, mine, drop, look at nearest)
Added: Repeating actions with configurable tick intervals
Added: Macro recording system (record, stop, play, list) for saving and replaying action sequences
Added: Skin system with real-time Mojang API fetching and caching
Added: Bot chat messaging and command execution
Added: Auto-management features (auto-remove on owner quit, auto-respawn on death)
Added: Testing support (message capture, OP toggle, GUI interaction, inventory viewing)
Added: Multi-version NMS support (Paper 1.20.1 through 1.21.4)
Added: Chinese and English language support
