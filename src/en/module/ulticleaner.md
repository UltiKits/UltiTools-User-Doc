# UltiCleaner - High-Performance Server Cleanup Module

Automatically cleans up ground items, mob entities, and idle chunks with smart cleanup, TPS-adaptive thresholds, and batch processing to minimize lag during cleanup operations.

## Feature Overview

UltiCleaner provides comprehensive automatic cleanup capabilities for Minecraft servers. It periodically cleans up dropped items and configured entity types, broadcasting countdown warnings to all online players before each cleanup cycle. The cleanup process uses batch processing -- removing only a fixed number of entities per tick -- to avoid lag spikes from mass entity removal. The smart cleanup mode automatically triggers additional cleanup when item or mob counts exceed configured thresholds. TPS-adaptive functionality dynamically lowers these thresholds when server performance drops, making cleanup more aggressive during lag. The chunk unload feature frees memory by unloading chunks that are far from all players. Every cleanup operation fires custom Bukkit events that other plugins can listen to and cancel.

## Installation

There are two ways to install:

**Method 1: Install via UPM**

```
/upm install UltiCleaner
```

**Method 2: Manual installation**

1. Download `UltiCleaner.jar`
2. Place the JAR file in your server's `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file will be auto-generated at `plugins/UltiTools/UltiCleaner/config/cleaner.yml`.

## Quick Start

After installation, UltiCleaner enables item cleanup (every 5 minutes) and entity cleanup (every 10 minutes) by default. You can immediately use these commands for manual cleanup:

```
/clean items     # Immediately clean ground items
/clean check     # View current server entity counts
/clean status    # View next cleanup countdown
```

To enable smart cleanup (automatic cleanup when entity counts are too high), edit the config:

```yaml
smart:
  enabled: true          # Change to true
  item-threshold: 2000   # Trigger when items exceed 2000
  mob-threshold: 1000    # Trigger when mobs exceed 1000
  cooldown: 60           # At least 60 seconds between smart cleanups
```

Save and run `/ul reload` to apply.

## Commands

All commands use the aliases `/clean`, `/cleaner`, `/clear`. The permission node for all commands is `ulticleaner.clean`. Both players and console can execute them.

| Command | Description | Example |
|---------|-------------|---------|
| `/clean items` | Immediately clean ground items in all worlds | `/clean items` |
| `/clean entities` | Immediately clean configured entity types in all worlds | `/clean entities` |
| `/clean all` | Clean both items and entities | `/clean all` |
| `/clean chunks` | Unload idle chunks far from players (must be enabled in config) | `/clean chunks` |
| `/clean check` | Show server entity stats: ground item count, cleanable mob count, total entities, loaded chunks, unloadable chunks, current TPS | `/clean check` |
| `/clean status` | Show cleanup status: next item/entity cleanup countdown, whether cleaning is in progress, TPS status | `/clean status` |

## Configuration

Config file path: `plugins/UltiTools/UltiCleaner/config/cleaner.yml`

