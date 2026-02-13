# UltiChat - Smart Chat Management

UltiChat is a standalone chat module for the UltiTools framework, providing comprehensive chat management features. It integrates eight major functions: auto-reply, chat formatting, join/quit messages, scheduled broadcasts, @mentions, chat channels, anti-spam, and custom emojis. All features are fully configurable through YAML files, allowing you to build a personalized chat experience without writing any code.

## Feature Overview

UltiChat was extracted from UltiEssentials as an independent module with significant enhancements. The auto-reply system supports three matching modes (exact, contains, and regex), with each rule supporting multi-line responses, trigger cooldowns, and console command execution. Chat formatting supports PlaceholderAPI variables, letting you freely design how chat messages appear. The channel system allows creating multiple channels (global, local, staff, etc.) with distance-based range and cross-world controls. The anti-spam system provides message cooldowns, duplicate detection, uppercase ratio limits, and automatic temporary muting.

## Installation

### Method 1: Install via UPM (Recommended)

Run in the server console or in-game:

```
/upm install UltiChat
```

### Method 2: Manual Installation

1. Ensure your server has UltiTools-API 6.2.0 or higher installed
2. Place `UltiChat-1.0.0.jar` in the `plugins/UltiTools/plugins/` directory
3. Restart the server

> Note: After adding/replacing JAR files, a full server restart is required. `/ul reload` only reloads configuration files.

## Quick Start

After installation, UltiChat works immediately with default settings. Here is a common scenario -- configuring chat format and auto-reply for your server:

**1. Customize the chat format**

Edit `plugins/UltiTools/UltiChat/config/chat.yml`:

```yaml
chat:
  format-enabled: true
  format: "&7[&f%player_world%&7] &f{player}&7: &f{message}"
```

Modify `format` to your desired style. `{player}` represents the player name, `{message}` the message content, and `%xxx%` are PlaceholderAPI variables.

**2. Add an auto-reply rule**

Edit `plugins/UltiTools/UltiChat/config/autoreply.yml`, adding under `rules`:

```yaml
autoreply:
  enabled: true
  cooldown: 10  # Global cooldown in seconds
  rules:
    greeting:
      keyword: "hello"
      response:
        - "&aWelcome to the server!"
        - "&7Type /help for assistance"
      mode: contains
      case-sensitive: false
```

**3. Reload the configuration**

Run in-game or from the console:

```
/uchat reload
```

Now, when a player sends a message containing "hello", the system will automatically reply with the two welcome lines.

## Commands

### Admin Commands

Base command: `/uchat`. Requires permission `ultichat.admin`. Usable by both players and console.

| Command | Description | Example |
|---------|-------------|---------|
| `/uchat reload` | Reload all configuration files | `/uchat reload` |
| `/uchat autoreply list` | List all auto-reply rules | `/uchat autoreply list` |
| `/uchat autoreply add <name> <response>` | Add an auto-reply rule (defaults to contains mode) | `/uchat autoreply add faq Server address is play.example.com` |
| `/uchat autoreply remove <name>` | Remove an auto-reply rule | `/uchat autoreply remove faq` |

### Channel Commands

Base command: `/ch` or `/channel`. Requires permission `ultichat.channel`. Channel switching is player-only; the list command works from console but is mainly useful for players.

| Command | Description | Example |
|---------|-------------|---------|
| `/ch list` | List all channels you have permission to join | `/ch list` |
| `/ch <channel>` | Switch to a specific channel | `/ch local` |

> The channel system is controlled by `channels.enabled` in `config/channels.yml`. When disabled, channel commands will be unavailable.

## Configuration

UltiChat uses 5 separate configuration files, all located in `plugins/UltiTools/UltiChat/config/`.

### chat.yml - Main Chat Configuration

