# UltiChat - Smart Chat Management

UltiChat is a standalone chat module for the UltiTools framework, providing comprehensive chat management features. It integrates eight major functions: auto-reply, chat formatting, join/quit messages, scheduled broadcasts, @mentions, chat channels, anti-spam, and custom emojis. All features are fully configurable through YAML files, allowing you to build a personalized chat experience without writing any code.

## Feature Overview

UltiChat was extracted from UltiEssentials as an independent module with significant enhancements. The auto-reply system supports three matching modes (exact, contains, and regex), with each rule supporting multi-line responses, trigger cooldowns, and console command execution. Chat formatting supports PlaceholderAPI variables, letting you freely design how chat messages appear. The channel system allows creating multiple channels (global, local, staff, etc.) with distance-based range and cross-world controls. The anti-spam system provides message cooldowns, duplicate detection, uppercase ratio limits. A failed check rejects the current message; it does not automatically mute the player.

## Installation

### Method 1: Install via UPM (Recommended)

Run in the server console or in-game:

```
/upm install UltiChat
```

### Method 2: Manual Installation

1. Ensure your server has UltiTools-API 6.3.0 or higher installed
2. Place `UltiChat-2.0.0.jar` in the `plugins/UltiTools/plugins/` directory
3. Restart the server

> Note: After adding/replacing JAR files, a full server restart is required. `/ul reload` only reloads configuration files.

## Quick Start

After installation, UltiChat works immediately with default settings. Here is a common scenario -- configuring chat format and auto-reply for your server:

**1. Customize the chat format**

Edit `plugins/UltiTools/pluginConfig/UltiTools-Chat/config/chat.yml`:

```yaml
chat:
  format-enabled: true
  format: "&7[&f%player_world%&7] &f{player}&7: &f{message}"
```

Modify `format` to your desired style. `{player}` represents the player name, `{message}` the message content, and `%xxx%` are PlaceholderAPI variables.

**2. Add an auto-reply rule**

Edit `plugins/UltiTools/pluginConfig/UltiTools-Chat/config/autoreply.yml`, adding under `rules`:

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
| `/uchat autoreply setkeyword <name> <keyword...>` | Set a whole phrase as the keyword | `/uchat autoreply setkeyword faq server IP` |
| `/uchat autoreply remove <name>` | Remove an auto-reply rule | `/uchat autoreply remove faq` |

### Channel Commands

Base command: `/ch` or `/channel`. Requires permission `ultichat.channel`. Both switching and listing are player-only in practice; console receives the players-only refusal.

| Command | Description | Example |
|---------|-------------|---------|
| `/ch list` | List all channels you have permission to join | `/ch list` |
| `/ch <channel>` | Switch to a specific channel | `/ch local` |

> The channel system is controlled by `channels.enabled` in `config/channels.yml`. When disabled, channel commands will be unavailable.

## Configuration

UltiChat uses 5 separate configuration files, all located in `plugins/UltiTools/pluginConfig/UltiTools-Chat/config/`.

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
  duplicate-window: 0  # Seconds, 0-600; 0 has no window expiry, but clears history after 24 hours idle
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
      permission: ""  # Join permission, empty means open to all
      range: -1  # Message range (-1 = unlimited)
      cross-world: true  # Allow cross-world messaging
    local:
      display-name: "&a[Local]"
      permission: ""
      range: 100  # Only players within 100 blocks can see messages
      cross-world: false  # Same world only
    staff:
      display-name: "&c[Staff]"
      format: "{display} &f{player}&7: {message}"
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
    interval: 300  # Broadcast interval (seconds, range: 1-107374182)
    prefix: "&6[Announcement] &f"  # Broadcast prefix
    messages:  # Broadcast messages, rotated in order
      - "Welcome! Type /help for assistance."
      - "Please follow server rules!"

  # Boss bar broadcasts
  bossbar:
    enabled: false  # Enable boss bar broadcasts
    interval: 60  # Broadcast interval (seconds, range: 1-107374182)
    duration: 10  # Boss bar display duration (seconds, range: 1-60)
    color: BLUE  # Boss bar color: BLUE / GREEN / PINK / PURPLE / RED / WHITE / YELLOW
    messages:  # Broadcast messages
      - "&eWelcome to the server!"

  # Title broadcasts
  title:
    enabled: false  # Enable title broadcasts
    interval: 600  # Broadcast interval (seconds, range: 1-107374182)
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

