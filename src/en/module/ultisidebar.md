# UltiSideBar - Customizable Sidebar Scoreboard

UltiSideBar is a sidebar plugin module for UltiTools-API that displays a customizable dynamic information panel on the right side of the player's screen.

## Feature Overview

UltiSideBar provides a fully configurable scoreboard sidebar. You can customize the title and every line of content, with support for Minecraft color codes and PlaceholderAPI placeholders for real-time dynamic data. The sidebar refreshes automatically at your configured interval, displaying live information such as online player count, player balance, server time, and more.

Each player can independently toggle their sidebar on or off, and their preference is automatically saved to the database so it persists across sessions. You can also blacklist specific worlds (such as minigame worlds) where the sidebar will automatically hide and reappear when the player leaves.

Configuration changes can be applied instantly with `/sidebar reload` -- no server restart required.

## Installation

### Prerequisites

- **UltiTools-API** 6.2.0 or higher
- **PlaceholderAPI** (optional but strongly recommended; placeholders will not work without it)

### Method 1: Install via UPM

Run this command in the server console or in-game:

```
/upm install UltiSideBar
```

### Method 2: Manual Installation

1. Download the `UltiSideBar.jar` file
2. Place the JAR file in the `plugins/UltiTools/plugins/` directory
3. Restart the server
4. Edit the configuration file at `plugins/UltiTools/UltiSideBar/config/sidebar.yml`
5. Run `/sidebar reload` to apply changes

## Quick Start

After installation, the sidebar appears automatically for all online players using the default configuration. To customize it, open `plugins/UltiTools/UltiSideBar/config/sidebar.yml` and modify the title and content lines:

```yaml
# Enable the sidebar
enabled: true

# Sidebar title (supports color codes and PlaceholderAPI placeholders)
title: "&6&lMy Server"

# Refresh interval (unit: ticks, 20 ticks = 1 second)
update-interval: 20

# Sidebar content lines (supports PlaceholderAPI placeholders)
lines:
  - "&7Welcome, &f%player_name%"
  - ""
  - "&eOnline: &f%server_online%/%server_max_players%"
  - "&eWorld: &f%world_name%"
  - ""
  - "&eBalance: &f%vault_eco_balance_formatted%"
  - "&ePing: &f%player_ping%ms"
  - ""
  - "&7Server Time"
  - "&f%server_time_hh:mm:ss%"
  - ""
  - "&6play.example.com"

# Worlds where the sidebar is disabled
world-blacklist:
  - "world_event"

# Whether the sidebar is enabled by default for new players
default-enabled: true
```

Save the file and run `/sidebar reload`. All online players' sidebars will update immediately.

## Commands

| Command | Description | Permission | Executor | Example |
|---------|-------------|------------|----------|---------|
| `/sidebar` | Show help information | `ultisidebar.toggle` | Player / Console | `/sidebar` |
| `/sidebar toggle` | Toggle sidebar display | `ultisidebar.toggle` | Player only | `/sidebar toggle` |
| `/sidebar on` | Enable sidebar | `ultisidebar.toggle` | Player only | `/sidebar on` |
| `/sidebar off` | Disable sidebar | `ultisidebar.toggle` | Player only | `/sidebar off` |
| `/sidebar reload` | Reload configuration | `ultisidebar.admin` | Player / Console | `/sidebar reload` |

Command alias: `/sb` (e.g., `/sb toggle` is equivalent to `/sidebar toggle`)

### Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultisidebar.toggle` | Allows the player to toggle their own sidebar | All players |
| `ultisidebar.admin` | Allows reloading the configuration | OP |

## Configuration

Configuration file location: `plugins/UltiTools/UltiSideBar/config/sidebar.yml`

```yaml
# Whether the sidebar feature is enabled
# Set to false to completely disable the sidebar for all players
enabled: true

# Sidebar title
# Supports & color codes and PlaceholderAPI placeholders
# Length limit: 1-32 characters
title: "&6&lMy Server"

# Content refresh interval (unit: ticks, 20 ticks = 1 second)
# Range: 1-1200 (minimum 0.05 seconds, maximum 60 seconds)
# Recommended: 20 (refresh once per second)
# Increase this value to reduce performance overhead if content does not need frequent updates
update-interval: 20

# Sidebar content lines
# Each line supports & color codes and PlaceholderAPI placeholders
# An empty string "" creates a blank line
# Line limit: 1-15 lines
lines:
  - "&7Welcome, &f%player_name%"
  - ""
  - "&eOnline: &f%server_online%/%server_max_players%"
  - "&eWorld: &f%world_name%"
  - ""
  - "&eBalance: &f%vault_eco_balance_formatted%"
  - "&ePing: &f%player_ping%ms"
  - ""
  - "&7Server Time"
  - "&f%server_time_hh:mm:ss%"
  - ""
  - "&6play.example.com"

# Worlds where the sidebar is disabled
# When a player enters a blacklisted world, the sidebar automatically hides
# When they leave, it automatically reappears
world-blacklist:
  - "world_event"

# Whether the sidebar is enabled by default for new players
# true: new players see the sidebar automatically
# false: new players must run /sidebar on to see it
default-enabled: true
```

### Color Code Reference

Use `&` followed by a color character to set colors:

| Code | Color | Code | Color | Code | Style |
|------|-------|------|-------|------|-------|
| `&0` | Black | `&8` | Dark Gray | `&l` | Bold |
| `&1` | Dark Blue | `&9` | Blue | `&m` | Strikethrough |
| `&2` | Dark Green | `&a` | Green | `&n` | Underline |
| `&3` | Dark Aqua | `&b` | Aqua | `&o` | Italic |
| `&4` | Dark Red | `&c` | Red | `&r` | Reset |
| `&5` | Purple | `&d` | Pink | | |
| `&6` | Gold | `&e` | Yellow | | |
| `&7` | Gray | `&f` | White | | |