```yaml
# ============ Item Cleanup ============
item:
  enabled: true                              # Enable item cleanup
  interval: 300                              # Cleanup interval (seconds, range: 10-3600)
  warn-times:                                # Warning time points before cleanup (seconds)
    - 60
    - 30
    - 10
    - 5
    - 3
    - 2
    - 1
  whitelist:                                 # Item whitelist - these items will not be cleaned (Material names)
    - DIAMOND
    - EMERALD
    - NETHER_STAR
    - BEACON
    - ELYTRA
  ignore-named: true                         # Ignore items with custom display names (anvil-renamed items)
  ignore-recent: 30                          # Ignore recently dropped items (seconds, range: 0-300, 0 to disable)

# ============ Entity Cleanup ============
entity:
  enabled: true                              # Enable entity cleanup
  interval: 600                              # Cleanup interval (seconds, range: 10-7200)
  warn-times:                                # Warning time points before entity cleanup (seconds)
    - 60
    - 30
    - 10
    - 5
    - 3
    - 2
    - 1
  types:                                     # Entity types to clean (EntityType names)
    - ZOMBIE
    - SKELETON
    - CREEPER
    - SPIDER
    - CAVE_SPIDER
    - ENDERMAN
    - WITCH
    - SLIME
    - PHANTOM
  whitelist-named: true                      # Don't clean entities with custom names (name-tagged entities)
  whitelist-leashed: true                    # Don't clean leashed entities
  whitelist-tamed: true                      # Don't clean tamed entities (e.g. tamed wolves/cats)

# ============ World Settings ============
worlds:
  blacklist:                                 # Worlds excluded from cleanup (world names)
    - world_creative

# ============ Smart Cleanup ============
smart:
  enabled: false                             # Enable smart cleanup (auto-trigger based on entity count thresholds)
  item-threshold: 2000                       # Item count threshold (range: 100-10000, triggers cleanup when exceeded)
  mob-threshold: 1000                        # Mob count threshold (range: 100-5000, triggers cleanup when exceeded)
  cooldown: 60                               # Smart cleanup cooldown (seconds, range: 30-600)

# ============ Batch Processing ============
batch:
  size: 50                                   # Entities removed per tick (range: 10-500)
  show-progress: false                       # Show cleanup progress to OPs

# ============ TPS Adaptive ============
tps:
  adaptive-enabled: true                     # Enable TPS-adaptive threshold adjustment
  sample-window: "1m"                        # TPS sample window (options: 1m / 5m / 15m)
  low-threshold: 18.0                        # Low TPS threshold (range: 10-20, reduces cleanup thresholds when below)
  critical-threshold: 15.0                   # Critical TPS threshold (range: 5-18)
  low-reduction: 30                          # Threshold reduction percentage when TPS is low (range: 0-80)
  critical-reduction: 50                     # Threshold reduction percentage when TPS is critical (range: 0-90)

# ============ Chunk Unload ============
chunk:
  enabled: false                             # Enable chunk unloading (unloads chunks far from players to free memory)
  max-distance: 20                           # Maximum chunk distance (range: 5-50, in chunk units, chunks beyond this are unloaded)
  batch-size: 5                              # Chunks unloaded per tick (range: 1-20)
  timeout: 5                                 # Async unload timeout (seconds, range: 1-30)

# ============ Messages ============
messages:
  prefix: "&a[Cleaner]"                     # Message prefix
  warn: "&c[Cleaner] &fGround items will be cleaned in &e{TIME} &fseconds!"
  entity-warn: "&c[Cleaner] &fEntities will be cleaned in &e{TIME} &fseconds!"
  item-cleaned: "&a[Cleaner] &fCleaned &e{COUNT} &fground items!"
  entity-cleaned: "&a[Cleaner] &fCleaned &e{COUNT} &fentities!"
  smart-triggered: "&e[Cleaner] &fDetected too many entities, initiating smart cleanup..."
  clean-progress: "&7[Cleaner] &fCleaning progress: &e{CURRENT}&f/&e{TOTAL}"
  clean-cancelled: "&c[Cleaner] &fCleanup operation was cancelled by another plugin!"
```

### Message Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{TIME}` | Seconds remaining in cleanup countdown |
| `{COUNT}` | Number of items/entities cleaned |
| `{CURRENT}` | Current number cleaned so far |
| `{TOTAL}` | Total number to be cleaned |

## Usage Tutorials

### Scenario 1: Small Survival Server (10-20 players)

Small servers don't need aggressive cleanup. The defaults work well, but you may want to increase the item cleanup interval to avoid cleaning up players' items too quickly:

```yaml
item:
  interval: 600        # Clean every 10 minutes
  ignore-recent: 60    # Ignore items dropped in the last minute
smart:
  enabled: false       # Disable smart cleanup
chunk:
  enabled: false       # Disable chunk unloading
```

### Scenario 2: Medium Server (around 50 players)

Medium servers benefit from smart cleanup and a larger batch size:

```yaml
item:
  interval: 300        # Clean every 5 minutes
smart:
  enabled: true
  item-threshold: 1500
  mob-threshold: 800
batch:
  size: 100            # Remove 100 per tick for faster cleanup
```

### Scenario 3: Large Server (100+ players)

Large servers need aggressive cleanup with all features enabled:

```yaml
item:
  interval: 180        # Clean every 3 minutes
smart:
  enabled: true
  item-threshold: 1000
  mob-threshold: 500
  cooldown: 30         # Shorter cooldown between smart cleanups
tps:
  adaptive-enabled: true
  low-threshold: 19.0  # More sensitive TPS detection
chunk:
  enabled: true
  max-distance: 15     # More aggressive chunk unloading
batch:
  size: 200
  show-progress: true  # Show progress to OPs for monitoring
```

### Scenario 4: Protecting Specific Items

If your server uses diamond blocks as landmarks or has custom items that shouldn't be cleaned:

```yaml
item:
  whitelist:
    - DIAMOND
    - EMERALD
    - NETHER_STAR
    - BEACON
    - ELYTRA
    - DIAMOND_BLOCK      # Add diamond blocks
    - TOTEM_OF_UNDYING   # Add totems
  ignore-named: true     # Protect all named items
```

### Scenario 5: Excluding Creative Worlds

If your server has a creative mode world that should not be cleaned:

```yaml
worlds:
  blacklist:
    - world_creative
    - creative_world
    - build_world
```

### Scenario 6: How TPS-Adaptive Works

When TPS drops below 18 (default low threshold), the smart cleanup item threshold is reduced from 2000 to 1400 (30% reduction), meaning cleanup triggers sooner during lag.

When TPS drops below 15 (default critical threshold), the threshold drops from 2000 to 1000 (50% reduction) for more aggressive cleanup.

When TPS recovers, thresholds return to their normal values automatically.

## Developer API

UltiCleaner provides four custom events that other plugins can listen to and interact with:

| Event | When Fired | Cancellable |
|-------|-----------|-------------|
| `PreItemCleanEvent` | Before item cleanup starts | Yes |
| `PreEntityCleanEvent` | Before entity cleanup starts | Yes |
| `PreChunkUnloadEvent` | Before a chunk is unloaded | Yes |
| `CleanCompleteEvent` | After cleanup completes (async) | No |

The `getItemUuids()` / `getEntityUuids()` lists returned by `PreItemCleanEvent` and `PreEntityCleanEvent` are mutable -- you can remove specific entity UUIDs to prevent them from being cleaned.

## FAQ

### 1. What if the plugin doesn't work after installation?

Check these points:
- Make sure the JAR file is in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)
- Confirm that UltiTools-API 6.2.0 or higher is installed
- Restart the server fully (not just `/ul reload` -- new modules require a full restart)
- Check the console for the "UltiCleaner has been enabled!" log message

### 2. Config changes not taking effect?

After saving the config file, use `/ul reload` to reload the configuration. Make sure your YAML formatting is correct (indentation must use spaces, not tabs). If changes still don't apply, check the console for configuration validation errors.

### 3. How to set up permissions?

UltiCleaner has a single permission node: `ulticleaner.clean`, which controls access to all `/clean` commands. Set it up with a permissions plugin like LuckPerms:

```
/lp group admin permission set ulticleaner.clean true
```

Regular players typically don't need this permission -- only admins need to manually trigger cleanup and check status.

### 4. Server still lags during cleanup?

Reduce the `batch.size` value. The default is 50 entities per tick. If your server hardware is limited, try 20 or 30. Smaller batches spread the cleanup over more ticks, reducing per-tick load at the cost of longer total cleanup time.

### 5. Is the chunk unload feature safe?

Chunk unloading performs multiple safety checks before executing: it won't unload force-loaded chunks, chunks containing players, or chunks that are in use. Paper servers also check whether entities are loaded in the chunk. If you're still concerned, test on a development server first or only enable it for worlds with no players.

### 6. What's the difference between smart cleanup and scheduled cleanup?

Scheduled cleanup runs at fixed intervals regardless of entity count. Smart cleanup only triggers when entity counts exceed configured thresholds -- it acts as a safety net. Both can be enabled simultaneously.

### 7. How can other plugins prevent a cleanup?

Other plugins can listen to `PreItemCleanEvent` or `PreEntityCleanEvent` and call `setCancelled(true)` to prevent that cleanup cycle. They can also remove specific entity UUIDs from the event's UUID list to partially prevent cleanup.

## Changelog

### v1.0.0 (2026-02-13)

Initial release.

Added: Scheduled item cleanup with configurable interval and countdown warnings
Added: Scheduled entity cleanup with per-entity-type configuration
Added: Item whitelist to protect specified item types from cleanup
Added: Ignore items and entities with custom display names
Added: Ignore leashed entities and tamed entities
Added: Ignore recently dropped items with configurable time window
Added: World blacklist to exclude specific worlds from cleanup
Added: Smart cleanup based on entity count thresholds
Added: TPS-adaptive threshold adjustment with 1m/5m/15m sample windows
Added: Batch processing to remove a fixed number of entities per tick, reducing lag
Added: Cleanup progress display for OPs
Added: Chunk unload feature to automatically unload idle chunks far from players
Added: Paper server compatibility optimizations (async chunk unloading, entity load detection)
Added: Four custom events (PreItemCleanEvent, PreEntityCleanEvent, PreChunkUnloadEvent, CleanCompleteEvent)
Added: Fully customizable cleanup messages with color code support
