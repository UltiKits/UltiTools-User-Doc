# UltiEconomy - Economy System

UltiEconomy is a UltiTools framework module that provides a full Vault economy implementation. It uses a dual-wallet design where players have both a cash balance and a bank balance. Cash is used for everyday transactions through Vault, while bank savings earn interest over time. The module includes player-to-player transfers, deposit/withdrawal, a wealth leaderboard, and admin economy commands. As a Vault Economy Provider, it integrates seamlessly with all Vault-compatible plugins (shops, claims, lotteries, etc.). PlaceholderAPI support lets you display balances and rankings on scoreboards, tab lists, and chat formats.

## Installation

There are two ways to install:

**Option 1: Via UltiTools Plugin Manager (Recommended)**

Run in the server console or in-game:

```
/upm install UltiEconomy
```

**Option 2: Manual Installation**

1. Download the `UltiEconomy.jar` file
2. Place the JAR file into the `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file is automatically generated at `plugins/UltiTools/UltiEconomy/config/config.yml`.

:::tip
Prerequisite: The server must have [Vault](https://www.spigotmc.org/resources/vault.34315/) installed for UltiEconomy to register as an economy provider. PlaceholderAPI is optional.
:::

## Quick Start

No extra configuration is needed after installation. The plugin automatically registers as the Vault economy provider. Players get an account with 1000 starting cash (configurable) when they first join the server.

Try it out:

```
/money                  # Check your balance
/bank                   # Check your bank savings
/deposit 500            # Deposit 500 into the bank
/withdraw 200           # Withdraw 200 from the bank
/pay Steve 100          # Transfer 100 to Steve
```

Admins can manage player economies with `/eco`:

```
/eco check Steve        # View Steve's balances
/eco give Steve 1000    # Give Steve 1000 cash
/eco take Steve 500     # Take 500 cash from Steve
/eco set Steve 5000     # Set Steve's balance to 5000
```

## Commands

All commands are player-only unless noted as "console-compatible".

### Player Commands

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/money` | View your cash, bank balance, and total wealth | `/money` | `ultieconomy.money` |
| `/bank` | View your bank balance | `/bank` | `ultieconomy.bank` |
| `/pay <player> <amount>` | Transfer cash to another online player | `/pay Steve 500` | `ultieconomy.pay` |
| `/deposit <amount>` | Deposit cash into your bank | `/deposit 1000` | `ultieconomy.deposit` |
| `/withdraw <amount>` | Withdraw cash from your bank | `/withdraw 500` | `ultieconomy.withdraw` |

Command aliases: `/bal` (same as `/money`), `/ck` (same as `/deposit`), `/qk` (same as `/withdraw`)

### Admin Commands

These commands work from both in-game and the console, and support offline players.

| Command | Description | Example | Permission |
|---------|-------------|---------|------------|
| `/eco give <player> <amount>` | Give cash to a player | `/eco give Steve 1000` | `ultieconomy.admin` |
| `/eco take <player> <amount>` | Take cash from a player | `/eco take Steve 500` | `ultieconomy.admin` |
| `/eco set <player> <amount>` | Set a player's cash balance | `/eco set Steve 5000` | `ultieconomy.admin` |
| `/eco check <player>` | View a player's cash, bank, and total wealth | `/eco check Steve` | `ultieconomy.admin` |

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultieconomy.money` | View your own balance | All players |
| `ultieconomy.bank` | View bank balance | All players |
| `ultieconomy.pay` | Transfer cash to other players | All players |
| `ultieconomy.deposit` | Deposit cash to bank | All players |
| `ultieconomy.withdraw` | Withdraw cash from bank | All players |
| `ultieconomy.admin` | Admin economy operations (give/take/set/check) | OP |

## Configuration

Configuration file path: `plugins/UltiTools/UltiEconomy/config/config.yml`

```yaml
# Starting cash for new players
initial-cash: 1000.0

# Currency display name (used in messages)
currency-name: "Coins"

# Currency symbol (shown before amounts, e.g., $1,000.00)
currency-symbol: "$"

