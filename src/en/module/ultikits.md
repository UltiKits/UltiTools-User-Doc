# UltiKits - Kit System

UltiKits is the kit/gift package management module for UltiTools, allowing you to create, manage, and distribute item kits to players.

## Feature Overview

UltiKits provides a full-featured kit system. Admins can quickly create kits in-game from their inventory or use a visual editor to modify kit contents. Players browse available kits through a paginated GUI and claim them with a click. Each kit supports independent pricing (requires Vault economy plugin), level requirements, permission nodes, cooldown timers, and one-time claim restrictions. Kits can also trigger player commands and console commands on claim. Kit configurations are stored as individual YAML files for easy management.

## Installation

### Method 1: Via UPM (Recommended)

Run in-game or from the console:

```
/upm install ultikits.kits
```

### Method 2: Manual Installation

1. Install UltiTools-API 6.3.0 or later, then download `UltiKits-2.0.0.jar`
2. Place the JAR file in the `plugins/UltiTools/plugins/` directory
3. Restart the server

## Upgrading to 2.0.0

Back up configuration, kit files and claim records, install UltiTools-API 6.3.0 or later, replace `UltiKits-2.0.0.jar` and restart fully. Its catalogue identity is **`ultikits.kits`**, including the dot, used by framework update checks and `/upm update`. Framework reload/uninstall uses its `plugin.yml` name, `UltiTools-Kits`. `/ul reload` cannot load new JARs and does not replace existing values with new defaults.

Check the old main configuration: `enabled`, `kits_per_page` and `click_cooldown_ms` now take effect, with unchanged defaults true, 28 and 200. If your file already says `enabled: false`, upgrading switches the kit system off, including help, list, reload and Save in an open editor. To restore it, set `enabled: true` in `plugins/UltiTools/pluginConfig/UltiTools-Kits/config/config.yml` and run `/ul reload UltiTools-Kits`; the also-disabled `/kits reload` cannot restore the switch.

The first start copies `starter.yml` only if the kits folder does not exist: Chinese gets 新手礼包, English gets Starter Kit, and a language without an example gets English. An existing folder is not overwritten. The shipped example has an empty `items` string: add items with the editor before claiming. For custom messages copy official `lang/en.json` to `lang/en-myserver.json`, migrate to ASCII keys such as `kits.claim.success`, select `language: en-myserver` in the framework's `plugins/UltiTools/config.yml`, then use a full `/ul reload` or restart. Official language files are restored at startup with a backup, so do not edit them directly. Missing custom keys fall back to the prefix's official language; a module without that official language uses English.

## Quick Start

After installation, follow these steps to create your first kit:

1. **Prepare items** - Place the items you want in the kit into your inventory
2. **Create the kit** - Run `/kits create welcome` to save all items in your inventory as a kit named `welcome`
3. **Browse kits** - Run `/kits` to open the GUI browser and see the kit you just created
4. **Claim a kit** - Click the kit icon in the GUI, or run `/kits claim welcome`
5. **Edit a kit** - Run `/kits edit welcome` to open the visual editor where you can drag and drop items

On first run, the plugin automatically generates an example kit configuration file called `starter` that you can use as a reference.

## Commands

| Command | Description | Who Can Run | Example |
|---------|-------------|-------------|---------|
| `/kits` | Open the kit browser GUI | Player only | `/kits` |
| `/kits claim <name>` | Claim a specific kit | Player only | `/kits claim starter` |
| `/kits list` | List all available kits | Player / Console | `/kits list` |
| `/kits create <name>` | Create a kit from current inventory | Player only | `/kits create vip` |
| `/kits edit <name>` | Open the kit content editor | Player only | `/kits edit starter` |
| `/kits delete <name>` | Delete a kit | Player / Console | `/kits delete oldkit` |
| `/kits reload` | Reload all kit configurations | Player / Console | `/kits reload` |

Command aliases: both `/kit` and `/kits` work.

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultikits.kits.use` | Basic access: browse GUI, claim kits, list kits | All players |
| `ultikits.kits.admin` | Admin access: create, edit, delete, reload kits | OP only |

Additionally, each kit can have its own custom permission node (see the `permission` field in kit configuration).

## Configuration

### Main Configuration File

File path: `plugins/UltiTools/pluginConfig/UltiTools-Kits/config/config.yml`

```yaml
# Enable the kit system
enabled: true

