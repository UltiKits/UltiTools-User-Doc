# UltiSocial - Friend System

UltiSocial is a friend system plugin module for UltiTools-API that provides comprehensive friend management, private messaging, teleportation, and blacklist functionality.

## Feature Overview

UltiSocial adds a full social system to your server. Players can send friend requests to each other, and once they become friends, they can see each other's online status, teleport to each other, send private messages, and block players they do not want to interact with.

Friendships are bidirectional: when player A adds player B, B will also see A in their friend list. Friend requests have a configurable timeout and expire automatically. If both players send requests to each other simultaneously, the system auto-matches and establishes the friendship immediately.

The plugin provides attractive GUI interfaces for managing the friend list and blacklist, with pagination support. The friend list displays online status, current world, game mode, and more. A favorites feature lets players pin frequently contacted friends to the top of the list.

The blacklist is bidirectional: once you block someone, neither party can send friend requests to the other. Blocking automatically removes any existing friendship.

All data (friendships, blacklist) is automatically persisted through UltiTools-API's data layer to JSON, SQLite, or MySQL with no additional configuration.

## Installation

### Prerequisites

- **UltiTools-API** 6.3.0 or higher

### Method 1: Install via UPM

Run this command in the server console or in-game:

```
/upm install UltiSocial
```

### Method 2: Manual Installation

1. Download the `UltiSocial-2.0.0.jar` file
2. Place the JAR file in the `plugins/UltiTools/plugins/` directory
3. Restart the server
4. Edit the configuration file at `plugins/UltiTools/pluginConfig/UltiSocial/config/social.yml`

## Upgrading to 2.0.0

Back up configuration and friendship data, install UltiTools-API 6.3.0 or later, replace `UltiSocial-2.0.0.jar` and restart fully. Catalogue identity `ultisocial` is used by framework update checks and `/upm update`; framework reload/uninstall uses `UltiSocial`. The former page's v1.1.0 was not an actual release of this module and is no longer listed as release history; the new formal version is 2.0.0. `/ul reload` cannot load a new JAR.

The real file is `plugins/UltiTools/pluginConfig/UltiSocial/config/social.yml`, not social_config.yml or Java field names. `tp_to_friend.cooldown` defaults to 30 seconds. Delete never-effective `notifications.friend_join_world`, `messages.player_blocked` and `messages.player_unblocked` to silence per-key startup/reload warnings. There is no friend-entering-your-world notification or replacement setting; leaving the key changes no visible behavior.

### Language, GUI and failed favorites

While still matching built-in/old shipped text in any language, `gui_title` and the ten active `messages.*` settings follow server language on startup or `/ul reload UltiSocial` and are saved. Edited values stay yours; change at least one character to keep a built-in phrase from following language. This uses JAR text: edit social.yml, not extracted language files. Block/unblock replies instead use the module lang file: copy `lang/en.yml` to `lang/en-myserver.yml` beside it, edit player_blocked/player_unblocked, select `language: en-myserver` in framework `plugins/UltiTools/config.yml` and run a full `/ul reload`. Official files are restored at startup/module reload, preserving edits as `.bak`. Missing custom keys fall back to the official prefix language; without a prefix they fall back to English with a warning. Private message words remain exactly as typed.

The requests button is slot 47 (zero-based), not the center page-number book. Clicking it closes the menu next tick and shows `/friend requests` in chat. Teleport, private-message hints, removing friends and the block-list Back button also defer view changes and subsequent work to next tick. Teleport re-checks cooldown then, preventing repeated teleports from rapid clicks. Nicknames display existing data only: this module has no nickname-setting command or menu.

A favorite write failing in storage or finding a friendship row removed by another server logs `Failed to update friend data` but can still say `Favorite status updated!`. The cache is dropped afterward; refresh reads actual stored rows. Do not treat that chat line as persistence proof. Blocking a friend now also replies `(Friend relationship has been automatically removed)` for online and offline players alike.

### Reload and permissions

