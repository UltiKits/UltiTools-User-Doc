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

1. Download the `UltiBackup.jar` file
2. Place the JAR file into the `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file is automatically generated at `plugins/UltiTools/UltiBackup/config/backup.yml`.

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

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibackup.use` | Basic backup features (open GUI, list, restore) | All players |
| `ultibackup.create` | Create manual backups | All players |
| `ultibackup.delete` | Delete backups (right-click in GUI) | All players |
| `ultibackup.auto` | Receive automatic backups (death/quit/timed) | All players |

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibackup.admin` | Admin access (view/create backups for others, batch backup) | OP |

## Configuration

Configuration file path: `plugins/UltiTools/UltiBackup/config/backup.yml`

```yaml
# Automatic backup settings
auto_backup:
  enabled: true        # Enable automatic backups
  interval: 30         # Auto backup interval (unit: minutes, range: 1-1440)
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

## Usage Tutorials

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
1. Make sure UltiTools-API is version 6.2.0 or higher
2. Confirm the JAR file is placed in `plugins/UltiTools/plugins/`, not the `plugins/` root directory
3. A server restart is required after installation; `/ul reload` only reloads configuration, it cannot load new module JARs
4. Check the server console for any error messages

**Q: Config changes not taking effect?**

A: After modifying `plugins/UltiTools/UltiBackup/config/backup.yml`, run `/ul reload` to reload the configuration. Make sure you have not broken the YAML indentation format.

**Q: How to set up permissions?**

A: All UltiBackup permissions start with `ultibackup.`. We recommend using a permissions plugin like LuckPerms to manage them. The basic permissions (`ultibackup.use`, `ultibackup.create`, `ultibackup.delete`, `ultibackup.auto`) are available to all players by default. The admin permission `ultibackup.admin` is only available to OPs by default.

Example (LuckPerms):
```
/lp group default permission set ultibackup.use true
/lp group admin permission set ultibackup.admin true
```

**Q: Where are backup files stored? How do I manually back up the data?**

A: Backup files (YAML format) are stored in the `plugins/UltiTools/backups/` directory. Metadata is stored in the database. To manually back up the entire system, you need to back up both the `backups/` directory and the database file.

**Q: Will automatic backups affect server performance?**

A: The impact is minimal. Manual backups (`/backup create`) and batch backups (`/backup saveall`) run asynchronously and will not block the main thread. Death and quit backups run synchronously in the event callback, but item serialization is very fast.

**Q: Why does checksum verification fail for some backups?**

A: The backup file (YAML file in the `backups/` directory) was manually edited or corrupted. Each backup file header contains a SHA-256 checksum, and any modification will cause verification to fail. If you are confident the contents are fine, you can use the `force` parameter or confirm force restore through the GUI confirmation page.

**Q: What happens when the backup limit is reached?**

A: When a player's backup count exceeds the `max_backups_per_player` setting (default 10), the system automatically deletes the oldest backups. Both the database metadata and the on-disk YAML file are cleaned up.

## Changelog

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
