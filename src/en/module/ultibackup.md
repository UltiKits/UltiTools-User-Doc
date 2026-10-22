# UltiBackup - Inventory Backup

UltiBackup is a UltiTools framework module that provides full player inventory backup and restore functionality for Minecraft servers. It automatically creates inventory snapshots when players die, quit, or at regular intervals, covering the main inventory, armor slots, offhand, ender chest, and experience levels. Each backup includes a SHA-256 checksum to ensure data integrity. If checksum verification fails during restoration, a confirmation page is shown allowing you to force restore. All operations can be done through a GUI interface or commands, with paginated browsing, backup previewing, and admin tools for managing other players' backups.

## Installation

There are two ways to install:

**Option 1: Via UltiTools Plugin Manager**

Run in the server console or in-game:

```
/upm install UltiBackup
```

**Option 2: Manual Installation**

1. Install UltiTools-API 6.3.0 or later first, then download `UltiBackup-2.0.0.jar`
2. Place the JAR file into the `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file is automatically generated at `plugins/UltiTools/pluginConfig/UltiBackup/config/backup.yml`.

## Quick Start

No extra configuration is needed after installation. The default settings enable automatic backups right away:

1. Backups are created automatically when a player dies
2. Backups are created automatically when a player quits
3. All online players are backed up every 30 minutes

Players simply type `/backup` to open the GUI management interface and view all their backups.

Try it out:

```
/backup create     # Manually create a backup
/backup list       # View your recent backups
/backup            # Open the GUI management interface
```

In the GUI:
- Left-click a backup to restore it
- Shift+Left-click to preview backup contents (without restoring)
- Right-click to delete a backup

## Commands

All commands are player-only and cannot be used from the console.

Command aliases: `/backup`, `/invbackup`, `/bk`

### Player Commands

| Command | Description | Example | Permission | Cooldown |
|---------|-------------|---------|------------|----------|
| `/backup` | Open the backup management GUI | `/backup` | `ultibackup.use` | None |
| `/backup list` | List your 5 most recent backups | `/backup list` | `ultibackup.use` | None |
| `/backup create` | Create a manual backup | `/backup create` | `ultibackup.create` | 30 seconds |
| `/backup restore <number>` | Restore a backup by number | `/backup restore 1` | `ultibackup.use` | 30 seconds |
| `/backup restore <number> force` | Force restore (skip checksum verification) | `/backup restore 2 force` | `ultibackup.use` | 30 seconds |
| `/backup help` | Show help message | `/backup help` | `ultibackup.use` | None |

### Admin Commands

| Command | Description | Example | Permission | Cooldown |
|---------|-------------|---------|------------|----------|
| `/backup saveall` | Back up all online players | `/backup saveall` | `ultibackup.admin` | 60 seconds |
| `/backup admin <player>` | Open a player's backup GUI | `/backup admin Steve` | `ultibackup.admin` | None |
| `/backup admin create <player>` | Create a backup for a player | `/backup admin create Steve` | `ultibackup.admin` | 30 seconds |

## Permissions

### Player Permissions

These permission nodes have no declared default grant and are operators-only by default; grant them explicitly to players. For the basic features below, grant `ultibackup.use`, `ultibackup.create`, `ultibackup.delete`, `ultibackup.auto` as needed. For example, with LuckPerms:

```text
/lp group default permission set ultibackup.use true
/lp group default permission set ultibackup.create true
/lp group default permission set ultibackup.delete true
/lp group default permission set ultibackup.auto true
```

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibackup.use` | Basic backup features (open GUI, list, restore) | OP (grant explicitly to players) |
| `ultibackup.create` | Create manual backups | OP (grant explicitly to players) |
| `ultibackup.delete` | Delete backups (right-click in GUI) | OP (grant explicitly to players) |
| `ultibackup.auto` | Receive automatic backups (death/quit/timed) | OP (grant explicitly to players) |

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibackup.admin` | Admin access (view/create backups for others, batch backup) | OP |

## Configuration

Configuration file path: `plugins/UltiTools/pluginConfig/UltiBackup/config/backup.yml`

```yaml
# Automatic backup settings
auto_backup:
  enabled: true        # Enable automatic backups
  interval_seconds: 1800  # Seconds between backups (1-107374182); also the first delay
  interval: 30            # Deprecated minutes key, no scheduling effect; still requires 1-1440
  on_death: true       # Backup inventory when a player dies
  on_quit: true        # Backup inventory when a player quits

# Maximum number of backups to keep per player (range: 1-1000)
# Oldest backups are automatically deleted when the limit is exceeded
max_backups_per_player: 10