# Bank feature settings
bank:
  enabled: true          # Enable bank feature (disable to remove /bank, /deposit, /withdraw)
  min-deposit: 100.0     # Minimum deposit amount
  max-balance: -1        # Maximum bank balance (-1 = unlimited)

# Interest settings
interest:
  enabled: true          # Enable bank interest
  rate: 0.03             # Interest rate per distribution (0.03 = 3%)
  interval: 1800         # Distribution interval in seconds (1800 = 30 minutes)
  max-interest: 10000.0  # Maximum interest per distribution (prevents excessive payouts)

# Leaderboard settings
leaderboard:
  update-interval: 60    # Leaderboard cache refresh interval in seconds
  display-count: 10      # Default number of top entries shown
```

### Configuration Details

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `initial-cash` | decimal | 1000.0 | Starting cash given to new players on first join |
| `currency-name` | string | "Coins" | Currency name displayed in messages and Vault queries |
| `currency-symbol` | string | "$" | Symbol shown before formatted amounts |
| `bank.enabled` | boolean | true | Whether the bank system (deposit/withdraw/interest) is active |
| `bank.min-deposit` | decimal | 100.0 | Minimum amount for a single deposit; smaller amounts are rejected |
| `bank.max-balance` | decimal | -1 | Maximum bank balance; -1 means unlimited |
| `interest.enabled` | boolean | true | Whether bank interest is active |
| `interest.rate` | decimal | 0.03 | Interest rate (interest = bank balance x rate) |
| `interest.interval` | integer | 1800 | Seconds between each interest distribution |
| `interest.max-interest` | decimal | 10000.0 | Cap on interest per distribution |
| `leaderboard.update-interval` | integer | 60 | Seconds between leaderboard cache refreshes |
| `leaderboard.display-count` | integer | 10 | Default number of players shown on the leaderboard |

## PlaceholderAPI Variables

If PlaceholderAPI is installed, UltiEconomy automatically registers these placeholders for use in scoreboards, tab lists, chat plugins, etc.

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%ultieconomy_cash%` | Cash balance (raw number) | `1000.00` |
| `%ultieconomy_bank%` | Bank balance (raw number) | `5000.00` |
| `%ultieconomy_total%` | Total wealth (cash + bank) | `6000.00` |
| `%ultieconomy_cash_formatted%` | Cash balance with currency symbol | `$1,000.00` |
| `%ultieconomy_rank%` | Wealth rank (shows `-` if unranked) | `3` |
| `%ultieconomy_top_name_1%` | Name of the #1 richest player | `Steve` |
| `%ultieconomy_top_balance_1%` | Total wealth of the #1 player | `100000.00` |

The `top_name_N` and `top_balance_N` placeholders use 1-based numbering. You can use them to build leaderboard scoreboards.

## Usage Tutorials

### Scenario 1: Everyday Economy Flow

Your server has shops and an economy system. Here's how the money flows:

1. New players automatically get 1000 starting cash when they first join
2. Players can transfer cash to each other with `/pay Steve 200`
3. Spare cash can be saved in the bank with `/deposit 5000`
4. Bank savings automatically earn 3% interest every 30 minutes (online players get a notification)
5. Cash can be withdrawn anytime with `/withdraw 1000`

### Scenario 2: Working with Shop Plugins

UltiEconomy registers as a Vault economy provider, so all Vault-compatible plugins (ShopGUI+, ChestShop, Essentials, etc.) automatically use it to manage player balances.

One important thing to know: **Vault only operates on the cash balance.** When a shop plugin charges a player, it deducts from cash, not from the bank. If a player has enough money in the bank but not enough cash, they need to `/withdraw` first.

### Scenario 3: Configuring Bank Interest

Interest is enabled by default. To adjust the rate or disable it:

Open `plugins/UltiTools/UltiEconomy/config/config.yml` and find the `interest` section:

```yaml
interest:
  enabled: true       # Set to false to disable interest entirely
  rate: 0.03          # 0.03 = 3%, change to 0.05 for 5%
  interval: 1800      # Seconds between payouts (1800 = 30 minutes)
  max-interest: 10000.0  # Cap per payout
```

Run `/ul reload` after saving to apply the changes.

