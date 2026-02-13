# UltiTrade - Player Trading System

A secure player-to-player trading module supporting items, money, and experience exchange with dual confirmation, BossBar countdown, trade logging, player blacklists, and PlaceholderAPI integration.

## Feature Overview

UltiTrade provides a complete player-to-player trading system for Minecraft servers. Two players initiate a trade via command or Shift+right-clicking each other. The recipient sees clickable [Accept]/[Deny] buttons in chat along with a BossBar countdown at the top of the screen. Once accepted, both players open a 54-slot trade GUI -- the left side holds items you're offering, while the right side displays items the other player has placed in real-time. Beyond item swapping, UltiTrade supports money trading (requires Vault) and experience trading: click the money or experience icon in the GUI and type the amount in chat. After both players confirm, the trade completes automatically, exchanging items, money, and experience simultaneously. If the trade involves large amounts of money or experience (exceeding a configurable threshold), an additional confirmation screen pops up to prevent accidental trades. All completed and cancelled trades are logged to the database, with expired logs cleaned up automatically. Each player can independently toggle their trade availability and maintain a blacklist of players they don't want to trade with.

## Installation

There are two ways to install:

**Method 1: Install via UPM**

```
/upm install UltiTrade
```

**Method 2: Manual installation**

1. Install prerequisites:
   - UltiTools-API 6.2.0+ (required)
   - Vault (required for money trading, optional)
   - PlaceholderAPI (for trade statistics placeholders, optional)
2. Place `UltiTrade.jar` in your server's `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file will be auto-generated at `plugins/UltiTools/UltiTrade/config/trade.yml`.

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

All commands use the aliases `/trade` and `/t`. The permission node for all commands is `ultitrade.use`. All commands are player-only (not available from console).

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

Config file path: `plugins/UltiTools/UltiTrade/config/trade.yml`

```yaml
# ==================== Basic Settings ====================
request-timeout: 30                          # Trade request timeout (seconds, range: 5-600)
trade-timeout: 120                           # Trade window timeout (seconds, range: 30-600)
max-distance: 50                             # Maximum trade distance (blocks, range: 0-1000, 0 for unlimited)
allow-cross-world: false                     # Allow cross-world trading

# ==================== Trade Features ====================
enable-money-trade: true                     # Enable money trading (requires Vault)
enable-exp-trade: true                       # Enable experience trading
enable-shift-click: true                     # Enable Shift+right-click on players to initiate trades

# ==================== Tax Settings ====================
trade-tax: 0.0                               # Money trade tax rate (range: 0-1, 0 means no tax, 0.05 means 5%)
exp-tax-rate: 0.0                            # Experience trade tax rate (range: 0-1, 0 means no tax)

# ==================== Confirmation Settings ====================
confirm-threshold: 10000                     # Large trade confirmation threshold (money or exp above this requires a second confirmation)

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
gui-title: "&6Trading with {PLAYER}"         # Trade GUI title ({PLAYER} is replaced with the other player's name)

# ==================== Messages ====================
messages:
  request-sent: "&aTrade request sent to &f{PLAYER}&a!"
  request-received: "&e{PLAYER} &fwants to trade! Use /trade accept to accept"
  request-timeout: "&cTrade request has timed out!"
  trade-complete: "&aTrade completed!"
  trade-cancelled: "&cTrade cancelled!"
  trade-disabled: "&cThe other player has trading disabled!"
  player-blocked: "&cThe other player has blocked you!"
  toggle-on: "&aTrade enabled!"
  toggle-off: "&cTrade disabled!"
  block-success: "&aAdded {PLAYER} to your trade blacklist!"
  unblock-success: "&aRemoved {PLAYER} from your trade blacklist!"
  already-blocked: "&c{PLAYER} is already in your blacklist!"
  not-blocked: "&c{PLAYER} is not in your blacklist!"
```

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

When the total money or experience in a trade exceeds the `confirm-threshold` (default 10000):

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
- Confirm that UltiTools-API 6.2.0 or higher is installed
- Restart the server fully (not just `/ul reload` -- new modules require a full restart)
- Check the console for the "UltiTrade enabled!" log message
- If money trading doesn't work, verify that Vault and an economy plugin (e.g. EssentialsX) are installed

### 2. Config changes not taking effect?

After saving the config file, use `/ul reload` to reload the configuration. Make sure your YAML formatting is correct (indentation must use spaces, not tabs). Message and value changes take effect immediately after reload.

### 3. How to set up permissions?

UltiTrade has a single permission node: `ultitrade.use`, which controls access to all `/trade` commands and the Shift+right-click shortcut. Set it up with a permissions plugin like LuckPerms:

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

If either player goes offline during an active trade, the trade is automatically cancelled. Both players' items are returned (the online player gets items in their inventory; the offline player's items are returned to their inventory or dropped at their last location). Money and experience are only actually transferred when the trade completes successfully.

### 7. Where are trade logs stored?

Trade logs are stored through UltiTools-API's DataOperator, which means the actual storage depends on your UltiTools storage configuration (SQLite database in `plugins/UltiTools/` by default). Logs are automatically cleaned up based on the `log-retention-days` setting.

## Changelog

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