# Backup content settings
backup_armor: true       # Include armor (helmet, chestplate, leggings, boots, offhand)
backup_enderchest: true  # Include ender chest contents
backup_exp: true         # Include experience level and progress
```

When upgrading an existing file, set `auto_backup.interval_seconds` in that file; do not replace your settings with this complete example. The old `interval` is not converted. A non-default value warns at load and reload, and it is still validated against 1-1440: an invalid value refuses loading or fails the module reload. The new seconds value applies at `/ul reload`; the first scheduled backup waits one interval after startup. Invalid seconds refuse startup; reload keeps the running interval and reports partial completion.

| Setting | Type | Default | Meaning |
|---|---|---|---|
| `auto_backup.enabled` | Boolean | `true` | Enable timed backups |
| `auto_backup.interval_seconds` | Integer | `1800` | Seconds, 1-107374182 |
| `auto_backup.interval` | Integer | `30` | Deprecated, still validates 1-1440 |
| `auto_backup.on_death` / `auto_backup.on_quit` | Boolean | `true` | Death / quit backups |
| `max_backups_per_player` | Integer | `10` | Retained count, 1-1000 |
| `backup_armor` / `backup_enderchest` / `backup_exp` | Boolean | `true` | Armor and offhand / ender chest / experience |

## Usage Tutorials

### Before restoring or deleting

`force` skips only the checksum, not data parsing. Corrupt or unreadable item parts refuse restoration and leave the inventory unchanged. With `backup_armor: false`, or a backup that saved no armor, current armor and offhand are not overwritten. New backups that saved no experience leave current experience unchanged and show it as not backed up in preview; older backups still restore the experience they actually carry. Deletion removes the database row before the file. If the console reports a file-delete failure, inspect that file rather than assuming the row remains. A newly saved backup remains valid if pruning old backups fails; the failure is logged.

### Scenario 1: Restoring Inventory After Death

You fall into lava while exploring and lose everything. Fortunately, UltiBackup automatically created a backup when you died.

1. After respawning, type `/backup` to open the GUI
2. Find the most recent backup labeled as a "Death Backup"
3. Left-click on it to restore your items to their pre-death state

If you want to check what is in the backup first, Shift+Left-click to enter preview mode. The preview has three tabs: Inventory, Armor, and Ender Chest.

### Scenario 2: Admin Restoring a Player's Items

A player reports that their items are missing, and an admin needs to help restore them.

1. The admin types `/backup admin PlayerName` to open the player's backup GUI
2. Browse the backup list and find a suitable point in time
3. Shift+Left-click to preview and confirm the contents look correct
4. Left-click to restore

Note: The target player will receive a notification that "Admin XXX has restored your inventory backup."

### Scenario 3: Checksum Verification Failure

If you see a red warning "Backup file checksum verification failed!" during restoration, it means the backup file may have been manually edited or corrupted.

- You can use the command `/backup restore <number> force` to force restore
- When operating through the GUI, a confirmation page will appear warning you of the risks and asking you to confirm
- Force restoration may result in item data anomalies, so use it carefully

### Scenario 4: Batch Backup All Online Players

Before a major server update, an admin wants to back up everyone's inventory:

```
/backup saveall
```

This creates a backup for every online player who has the `ultibackup.auto` permission.

### Scenario 5: Viewing Backup List via Command

If you prefer not to open the GUI, you can quickly check with a command:

```
/backup list
```

Example output:
```
=== Your Backups ===
1. 2026-02-13 14:30:22 Manual Backup
2. 2026-02-13 14:00:00 Auto Backup
3. 2026-02-13 13:45:10 Death Backup
... and 2 more backups
```

Then use `/backup restore 3` to restore the 3rd backup.

## Backup Storage Details

UltiBackup uses a hot/cold data separation storage approach:

- **Metadata** (backup time, reason, location, checksum, etc.) is stored in the database, determined by UltiTools-API's storage backend (SQLite/MySQL/JSON)
- **Backup contents** (item data) are stored as YAML files at `plugins/UltiTools/backups/{playerUUID}_{timestamp}.yml`

Each backup file starts with a SHA-256 checksum used to verify the file has not been tampered with. The file header includes the following warning:

```
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# DO NOT MODIFY THIS FILE!
# Any modification will cause checksum verification failure
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
```

Backup reason types:

| Reason | Trigger |
|--------|---------|
| MANUAL | Player manually runs `/backup create` |
| AUTO | Timed automatic backup (every 30 minutes by default) |
| DEATH | Triggered automatically when a player dies |
| QUIT | Triggered automatically when a player quits |
| ADMIN | Triggered by admin via `/backup admin create` |

## FAQ

**Q: What if the plugin doesn't work after installation?**

A: Check the following:
1. Make sure UltiTools-API is version 6.3.0 or higher
2. Confirm the JAR file is placed in `plugins/UltiTools/plugins/`, not the `plugins/` root directory
3. A server restart is required after installation; `/ul reload` only reloads configuration, it cannot load new module JARs
4. Check the server console for any error messages

**Q: Config changes not taking effect?**

A: After modifying `plugins/UltiTools/pluginConfig/UltiBackup/config/backup.yml`, run `/ul reload` to reload the configuration. Make sure you have not broken the YAML indentation format.

**Q: How to set up permissions?**

A: All UltiBackup permissions start with `ultibackup.`. We recommend using a permissions plugin like LuckPerms to manage them. The basic permissions (`ultibackup.use`, `ultibackup.create`, `ultibackup.delete`, `ultibackup.auto`) are operators-only by default; grant them explicitly to players. The admin permission `ultibackup.admin` is only available to OPs by default.

Example (LuckPerms):
```
/lp group default permission set ultibackup.use true
/lp group admin permission set ultibackup.admin true
```

**Q: Where are backup files stored? How do I manually back up the data?**

A: Backup files (YAML format) are stored in the `plugins/UltiTools/backups/` directory. Metadata is stored in the database. To manually back up the entire system, you need to back up both the `backups/` directory and the database file.

**Q: Will automatic backups affect server performance?**

A: `/backup create`, `/backup saveall` and `/backup admin create <player>` read items and experience on the main thread when the command runs, then write files and database rows in the background; the whole command is not asynchronous. Death, quit and scheduled backups still run synchronously. Monitor server timings with many players or slow storage rather than assuming there is no impact.

**Q: Why does checksum verification fail for some backups?**

A: The backup file (YAML file in the `backups/` directory) was manually edited or corrupted. Each backup file header contains a SHA-256 checksum, and any modification will cause verification to fail. If you are confident the contents are fine, you can use the `force` parameter or confirm force restore through the GUI confirmation page.

**Q: What happens when the backup limit is reached?**

A: When a player's backup count exceeds the `max_backups_per_player` setting (default 10), the system automatically deletes the oldest backups. Both the database metadata and the on-disk YAML file are cleaned up.

## Changelog

### v2.0.0

#### Changed

- Require the released UltiTools-API 6.3.0 dependency. This is an independent MAJOR upgrade from
  the served 1.0.0 line: the module's UltiTools API level rises from 620 to 630, so operators must
  upgrade the framework before replacing the module JAR. The catalogue identity remains `ultibackup`.

- Automatic backups now follow a new key, `auto_backup.interval_seconds` in `config/backup.yml`, in seconds
  (default 1800, the same 30 minutes as before; 1 to 107374182). The interval is scheduled by UltiTools 6.3.0's
  config-bound scheduling: a changed value applies at `/ul reload` without moving the next backup earlier or later
  than the new interval allows, and an out-of-range value is refused, keeping the running interval, with the reload
  reported as partial. The first automatic backup still comes one interval after the module starts. The old minutes
  key `auto_backup.interval` no longer takes effect; it is never rewritten or converted, because a value of `30`
  read as seconds would have meant a backup every 30 seconds. If it holds anything other than its default 30, the
  module logs one warning at load and after each `/ul reload`, in the server's language, naming
  `auto_backup.interval_seconds`. The old key is still checked against 1-1440, so a value outside that range
  still refuses the module (see the README's known limitations). A server's
  existing file gains the new key with its default at the first start; nothing it already holds is changed.

- This version requires UltiTools 6.3.0 or later and declares `api-version: 630` in `plugin.yml` (the released 1.0.0 declared `620`).
  The config-bound scheduling above exists only from UltiTools 6.3.0: an older framework would ignore it and run
  the automatic backup once at load instead of on the interval, so an older framework now refuses to load the
  module and logs a warning instead. The README's framework minimum now says UltiTools 6.3.0+
  (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultibackup`, the key of this module's entry in the UltiCloud
  catalogue. The framework's update check and `/upm update` skip a module that does not declare it, so this module
  now takes part in both: a later published version carrying the same key is reported at startup and can be
  installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

