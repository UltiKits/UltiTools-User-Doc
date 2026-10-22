# UltiMail - In-Game Mail System

UltiMail is the mail system module for the UltiTools ecosystem, providing a full-featured player-to-player mail system for Minecraft servers.

The current module version is **2.0.0**, requiring **UltiTools-API 6.3.0 or later**. Upgrade the framework first, place `UltiMail-2.0.0.jar` in `plugins/UltiTools/plugins/` and restart fully; `/ul reload` does not load a new JAR.

## Feature Overview

UltiMail provides a complete in-game mail system for your server. Players can send text messages to both online and offline players, and attach items from their inventory as mail attachments. When a recipient logs in, they receive a clickable notification about unread mail that opens the inbox directly. Mail content and attachments can be browsed and claimed through a paginated GUI. Administrators have the ability to broadcast mail with attachments to all players at once. The module also includes a player recall system that sends in-game mail to all registered players, and can optionally send real emails via SMTP to bring back players who have been away.

## Installation

**Method 1: Install via UPM (Recommended)**

```
/upm install ultimail
```

**Method 2: Manual Installation**

1. Make sure UltiTools-API 6.3.0 or higher is installed on your server
2. Download `UltiMail-2.0.0.jar`
3. Place the JAR file in the `plugins/UltiTools/plugins/` directory
4. Restart the server

## Quick Start

After installation, players can start using the mail system immediately via commands. Here is a typical workflow:

**Send a mail to Steve:**

```
/sendmail Steve Hello
```

The system will prompt you to enter the mail body content. Once you finish typing, the mail is sent automatically. Type `cancel` at any time to abort.

**Send a mail with an item attachment:**

Hold the item you want to send in your main hand, then type:

```
/sendmail Steve HereIsASword attach
```

The system will take the item from your main hand and include it as an attachment. Administrators see a multi-item selection GUI instead of taking from the main hand.

**View your inbox:**

```
/mail inbox
```

This displays a text list of all your mail, showing read/unread status and attachment indicators.

**Browse inbox via GUI:**

```
/mail read
```

This opens a paginated GUI. Unread mail appears as a "Writable Book" icon, read mail as a "Book" icon. Click any mail to read it and claim attachments.

## Commands

### Player Commands

| Command | Description | Example | Player Only |
|---------|-------------|---------|-------------|
| `/mail` | Show help information | `/mail` | Yes |
| `/mail inbox` | View inbox as text list | `/mail inbox` | Yes |
| `/mail read` | Open inbox GUI | `/mail read` | Yes |
| `/mail read <number>` | Read a specific mail by number | `/mail read 3` | Yes |
| `/mail sent` | View sentbox as text list | `/mail sent` | Yes |
| `/mail sentgui` | Open sentbox GUI | `/mail sentgui` | Yes |
| `/mail claim <number>` | Claim item attachments from a mail | `/mail claim 1` | Yes |
| `/mail delete <number>` | Delete a mail (must claim attachments first) | `/mail delete 2` | Yes |
| `/mail delall` | Delete all mail (skips mail with unclaimed attachments) | `/mail delall` | Yes |
| `/mail delread` | Delete all read mail (skips mail with unclaimed attachments) | `/mail delread` | Yes |
| `/sendmail <player> <subject>` | Send a text mail (enters content input mode) | `/sendmail Steve Hello` | Yes |
| `/sendmail <player> <subject> attach` | Send mail with item attachment | `/sendmail Steve Gift attach` | Yes |

Command aliases: `/mail` and `/inbox` are equivalent; `/sendmail` and `/sm` are equivalent.

### Admin Commands

| Command | Description | Example | Player Only |
|---------|-------------|---------|-------------|
| `/mail sendall <content>` | Broadcast text mail to all players | `/mail sendall ServerMaintenanceTomorrow` | Yes |
| `/mail sendall <content> items` | Broadcast mail with attachments (opens item selection GUI) | `/mail sendall HolidayGifts items` | Yes |
| `/recall` | Send recall notifications to all registered players | `/recall` | No |
| `/recall <message>` | Send recall with custom message | `/recall NewUpdateIsHere` | No |