# GUI click debounce in milliseconds (prevents duplicate claims from rapid clicking)
# Range: 50-5000
click_cooldown_ms: 200

# Number of kits displayed per page in the browser GUI
# Range: 7-28
kits_per_page: 28
```

### Kit Configuration Files

Each kit has its own YAML file stored in `plugins/UltiTools/pluginConfig/UltiTools-Kits/kits/`. The filename (lowercase) becomes the kit name.

Below is the complete bundled example file `kits/starter.yml`:

```yaml
# Kit display name (supports color codes)
displayName: "&aStarter Kit"

# Description lines (displayed as lore on the GUI icon)
description:
  - "&7A kit for new players"
  - "&7Basic gear and tools"

# GUI display icon material (Bukkit Material enum name)
icon: GRASS_BLOCK

# Cost to claim (0 = free, requires Vault economy plugin)
price: 0

# Minimum player level required (0 = no requirement)
levelRequired: 0

# Required permission node (empty string = no requirement)
permission: ""

# Can be claimed multiple times (false = one-time kit)
reBuyable: false

# Cooldown in seconds between claims (only applies when reBuyable is true)
cooldown: 0

# Commands executed as the player on claim (supports {player} placeholder)
playerCommands: []

# Commands executed as console on claim (supports {player} placeholder)
consoleCommands: []

# Serialized item data (auto-generated by /kits create or /kits edit, do not modify manually)
items: ""
```

## Usage Tutorials

### Creating a Paid VIP Kit

Suppose you want to create a VIP kit that costs 500 in-game currency and requires VIP permission:

1. Place diamond sword, diamond armor, etc. in your inventory
2. Run `/kits create vip`
3. Edit the config file `plugins/UltiTools/pluginConfig/UltiTools-Kits/kits/vip.yml`:

```yaml
displayName: "&b&lVIP Exclusive Kit"
description:
  - "&7Exclusive items for VIP players"
  - "&eIncludes full diamond gear"
icon: DIAMOND_SWORD
price: 500
levelRequired: 0
permission: "ultikits.kit.vip"
reBuyable: false
cooldown: 0
playerCommands: []
consoleCommands:
  - "say {player} claimed the VIP Kit!"
items: "..."  # Auto-generated by /kits create
```

4. Run `/kits reload` to apply changes
5. Grant VIP players the `ultikits.kit.vip` permission

### Creating a Daily Kit

A free kit that can be claimed once every 24 hours:

```yaml
displayName: "&e&lDaily Reward"
description:
  - "&7Claim once per day"
  - "&aFree"
icon: CAKE
price: 0
levelRequired: 0
permission: ""
reBuyable: true
cooldown: 86400  # 24 hours = 86400 seconds
playerCommands: []
consoleCommands: []
items: "..."
```

### Creating a Kit with Command Rewards

A kit that also runs commands on claim (e.g., giving XP):

```yaml
displayName: "&d&lReward Kit"
description:
  - "&7Grants bonus rewards on claim"
icon: EXPERIENCE_BOTTLE
price: 100
levelRequired: 10
permission: ""
reBuyable: true
cooldown: 3600  # 1 hour
playerCommands:
  - "me claimed the Reward Kit"
consoleCommands:
  - "xp give {player} 100"
  - "say {player} claimed the Reward Kit"