`/ul reload UltiSocial` now actually re-reads configuration and refreshes language; `tp_to_friend.enabled` applies to the next command without restarting. `/upm uninstall UltiSocial` unregisters friend/friends/f and notification/GUI listeners. Only the framework's module-reload log remains, not the module's former unload/reload lines. The actual command permission is only `ultisocial.use`, undeclared in plugin.yml and OP-only by default: explicitly grant it to ordinary players with the LuckPerms example below, not the README's stale separate friend/tp/msg nodes.

## Quick Start

After installation, players can immediately use the friend system in-game. Here is a typical workflow:

1. Player A wants to befriend Player B, so they run `/friend add B`
2. Player B receives a notification and runs `/friend accept A` to accept
3. Both become friends and can see each other's online status
4. Player A wants to teleport to B: `/friend tp B`
5. Player A wants to send a private message to B: `/friend msg B Hello!`
6. Running `/friend` opens the friend list GUI for point-and-click management

## Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/friend` | Open friend list GUI | `/friend` |
| `/friend list` | List all friends in chat (with online status and favorite markers) | `/friend list` |
| `/friend add <player>` | Send a friend request to an online player | `/friend add Steve` |
| `/friend accept <player>` | Accept a friend request from a player | `/friend accept Steve` |
| `/friend deny <player>` | Deny a friend request from a player | `/friend deny Steve` |
| `/friend remove <player>` | Remove a friend (bidirectional) | `/friend remove Steve` |
| `/friend requests` | View all pending friend requests | `/friend requests` |
| `/friend tp <friend>` | Teleport to an online friend | `/friend tp Steve` |
| `/friend msg <friend> <message>` | Send a private message to an online friend | `/friend msg Steve Hello!` |
| `/friend block <player>` | Add a player to your blacklist | `/friend block Griefer` |
| `/friend unblock <player>` | Remove a player from your blacklist | `/friend unblock Griefer` |
| `/friend blocklist` | Open the blacklist management GUI | `/friend blocklist` |
| `/friend help` | Show help information | `/friend help` |

All commands are player-only (cannot be used from console).

Command aliases: `/friends`, `/f` (e.g., `/f add Steve` is equivalent to `/friend add Steve`)

### Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultisocial.use` | Access to all friend system features | OP (grant explicitly to players) |

All subcommands (add, remove, tp, msg, block, etc.) share the single permission node `ultisocial.use`.

## Configuration

Configuration file location: `plugins/UltiTools/pluginConfig/UltiSocial/config/social.yml`

```yaml
# Maximum number of friends per player
# Range: 1-500
max_friends: 50

# Friend request timeout in seconds
# Requests that are not handled within this time expire automatically
# Range: 10-3600
request_timeout: 60

# Notification settings
notifications:
  # Notify you when a friend comes online
  friend_online: true

  # Notify you when a friend goes offline
  friend_offline: true

# Friend teleportation settings
tp_to_friend:
  # Whether friend teleportation is enabled
  enabled: true

  # Teleport cooldown in seconds
  # Range: 0-3600 (0 means no cooldown)
  cooldown: 30

# Friend list GUI title
# {COUNT} = current friend count, {MAX} = maximum friend count
# Supports & color codes
gui_title: "&6Friend List &7({COUNT}/{MAX})"

# Message templates
# {PLAYER} is replaced with the relevant player's name
# Supports & color codes
messages:
  # Message both players receive when becoming friends
  friend_added: "&aYou and {PLAYER} are now friends!"

  # Message you receive when removing a friend
  friend_removed: "&cYou have removed {PLAYER} from your friends"

  # Friend online notification
  friend_online: "&aYour friend {PLAYER} is now online!"

  # Friend offline notification
  friend_offline: "&7Your friend {PLAYER} has gone offline"

  # Friend request sent confirmation
  request_sent: "&aFriend request sent to {PLAYER}!"

  # Friend request received notification
  request_received: "&e{PLAYER} wants to be your friend! Type /friend accept {PLAYER} to accept"

  # Friend request denied
  request_denied: "&cYou denied {PLAYER}'s friend request"

  # Maximum friends limit reached
  max_friends_reached: "&cYou have reached the maximum number of friends!"

  # Already friends
  already_friends: "&cYou are already friends with {PLAYER}!"

  # Blacklist blocking message (bidirectional)
  blocked: "&cCannot perform friend operations with {PLAYER} due to blacklist"

```