Command aliases: `/recall` and `/callback` are equivalent.

### Permissions

These permission nodes have no declared default grant and are operators-only by default; grant them explicitly to players. For the basic features below, grant `ultimail.use`, `ultimail.send` as needed. For example, with LuckPerms:

```text
/lp group default permission set ultimail.use true
/lp group default permission set ultimail.send true
```

| Permission | Description | Default |
|------------|-------------|---------|
| `ultimail.use` | Use the mail system (inbox, sentbox, read, delete, etc.) | OP (grant explicitly to players) |
| `ultimail.send` | Send mail | OP (grant explicitly to players) |
| `ultimail.admin.sendall` | Broadcast mail to all players | OP |
| `ultimail.admin.multiattach` | Use multi-item attachment GUI when sending mail (regular players can only attach the main hand item) | OP |
| `ultimail.recall` | Use the recall feature | OP |

## Configuration

Configuration file path: `plugins/UltiTools/pluginConfig/UltiMail/config/mail.yml`

```yaml
# Maximum number of items per mail attachment (range: 1-54)
max-items: 27

# Notify players about unread mail on join
notify-on-join: true

# Join notification delay (in seconds, range: 0-60)
notify-delay: 3

# Maximum mail subject length (range: 10-200)
max-subject-length: 50

# Maximum mail content length (range: 50-5000)
max-content-length: 500

# Send cooldown (in seconds, range: 0-300)
send-cooldown: 10

# New-mail notice for an online receiver
messages:
  # New mail received notification ({SENDER}=sender name)
  mail-received: "&e[Mail] &fYou received a new mail from &a{SENDER}&f!"

# ========== Player Recall Configuration ==========

recall:
  # Server name, used in recall mail display
  server-name: "Minecraft Server"
  # In-game recall mail subject ({SERVER}=server name)
  subject: "[{SERVER}] Come back to us"
  # In-game recall mail content ({SERVER}=server name, {SENDER}=sender name)
  content: "Dear player, {SERVER} misses you!\n\nCome back and take a look, we look forward to seeing you again!\n\nSender: {SENDER}"

# ========== Real Email Configuration (Optional) ==========

email:
  # Enable real email sending (requires javax.mail library)
  enabled: false
  # SMTP server address
  smtp-host: "smtp.example.com"
  # SMTP port (range: 1-65535)
  smtp-port: 587
  # SMTP username
  smtp-username: ""
  # SMTP password
  smtp-password: ""
  # Sender email address
  smtp-from-email: "noreply@example.com"
  # Use SSL encryption
  smtp-ssl: false
  # Use STARTTLS encryption
  smtp-starttls: true
  # Recall email subject ({SERVER}=server name)
  recall-subject: "[{SERVER}] We miss you!"
  # Recall email content ({SERVER}=server name, {PLAYER}=player name, {SENDER}=sender name)
  recall-content: "Dear {PLAYER},\n\nThe {SERVER} server misses you! Come back and take a look, we look forward to seeing you again!\n\nSender: {SENDER}"
```

#### Configuration reference (defaults for this language)

