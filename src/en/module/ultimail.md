# UltiMail - In-Game Mail System

UltiMail is the mail system module for the UltiTools ecosystem, providing a full-featured player-to-player mail system for Minecraft servers.

## Feature Overview

UltiMail provides a complete in-game mail system for your server. Players can send text messages to both online and offline players, and attach items from their inventory as mail attachments. When a recipient logs in, they receive a clickable notification about unread mail that opens the inbox directly. Mail content and attachments can be browsed and claimed through a paginated GUI. Administrators have the ability to broadcast mail with attachments to all players at once. The module also includes a player recall system that sends in-game mail to all registered players, and can optionally send real emails via SMTP to bring back players who have been away.

## Installation

**Method 1: Install via UPM (Recommended)**

```
/upm install UltiMail
```

**Method 2: Manual Installation**

1. Make sure UltiTools-API 6.2.0 or higher is installed on your server
2. Download `UltiMail-1.1.0.jar`
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

| Permission | Description | Default |
|------------|-------------|---------|
| `ultimail.use` | Use the mail system (inbox, sentbox, read, delete, etc.) | All players |
| `ultimail.send` | Send mail | All players |
| `ultimail.admin.sendall` | Broadcast mail to all players | OP |
| `ultimail.admin.multiattach` | Use multi-item attachment GUI when sending mail (regular players can only attach the main hand item) | OP |
| `ultimail.recall` | Use the recall feature | OP |

## Configuration

Configuration file path: `plugins/UltiTools/UltiMail/config/mail.yml`

```yaml
# Maximum number of items per mail attachment (range: 1-54)
max-items: 27

# Mail expiry in days (0 = never expire, range: 0-365)
mail-expire-days: 30

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

# Notification message templates (supports color codes, {COUNT}=unread count)
messages:
  new-mail: "&e[Mail] &fYou have &a{COUNT} &funread mail(s)! Use /mail inbox to view"
  # Mail sent confirmation ({PLAYER}=recipient name)
  mail-sent: "&aMail sent to {PLAYER}!"
  # New mail received notification ({SENDER}=sender name)
  mail-received: "&e[Mail] &fYou received a new mail from &a{SENDER}&f!"

# ========== Player Recall Configuration ==========

recall:
  # Server name, used in recall mail display
  server-name: "Minecraft Server"
  # In-game recall mail subject ({SERVER}=server name)
  subject: "[{SERVER}] Come Back!"
  # In-game recall mail content ({SERVER}=server name, {SENDER}=sender name)
  content: "Dear player, {SERVER} misses you!\n\nCome back and check out what's new!\n\nFrom: {SENDER}"

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
  recall-content: "Dear {PLAYER},\n\n{SERVER} server misses you! Come back and check out what's new!\n\nFrom: {SENDER}"
```

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

A 45-slot item selection GUI opens up. Drag the items you want to send into the GUI and click the confirm button to broadcast.

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
- Confirm UltiTools-API version is 6.2.0 or higher
- Confirm the JAR file is in `plugins/UltiTools/plugins/` (not the root `plugins/` directory)
- Check the server log for a `UltiMail has been enabled!` message
- If installed via `/upm install`, a server restart is required for it to take effect

### Q: Config changes not taking effect?

A: After modifying `plugins/UltiTools/UltiMail/config/mail.yml`, use `/ul reload` to reload the configuration. No server restart is needed. Note that config values have range limits, and values outside the valid range will be ignored.

### Q: How to set up permissions?

A: UltiMail uses the standard Bukkit permission system. You can assign permissions with any permission plugin (such as LuckPerms). For example:
- Allow all players to use mail: `ultimail.use` and `ultimail.send` (granted by default)
- Prevent a player from sending mail: revoke the `ultimail.send` permission
- Allow admins to broadcast mail: grant `ultimail.admin.sendall`

### Q: Can regular players attach multiple items?

A: No. Regular players using the `attach` parameter can only attach the item in their main hand. The system automatically takes it from their hand. Admins with the `ultimail.admin.multiattach` permission get a multi-item selection GUI that supports up to 45 items.

### Q: What happens if I delete mail with unclaimed attachments?

A: It won't happen. If a mail has unclaimed item attachments, the delete operation is blocked and the system tells you to claim attachments first. Batch delete operations (`/mail delall` and `/mail delread`) automatically skip mail with unclaimed attachments.

### Q: What if my inventory is full when claiming attachments?

A: The system checks for sufficient inventory space before claiming. If there isn't enough room, it tells you how many empty slots are needed and does not drop any items.

### Q: Does the recall feature require UltiLogin?

A: No. The recall feature will try to get the registered player list from UltiLogin first (if installed), but even without UltiLogin, it falls back to mail records and the server's offline player data. Real email sending does require players to have bound their email in UltiLogin.

### Q: Does SMTP email sending require additional setup?

A: Yes, the server environment needs the `javax.mail` library. If you use Paper, you can add the JavaMail library to the `libraries` section of `plugin.yml` for automatic download. If the library is not present, in-game mail still works normally -- only real email sending is unavailable.

## Changelog

### v1.1.0 (2026-02-13)

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

### v1.0.0 (2026-02-13)

Added:
- Basic mail send/receive functionality (send, receive, read, delete)
- Item attachment support (Base64 serialized storage)
- Unread mail notification on join
- Sentbox viewing
- Send cooldown and length limits