items: "..."
```

### Using the GUI Editor

1. Run `/kits edit starter` to open a 6-row chest interface
2. The first 5 rows (45 slots) are the item area: move/add items, but do not drop or clone pre-filled items in the grid
3. The bottom row contains controls:
   - **Emerald** - Save
   - **Book** - Kit info display
   - **Barrier** - Cancel and close
4. Arrange items as desired, then click the emerald to save

### How the main configuration applies

| Key | Type | Default | Behavior |
|---|---|---|---|
| `enabled` | Boolean | true | false refuses commands, claims, saves and page turns; open windows are not force-closed |
| `kits_per_page` | Integer | 28 | 7-28; page size and page indicator agree; new value applies on the next open |
| `click_cooldown_ms` | Integer | 200 | 50-5000 milliseconds; too-fast icon clicks are silently ignored |

After changing these keys run `/ul reload UltiTools-Kits`. After editing kit YAML run `/kits reload` (with enabled true). If fewer kits or a changed page size invalidates an open page, the browser shows the last real page with working arrows. Write `price`, `cooldown` and `levelRequired` as unquoted non-negative numbers. Negative or non-numeric values warn and use 0, not reject the whole kit: a mistake can make a kit free or remove a requirement, so correct it. A missing displayName uses Kit / 礼包 according to language.

### Claim failures and reward commands

Claims charge → record → deliver items → schedule reward commands. A paid kit without an economy provider explicitly reports the missing economy, not insufficient funds. A refused withdrawal delivers and records nothing; the console warns once per kit per server session, reset by `/kits reload`. A failed record refuses the claim and refunds; a failed refund also tells the player and logs player, kit and amount for an admin to repay. JSON's deferred disk-write failures cannot be seen at claim time: this is not a guarantee of durable records across a crash.

Space checks follow the running server's stack behavior, refusing before payment when items will not fit. Any leftovers during delivery are dropped at the player's feet with a message, not destroyed. Player reward commands run next tick in list order, before console commands, so a reward can open another GUI. A player who disconnected by then runs no player commands, with each logged as not run. Failed player commands notify the player; every failed player/console reward logs kit, command and player. The claim still stands, with no refund or automatic retry: admins should inspect logs and make good the reward. `/kits list` and insufficient-funds prices use the economy's own format rather than a hard-coded dollar sign.

### Editing, saving and file conflicts

A successful save replies `Saved kit: <kit>` and changes only `items` in the original file, preserving other settings, comments and unknown keys byte for byte. A disk edit since load refuses the save: run `/kits reload`, then reopen the editor. Non-UTF-8 text or a write affecting other content (such as YAML anchors) also refuses, with a logged reason. Failure leaves the loaded kit unchanged. Closing without saving returns added items and reclaims pre-filled ones, reclaiming first to free space; the cursor is checked even when Esc closes mid-drag. Cancel never writes the file.

Q/Ctrl+Q drops and Creative middle-click cloning are refused inside the grid. Moving a pre-filled item to your own inventory first, then dropping/cloning it there, still bypasses that protection. This is a known limitation: grant editor access only to trusted admins and do not perform those actions during editing. Items outside the inventory cannot be guaranteed recoverable.

Hand-placed filenames may contain capitals; save/delete use the actual loaded file. Do not define the same kit with both `VIP.yml` and `vip.yml`: one may load for claiming, but edit/save/create/delete refuse and name the conflicting files. Back up, move the extra file away, then reload. New names cannot contain `/`, `\` or `..`; existing files not yet reloaded or unreadable are not overwritten. A failed delete reports not deleted, stays loaded and logs the path: resolve permissions and retry. Editor saves replace atomically; a crash during file creation can still leave a truncated file, so retain backups. `/upm uninstall UltiTools-Kits` really unregisters `/kits` and `/kit`.

## FAQ

### What if the plugin doesn't work after installation?

Check the following:
- The JAR file is in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)
- The server has been fully restarted (not just `/reload`)
- There are no errors in the console
- UltiTools-API version is >= 6.3.0

### Config changes not taking effect?

After modifying kit YAML files, run `/kits reload` to reload them. After modifying the main `config.yml`, run `/ul reload` or restart the server.

### How to set up permissions?

1. The basic permission `ultikits.kits.use` is granted to all players by default
2. Admin permission `ultikits.kits.admin` is OP-only by default
3. Individual kit permissions are set in each kit's `permission` field -- leave it empty for unrestricted access
4. Use a permissions plugin (e.g., LuckPerms) to assign permissions to players or groups

### Economy system not working?

UltiKits pricing requires Vault and an economy plugin (e.g., EssentialsX, CMI). Make sure:
- Vault is installed on the server
- At least one Vault-compatible economy plugin is installed
- The kit's `price` field is set to a value greater than 0

### How do I create a kit if my inventory is empty?

The `/kits create` command reads non-empty items from your current inventory. If your inventory is completely empty, it will show an "Inventory is empty" error. Place the desired items in your inventory first, then run the command. Alternatively, create a kit first, then use `/kits edit <name>` to open the editor and place items directly.

### How to set up cooldown timers?

1. Set `reBuyable` to `true` (allow repeated claims)
2. Set `cooldown` to the number of seconds, for example:
   - `cooldown: 3600` for 1 hour
   - `cooldown: 86400` for 1 day
   - `cooldown: 604800` for 1 week
3. If `reBuyable` is `false`, the kit can only be claimed once and the cooldown setting has no effect

## Changelog

### v2.0.0

Four never-shown old language entries from Unreleased were removed without changing visible output; the missing-economy state now has the dedicated reply documented below, no longer an insufficient-balance reply. The README server/Java badge wording was withdrawn at finalization; only its framework requirement remains.

#### Changed

- This version requires UltiTools 6.3.0 or later and declares `api-version: 630` in `plugin.yml`
  (the last release, 1.0.0, declared `620`). UltiTools 6.2.0 to 6.2.5 accepted the 1.0.0
  declaration; they now refuse the module at load, with a warning that the UltiTools version is
  outdated that names the module by its `plugin.yml` `name:`, `UltiTools-Kits`. Frameworks before
  6.2.0 already refused 1.0.0 (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultikits.kits`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- The example kit created on first start now follows the server's `language`: an English server gets
  a `Starter Kit` with English lore, a Chinese one `新手礼包`, and a language the module has no
  example for gets the English one. Before, the one shipped example was Chinese under every language.
  Existing installs are not affected: the example is copied only when the kits folder does not exist
  yet (UltiKits/UltiKits#33).

- Language keys were renamed from Chinese sentences to ASCII keys (for example `kits.claim.success`).
  This module's official language files (`lang/en.json` and `lang/zh.json` under
  `plugins/UltiTools/pluginConfig/UltiTools-Kits/`) belong to UltiTools: from UltiTools-API 6.3.0 an edited
  official file is restored to the shipped text at every start, its edited copy kept as a backup and
  named in the server log, so edits made there are not kept. To customise messages, copy the official
  file under a new name that starts with its language code and a hyphen and holds only ASCII letters, digits,
  `_` and `-` (`en.json` to `en-myserver.json`), edit the copy against the new keys, and set
  `language: en-myserver` in `plugins/UltiTools/config.yml` (one setting for the framework and every module).
  Messages the copy lacks come from the official file its name starts with (`en` here), and a module with no
  file under that name uses the official language matching the prefix when it ships it, otherwise its official `en`.
  A server whose language files were never edited needs no action.

