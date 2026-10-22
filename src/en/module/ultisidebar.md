# UltiSideBar - Customizable Sidebar Scoreboard

UltiSideBar is a sidebar plugin module for UltiTools-API that displays a customizable dynamic information panel on the right side of the player's screen.

## Feature Overview

UltiSideBar provides a fully configurable scoreboard sidebar. You can customize the title and every line of content, with support for Minecraft color codes and PlaceholderAPI placeholders for real-time dynamic data. The sidebar refreshes automatically at your configured interval, displaying live information such as online player count, player balance, server time, and more.

Each player can independently toggle their sidebar on or off, and their preference is automatically saved to the database so it persists across sessions. You can also blacklist specific worlds (such as minigame worlds) where the sidebar will automatically hide and reappear when the player leaves.

Configuration changes can be applied instantly with `/sidebar reload` -- no server restart required.

## Installation

### Prerequisites

- **UltiTools-API** 6.3.0 or higher
- **PlaceholderAPI** (optional but strongly recommended; placeholders will not work without it)

### Method 1: Install via UPM

Run this command in the server console or in-game:

```
/upm install UltiSideBar
```

### Method 2: Manual Installation

1. Download the `UltiSideBar-2.0.0.jar` file
2. Place the JAR file in the `plugins/UltiTools/plugins/` directory
3. Restart the server
4. Edit the configuration file at `plugins/UltiTools/pluginConfig/UltiSideBar/config/sidebar.yml`
5. Run `/sidebar reload` to apply changes

## Upgrading to 2.0.0

Back up configuration and preference data, install UltiTools-API 6.3.0 or later, replace `UltiSideBar-2.0.0.jar` and restart fully. Catalogue identity `ultisidebar` is used for update checks and `/upm update`; reload/uninstall uses `UltiSideBar`. The configuration root includes pluginConfig, as shown below.

A title or complete line list still matching any built-in/old shipped language text follows language on startup or `/ul reload`, and is saved. Edited titles/lists stay yours, with one exception: complete old default lines `&e世界: &f%world_name%` and `&f%server_time_hh:mm:ss%` migrate to player_world and server_time_HH:mm:ss even inside edited lists, saving the result; other lines stay unchanged. Change at least one character to keep a built-in text without following language. This uses JAR text, not edits in extracted language files: edit sidebar.yml for title/content. The six generated comments also follow language on startup/bare `/ul reload`; your own comments remain.

### Refused configuration, scoreboard sharing and preferences

`lines: []`, `~` or a non-list value uses the 12 shipped lines in the server's language, with one framework warning and the file unchanged, no extra module-unsaved report. More than 15 lines refuses module load, naming the count and [1, 15], without truncation or rewriting: reduce to 15 or fewer and restart. Use enabled: false to switch off, not an empty list. Deleting title/lines then reloading under English or another non-Chinese language may still produce extra unsaved-change warnings/stop reports: restart instead of repeatedly reloading to insert missing keys; no content is lost.

This sidebar yields to another plugin's private scoreboard until the player returns to the main scoreboard. A vanilla sidebar on the main scoreboard is still replaced. on/toggle explain an occupied slot while saving the choice; off never removes another plugin's sidebar. If UltiEssentials' sidebar is also enabled, startup logs a notice: disable one or use a world blacklist. Other plugins must not write objectives/teams onto this module's dedicated board; those unsupported writes may be overwritten.

Main-scoreboard teams and name prefixes are mirrored and refreshed; a line matching a team member's name keeps its own look. If another plugin unregisters the objective, takes its display slot or clears scores, the next refresh rebuilds/redraws this sidebar. Only this module's old lines are cleared, not scores on other objectives. Two lines differing only after character 40 can both appear, but this does not promise unlimited text: each displayed entry is at most 40 characters, with invisible disambiguation when needed.

`default-enabled` applies only without a stored player choice. A player who enabled the sidebar keeps it through reload even with default-enabled: false. `/sidebar reload` and `/ul reload UltiSideBar` both reload configuration once through the framework, refresh language and rebuild sidebars. New JARs still need a restart. `/upm uninstall UltiSideBar` shuts down this module's sidebars before unregistering commands/listeners.

