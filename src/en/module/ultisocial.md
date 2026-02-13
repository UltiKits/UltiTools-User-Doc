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

- **UltiTools-API** 6.2.0 or higher

### Method 1: Install via UPM

Run this command in the server console or in-game:

```
/upm install UltiSocial
```

### Method 2: Manual Installation

1. Download the `UltiSocial.jar` file
2. Place the JAR file in the `plugins/UltiTools/plugins/` directory
3. Restart the server
4. Edit the configuration file at `plugins/UltiTools/UltiSocial/config/social.yml`

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
| `ultisocial.use` | Access to all friend system features | All players |

All subcommands (add, remove, tp, msg, block, etc.) share the single permission node `ultisocial.use`.

## Configuration

Configuration file location: `plugins/UltiTools/UltiSocial/config/social.yml`

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

  # Notify you when a friend enters the world you are in
  friend_join_world: false

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

  # Player blocked successfully
  player_blocked: "&cYou have blocked {PLAYER}"

  # Player unblocked
  player_unblocked: "&aYou have unblocked {PLAYER}"
```

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
- Center book: Shows pending friend request count if any; click to view

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
- Is your UltiTools-API version >= 6.2.0?
- Is the JAR file placed in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)?
- Did you restart the server? (First installation requires a restart.)
- Check the server console for error messages.

### 2. Config changes not taking effect?

After saving the configuration file, you need to run `/ultitools reload` or restart the server to reload the configuration. Make sure the YAML format is correct -- indentation must use spaces, not tabs.

### 3. How to set up permissions?

UltiSocial uses a single unified permission node `ultisocial.use` for all features. All players have this permission by default. If you want to restrict certain players from using the friend system, manage it through a permissions plugin like LuckPerms:

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

### v1.1.0 (2026-02-13)

Added:
- Blacklist system: bidirectional blocking, dedicated GUI management interface, automatic friendship removal on block
- Friend teleportation with configurable cooldown
- Friend private messaging (restricted to friends only)
- Game mode display for online friends in the friend list
- Configuration validation: `max_friends` (1-500), `request_timeout` (10-3600), `tp_cooldown` (0-3600)
- Scheduled task for automatic cleanup of expired friend requests

Improved:
- Database queries upgraded to UltiTools-API v6.2.0 Query DSL
- Scheduled tasks use declarative `@Scheduled` annotation
- Command system refactored with full tab-completion support

### v1.0.0 (2026-02-13)

Initial release.

Added:
- Friend request system (send, accept, deny, with automatic timeout expiration)
- Friend list GUI with pagination and online/offline status display
- Friend favorites feature
- Friend online/offline notifications
- Bilingual support (Chinese and English)