| Key | Type | Default | Description / range |
|---|---|---|---|
| `max-items` | number | `27` | Maximum number of items per mail attachment (range: 1-54) |
| `notify-on-join` | boolean | `true` | Notify players about unread mail on join |
| `notify-delay` | number | `3` | Join notification delay (in seconds, range: 0-60) |
| `max-subject-length` | number | `50` | Maximum mail subject length (range: 10-200) |
| `max-content-length` | number | `500` | Maximum mail content length (range: 50-5000) |
| `send-cooldown` | number | `10` | Send cooldown (in seconds, range: 0-300) |
| `messages.mail-received` | text | `"&e[Mail] &fYou received a new mail from &a{SENDER}&f!"` | New mail received notification ({SENDER}=sender name) |
| `recall.server-name` | text | `"Minecraft Server"` | Server name, used in recall mail display |
| `recall.subject` | text | `"[{SERVER}] Come back to us"` | In-game recall mail subject ({SERVER}=server name) |
| `recall.content` | text | `"Dear player, {SERVER} misses you!\n\nCome back and take a look, we look forward to seeing you again!\n\nSender: {SENDER}"` | In-game recall mail content ({SERVER}=server name, {SENDER}=sender name) |
| `email.enabled` | boolean | `false` | Enable real email sending (requires javax.mail library) |
| `email.smtp-host` | text | `"smtp.example.com"` | SMTP server address |
| `email.smtp-port` | number | `587` | SMTP port (range: 1-65535) |
| `email.smtp-username` | text | `""` | SMTP username |
| `email.smtp-password` | text | `""` | SMTP password |
| `email.smtp-from-email` | text | `"noreply@example.com"` | Sender email address |
| `email.smtp-ssl` | boolean | `false` | Use SSL encryption |
| `email.smtp-starttls` | boolean | `true` | Use STARTTLS encryption |
| `email.recall-subject` | text | `"[{SERVER}] We miss you!"` | Recall email subject ({SERVER}=server name) |
| `email.recall-content` | text | `"Dear {PLAYER},\n\nThe {SERVER} server misses you! Come back and take a look, we look forward to seeing you again!\n\nSender: {SENDER}"` | Recall email content ({SERVER}=server name, {PLAYER}=player name, {SENDER}=sender name) |


## Usage Tutorials

### Scenario 1: Sending a Letter to a Friend

You want to tell your friend Alex about a mining trip tomorrow:

1. Type `/sendmail Alex MiningTomorrow`
2. The system prompts: *Please enter mail content (type 'cancel' to cancel):*
3. Type: `Let's meet at the usual spot at 3 PM tomorrow. Bring your diamond pickaxe!`
4. The mail is sent automatically and you see a confirmation message

Even if Alex is offline, they will receive a notification when they next log in.

### Scenario 2: Sending an Item to a Friend

You want to give a diamond sword to Alex:

1. Hold the diamond sword in your main hand
2. Type `/sendmail Alex ASwordForYou attach`
3. The system takes the sword from your hand and prompts you for the mail body
4. Type something like `Use this sword to slay the dragon!`
5. The mail along with the item is sent successfully

When Alex receives the mail, they can use `/mail claim 1` (assuming it is mail number 1) to receive the sword in their inventory.

### Scenario 3: Admin Broadcasting a Maintenance Notice

As an admin, you want to notify everyone about tomorrow's maintenance:

```
/mail sendall ServerMaintenanceTonightAt2AM
```

If you also want to include compensation items for everyone, use:

```
/mail sendall MaintenanceCompensation items
```

A 45-slot selector opens, accepting at most `min(max-items, 45)` stacks (default 27). Shift-click or drag into the attachment area, then confirm to broadcast.

### Scenario 4: Managing Mail via GUI

1. `/mail read` opens the inbox GUI
2. Unread mail shows as a "Writable Book" icon, read mail shows as a "Book" icon
3. Click a mail entry: it is automatically marked as read; if it has attachments and you have inventory space, items are claimed automatically
4. Use the pagination buttons at the bottom to browse pages, and the close button to exit
5. `/mail sentgui` opens the sentbox GUI to check the status of mail you have sent

### Scenario 5: Recalling Inactive Players

Your server just had a major update and you want to bring back old players:

```
/recall Server1.21MajorUpdate
```

The system automatically sends in-game mail to all registered players. If you have enabled SMTP email in the configuration, real emails will also be sent to players who have an email address on file.

## FAQ

### Q: What if the plugin doesn't work after installation?

A: Check the following:
- Confirm UltiTools-API version is 6.3.0 or higher
- Confirm the JAR file is in `plugins/UltiTools/plugins/` (not the root `plugins/` directory)
- Check the server log for a `UltiMail has been enabled!` message
- If installed via `/upm install`, a server restart is required for it to take effect

### Q: Config changes not taking effect?

A: After modifying `plugins/UltiTools/pluginConfig/UltiMail/config/mail.yml`, use `/ul reload` to reload the configuration. No server restart is needed. An out-of-range number refuses module loading at startup. During `/ul reload`, the entire change to this configuration file is refused and the old running values are kept, including other settings in the same file. The file is not automatically rewritten. Correct the invalid value, then reload again. A new JAR still requires a restart.

