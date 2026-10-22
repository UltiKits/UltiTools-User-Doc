# UltiRemoteBag - Remote Bag

UltiRemoteBag is a UltiTools framework module that provides virtual cloud storage (remote bag) functionality for Minecraft servers. Players can open their remote bags anytime to store and retrieve items. It supports multiple bag pages with exactly 45 storage slots each. The module includes Vault economy integration so players can purchase additional bag pages. Admins can view, create, delete, and clear any player's bags. The bag system has local locks and cross-server database claims that automatically puts admins into read-only mode when the owner is using a bag, preventing data conflicts. All operations have sound feedback.

## Installation

There are two ways to install:

**Option 1: Via UltiTools Plugin Manager**

Run in the server console or in-game:

```
/upm install UltiRemoteBag
```

**Option 2: Manual Installation**

1. Install UltiTools-API 6.3.0 or later and download `UltiRemoteBag-2.0.0.jar`
2. Place the JAR file into the `plugins/UltiTools/plugins/` directory
3. Restart the server

Optional dependency: To use the bag purchase feature, make sure [Vault](https://www.spigotmc.org/resources/vault.34315/) and an economy plugin (e.g., EssentialsX) are installed.

After installation, the configuration file is automatically generated at `plugins/UltiTools/pluginConfig/UltiRemoteBag/config/remotebag.yml`.

## Upgrading to 2.0.0

Back up configuration and the bag database, install UltiTools-API 6.3.0 or later, replace `UltiRemoteBag-2.0.0.jar` and restart fully. Catalogue identity is `ultiremotebag`; framework reload/uninstall uses `UltiRemoteBag`. Update checks and `/upm update` use that identity. Upgrade servers sharing a database together rather than mixing old writers. Startup creates remote_bag_claims without migrating existing tables.

Each page has exactly **45 storage slots**; the bottom row is buttons, not collectible storage. Delete the never-effective, now-removed `rows_per_page`, `auto_save_interval`, `save_on_close`, `gui_title` and `messages.no_permission/page_locked/bag_saved` keys. Startup warns per leftover key; it does not delete keys from your file. Titles use language key bag_name and manual-save confirmation uses bag_saved_manually; access/occupancy messages also come from language files. Use the defaults below as a reference, not a replacement for existing operator values.

### Saving, read-only mode and database outages

Closing an edit window always attempts a save. Its Save button and the owner's `/bag save` also save the open page. There is no fixed 300-second bulk-cache rewrite anymore. With no page open, quit/stop/manual save does not flush display caches; `/bag save` can acknowledge held cached pages or say `Nothing to save`, neither proving a fresh database write. Each window saves only its own page, refusing if stored contents changed. Items put in since the last read/save are returned, dropping leftovers at the player's feet and logging them. `last_updated` advances only on an actual write, not as a liveness signal.

An unanswered database gives a clear not-saved-yet message, keeping contents and the claim in memory for background retries. The page is read-only, with the kept contents visible on this server if reopened. No items are returned while the write can still land; confirmed database refusal returns them, waiting for the next join here if the player is offline. Stop saves open pages and retries pending writes for five seconds, logging undecidable/unfinished saves with items instead of waiting forever or blindly refunding. See the limitations below: this is not a crash-proof losslessness guarantee.

On one server, admins view an owner's open page read-only; an owner is refused while an admin is already editing, with no forced takeover of an active window. Local `lock.timeout_seconds` reclaims an ended, unreleased session, never an idle holder still online with that page open. Across servers the claim holder edits; even the owner elsewhere is read-only, and clear/delete refuse. Renewal runs in the background; another server takes over only after observing no renewal for a full timeout. Both lock timeout and read-only notifications follow `/ul reload UltiRemoteBag`; disabling notifications does not grant edit access. Reopening commands close/save/release the old window first, even if the requested page is then refused.

Read-only refuses bag clicks, shift-clicks, number/off-hand swaps and drags; drags wholly inside your own inventory remain usable. Refresh clears emptied slots and tries edit access only after release. Toolbar items cannot be taken; double-click collection/shift-merge with a matching icon is refused, and cancellations set by other plugins are respected.

### Page numbers, purchases and language

Your own main menu always offers page 1, but admin list/see report only stored pages, including none; admin create starts at page 1. Targets resolve exact online names first, then players who joined before, accepting a first-session player but never partial or never-joined names. New pages use highest existing number plus one, not gaps: with 1 and 3, the next number, price and limit check all use 4. Economy disabled/unavailable offers a free `Create New Bag` button below the limit. A changed economy mode while the window is open refuses that click and redraws; a free icon never charges. The limit is the highest allowed page number, not stored-page count.

After configuration edits run `/ul reload UltiRemoteBag`; new JARs still require a restart. Thirteen economy/sound/lock comments follow language at startup or bare `/ul reload`, preserving values and your own comments. For custom messages copy this module's `lang/en.yml` to `lang/en-myserver.yml`, edit the copy, select `language: en-myserver` in framework `plugins/UltiTools/config.yml`, then reload fully. Official files are restored at startup/module reload with edits retained as `.bak`. `/upm uninstall UltiRemoteBag` performs the bounded save and unregisters commands/listeners. Third-party plugins using its service must adapt removed bulk-cache save methods; do not assume old callers need no update.

### Known limitations and operator actions

Keep a shared database low-latency. Set MySQL connection socketTimeout and a moderate wait_timeout: the latter ends stale sessions; innodb_lock_wait_timeout only bounds each other session's wait and does not release the original lock. Upgrade all sharing servers together; do not hand-edit live bag tables or let another plugin write them. Foreign/old writers can duplicate taken-out items. A very slow open followed by a rapid reopen can lose a claim and duplicate taken-out items. A server frozen/cut off for a full timeout may lose its claim to another server; items taken out since the last save until read-only can duplicate (up to about half a timeout after the cut). Stop/crash during an outage can lose pending in-memory changes and duplicate taken-out items. Returns owed to offline players are also in memory and lost on restart: use the item logs for manual recovery. Stop may take about 16 seconds with a completely unresponsive database. MySQL comparisons use column collation; JSON belongs to one server and offers no cross-server transaction. Foreign/hand-written slots 45–53 are invisible and removed by the first save: repair before opening. Noncanonical +5/05, negative and out-of-range slot keys warn and are skipped. Do not read these features as an unconditional no-loss guarantee.

## Quick Start

After installation, each player starts with 1 bag page (45 slots) by default, with configured maximum page number 10; default permission-based limits still allow 1, so grant a higher page permission before expansion.

1. Type `/bag` to open the bag main page GUI and see all your bags
2. Click a bag icon to open it, then store items as you would in a chest
3. Items are saved automatically when you close the GUI

Below your page-number limit, an available economy shows "Purchase New Bag"; economy off/unavailable shows free "Create New Bag":

```
/bag           # Open the bag main page (view all bags)
/bag 1         # Directly open bag page 1
/bag save      # Manually save bag data
```

## Commands

All commands are player-only and cannot be used from the console.

Command aliases: `/bag`, `/remotebag`, `/rb`, `/yunbag`

### Player Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bag` | Open the bag main page GUI | `/bag` | `ultibag.use` |
| `/bag <page>` | Directly open a specific bag page | `/bag 2` | `ultibag.use` |
| `/bag save` | Manually save bag data | `/bag save` | `ultibag.use` |

### Admin Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/bag see <player>` | View a player's first bag page | `/bag see Steve` | `ultibag.admin.see` |
| `/bag see <player> <page>` | View a player's specific bag page | `/bag see Steve 3` | `ultibag.admin.see` |
| `/bag create <player>` | Create a new bag page for a player | `/bag create Steve` | `ultibag.admin.create` |
| `/bag delete <player> <page>` | Delete a player's bag page | `/bag delete Steve 3` | `ultibag.admin.delete` |
| `/bag clear <player> <page>` | Clear a player's bag page contents | `/bag clear Steve 2` | `ultibag.admin.clear` |
| `/bag list <player>` | List all of a player's bags | `/bag list Steve` | `ultibag.admin.list` |

## Permissions

### Player Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibag.use` | Basic remote bag functionality | OP (grant explicitly to players) |
| `ultibag.pages.1` | Example page permission; without grants use default_pages | Undeclared |
| `ultibag.pages.2` | Access to 2 bag pages | None |
| `ultibag.pages.3` | Access to 3 bag pages | None |
| `ultibag.pages.N` | Access to N bag pages (N is a positive integer, up to `max_pages`) | None |

Page permissions are upward-compatible: a player with `ultibag.pages.5` can have up to 5 bag pages. The system checks downward from the configured `max_pages` value and uses the highest permission number the player has as their limit.

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultibag.admin.see` | View other players' bags | OP |
| `ultibag.admin.create` | Create bags for other players | OP |
| `ultibag.admin.delete` | Delete other players' bags | OP |
| `ultibag.admin.clear` | Clear other players' bags | OP |
| `ultibag.admin.list` | List other players' bags | OP |

## Configuration

Configuration file path: `plugins/UltiTools/pluginConfig/UltiRemoteBag/config/remotebag.yml`

```yaml
# Default number of bag pages for new players (range: 1-100)
default_pages: 1

# Maximum number of bag pages a player can have (range: 1-100)
max_pages: 10

# Enable permission-based page limits
# When enabled, a player's max pages is determined by ultibag.pages.N permission
# When disabled, all players share the max_pages limit
permission_based_pages: true

# Permission prefix (used to calculate page limits)
# For example, with prefix ultibag.pages., a player with ultibag.pages.5 has a limit of 5 pages
permission_prefix: "ultibag.pages."

# Economy settings (requires Vault plugin)
economy:
  enabled: true              # Enable bag purchasing
  base_price: 10000          # Base price for purchasing a bag (range: 0-1000000000)
  price_increase_enabled: true  # Enable price increase per purchase
  price_increase_rate: 0.1   # Price increase rate (range: 0.0-10.0)
                             # Formula: basePrice * (1 + rate)^(n-1)
                             # 0.1 means each additional bag costs 10% more
                             # Example with base price 10000:
                             #   Page 1 formula value = 10000 (normally already free)
                             #   Page 2 = 11000
                             #   Page 3 = 12100

# Sound settings
sound:
  enabled: true                     # Enable sound effects
  open: "BLOCK_CHEST_OPEN"          # Sound when opening a bag
  close: "BLOCK_CHEST_CLOSE"        # Sound when closing a bag
  purchase: "ENTITY_PLAYER_LEVELUP" # Sound on successful purchase
  error: "ENTITY_VILLAGER_NO"       # Sound on error
  volume: 1.0                       # Volume (range: 0.0-1.0)
  pitch: 1.0                        # Pitch (range: 0.5-2.0)

# Lock settings (concurrent access control)
lock:
  timeout_seconds: 300       # Lock timeout (unit: seconds, range: 10-3600)
                             # Only ended, unreleased local sessions are reclaimed
                             # Active open windows keep their local lock
  notify_readonly_viewers: true  # Notify read-only admins when the owner starts using the bag
```


| Key | Default | Constraint / behavior |
|---|---|---|
| `default_pages` | `1` | 1–100; fallback limit without a page grant |
| `max_pages` | `10` | 1–100; page-number limit and permission scan ceiling |
| `permission_based_pages` | `true` | Use page permissions |
| `permission_prefix` | `ultibag.pages.` | Nonempty page permission prefix |
| `economy.enabled` | `true` | Paid when economy available, otherwise free creation |
| `economy.base_price` | `10000` | 0–1000000000 base price |
| `economy.price_increase_enabled` | `true` | Increase with actual page number |
| `economy.price_increase_rate` | `0.1` | 0–10; round final price up |
| `sound.enabled` | `true` | Play sounds |
| `sound.open` | `BLOCK_CHEST_OPEN` | Nonempty open sound |
| `sound.close` | `BLOCK_CHEST_CLOSE` | Nonempty close sound |
| `sound.purchase` | `ENTITY_PLAYER_LEVELUP` | Nonempty purchase sound |
| `sound.error` | `ENTITY_VILLAGER_NO` | Nonempty error sound |
| `sound.volume` | `1.0` | 0–1 volume |
| `sound.pitch` | `1.0` | 0.5–2 pitch |
| `lock.timeout_seconds` | `300` | 10–3600 seconds; not an active local-window lease |
| `lock.notify_readonly_viewers` | `true` | Notify read-only admins when owner starts |

## Usage Tutorials

### Scenario 1: Using Remote Bags for the First Time

You just joined the server and want to try the remote bag feature:

1. Type `/bag` to open the bag main page
2. You will see a chest icon representing your first bag
3. Click the chest icon to open it, and store items just like a regular chest
4. Items are saved automatically when you close the GUI
5. Next time, type `/bag` or `/bag 1` to reopen it

### Scenario 2: Purchasing More Bags

Your first bag is almost full and you want more storage space:

1. Type `/bag` to open the main page
2. At the end, you will see a "Purchase New Bag" button showing the price and your balance
3. If you can afford it (green button), click to purchase
4. If you cannot afford it (red button), you need to earn more money first

Price is rounded up and uses the actual page number (base 10000, increase 10%); page 1 is normally already offered free:
- Page 1 formula value (normally already free): 10000
- Page 2: 11000
- Page 3: 12100
- Page 4: 13310

### Scenario 3: Admin Viewing a Player's Bag

An admin suspects a player may have obtained items through cheating and wants to inspect their bags:

1. Type `/bag see PlayerName` to view their first bag page
2. Or `/bag see PlayerName 3` to view a specific page
3. If the player is currently using that bag, the admin will automatically enter read-only mode
4. In read-only mode, items cannot be moved, and a refresh button appears in the toolbar
5. After the player closes their bag, click the refresh button to switch to edit mode

### Scenario 4: Admin Managing Bags

```
/bag list Steve        # View an overview of Steve's bags (item counts, slot usage)
/bag create Steve      # Create a new bag page for Steve
/bag clear Steve 2     # Clear the contents of Steve's bag page 2 (page is kept)
/bag delete Steve 3    # Completely delete Steve's bag page 3
```

Note: If the target bag is currently in use (locked), delete and clear operations will be rejected.

### Scenario 5: Controlling Bag Pages with Permissions

You can use a permissions plugin like LuckPerms to precisely control how many bag pages different groups can have:

```
/lp group default permission set ultibag.use true
/lp group default permission set ultibag.pages.1 true   # Default group: 1 page
/lp group vip permission set ultibag.pages.3 true       # VIP group: 3 pages
/lp group svip permission set ultibag.pages.5 true      # SVIP group: 5 pages
/lp group admin permission set ultibag.pages.10 true    # Admin group: 10 pages
```

Make sure `permission_based_pages` is set to `true` in the configuration file.

## Locking Mechanism

UltiRemoteBag coordinates edits with local locks and database claims. The following rules are local; see the upgrade notes for cross-server and failure boundaries:

**Owner accessing their own bag:**
- No one is using the bag -> Enter edit mode directly
- An admin is editing it -> Blocked, told to try again later

**Admin accessing someone else's bag:**
- No one is using the bag -> Enter edit mode
- The owner is using it -> Automatically enter read-only mode
- Another admin is editing it -> Blocked, told to try again later

**Lock timeout:** Default 300 seconds; only ended, unreleased local sessions are reclaimed, never active open pages. Cross-server claims use background renewal and a full observed timeout before takeover, as described above.

**Cleanup on quit:** When a player leaves the server, all locks they hold are automatically released, bag data is saved to the database, and the memory cache is cleared.

## FAQ

**Q: What if the plugin doesn't work after installation?**

A: Check the following:
1. Make sure UltiTools-API is version 6.3.0 or higher
2. Confirm the JAR file is placed in `plugins/UltiTools/plugins/`, not the `plugins/` root directory
3. A server restart is required after installation; `/ul reload` only reloads configuration, it cannot load new module JARs
4. Check the server console for any error messages

**Q: Config changes not taking effect?**

A: After modifying `plugins/UltiTools/pluginConfig/UltiRemoteBag/config/remotebag.yml`, run `/ul reload` to reload the configuration. Make sure you have not broken the YAML indentation format.

**Q: How to set up permissions?**

A: All UltiRemoteBag permissions start with `ultibag.`. We recommend using a permissions plugin like LuckPerms.

To control bag page limits, enable `permission_based_pages` and assign `ultibag.pages.N` to different groups:

```
/lp group vip permission set ultibag.pages.5 true
```

Admin permissions are separate and can be assigned as needed:
```
/lp group admin permission set ultibag.admin.see true
/lp group admin permission set ultibag.admin.create true
```

**Q: Why can't I see the purchase button?**

A: There are several possible reasons:
1. `economy.enabled: false` changes it to a free-create icon
2. An unavailable economy also shows free-create, not no icon
3. You have already reached the maximum bag page limit

**Q: Why is the admin view read-only?**

A: When the bag owner is currently using that bag, the admin automatically enters read-only mode to prevent data conflicts from two people editing simultaneously. After the owner closes the bag, the admin can click the "Refresh" button in the GUI toolbar to attempt switching to edit mode.

**Q: Will bag data be lost when a player logs out?**

A: Quit attempts to save the open edit window, then releases locks/caches. An unanswered database can leave changes only in memory, vulnerable to stop/crash. There is no 300-second bulk-cache save. Check replies/logs and follow Known limitations and operator actions.

**Q: Where is the data stored?**

A: It depends on the UltiTools-API storage backend configuration (in config.yml):
- **SQLite** (default): Data is stored in a database file under `plugins/UltiTools/`
- **MySQL**: Data is stored in a remote MySQL database
- **JSON**: Data is stored in JSON files under `plugins/UltiTools/`

**Q: What is the difference between delete and clear?**

A: `/bag clear` empties the contents of a bag page (all items are removed) but keeps the page itself. `/bag delete` completely removes the bag page, including the database record.

## Changelog

### v2.0.0

The never-displayed opening_bag language entry from Unreleased was removed without changing visible output. Earlier claims about bulk-cache saves at stop, guaranteed writes on clean stop, restart-only timeout and fixed-Chinese occupancy messages are superseded by the final behavior below. The README server/Java badge claim was withdrawn.

#### Added

- **One bag page is edited on one server at a time** when several servers share one database. Opening a page
  for editing claims it in a new database table, `remote_bag_claims`; while another server holds the page it opens
  read-only on this server, for the owner and for administrators alike, with the line "This bag page is being
  edited on another server; it is open in read-only mode", and an administrator's `/bag clear` and `/bag delete`
  of that page are refused as for a page in use. The claim is released when the window closes, when its player
  quits and when the module stops. While the window is open, the server renews the claim on a background task, so a
  stalled main thread does not lose it; another server may take a claim over only after seeing it unrenewed for a
  full `lock.timeout_seconds` on its own clock, so a crashed server's claim lets go by itself and disagreeing clocks
  change nothing. If a claim is ever lost, the window turns read-only at once and gives back the items put in
  since its last save. On one server nothing changes: the owner still outranks an administrator. The table is
  created on the first start; no existing table changes and nothing is migrated. Known limitation: a writer that
  does not use the claim -- an older version of this module during a rolling upgrade, another plugin, a hand edit of
  the table -- can still change a page under an open window; an item taken out during that session can then exist
  twice (README, "Known limitations") (UltiKits/UltiRemoteBag#54).

- **A bag page survives a database that does not answer.** Every database call of the edit claim and of a page
  save is given up on after a sixth of `lock.timeout_seconds` (at most two seconds while the main thread waits),
  and one call that hangs no longer holds up the claims of other pages. If the claim's renewal fails or does not
  answer, the window turns read-only at once and what it shows is saved as soon as the database answers. If a save
  fails or does not answer -- at close, on the Save button, at quit or by `/bag save` -- the claim is kept, the
  changes stay in memory and the same save is retried in the background until it lands; meanwhile the page is
  read-only everywhere and a reopen on this server shows the kept changes. Nothing is given back while such a save
  can still land. Only a save the database refuses gives back the items put in (at the next join if the player has
  left). Module stop now saves the pages still open for editing, keeps trying kept saves for five seconds and logs,
  with their items, those it could not write. Every page save is fenced on the claim: one database transaction
  checks that the claim is still this server's and writes the page, so a save held up past another server's
  takeover writes nothing, and a save that reported an error is given back only when its receipt shows it was not
  written; at module stop that receipt is read behind any save still running on the database, and a save that
  cannot be decided in time is logged, not given back. `/bag clear` and `/bag delete` claim the page for their own action.
  Known limitation: a kept save is held in memory and a server crash loses it, as it loses an unsaved window
  (README, "Known limitations") (UltiKits/UltiRemoteBag#54).

#### Fixed

- **Bag pages on servers that share one database.** A bag page changed on another server sharing the database is
  no longer overwritten by an old copy held on this server, so an item taken out there no longer comes back here
  (duplicated), and an item put in there is no longer lost. Each server kept every page of a player's bag in memory
  from the first read -- also after an administrator only looked at another player's bag with `/bag see` or
  `/bag list` -- and wrote the whole copy back: every cached page of that player on any save, and every cached page
  of every player when the module stopped. Now nothing is written from that copy. A page is saved only from its own
  window, only that page, and only if the stored page is still what the window read when it opened (or last saved);
  otherwise nothing is written, the console logs `Failed to update bag data`, the player sees the existing
  "The save did not reach the database" line, and the items put into the window since it read the page are given
  back to the player (what does not fit drops at their feet; one console line lists them). Creating, clearing and deleting a page are decided on what is stored
  at that moment, and write only that page. Stopping or unloading the module, quitting, and `/bag save` with no page
  open write nothing (every change is written when it is made; `/bag save` still answers `Bag saved manually!` when
  this server holds any of your pages). A copy of another player's bag is dropped when the administrator's window
  closes or the command is done, unless that player is on this server (UltiKits/UltiRemoteBag#54).

- A bag save whose stored row has been deleted in the meantime is now reported as not saved. On a MySQL
  database shared by several servers, an administrator on another server who deletes a bag page at the moment
  this server saves it made that save write nothing while `/bag save` still answered that the bag was saved;
  now the save logs `Failed to update bag data` and the save is reported as failed (UltiKits/UltiRemoteBag#50;
  since UltiKits/UltiRemoteBag#54 a save writes only its own page).

- `config/remotebag.yml` now writes its comments in the server's language. Thirteen comments (the `economy.*`,
  `sound.*` and `lock.*` settings) used to be Chinese-only, so a fresh install under `language: en` got a file
  with Chinese comments. Each is now a language-file key that the framework resolves in the server's `language`
  every time it writes the file, with an English and a Chinese entry in `lang/en.yml` and `lang/zh.yml`. On an
  existing server the comments the framework wrote on these thirteen settings, the ones earlier versions wrote
  included (also the two older comments above `lock.timeout_seconds`, release v1.0.0's and the later bilingual
  one, UltiKits/UltiRemoteBag#52), switch to the server's language at the next start, and after you change
  `language` and run a bare `/ul reload`; values are
  untouched, and a comment you wrote yourself is kept as you wrote it (UltiKits/UltiTools-Reborn#611)
  (UltiKits/UltiRemoteBag#48).

- When an administrator has deleted one of a player's middle bag pages (for example the player keeps pages 1
  and 3), the next-page icon, its price, the page limit and the page that is created now all use the same page
  number, the one after the highest page the player has (page 4 in the example). Before, the icon and the price
  counted pages instead and said "page 3" while page 4 was created, and at a limit of 3 the purchase took the
  money and then refused to create page 4. Now the icon is not offered when the next page number is above the
  limit, so nothing is charged for a page that cannot be created (UltiKits/UltiRemoteBag#46).

- The module loads on UltiTools-API 6.3.0 again. Its start-up warning about settings removed in 6.3.0 that
  are still in `config/remotebag.yml` used to read the configuration object that 6.3.0 removes, so on 6.3.0
  the module was refused at load with a `NoSuchMethodError`. It now asks the framework whether each removed
  key is present in the file (`isPresentInFile`), with the same warnings in the same order and language as
  before: one per removed key still in the file, none for a file without them, and none for a file the
  framework could not parse (UltiKits/UltiRemoteBag#49).

- With `economy.enabled: false`, or no economy plugin installed, the bag list window (`/bag`) now shows
  a green `Create New Bag` icon while the player is under their page limit; clicking it adds the next page
  for free and answers `Created bag #<n>!`. Before, only the paid purchase icon existed, and it was hidden
  whenever the economy was off, so such a server had no way to add a bag page (UltiKits/UltiRemoteBag#25).
  If the economy comes on or goes off while the window is open, a click on either icon does nothing,
  answers `The price of a new bag has changed. Check the menu again.` and redraws the window, so a free
  icon never charges and a priced one never acts for free.

- The administrator commands `/bag see`, `/bag create`, `/bag delete`, `/bag clear` and `/bag list`
  now accept a player who is online in their very first session: the target is found by exact name
  among online players first, and anyone else is found, as before, when the name has joined this server
  before. Before, all of them answered `Player not found` for an online first-time player, because they
  relied only on Bukkit's "played before" record, which is not written until the first session ends. A
  name that has never joined is still not found, and a partial name never matches an online player
  (UltiKits/UltiRemoteBag#30).

- `/bag list <player>` and `/bag see <player>` now report a player with no stored bag page as having
  none (`No bags` / `Player <player> has no bags`), including after an administrator deletes every
  page; before, page 1 was always listed. A player's own `/bag` always offers page 1, stored or not, so
  a player who adds page 2 before ever using page 1 keeps page 1; `/bag create <player>` for a player
  with no stored page now creates page 1 (UltiKits/UltiRemoteBag#26).

- In a read-only bag page, pressing a number key or the off-hand swap key over an empty slot now
  answers `Read-only mode, cannot move items` and plays the error sound like every other refused move;
  before, it was refused silently. Nothing could move either way (UltiKits/UltiRemoteBag#35).

- `lock.timeout_seconds` in `config/remotebag.yml` now follows `/ul reload UltiRemoteBag`: the lock
  service reads it each time it decides whether a lock can be reclaimed. Before, the value was copied
  once when the module loaded, so a changed timeout took effect only after a server restart
  (UltiKits/UltiRemoteBag#39).

- Re-running `/bag <page>` or `/bag see <player> <page>` on a page you already have open no longer
  releases its lock, so two players can no longer edit the same page at once (UltiKits/UltiRemoteBag#41).
  These two commands, and `/bag see <player>`, now close whatever window you have open before they
  decide the lock, so a page you had open is saved and released first, also when the page you asked
  for is then refused.

- `language: en` now applies to the line shown when somebody else holds the bag page you open:
  "This bag is being used by &lt;name&gt;; it is open in read-only mode", "This bag is being used by
  &lt;name&gt;, please try again later" and "This bag is being edited by admin &lt;name&gt;, please try again
  later" were fixed Chinese text in every language (UltiKits/UltiRemoteBag#20). The `/bag` command's
  description (shown by `/help`) now follows `language` too.

- `language: zh` now applies to the console lines that were fixed English text: the module's
  enabled and disabled lines (which the language files already carried), the warning about a
  setting this version no longer reads, a skipped unreadable slot when a bag page is loaded, and a
  failed bag write or read. Their English wording is unchanged, except that the warning for a
  leftover `messages.page_locked` now says the someone-else-holds-the-page lines come from the
  language files, where it used to point at this issue as still open.

- `/ul reload UltiRemoteBag` now reloads this module's configuration and refreshes its language
  catalogue; previously this module replaced the framework's reload step, so neither happened and
  an edited `config/remotebag.yml` took effect only after a restart (UltiKits/UltiRemoteBag#12).

- Unloading this module with `/upm uninstall UltiRemoteBag` now really removes its commands and
  stops its listeners firing, where previously both stayed active until the server restarted.
  Open edit windows are saved through the bounded shutdown described above, not from cached bags
  (UltiKits/UltiRemoteBag#12, UltiKits/UltiRemoteBag#54).

- Viewing another player's bag read-only (`/bag see <player>` while that player is holding the page
  open) no longer lets the viewer move items. A normal click, a shift-click in either direction, a
  number-key swap and a drag are all refused now, and the greyed-out Save icon can no longer be
  picked up out of the toolbar. Previously every one of these went through while the "Read-only
  mode, cannot move items" refusal was still being shown, so an item could be taken out of another
  player's bag and duplicated (UltiKits/UltiRemoteBag#27).

- Editing your own bag page now works for every gesture: clicking, shift-clicking and number-key
  swapping within the page, and dragging. Previously every click on one of the page's own 45 content
  slots was cancelled and so was every drag, so an item could only be put in by shift-clicking it
  from your own inventory, and could never be rearranged or taken back out by clicking
  (UltiKits/UltiRemoteBag#27).

- The toolbar icons on the bottom row of a bag page (Back, Refresh, Save, the mode indicator, the
  fillers and Close) can no longer be picked up as items, in either mode; clicking one still
  performs its action (UltiKits/UltiRemoteBag#27).

- `/bag save` now stores an item placed into a bag page that is still open. Previously it saved
  only what had already reached the plugin's cache — which happens when the page's own Save button
  is clicked, or when it is closed in edit mode — so an item placed and then saved with `/bag save`
  was reported as saved and then lost on the next restart (UltiKits/UltiRemoteBag#22).

- Loading a bag page no longer destroys it when `rows_per_page` is set below 5. The page is read
  back at whatever size its stored slots need, so an item saved from one of the content GUI's
  higher slots survives; previously the load threw out of bounds, the failure was swallowed, and
  every item on that page was silently lost. A single unreadable entry in a stored page (a
  non-numeric or negative slot key, or one at or beyond slot 54) is now skipped with a `WARNING`
  naming the page and the key, instead of costing the whole page. Slots 45 to 53 are read but are
  not shown: the window holds 45, so an item stored in that band is invisible and is deleted by the
  first save of that page. Nothing this module writes can land there — it saves exactly 45 slots —
  so only a hand-edited or foreign-written row can hold one, and such a row should be repaired
  before the page is opened. The GUI has always shown and saved 45 slots, and
  `rows_per_page` has since been removed entirely, so a page's capacity is now that fixed 45 and
  nothing claims otherwise; see the `Changed` and `Removed` entries below
  (UltiKits/UltiRemoteBag#24).

- An administrator no longer takes an edit lock from an owner who has the page open, however long that
  owner idles. `lock.timeout_seconds` reclaims a lock whose holder's session ended without releasing
  it; it is not a lease a present holder has to renew. Previously the lock was handed over once the
  configured timeout elapsed even though the owner was still looking at the page, and the owner's next
  save then wrote a snapshot taken before the administrator existed over the row — destroying whatever
  the administrator had added, or restoring an item the administrator had taken out so that it existed
  twice. The administrator is now told why their view is read-only instead of being downgraded
  silently (UltiKits/UltiRemoteBag#34).

- A toolbar button can no longer be collected out of a bag page, or have one of your items merged
  into it. Two vanilla actions are not confined to the slot you clicked — a double-click sweeps
  matching stacks out of the whole page, and a shift-click from your own inventory looks anywhere in
  the page for somewhere to put the stack — so if you were holding an item identical to one of the
  buttons, the button could be taken (and reappear when the page was reopened, duplicating it) or
  your item could vanish into the button row and be lost when the page closed. Both are refused now,
  with a line saying why. Holding such an item is realistic on a server upgrading from a version
  where the buttons could be picked up (UltiKits/UltiRemoteBag#34).

- A save whose database write fails now says so instead of confirming a save. The page's own Save
  button, `/bag save` and closing the page in edit mode all reported success whenever the copy into
  memory succeeded, even when the write to the database did not, so an edit that existed only in
  memory was reported as stored and then lost on the next restart. "Nothing to save" and "the save
  failed" are also told apart now, because they ask different things of the operator
  (UltiKits/UltiRemoteBag#34).

- The read-only Refresh button now clears a slot the owner has emptied since you opened the view.
  Previously it drew only what was stored and left everything else as it was, so a refreshed view
  could keep showing an item the owner had already taken out (UltiKits/UltiRemoteBag#34).

- A bag page no longer overrides another plugin's decision to cancel a click or a drag. Previously
  editing your own page cleared a cancellation an anti-cheat or region plugin had already set
  (UltiKits/UltiRemoteBag#34).

- A hand-edited or foreign-written stored page whose slot key is written `+5` or `05` no longer
  silently drops an item: such a key parses to the same slot as its plain form and one of the two
  items disappeared with no warning. It is now skipped with the same warning as any other unreadable
  key, and those warnings now carry this module's own log prefix like every other line it emits
  (UltiKits/UltiRemoteBag#34).

- A drag confined to your own inventory is no longer refused while you are viewing somebody else's
  bag read-only. Read-only guards the bag, not your own inventory, which is already how clicking
  behaves. And a drag that IS refused now says why, in both modes, instead of failing silently
  (UltiKits/UltiRemoteBag#34).

- `/bag save` now reports only a save it actually performed. With nothing cached to save — a fresh
  login that has not opened a page — it says so instead of confirming a write that did not happen, and
  it no longer persists every cached page twice when it flushed an open page (UltiKits/UltiRemoteBag#34).

- `lock.notify_readonly_viewers` now decides whether an administrator viewing a bag read-only is
  told when the owner starts using it again. Previously the line was sent whatever the setting
  said, so `lock.notify_readonly_viewers: false` did nothing; now it is honoured. The declared
  default is unchanged at `true`, which is what every server has been doing, so no server's
  behaviour changes until its operator turns it off. The setting is read each time rather than at
  startup, so `/ul reload UltiRemoteBag` applies a change without a restart. The neighbouring
  `lock.timeout_seconds` now also follows reload, as described above (UltiKits/UltiRemoteBag#39)
  (UltiKits/UltiRemoteBag#19).

#### Changed

- This version requires UltiTools 6.3.0 or later and declares `api-version: 630` in `plugin.yml`,
  up from `620` in the last release, 1.0.0. An older framework refuses the module
  before its start-up runs, with a warning that the UltiTools version is outdated; the refusal names
  the module by its `plugin.yml` `name:`, `UltiRemoteBag`. The README's framework minimum and its
  UltiTools-API badge say UltiTools 6.3.0+. Adding or replacing a module JAR needs a server restart;
  `/ul reload` does not load it (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultiremotebag`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- The main menu's `Slots Used: x/y` line now reports a page's real capacity. A full page reads
  `Slots Used: 45/45`. It used to read `Slots Used: 45/54` at the shipped settings — promising nine
  slots a player could never fill — and `Slots Used: 45/18` on a server that had lowered
  `rows_per_page`, reporting more used than the page was said to hold. The denominator was that
  setting; a page's capacity has always been a fixed 45 (UltiKits/UltiRemoteBag#24).

#### Removed

- **For plugin authors:** the public `RemoteBagService#setBagPage`, `#saveBag` and `#saveAllBags`
  methods from released 1.0.0 have been removed. Update and recompile third-party callers: read each
  page with `readPage(UUID, int)`, keep its `PageRead`, and pass it with the edited items to
  `savePage(UUID, int, ItemStack[], PageRead)`. A non-null result is the baseline for the next save;
  `null` means nothing was written and must be handled as an unsuccessful save. This is a
  conditional, single-page write, not a direct equivalent of the old cache setter or bulk saves;
  the display cache is never flushed to the database (UltiKits/UltiRemoteBag#54).

- Removed the module's own 'configuration reloaded' console line; UltiTools 6.3.0 logs one reload
  line per module.

- `auto_save_interval` never controlled the save period and has been removed; it can be deleted
  from existing files. The fixed 300-second cache rewrite is also removed: a page is saved by its
  own window, and a failed or unanswered save is kept and retried in the background as described
  above. A stop or crash during a database outage can still lose kept changes; see README,
  "Known limitations". `last_updated` now advances only when the page is actually written, not
  every 300 seconds on an idle cached page; external tools must not use it as a liveness signal
  (UltiKits/UltiRemoteBag#13, UltiKits/UltiRemoteBag#23, UltiKits/UltiRemoteBag#54).

- `gui_title` never took effect and has been removed; it can be deleted from existing files. A bag
  page's title comes from this module's language files, key `bag_name` -- which is why an English
  server already shows an English title and editing this setting changed nothing
  (UltiKits/UltiRemoteBag#14).

- `messages.no_permission` never took effect and has been removed; it can be deleted from existing
  files. A permission refusal comes from UltiTools' own translated message, so it already follows
  the server's `language` setting (UltiKits/UltiRemoteBag#15).

- `messages.page_locked` never took effect and has been removed; it can be deleted from existing
  files. Asking for a page you may not open is answered from this module's language files, key
  `page_out_of_range`; the page limit that refusal reports is the permission-derived one, so it is
  the same situation this setting described, and it is already translated. The separate lines shown
  when somebody **else** holds the page now also come from the module's language files, keys
  `bag_read_only_in_use`, `bag_blocked_in_use` and `bag_blocked_by_admin`, as described above
  (UltiKits/UltiRemoteBag#16, UltiKits/UltiRemoteBag#20).

- `messages.bag_saved` never took effect and has been removed; it can be deleted from existing
  files. `/bag save` confirms with this module's language files, key `bag_saved_manually`
  (UltiKits/UltiRemoteBag#17).

- A server whose `config/remotebag.yml` still holds any of the settings removed above now logs one
  warning per key at startup, naming the module, the file and the key, and saying where that
  setting's job went instead. Removing a key from the code does not remove it from anybody's file,
  so without this an operator who had edited one of them would see no trace of the removal at all
  (UltiKits/UltiRemoteBag#13, #14, #15, #16, #17, #18, #23).

- `save_on_close` never took effect and has been removed; it can be deleted from existing files.
  Closing a bag page in edit mode always saves it, which is what this module has always done, so no
  server's behaviour changes. It was briefly wired instead, and that was reversed: with the setting
  off, an item the player had dragged into the window was destroyed — it had already left their own
  inventory, and nothing handed it back. Wanting a page that only saves on demand is reasonable and
  is recorded as UltiKits/UltiRemoteBag#37, with the constraint that any implementation must return
  the window's contents when it declines to save (UltiKits/UltiRemoteBag#18).

- `rows_per_page` has been removed; it can be deleted from existing files. A bag page holds a fixed
  45 slots, and nothing an operator could set ever changed that. The setting was a floor on the
  array a page is loaded with, the size of a newly created or cleared page, and the denominator of
  the `Slots Used` line — never a cap, and never the size of the window, which the code fixes at
  45 in both directions. Its only visible effect was that denominator, and it was wrong: see the
  `Changed` entry above. Nothing an operator has stored is affected, because what a page holds does
  not change. Making capacity genuinely configurable is wanted and is recorded as
  UltiKits/UltiRemoteBag#38 (UltiKits/UltiRemoteBag#24).


### v1.0.0 (2026-02-13)

Initial release.

Added:
- Added: Multi-page remote bag system with up to 54 slots per page
- Added: GUI main page showing all bag thumbnails (item counts, slot usage)
- Added: Edit mode and read-only mode with full concurrent access locking mechanism
- Added: Vault economy integration for purchasing new bag pages with price increase formula
- Added: Permission-based bag page limits (`ultibag.pages.N`)
- Added: Admin commands (see, create, delete, clear, list player bags)
- Added: Auto-save functionality (timed save, save on GUI close, save on quit)
- Added: Configurable sound effects (open, close, purchase, error sounds)
- Added: Lock timeout mechanism to prevent deadlocks from abnormal disconnects
- Added: Automatic lock release and data save on player quit
- Added: Chinese and English language support