#### Removed

- The "Error claiming kit" message and the claim outcome behind it were removed: no claim ever
  produced that outcome, so the message could not be shown. Every claim outcome keeps its own reply.
  An operator who translated the `kits.claim.error` entry can drop it (UltiKits/UltiKits#27).

#### Fixed

- Saving in the kit editor (`/kits edit <kit>`, then Save) now writes only the kit's `items` into its file.
  Before, it rebuilt the whole file from the loaded kit: every comment and every key the module does not
  know was dropped, values the loader had replaced were written back (an invalid `icon` as `CHEST`, a
  negative or non-numeric `price`, `levelRequired` or `cooldown` as `0`, a mistyped `reBuyable` as
  `false`), and a hand edit made after the kit was loaded was reverted. Now every other line stays byte for
  byte. If the kit's file changed on disk since it was loaded, nothing is saved and the editor says so and
  asks for `/kits reload` first; if writing the items would change anything else in the file (YAML anchors,
  for example) or the file is not UTF-8 text, nothing is saved and the editor says the kit was not saved,
  with the reason in the server log. `/kits create` still only ever creates a new file
  (UltiKits/UltiKits#43).

- A kit's player reward commands (`playerCommands`) now run one tick after the claim, like its console
  commands, instead of inside the claim. Claiming from the kit browser ran them inside the inventory
  click, where a reward command that opens another GUI could not open it, or had it closed again at once
  by the browser's own close after a successful claim. The commands still run in list order and before the
  console commands; a command that does not run is still reported to the player and logged, now one tick
  later, and a player who has disconnected by then has no command run, with each logged as not run
  (UltiKits/UltiKits#41).

- A negative or non-numeric `price`, `cooldown` or `levelRequired` in a kit file is no longer read as
  "none" without a word. Before, `price: -5` made the kit free, `levelRequired: -1` removed the level
  requirement, a negative `cooldown` removed the cooldown, and a quoted `price: "250"` was read as `0`,
  none of them logged. Now loading the kit logs one warning naming the kit, the key and the value, and
  uses that key's default (`0`) instead; `0`, positive values and absent keys are unchanged
  (UltiKits/UltiKits#40).

- A kit claim is no longer refused with "Inventory full" on Paper 1.21.1 and earlier when an
  over-sized stack would fit. Those versions fill an empty slot up to the inventory's maximum (99), not
  the item's (64); the module now probes which behaviour the server has once at start and counts empty
  slots accordingly. Nothing was lost before: the claim was refused before any charge
  (UltiKits/UltiKits#38).

- A kit reward command that does not run is now reported instead of being ignored. A player command
  that is unknown, refused or throws tells the player which reward did not run; every failed reward
  command, player or console, logs a warning naming the kit, the command and the player. The claim
  still stands and is not refunded, so an operator can make the reward good by hand. Before, both
  results were discarded and the claim reported plain success (UltiKits/UltiKits#25).

- A console reward command whose scheduling itself fails (`UltiTools` registered but disabled between
  the lookup and the scheduling call, or the scheduler otherwise refuses the task) is now logged the
  same way an unschedulable one already was, and every console command after it in the kit's list is
  still attempted. Before, that failure escaped the claim after payment, recording and item delivery
  had already run, produced no warning for that command, and silently skipped every console command
  after it in the list (UltiKits/UltiKits#39 review of #25).

- `/kits list` and the "Insufficient balance, requires …" reply now write a kit's price in the server
  economy's own format, as the kit browser already did. Before, they printed a hard-coded `$` and the
  raw number (`($100.0)`), so a server whose currency is not dollars showed one price two ways
  (UltiKits/UltiKits#34).

- A paid kit claimed on a server with no economy plugin now says so ("This kit has a price, but the
  server has no economy plugin to pay it with"), and the kit browser shows "No economy on this server"
  for it. Before, both said "Insufficient balance", which no balance could fix and which hid the missing
  economy (UltiKits/UltiKits#32).

- The kit editor (`/kits edit`) now saves moves and additions: items can be moved within its grid and
  added from the player's own inventory, and Save writes them into the kit. Before, the GUI library
  cancelled every click in the grid, so Save re-saved the items the editor opened with. The bottom row
  of buttons stays fixed. When the editor closes without a successful save, the items the player put
  into the grid go back to the player instead of being thrown away (UltiKits/UltiKits#16).

- Taking a pre-filled kit item out of the editor's grid and then cancelling (or closing the window
  any other way that is not a successful Save) no longer leaves the player holding a free duplicate.
  Cancelling never writes the kit file, so the kit still has the item; whatever the grid opened with
  that the grid no longer accounts for at close time is now reclaimed the same way an item they added
  is given back to them, from wherever it could be: the player's own inventory (the common case), or
  still on the cursor if Esc closed the window mid-drag, before it was placed anywhere -- reclaimed
  there too, before the server would otherwise hand it back to the player once the window finishes
  closing. A cancelled edit now costs nothing in either direction (UltiKits/UltiKits#38 review of #39).

- Pressing Q (or Ctrl+Q), or Creative-mode middle-clicking (clone), over a pre-filled item in the
  editor's grid no longer does anything. The first drops the item into the world, a place the
  reconciliation above cannot see or reach; the second leaves the original in place and puts a free
  copy on the cursor, so reconciliation never even sees anything missing to reclaim. Either way,
  cancelling afterward left the kit file unchanged and a free duplicate of its item, on the ground or
  in the player's inventory. Both are refused only for the grid: the GUI library this editor is built
  on only honours a refusal there, not for a click confined to the player's own inventory, where a
  pre-filled item taken out first (an ordinary move) and then Q-dropped or cloned still reaches the
  same outcome in two steps -- a known limitation reported for a decision, not fixed here
  (UltiKits/UltiKits#39 review).

- Cancelling the editor with a full inventory now reclaims the kit's own copy before handing back an
  item the player added, so the returned item lands in the slot the reclaim just freed instead of
  being dropped at the player's feet for want of room. Before, the order was reversed: a personal item
  swapped into the grid for a pre-filled one could be dropped on the ground -- exposed to despawning or
  another player picking it up -- even though the exact slot it needed was about to be freed one step
  later (UltiKits/UltiKits#39 review).

- When a kit claim cannot be recorded, the claim is refused and any payment refunded, so a one-time
  kit can no longer be claimed twice after a storage failure. A claim is now charged, then recorded,
  then handed over; if the record cannot be written, nothing is given, no reward command runs and
  the player is told to try again. If the refund fails as well, the player is told so and the console
  logs an error naming the player, the kit and the amount (UltiKits/UltiKits#26).

- A kit containing a stack larger than its item's maximum stack size is refused before payment when
  it will not fit — the claim now works out the fit the way the inventory fills, topping up matching
  partial stacks first and splitting each stack at its own maximum — and anything that still does not fit is dropped at the player's feet with a message
  instead of being destroyed (UltiKits/UltiKits#24).

- `/kits delete` no longer reports a kit as deleted when its file could not be removed (or the kits
  folder could not be read). The kit now stays loaded, the sender is told it was not deleted, and the
  console names the file or folder, so a kit an
  admin was told is gone can no longer come back on the next `/kits reload` or restart. Deleting and
  saving a kit now use the file the kit was loaded from, so a hand-placed kit file whose name has
  capital letters (`VIP.yml`) is deleted, and saved from the editor, like any other. A save from the
  editor that fails no longer changes the loaded kit, so a claim still hands out what the file holds.
  When more than one file defines the same kit (`VIP.yml` and `vip.yml` on a case-sensitive file
  system), `/kits edit`, the editor's Save button, `/kits create` and `/kits delete` change nothing
  and name the files; one of them still loads, so the kit can be claimed, and `/kits reload` names
  them on the console (UltiKits/UltiKits#23). `/kits create` now refuses a name holding `/`, `\` or
  `..`, which used to write the kit file outside the kits folder, and refuses a name that a file in
  the kits folder already loads as (placed by hand without a reload, or unreadable), naming the file
  instead of overwriting it (UltiKits/UltiKits#37). A new kit's file (`/kits create`) is still written the
  way earlier versions wrote it, so a crash during the create can leave it cut off; crash-safe writes for
  modules are tracked in UltiKits/UltiTools-Reborn#545. The editor's save replaces the file atomically since
  UltiKits/UltiKits#43.

- `language: zh` now applies to the text that was fixed English: the kit editor's save-button lore
  (`Click to save kit contents`), the `/kits help` lines for `edit`, `create`, `delete` and `reload`,
  and eight console lines (a refused kit payment, a kit file that fails to load or has an invalid
  icon, failures to save a kit file, copy the example kit, serialize or deserialize kit items, and
  update a claim record). The fallback display name of a kit file with no `displayName` is now
  `Kit` / `礼包` by language instead of always `Kit`. The `/kits` command description, which showed a
  Chinese sentence in every language because it was missing from both language files, is now
  `Kit management command` under `language: en`. English wording is unchanged except where it was wrong:
  the `/kits help` line for `claim` said `Available` (the GUI status label) and now says `Claim a kit`;
  a failed `/kits create` and a failed save in the kit editor said `Error claiming kit` and now say
  `Error creating kit` and `Error saving kit` (UltiKits/UltiKits#31).

- Saving a kit from the kit editor is now refused while the kit system is switched off. An admin
  who had `/kits edit` open when an operator set `enabled: false` could still press Save and change
  the kit's contents; the Save button now answers `The kit system is currently disabled on this
  server` and writes nothing (UltiKits/UltiKits#13).

- The kit browser no longer shows an empty page titled with a page number that cannot exist. If the
  kit list shrinks while a browser is open — `/kits reload` removing kits, or `kits_per_page` being
  raised so there are fewer pages — the page the browser was on can stop existing; it now shows the
  last real page instead, with working navigation arrows (UltiKits/UltiKits#13).

- `config/config.yml: kits_per_page` now decides how many kits one page of the kit browser shows.
  Previously the browser paged on a hardcoded 28 regardless of what the key said; it now follows
  `kits_per_page`, whose default is still 28, so a server that never edited the key sees no change.
  The page count in the browser's `Page x/y` indicator follows the same value
  (UltiKits/UltiKits#13).

- `config/config.yml: click_cooldown_ms` now decides the kit browser's click-debounce window.
  Previously the browser used a hardcoded 200 milliseconds regardless of what the key said; it now
  follows `click_cooldown_ms`, whose default is still 200, so a server that never edited the key
  sees no change (UltiKits/UltiKits#13).

- `config/config.yml: enabled` now really switches the kit system off. Previously nothing read it
  and the kit system was active whatever it said. With `enabled: false`, every `/kits` (`/kit`)
  sub-command — including the bare `/kits` browser, `claim`, `list`, `edit`, `create`, `delete` and
  `reload` — now replies `The kit system is currently disabled on this server` and does nothing
  else. The default is still `true`, so a server that never edited the key sees no change. The
  switch is read when a command runs, not when the module loads, so `/ul reload UltiTools-Kits`
  applies a change without a server restart. `/kits help`, and any unrecognised `/kits` argument,
  are refused too rather than printing a usage list for sub-commands that all refuse. A kit browser
  that was already open when the switch was flipped is not force-closed, but clicking a kit in it
  gets the same refusal instead of a claim and its page arrows refuse to open a further page, so
  while the switch is off no kit can be taken and no new page of the catalogue is shown. Claiming
  is refused inside the kit service itself rather than at each command, so the guarantee holds for
  any future way of claiming as well (UltiKits/UltiKits#13).

- A paid kit whose price could not actually be withdrawn is no longer delivered. Previously, when
  the balance check passed but the withdrawal itself did not go through — the balance was spent
  elsewhere in between, or the economy plugin rejected the transaction — `/kits claim <name>` and
  the kit browser still gave the player the items, ran the kit's configured player and console
  commands, recorded a one-time kit as claimed, and the browser told the player the price had been
  deducted. Both paths now reply `Payment failed - the kit was not claimed`, deliver nothing and
  record nothing, and the server console gets a `WARNING` naming the kit, the player and the
  amount — written for the first refusal of each kit in each server session, so an economy
  outage cannot bury the log; `/kits reload` re-arms it (UltiKits/UltiKits#20).

- A successful claim now records the claim before running the kit's configured player and
  console commands, instead of after. A reward command that fails used to leave the player
  charged and holding the items with no claim recorded, which silently made a one-time kit
  claimable again (UltiKits/UltiKits#20).

- After `/upm uninstall UltiTools-Kits`, this module's `/kits` (`/kit`) command is now really removed.
  Previously the command stayed registered until the server restarted, because this module replaced
  the framework's unload method with an empty one (UltiKits/UltiKits#18).


### v1.0.0 (2026-02-13)

Added: Kit system core features
- Added: Paginated GUI browser for viewing all available kits
- Added: GUI editor for admins to drag-and-drop edit kit contents
- Added: `/kits create` command to quickly create kits from current inventory
- Added: `/kits claim` command and GUI click-to-claim
- Added: `/kits list` command to list all kits
- Added: `/kits edit` command to open the visual editor
- Added: `/kits delete` command to remove kits
- Added: `/kits reload` command to reload configurations
- Added: Vault economy integration for kit pricing
- Added: Per-kit cooldown timers
- Added: One-time kits (non-repeatable)
- Added: Player level requirements
- Added: Per-kit permission nodes
- Added: Player and console commands on claim (with `{player}` placeholder)
- Added: YAML configuration with one file per kit
- Added: Base64 item serialization for storage
- Added: Chinese and English language support