```yaml
# UltiChat - Main Chat Configuration

# Chat formatting
chat:
  format-enabled: true  # Enable custom chat formatting
  # Chat format, supports PlaceholderAPI variables
  # {player} = player name, {message} = message content, {displayname} = display name
  format: "&7[&f%player_world%&7] &f{player}&7: &f{message}"

# Join/quit messages
join-quit:
  join-message-enabled: true  # Enable custom join message
  # Join message format, supports PlaceholderAPI variables
  join-message-format: "&a[+] &e%player_name% &7joined the server"
  quit-message-enabled: true  # Enable custom quit message
  # Quit message format
  quit-message-format: "&c[-] &e%player_name% &7left the server"
  welcome-enabled: true  # Enable welcome message on join (sent only to the joining player)
  # Welcome message lines, one per line
  welcome-lines:
    - "&7========================================"
    - "&6Welcome, &e%player_name%&6!"
    - "&7Online: &f%online_players%&7/&f%max_players%"
    - "&7========================================"
  title:
    enabled: true  # Show title on join
    main: "&6Welcome Back"  # Title main text
    sub: "&7%player_name%"  # Title subtitle
  # First-join broadcast message (visible to entire server), leave empty to disable
  first-join-message: "&6Welcome new player &e%player_name%&6!"

# @Mentions
mentions:
  enabled: true  # Enable @mentions
  format: "&e@{player}&r"  # Mention highlight format, {player} = mentioned player name
  sound: "ENTITY_EXPERIENCE_ORB_PICKUP"  # Sound played when mentioned
  self-mention: false  # Allow @self

# Anti-spam
anti-spam:
  enabled: true  # Enable anti-spam
  cooldown: 2  # Minimum interval between messages (seconds, range: 0-60)
  max-duplicate: 3  # Maximum allowed consecutive duplicate messages (range: 1-20)
  duplicate-window: 60  # Duplicate detection window (seconds, range: 10-600)
  mute-duration: 30  # Auto-mute duration when triggered (seconds, range: 5-600)
  caps-limit: 70  # Maximum uppercase letter percentage (0-100, 0 = no limit)
```

### autoreply.yml - Auto-Reply Configuration

```yaml
# UltiChat - Auto-Reply Configuration

autoreply:
  enabled: true  # Enable auto-reply
  cooldown: 10  # Global cooldown after triggering auto-reply per player (seconds, range: 0-300)
  rules:
    server-ip:  # Rule name (unique identifier)
      keyword: "server IP"  # Match keyword
      response: "Server address: play.example.com"  # Response (string or list)
      mode: contains  # Match mode: contains / exact / regex
      case-sensitive: false  # Case sensitive matching
    rules-info:
      keyword: "rules"
      response: "Please check /rules for server rules."
      mode: contains
      case-sensitive: false
```

Advanced auto-reply usage:

```yaml
autoreply:
  enabled: true
  cooldown: 10
  rules:
    welcome:
      keyword: "hello"
      mode: contains
      case-sensitive: false
      response:  # Multi-line response
        - "&aWelcome to the server!"
        - "&7Type /help for assistance"
      permission: ""  # Empty means anyone can trigger it
      commands:  # Console commands executed when triggered
        - "give {player} bread 5"
```

### channels.yml - Channel Configuration

```yaml
# UltiChat - Channel Configuration

channels:
  enabled: true  # Enable channel system
  default-channel: global  # Default channel for new players
  channels:
    global:  # Channel name
      display-name: "&f[Global]"  # Channel display name, supports color codes
      format: "{display}&f: {message}"  # Channel chat format
      permission: ""  # Join permission, empty means open to all
      range: -1  # Message range (-1 = unlimited)
      cross-world: true  # Allow cross-world messaging
    local:
      display-name: "&a[Local]"
      format: "{display}&7: {message}"
      permission: ""
      range: 100  # Only players within 100 blocks can see messages
      cross-world: false  # Same world only
    staff:
      display-name: "&c[Staff]"
      format: "&c[Staff] &f{player}&7: {message}"
      permission: "ultichat.channel.staff"  # Requires permission to join
      range: -1
      cross-world: true
```

### announcements.yml - Scheduled Broadcast Configuration