### Q: How to set up permissions?

A: UltiMail uses the standard Bukkit permission system. You can assign permissions with any permission plugin (such as LuckPerms). For example:
- Allow all players to use mail: `ultimail.use` and `ultimail.send` (grant explicitly to players)
- Prevent a player from sending mail: revoke the `ultimail.send` permission
- Allow admins to broadcast mail: grant `ultimail.admin.sendall`

### Q: Can regular players attach multiple items?

A: No. Regular players using the `attach` parameter can only attach the item in their main hand. The system automatically takes it from their hand. Admins with the `ultimail.admin.multiattach` permission get a multi-item selection GUI that accepts the smaller of `max-items` and 45 stacks (default 27).

### Q: What happens if I delete mail with unclaimed attachments?

A: It won't happen. If a mail has unclaimed item attachments, the delete operation is blocked and the system tells you to claim attachments first. Batch delete operations (`/mail delall` and `/mail delread`) automatically skip mail with unclaimed attachments.

### Q: What if my inventory is full when claiming attachments?

A: The system checks for sufficient inventory space before claiming. If there isn't enough room, it tells you how many empty slots are needed and does not drop any items.

### Q: Does the recall feature require UltiLogin?

A: No. The recall feature will try to get the registered player list from UltiLogin first (if installed), but even without UltiLogin, it falls back to mail records and the server's offline player data. Real email sending does require players to have bound their email in UltiLogin.

### Q: Does SMTP email sending require additional setup?

A: Recall uses the server's existing JavaMail (`javax.mail`) environment and the `email` settings in `config/mail.yml`. A missing library is reported as a real-email failure in the console; in-game mail is unaffected. This upgrade does not require changing the JAR, switching provider or rotating SMTP credentials.

### Upgrade, Language and Attachments

This page describes UltiMail 2.0.0. `mail-expire-days` never took effect: this module has no mail expiry and keeps mail until a player deletes it. `messages.new-mail` and `messages.mail-sent` were never read either. Existing files are not stripped of those keys; startup and every module reload warn, and you may delete the unused keys.

The join notice and sent confirmation come from `notify_new_mail` (keep `{0}`) and `mail_sent_success` (keep `{RECEIVER}`) in `lang/<language>.yml` in the same module folder. To customize, copy the official file to `lang/en-myserver.yml`, edit the copy and set `language: en-myserver` in the UltiTools main configuration. Edits in official files are restored at start or module reload, with the edited file kept as `.bak`. Do not paste the old `{COUNT}` or `{PLAYER}` placeholders across.

The six text settings for `messages.mail-received`, recall titles/content and server name follow language at startup and `/ul reload` while they remain built-in text; operator-edited values stay. Change at least one character to keep a built-in text without having it follow language. Edit them in `config/mail.yml`; editing an extracted language file does not replace these configuration values. Framework-written comments also follow language, while custom comments stay.

The selector has 45 attachment slots, but its limit is the smaller of `max-items` and 45 (default 27). Shift-click from your inventory and dragging into the attachment area are supported. An over-limit move is refused and the item stays in your inventory; the bottom button row accepts no items. Closing without confirming, cancelling, unloading, or ending the content prompt without sending (any case of `cancel`, the 120-second timeout, quitting and similar endings) returns attachments; overflow drops at your feet. A refused send and excess items at confirmation are returned the same way. Before mail creation these items exist only in memory, not as a promise of crash recovery.

Attachment claims and attached commands record their state first. A failed claim record gives nothing; a failed command record runs nothing and asks you to read again. On a GUI click the attachment is claimed first and the commands run next tick, in written order. Failed or unknown commands are logged, do not stop later commands and are not individually retried. A mail left unfinished by an older version may run its commands once more on its next read. Direct `/mail read <number>` timing is unchanged. Failed deletion reports that it was not saved; batch deletion continues and reports successful and unsaved counts separately. This is not an exactly-once guarantee across servers or crashes.

### Known Limitations and Reload