The text examples above illustrate English settings. Announcements, join/quit text, shipped channel display names and the two example replies are written in the framework's `language`. Built-in text follows that language; edited values are kept. Apply a language change with a full `/ul reload` or restart: `/uchat reload` does not reread the framework language. Edit these configuration files, rather than expecting extracted language-file edits to change announcement text.

### Upgrading an older installation

Do not overwrite your existing file with a complete example. An existing `duplicate-window: 60` now really applies and makes slow repeats easier to pass. Set it to `0` and run `/uchat reload` for counting without window expiry, but history still clears after 24 hours idle. Reconnecting resets neither anti-spam history nor auto-reply cooldown. Removing the old `anti-spam.mute-duration` only silences its warning: automatic muting never happened.

All three announcement intervals now follow the configured values, including edits made before upgrading. They use seconds, 1-107374182. Reload keeps their cycle position. Invalid intervals refuse startup; reload ignores them and keeps the running interval. `/uchat reload` reports partial completion or the failure cause instead of always claiming success.

Shipped channels no longer set `format`. The staff format above is a custom example; remove that line to use the channel display name followed by the global chat format. Channel formats apply only when both `channels.enabled` and `chat.format-enabled` are true. Startup removes the three exact legacy shipped formats. Custom formats should contain `{player}` or `{displayname}` and `{message}`; `{display}` is the channel display name. An undefined default channel warns and falls back to an open global channel, then the first permission-free channel in file order. Without one, the undefined name remains and its chat has no world or range filtering. Reloading after removing a player's channel moves and notifies them to this default target.

A command-created rule can answer with a sentence; use `setkeyword` to match a phrase. New rule names cannot contain dots. Successful commands persist only the named rule (`setkeyword` changes only its keyword), keeping other rules and file content. Duplicate names are refused; a missing keyword line must be added by hand. A failed write rolls back and explains why; a concurrent panel replacement asks you to retry. After deleting `autoreply.yml`, run `/uchat reload` before add, or only the new rule is recreated, not the shipped examples. Unrecognised colours, sounds and matching modes log their fallback; an invalid regex never triggers.

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
      format: "{display} &f{player}&7: {message}"
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

The module registers `ultichat.channel` as granted to all players by default and `ultichat.admin` as operators-only. The other fixed nodes have no registered default grant and are operators-only by default; grant them explicitly to players. For example, grant emoji access to the default player group with LuckPerms:

```text
/lp group default permission set ultichat.emoji true
```

To restrict `/ch`, explicitly deny the channel command permission for the default player group first, then grant it to the groups that should have access:

```text
/lp group default permission set ultichat.channel false
```

| Permission | Description | Default |
|------------|-------------|---------|
| `ultichat.admin` | Admin commands (`/uchat`) | OP |
| `ultichat.channel` | Channel commands (`/ch`) | All players (registered by the module as granted by default) |
| `ultichat.channel.<name>` | Join a specific channel (set via `permission` field in channel config) | Varies |
| `ultichat.color` | Use `&` color codes in chat messages | OP |
| `ultichat.emoji` | Use emoji shortcodes in chat | OP (grant explicitly to players) |
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
1. Confirm UltiTools-API version is 6.3.0 or higher
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

### v2.0.0

#### Changed

- Requires UltiTools-API 6.3.0 or later. The module's `api-version` rises from `620` in the
  released `v1.0.0` to `630`; an older framework refuses to load it.

- `plugin.yml` now declares `identify-string: ultichat`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).
  An older framework refuses the module with a warning that the UltiTools version is outdated (the
  refusal names the module by its `plugin.yml` `name:`, `UltiTools-Chat`).