### Common PlaceholderAPI Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%player_name%` | Player name |
| `%player_ping%` | Player latency (ms) |
| `%player_health%` | Player health |
| `%player_food_level%` | Player hunger level |
| `%server_online%` | Online player count |
| `%server_max_players%` | Maximum player count |
| `%server_tps%` | Server TPS |
| `%world_name%` | Current world name |
| `%vault_eco_balance%` | Player balance |
| `%vault_eco_balance_formatted%` | Formatted balance (with currency symbol) |
| `%server_time_hh:mm:ss%` | Server time |

For more placeholders, see the [PlaceholderAPI Wiki](https://github.com/PlaceholderAPI/PlaceholderAPI/wiki/Placeholders). You need to install PlaceholderAPI and the corresponding expansion (ecloud) before using placeholders.

## Usage Tutorials

### Scenario 1: Setting Up a Clean Information Bar

If you want a simple sidebar showing the server name, online count, and server IP:

```yaml
enabled: true
title: "&b&lStar Survival"
update-interval: 40
lines:
  - "&fWelcome to Star Survival!"
  - ""
  - "&eOnline: &a%server_online% &7/ &f%server_max_players%"
  - ""
  - "&dplay.starsurv.com"
default-enabled: true
world-blacklist: []
```

`update-interval: 40` means refresh every 2 seconds -- no need to refresh more often for simple content.

### Scenario 2: Hiding the Sidebar in Minigame Worlds

If your server has minigame worlds (such as `minigames`, `bedwars`) that have their own scoreboards, UltiSideBar will conflict with them. Add these worlds to the blacklist:

```yaml
world-blacklist:
  - "minigames"
  - "bedwars"
  - "world_event"
```

When players return to normal worlds, the sidebar automatically reappears.

### Scenario 3: Letting Players Toggle the Sidebar

Some players prefer not to have the sidebar on screen. Players can run `/sidebar off` at any time to disable it, and the setting persists across sessions. To re-enable it, they can run `/sidebar on`.

If you want new players to start without the sidebar (opt-in instead of opt-out), set `default-enabled` to `false`:

```yaml
default-enabled: false
```

### Scenario 4: Displaying Multiple Economy Stats

If your server has Vault and an economy plugin installed, you can display detailed financial information:

```yaml
lines:
  - "&6&lEconomy"
  - "&eBalance: &f%vault_eco_balance_formatted%"
  - "&ePoints: &f%playerpoints_points%"
  - ""
  - "&6&lPlayer Info"
  - "&ePing: &f%player_ping%ms"
  - "&ePlay Time: &f%statistic_hours_played%h"
```

Note: `%playerpoints_points%` requires the PlayerPoints plugin and its corresponding PAPI expansion.

## FAQ

### 1. What if the plugin doesn't work after installation?

Check the following:
- Is your UltiTools-API version >= 6.2.0?
- Is the JAR file placed in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)?
- Did you restart the server? (First installation requires a restart; `/ultitools reload` may not be sufficient.)
- Check the server console for error messages.

### 2. Config changes not taking effect?

After saving the configuration file, you must run `/sidebar reload` for changes to apply. Also ensure the YAML format is correct -- indentation must use spaces, not tabs.

### 3. How to set up permissions?

UltiSideBar uses two permission nodes:
- `ultisidebar.toggle` -- controls whether a player can use `/sidebar toggle/on/off`. All players have this by default.
- `ultisidebar.admin` -- controls who can run `/sidebar reload`. OP only by default.

Use a permissions plugin like LuckPerms to manage these. For example, to grant toggle access to a VIP group:
```
/lp group vip permission set ultisidebar.toggle true
```

### 4. PlaceholderAPI placeholders show raw text (not replaced)?

- Confirm PlaceholderAPI is installed
- Confirm the corresponding expansion is installed. For example, `%vault_eco_balance%` requires running `/papi ecloud download Vault` then `/papi reload`
- If the placeholder comes from a third-party plugin (e.g., PlayerPoints), you need that plugin's PAPI expansion installed
- If the console shows "PlaceholderAPI not found! Variables will not work.", PAPI is not installed or failed to load

### 5. The sidebar conflicts with another plugin's scoreboard?

Minecraft allows only one sidebar scoreboard per player at a time. If another plugin (such as a minigame plugin) also sets a sidebar, they will overwrite each other. Solutions:
- Add conflicting worlds to `world-blacklist`
- Have players manually run `/sidebar off` in those worlds

### 6. The sidebar is causing lag?

- Increase the `update-interval` value, e.g., `40` (2-second refresh) or `100` (5-second refresh)
- Reduce the number of `lines`
- Avoid computationally expensive PlaceholderAPI placeholders

## Data Storage

Player sidebar toggle preferences are automatically saved to the data source configured in UltiTools (JSON / SQLite / MySQL). No additional configuration is needed.

- Table name: `sidebar_preferences`
- Fields: `player_uuid` (player UUID), `enabled` (boolean)

## Changelog

### v1.0.0 (2026-02-13)

Initial release.

Added:
- Customizable sidebar title and multi-line content with color code support
- PlaceholderAPI placeholder support for real-time dynamic data
- Persistent player preferences (toggle state saved to database)
- Content caching for performance optimization (scoreboard only updated when content changes)
- World blacklist to automatically hide the sidebar in specific worlds
- Configurable refresh interval (1-1200 ticks)
- `/sidebar toggle/on/off` for player self-service control
- `/sidebar reload` for hot configuration reloading
- Automatic sidebar management on player join, quit, and world change events
- Bilingual support (Chinese and English)