```yaml
# UltiChat - Announcement Configuration

announcements:
  # Chat message broadcasts
  chat:
    enabled: true  # Enable chat broadcasts
    interval: 300  # Broadcast interval (seconds, range: 10-3600)
    prefix: "&6[Announcement] &f"  # Broadcast prefix
    messages:  # Broadcast messages, rotated in order
      - "Welcome! Type /help for assistance."
      - "Please follow server rules!"

  # Boss bar broadcasts
  bossbar:
    enabled: false  # Enable boss bar broadcasts
    interval: 60  # Broadcast interval (seconds, range: 10-3600)
    duration: 10  # Boss bar display duration (seconds, range: 1-60)
    color: BLUE  # Boss bar color: BLUE / GREEN / PINK / PURPLE / RED / WHITE / YELLOW
    messages:  # Broadcast messages
      - "&eWelcome to the server!"

  # Title broadcasts
  title:
    enabled: false  # Enable title broadcasts
    interval: 600  # Broadcast interval (seconds, range: 10-3600)
    fade-in: 10  # Title fade-in time (ticks, 1 second = 20 ticks, range: 0-100)
    stay: 70  # Title stay time (ticks, range: 1-200)
    fade-out: 20  # Title fade-out time (ticks, range: 0-100)
    messages:  # Broadcast messages, use || to separate title and subtitle
      - "&6Welcome!||&7Enjoy your stay"
```

### emojis.yml - Emoji Configuration

```yaml
# UltiChat - Emoji Configuration

emojis:
  enabled: true  # Enable emoji shortcodes
  mappings:  # Shortcode to Unicode character mappings
    ":heart:": "\u2764"
    ":star:": "\u2605"
    ":smile:": "\u263A"
    ":sword:": "\u2694"
```

You can add more custom mappings in the format `":shortcode:": "replacement text"`.

## Usage Tutorials

### Scenario 1: Configure Join/Quit Messages

Want custom messages when players join and leave? Edit `config/chat.yml`:

```yaml
join-quit:
  join-message-enabled: true
  join-message-format: "&a&l>>> &e%player_name% &ajoined the game &7| &fOnline: %online_players%"
  quit-message-enabled: true
  quit-message-format: "&c&l<<< &e%player_name% &cleft the game"
  welcome-enabled: true
  welcome-lines:
    - ""
    - "&6&l    Welcome back, &e%player_name%&6!"
    - "&7    Currently &f%online_players% &7players online"
    - "&7    Type &a/help &7for assistance"
    - ""
  title:
    enabled: true
    main: "&6&lWelcome Back"
    sub: "&e%player_name%"
  first-join-message: "&b&l* &6New player &e%player_name% &6has joined for the first time! Welcome! &b*"
```

### Scenario 2: Create a Staff-Only Channel

Edit `config/channels.yml` and add under `channels`:

```yaml
channels:
  channels:
    staff:
      display-name: "&c[Staff]"
      format: "&c[Staff] &f{player}&7: {message}"
      permission: "ultichat.channel.staff"
      range: -1
      cross-world: true
```

After granting admins the `ultichat.channel.staff` permission, they can use `/ch staff` to switch to the staff channel. Messages in this channel are only visible to others in the same channel.

### Scenario 3: Set Up Scheduled Broadcasts

Want periodic reminders about server rules? Edit `config/announcements.yml`:

```yaml
announcements:
  chat:
    enabled: true
    interval: 600  # Broadcast every 10 minutes
    prefix: "&6[Announcement] &f"
    messages:
      - "Server rules: /rules"
      - "Need help? Contact an admin: /msg admin"
      - "Daily check-in for rewards: /checkin"
```

Messages rotate in order -- first broadcast shows the first message, second broadcast shows the second, and so on.

### Scenario 4: Use Regex Auto-Reply

For matching more complex chat patterns, use regex mode. Edit `config/autoreply.yml`:

```yaml
autoreply:
  rules:
    ip-question:
      keyword: "(?i)(ip|address|server address|how.+join)"
      mode: regex
      case-sensitive: false
      response:
        - "&aServer address: &fplay.example.com"
        - "&aPort: &f25565"
```

This rule triggers when a player's message contains "ip", "address", "server address", or "how to join" (and similar variations).