- `/uchat autoreply add <name> <response...>` takes the rest of the line as the response, and
  `/uchat autoreply setkeyword <name> <keyword...>` the rest of the line as the keyword, so a rule
  created by command can answer with a sentence and match a phrase. Both took a single word, and a
  longer line was refused with the usage text (UltiKits/UltiChat#26).

- Message and title settings in `config/announcements.yml`, `config/chat.yml`,
  `config/channels.yml` and `config/autoreply.yml` -- the announcements, the join/quit messages,
  the shipped channels' display names and the two example auto-reply rules -- are written in the
  server's language when the module starts, and the file is what the module shows; previously they
  were fixed English text, so `language: zh` had no effect on them. A setting that is still
  built-in text -- in any language, or a default an earlier version shipped -- follows
  `language`: it is rewritten when the module starts or after `/ul reload`. A setting you edited is
  kept. To keep a built-in text but stop it following `language`, change at least one character. An
  example auto-reply rule counts as built-in only while its keyword and response together are one
  language's built-in pair; a rule where either was edited is yours. Edit these settings in the
  config files: an edit of the extracted language file does not change them, and released versions
  never read them from it. A changed `language` is picked up at a restart or a full `/ul reload`,
  not by a single-module reload such as `/uchat reload` or `/ul reload UltiChat`
  (UltiKits/UltiChat#18).

- The three channel formats earlier versions shipped (`{display}&f: {message}`,
  `{display}&7: {message}`, `&c[Staff] &f{player}&7: {message}`) are now removed from
  `config/channels.yml` when the module starts, so the file matches what the chat shows; the chat
  line is unchanged (UltiKits/UltiChat#16, #18).

- `anti-spam.duplicate-window` in `config/chat.yml` now takes effect. It was documented as the
  duplicate-detection time window but never read: a message counted as a duplicate when the
  player's last `anti-spam.max-duplicate` accepted messages were all the same text, however long
  ago they had been sent. It now means: `0` -- the new declared default -- is no window-based expiry,
  that old counting rule, but a player's duplicate history is cleared after 24 hours without
  messages (a memory bound; see the UltiKits/UltiChat#40 entry below); a positive value (up to
  600) is a window in seconds, and a retained copy older than it stops counting. The allowed range is now 0-600 (it was 10-600). **Upgrade consequence:** a
  server that ran an earlier version already has `duplicate-window: 60` in its own file (the
  framework wrote the old default there), and that 60 now applies, so duplicate detection on such a
  server is more permissive than before the upgrade: with the default `max-duplicate: 3`, the same
  message sent three times is refused on the fourth only if the first of those three is at most 60
  seconds old. At module start and on every reload, any window above 0 is announced with one
  warning naming the file, the key and the value; set it to `0` and run `/uchat reload` to restore
  the previous duplicate-counting rule (UltiKits/UltiChat#14).

- A channel format you edited before this version now takes effect. Channel formats were never
  applied before, so an edit -- for example recolouring the shipped `{display}&f: {message}` to
  `{display}&e: {message}` -- showed nothing; it is no longer one of the three formerly shipped
  strings, so it now applies as written, and a format without `{player}` or `{displayname}` shows
  no sender name, one without `{message}` no message text. At module start and on every reload,
  each channel whose format is in effect and lacks one of those gets one warning naming the file,
  the channel, and what to add (UltiKits/UltiChat#16).

#### Removed

- The language-file entries `spam_muted` and `no_permission` from `lang/en.json` and
  `lang/zh.json`: no code ever displayed them. Players are never muted automatically (automatic
  muting is requested as a feature in UltiKits/UltiChat#30), and a permission refusal comes from
  UltiTools' own translated message.

- Removed the automatic-mute setting `anti-spam.mute-duration` from `config/chat.yml`. Automatic
  muting was documented but never happened: the code that would have muted a player was never
  called, so no player was ever muted, whatever the setting said. Anti-spam behaves exactly as
  before -- a message that trips the cooldown, duplicate or capital-letter check is refused, and
  the player can send the next acceptable message as usual. An upgraded server that still has the
  key in its own file gets one warning at module start and on every reload, naming the file and the
  key; delete the key to silence it. Removing the setting is not a rejection of automatic muting:
  it is requested as a feature in UltiKits/UltiChat#30 (UltiKits/UltiChat#15).

#### Fixed

- `/uchat autoreply add`, `setkeyword` and `remove` now write exactly the rule they name into
  `config/autoreply.yml` - `remove` removes it - and nothing else: every other rule, one an operator added
  or edited by hand while the server ran included, and every other line of the file stay byte for byte. `add`
  refuses a name the file already holds (`Rule '<name>' already exists.`), one an operator added by hand since the
  last reload included; `setkeyword` writes only that rule's keyword, so a hand edit of its response stays, and
  writes nothing when the operator deleted the rule by hand (the replies are described under
  UltiKits/UltiChat#51 below). A rule name is read whole, dots included. Before, the
  commands saved the whole configuration: against the framework's 6.3.0 write rules a rule edited by hand was
  then not changed or removed while the command reported success, and a write the framework refused was
  reported as success. Now a refused write rolls the change back and is answered
  `Rule '<name>' was not saved: <reason>. The change was rolled back; fix config/autoreply.yml as the server
  log says, then run the command again.` The module's own line about an overwritten operator edit, and the
  framework's overwrite warning that replaced it earlier in this release (UltiTools-Reborn#527), are gone:
  nothing the operator wrote is overwritten any more (UltiKits/UltiChat#50).

- `/uchat autoreply add` and `setkeyword` now ask the framework whether `config/autoreply.yml` holds the
  rule, on the same read of the file as the write (the framework's `MUST_BE_ABSENT` and `MUST_BE_PRESENT`
  write conditions), instead of reading the file a second time inside the module. A valid file is no longer
  refused: `add` writes the rule when the file has no `autoreply` section, no `rules` key, `rules:` left empty,
  `rules: {}`, only comments, or the settings in the flat `"autoreply.rules":` form. Before, the command
  answered `config/autoreply.yml cannot be read as it is now. Run /uchat reload`, and the advice did not help,
  because the file was the same after a reload. A rule an operator wrote by hand since the last reload is still
  never replaced (`Rule '<name>' already exists.`; an entry holding only `~` counts as a rule of that name).
  `setkeyword` on a rule the operator deleted, or whose entry has no `keyword:` line, writes nothing and
  answers `Rule '<name>' has no keyword line in config/autoreply.yml (...), so nothing was saved`; give such a
  rule its first keyword by editing the file. A file the framework cannot read or parse is answered with the
  framework's reason (`Rule '<name>' was not saved: <reason>. The change was rolled back; ...`). A refused or
  failed write now rolls the in-memory rule set back whatever the failure was; before, only an `IOException`
  did. **Changed:** a file the operator deleted while the server runs holds no rule, so `add` now creates it
  holding only the new rule (nothing the operator wrote is overwritten); `setkeyword` still writes nothing.
  After deleting `config/autoreply.yml`, run `/uchat reload` before `/uchat autoreply add`: otherwise the file
  holds only the new rule and the shipped `server-ip` and `rules-info` example rules do not come back
  (UltiKits/UltiChat#51).

- `/uchat reload` now reports what the framework's reload reported. A reload the framework finished
  partially is answered with the parts that did not reload, and one that failed with its cause; the
  reply `UltiChat configuration reloaded.` is only sent when every part reloaded. Before, the reply was
  always success, and a failing reload surfaced as an unhandled error (UltiKits/UltiChat#48).

- After `/uchat reload` or `/ul reload`, a player who had switched into a channel that was removed
  from `channels.channels` is moved to the channel new players land in (see the
  `channels.default-channel` entry below: one that needs no permission) and told in one line. Before,
  the player kept the removed channel: their chat had no range or world limit among only the players
  holding that name, it no longer reached anyone else, and nothing was logged (UltiKits/UltiChat#45).

- A `channels.default-channel` that names no channel defined under `channels.channels` is now named in
  the console when the module starts and on every reload (while channels are enabled), together with
  the channel new players are placed in instead: `global` if it is defined and needs no permission,
  otherwise the first channel in the file that needs none (a channel `/ch` would refuse them is never
  chosen). Before, the setting was accepted without a word and new players were placed in a channel
  that does not exist. With no such channel, new players are all placed in the one undefined channel
  and the warning says so (UltiKits/UltiChat#44).

- With PlaceholderAPI installed, the join, quit and welcome texts now show the module's own
  `%online_players%` and `%max_players%` as numbers. The shipped welcome line showed them as the
  literal tokens, because the text went to PlaceholderAPI first and no expansion provides them. The
  module's own placeholders are now filled first, in one pass, and PlaceholderAPI runs on the result;
  a nickname that contains a `%token%` is still shown as written. The module's `{player}` and
  `{displayname}` are filled in these texts too; with PlaceholderAPI installed they stayed literal
  (UltiKits/UltiChat#42).

- At `anti-spam.duplicate-window: 600` a repeat sent exactly 600 seconds after the newest of a
  player's retained copies is now refused as a duplicate, as the window says; the history was dropped
  one millisecond too early, so that repeat was accepted. The cooldown comparison was checked in the
  same pass and already agrees with its own cleanup (UltiKits/UltiChat#41).

- A configuration value UltiChat cannot use is now named in the console when the module starts and
  on every reload, with what it does instead: an `announcements.bossbar.color` that is no boss-bar
  colour (blue is used), a `mentions.sound` that is no sound (the default sound now plays; it played
  nothing), an auto-reply rule `mode` other than `contains`, `exact` or `regex` (the rule matches as
  `contains`), and an auto-reply regular expression that does not compile (the rule never fires).
  Each of these used to happen silently.

- Anti-spam and auto-reply cooldown history now expires by elapsed time rather than by leaving
  the server. Reconnecting does not reset either history, so it cannot be used to bypass these
  checks. Cooldown checks discard history once it is 60 seconds old; duplicate history is cleared after
  more than 600 seconds without an accepted message while `anti-spam.duplicate-window` is positive,
  or after more than 24 hours while it is `0`. Auto-reply cooldown history expires after 300
  seconds. Expired records are also swept once a minute, so players who stop chatting do not
  leave records for the lifetime of the server. Concurrent chat processing no longer loses a
  freshly recorded duplicate-history entry during expiry, and each chat message or matching
  auto-reply no longer scans every tracked player (UltiKits/UltiChat#20, #34, #40).

- A chat format using `{displayname}` inserts the player's display name as written. The name was put
  into the format before `{message}` and PlaceholderAPI were filled, so a nickname containing
  `{message}` repeated the message, and one containing a PlaceholderAPI placeholder such as
  `%server_name%` was expanded as if the operator had written it. Colour codes in the name still show
  as colour. The shipped `chat.format` uses `{player}` and was not affected (UltiKits/UltiChat#32).

- Messages show an apostrophe once: `Auto-reply rule 'greet' added.`, `You don't have permission for
  channel staff.` Language entries wrote every apostrophe doubled, and players saw both. The jar's
  text is corrected, and a doubled apostrophe in a language file an earlier version extracted onto
  the server is shown as one too (UltiKits/UltiChat#37).

- The `/ch` channel list shows a channel's display name exactly as configured, and the join, quit and
  welcome lines (without PlaceholderAPI) insert a player's display name exactly as it is. A value
  containing a later placeholder, such as `{1}` or `%online_players%`, was rewritten by it.

- `/uchat autoreply list` and `/uchat autoreply setkeyword` show a rule name, keyword or response
  exactly as written. A value containing `{1}`, `{2}` or `{3}` was rewritten by the placeholders
  filled after it, so the line showed text the rule does not have (UltiKits/UltiChat#39).

- A `/uchat autoreply add`, `setkeyword` or `remove` whose save coincides with a panel update of the
  auto-reply rules now says the change did not take effect ("...the panel replaced the auto-reply rules
  while it was being saved. Run the command again."). The panel's update replaces the whole rule set,
  so the command's change was neither active nor saved, yet the command reported success. The panel's
  rules are kept as the panel wrote them (UltiKits/UltiChat#29).

- `/uchat autoreply add` refuses a rule name containing `.` and says why. The configuration file
  stores a rule under its name as a path, so `my.rule` was split into two keys when the file was
  written: the rule was renamed to `my` and never fired, while the command reported it added
  (UltiKits/UltiChat#25).

- The anti-spam refusals now follow the `language` setting. The cooldown, duplicate and
  too-many-capitals refusals were fixed Chinese text in every language although the language files
  already carried them; they now come from `spam_cooldown`, `spam_duplicate` and `spam_caps`
  (`Please wait before sending another message.`, `Stop sending duplicate messages!`,
  `Please reduce the amount of uppercase letters.` under `language: en`), shown in red. Under
  `language: zh` the wording is the language file's, which differs slightly from the old fixed text
  (UltiKits/UltiChat#18).

- `language: zh` now applies to what was fixed English text: the `/ch` and `/uchat` help, the
  players-only refusal of `/ch` from the console, the two commands' descriptions (shown by `/help`),
  and the console lines about a channel format missing a sender or message token, an applied
  `anti-spam.duplicate-window`, a key this version no longer reads and a failed `config/autoreply.yml`
  save. Their English wording is unchanged.

- The announcement interval settings `announcements.chat.interval`, `announcements.bossbar.interval`
  and `announcements.title.interval` in `config/announcements.yml` now take effect. They were
  documented but never read: the announcements always ran every 300, 60 and 600 seconds
  respectively, whatever the file said. The values are in seconds, with the same defaults (300 / 60
  / 600), so a server that never changed them sees no difference; a server that did now gets the
  interval it configured -- **including a value edited before this upgrade, which had no effect
  until now and starts applying the first time this version loads**. The old accepted range of 10 to
  3600 seconds is gone: the range is now the framework's, 1 second to about 3.4 years, so an
  interval of 1 to 9 seconds (which the old range rejected) and one above an hour are both
  accepted and take effect -- `interval: 1` on the chat announcement sends a line every second.
  A changed value takes effect at `/ul reload` (or `/uchat reload`) without
  a restart, keeping each announcement's place in its cycle -- the next one comes one new interval
  after the last, or on the next tick if that moment has already passed. A value below 1 second (or
  above about 3.4 years) stops the module from loading at startup with a message naming the key;
  on a reload it is ignored with a warning and the running interval is kept. This uses the
  framework's config-bound timers (UltiKits/UltiTools-Reborn#531), so this version needs UltiTools
  6.3.0 or later and declares `api-version: 630` (UltiKits/UltiChat#13).

- A channel's own `format:` in `config/channels.yml` now applies to its members' chat lines, while
  both `channels.enabled` and `chat.format-enabled` (in `config/chat.yml`) are true -- the defaults;
  with either off, no channel format is used, as before. It was
  documented but never used: every channel's line was the global `chat.format` with the channel's
  display name in front, and that is still what a channel without its own format gets. In a
  channel format, `{display}` is replaced by the channel's display name, alongside `{player}`,
  `{displayname}` and `{message}`. The channels shipped with this module no longer set a format.
  **Upgraded servers:** earlier versions wrote three formats into every server's `channels.yml`
  (`{display}&f: {message}` for global, `{display}&7: {message}` for local,
  `&c[Staff] &f{player}&7: {message}` for staff); two of them contain no player name. A format
  exactly equal to one of those three strings is removed from `channels.yml` when the module
  starts, so an upgraded server's chat looks exactly as before and its file says so. The cost: none
  of those three exact strings can be chosen on purpose -- change any single character (for
  example, add a space) and the format counts as your own and takes effect (UltiKits/UltiChat#16,
  #18).

- Auto-reply rules changed with `/uchat autoreply add`, `/uchat autoreply setkeyword` and
  `/uchat autoreply remove` are now written to `config/autoreply.yml` as the command runs, so they
  survive `/uchat reload` and `/ul reload`; previously only a clean server stop saved them, and
  either reload silently discarded every rule change made since that stop. If the file cannot be
  written, the rule set is left exactly as it was and the sender is told the rule could not be
  saved instead of being told it was added, changed or removed. Only the rule the command names is
  written; see UltiKits/UltiChat#50 above for what happens to the rest of the file
  (UltiKits/UltiChat#17).

- Uninstalling this module (`/upm uninstall UltiTools-Chat`) now really removes its commands
  (`/uchat`, and `/ch`/`/channel` when channels are enabled) and stops its chat, join/quit, channel and
  auto-reply listeners from firing. Previously this
  module's empty unload method replaced the framework's, so after `/upm uninstall` its commands and
  listeners stayed active until the server restarted (UltiKits/UltiChat#23).


### v1.0.0 (2026-02-13)

Added: Auto-reply system with contains/exact/regex matching modes, multi-line responses, and console command triggers
Added: Custom chat formatting with PlaceholderAPI variable support and color codes
Added: Join/quit message customization including join messages, quit messages, welcome text, welcome titles, and first-join broadcasts
Added: Scheduled broadcast system supporting chat messages, boss bar, and title display modes
Added: @mention feature with highlight formatting and sound notifications
Added: Chat channel system with global/local/custom channels, range limits, and cross-world control
Added: Anti-spam with message cooldown, duplicate detection, uppercase limits, and automatic muting
Added: Custom emoji shortcodes replaced with Unicode characters