### Configuration reference

| Key | Type | Default (this language) | Constraint |
|---|---|---|---|
| `max_friends` | number | `50` | 1–500 |
| `request_timeout` | number | `60` | 10–3600 s |
| `notifications.friend_online` | bool | `true` | on / off |
| `notifications.friend_offline` | bool | `true` | on / off |
| `tp_to_friend.enabled` | bool | `true` | on / off |
| `tp_to_friend.cooldown` | number | `30` | 0–3600 s |
| `gui_title` | text | `"&6Friend List &7({COUNT}/{MAX})"` | nonempty |
| `messages.friend_added` | text | `"&aYou and {PLAYER} are now friends!"` | nonempty |
| `messages.friend_removed` | text | `"&cYou have removed {PLAYER} from your friends"` | nonempty |
| `messages.friend_online` | text | `"&aYour friend {PLAYER} is now online!"` | nonempty |
| `messages.friend_offline` | text | `"&7Your friend {PLAYER} has gone offline"` | nonempty |
| `messages.request_sent` | text | `"&aFriend request sent to {PLAYER}!"` | nonempty |
| `messages.request_received` | text | `"&e{PLAYER} wants to be your friend! Type /friend accept {PLAYER} to accept"` | nonempty |
| `messages.request_denied` | text | `"&cYou denied {PLAYER}'s friend request"` | nonempty |
| `messages.max_friends_reached` | text | `"&cYou have reached the maximum number of friends!"` | nonempty |
| `messages.already_friends` | text | `"&cYou are already friends with {PLAYER}!"` | nonempty |
| `messages.blocked` | text | `"&cCannot perform friend operations with {PLAYER} due to blacklist"` | nonempty |

## GUI Interface Guide

### Friend List GUI

Open with `/friend`. A 54-slot interface with 45 friend slots on top and a 9-slot navigation bar at the bottom.

Each friend is displayed as a player head item:
- Green name = online, gray name = offline
- Gold star prefix = favorited friend
- If a nickname is set, it displays as "Nickname (RealName)"
- Online friends also show their current world and game mode

Mouse actions:
- **Left-click** (online friend): Teleport to the friend
- **Right-click** (online friend): Prompt to use the private message command
- **Right-click** (offline friend): Remove friend
- **Shift + Left-click**: Toggle favorite status
- **Shift + Right-click**: Remove friend

Navigation bar:
- Bottom-left arrow: Previous page
- Bottom-right arrow: Next page
- Book in slot 47: pending request count; click to close next tick and show chat; center slot 49 shows the page number

### Blacklist Management GUI

Open with `/friend blocklist`. Displays all blocked players.

Each blocked player is shown as a player head with a red X marker:
- Shows the date/time they were blocked
- Shows the block reason if one was provided

Mouse actions:
- **Left-click**: Unblock the player

The navigation bar includes a "Back to Friend List" button to switch to the friend list interface.

## Usage Tutorials

### Scenario 1: Complete Friend Request Workflow

Suppose you want to become friends with a player named Alex:

1. Make sure Alex is online, then run `/friend add Alex`
2. Alex receives a message saying you want to be friends
3. Alex can run `/friend accept YourName` to accept, or `/friend deny YourName` to decline
4. If Alex does not respond within 60 seconds (default timeout), the request expires automatically
5. Once accepted, both players receive a "You and XX are now friends!" message

Tip: If you send a request to Alex and Alex also sends one to you at the same time, the system auto-matches and establishes the friendship immediately.

### Scenario 2: Friend Teleportation