### Scenario 5: Add Custom Emojis

Edit `config/emojis.yml`:

```yaml
emojis:
  enabled: true
  mappings:
    ":heart:": "&c❤&r"
    ":star:": "&e★&r"
    ":check:": "&a✔&r"
    ":cross:": "&c✘&r"
    ":fire:": "&c&l🔥&r"
```

When a player types `:heart:` in chat, it is automatically replaced with a red heart symbol. Using emojis requires the `ultichat.emoji` permission.

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultichat.admin` | Admin commands (`/uchat`) | OP |
| `ultichat.channel` | Channel commands (`/ch`) | Player |
| `ultichat.channel.<name>` | Join a specific channel (set via `permission` field in channel config) | Varies |
| `ultichat.color` | Use `&` color codes in chat messages | OP |
| `ultichat.emoji` | Use emoji shortcodes in chat | Player |
| `ultichat.spam.bypass` | Bypass anti-spam checks | OP |
| `ultichat.autoreply.bypass` | Bypass auto-reply triggers | OP |

## Soft Dependencies

| Plugin | Purpose |
|--------|---------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Use `%xxx%` variables in chat format, join/quit messages, broadcasts, etc. |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Reserved for future economy-related features |

Without these plugins installed, PlaceholderAPI variables will display as-is (e.g., `%player_world%`), but built-in placeholders like `{player}` and `{displayname}` always work.

## FAQ

### What if the plugin doesn't work after installation?

Follow these troubleshooting steps:
1. Confirm UltiTools-API version is 6.2.0 or higher
2. Confirm the JAR file is in `plugins/UltiTools/plugins/` (not the root `plugins/` directory)
3. Restart the server completely (not `/ul reload` -- new module installations require a full restart)
4. Check the console log for any UltiChat-related error messages

### Config changes not taking effect?

Run `/uchat reload` to reload the configuration. If changes still don't apply, check your YAML formatting -- indentation must use spaces (not tabs), and there must be a space after colons.

### How to set up permissions?

UltiChat permissions are managed through your permission plugin (e.g., LuckPerms, PermissionsEx, etc.). For example, with LuckPerms:

```
/lp group default permission set ultichat.channel true
/lp group admin permission set ultichat.admin true
/lp group admin permission set ultichat.channel.staff true
```

### PlaceholderAPI variables not resolving?

Make sure PlaceholderAPI is installed and the corresponding expansion is downloaded. For example, to use `%player_world%`, run `/papi ecloud download Player` to install the Player expansion.

### Messages still visible server-wide after switching channels?

Confirm that `channels.enabled` is `true` in `config/channels.yml`. Also check the `range` setting for your channel -- if it is `-1`, that means unlimited range, so messages are indeed visible server-wide. Set it to a specific number (e.g., `100`) to limit the range.

### Regex auto-reply not working?

Ensure `mode` is set to `regex` and the regular expression syntax is correct. Common mistakes include forgetting to escape special characters (e.g., `.` should be `\\.`). Test your expression in an online regex tester first.

### Anti-spam falsely blocking normal players?

Adjust the anti-spam parameters in `config/chat.yml`:
- Lower the `cooldown` value (e.g., from 2 to 1)
- Increase the `max-duplicate` value (e.g., from 3 to 5)
- Grant trusted players the `ultichat.spam.bypass` permission

## Changelog

### v1.0.0 (2026-02-13)

Added: Auto-reply system with contains/exact/regex matching modes, multi-line responses, and console command triggers
Added: Custom chat formatting with PlaceholderAPI variable support and color codes
Added: Join/quit message customization including join messages, quit messages, welcome text, welcome titles, and first-join broadcasts
Added: Scheduled broadcast system supporting chat messages, boss bar, and title display modes
Added: @mention feature with highlight formatting and sound notifications
Added: Chat channel system with global/local/custom channels, range limits, and cross-world control
Added: Anti-spam with message cooldown, duplicate detection, uppercase limits, and automatic muting
Added: Custom emoji shortcodes replaced with Unicode characters
