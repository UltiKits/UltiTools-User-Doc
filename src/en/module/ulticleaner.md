# UltiCleaner - High-Performance Server Cleanup Module

Automatically cleans up ground items and configured mob entities with smart cleanup, TPS-adaptive thresholds, and batch processing to minimize lag during cleanup operations.

## Feature Overview

UltiCleaner provides comprehensive automatic cleanup capabilities for Minecraft servers. It periodically cleans up dropped items and configured entity types, broadcasting countdown warnings to all online players before each cleanup cycle. The cleanup process uses batch processing -- removing only a fixed number of entities per tick -- to avoid lag spikes from mass entity removal. The smart cleanup mode automatically triggers additional cleanup when item or mob counts exceed configured thresholds. TPS-adaptive functionality dynamically lowers these thresholds when server performance drops, making cleanup more aggressive during lag. Chunk unloading has been removed; the server engine manages idle chunks. Every cleanup operation fires custom Bukkit events that other plugins can listen to and cancel.

## Installation

There are two ways to install:

**Method 1: Install via UPM**

```
/upm install UltiCleaner
```

**Method 2: Manual installation**

1. Install UltiTools-API 6.3.0 or later first, then download `UltiCleaner-2.0.0.jar`
2. Place the JAR file in your server's `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file will be auto-generated at `plugins/UltiTools/pluginConfig/UltiCleaner/config/cleaner.yml`.

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

All commands use the aliases `/clean`, `/cleaner`. The permission node for all commands is `ulticleaner.clean`. Both players and console can execute them.

| Command | Description | Example |
|---------|-------------|---------|
| `/clean items` | Immediately clean ground items in all worlds | `/clean items` |
| `/clean entities` | Immediately clean configured entity types in all worlds | `/clean entities` |
| `/clean all` | Clean both items and entities | `/clean all` |
| `/clean check` | Show server entity stats: ground item count, cleanable mob count, total entities, loaded chunks, current TPS | `/clean check` |
| `/clean status` | Show cleanup status: next item/entity cleanup countdown, whether cleaning is in progress, TPS status | `/clean status` |

## Configuration

Config file path: `plugins/UltiTools/pluginConfig/UltiCleaner/config/cleaner.yml`

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

# ============ Messages ============
messages:
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

The messages above illustrate English built-in text; the other setting keys and values match the Chinese page. The seven broadcasts and framework-generated comments follow the server's `language`, keeping text and comments you edited. Apply a language change with a full `/ul reload` or restart. Edit broadcasts in this config, not extracted language files. Do not overwrite your file with this complete example.

Reload now rereads the file, refreshes language, rebuilds caches and resets countdowns. `warn-times` entries are whole seconds; invalid entries are named and skipped. An empty or entirely unreadable list uses `[60, 30, 10, 5, 3, 2, 1]`, rather than disabling warnings. To disable entity cleanup, use `entity.enabled: false`, not `entity.types: []`: an empty type list warns and uses the default mob types. A nonempty list containing only invalid types warns for each and cleans no entities. Item whitelists accept lower-case material names such as `diamond`; unknown materials warn and protect nothing.

`messages.prefix` is no longer read; change the prefix inside each message instead. That leftover key and the four `chunk.*` keys each warn at startup and reload and may be deleted individually. Uninstalling UltiCleaner stops active batches without broadcasting completion. `/clean all` now runs both cleanup halves, while manual cleanup still refuses when either is already running. `/clean status` shows the actual configured TPS reductions.

## Usage Tutorials

### Scenario 1: Small Survival Server (10-20 players)

Small servers don't need aggressive cleanup. The defaults work well, but you may want to increase the item cleanup interval to avoid cleaning up players' items too quickly:

```yaml
item:
  interval: 600        # Clean every 10 minutes
  ignore-recent: 60    # Ignore items dropped in the last minute
smart:
  enabled: false       # Disable smart cleanup
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

UltiCleaner provides three custom events that other plugins can listen to and interact with:

| Event | When Fired | Cancellable |
|-------|-----------|-------------|
| `PreItemCleanEvent` | Before item cleanup starts | Yes |
| `PreEntityCleanEvent` | Before entity cleanup starts | Yes |
| `CleanCompleteEvent` | After cleanup completes (async) | No |

The `getItemUuids()` / `getEntityUuids()` lists returned by `PreItemCleanEvent` and `PreEntityCleanEvent` are mutable -- you can remove specific entity UUIDs to prevent them from being cleaned.

## FAQ

### 1. What if the plugin doesn't work after installation?

Check these points:
- Make sure the JAR file is in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)
- Confirm that UltiTools-API 6.3.0 or higher is installed
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

### 5. Where did chunk settings and /clear go?

Chunk unloading was removed entirely; the server manages idle chunks itself. `/clean chunks` no longer exists. The four old `chunk.*` settings only cause deprecation warnings and can be removed. `/clear` belongs to vanilla again, so use `/clean` or `/cleaner` for this module. The loaded-chunk count in `/clean check` is only a statistic, not a remaining chunk-cleanup feature.

### 6. What's the difference between smart cleanup and scheduled cleanup?

Scheduled cleanup runs at fixed intervals regardless of entity count. Smart cleanup only triggers when entity counts exceed configured thresholds -- it acts as a safety net. Both can be enabled simultaneously.

### 7. How can other plugins prevent a cleanup?

Other plugins can listen to `PreItemCleanEvent` or `PreEntityCleanEvent` and call `setCancelled(true)` to prevent that cleanup cycle. They can also remove specific entity UUIDs from the event's UUID list to partially prevent cleanup.

## Changelog

### v2.0.0

#### Added

- On startup, and again on every `/ul reload`, this module now checks your own `config/cleaner.yml`
  for keys this version no longer reads and logs one warning per leftover, naming the module, the
  file and the key, and saying where the setting went. Deleting a key from the module stops a
  *fresh* file being written with it but does nothing to the file you already have — the framework
  only ever writes a default for a key that is missing — so without this warning an edited value
  would simply stop meaning anything, silently. The keys checked for are `messages.prefix`,
  `chunk.enabled`, `chunk.max-distance`, `chunk.batch-size` and `chunk.timeout`; delete them from
  the file to silence it.

#### Changed

- This version requires UltiTools 6.3.0 or later and declares `api-version: 630` in `plugin.yml`
  (the released 1.0.0 declared `620`). An older framework now refuses the module before its start-up runs,
  with a warning that the UltiTools version is outdated; the refusal names the module by its `plugin.yml`
  `name:`, here `UltiCleaner` (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ulticleaner`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- Message settings in `config/cleaner.yml` — the seven broadcast messages (`messages.warn`,
  `messages.entity-warn`, `messages.item-cleaned`, `messages.entity-cleaned`, `messages.smart-triggered`,
  `messages.clean-progress`, `messages.clean-cancelled`) — are written in the server's language when the
  module starts, and the file is what the module broadcasts (for example `messages.item-cleaned:
  '&a[Cleaner] &fCleaned &e{COUNT} &fground items!'` under `language: en`); previously they were fixed
  Chinese text, so `language: en` had no effect on any cleanup broadcast. A setting that is still built-in
  text — in any language, or a default an earlier version shipped — follows `language`: it is rewritten
  when the module starts or after `/ul reload`. A setting you edited is kept. To keep a built-in text but
  stop it following `language`, change at least one character (UltiKits/UltiCleaner#17). The text written is this module's built-in text: edit these settings in `config/cleaner.yml`; an edit of the extracted
  language file does not change them (earlier versions never read them from the language file either).

#### Fixed

- The comments above the keys of `config/cleaner.yml` now come from the module's language files: a
  server set to `language: en` writes English comments on a fresh install (earlier versions wrote
  Chinese-only comments in every language). The comments the framework wrote on these 33 keys, the Chinese
  ones earlier versions wrote included, switch to the server's language at the next start, and after you
  change `language` and run a bare `/ul reload`; a comment you wrote yourself is kept as you wrote it
  (UltiKits/UltiTools-Reborn#611). On `/ul reload` this module writes `config/cleaner.yml` only to re-render a
  broadcast message that still holds built-in text in another language, as every message does after a
  `language` change. That write changes only those message lines: a value the framework could not read (for
  example `interval: 3O0`), a key you deleted and your own comments stay as you left them
  (UltiKits/UltiTools-Reborn#611). A reload that finds no such message and no framework comment in another
  language writes nothing to the file, which is the usual case when `language` did not change
  (UltiKits/UltiCleaner#33).

- `item.whitelist` entries are now read the way the server reads a material name, so a lower-case
  entry such as `diamond` protects diamonds. An entry that names no material (for example a typo) is
  ignored and named in a console warning at start-up and on `/ul reload`; before, it was accepted
  silently and protected nothing.

- `/upm uninstall UltiCleaner` now stops a cleanup that is still removing items or entities. The
  batch task belonged to the UltiTools plugin, so it kept deleting entities for a module that had
  already been unloaded until it reached the end of its list. A cleanup stopped this way broadcasts
  nothing (UltiKits/UltiCleaner#26).

- Countdown warnings before a scheduled cleanup ("Ground items will be cleaned in T seconds!" and the
  entity line) are broadcast again. Earlier framework versions read each `item.warn-times` / `entity.warn-times`
  entry from `config/cleaner.yml` as text, and the module compared it with a number, so no warning was
  ever sent once the file existed. Each entry is now read as a whole number of seconds, including a number
  an older file stored as text. An entry that cannot be read as one (for example `abc` or `2.5`) is skipped
  with a console warning naming the key, the entry's position and its value, and the other entries are used.
  A list that is empty, or in which no entry could be read, is not used: the default
  `[60, 30, 10, 5, 3, 2, 1]` applies and start-up and every `/ul reload` log a warning naming the key and
  the default; before, such a list silently switched every countdown warning off (UltiKits/UltiCleaner#22,
  UltiKits/UltiCleaner#34).

- `entity.types: []` in `config/cleaner.yml` no longer switches entity cleanup off without a word. The
  framework's `@NotEmpty` now covers lists, so an empty `entity.types` runs on the declared default types
  (`ZOMBIE`, `SKELETON`, `CREEPER`, `SPIDER`, `CAVE_SPIDER`, `ENDERMAN`, `WITCH`, `SLIME`, `PHANTOM`) with one
  warning from the framework naming the key, the empty value and the default; the file is not changed. The
  two `warn-times` lists keep this module's own empty-list warning. A list that holds only names that are no
  entity type is not empty: each unknown name is warned about and nothing is cleaned
  (UltiKits/UltiCleaner#34).

- The warning about a key this version no longer reads now prints the configuration file's path exactly
  as it is. A path containing `{KEY}` or `{REASON}` was rewritten by the placeholders filled after it.

- For plugin authors: `/clean all` now fires one `CleanCompleteEvent` of type `ALL` after both of its
  halves have finished, with the combined count and trigger `MANUAL`. A half with a non-empty cleanup
  list that is not cancelled still fires its own `ITEMS` or `ENTITIES` event first, as before; an empty
  or cancelled half does not fire that component event. `CleanType.ALL` was declared but never fired
  (UltiKits/UltiCleaner#16).

- `/clean all` now removes entities as well as ground items. The item cleanup and the entity cleanup
  shared one "cleaning in progress" flag, so an entity cleanup started in the same tick as an item
  cleanup was skipped without a message while `/clean all` still reported the entities as started.
  The same collision dropped the mob cleanup when smart cleanup exceeded both thresholds at once, and
  dropped one of the two scheduled cleanups whenever their countdowns reached zero in the same second.
  Each cleanup now has its own flag; `/clean items`, `/clean entities` and `/clean all` still refuse
  while any cleanup is running (UltiKits/UltiCleaner#15).

- `language: en` now applies to everything `/clean` prints (the started, in-progress, `check`,
  `status` and help lines) and to the command description, which were fixed Chinese text in every
  language although the language files already held English text for most of them
  (UltiKits/UltiCleaner#17). `language: zh` now also applies to the console lines that were fixed
  English text: the detected-server and TPS-monitor start-up lines, an unknown entity type in
  `entity.types`, the TPS band shown by `/clean check` and `/clean status` (`Normal`, `Low`,
  `Critical`), and the warning about a key this version no longer reads. Their English wording is
  unchanged.

- `/ul reload UltiCleaner` (and a bare `/ul reload`) now re-reads `config/cleaner.yml` and
  refreshes the module's language files before the module rebuilds the cleaner service's caches and
  resets its cleanup countdowns. Previously this module replaced the framework's reload method, so
  the file was never re-read and an edited value such as `item.interval` did not take effect until a
  restart (UltiKits/UltiCleaner#14).

- After `/upm uninstall UltiCleaner`, the module's `/clean` command is now really removed.
  Previously this module replaced the framework's unload method with one that only logged a line, so
  the command stayed active until the server restarted (UltiKits/UltiCleaner#14).

- `/clean status` now names the TPS threshold reduction actually configured in
  `tps.low-reduction` and `tps.critical-reduction`. Previously the warning line printed a fixed
  "30%" and "50%" whatever those keys were set to, so an operator who had raised either one was
  shown a number the module was not applying (UltiKits/UltiCleaner#21).

#### Removed

- Removed the `clear` alias of `/clean`. It took over vanilla's `/clear` command, so `/clear <player>`
  printed this module's help instead of clearing an inventory. `/clear` is vanilla's again; use
  `/clean` or `/cleaner` for this module (UltiKits/UltiCleaner#30).

- For plugin authors: removed `CleanCompleteEvent.CleanType.CHUNKS`. Nothing could fire it once the
  chunk-unload feature was removed, so a listener's `CHUNKS` branch could never run. A plugin that
  names the constant must drop that branch before it compiles against this version
  (UltiKits/UltiCleaner#16).

- Five language-file entries that no code ever displayed were removed from `lang/en.yml` and
  `lang/zh.yml`: `smart_clean_items`, `smart_clean_mobs`, `clean_complete`, `tps_low_warning` and
  `tps_critical_warning`. No message changes; a copy of them in an already-extracted language file
  is simply not read.

- Removed the module's own "UltiCleaner has been disabled!" console line and its
  `cleaner_disabled` language key. The unload override that printed it did no other work, so it
  was deleted rather than moved to the new unload hook.

- **Removed the chunk-unloading feature entirely.** The server engine already unloads idle chunks
  by itself, so this feature could only ever reach the chunks the server deliberately keeps
  resident. Measured with no players online, three worlds held 147 loaded chunks — exactly the
  49-chunk spawn-keep area of each — and the module's own gate rejected all 147. The deprecated
  platform check the gate was built on says the same thing in its own words: chunks "will not be
  loaded for more than 1 tick unless they are in use". Removing the feature is not a rejection of
  it; `UltiKits/UltiCleaner#27` records the measurements and the conditions for bringing it back
  (UltiKits/UltiCleaner#23, UltiKits/UltiCleaner#20). What went, item by item:
  - the command `/clean chunks`, which no longer exists and now prints the usual unknown-format
    help instead;
  - the scheduled chunk-unload task that ran every 30 seconds;
  - the configuration keys `chunk.enabled`, `chunk.max-distance`, `chunk.batch-size` and
    `chunk.timeout` in `config/cleaner.yml` — these four keys still sit in your existing file and
    are now ignored (the module logs one warning per leftover key at startup);
  - the `PreChunkUnloadEvent` extension point, which only this feature ever fired;
  - the "unloadable chunks" line of `/clean check`, and the `chunk_unloaded`, `cmd_help_chunks`
    and `stats_chunks_unloadable` language keys.
  `/clean check`'s "loaded chunks" line stays: it is a plain server statistic, not a readout of
  this feature.

- Removed the configuration key `messages.prefix` from `config/cleaner.yml`. No code ever read it, so
  no message was ever prefixed from it and nothing you see changes. The prefix in a cleanup broadcast
  is part of that broadcast's own text — the seven other `messages.*` keys in the same file, each
  still read from the configuration and each carrying its own tag (`[Cleaner]` in the English
  built-in text, `[清理]` in the Chinese) — so to change a prefix, edit the message it belongs to.
  Those broadcasts now follow the server's `language` setting, as described under Changed above
  (UltiKits/UltiCleaner#17). The removed key stays in your existing file and is now ignored; the
  module logs one warning about it at startup (UltiKits/UltiCleaner#18).


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