## Quick Start

After installation, the sidebar appears automatically for all online players using the default configuration. To customize it, open `plugins/UltiTools/pluginConfig/UltiSideBar/config/sidebar.yml` and modify the title and content lines:

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
  - "&eWorld: &f%player_world%"
  - ""
  - "&eBalance: &f%vault_eco_balance_formatted%"
  - "&ePing: &f%player_ping%ms"
  - ""
  - "&7Server Time"
  - "&f%server_time_HH:mm:ss%"
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
| `ultisidebar.toggle` | Allows the player to toggle their own sidebar | OP (grant to players) |
| `ultisidebar.admin` | Allows reloading the configuration | OP |

## Configuration

Configuration file location: `plugins/UltiTools/pluginConfig/UltiSideBar/config/sidebar.yml`

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
  - "&eWorld: &f%player_world%"
  - ""
  - "&eBalance: &f%vault_eco_balance_formatted%"
  - "&ePing: &f%player_ping%ms"
  - ""
  - "&7Server Time"
  - "&f%server_time_HH:mm:ss%"
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
| `%player_world%` | Current world name |
| `%vault_eco_balance%` | Player balance |
| `%vault_eco_balance_formatted%` | Formatted balance (with currency symbol) |
| `%server_time_HH:mm:ss%` | Server time |

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

If your server has minigame worlds (such as `minigames`, `bedwars`) that have their own scoreboards, this sidebar yields to their private boards. To avoid showing it there altogether, blacklist those worlds:

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
- Is your UltiTools-API version >= 6.3.0?
- Is the JAR file placed in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)?
- Did you restart the server? (First installation requires a restart; `/ul reload` cannot load new JARs.)
- Check the server console for error messages.

### 2. Config changes not taking effect?

After saving the configuration file, you must run `/sidebar reload` for changes to apply. Also ensure the YAML format is correct -- indentation must use spaces, not tabs.

### 3. How to set up permissions?

UltiSideBar uses two permission nodes:
- `ultisidebar.toggle` -- controls whether a player can use `/sidebar toggle/on/off`. The node is undeclared and OP-only by default; grant it explicitly to players.
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

Minecraft allows only one sidebar scoreboard per player at a time. If another plugin (such as a minigame plugin) also sets a sidebar, a private scoreboard keeps priority, while a main-board sidebar is still replaced by this module. Options:
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

### v2.0.0

#### Changed

