# UltiTrade - Player Trading System

A secure player-to-player trading module supporting items, money, and experience exchange with dual confirmation, BossBar countdown, trade logging, player blacklists, and PlaceholderAPI integration.

## Feature Overview

UltiTrade provides a complete player-to-player trading system for Minecraft servers. Two players initiate a trade via command or Shift+right-clicking each other. The recipient sees clickable [Accept]/[Deny] buttons in chat along with a BossBar countdown at the top of the screen. Once accepted, both players open a 54-slot trade GUI -- the left side holds items you're offering, while the right side displays items the other player has placed in real-time. Beyond item swapping, UltiTrade supports money trading (requires Vault) and experience trading: click the money or experience icon in the GUI and type the amount in chat. After both players confirm, the trade completes automatically, transferring items, money and experience in the checked settlement sequence; see upgrade notes for failure boundaries. If the trade involves large amounts of money or experience (exceeding a configurable threshold), an additional confirmation screen pops up to prevent accidental trades. With logging enabled, completed and cancelled trades are logged to the database, with expired logs cleaned up automatically. Each player can independently toggle their trade availability and maintain a blacklist of players they don't want to trade with.

## Installation

There are two ways to install:

**Method 1: Install via UPM**

```
/upm install UltiTrade
```

**Method 2: Manual installation**

1. Install prerequisites:
   - UltiTools-API 6.3.0+ (required)
   - Vault (required for money trading, optional)
   - PlaceholderAPI (for trade statistics placeholders, optional)
2. Place `UltiTrade-2.0.0.jar` in your server's `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file will be auto-generated at `plugins/UltiTools/pluginConfig/UltiTrade/config/trade.yml`.

## Upgrading to 2.0.0

Back up configuration, trade logs and pending returns, install UltiTools-API 6.3.0 or later, replace `UltiTrade-2.0.0.jar` and restart fully. Catalogue identity `ultitrade` is used for framework update checks and `/upm update`; reload/uninstall uses `UltiTrade`. Vault and PlaceholderAPI are optional: absence no longer stops the whole module loading. Money still needs an actual Vault economy provider and placeholders still need PAPI.

Stop all servers sharing the database, upgrade them together, then restart. Old builds do not understand pending-return CLAIMED state and can redeliver held items. Existing operator values do not automatically become new defaults. Delete never-effective `trade-timeout` and six `messages.toggle-on/toggle-off/block-success/unblock-success/already-blocked/not-blocked` keys to silence per-key startup/reload warnings; the framework does not delete keys for you. Open trades have no automatic timeout; request-timeout controls only unaccepted requests.

### Location policy: checked on send and acceptance

`allow-cross-world: false` always refuses cross-world requests, even with `max-distance: 0`. Zero removes only the same-world distance limit. With true, cross-world requests compare no distance at either zero or positive limits; positive same-world distance limits still apply. Sending, clickable acceptance, `/trade accept` and reverse-request auto-accept use current locations and current configuration. Refused acceptance consumes the request and clears its BossBar without starting a trade. Reload preserves pending requests and their original timeout but acceptance uses the new policy. No continuing distance/world enforcement runs after a trade starts. To disable same-world distance limits without allowing cross-world trades:

```yaml
allow-cross-world: false
max-distance: 0
```

Save, then run `/ul reload UltiTrade`; this does not enable cross-world trading.

### Input, confirmation and reload

Enter 0 to withdraw money/experience; cancel cancels only the prompt, and a 10-second unanswered prompt returns to the trade window. NaN/Infinity are refused. Only an actual offer change clears both confirmations and redraws both windows; empty clicks, opening input and re-entering the same amount do not. A combined money total or experience total **at or above** confirm-threshold needs large-trade confirmation, not only one above it. That page confirms only the shown offer; a changed offer requires another review. Four or more items show three previews and a separate remaining count. Esc/Back on the confirmation page returns to trading; death, disconnect and an unrelated plugin closing/replacing it cancel the trade. Esc on the normal trade window cancels; module-owned prompt/page transitions do not. A refused window open falls back, cancelling/returning stakes if the trade window cannot be restored instead of holding stakes without a UI.

`/ul reload UltiTrade` re-reads configuration/language, looks up economy again, reschedules log cleanup, withdraws newly unavailable money/experience offers with messages, keeps other stakes, clears confirmations and redraws windows. Large-trade pages return to trading for reconfirmation. A failed step/player redraw reports a partial reload with reasons; an old window may show old terms: cancel/reopen and fix the error before confirming. Unavailable amount prompts still accept 0 to withdraw; completion cancels if an unavailable offer somehow remains.

### Items, settlement and persistence boundaries

Lift an item normally from your own inventory, then click a left-side slot. Clicking an occupied offer with a held item swaps them; panes themselves are valid offers. Rearranging your own inventory works, but shift-click, double-click collect and unknown actions stay refused. Previews, disabled icons and empty-slot placeholders cannot be taken, and third parties cannot operate the trade. Taking back items or completing/cancelling drops overflow at your feet. Logs retain actual stakes rather than quantities mutated by inventory merging.

Completion checks both balances and experience first, withdraws both payers, then pays. Explicit refused withdrawals/payments cancel and attempt refunds, moving no items/experience or tax. A failed refund logs both UUIDs, amount and currency at SEVERE for operator correction: this is cross-plugin settlement, not an atomic database transaction. An economy call committing then throwing is treated as refused but its actual result is unknown, possibly creating/destroying money. Check actual provider records using the `Outcome unknown:` log; do not blindly refund twice. The absence of a definite refund-failure log does not mean no refund happened. Experience reads are exact through level 21,863; beyond 2,147,483,647 points experience cannot be offered and a pre-existing offer cancels before transfer. Experience tax floors exact decimals; NaN/nonpositive rates take none. Paper's own rebuilding above about 411,616 points can drift by a few to about 100 points.

A missing participant's cancelled stake is saved in trade_pending_returns. Next join delivers only what fits; the rest remains saved for a later join after freeing space, not dropped then. A failed storage write instead drops at the last location with logs. SQLite/MySQL claim once before delivery and remove after saving; CLAIMED entries left by crash/failed save are not automatically redelivered, and joins ask for admin checks. JSON can redeliver twice after a crash before datasource.flushRate reaches disk. Paper saveData may log failure and return normally, which the module cannot detect.

### Operator checks for pending returns

These commands require both `ultitrade.use` and `ultitrade.admin` and work for players and console. Ordinary commands still require `ultitrade.use` and are player-only. List entries first, inspect the player's inventory and ender chest, then decide whether they actually received the items:

| Command | Meaning | Example |
|---|---|---|
| `/trade pending list` | List held ID, player UUID, items, claim time and server | `/trade pending list` |
| `/trade pending redeliver <id>` | Release a held entry; attempt now if online here, otherwise next join | Replace `<id>` with its real list ID |
| `/trade pending void <id>` | Void/delete without delivery | Replace `<id>` with the verified already-delivered entry ID |

Do not repeatedly redeliver instead of checking, or hand-edit running internal tables. Noncanonical SQLite booleans/numbers can keep settings busy; use module-written forms or repair after stopping/backing up. Settings are cached only online; each toggle/block/unblock/statistics update re-reads and conditionally applies only its change, retrying at most three times. Quit/stop never flush whole settings caches. Retry busy later; not_saved is not success. MySQL commands take two to eight database round trips, joins one read, and offline placeholders query each time: keep latency low. The 50 ms bound is only for waiting on this player's in-flight write, not a total database-call deadline.

### Custom text and unloading

While still built-in text, gui-title and seven active messages follow language on startup/reload; edited values remain. Change at least one character to freeze built-in text, and edit trade.yml directly. The six toggle/block/unblock replies instead use language files: copy module `lang/en.yml` to `lang/en-myserver.yml`, migrate ASCII keys, select language: en-myserver in framework config.yml, then run a full `/ul reload`. Official files restore at startup/module reload, retaining `.bak`; missing custom keys use the official prefix language, or English with a warning without that prefix. All 24 generated comments follow language on startup/bare reload; your own comments remain. `/upm uninstall UltiTrade` cancels/returns stakes and cleans services/PAPI before unregistering commands/listeners. When shutdown cannot schedule log writing, it writes directly.

## Quick Start

After installation, any player with the `ultitrade.use` permission can trade. The simplest workflow:

```
/trade Steve        # Send a trade request to player Steve
```

Steve will see clickable [Accept]/[Deny] buttons in chat. After accepting, both players open the trade GUI:

1. Place items you want to give in the green area on the left side
2. Click the money icon (gold nugget) at the bottom-left to enter a money amount
3. Click the experience bottle icon at the bottom-left to enter an experience amount
4. The right side shows what the other player has offered (hover over items to see enchantments, durability, etc.)
5. When satisfied, click the "Confirm Trade" button at the bottom
6. Once both players confirm, the trade completes automatically

Shortcut: Hold Shift and right-click another player to directly send a trade request.

## Commands

Player trade commands use aliases `/trade` and `/t` and require `ultitrade.use`, player-only. Pending-return administration above instead needs `ultitrade.admin` and supports console; both undeclared nodes default to OP.

| Command | Description | Example |
|---------|-------------|---------|
| `/trade <player>` | Send a trade request to the specified player. If that player has already sent you a request, it auto-matches and starts the trade | `/trade Steve` |
| `/trade accept` | Accept an incoming trade request | `/trade accept` |
| `/trade deny` | Deny an incoming trade request | `/trade deny` |
| `/trade cancel` | Cancel the current trade in progress; items are returned | `/trade cancel` |
| `/trade toggle` | Toggle your own trade availability on/off. When disabled, other players cannot send you trade requests | `/trade toggle` |
| `/trade block <player>` | Add a player to your trade blacklist; they won't be able to send you trade requests (player must be online) | `/trade block Griefer123` |
| `/trade unblock <player>` | Remove a player from your trade blacklist (player must be online) | `/trade unblock Griefer123` |

## Configuration

Config file path: `plugins/UltiTools/pluginConfig/UltiTrade/config/trade.yml`

```yaml
# ==================== Basic Settings ====================
request-timeout: 30                          # Trade request timeout (seconds, range: 5-600)
max-distance: 50                             # Maximum trade distance (blocks, range: 0-1000, 0 removes only same-world distance limit)
allow-cross-world: false                     # Allow cross-world trading

# ==================== Trade Features ====================
enable-money-trade: true                     # Enable money trading (requires Vault)
enable-exp-trade: true                       # Enable experience trading
enable-shift-click: true                     # Enable Shift+right-click on players to initiate trades

# ==================== Tax Settings ====================
trade-tax: 0.0                               # Money trade tax rate (range: 0-1, 0 means no tax, 0.05 means 5%)
exp-tax-rate: 0.0                            # Experience trade tax rate (range: 0-1, 0 means no tax)

# ==================== Confirmation Settings ====================
confirm-threshold: 10000                     # Large trade confirmation threshold (combined money or combined exp at or above this needs a second confirmation)

# ==================== Log Settings ====================
enable-trade-log: true                       # Enable trade logging
log-retention-days: 30                       # Log retention period (days, range: 1-365)
cleanup-interval-hours: 24                   # Log cleanup interval (hours, range: 1-168)

# ==================== Effect Settings ====================
enable-sounds: true                          # Enable trade sound effects (request, accept, complete, cancel, etc.)
enable-particles: true                       # Enable trade particle effects (visual feedback on complete/cancel)
enable-bossbar: true                         # Enable BossBar request countdown (progress bar at top of screen)
enable-clickable-buttons: true               # Enable clickable chat buttons ([Accept]/[Deny] on request)

# ==================== GUI Settings ====================
gui-title: "&6Trade with {PLAYER}"         # Trade GUI title ({PLAYER} is replaced with the other player's name)

# ==================== Messages ====================
messages:
  request-sent: "&aTrade request sent to &f{PLAYER}&a!"
  request-received: "&e{PLAYER} &fwants to trade with you! Type /trade accept to accept"
  request-timeout: "&cTrading request has timed out!"
  trade-complete: "&aTrade completed!"
  trade-cancelled: "&cTrade cancelled!"
  trade-disabled: "&cThat player has trading disabled!"
  player-blocked: "&cThat player has blocked you!"
```


### Configuration reference

