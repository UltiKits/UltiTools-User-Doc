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

1. Install UltiTools-API 6.3.0 or later first, then download `UltiEconomy-3.0.0.jar`
2. Place the JAR file into the `plugins/UltiTools/plugins/` directory
3. Restart the server

After installation, the configuration file is automatically generated at `plugins/UltiTools/pluginConfig/UltiTools-Economy/config/config.yml`.

:::tip
Prerequisite: The server must have [Vault](https://www.spigotmc.org/resources/vault.34315/) installed for UltiEconomy to register as an economy provider. PlaceholderAPI is optional.
:::

## Before upgrading to 3.0.0

Upgrade UltiTools-API to 6.3.0 or later first and back up the economy database and configuration. For a shared database, stop every server still running 2.0.0 and never reconnect that old version afterwards. Put the new JAR in `plugins/UltiTools/plugins/` and restart fully; do not replace your file with a complete new config example.

The first startup attempts to merge the second primary-currency wallet's cash and savings into the account wallet, removing only successfully merged second wallets. If the sum cannot be stored exactly, that player's second wallet is kept with a warning. The module still starts, and commands and Vault use only the account wallet. Check the unmerged count in the total log for operator settlement; later startups may still find those wallets. Previously duplicated starting money remains in circulation. Read the per-player and total logs. Storage failure prevents module startup; fix storage and restart to resume, rather than hand-editing merge records. Shared SQLite/MySQL servers claim the merge while others wait; an interrupted claim can be taken over after 30 seconds. JSON files cannot be shared across servers and interruption during a file write still risks corruption. Merged savings may exceed the bank cap, which then blocks further deposits and interest.

Inspect existing values carefully: `interest.enabled: true` now really pays, by default 3% every 1800 seconds, creating money. To opt out set false and run `/ul reload UltiTools-Economy`. Enable interest on only one server sharing a database. An old `tax.enabled: false` now blocks all transfer tax; set true and reload if you want to keep taxation. The new defaults (interest false, taxation true) do not overwrite existing values. Both interest and leaderboard intervals must be 1-107374182 seconds. An invalid startup value refuses the entire module, including Vault, even when interest is off. Reload keeps running intervals and warns instead.

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

These permission nodes have no declared default grant and are operators-only by default; grant them explicitly to players. For the basic features below, grant `ultieconomy.money`, `ultieconomy.bank`, `ultieconomy.pay`, `ultieconomy.deposit`, `ultieconomy.withdraw`, `ultieconomy.note` as needed. For example, with LuckPerms:

```text
/lp group default permission set ultieconomy.money true
/lp group default permission set ultieconomy.bank true
/lp group default permission set ultieconomy.pay true
/lp group default permission set ultieconomy.deposit true
/lp group default permission set ultieconomy.withdraw true
/lp group default permission set ultieconomy.note true
```

| Permission | Description | Default |
|------------|-------------|---------|
| `ultieconomy.money` | View your own balance | OP (grant explicitly to players) |
| `ultieconomy.bank` | View bank balance | OP (grant explicitly to players) |
| `ultieconomy.pay` | Transfer cash to other players | OP (grant explicitly to players) |
| `ultieconomy.deposit` | Deposit cash to bank | OP (grant explicitly to players) |
| `ultieconomy.withdraw` | Withdraw cash from bank | OP (grant explicitly to players) |
| `ultieconomy.note` | Use money note commands (`/note`) | OP (grant explicitly to players) |
| `ultieconomy.admin` | Admin economy operations (give/take/set/check) | OP |

## Configuration

Configuration file path: `plugins/UltiTools/pluginConfig/UltiTools-Economy/config/config.yml`

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
  enabled: false         # Pay interest; an existing true is not automatically changed to false
  rate: 0.03             # Interest rate per distribution (0.03 = 3%)
  interval: 1800         # Distribution interval in seconds (1800 = 30 minutes)
  max-interest: 10000.0  # Maximum interest per distribution (prevents excessive payouts)

# Leaderboard settings
leaderboard:
  update-interval: 60    # Leaderboard cache refresh interval in seconds

# Transfer tax
tax:
  enabled: true
  transaction-tax:
    enabled: true
    rate: 0.05  # 5%; valid range 0-1
    exempt-permission: "ultieconomy.tax.exempt"
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
| `interest.enabled` | boolean | false | Pay interest; an existing file keeps its own value |
| `interest.rate` | decimal | 0.03 | Interest rate (interest = bank balance x rate) |
| `interest.interval` | integer | 1800 | Seconds between each interest distribution |
| `interest.max-interest` | decimal | 10000.0 | Only positive values cap each payment; 0 and -1 mean no per-payment cap |
| `leaderboard.update-interval` | integer | 60 | Seconds between leaderboard cache refreshes |
| `tax.enabled` | boolean | true | Master taxation switch |
| `tax.transaction-tax.enabled` | boolean | true | Transfer tax switch |
| `tax.transaction-tax.rate` | decimal | 0.05 | Rate, range 0-1 |
| `tax.transaction-tax.exempt-permission` | string | `ultieconomy.tax.exempt` | Payer's tax exemption permission |

`interest.rate` and the transfer tax rate must be 0-1; invalid values warn and fall back to 0.03 / 0.05. `interest.max-interest` defaults to 10000; -1 or 0 both mean no per-payment cap. Other negatives and infinity fall back to the default. Disable interest with its switch, not a zero cap. Bank caps accept only -1 or a positive number: 0 does not disable banking and instead warns and falls back to unlimited. Old `leaderboard.display-count` and the three `tax.wealth-tax.*` keys are unused and may be deleted individually. Each top-N placeholder specifies its own N.

### Currency file and commands

The complete shipped example for `plugins/UltiTools/pluginConfig/UltiTools-Economy/config/currencies.yml` follows. The primary currency takes its name, symbol and wallet settings from `config.yml`; changing matching primary settings here does not override that file, and differences warn at startup. Other currencies have independent wallets. Restart after editing this file.

```yaml
currencies:
  coins:
    display-name: 'Coins'
    symbol: '$'
    initial-cash: 1000.0
    bank-enabled: true
    min-deposit: 100.0
    max-bank-balance: -1
    primary: true
```

`/money` and `/bank` accept a currency name. `/pay`, `/deposit`, `/withdraw` and admin give/take/set/check also accept a final currency name, for example `/money coins` and `/pay Steve 100 coins`. The primary coins currency now shares the same wallet as calls without a currency and Vault. Unknown currencies are refused before changing balances.

| Command | Example | Permission | Sender |
|---|---|---|---|
| `/note <amount> [currency]` | `/note 100 coins` | `ultieconomy.note` | Player |
| `/note redeem` | `/note redeem` | `ultieconomy.note` | Player holding a note |
| `/eco treasury` | `/eco treasury` | `ultieconomy.admin` | Player or console |
| `/eco treasury withdraw <amount> [currency]` | `/eco treasury withdraw 100 coins` | `ultieconomy.admin` | Player or console |

Notes can also be redeemed by right-clicking while holding them. A note for a removed currency is refused but kept; restoring the currency makes it redeemable again. Stored data identifies old notes, so an old display name does not prevent redemption. Transfer tax defaults to 5%; a payer with `ultieconomy.tax.exempt` is exempt. With defaults and no exemption, `/pay Steve 100` credits 95, and both players see the actual credited amount. A treasury withdrawal only reduces treasury funds; it does not automatically credit the sender's wallet.

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
4. New installations pay no interest by default. When explicitly enabled, defaults pay 3% every 30 minutes, subject to payment and bank caps; online players are notified after credit
5. Cash can be withdrawn anytime with `/withdraw 1000`

### Scenario 2: Working with Shop Plugins

UltiEconomy registers as a Vault economy provider, so all Vault-compatible plugins (ShopGUI+, ChestShop, Essentials, etc.) automatically use it to manage player balances.

One important thing to know: **Vault only operates on the cash balance.** When a shop plugin charges a player, it deducts from cash, not from the bank. If a player has enough money in the bank but not enough cash, they need to `/withdraw` first.

### Scenario 3: Configuring Bank Interest

Interest is off on new installations. An existing true remains and starts really paying in this release. To explicitly enable or adjust it, edit this section (this example opts in; it is not the shipped default):

Open `plugins/UltiTools/pluginConfig/UltiTools-Economy/config/config.yml` and find the `interest` section:

```yaml
interest:
  enabled: true       # Set to false to disable interest entirely
  rate: 0.03          # 0.03 = 3%, change to 0.05 for 5%
  interval: 1800      # Seconds between payouts (1800 = 30 minutes)
  max-interest: 10000.0  # Cap per payout
```

Run `/ul reload` after saving to apply the changes.

The formula is: `interest = bank balance x rate`, capped per payment only when `max-interest` is positive. Both 0 and -1 mean no per-payment cap; the bank balance maximum still applies. For example, with 500,000 in the bank at 3%, the calculated interest is 15,000, but the cap limits it to 10,000.

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

### Custom language and known limitations

Message keys now use ASCII identifiers such as `economy.money.header`. Reapply custom messages to the new keys. Copy an official file to `lang/zh-myserver.json`, for example, and select `language: zh-myserver` in the framework's `plugins/UltiTools/config.yml`. Missing keys fall back to the official language named by the prefix; a custom filename without an official-language prefix falls back to English and warns. Do not directly edit `lang/zh.json` or `lang/en.json`: startup and module reload restore official files and retain edited copies as `.bak`. Uncustomised servers need no action. Log filters should match `[UltiTools-Economy]`, not the old extra `UltiEconomy: `.

MariaDB conditional writes remain untested, and transfer debit/credit are not atomic against a process stopping between them. Do not share JSON data files, hand-edit internal economy or wallet-merge records while running, or connect 2.0.0 to the upgraded database. These remain limitations, not fixes claimed by 3.0.0.

## FAQ

**Q: What if the plugin doesn't work after installation?**

A: Check the following:
1. Make sure the Vault plugin is installed (UltiEconomy requires Vault to register its economy service)
2. Confirm the JAR file is placed in `plugins/UltiTools/plugins/`, not the `plugins/` root directory
3. A server restart is required after installation; `/ul reload` only reloads configuration, it cannot load new module JARs
4. Check the server console for any error messages
5. Make sure UltiTools-API is version 6.3.0 or higher

**Q: Config changes not taking effect?**

A: After modifying `plugins/UltiTools/pluginConfig/UltiTools-Economy/config/config.yml`, run `/ul reload` to reload the configuration. Make sure you have not broken the YAML indentation format (use spaces, not tabs).

**Q: How to set up permissions?**

A: All UltiEconomy permissions start with `ultieconomy.`. We recommend using a permissions plugin like LuckPerms:

```
/lp group default permission set ultieconomy.money true
/lp group default permission set ultieconomy.pay true
/lp group admin permission set ultieconomy.admin true
```

Basic permissions (money, bank, pay, deposit, withdraw) are operators-only by default; grant them explicitly to players. The admin permission is OP-only by default.

**Q: Which balance does Vault use?**

A: The Vault API only operates on the **cash balance**. The bank is a private UltiEconomy feature accessible only through `/deposit`, `/withdraw`, and `/bank` commands. When other plugins (shops, claims, lotteries) interact with Vault, they see and modify cash only. If a player can't afford something but has money in the bank, they need to withdraw first.

**Q: How does interest work?**

A: Only `interest.enabled: true` pays interest; new installations default to false. When enabled, configured intervals (30 minutes by default) pay positive bank balances, including offline players. The primary account wallet is paid once; other bank-enabled currencies are paid separately. Online players receive a green notification message. Formula: bank balance x rate, capped per payment only when `interest.max-interest` is positive. Both 0 and -1 mean no per-payment cap; the bank balance maximum still applies. To disable: set `interest.enabled: false` in the config.

**Q: Are transfers safe?**

A: `/pay` requires a positive amount, an online recipient other than yourself and enough cash. A failed credit attempts to refund the sender. If the refund also fails, logs identify both players, amount and currency for operator recovery. The two writes are not crash-atomic: stopping the server between debit and credit can still lose the amount. Shared-database contention rereads and retries; persistent contention asks you to try later rather than claiming insufficient funds.

**Q: Where is the data stored?**

A: Player account data is stored in whatever database UltiTools-API is configured to use (SQLite, MySQL, or JSON, depending on your global UltiTools database settings). The table name is `economy_accounts`.

## Changelog

### v3.0.0

#### Changed

- The start-up and reload warnings no longer begin with a second `UltiEconomy: ` of their own. The framework
  already writes `[UltiTools-Economy] ` in front of every line this module logs, so a warning now reads
  `[UltiTools-Economy] tax.enabled is false in config/config.yml, …` instead of
  `[UltiTools-Economy] UltiEconomy: tax.enabled is false in config/config.yml, …`. A log filter that matched the old
  `UltiEconomy: ` text should match `[UltiTools-Economy]` instead.

- Language keys were renamed from Chinese sentences to ASCII keys (for example `economy.money.header`).
  If you customised this module's messages in your own language file -- a copy of an official file
  whose name starts with that file's language code and a hyphen (for example `lang/zh-myserver.json`),
  selected with `language: zh-myserver` in `plugins/UltiTools/config.yml` -- re-apply those edits to the new
  keys; until then each renamed message shows the text of the official language the name starts with. A copy
  whose name does not start with an official language code and a hyphen is still read, but every message
  it lacks then shows in English, with one warning. An edit made directly in an official
  language file (`lang/en.json`, `lang/zh.json`) is not kept: the framework restores the official files at
  every start and on every module reload and keeps the edited file as `.bak` (UltiKits/UltiTools-Reborn#616). A server that never
  customised messages needs no action.

- **Requires UltiTools 6.3.0.** `plugin.yml` raises `api-version` from `620` in the released 2.0.0
  to `630`. The interest payment
  and the leaderboard refresh read their intervals from `interest.interval` and
  `leaderboard.update-interval` through a framework feature added in UltiTools 6.3.0
  (UltiKits/UltiTools-Reborn#531). UltiTools 6.2.x refuses to load this module because of that
  `api-version`.

- `plugin.yml` now declares `identify-string: ultieconomy`, the key of this module's entry in the
  UltiCloud catalogue. The framework's update check and `/upm update` skip a module that does not
  declare it, so this module now takes part in both (UltiKits/UltiTools-Reborn#474).

- Why the released 2.0.0 carries that number (UltiKits/UltiEconomy#3). The module version follows the rule in
  UltiKits/UltiTools-Dev-Doc#7 (the version-number specification) and its criteria list in
  UltiKits/UltiTools-Dev-Doc#12: the question is what the server owner has to do after swapping the JAR,
  and raising the `api-version` floor is a MAJOR change because the owner must upgrade UltiTools first.
  The 2.0.0 JAR already referenced framework symbols that exist only from UltiTools 6.2.1
  (`DataOperator.insert` and `DataOperator.update` take `BaseDataEntity` from 6.2.1; they take
  `AbstractDataEntity` in 6.2.0), so it effectively raised the floor above the `620` its `plugin.yml`
  declared. The multi-currency additions alone (defaulted config fields, an automatically created table,
  an optional currency argument) would have been a MINOR change. The released 2.0.0 therefore keeps its
  number and is not lowered; the module version only ever increases. Version 3.0.0 raises
  `api-version` from `620` (as 2.0.0 was released) to `630`, which is a MAJOR change by the same rule.

- **Upgrade consequence — interest may start being paid.** `interest.enabled` in
  `config/config.yml` now takes effect (UltiKits/UltiEconomy#15). Previously nothing ever scheduled
  the payment, so no interest was paid on any server whatever the key said. The shipped file said
  `interest.enabled: true` in both 1.0.0 and 2.0.0, so every server that has run either holds `true`
  unless its operator changed it — **on such a server, upgrading starts paying interest, which creates money**:
  every `interest.interval` seconds (the first payment one interval after the module loads), a player's primary-currency bank balance — the one `/bank`, `/money`, `/eco check <player>`
  and Vault show, also when `/bank <primary currency>` names it, paid once per player and not
  also on any remaining old primary-currency row (UltiKits/UltiEconomy#25) — and their bank balance in every other
  currency with `bank-enabled: true` in `config/currencies.yml` each earn `interest.rate` of itself (`0.03`, 3%, by
  default), capped per payment only when `interest.max-interest` is above 0 (`10000.0` by default;
  both `0` and `-1` mean no per-payment cap, not disabled interest)
  and never taking a balance above its bank maximum (`bank.max-balance`, or the currency's own
  `max-bank-balance`, when set above 0 — a balance already at the maximum earns nothing), and an
  online player is told in chat once the credit has been written. **If several servers share one
  database, each server with interest on pays the full rate on every balance in it: turn interest
  on for exactly one of them.** The value in the file is the one that applies. While it is `true`
  the module logs one WARNING at every boot naming the rate, the interval, the cap and the
  shared-database rule. `/ul reload UltiTools-Economy` applies a changed `interest.interval` keeping
  the payment's place in its cycle: the next payment is the last one (or, before the first, the
  module load) plus the new interval, or at once if that moment has passed — a reload never pays
  early and never postpones a payment. **The interval that applies is the one in your file.** 1.0.0
  and 2.0.0 shipped `interest.interval: 1800` (30 minutes) but nothing read it; a value your file
  holds — for example a changed `60`, which pays every minute — applies from this release, and
  `1800` is only what a file without the key gets. A value below 1 or above 107374182 refuses the
  **whole economy module** at load, naming the key — the Vault economy provider included, so every
  plugin that uses Vault loses it and `/money`, `/pay` and the other commands are unavailable, even
  while `interest.enabled` is `false` — until the value is fixed and the server restarted; at
  `/ul reload` it is not applied, the running interval is kept and a WARNING names the key. To not
  pay interest, set `interest.enabled: false` and run `/ul reload UltiTools-Economy`; the switch is
  read at every payment, so the next one is skipped. The declared default and the shipped file now
  say `false`, which reaches only a file that does not hold the key yet.

- **Upgrade consequence — the transfer tax may stop.** `tax.enabled` in `config/config.yml` now
  takes effect, as the master switch over all taxation: while it is `false`, `/pay` takes no
  transaction tax and nothing is paid into the treasury, whatever `tax.transaction-tax.*` says
  (UltiKits/UltiEconomy#16). Previously nothing read it, and a transfer was taxed at
  `tax.transaction-tax.rate` (5% by default) whenever `tax.transaction-tax.enabled` was true. The
  key is not in the shipped file, and the framework writes a missing key into the operator's file
  with its declared default on first boot; that default was `false` in 2.0.0, the release that
  added the tax settings, so every server that has run 2.0.0 holds `tax.enabled: false` unless its
  operator changed it — **on such a server, upgrading stops the transfer tax.** The value in the file is the one that applies. While
  it is `false` the module logs one WARNING at every boot saying so. To keep taxing transfers, set
  `tax.enabled: true` and run `/ul reload UltiTools-Economy`; the switch is read at every transfer.
  The declared default is now `true`, which reaches only a file that does not hold the key yet.

- **The primary currency now has one wallet** (UltiKits/UltiEconomy#25). Since 2.0.0 every player
  also had a second primary-currency wallet, credited with its own starting amount when they first
  joined. The commands and placeholders that name the currency — `/money coins`, `/bank coins`,
  `/pay <player> <amount> coins`, `/deposit <amount> coins`, `/withdraw <amount> coins`,
  `/eco give|take|set|check <player> … coins`, `/note <amount> coins`, `%ultieconomy_coins_*%` and the
  `coins` leaderboard — used that second wallet, while Vault, `/money`, `/pay` and `/bank` used the
  account wallet. All of them now use the account wallet, and a player joining for the first time is
  given `initial-cash` once. The primary currency's starting cash, bank switch (for deposits and
  withdrawals alike), minimum deposit and maximum bank balance are read from `config/config.yml`; the primary entry's `initial-cash`,
  `bank-enabled`, `min-deposit` and `max-bank-balance` in `config/currencies.yml` are no longer read
  (its display name and symbol also come from `config/config.yml`'s `currency-name` and
  `currency-symbol`, not that entry's `display-name` and `symbol`). Every other currency keeps its own wallet.

- **Upgrade consequence — the second wallet is merged where possible** (UltiKits/UltiEconomy#25). On the first
  start after upgrading, before anything can read or move a balance, the module attempts to add each
  player's second primary-currency wallet to their account wallet — its cash to their cash, its bank
  balance to their bank balance — and removes each successfully merged second wallet. If the sum cannot
  be stored exactly, nothing is moved for that player: a warning is logged and the second wallet is
  kept for an operator to settle. The module still starts, and primary-currency commands and Vault
  use the account wallet, not the unmerged second wallet. The server log gets one line per merged
  player with the amounts and the new balances, and one total line including the unmerged count.
  A later start can still find unmerged wallets; it finds nothing to merge only if none remain. Nobody's
  balance goes down: an amount below zero in a second wallet (which no command of this module can
  produce) is not taken from the account, and is logged. A merged bank balance may end above
  `bank.max-balance`; deposits and interest then stop at the cap as before. **Known trade-off:** the
  starting amount 2.0.0 credited a second time stays in circulation — on a 103-player test server,
  103,588.95 was merged, 101,000 of it untouched duplicated starting amounts. If storage fails during
  the merge, the module does not start (so no balance changes); fix storage and restart, and the merge
  resumes without adding anything twice. Stopping the server at any point during the merge is safe on
  SQLite and MySQL; on JSON storage it is safe too, except that a stop while a player's file is being
  rewritten can leave that one file unreadable, which the JSON storage risks at every save. **Servers that
  share one database** can be started together: one of them runs the merge — it takes a claim, a row
  in a new table `economy_wallet_merge_claim` that it removes when the merge is done — and the others
  wait for it, logging every 10 seconds that they are waiting, then start without merging anything
  again. If the server running the merge stops in the middle, the next one takes the claim over
  after 30 seconds and finishes the merge without adding anything twice. Stop every server still
  running 2.0.0 before starting the first upgraded one, and never run 2.0.0 against that database
  again — a 2.0.0 server gives each joining player a new second wallet, which the next start would
  merge as more money, and it takes no part in the claim. JSON storage cannot be shared by two
  servers at all (each keeps its own copy of the records). While a player's merge is in progress,
  their second-wallet rows carry a `currency_id` starting with `~merging-into-account.marker:`, which
  no currency can have (a `.` in a `currencies.yml` key nests the key).

- When `config/currencies.yml` gives the primary currency an `initial-cash`, `bank-enabled`,
  `min-deposit` or `max-bank-balance` different from `config/config.yml`'s `initial-cash`,
  `bank.enabled`, `bank.min-deposit` or `bank.max-balance`, a WARNING at startup names both files,
  both keys and both values, and says that the `config.yml` value applies (UltiKits/UltiEconomy#25).

#### Removed

- `leaderboard.display-count` is removed from `config.yml`. Nothing ever read it: no command or
  placeholder shows a fixed number of leaderboard entries, and each top-N placeholder
  (`%ultieconomy_top_name_<N>%`, `%ultieconomy_top_balance_<N>%`) names its own N. A `config.yml` that
  still holds it gets one warning at start-up saying it no longer has any effect and can be deleted;
  the file is not changed (UltiKits/UltiEconomy#36).

- The wealth tax's settings `tax.wealth-tax.enabled`, `tax.wealth-tax.interval` and
  `tax.wealth-tax.exempt-permission` are removed. The wealth tax never collected anything: nothing
  scheduled it, nothing took money, and no setting defined its brackets. A `config.yml` that still holds
  one of them gets one warning per key at start-up saying it no longer has any effect and can be
  deleted; the file is not changed. Implementing a wealth tax is a feature request for a later version
  (UltiKits/UltiEconomy#38; maintainer decision 2026-09-29, UltiKits/UltiEconomy#27).

#### Fixed

- A balance change that gives up because another server kept changing the row now replies "The balance
  is being changed on another server right now; please try again." (`/pay`, `/deposit`, `/withdraw`,
  `/note` and redeeming a note, which is kept, `/eco give`/`take`/`set`, `/eco treasury withdraw`, and Vault as `FAILURE`) instead of
  "insufficient funds". A transfer whose credit throws a storage error after the sender was debited now
  refunds the sender, like a refused credit; if the refund cannot be written either, one error line names
  both players, the amount and the currency so an operator can restore it. A storage error while adding a
  completed transfer's tax to the treasury is logged instead of reported as a failed transfer. Known
  limitation: a server stopping between a transfer's debit and its credit can lose that amount
  (UltiKits/UltiEconomy#44). MariaDB is untested for these conditional writes (UltiKits/UltiEconomy#41).

- Servers that share one database no longer overwrite each other's balance changes. Every cash, bank
  and treasury change — `/pay`, `/deposit`, `/withdraw`, `/eco give`/`take`/`set`, Vault, money notes,
  interest, the transfer tax and `/eco treasury withdraw` — now applies only if the balance is still the
  value this server read; otherwise it reads again and decides again, up to three times, and then fails
  the way a failed write already did (the change is reported as not made and logged; a transfer whose
  receiver cannot be credited refunds the sender). Two servers making the first tax deposit of a
  currency now create one treasury row. Before, the second server's write replaced the first server's
  change, creating or destroying money (UltiKits/UltiEconomy#41).

- A money note whose currency has been removed from `config/currencies.yml` is now refused by design,
  by `/note redeem` and by right-clicking it: nothing is credited, the player keeps the note and is told
  the currency no longer exists, and the console logs one warning naming the player, the value and the
  currency. Adding the currency back makes such notes redeemable again. Before, a player who still had a
  wallet for that currency redeemed the note into it — the note was consumed and the money went into a
  wallet no command shows (UltiKits/UltiEconomy#37).

- A balance or treasury change whose stored row another writer removed after it was read is now a
  failure on every storage type, as a failed write already was: the change is logged as failed (`... The
  stored row no longer exists ...`) and reported as not made — a `/pay` whose sender row is gone credits
  nobody, one whose receiver row is gone writes the sender's money back, and `/eco treasury withdraw`
  says the withdrawal failed. A transfer tax whose treasury row is gone is stored in a new treasury row
  instead of being lost. Before, these writes wrote nothing and counted as made (UltiKits/UltiEconomy#42).

- The one-time wallet merge on servers that share one database can no longer add a player's second
  wallet twice or undo a later change to their account when the server merging stalls for longer than
  the 30-second takeover and then resumes while the server that took over is merging: every account
  and second-wallet write now applies only if the row still holds what the merge read, and otherwise
  the merge reads again and decides again; an account the merge creates gets an id derived from
  the player's UUID, which the database admits once per player, so it cannot be created twice
  (UltiKits/UltiEconomy#39).

- `bank.max-balance` in `config.yml`, and each non-primary currency's `max-bank-balance` in
  `currencies.yml`, must now be `-1` (no cap) or above 0. Any other value (`0`, another negative, `.inf`)
  is not used: there is no cap (`-1`), and a warning names the key, the value as written and the
  default — for `config.yml` at start-up and after every reload, for `currencies.yml` at start-up.
  Before, `0` and every negative silently meant "no cap" too, although the setting documented only
  `-1`, so writing `0` to mean "no bank deposits" gave an unlimited bank (UltiKits/UltiEconomy#35).

- An interest payment whose bank balance row another writer removed after the payment read it is now
  reported as not credited on every storage type: the failure is logged (`Interest payment: failed to
  write a bank balance, it was not credited: The stored balance row no longer exists ...`), the
  balance is not changed and the player is not told they were paid. Before, only the JSON backend
  reported it; on SQLite and MySQL the payment counted as made (UltiKits/UltiEconomy#40).

- `tax.transaction-tax.rate` outside 0 to 1 is no longer used: the default 0.05 applies, with a warning
  naming the key, the value as written and the default, at start-up and after every reload. A negative
  rate credited the recipient more than the payer paid, and a rate above 1 credited a negative amount.

- The primary currency's name and symbol now come from `config.yml` (`currency-name`, `currency-symbol`)
  everywhere: Vault, `/eco treasury` and every other place that shows them. The primary entry of
  `currencies.yml` follows it; a different `display-name` or `symbol` written there is reported at
  start-up. While `currency-name` is still the shipped `Coins`, it is written in the server's language
  (`金币` under `language: zh`). Previously the two files were read by different paths and a rename in
  one showed up in only half of the output (UltiKits/UltiEconomy#32).

- `interest.rate` must now be from 0 to 1 and `interest.max-interest` must be -1 or at least 0.
  Both `0` and `-1` mean no per-payment cap; only a positive value caps the payment. To stop paying
  interest, set `interest.enabled: false` and run `/ul reload UltiTools-Economy`.
  A value outside its range is not used: the default (`0.03`, `10000`) is, with a warning naming the
  key, the value as written and the default, at start-up and after every reload. Previously any value
  was used, so a typo such as `rate: 3` paid 300% per payment (UltiKits/UltiEconomy#29).

- Unloading this module (`/upm uninstall UltiTools-Economy`) now also unregisters its PlaceholderAPI
  expansion; `%ultieconomy_...%` placeholders used to keep answering from the unloaded module until a
  restart (UltiKits/UltiEconomy#23).

- A server without PlaceholderAPI no longer logs a class-load error for this module's placeholder
  expansion at every start: the expansion is loaded only after the module has checked that
  PlaceholderAPI is installed (UltiKits/UltiEconomy#20).

- `tax.transaction-tax.exempt-permission` now works: a player holding it (`ultieconomy.tax.exempt` by
  default) pays no transaction tax on `/pay`; it used to be declared but never checked
  (UltiKits/UltiEconomy#26).

- `/pay` now tells both players the amount the receiver was actually credited, after transaction tax
  (for example `$95.00` for `/pay <player> 100` at the shipped 5% rate); it used to quote the amount
  sent (UltiKits/UltiEconomy#18).

- `/deposit`, `/withdraw` and `/pay` with a currency name now refuse a currency that does not exist,
  saying so (`Currency not found`), before any balance is touched; they used to answer with the
  generic insufficient-balance line (UltiKits/UltiEconomy#13).

- `language: en` now applies to the command messages that showed their Chinese source text in every
  language because their keys were missing from both language files: the `/money` and `/bank`
  balance lines, the `/pay`, `/deposit` and `/withdraw` success lines, the `/eco give`, `take`, `set`
  and `check` lines, the primary-currency interest notification, and the `/bank`, `/deposit`,
  `/withdraw`, `/pay` and `/money` help and command descriptions, and the `/eco` and `/note` command
  descriptions (UltiKits/UltiEconomy#14).
  `language: zh` now also applies to text that was fixed English: the six help headers
  (`=== UltiEconomy Bank ===` and the rest), a money note's name and lore (`[Money Note] …`,
  `Currency:`, `Value:`, `Created by:`), the two startup warnings about `interest.enabled` and
  `tax.enabled`, three console errors (a failed account, balance or interest write), and the messages
  the Vault bridge returns when a withdrawal or deposit fails, which shop plugins show to the player.
  English wording is unchanged, except that `/pay` to yourself now answers `You cannot pay yourself`
  instead of `Invalid amount`. A money note made before this change keeps the name it was made with; notes
  are recognised by their stored data, not their name, so old and new notes both redeem.

- The wealth leaderboard is now refreshed: once as soon as the module loads, then every
  `leaderboard.update-interval` seconds — the value in your file; 1.0.0 and 2.0.0 shipped `60` but
  nothing read it, and `60` is only what a file without the key gets. `/ul reload` applies a change.
  A value below 1 or above 107374182 refuses the whole economy module at load, the Vault provider
  included, until it is fixed; at reload it is ignored with a WARNING.
  Previously nothing refreshed it, so `%ultieconomy_rank%` and `%ultieconomy_<currency>_rank%` always
  returned `-`, `%ultieconomy_top_name_<N>%` always `-` and `%ultieconomy_top_balance_<N>%` always
  `0.00`, whatever the players' balances (UltiKits/UltiEconomy#15).

- `/upm uninstall UltiTools-Economy` now runs the framework's own command and listener cleanup,
  right after this module's own cleanup work (removing its Vault economy provider from Bukkit's
  services manager, unchanged): after it, the module's commands are really removed and its listeners
  stop firing; previously both stayed active until the server restarted (UltiKits/UltiEconomy#22).
  Reload is unaffected: this module never replaced the framework's reload method.


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