- This version requires UltiTools-API 6.3.0 or later and raises `api-version` in `plugin.yml` from
  `620` in the last release, 1.0.0, to `630`. Older frameworks refuse to load this module before its
  start-up logic runs. Restart the server to load a new module JAR; `/ul reload` does not load it
  (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultisidebar`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- `lines: []` (or `lines: ~`) in `config/sidebar.yml`, and a `lines` value that is not a list (`''`, a word, a map), now runs the
  shipped 12 lines. The setting is declared `@NotEmpty`, and on UltiTools 6.3.0 the framework treats such a value as unusable: the
  sidebar runs on the shipped lines and the framework logs one WARNING naming `lines`, the value as written and that default.
  The file is left exactly as you wrote it. Earlier versions (UltiTools 6.2.x, UltiSideBar 1.0.0) reset `[]` to the default
  with a warning and, for `~`, wrote the default into the file. The sidebar shows the shipped lines in the server's language,
  like any built-in text, and the module adds no second WARNING ("the module's changes to 'lines' were not written") at
  start or `/ul reload`, and no report of unsaved changes when the server stops (UltiKits/UltiSideBar#36).

- A `lines` list of more than 15 entries now refuses the module at load, naming the field, the count and the bounds
  (`field 'lines' size 16 is out of bounds [1, 15]`), and the file is left as written. Earlier versions (UltiTools 6.2.x)
  reset an over-long list to the default with a warning (UltiKits/UltiSideBar#31).

- The sidebar's title and lines settings in `config/sidebar.yml` are written in the server's
  language when the module starts, and the file is what the sidebar shows (`title: '&6&lMy Server'`
  and English lines under `language: en`). A setting that is still built-in text — in any language,
  or a default an earlier version shipped — follows `language`: it is rewritten when the module starts
  or after `/ul reload`. An edited title and custom lines are kept, with one exception: even in an
  edited `lines` list, entries matching the complete old default `&e世界: &f%world_name%` or
  `&f%server_time_hh:mm:ss%` are still migrated to `&e世界: &f%player_world%` or
  `&f%server_time_HH:mm:ss%`, respectively, and the result is saved. Other lines are left unchanged
  by this migration. To keep a built-in text but stop it following
  `language`, change at least one character (UltiKits/UltiSideBar#24). The text written is this module's built-in text: edit these settings in `config/sidebar.yml`; an edit of
  the extracted language file does not change them (earlier versions never read them from the
  language file either).

- The console warnings for a missing PlaceholderAPI and for a `sidebar.yml` that cannot be saved now
  follow the `language` setting.

#### Fixed

- The comments above the keys of `config/sidebar.yml` now come from the module's language files: a
  server set to `language: en` writes English comments on a fresh install (earlier versions wrote
  Chinese-only comments in every language). The comments the framework wrote on these six keys, the Chinese
  ones earlier versions wrote included, switch to the server's language at the next start, and after you
  change `language` and run a bare `/ul reload`; values are untouched, and a comment you wrote yourself is kept as
  you wrote it (UltiKits/UltiTools-Reborn#611) (UltiKits/UltiSideBar#32).

- The sidebar now recovers when another plugin changes the scoreboard it shows: if another plugin
  unregisters the sidebar's objective, clears or takes its display slot, or resets its scores, the next
  refresh registers the objective again, puts it back in the slot and draws every line again. When the
  lines change, only the lines this module wrote earlier are reset; before, every entry of the board was
  reset on every objective, which also erased another plugin's below-name, player-list or sidebar scores
  on the same board (UltiKits/UltiSideBar#30).

- Two sidebar lines that differ only after their 40th character now both show; previously the second
  one replaced the first (UltiKits/UltiSideBar#17).

- The sidebar now yields to another plugin's private scoreboard (such as UltiEssentials' scoreboard):
  that board stays on screen, and this sidebar appears once the player returns to the main scoreboard.
  A sidebar on the main scoreboard (including one set with vanilla commands) is still replaced, as in
  earlier versions. `/sidebar on`
  and `/sidebar toggle` now say when another scoreboard keeps the slot (the choice is still saved), and
  `/sidebar off` no longer removes another plugin's sidebar. When UltiEssentials' sidebar is also
  enabled, one console line says so after start-up (UltiKits/UltiSideBar#26).

- Name prefixes and other main-scoreboard teams (UltiEssentials name prefixes, vanilla `/team` teams,
  other plugins' teams) now show while the sidebar is on. The sidebar's own scoreboard now carries the
  server's main-scoreboard teams and follows their changes on every refresh; previously every player
  with the sidebar on saw no team prefix on anybody. A sidebar line that reads exactly like a team
  member's name keeps its own look rather than taking that team's prefix (UltiKits/UltiSideBar#27).

- With `default-enabled: false`, reloading (`/sidebar reload`, `/ul reload UltiSideBar`) now keeps the
  sidebar of an online player who turned it on themselves; previously the reload removed it and did not
  bring it back. `default-enabled` now applies only to a player with no stored choice
  (UltiKits/UltiSideBar#20).

- Reloading this module (`/ul reload UltiSideBar` or `/sidebar reload`) now also refreshes its
  language catalogue, which the module's own reload override skipped; configuration is still
  reloaded exactly once, now by the framework instead of by the module. Unloading it with
  `/upm uninstall UltiSideBar` still runs the module's own sidebar shutdown first; afterwards the
  module's commands are now really removed and its listeners stop firing, where previously both
  stayed active until the server restarted (UltiKits/UltiSideBar#16).


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