| Key | Type | Default (this language) | Constraint |
|---|---|---|---|
| `request-timeout` | number | `30` | 5–600 s |
| `max-distance` | number | `50` | 0–1000 blocks; 0 = same-world only unlimited |
| `allow-cross-world` | bool | `false` | on / off |
| `enable-money-trade` | bool | `true` | on / off |
| `enable-exp-trade` | bool | `true` | on / off |
| `enable-shift-click` | bool | `true` | on / off |
| `trade-tax` | number | `0.0` | 0–1 |
| `exp-tax-rate` | number | `0.0` | 0–1 |
| `confirm-threshold` | number | `10000` | 0–1000000000; >= |
| `enable-trade-log` | bool | `true` | on / off |
| `log-retention-days` | number | `30` | 1–365 days |
| `cleanup-interval-hours` | number | `24` | 1–168 hours |
| `enable-sounds` | bool | `true` | on / off |
| `enable-particles` | bool | `true` | on / off |
| `enable-bossbar` | bool | `true` | on / off |
| `enable-clickable-buttons` | bool | `true` | on / off |
| `gui-title` | text | `"&6Trade with {PLAYER}"` | nonempty |
| `messages.request-sent` | text | `"&aTrade request sent to &f{PLAYER}&a!"` | nonempty |
| `messages.request-received` | text | `"&e{PLAYER} &fwants to trade with you! Type /trade accept to accept"` | nonempty |
| `messages.request-timeout` | text | `"&cTrading request has timed out!"` | nonempty |
| `messages.trade-complete` | text | `"&aTrade completed!"` | nonempty |
| `messages.trade-cancelled` | text | `"&cTrade cancelled!"` | nonempty |
| `messages.trade-disabled` | text | `"&cThat player has trading disabled!"` | nonempty |
| `messages.player-blocked` | text | `"&cThat player has blocked you!"` | nonempty |

### Message Placeholders

| Placeholder | Description |
|-------------|-------------|
| `{PLAYER}` | The other player's name |

## Usage Tutorials

### Scenario 1: Basic Item Trading

Player A wants to trade 10 diamonds to Player B for an enchanted diamond sword:

1. Player A types `/trade B` (or Shift+right-clicks Player B)
2. Player B clicks the green [Accept] button in chat
3. The trade GUI opens; Player A places 10 diamonds in the left green area
4. Player B places the enchanted diamond sword in the left area
5. Both players can see the other's items on the right side (hover for enchantment and durability details)
6. Both click "Confirm Trade"
7. Trade completes, items are swapped

### Scenario 2: Money Trading

If your server has Vault and an economy plugin installed, you can trade money:

1. Start a trade and open the trade GUI
2. Click the money icon (gold nugget) at the bottom-left
3. Type the amount in chat, e.g. `5000` (type `cancel` to cancel)
4. The amount shows in the GUI
5. If tax is configured, the GUI shows the tax amount and what the other player actually receives

### Scenario 3: Experience Trading

1. In the trade GUI, click the experience bottle icon at the bottom-left
2. The system shows your current total experience
3. Type the amount of experience to trade in chat
4. Confirm when ready

### Scenario 4: Large Trade Confirmation

When the combined money or combined experience meets the `confirm-threshold` (default 10000):

1. Clicking "Confirm Trade" opens a confirmation screen instead
2. The confirmation screen shows a full trade summary: items, money, and experience you're giving and receiving, plus tax breakdown
3. Click the green "Confirm Trade" button to proceed
4. Click the red "Cancel" button to return to the trade GUI (this does not cancel the trade)
5. The trade only completes after both players confirm on the confirmation screen

### Scenario 5: Managing Your Blacklist

If a certain player keeps spamming you with trade requests:

```
/trade block Griefer123    # Add to your blacklist
/trade unblock Griefer123  # Remove later if needed
```

Blocked players will see a "The other player has blocked you" message when trying to trade with you.

To temporarily stop all trade requests:

```
/trade toggle    # Disable trading
/trade toggle    # Run again to re-enable
```

### Scenario 6: Setting Up Trade Tax

If you want to charge a 5% money tax and 3% experience tax on all trades:

```yaml
trade-tax: 0.05        # 5% money tax
exp-tax-rate: 0.03     # 3% experience tax
```

Tax is automatically deducted when the trade completes. For example, if Player A offers 1000 coins, the tax is 50, and Player B receives 950.

### Scenario 7: Restricting Trade Distance

To prevent cross-world trading and limit trade distance:

```yaml
allow-cross-world: false    # Disable cross-world trading
max-distance: 50            # Maximum 50 blocks distance
```

## PlaceholderAPI Variables