The final subject word `attach` and final broadcast-content word `items` are attachment switches. Reword text that needs to end with that word. A switch without content sends nothing and shows help. Explicitly writing `messages` as `{}`, `~` or `null` keeps that empty value and uses default text; non-Chinese servers may also log two extra save warnings without overwriting values. To allow default child keys, leave nothing after the colon in `messages:` or write `mail-received` explicitly.

Run `/ul reload UltiMail` (or global `/ul reload`) to re-read configuration and language for subsequent mail. Unusable values warn; conditional-component toggles need a restart when the framework reports drift, since reload does not create or remove components. New JARs always need a restart. Recall continues using your existing mail environment; this upgrade introduces no SMTP rotation or new provider prerequisite. Do not edit `plugin.yml` inside the module JAR to configure email.

## Changelog

### v2.0.0

#### Changed

- This version requires UltiTools 6.3.0 or later and raises `api-version` in `plugin.yml` from `620`
  (the released 1.1.0 declaration) to `630`. Upgrade UltiTools before replacing the module JAR;
  older frameworks refuse this module at load with a warning that the UltiTools version is outdated,
  naming `UltiMail`. This module uses `DataOperator.updateCounted`, which frameworks 6.2.1 to 6.2.5
  do not provide (UltiKits/UltiMail#7, UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultimail`, the key of this module's entry in the UltiCloud
  catalogue. The framework's update check and `/upm update` skip a module that does not declare it, so this
  module now takes part in both: a later published version carrying the same key is reported at startup and
  can be installed with `/upm update` (UltiKits/UltiTools-Reborn#474).

- Message and title settings in `config/mail.yml` — the new-mail notice (`messages.mail-received`), the
  server name recall mails carry (`recall.server-name`), and the recall mail and email texts
  (`recall.subject`, `recall.content`, `email.recall-subject`, `email.recall-content`) — are written in the
  server's language when the module starts, and the file is what the module shows (for example
  `recall.subject: '[{SERVER}] Come back to us'` and `recall.server-name: Minecraft Server` under
  `language: en`); previously they were fixed Chinese text, so `language: en` had no effect on the new-mail
  notice or on recall mails. A setting that is still built-in text — in any language, or a default an
  earlier version shipped — follows `language`: it is rewritten when the module starts or after
  `/ul reload`. A setting you edited is kept, so a `recall.server-name` you set to your server's name stays
  as it is. To keep a built-in text but stop it following `language`, change at least one character
  (UltiKits/UltiMail#22). The text written is this module's built-in text: edit these settings in
  `config/mail.yml`; an edit of the extracted language file does not change them (earlier versions never
  read them from the language file either). The new-mail notice names the sender `{SENDER}`, as before.

#### Fixed

- A mail change whose stored row has been removed in the meantime is now reported as not saved, on every storage
  type. If an administrator deleted a mail from storage, or another server on a shared database did, while a
  player had the mailbox open, clicking that mail still marked the claim as saved and handed over the attachment
  (and ran its attached commands) from a mail that no longer existed. Now the claim is refused with `Your claim
  could not be recorded, so nothing was given. Please try again.`, the attached commands do not run, and the
  failure is logged; marking a mail read and deleting a mail log it the same way. Before, only the JSON storage
  reported a missing row, with an error (UltiKits/UltiMail#44).

- A mail's attached commands now run on the server tick after you click the mail in the mailbox (`/mail read`)
  instead of inside the click. The framework now runs a command at the moment it is dispatched, so an attached
  command that opens or closes a GUI (`/kits`, another module's menu, `/mail sentgui`) would otherwise have run
  inside the click event, which Paper does not allow, and could fail or leave the mailbox in a broken state.
  The mail is still recorded as run before anything runs, a command that fails is still logged and does not
  stop the ones after it, and the commands still run in their written order and only once. The attachment
  claim in the same click now happens first, so an attached command that gives items can no longer take the
  inventory slots the claim needs. `/mail read <number>`
  typed as a command is unchanged (UltiKits/UltiMail#43).

- `config/mail.yml` now writes its comments in the server's language. Twenty comments (every setting in the
  file) used to be Chinese-only, so a fresh install under `language: en` got a file with Chinese comments.
  Each is now a language-file key that the framework resolves in the server's `language` every time it
  writes the file, with an English and a Chinese entry in `lang/en.yml` and `lang/zh.yml`. On an existing
  server the comments the framework wrote on these twenty settings, the Chinese ones earlier versions wrote
  included, switch to the server's language at the next start, and after you change `language` and run
  a bare `/ul reload`; values are untouched, and a comment you wrote yourself is kept as you wrote it
  (UltiKits/UltiTools-Reborn#611) (UltiKits/UltiMail#42).

- The attachment selector (`/sendmail <player> <subject> attach` for a sender with
  `ultimail.admin.multiattach`) now takes items by shift-click from your own inventory, into the first
  free attachment slot, and by dragging into the attachment area; before, both were refused and only a
  plain click placed an item. When the page already holds as many attachments as it accepts
  (`max-items`, at most 45), a shift-click or drag that would add one is refused with
  `Too many attachments! Maximum <n> items` and the stack stays in your inventory; for
  `/sendmail … attach` that limit is now `max-items` (default 27), the same limit the send is checked
  against, where the window used to allow 45. A drag into the bottom button row is still refused
  (UltiKits/UltiMail#32). This check replaces a shift-click guard that
  could never fire (UltiKits/UltiMail#26).

- `/mail delete`, `/mail delall` and `/mail delread` no longer stop part-way when the storage cannot
  record a deletion. `/mail delete` answers `The mail could not be deleted because the storage did not
  record it. Please try again.`; `delall` and `delread` carry on with the other mails, report how many
  they deleted, and add `<n> mail(s) could not be deleted because the storage did not record it; they
  are still in your inbox. Please try again.` Before, a database error escaped the command after some
  mails were already deleted and the player saw only a generic error (UltiKits/UltiMail#38).

- A value inserted into a console line or a recall mail is shown exactly as written: every
  placeholder of the line is filled in one pass. Before, a value containing a later placeholder was
  rewritten — a server installed under a directory whose name contains `{KEY}` or `{REASON}` got a
  removed-key warning naming a path that does not exist, a failed recall email whose error text
  contained `{EMAIL}` named the wrong address, and a `recall.server-name` containing `{SENDER}` or
  `{PLAYER}` had it replaced in recall mails and emails (UltiKits/UltiMail#37).

- A mail's attachment and its attached commands are now recorded as claimed before they are handed
  over, and a claim that cannot be recorded is refused instead of being repeatable. When the storage
  cannot record the claim, `/mail claim` and the mailbox window answer
  `Your claim could not be recorded, so nothing was given. Please try again.` and give nothing; when it
  cannot record that the attached commands ran, none of them runs and the reader is told to read the
  mail again. An attached command that fails, or that the server reports as not run (an unknown command), is
  logged with the mail and the command, is not run again, and no longer stops the commands after it.
  `/mail claim` on an attachment that cannot be read now answers `This mail has no attachments!` instead of reporting 0 items claimed, and a storage error
  while marking a mail read is logged instead of aborting the read. A mail whose attached commands an
  earlier version left unfinished (a command that failed part-way, or a failed record) runs them once
  more when it is next read, then never again. For plugins that call `MailService`, `claimItems` keeps
  its signature and returns no items for a refused claim; the new `claimAttachment` also tells a
  refused claim apart from one with nothing to claim (UltiKits/UltiMail#31).

- `/mail help` now lists `/mail sentgui`, and each help line shows its command once, as does the
  attach line of `/sendmail` help. Those lines used to print the command twice, because the language
  file's help text already starts with it (UltiKits/UltiMail#21).

- `language: en` now applies to the unread-mail notice another module can send through UltiMail's
  mail service, which was fixed Chinese text (UltiKits/UltiMail#21), and to everything `/recall`
  prints — the permission refusal, the progress and summary lines and its help — and to the recall
  mail and email text (UltiKits/UltiMail#22). The three commands' descriptions (shown by `/help`)
  follow `language` too.

- The join notification now shows the real unread count, one pair of brackets around
  `[Click to view]`, and colour where it used to show `&` codes: it read
  `&e[Mail] &fYou have &a{0} &funread mail(s)! [&e[Click to view]]`. Clicking it still opens the
  inbox (UltiKits/UltiMail#24).

- The enable line on the console now follows `language` (it looked up a Chinese sentence that no
  language file carried), and under `language: zh` the join notification's hover text comes from the
  Chinese language file (UltiKits/UltiMail#28). `language: zh` also applies to the console lines that
  were fixed English text: a failed mail read, claim, command run, update or item conversion, a
  failed recall email, the missing-UltiLogin line of `/recall`, a selector that cannot be closed when
  the module unloads (now logged through the module's own logger), and the warning about a key this
  version no longer reads. Their English wording is unchanged, except that the warning for a
  leftover `messages.new-mail` no longer says the notification leaves the count out.

- Reloading this module (`/ul reload UltiMail`, or `/ul reload` for every module) now re-reads
  `config/mail.yml` and refreshes the language files, so an edited value such as
  `max-subject-length` applies to the next mail without a restart. Previously this module's reload
  method replaced the framework's and only logged a line, so neither step ran. UltiTools 6.3.0 also
  reports `@ConditionalOnConfig` drift and logs its own per-module reload line at this point
  (UltiKits/UltiMail#20).

- Unloading this module (`/upm uninstall UltiMail`) now runs the framework's command
  unregistration and then its listener unregistration, so the module's commands are really removed
  and its listeners stop firing. Its unload hook returns items from open attachment selectors before
  the listeners are removed. Previously this module's
  unload method replaced the framework's and only logged a line, so after `/upm uninstall UltiMail`
  both its commands and its listeners stayed active until the server restarted (UltiKits/UltiMail#20).

- An item placed in the attachment selector is now given back when that GUI is closed without
  clicking Confirm — the selector reached by `/sendmail <player> <subject> attach` for a sender
  holding `ultimail.admin.multiattach`, and by `/mail sendall <content> items`. Previously the item
  was destroyed: the module recognised the closing page by the inventory's holder, which the GUI
  library always leaves empty, so the code that gives items back could never run. The items come
  back exactly once, and any stack the sender's inventory no longer has room for is dropped at
  their feet instead of vanishing (UltiKits/UltiMail#27).

- The three other points where a mail attachment is handed back now also drop what no longer fits
  at the sender's feet instead of destroying it: the items above `max-items` when Confirm is
  clicked, a content prompt that ends without sending, and a send the server refuses (for
  example an unknown receiver). Each of these previously discarded whatever the sender's inventory
  could not hold (UltiKits/UltiMail#27).

- Unloading this module (`/upm uninstall UltiMail`) now hands back every item still sitting in an
  open attachment selector, and closes that selector, before the module stops listening. Previously
  those items were destroyed: the code that gives them back runs from an inventory-close event, and
  unloading the module unregisters its listeners, so no close event could reach it. An item placed
  in that GUI exists only in memory until the mail is created, which is why there was nothing to
  recover afterwards (UltiKits/UltiMail#27).

- An attachment waiting at the content prompt is now given back whenever that prompt ends without
  the mail being sent, however it ends: typing `cancel` in any capitalisation, the prompt's
  120-second timeout, the sender leaving the server, or another plugin ending the prompt.
  Previously only the exact lower-case word `cancel` gave it back. Typing `Cancel` or `CANCEL`
  ended the prompt by a different route, printed nothing at all, and destroyed the attachment —
  so a sender who held one copper ingot, ran `/sendmail <player> <subject> attach` and then typed
  `Cancel` was left with no ingot, nothing on the ground and no mail. The sender is now also told
  their send was cancelled on every one of those routes, instead of only some of them
  (UltiKits/UltiMail#27).

#### Removed

- 27 language-file entries that no code displayed, from `lang/en.yml` and `lang/zh.yml`: the
  `gui_*` page and button words (the pages use UltiTools' own), the `delete_confirm_*` lines (there is
  no delete confirmation page), the `send_*` lines that other entries replaced (`input_content_prompt`,
  `mail_sent_success`, `error_no_item_in_hand`), `attachment_gui_title`, `lore_subject`,
  `lore_items_count`, `error_no_permission`, `sendall_no_permission` (a permission refusal comes from
  UltiTools' own message), `arg_number`, `arg_content` and `notify_mail_received` (the new-mail notice
  is `messages.mail-received` in `config/mail.yml`, whose built-in text is `mail_received`); and
  `notify_hover_hint` from `lang/en.yml`, whose text the join notification now reads from `notify_hover_text`.

- The module's own console lines on unload and on reload (Chinese sentences meaning "UltiMail
  disabled!" and "UltiMail configuration reloaded!", printed in Chinese under either `language`
  setting), and the never-consulted `mail_disabled` and `mail_reloaded` language keys that
  described them. UltiTools 6.3.0 logs one reload line per module (`Module 'UltiMail' reloaded.`)
  (UltiKits/UltiMail#20).

- The `mail-expire-days` setting in `config/mail.yml` (default `30`). It never took effect in any
  version: nothing read it, this module has no mail expiry of any kind, and a mail was always kept
  until a player deleted it, whatever the value. Mail behaviour is unchanged. Removing the setting
  is not a rejection of mail expiry: a real implementation, which among other things has to decide
  what happens to a mail whose attachment was never claimed, is tracked as a feature request in
  UltiKits/UltiMail#34. A server upgraded from an earlier version keeps the key in its `mail.yml`,
  because the framework never deletes a key from an operator's file; while it is there, the module
  logs one warning at startup and on every reload of this module (`/ul reload` or
  `/ul reload UltiMail`), naming the file and the key, and the key can simply be deleted
  (UltiKits/UltiMail#23).

- The `messages.new-mail` and `messages.mail-sent` settings in `config/mail.yml`. Neither ever took
  effect: nothing read them, so editing them never changed what a player saw. The unread-mail
  notification on join and the confirmation a sender gets after sending already take their text
  from this module's language file, entries `notify_new_mail` and `mail_sent_success` in
  `lang/<language>.yml` beside the `config` folder, so they follow the server's `language` setting.
  To customise them, copy the official language file to one whose name starts with its language code and
  a hyphen (for example `lang/en-myserver.yml`), edit the entries there and set `language: en-myserver` in
  `plugins/UltiTools/config.yml`; an edit made in the official file itself is restored at the next start or module reload,
  the edited file kept as `.bak` (UltiKits/UltiTools-Reborn#616). Their placeholders differ from the removed keys': `notify_new_mail`
  carries `{0}` where the old key used `{COUNT}`, and `mail_sent_success` takes the receiver's
  name as `{RECEIVER}` (not `{PLAYER}`); text pasted across with the old placeholder is refused by
  the framework, which then uses the bundled text. The join notification now fills `{0}` with the
  unread count (UltiKits/UltiMail#24). Removing these unused settings does not change what players see.
  `messages.mail-received`, the setting
  for the message an online receiver gets when a mail arrives, is read and stays. A server upgraded
  from an earlier version keeps both removed keys in its `mail.yml`; while either is there, the
  module logs one warning for it at startup and on every reload of this module, naming the file,
  the key and the language entry that now holds the text, and the key can simply be deleted
  (UltiKits/UltiMail#23).


### v1.1.0 (2026-02-18)

Added:
- Paginated inbox/sentbox GUI
- Broadcast mail feature (`/mail sendall`)
- Batch delete commands (`/mail delall`, `/mail delread`)
- Clickable join notification (click to open inbox directly)
- Admin multi-item attachment GUI
- Command execution API (mail can carry commands that execute when read)
- Player recall feature (`/recall`) supporting in-game mail and SMTP email
- SMTP email sending configuration
- GameMailService interface implementation for cross-module mail via framework API
- Full i18n support (Chinese and English language packs)

The following core features also belong to the first release, v1.1.0; this repository never published a separate v1.0.0:
- Basic mail send/receive functionality (send, receive, read, delete)
- Item attachment support (Base64 serialized storage)
- Unread mail notification on join
- Sentbox viewing
- Send cooldown and length limits