#### Fixed

- Deleting a backup now removes its database row first and its content file after it, so a failed database
  delete no longer leaves a row pointing at a missing file. Deleting a backup whose row is already gone (for
  example two admins deleting the same backup from open menus) now answers `Backup not found!` instead of
  `Backup deleted!`. If the file cannot be deleted after its row is gone, the console names the file.
  A database failure while saving a new backup now removes the backup file that was just written, once a lookup
  confirms no row was stored, and tells the player the backup failed, instead of leaving an orphan file and no
  reply; if the row was stored after all, or the lookup cannot tell, the file is kept and the console says so. A failure while pruning old backups
  after a new one was saved is logged and no longer reports the saved backup as failed (UltiKits/UltiBackup#29).

- A backup taken with `backup_exp: false` no longer resets the player's experience to level 0 when it is
  restored after `backup_exp` was turned on. Such a backup now holds no experience at all, and restoring
  it leaves experience as it is; its preview shows the level as not backed up. Backup files written by
  earlier versions still load, and still restore the experience they carry (UltiKits/UltiBackup#27).

- The automatic-backup interval in `config/backup.yml` now takes effect. Before, automatic backups ran every
  30 minutes whatever the file said: `auto_backup.interval` was read by nothing. The interval is now set by
  `auto_backup.interval_seconds` (see "Changed" above), and the first automatic backup comes one interval after
  the module starts; it used to run as the module started (UltiKits/UltiBackup#24).

- `/backup create`, `/backup saveall` and `/backup admin create <player>` now read the player's
  inventory, armor, off-hand, ender chest and experience on the server's main thread, at the moment the
  command runs; only writing the file and the database row happens in the background. The whole
  command used to run in the background, so a backup could capture an inventory while it was changing
  (UltiKits/UltiBackup#13).

- Restoring a backup whose items cannot be read no longer empties the player's inventory and reports
  success; the restore is refused and the inventory is left as it was. A backup file that is not
  valid YAML, that has no inventory section, that is cut off before its end, or whose entries are not
  what this module writes (a part that is not text, armor without the off-hand entry or the reverse,
  an experience value that is missing or not a number), is refused as a load
  failure, and a part holding a slot outside the inventory it is restored to cannot be read. When experience is
  restored, a negative level or a progress outside 0-1 is refused the same way, before anything changes (its
  part is named `expLevel` or `expProgress`). The console names the
  backup, the player and the part that could not be read, and the backup preview logs an unreadable
  part the same way (UltiKits/UltiBackup#21).

- Restoring a backup no longer destroys the armor and off-hand item the player is wearing when there
  is no armor to put back: with `backup_armor: false`, or with a backup taken while it was `false`,
  the restore replaces only the inventory's storage slots (UltiKits/UltiBackup#25).

- Reloading this module (`/ul reload` or `/ul reload UltiBackup`) now re-reads `config/backup.yml` and refreshes the
  language files, so an edited value such as `max_backups_per_player` applies to the next backup
  without a restart. Previously this module's reload method replaced the framework's and only logged
  a line, so neither step ran and the reload reported success without reloading anything.
  UltiTools 6.3.0 also runs its `@ConditionalOnConfig` drift check at this point (this module has no
  conditional beans, so it reports nothing) and logs its own per-module reload line
  (UltiKits/UltiBackup#14).

- After `/upm uninstall UltiBackup`, this module's commands are now really removed and its listeners
  stop firing. Previously this module's unload method replaced the framework's and only logged a
  line, so both stayed active until the server restarted (UltiKits/UltiBackup#14).

- `/backup list`, the backup browser's item lore and the backup preview's info panel now label each
  backup's reason with the language file's text in the server's `language` (`Death Backup`,
  `Quit Backup`, `Auto Backup`, `Manual Backup`, `Admin Backup`, or `Unknown` for a missing or
  unrecognised value). Previously all three showed the stored constant (`DEATH`, `QUIT`, `AUTO`,
  `MANUAL`, `ADMIN`, or `UNKNOWN`) whatever the language, and the six `backup.reason.*` language
  keys were never used (UltiKits/UltiBackup#15).

- Nine of this module's console lines now come from the language files and follow the framework's
  `language` setting: the enable line, backup created, backup creation failed, a backup's checksum
  that could not be read, a backup's content that could not be loaded, restore done, restore failed,
  the automatic-backup summary, and the force-restore warning. Previously they were English whatever
  `language` said; the English wording is unchanged.

#### Removed

- The module's own console lines `UltiBackup has been disabled!` (on unload) and
  `UltiBackup configuration reloaded!` (on `/ul reload` or `/ul reload UltiBackup`). Both were English literals, not
  language keys, so no language file changes. UltiTools 6.3.0 logs one reload line per module
  (`Module 'UltiBackup' reloaded.`) (UltiKits/UltiBackup#14).


### v1.0.0 (2026-02-13)

Initial release.

Added:
- Added: Full inventory backup covering main inventory, armor, offhand, ender chest, and experience
- Added: Automatic backup on death, quit, and timed intervals
- Added: GUI management interface with pagination, restore, and delete
- Added: Backup preview with three tabs (Inventory/Armor/Ender Chest) in read-only mode
- Added: SHA-256 data integrity verification to detect file tampering
- Added: Force restore option when checksum verification fails
- Added: Admin commands to view/create backups for other players
- Added: Batch backup for all online players
- Added: Command cooldowns to prevent abuse
- Added: Automatic cleanup of old backups when exceeding the per-player limit
- Added: Chinese and English language support