The formula is: `interest = bank balance x rate`, capped at `max-interest`. For example, with 500,000 in the bank at 3%, the calculated interest is 15,000, but the cap limits it to 10,000.

### Scenario 4: Admin Fixing Player Balances

If a player reports incorrect balance data, an admin can fix it directly:

```
/eco check Steve        # Check current balances first
/eco set Steve 5000     # Set the correct amount
```

The `/eco` command operates on cash balance. These commands work from the console and support offline players (as long as the player has logged in before).

### Scenario 5: Building a Wealth Leaderboard Scoreboard

If you use a scoreboard plugin (like UltiSideBar or any PlaceholderAPI-compatible scoreboard), you can create a leaderboard display:

```
#1: %ultieconomy_top_name_1% - %ultieconomy_top_balance_1%
#2: %ultieconomy_top_name_2% - %ultieconomy_top_balance_2%
#3: %ultieconomy_top_name_3% - %ultieconomy_top_balance_3%
My Rank: %ultieconomy_rank%
My Balance: %ultieconomy_cash_formatted%
```

Note: The leaderboard ranks by **total wealth** (cash + bank), not just cash. Leaderboard data refreshes every 60 seconds (configurable).

## FAQ

**Q: What if the plugin doesn't work after installation?**

A: Check the following:
1. Make sure the Vault plugin is installed (UltiEconomy requires Vault to register its economy service)
2. Confirm the JAR file is placed in `plugins/UltiTools/plugins/`, not the `plugins/` root directory
3. A server restart is required after installation; `/ul reload` only reloads configuration, it cannot load new module JARs
4. Check the server console for any error messages
5. Make sure UltiTools-API is version 6.2.1 or higher

**Q: Config changes not taking effect?**

A: After modifying `plugins/UltiTools/UltiEconomy/config/config.yml`, run `/ul reload` to reload the configuration. Make sure you have not broken the YAML indentation format (use spaces, not tabs).

**Q: How to set up permissions?**

A: All UltiEconomy permissions start with `ultieconomy.`. We recommend using a permissions plugin like LuckPerms:

```
/lp group default permission set ultieconomy.money true
/lp group default permission set ultieconomy.pay true
/lp group admin permission set ultieconomy.admin true
```

Basic permissions (money, bank, pay, deposit, withdraw) are available to all players by default. The admin permission is OP-only by default.

**Q: Which balance does Vault use?**

A: The Vault API only operates on the **cash balance**. The bank is a private UltiEconomy feature accessible only through `/deposit`, `/withdraw`, and `/bank` commands. When other plugins (shops, claims, lotteries) interact with Vault, they see and modify cash only. If a player can't afford something but has money in the bank, they need to withdraw first.

**Q: How does interest work?**

A: Interest is distributed at fixed intervals (default: every 30 minutes) to all players with a positive bank balance (they don't need to be online). Online players receive a green notification message. Formula: bank balance x rate, capped at the per-distribution maximum. To disable: set `interest.enabled: false` in the config.

**Q: Are transfers safe?**

A: Yes. Transfers (`/pay`) are atomic — either both the sender's deduction and the recipient's addition succeed, or neither happens. You can't send money to yourself, and the amount must be positive.

**Q: Where is the data stored?**

A: Player account data is stored in whatever database UltiTools-API is configured to use (SQLite, MySQL, or JSON, depending on your global UltiTools database settings). The table name is `economy_accounts`.

## Changelog

### v1.0.0

Initial release.

Added: Full Vault economy provider implementation (UUID-based)
Added: Dual wallet system (cash + bank balance)
Added: Player-to-player transfers (`/pay`) with instant delivery
Added: Bank deposit and withdrawal (`/deposit`, `/withdraw`) with configurable limits
Added: Automatic bank interest system with configurable rate and cap
Added: Wealth leaderboard ranked by total assets, with cached periodic refresh
Added: Admin commands (`/eco give/take/set/check`) supporting console and offline players
Added: PlaceholderAPI integration with 7 placeholder types (balance, rank, leaderboard)
Added: Automatic account creation with starting cash on first player join
Added: Chinese and English language support