When you want to meet up with a friend:

1. Run `/friend tp Alex`
2. If teleportation is enabled and Alex is online, you are teleported directly to Alex's location
3. After teleporting, a cooldown starts (default 30 seconds) during which you cannot teleport again
4. You can also left-click an online friend's head in the friend list GUI to teleport

If the admin has disabled teleportation (`tp_to_friend.enabled: false`), you will see a "Teleport to friend feature is disabled!" message.

### Scenario 3: Private Messaging

Friends can send private messages that only the recipient can see:

1. Run `/friend msg Alex Want to go mining tonight?`
2. Alex sees a purple `[PM]` prefixed message
3. You also see a confirmation of what you sent
4. Only friends can message each other; non-friends cannot send private messages

### Scenario 4: Managing the Blacklist

If someone is bothering you, you can block them:

1. Run `/friend block Griefer` (works for both online and offline players)
2. If Griefer was your friend, the friendship is automatically removed
3. After blocking, Griefer cannot send you friend requests and you cannot send requests to Griefer (bidirectional block)
4. Run `/friend blocklist` to open the blacklist GUI for viewing and management
5. To unblock, run `/friend unblock Griefer`

### Scenario 5: Favoriting Friends

If you frequently play with certain friends, you can favorite them so they appear at the top of your friend list:

1. Run `/friend` to open the friend list GUI
2. Hold Shift and left-click the friend's head you want to favorite
3. A gold star appears before their name
4. Shift + left-click again to remove the favorite

## FAQ

### 1. What if the plugin doesn't work after installation?

Check the following:
- Is your UltiTools-API version >= 6.3.0?
- Is the JAR file placed in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)?
- Did you restart the server? (First installation requires a restart.)
- Check the server console for error messages.

### 2. Config changes not taking effect?

After saving the configuration file, you need to run `/ul reload UltiSocial` or restart the server to reload the configuration. Make sure the YAML format is correct -- indentation must use spaces, not tabs.

### 3. How to set up permissions?

UltiSocial uses a single unified permission node `ultisocial.use` for all features. The node is undeclared and OP-only by default; grant it explicitly. If you want to restrict certain players from using the friend system, manage it through a permissions plugin like LuckPerms:

```
/lp group default permission set ultisocial.use true
/lp user Griefer permission set ultisocial.use false
```

### 4. Friend request was sent but the other player didn't receive it?

- Confirm the target player is online (they must be online when you run `/friend add`)
- Confirm there is no blacklist relationship between you (either party blocking the other prevents requests)
- Confirm you haven't already sent a request to the same player (only one pending request per target)
- Requests have a timeout (default 60 seconds) and expire automatically

### 5. Cannot teleport to a friend?

Check the following:
- Is `tp_to_friend.enabled` set to `true` in the configuration?
- Is the target friend online? (Cannot teleport to offline friends.)
- Are you within the cooldown period? (Default 30 seconds; the command will show remaining time.)
- Is the target actually on your friend list?

### 6. Nothing happens when clicking in the friend list GUI?

- Make sure you are using the correct mouse action (left-click to teleport, right-click for message/remove, Shift+left-click to favorite, Shift+right-click to remove)
- Teleportation requires the friend to be online
- If teleportation is disabled by the admin, left-clicking an online friend will not trigger a teleport

### 7. I blocked someone but they can still message me in chat?

The blacklist only blocks friend requests and friend operations. It does not block public messages in server chat. If you need to fully mute someone's chat messages, use a chat management plugin (such as UltiChat).

## Data Storage

All data is automatically saved through UltiTools-API's data layer, supporting JSON, SQLite, and MySQL (depending on the UltiTools global configuration).

Database tables:
- **friendships** -- Friend relationship table. Fields: `player_uuid`, `friend_uuid`, `friend_name`, `created_time`, `nickname`, `favorite`
- **blacklist** -- Blacklist table. Fields: `player_uuid`, `blocked_uuid`, `blocked_name`, `created_time`, `reason`