With PlaceholderAPI installed, the following placeholders are available (identifier prefix: `ultitrade`):

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%ultitrade_total_trades%` | Total number of completed trades | `42` |
| `%ultitrade_total_money%` | Total money traded (given to others) | `15000.00` |
| `%ultitrade_total_exp%` | Total experience traded (given to others) | `8500` |
| `%ultitrade_trade_enabled%` | Whether trading is enabled for the player | `true` / `false` |
| `%ultitrade_enabled_display%` | Trade status (localized display) | `开启` / `关闭` |
| `%ultitrade_is_trading%` | Whether the player is currently in a trade | `true` / `false` |
| `%ultitrade_last_trade_time%` | Time of the last trade | `2026-02-13 14:30` |
| `%ultitrade_last_trade_ago%` | Time since last trade (relative) | `3天前` / `2小时前` / `刚刚` |
| `%ultitrade_blocked_count%` | Number of players in the blacklist | `2` |

## FAQ

### 1. What if the plugin doesn't work after installation?

Check these points:
- Make sure the JAR file is in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)
- Confirm that UltiTools-API 6.3.0 or higher is installed
- Restart the server fully (not just `/ul reload` -- new modules require a full restart)
- Check the console for the "UltiTrade enabled!" log message
- If money trading doesn't work, verify that Vault and an economy plugin (e.g. EssentialsX) are installed

### 2. Config changes not taking effect?

After saving the config file, use `/ul reload` to reload the configuration. Make sure your YAML formatting is correct (indentation must use spaces, not tabs). Check the reload outcome: partial failures can keep old task state, and existing requests keep their old timeout; see the upgrade notes for window/confirmation handling.

### 3. How to set up permissions?

Ordinary trades use `ultitrade.use`, including Shift+right-click; pending-return administration uses `ultitrade.admin`. Set it up with a permissions plugin like LuckPerms:

```
/lp group default permission set ultitrade.use true
```

It's recommended to grant this permission to all players so everyone can trade.

### 4. Money trading shows "not enabled"?

Money trading requires two prerequisites:
- Vault plugin installed
- An actual economy plugin installed (e.g. EssentialsX, CMI, etc.)

Having only Vault without an economy provider won't work.

### 5. What happens when I close the trade GUI?

Closing the trade GUI (pressing Esc or opening another inventory) automatically cancels the trade. Items you placed in the trade GUI are returned to your inventory. If your inventory is full, items drop at your feet.

### 6. What if one player goes offline during a trade?

If either player goes offline during an active trade, the trade is automatically cancelled. Both players' items are returned (the online player gets items in their inventory; a missing participant's items are saved for next join, dropping at the last location only if storage fails). Money and experience are only actually transferred when the trade completes successfully.

### 7. Where are trade logs stored?

Trade logs are stored through UltiTools-API's DataOperator, which means the actual storage depends on your UltiTools storage configuration (SQLite database in `plugins/UltiTools/` by default). Logs are automatically cleaned up based on the `log-retention-days` setting.

## Changelog

### v2.0.0

#### Added

- A console warning for each removed setting still in `config/trade.yml`. The seven settings this
  version removes (`trade-timeout`, and `messages.toggle-on`, `messages.toggle-off`,
  `messages.block-success`, `messages.unblock-success`, `messages.already-blocked`,
  `messages.not-blocked`; see `### Removed`) stay in the file of a server upgraded from an earlier
  version, because the framework never deletes a key from an operator's file. While any of them is
  there with a value, the module logs one warning per key when it is enabled and on every reload of it
  (`/ul reload` or `/ul reload UltiTrade`), naming the file and the key and saying where the setting
  went; the key can simply be deleted. A key left with no value (`trade-timeout:` or `~`) is not
  reported: Bukkit drops it when reading the file, so it reads back as absent
  (UltiKits/UltiTrade#17, UltiKits/UltiTrade#18).

#### Changed

- This version requires UltiTools 6.3.0 or later and declares `api-version: 630` in `plugin.yml`,
  up from `620` in the last released version, 1.0.0. Earlier frameworks cannot load this version;
  update the framework before installing it. Restart the server to load the module
  (`/ul reload` does not load a new module JAR) (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultitrade`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both: a later published version carrying the same key
  is reported at startup and can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- Message and title settings in `config/trade.yml` — the trade-window title (`gui-title`) and the seven
  messages (`messages.request-sent`, `request-received`, `request-timeout`, `trade-complete`,
  `trade-cancelled`, `trade-disabled`, `player-blocked`) — are written in the server's language when the
  module starts, and the file is what the module shows (for example `messages.trade-complete: '&aTrade
  completed!'` under `language: en`); previously they were fixed Chinese text, so `language: en` had no
  effect on them. A setting that is still built-in text — in any language, or a default an earlier
  version shipped — follows `language`: it is rewritten when the module starts or after `/ul reload`. A
  setting you edited is kept. To keep a built-in text but stop it following `language`, change at least
  one character. Under `language: zh` every one of them keeps exactly the Chinese text earlier versions
  shipped. The language entries `request_sent`, `request_received`, `trade_disabled_target` and
  `player_blocked`, which no code reads any more, are removed; the texts written into `trade.yml` come
  from `message_request_sent`, `message_request_received`, `message_trade_disabled` and
  `message_player_blocked` (UltiKits/UltiTrade#16). The text written is this module's built-in text: edit these settings in `config/trade.yml`; an edit of the extracted
  language file does not change them (earlier versions never read them from the language file either).

- The replies to `/trade toggle`, `/trade block` and `/trade unblock` — trading turned on or off, a
  player added to or removed from your trade blacklist, and the refusals for a player who already is
  or is not on it — now come from this module's language file, `lang/<language>.yml` beside the
  `config` folder (entries `trade_toggle_on`, `trade_toggle_off`, `block_success`, `unblock_success`,
  `already_blocked`, `not_blocked`), so they follow the server's `language` setting: English under
  `language: en`, Chinese under `language: zh`. Previously each was a fixed Chinese sentence under
  either setting. The wording is now the language file's, which changes five of the six Chinese
  replies as well: the two toggle replies no longer add a second sentence about whether other players
  can send you trade requests; the already-blocked and not-blocked refusals now say "already in the
  blacklist" and "not in the blacklist" instead of "in your trade blacklist"; and the unblock reply is
  reworded slightly ("removed from the trade blacklist"). Only the block-success reply reads exactly as
  before. In English the already-blocked and not-blocked refusals say "your blacklist". The rest of the
  command's text follows `language` as well; see `### Fixed` (UltiKits/UltiTrade#17).

#### Fixed

- Re-check the shared cross-world and distance policy at acceptance using current player locations
  and configuration, including clickable acceptance and reverse-request auto-accept. Refusal consumes
  the request and its BossBar and starts no trade; a policy reload applies at acceptance without
  invalidating requests during reload (maintainer-approved extension of UltiKits/UltiTrade#79).

- `allow-cross-world: false` now refuses trade requests between worlds even with `max-distance: 0`.
  The world policy is checked independently of the distance limit; zero removes only the same-world
  distance limit. Explicitly allowed cross-world requests remain allowed at both zero and positive
  limits (UltiKits/UltiTrade#78).

- A trade's money now moves only when the economy confirms it. The trade checked each payer's balance, then withdrew and
  paid without reading whether the withdrawal succeeded, so a withdrawal refused after the check (the balance changed,
  for example on another server sharing the economy's database) still paid the other player, and the items still moved.
  Now both payers are withdrawn first; if either withdrawal is refused or fails, whatever was withdrawn is refunded and
  the whole trade is cancelled: no money, experience or item moves, no tax is taken, and both players are told the
  balance changed and nothing was transferred. A payment that is refused or fails cancels the trade the same way, and a
  refund that fails is logged at SEVERE naming both players, their UUIDs, the amount and the currency, and the players are
  then told a balance could not be restored and an operator was notified. Every balance and
  experience check now also runs before anything moves: too little experience used to cancel the trade after the money
  had already moved (UltiKits/UltiTrade#58).

- On servers sharing one database, a stake waiting to be returned to a player is handed over once, not again at every
  server hop. A join used to decide whether an earlier hand-over had reached the player by looking in the player's
  data on its own server, which another server cannot see, so a player who moved between servers was given the same
  items on each. The table now records each hand-over's state: a join first marks the entry CLAIMED with one
  conditional write (only one server can), and the entry is removed once the player's data save returns; the part
  that did not fit becomes a new, unclaimed entry in the same transaction. An entry left CLAIMED by a crash or a failed
  save is never handed over again automatically: the console warns at start-up and on every reload with the number of
  such entries, and the new `/trade pending list`, `/trade pending redeliver <id>` and `/trade pending void <id>`
  commands (permission `ultitrade.admin`, console-usable) list each one (player name and UUID, items, claim time,
  server) and let the operator, after checking the player, hand it over again or discard it; meanwhile the player is
  told at each join that a return is waiting for an administrator's check. All servers sharing the
  database must be upgraded together (see the README's known limitations). An entry that an earlier build had marked
  for hand-over when the server was upgraded is settled from the player's data first, so a single server neither hands
  it over again nor loses it (UltiKits/UltiTrade#55).

- A stake waiting to be returned to a player is no longer handed over when its stored entry was deleted after the
  player's join read it (by an administrator, or by another server sharing the database). The write for the entry
  matched no row and wrote nothing, but the items were given anyway and the entry was treated as updated. The join's
  claim of the entry now does not apply to a deleted row: the hand-over is undone and a line names the player and the
  entry (UltiKits/UltiTrade#53).

- A save of a player's trade settings whose stored row no longer exists is now reported as failed on every storage
  type. The module keeps each player's settings in memory for the server's lifetime, so if their
  `trade_player_settings` row was deleted while the server ran, the next toggle, block, unblock, post-trade
  statistics update or the save at shutdown wrote nothing and passed as saved on SQLite and MySQL (only the JSON
  backend reported it). A change that reaches no row is now logged as `Failed to save player settings: <player>`,
  the same line a failed write logs; there is no save at shutdown any more
  (UltiKits/UltiTrade#52, UltiKits/UltiTrade#54).

- A change to a player's trade settings is no longer lost at the next restart when their stored row was deleted
  while the server ran. Such a save matched no row and wrote nothing (since UltiKits/UltiTrade#52 it was at least
  logged as failed), while the player's chat confirmed the change. The next change now re-creates the row with the
  current settings (those this server last held for the player while they are online here) and logs a WARNING naming
  the player. If another server sharing the database has already created a row
  for that player, the settings are written onto it instead; a player's settings row now takes the player's UUID as
  its id, so two servers creating or re-creating it at once leave one row, not two (UltiKits/UltiTrade#57).

- On servers sharing one database, a player's trade settings and trade statistics changed on another server are no
  longer reverted or lost. The module kept each player's settings in memory for the server's lifetime and wrote that
  whole copy back on every change and again at shutdown, so a setting another server had changed in between went back
  to the old value, and a trade completed on another server was lost from `total_trades` and the money and experience
  totals. Now a player's settings are cached only while the player is online on this server (loaded on join, dropped on
  quit) and never written back: nothing is written at quit or at shutdown. Every change — `/trade toggle`,
  `/trade block`, `/trade unblock`, a new player name at join, and the statistics of a completed trade — reads the
  stored settings again, applies only that change and writes it only if the stored settings still hold what was read;
  otherwise it reads them again and re-applies the change, up to three times. A toggle flips the stored state, so two
  toggles on two servers both count. If another server keeps changing the settings, the module logs
  `Failed to save player settings: <player>: the stored row kept changing …` and tells the player to try again
  (`settings_busy`: "Your trade settings are being saved right now; please try again in a moment."); a change the storage refused is no longer confirmed — the player gets `settings_not_saved` and the
  console line names the player and the error. Three costs come with this: `/trade toggle`, `/trade block` and
  `/trade unblock` now write on the main thread before replying (they wrote in the background), so with MySQL each
  waits for two to eight database round trips; each join does one database read on the main thread; and a placeholder
  for an offline player queries the database on every evaluation (an offline player used to be cached for the
  server's lifetime). A server makes one player's settings writes one at a time; no player waits for another player's
  write. On the main thread a command, a join or a settings read waits at most about 50 ms (one tick) for that player's
  write in progress (the post-trade statistics): a command that would wait longer answers `settings_busy` and changes
  nothing; a join then reads nothing and caches nothing — a new player name is then written by the player's next
  settings write, which always carries the live name — and an uncached read reads the stored settings without caching
  them (UltiKits/UltiTrade#54).

- A trade withdrawal or deposit whose economy call threw now logs a SEVERE line an operator can act on:
  `Outcome unknown: taking <amount> from <player> for a trade failed with an error, so the trade treats it as not
  taken, but the economy may have taken it. Check <player>'s balance for <amount>` (and the same for paying), with
  the amount in full (`12345678.9`, not `1.23456789E7`). It was a WARNING that said only "it counts as refused". The
  trade still counts such a call as refused; a call that committed and then threw is documented as a known
  limitation. A refund or take-back that throws now logs only this line, not also the certain "give it back by hand" /
  "take it back by hand" line, which would have had an operator correct a call that went through a second time; a
  refused refund or take-back keeps that line (UltiKits/UltiTrade#60).

- A player at a very high level no longer reads a negative experience total. From 15,466 levels (for example after
  `/xp set <player> 16000 levels`) the total overflowed, so the experience prompt and the trade window showed a negative
  number and every experience offer was refused as insufficient. The total is now exact up to 21,863 levels. Above
  that it exceeds 2,147,483,647 points and cannot be counted exactly, so such a player cannot offer experience: the
  experience slot and the amount prompt answer `exp_total_unreadable` ("Your experience is too high to be counted
  exactly …"), the trade window shows that line instead of a total, and a trade whose offer was set before the player
  reached such a level is cancelled before anything moves (`cancel_reason_exp_unreadable`). Taking an offer off the
  capped total would have rebuilt the player hundreds of millions of points below their real total. Sums of
  experience past the int range are counted in full: two large offers still require the large-trade confirmation,
  and the logged experience tax and `total_exp_traded` no longer wrap to negative numbers. Paper's own
  experience arithmetic drifting above about 411,616 points is documented as a known limitation (UltiKits/UltiTrade#65).

- `exp-tax-rate: .nan` no longer breaks experience trades: a rate that is not greater than zero, NaN included, takes no
  experience tax. NaN used to throw while the tax was computed — in a completing trade after the money had already
  moved, and in both trade windows (UltiKits/UltiTrade#65).

- `/ul reload UltiTrade` (and a bare `/ul reload`) no longer reports a plain success when part of this module's
  reload failed. If rescheduling the trade-log cleanup task, applying `enable-money-trade`, or voiding open trades'
  confirmations and redrawing their windows fails, or one player's open trade window cannot be redrawn, the module
  still logs that error and runs the rest, and the reply and the framework's reload log line now say the reload was
  partial and name each step that did not reload, with its cause, or the players whose window still shows the
  previous terms (UltiKits/UltiTrade#50).

- `config/trade.yml` now writes its comments in the server's language. All twenty-four comments (every setting
  in the file) used to be Chinese-only, so a fresh install under `language: en` got a file with Chinese comments.
  Each is now a language-file key that the framework resolves in the server's `language` every time it writes
  the file, with an English and a Chinese entry in `lang/en.yml` and `lang/zh.yml`. On an existing server the
  comments the framework wrote on these settings, the Chinese ones earlier versions wrote included, switch to
  the server's language at the next start, and after you change `language` and run a bare `/ul reload`; values are
  untouched, and a comment you wrote yourself is kept as you wrote it (UltiKits/UltiTools-Reborn#611)
  (UltiKits/UltiTrade#51).

- An unrelated plugin refusing the large-trade confirmation page's own `InventoryOpenEvent` no longer
  leaves the player with no trade UI at all while the trade keeps running with both stakes locked. The
  trade window this page was meant to replace is already closed by the time it tries to open, and
  `HumanEntity#openInventory` returns `null` for a refused open rather than throwing, so the failure
  went unnoticed before. The player is now sent back to the trade window instead, exactly as clicking
  the page's own Cancel would -- the trade is not cancelled outright, since nothing about the player's
  offer changed (UltiKits/UltiTrade#47 review).

- A reload that fails to build or open the replacement trade window for an open large-trade
  confirmation page now cancels that trade and returns both stakes, instead of leaving the page
  dismissed and inert (its buttons and Esc now do nothing) while the trade keeps running with both
  stakes locked, recoverable only by someone noticing and cancelling it by hand. The reload's own
  per-player error log for the failed redraw is unchanged (UltiKits/UltiTrade#47 review).

- An unrelated plugin closing a player's large-trade confirmation page, or opening its own window over
  it, no longer leaves the trade running with both stakes locked and no window until someone cancels
  it by hand. Paper reports the identical `PLUGIN`/`OPEN_NEW` reason whether this module's own close
  (a button click, completing or cancelling the trade, a reload redraw) caused it or an unrelated
  plugin did, so those two could not be told apart by the reason alone; every one of this module's own
  closes now marks the page first, and a `PLUGIN`/`OPEN_NEW` close that arrives unmarked is treated as
  terminal, the same as death or disconnect already were (UltiKits/UltiTrade#47 review).

- A money or experience amount a player just typed can no longer be discarded by cancelling their
  trade a tick later. Typing an answer claims it instantly (removed from the pending-prompt map) but
  applies it only afterward, on the server thread; the close-guard's own deferred check -- scheduled
  the instant the prompt itself closed the trade window, before the prompt was even registered -- could
  run in that gap and, seeing no pending prompt, cancel the trade as though the player had never
  answered. The claimed-but-not-yet-applied answer is now tracked separately so the close guard still
  recognises it (UltiKits/UltiTrade#47 review).

- Two console lines name a file path or a world exactly as they are: the warning about a setting this
  version no longer reads, and the error for staked items that could not be saved and were dropped. A path
  or world name containing `{KEY}`, `{REASON}` or `{ITEMS}` used to be rewritten, because it was inserted
  before those placeholders were filled. Every placeholder of the line is now filled in one pass (the same
  fix as UltiKits/UltiMail#37).

- When `/ul reload UltiTrade` makes money trading unavailable (money trading turned off, or no economy
  provider found), the money offered in every open trade is withdrawn and both players are told, so the
  rest of the trade can still complete; experience offers are withdrawn the same way when experience trading
  is turned off. While either is unavailable, its chat prompt accepts `0` to withdraw an offer. Before, such
  an offer could not be withdrawn and the trade could only be cancelled (UltiKits/UltiTrade#28).

- A money or experience prompt left over from a cancelled trade no longer affects a trade the player opens
  afterwards: its 10-second timeout no longer reopens the old trade's window (which cancelled the new trade
  and told both players so), no longer closes a prompt opened in the new trade, no longer stops closing the
  new trade's window from cancelling it, and an amount typed for it is answered with `The trade has ended!`
  instead of being applied to the new trade (UltiKits/UltiTrade#40).

- A trade whose money or experience meets `confirm-threshold` completes once both players have confirmed
  through the confirmation page, exactly as a smaller trade does. Before, the page only recorded the
  confirmation, so such a trade could never complete (UltiKits/UltiTrade#21).

- Clicking Confirm on a trade whose money or experience meets `confirm-threshold` now opens the
  confirmation page and leaves the trade running. Before, closing the trade window to open the page
  cancelled the trade first, returning every item, and the page then opened on a trade that no longer
  existed (UltiKits/UltiTrade#23). The page's Cancel button, or closing the page with Esc, returns to the
  trade window; a page closed for the player (the trade cancelled or completed, a reload, another window
  opened over it) is not treated as Cancel, and only the player the page was shown to can answer it. Its
  Confirm button confirms only the offer the page showed — if either player changed an
  offer while it was open, nothing is confirmed and the player is told to check the trade again. An amount
  typed at the money or experience prompt is applied on the server thread, so it cannot land between
  that check and the confirmation.

- In the trade window, clicking one of your own empty slots with nothing in hand, or opening the money or
  experience prompt, no longer clears both players' confirmations. Confirmations are cleared only when an
  offer actually changes, and both windows are then redrawn; re-entering the amount already offered at
  a prompt is not a change. Before, such a click cleared them without redrawing, so a player still looked
  confirmed while the trade could not complete (UltiKits/UltiTrade#36).

- The money and experience chat prompts refuse `NaN` and `Infinity` with `Invalid amount!`. Before,
  `NaN` was accepted as the money offer; the money transfer was then skipped while the items still moved,
  and the other player saw `NaN` (UltiKits/UltiTrade#29).

- On the large-trade confirmation page, a side offering four or more items shows three item previews
  and the "N more items" count in a slot of its own; the count used to cover the third preview, so only
  two items were visible (UltiKits/UltiTrade#22).

- The large-trade confirmation page's item previews now carry the `---Trade item---` marker line in
  their lore; it was built and then discarded (UltiKits/UltiTrade#43).

- A trade window always shows what both players have staked. Five of the seven ways a trade window
  opens — after the money or experience prompt times out, after a `cancel` reply to the prompt, and on
  the two large-trade confirmation paths — showed an empty trade while both stakes were still in it,
  so a player could confirm a trade whose contents they could not see (UltiKits/UltiTrade#35).

- If a trade is cancelled while one participant cannot be found on the server, that participant's
  staked items are kept and handed back when they next join, instead of being destroyed. They are
  saved in a new table, `trade_pending_returns`; if they cannot be saved they are dropped at the
  player's last known location, and the console names the player and the items in both cases.
  At the join only what fits in the inventory is handed over; the rest stays saved, the player is
  told how many items are still kept and to free some space and rejoin, and nothing is dropped. With
  SQLite or MySQL storage a server crash during the hand-over never duplicates an item; the hand-over is
  held for the operator (see the UltiKits/UltiTrade#55 entry above); with JSON storage the list
  reaches the disk only at the next flush (`datasource.flushRate`), so a crash within that window can
  hand a stake over a second time (UltiKits/UltiTrade#32).

- `language: en` now applies to everything this module shows or logs: every `/trade` reply and its
  help, the trade request (clickable buttons, their hover text and the countdown BossBar), the
  request, accept, deny and cancel replies and every cancellation reason, the trade window and the
  large-trade confirmation page (titles, item names, lore, buttons, tax lines), the money and
  experience input prompts and replies, the PlaceholderAPI display values (`enabled_display`,
  `last_trade_time`, `last_trade_ago`), the command description, and the console lines. Most of this
  was fixed Chinese text in every language, although the language files already held English text for
  much of it that no code read; the console lines were fixed English text and now follow
  `language: zh` too (UltiKits/UltiTrade#16). Language keys were renamed: the few lines that used a
  Chinese sentence as their language key now use ASCII keys. If you customised this module's messages in your own language file -- a copy of an official file
  whose name starts with that file's language code and a hyphen (for example `lang/zh-myserver.yml`),
  selected with `language: zh-myserver` in `plugins/UltiTools/config.yml` -- re-apply those edits to the new
  keys; until then each renamed line shows the text of the official language the name starts with. A copy
  whose name does not start with an official language code and a hyphen is still read, but every message
  it lacks then shows in English, with one warning. An edit made directly in an official language file (`lang/en.yml`, `lang/zh.yml`) is not
  kept: the framework restores the official files at every start and on every module reload and keeps the edited file as `.bak`
  (UltiKits/UltiTools-Reborn#616).

- Reloading this module (`/ul reload UltiTrade`) now re-reads `config/trade.yml` and refreshes the
  language files, so an edited value such as `max-distance` applies without a restart. Previously
  this module's reload method replaced the framework's and only logged a line, so neither step ran.
  UltiTools 6.3.0 also reports `@ConditionalOnConfig` drift and logs its own per-module reload line
  at this point (UltiKits/UltiTrade#15).

- `/ul reload UltiTrade` now also applies `enable-money-trade`, `enable-trade-log` and
  `cleanup-interval-hours`. The module's new reload hook re-runs the Vault economy lookup, so turning
  money trading on or off takes effect without a restart, and reschedules the old-log cleanup task, so
  turning `enable-trade-log` off stops that task, turning it on starts one, and a changed interval
  replaces it. Previously the economy lookup and the cleanup task were set up only when the module
  started, so turning money trading on, and any change to the cleanup task, took effect only after a
  restart. A trade request that is already pending keeps the timeout it was sent with; a changed
  `request-timeout` applies to requests sent after the reload (UltiKits/UltiTrade#26).

- A trade in which either player still has money offered is now cancelled if money trading is not
  available at the moment the trade completes. This completion guard applies only if an unavailable
  money offer is still present; a reload withdraws such offers instead (see below). No money moves, each
  player gets back the items they offered, and both players are told that money trading is currently
  unavailable, instead of the items and experience being exchanged without the offered money. While
  money trading is unavailable, the chat amount prompt also refuses a money amount instead of accepting
  it (UltiKits/UltiTrade#26).

- `/ul reload UltiTrade` now voids the confirmations of every open trade that had one and tells both
  players to confirm again, so a trade no longer completes on terms such as `trade-tax`, `exp-tax-rate`
  or `confirm-threshold` that the reload changed after a player confirmed. A trade in which either
  player still has experience offered is likewise cancelled if `enable-exp-trade` is off when it completes,
  instead of the items being exchanged without the experience, and the chat amount prompt refuses an
  experience amount while `enable-exp-trade` is off (UltiKits/UltiTrade#26).

- `/ul reload UltiTrade` now redraws every open trade window from the reloaded configuration, so its
  title, money and experience availability and taxes match what the trade will charge. Money and
  experience offers made unavailable by the reload are withdrawn and both confirmations are cleared;
  all other offers are kept, and the trade continues for both players to confirm again. An open
  large-trade confirmation page is replaced with a trade window and the trade
  keeps running; the player confirms again from that window (UltiKits/UltiTrade#27).

- Players can no longer take the display item out of the money slot of the trade window while money
  trading is off, out of the experience slot while experience trading is off, or the glass pane out of
  an empty item slot, by clicking it. Every click in the trade window is now cancelled before its action
  runs (UltiKits/UltiTrade#25).

- `/upm uninstall UltiTrade` now runs this module's own cleanup (trade service shutdown,
  PlaceholderAPI expansion unregistration) first, then the framework's command unregistration, then
  its listener unregistration, so after the uninstall the module's commands are really removed and
  its listeners stop firing. Previously this module's unload method replaced the framework's, so both
  its commands and its listeners stayed active until the server restarted (UltiKits/UltiTrade#15).

- Taking a placed item back out of the trade window no longer destroys it when the acting player's
  inventory is completely full: whatever does not fit is now dropped at that player's feet, the same
  overflow handling a cancelled or completed trade already uses when it returns items. Previously the
  item was silently destroyed while the slot reverted to its glass-pane placeholder in both trade
  windows as if the removal had succeeded (UltiKits/UltiTrade#20).

- A stained glass pane that a player placed into one of their own trade slots is no longer destroyed
  when another item is placed over it, and can now be taken back out at all. Which action a click on
  an own item slot performs is now read from the offer the trade session holds, not from the material
  of the item drawn in that slot, so a pane the player offered is no longer mistaken for the
  empty-slot placeholder. Clicking an own slot that already holds an offer while holding an item now
  swaps them: the held item takes the slot and the stored offer returns to the player, dropping at
  their feet if it does not fit. Previously that click destroyed a stored pane outright, and for any
  other stored item it took the item back while leaving the held item on the cursor
  (UltiKits/UltiTrade#31).

- Stopping the server, or uninstalling this module, no longer destroys the items staked in trades that
  are still open. Every stake is now returned — to the player's inventory, or at their feet if it does
  not fit — before anything else happens, and each open trade is closed independently of the others.
  Previously the first thing a cancellation did was schedule the trade-log write, which a stopping
  server refuses; that refusal ended the cancellation before a single item had been returned and
  skipped every remaining trade, and it was reported on the console as this module failing to
  unregister rather than as items being lost. The cancellation is still recorded: when no background
  task can be scheduled, the log entry is written directly instead of being dropped
  (UltiKits/UltiTrade#34).

- The trade log now records the amounts that were actually staked. A stack delivered into an inventory
  that already held a partial stack of the same material was rewritten by that merge, so a trade of 64
  diamonds into an inventory holding 60 was logged as 60 (UltiKits/UltiTrade#37).

- A click in a trade window from anyone other than the two traders is refused. It was handled as though
  it came from the second trader, so a third player who had been shown the window by another plugin
  received that trader's staked item (UltiKits/UltiTrade#38).

- An item can be staked in a trade at all. Every click whose slot belonged to the acting player's own
  inventory was refused, and a click there is the only way a player can lift an item onto the cursor
  while the trade window is open — which is what the slot the item goes into reads. No item could ever
  be offered, by any player, since this module's first release. A drag confined to the player's own
  inventory was refused for the same reason one layer over, taking their own inventory away from them
  while a trade was open. The trade window and the confirmation preview now govern their own slots only.
  Three actions stay refused from an own inventory slot, because they are not confined to the slot
  clicked and would reach into the window: a shift-click, a double-click collect, and an action the
  server reports as unknown (UltiKits/UltiTrade#39).

- This module now loads on a server without PlaceholderAPI installed. The module main class carried
  a field typed directly as `TradePlaceholderExpansion` (a PlaceholderAPI type), so the framework's
  container threw `NoClassDefFoundError` while autowiring the module and the whole module failed to
  load — trading, not just placeholders, was unavailable, present since the module's initial commit
  (UltiKits/UltiTrade#48).

- This module now loads on a server without Vault installed. `TradeService`'s economy field and
  `getEconomy()`'s return type were typed directly as `net.milkbowl.vault.economy.Economy`, and this
  module never declared Vault as a dependency (not even a soft one) in `plugin.yml`, so nothing
  guaranteed Vault's absence was handled — the same crash shape as #48, for a different soft
  dependency, found by a sweep for the same defect class (UltiKits/UltiTrade#49).

- Dying while viewing the large-trade confirmation page now cancels the trade, as do other terminal
  closes described below. Pressing Esc or clicking the page's Cancel (back) button only returns to the
  trade window, keeping the trade and staked items. Paper closes the page on death with
  `InventoryCloseEvent.Reason.DEATH`, which used to be
  treated the same as the module's own close (reload, completion, cancellation) and silently left
  the trade running with no window for either player, holding both stakes until someone ran the
  cancel command by hand.

- Every other reason the server, not this module, can close the large-trade confirmation page for now
  cancels the trade the same way `DEATH` already did: disconnecting, a teleport (on a server old enough
  to still send it — deprecated since Paper 1.21.10, which no longer fires it for a normal teleport),
  the chunk unloading, the server
  otherwise revoking access, or an unrecognised reason. Before this, only `DEATH` cancelled the trade;
  every one of these left it running with both stakes locked and no window for either participant, until
  someone ran the cancel command by hand. A close this module or a reload causes itself (`PLUGIN`,
  `OPEN_NEW`) is unchanged — it never cancels the trade, since the code that caused it already owns the
  session's next state (an unmarked close from another plugin cancels the trade, as described above).

- Every other place this module opens a trade window now recovers the same way the large-trade
  confirmation page already did: a refused `InventoryOpenEvent` returns `null` from
  `HumanEntity#openInventory` rather than throwing, and none of the six other call sites checked for
  it, so an unrelated plugin could leave a player with no window at all while their session kept
  running and, in three of the six, before either side had staked anything, with no way back short
  of a manual cancel. Starting a trade whose first player's own window is refused now cancels that
  still-empty session immediately, without ever showing the second player a window for a trade the
  first never really joined; a refused reopen after a timeout, after answering an amount prompt, or
  after a session-move both-windows redraw all now fall back to cancelling that trade the same way
  (UltiKits/UltiTrade#47 review).

- `plugin.yml` now declares `softdepend: [ PlaceholderAPI, Vault ]`. Both integrations remain optional;
  the module loads without either installed (`UltiKits/UltiTrade#48`, `#49`).

#### Removed

- Seven language entries no code ever read: `confirm_required`, `confirmed`, `confirmation_cancelled`,
  `request_expired`, `trade_started`, `gui_status_confirmed`, `gui_status_pending`. Removing them changes
  nothing players see.

- The module's own reload console line on `/ul reload UltiTrade` (a Chinese sentence meaning
  "UltiTrade config reloaded!", printed in Chinese under either `language` setting), and the
  never-consulted `trade_reloaded` language key that described it. UltiTools 6.3.0 logs one reload line per module
  (`Module 'UltiTrade' reloaded.`) (UltiKits/UltiTrade#15).

- The `trade-timeout` setting in `config/trade.yml`. It never took effect in any version: nothing
  read it, and an open trade window has no time limit at all — it ends only when a player cancels,
  both players confirm, a player quits or a player closes the window. A pending trade *request*
  still expires after `request-timeout` seconds; that setting is unchanged. Removing the setting
  does not reject the feature it described: a time limit for an open trade window is kept on
  record as a feature request, UltiKits/UltiTrade#41 (UltiKits/UltiTrade#18).

- The six settings `messages.toggle-on`, `messages.toggle-off`, `messages.block-success`,
  `messages.unblock-success`, `messages.already-blocked` and `messages.not-blocked` in
  `config/trade.yml`. None of them ever took effect in any version: the commands they describe sent
  fixed text of their own, so editing them never changed what a player saw. Those replies now come
  from the language file (see `### Changed`). To customise them, copy the official language file to one
  whose name starts with its language code and a hyphen (for example `lang/en-myserver.yml`), edit the
  replies there and set `language: en-myserver` in `plugins/UltiTools/config.yml`; an edit made in the
  official file itself is restored at the next start or module reload (UltiKits/UltiTools-Reborn#616). The seven other `messages.*` settings are read and are unchanged
  (UltiKits/UltiTrade#17).


### v1.0.0 (2026-02-13)

Initial release.

Added: Secure dual-confirmation trading mechanism
Added: GUI trade interface (54-slot chest layout, left side for placing items / right side for preview)
Added: Money trading support (requires Vault) with configurable tax rate
Added: Experience trading support with configurable tax rate
Added: BossBar countdown showing trade request remaining time
Added: Clickable [Accept]/[Deny] buttons in chat messages
Added: Shift+right-click on players to quickly initiate trades
Added: Large trade confirmation screen (when money or experience exceeds threshold)
Added: Per-player trade toggle (/trade toggle)
Added: Player blacklist system (/trade block, /trade unblock)
Added: Trade logging (completed and cancelled trades) with automatic expired log cleanup
Added: Trade statistics (total trades, total money, total experience, last trade time)
Added: PlaceholderAPI integration (9 placeholders)
Added: Sound effects for trade actions (request sent, accepted, item placed, completed, cancelled)
Added: Particle effects (green particles on completion, smoke on cancellation)
Added: Item detail hover preview (enchantments, durability, item flags shown on other player's items)
Added: Trade distance limit and cross-world trading control
Added: Auto-match when both players send requests to each other
Added: Fully customizable messages with color code support