Friend requests are not persisted -- they are stored in memory and cleared on server restart. Expired requests are automatically cleaned up by a scheduled task every 60 seconds.

## Changelog

### v2.0.0

#### Added

- A warning for a setting this version no longer reads. If `notifications.friend_join_world` (removed,
  see `### Removed`) is still in your `config/social.yml`, which it will be on any server that has run
  an earlier version, the module logs one warning when it is enabled and on every reload of it
  (`/ul reload` or `/ul reload UltiSocial`), naming the module, the file and the key and saying that
  nothing replaces it. Deleting the key from the file silences the warning; leaving it there changes
  nothing else (UltiKits/UltiSocial#15).

#### Changed

- This version requires UltiTools 6.3.0 or later and declares `api-version: 630` in `plugin.yml`,
  up from `620` in the last release, 1.0.0. A framework older than 6.3.0 refuses it at
  load with a warning containing `UltiSocial load failed` and `UltiTools version is outdated`, and the
  module's own start-up does not run; depending on the framework version, an error stack trace may be
  logged before that warning (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultisocial`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- Message and title settings in `config/social.yml` — the friend-list title (`gui_title`) and
  the ten messages (`messages.friend_added`, `friend_removed`, `friend_online`, `friend_offline`,
  `request_sent`, `request_received`, `request_denied`, `max_friends_reached`, `already_friends`,
  `blocked`) — are written in the server's language when the module starts, and the file is what the
  module shows (for example `messages.friend_added` holds `&aYou and {PLAYER} are now friends!` under
  `language: en`); previously they were fixed Chinese text, so `language: en` had no effect on them
  (UltiKits/UltiSocial#14). A setting that is still built-in text — in any language, or a default an
  earlier version shipped — follows `language`: it is rewritten when the module starts or after
  `/ul reload`. A setting you edited is kept. To keep a built-in text but stop it following
  `language`, change at least one character. The text written is this module's built-in text: edit
  these settings in `config/social.yml`; an edit of the extracted language file does not change them
  (earlier versions never read them from the language file either).

#### Fixed

- Toggling a friend's favorite star (shift+left-click in `/friend`) for a friendship whose stored row is
  gone, for example because another server sharing the same database removed it, is now logged as
  `Failed to update friend data` on every storage type. Before, the write did nothing and nothing was
  logged, except on JSON storage, where it failed with a raw error. The same applies to
  `FriendService#setNickname`, which no command or menu of this module calls. A write that fails in the
  storage layer is now logged by the module with its cause and the click carries on (the menu refreshes and
  says `Favorite status updated!`), where before the failure aborted the click with an error in the
  console. The cached friend list is dropped in both cases, so the next view reads the stored rows
  (UltiKits/UltiSocial#29).

- The pending-requests button in the friend list (`/friend`, slot 47) now closes the menu and runs
  `/friend requests` on the next server tick instead of inside the click event, where Paper forbids
  changing the player's view and where the framework now runs a command at the moment it is dispatched.
  What the player sees is unchanged: the menu closes and the list of requests appears in chat
  (UltiKits/UltiSocial#27). The same holds for every other click in the friend list that closes it
  (teleport to a friend, the private-message hint, removing a friend) and for the block list's Back button,
  which closes the block list and opens the friend list: the close or open, and what follows it, now happen
  on the next tick in one task instead of inside the click event, and the teleport cooldown is checked again when
  that task runs, so two clicks in one tick still teleport once (UltiKits/UltiSocial#30).

- The warning about a key this version no longer reads now prints the configuration file's path exactly
  as it is. A path containing `{KEY}` or `{REASON}` was rewritten by the placeholders filled after it.

- The README's configuration example now names the real file, `config/social.yml`, with its real keys
  (`max_friends`, `request_timeout`, `notifications.*`, `tp_to_friend.*`, `gui_title`, `messages.*`)
  and defaults (`tp_to_friend.cooldown` is 30). It named `config/social_config.yml` and Java field
  names that nothing reads (UltiKits/UltiSocial#22).

- Blocking a friend with `/friend block <player>` now also says that the friendship was removed
  ("(Friend relationship has been automatically removed)"), for an online or an offline player. The
  command asked whether the two were friends only after the block had already removed the friendship,
  so the line never sent (UltiKits/UltiSocial#17).

- `language: en` now applies to everything this module shows or logs: every `/friend` reply and the
  help, both GUIs (titles, lore, game-mode names, click tips, buttons), the replies to GUI clicks, the
  command description, and the console lines. Most of this was fixed Chinese text in every language,
  although the language files already held English text for it that no code read; the console lines
  were fixed English text and now follow `language: zh` too (UltiKits/UltiSocial#14). A private
  message's own words are shown exactly as typed. The enable line now reads
  `UltiSocial has been enabled!`; it used to name a version, v1.1.0, that this module never had.

- Reloading this module (`/ul reload UltiSocial`, or `/ul reload` for every module) now re-reads
  `config/social.yml` and refreshes the language files, so an edited value such as
  `tp_to_friend.enabled` applies to the next command without a restart. The framework's reload
  already performed both steps, but this module's reload method replaced it and only logged a line,
  so neither step ran and the reload reported success without reloading anything. UltiTools 6.3.0
  also runs its `@ConditionalOnConfig` drift check at this point (this module has no conditional
  beans, so it reports nothing) and logs its own per-module reload line (UltiKits/UltiSocial#13).

- After `/upm uninstall UltiSocial`, the module's `/friend` command (with its `/friends` and `/f`
  aliases) is now really removed and its listeners (friend online/offline notifications and the
  friend-list and block-list GUI clicks) stop firing; this module has no unload work of its own.
  Previously both stayed active until the server restarted (UltiKits/UltiSocial#13).

#### Removed

- `messages.player_blocked` and `messages.player_unblocked` never took effect and have been removed;
  they can be deleted from existing `config/social.yml` files. Nothing ever read them: `/friend block`
  and `/friend unblock` replied with fixed text, and now reply from the language file (`lang/en.yml`,
  `lang/zh.yml`); to customise them, copy the official language file to one whose name starts with its
  language code and a hyphen (for example `lang/en-myserver.yml`), edit the replies there and set
  `language: en-myserver` in `plugins/UltiTools/config.yml` (an edit made in the official file itself is
  restored at the next start or module reload, UltiKits/UltiTools-Reborn#616). A file that still holds either key gets
  the same warning as `notifications.friend_join_world`, at start-up and on every reload of the
  module (UltiKits/UltiSocial#23).

- The module's own console lines `UltiSocial has been disabled!` (on unload) and
  `UltiSocial configuration reloaded!` (on `/ul reload UltiSocial` or `/ul reload`). Both were
  English literals, not language keys; the never-consulted `social_disabled` language key, which
  described the unload line, is removed from both language files. UltiTools 6.3.0 logs one reload
  line per module (`Module 'UltiSocial' reloaded.`) (UltiKits/UltiSocial#13).

- The `notifications.friend_join_world` setting in `config/social.yml` (default `false`, described
  as "Notify when friend joins your world"). It never had any effect in any version: nothing read
  it, and this module has no notification for a friend entering your world at all, so switching it
  on or off never changed anything a player saw. The notification is recorded as a feature request,
  UltiKits/UltiSocial#21 — removing the setting does not reject the feature. A server upgraded from
  an earlier version keeps the key in its `social.yml`, because the framework never deletes a key
  from an operator's file; the key can simply be deleted, and leaving it there changes nothing
  players see (UltiKits/UltiSocial#15).


### v1.0.0 (2026-02-13)

Initial release.

Added:
- Friend request system (send, accept, deny, with automatic timeout expiration)
- Friend list GUI with pagination and online/offline status display
- Friend favorites feature
- Friend online/offline notifications
- Bilingual support (Chinese and English)
