# UltiLogin - Login Authentication System

UltiLogin is the player authentication module for UltiTools, providing a secure registration and login system for offline-mode Minecraft servers.

The current module version is **2.0.0**, requiring **UltiTools-API 6.3.0 or later**. Upgrade the framework first, place `UltiLogin-2.0.0.jar` in `plugins/UltiTools/plugins/` and restart fully; `/ul reload` does not load a new JAR.

## Feature Overview

UltiLogin provides a complete account protection system for your server. Players must register or log in before they can do anything. Before logging in, all actions are blocked -- movement, chat, block breaking, interactions, and more. An optional blindness effect can be applied to unauthenticated players. The system supports two login modes: traditional command mode (`/login <password>`) and a visual GUI mode (numeric keypad interface). Passwords are stored using SHA-256 hashing with a per-account random salt. Additional security features include IP-based session persistence (skip login on quick reconnect), failed login lockout (brute-force protection), and per-IP registration limits. Admins can reset passwords, force-login players, delete accounts, and view account details. Version 1.0.0 also adds email binding, password recovery, and UltiCloud web panel login integration.

## Installation

### Method 1: Via UPM (Recommended)

Run in-game or from the console:

```
/upm install ultilogin
```

### Method 2: Manual Installation

1. Install UltiTools-API 6.3.0 or later, then download `UltiLogin-2.0.0.jar`
2. Place the JAR file in the `plugins/UltiTools/plugins/` directory
3. Restart the server

## Quick Start

After installation, UltiLogin activates automatically with default settings:

1. **New player joins** - Sees the prompt: `Please use /register <password> <confirm> to register`
2. **Register** - Type `/register mypassword mypassword`
3. **Registration complete** - Auto-logged in, can play normally
4. **Next time joining** - Sees the prompt: `Please use /login <password> to login`
5. **Login** - Type `/login mypassword`

To enable the GUI numeric keypad mode, set `gui-mode.enabled` to `true` in the config file and run `/ul reload UltiLogin`. The next credential prompt uses a keypad, except for web-created accounts without a game password.

## Commands

### Player Commands

| Command | Aliases | Description | Permission | Who Can Run |
|---------|---------|-------------|------------|-------------|
| `/login <password>` | `/l` | Log in to your account | None required | Player only |
| `/register <password> <confirm>` | `/reg` | Register a new account | None required | Player only |
| `/changepassword <old> <new> <confirm>` | `/changepw`, `/cpw` | Change password | `ultilogin.changepassword` | Player only |
| `/panel` | - | Get a web sign-in link (enabled integration and signed-in server required) | None required | Player only |
| `/setpassword <new> <confirm>` | `/setpw` | Set the first password while logged in with a passwordless account | None required | Player only |
| `/regs <email>` | - | Bind an email address | `ultilogin.email` | Player only |
| `/regs <code>` | - | Verify email binding | `ultilogin.email` | Player only |
| `/recover` | - | Request password recovery code | `ultilogin.recover` | Player only |
| `/recover <code> <new_pw> <confirm>` | - | Reset password with code | `ultilogin.recover` | Player only |

### Admin Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/logadmin reset <player> [password]` | Reset player password (random if omitted) | `/logadmin reset Steve abc123` |
| `/logadmin forcelogin <player>` | Force-login an online player | `/logadmin forcelogin Steve` |
| `/logadmin unregister <player>` | Delete a player's account | `/logadmin unregister Steve` |
| `/logadmin info <player>` | View player account details | `/logadmin info Steve` |

Admin command alias: `/loginadmin`. All admin commands require `ultilogin.admin` permission and can be run from both in-game and the console.

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `ultilogin.changepassword` | Allow changing password | All players |
| `ultilogin.admin` | Admin command access | OP only |
| `ultilogin.email` | Email binding feature | All players |
| `ultilogin.recover` | Password recovery feature | All players |

## Configuration

### Main Login Configuration

File path: `plugins/UltiTools/pluginConfig/UltiLogin/config/login.yml`

```yaml
# ==================== Basic Settings ====================

# Login timeout in seconds -- player is kicked if they don't log in within this time
# Range: 10-600
login-timeout: 60

# Enable session feature (same IP can skip login within timeout period)
session-enabled: true

# Session expiry time in minutes
# Range: 1-1440
session-timeout: 30

# Maximum registrations per IP (0 = unlimited)
# Range: 0-100
max-register-per-ip: 0

# ==================== GUI Mode Settings ====================

gui-mode:
  # Enable GUI login mode (numeric keypad interface)
  enabled: false

  # GUI mode password length (digits 1-9, recommended 4-6)
  # Range: 1-9
  password-length: 4

  # GUI login screen title (supports color codes)
  title-login: "&6Enter Password"

  # GUI registration screen title
  title-register: "&6Set Password"

  # GUI confirm password screen title
  title-confirm: "&6Confirm Password"

# ==================== Command Mode Password Settings ====================

password:
  # Minimum password length for command mode
  # Range: 4-32
  min-length: 6

  # Maximum password length for command mode
  # Range: 6-128
  max-length: 32

# ==================== Login Security ====================

security:
  # Maximum failed login attempts (0 = unlimited)
  # Range: 0-20
  max-login-attempts: 5

  # Lockout duration in seconds after too many failures
  # Range: 60-86400
  lockout-duration: 900

  # Lockout type: IP / UUID / BOTH
  lockout-type: BOTH

# ==================== Spawn Location ====================

spawn-location:
  # Teleport unauthenticated players to a specified location
  enabled: false

  # Spawn world name
  world: world

  # Spawn coordinates
  x: 0
  y: 64  # Range: -64 to 320
  z: 0

# ==================== Other Settings ====================

# Commands allowed before login
allowed-commands:
  - login
  - l
  - register
  - reg
  - panel
  - regs
  - recover

# Apply blindness effect to unauthenticated players
blind-effect: true

# ==================== UltiCloud Integration ====================

ulticloud:
  # Enable UltiCloud integration (allows /panel command for web panel login)
  enabled: false

# ==================== Messages ====================

messages:
  # Registration prompt (command mode)
  register-prompt: "&ePlease use /register <password> <confirm> to register"

  # Registration prompt (GUI mode)
  register-prompt-gui: "&ePlease set your password in the popup"

  # Login prompt (command mode)
  login-prompt: "&ePlease use /login <password> to login"

  # Login prompt (GUI mode)
  login-prompt-gui: "&ePlease enter your password in the popup"

  # Registration success
  register-success: "&aRegistration successful! Welcome to the server!"

  # Login success
  login-success: "&aLogin successful! Welcome back!"

  # Already logged in
  already-logged: "&eYou are already logged in!"

  # Not registered
  not-registered: "&cYou are not registered! Please register first."

  # Already registered
  already-registered: "&cYou are already registered! Please login."

  # Password mismatch
  password-mismatch: "&cPasswords do not match!"

  # Password too short ({MIN} is replaced with the minimum length)
  password-too-short: "&cPassword too short! At least {MIN} characters required."

  # Password too long ({MAX} is replaced with the maximum length)
  password-too-long: "&cPassword too long! Maximum {MAX} characters allowed."

  # Timeout kick
  timeout-kick: "&cLogin timeout! Please reconnect."

  # Account locked ({TIME} is replaced with seconds)
  account-locked: "&cToo many failed login attempts! Please try again in {TIME} seconds."

  # Remaining attempts ({COUNT} is replaced with the count)
  attempts-remaining: "&cWrong password! Remaining attempts: {COUNT}"

  # GUI password invalid ({LENGTH} is replaced with the required length)
  gui-password-invalid: "&cPassword must be {LENGTH} digits!"

  # ==================== Admin Messages ====================

  admin:
    # Admin password reset ({PLAYER}=player name, {PASSWORD}=new password)
    password-reset: "&aReset password for player {PLAYER} to: {PASSWORD}"

    # Admin force login
    force-login: "&aForce logged in player {PLAYER}"

    # Admin account deletion
    unregister: "&aDeleted account for player {PLAYER}"

    # Player not online
    player-not-found: "&cPlayer {PLAYER} not found"

    # Account not found
    account-not-found: "&cPlayer {PLAYER} is not registered"
```

#### Configuration reference (defaults for this language)

| Key | Type | Default | Description / range |
|---|---|---|---|
| `login-timeout` | number | `60` | Login timeout in seconds -- player is kicked if they don't log in within this time；Range: 10-600 |
| `session-enabled` | boolean | `true` | Enable session feature (same IP can skip login within timeout period) |
| `session-timeout` | number | `30` | Session expiry time in minutes；Range: 1-1440 |
| `max-register-per-ip` | number | `0` | Maximum registrations per IP (0 = unlimited)；Range: 0-100 |
| `gui-mode.enabled` | boolean | `false` | Enable GUI login mode (numeric keypad interface) |
| `gui-mode.password-length` | number | `4` | GUI mode password length (digits 1-9, recommended 4-6)；Range: 1-9 |
| `gui-mode.title-login` | text | `"&6Enter Password"` | GUI login screen title (supports color codes) |
| `gui-mode.title-register` | text | `"&6Set Password"` | GUI registration screen title |
| `gui-mode.title-confirm` | text | `"&6Confirm Password"` | GUI confirm password screen title |
| `password.min-length` | number | `6` | Minimum password length for command mode；Range: 4-32 |
| `password.max-length` | number | `32` | Maximum password length for command mode；Range: 6-128 |
| `security.max-login-attempts` | number | `5` | Maximum failed login attempts (0 = unlimited)；Range: 0-20 |
| `security.lockout-duration` | number | `900` | Lockout duration in seconds after too many failures；Range: 60-86400 |
| `security.lockout-type` | text | `BOTH` | Lockout type: IP / UUID / BOTH |
| `spawn-location.enabled` | boolean | `false` | Teleport unauthenticated players to a specified location |
| `spawn-location.world` | text | `world` | Spawn world name |
| `spawn-location.x` | number | `0` | Spawn coordinates |
| `spawn-location.y` | number | `64` | Range: -64 to 320 |
| `spawn-location.z` | number | `0` | See the key and complete example above |
| `allowed-commands` | list | `[login, l, register, reg, panel, regs, recover]` | ==================== Other Settings ====================；Commands allowed before login |
| `blind-effect` | boolean | `true` | Apply blindness effect to unauthenticated players |
| `ulticloud.enabled` | boolean | `false` | Enable UltiCloud integration (allows /panel command for web panel login) |
| `messages.register-prompt` | text | `"&ePlease use /register <password> <confirm> to register"` | Registration prompt (command mode) |
| `messages.register-prompt-gui` | text | `"&ePlease set your password in the popup"` | Registration prompt (GUI mode) |
| `messages.login-prompt` | text | `"&ePlease use /login <password> to login"` | Login prompt (command mode) |
| `messages.login-prompt-gui` | text | `"&ePlease enter your password in the popup"` | Login prompt (GUI mode) |
| `messages.register-success` | text | `"&aRegistration successful! Welcome to the server!"` | Registration success |
| `messages.login-success` | text | `"&aLogin successful! Welcome back!"` | Login success |
| `messages.already-logged` | text | `"&eYou are already logged in!"` | Already logged in |
| `messages.not-registered` | text | `"&cYou are not registered! Please register first."` | Not registered |
| `messages.already-registered` | text | `"&cYou are already registered! Please login."` | Already registered |
| `messages.password-mismatch` | text | `"&cPasswords do not match!"` | Password mismatch |
| `messages.password-too-short` | text | `"&cPassword too short! At least {MIN} characters required."` | Password too short ({MIN} is replaced with the minimum length) |
| `messages.password-too-long` | text | `"&cPassword too long! Maximum {MAX} characters allowed."` | Password too long ({MAX} is replaced with the maximum length) |
| `messages.timeout-kick` | text | `"&cLogin timeout! Please reconnect."` | Timeout kick |
| `messages.account-locked` | text | `"&cToo many failed login attempts! Please try again in {TIME} seconds."` | Account locked ({TIME} is replaced with seconds) |
| `messages.attempts-remaining` | text | `"&cWrong password! Remaining attempts: {COUNT}"` | Remaining attempts ({COUNT} is replaced with the count) |
| `messages.gui-password-invalid` | text | `"&cPassword must be {LENGTH} digits!"` | GUI password invalid ({LENGTH} is replaced with the required length) |
| `messages.admin.password-reset` | text | `"&aReset password for player {PLAYER} to: {PASSWORD}"` | Admin password reset ({PLAYER}=player name, {PASSWORD}=new password) |
| `messages.admin.force-login` | text | `"&aForce logged in player {PLAYER}"` | Admin force login |
| `messages.admin.unregister` | text | `"&aDeleted account for player {PLAYER}"` | Admin account deletion |
| `messages.admin.player-not-found` | text | `"&cPlayer {PLAYER} not found"` | Player not online |
| `messages.admin.account-not-found` | text | `"&cPlayer {PLAYER} is not registered"` | Account not found |


### Email Configuration

File path: `plugins/UltiTools/pluginConfig/UltiLogin/config/email.yml`

The email feature requires UltiTools framework's EmailService to be configured and enabled.

```yaml
# ==================== Verification Code Settings ====================

verification:
  # Verification code length (Range: 4-8)
  code-length: 6

  # Code expiry time in seconds (Range: 60-1800)
  code-expiry-seconds: 300

  # Maximum attempts per verification code (Range: 1-10)
  max-attempts: 3

  # Cooldown between code requests in seconds (Range: 30-600)
  cooldown-seconds: 60

# ==================== Email Domain Blacklist ====================

# Blocked temporary email domains
domain-blacklist:
  - 10minutemail.com
  - tempmail.com
  - guerrillamail.com
  - mailinator.com
  - throwaway.email

# ==================== Account Limits ====================

# Maximum accounts per email address (Range: 1-10)
max-accounts-per-email: 1

# ==================== Binding Rewards ====================

reward:
  # Enable reward for binding an email
  enabled: false

  # Commands to execute as reward (%player% is replaced with the player name)
  commands:
    - "givemoney %player% 500"
```

#### Configuration reference (defaults for this language)

| Key | Type | Default | Description / range |
|---|---|---|---|
| `verification.code-length` | number | `6` | Verification code length (Range: 4-8) |
| `verification.code-expiry-seconds` | number | `300` | Code expiry time in seconds (Range: 60-1800) |
| `verification.max-attempts` | number | `3` | Maximum attempts per verification code (Range: 1-10) |
| `verification.cooldown-seconds` | number | `60` | Cooldown between code requests in seconds (Range: 30-600) |
| `domain-blacklist` | list | `[10minutemail.com, tempmail.com, guerrillamail.com, mailinator.com, throwaway.email]` | ==================== Email Domain Blacklist ====================；Blocked temporary email domains |
| `max-accounts-per-email` | number | `1` | ==================== Account Limits ====================；Maximum accounts per email address (Range: 1-10) |
| `reward.enabled` | boolean | `false` | Enable reward for binding an email |
| `reward.commands` | list | `["givemoney %player% 500"]` | Commands to execute as reward (%player% is replaced with the player name) |


## Usage Tutorials

### Command Mode Login (Default)

The basic login flow where players type commands:

**New player registration:**
1. Join the server, see: `Please use /register <password> <confirm> to register`
2. Type `/register MyPass123 MyPass123` (password must be 6-32 characters)
3. See `Registration successful! Welcome to the server!` and you can play normally

**Returning player login:**
1. Join the server, see: `Please use /login <password> to login`
2. Type `/login MyPass123`
3. See `Login successful! Welcome back!` and you can play normally

### GUI Numeric Keypad Mode

When enabled, players see a numeric keypad interface on join:

**How to enable:** Set `gui-mode.enabled: true` in `config/login.yml`

**Interface layout:**
- Number buttons 1-9: Colored wool blocks with quantity matching the number
- Password display: Paper icon at the top showing filled/unfilled digits (using filled circles and empty circles)
- Confirm button (green): Manually submit password
- Clear button (red): Clear entered digits
- Exit button (orange): Close the GUI (you still need to log in to play)

**Registration flow:**
1. The GUI opens with the title "Set Password"
2. Click number buttons to enter your password (default 4 digits)
3. After entering all digits, the title changes to "Confirm Password"
4. Enter the same password again
5. If passwords match, registration is complete

**Login flow:**
1. The GUI opens with the title "Enter Password"
2. Click number buttons to enter your password
3. After entering all digits, it auto-submits for verification

Closing the GUI will cause it to reopen automatically until login succeeds.

### Changing Your Password

Logged-in players can change their password:

```
/changepassword <old_password> <new_password> <confirm_new_password>
```

For example: `/cpw OldPass123 NewPass456 NewPass456`

### Binding an Email

After logging in, you can bind an email for password recovery:

1. Type `/regs your@email.com`
2. Check your inbox for the verification code
3. Type `/regs 123456` (replace with your actual code)
4. See the success confirmation

Notes:
- You must be logged in to bind an email
- Temporary email domains are blocked
- Each email can only be bound to 1 account by default
- There is a 60-second cooldown between code requests

### Password Recovery

If you forgot your password but have a bound email:

1. Before logging in (unauthenticated state), type `/recover`
2. Check your inbox for the verification code
3. Type `/recover 123456 NewPassword NewPassword`
4. Password is reset and you are automatically logged in

### Admin Operations

**Reset a player's password (specify password):**
```
/logadmin reset Steve newpassword
```

**Reset a player's password (random):**
```
/logadmin reset Steve
```
The system generates a random password and displays it to the admin. Run resets in game: console replies contain the password and enter logs; a panel remote reset also records the command in remote audit logs.

**Force-login an online player:**
```
/logadmin forcelogin Steve
```

**Delete a player's account (allows re-registration):**
```
/logadmin unregister Steve
```

**View player account info:**
```
/logadmin info Steve
```
Displays player name, UUID, register IP, last IP, login count, email binding status, register time, and last login time.

### Configuring a Login Spawn Point

If you want unauthenticated players to be teleported to a safe area (instead of staying where they logged out):

```yaml
spawn-location:
  enabled: true
  world: world
  x: 0
  y: 100
  z: 0
```

After successful login, the player is automatically teleported back to their original location.

## FAQ

### What if the plugin doesn't work after installation?

Check the following:
- The JAR file is in `plugins/UltiTools/plugins/` (not the `plugins/` root directory)
- The server has been fully restarted (not just `/reload`)
- There are no errors in the console
- UltiTools-API version is >= 6.3.0
- The server is in offline mode (`online-mode=false` in `server.properties`)

### Config changes not taking effect?

After modifying `config/login.yml` or `config/email.yml`, run `/ul reload` or restart the server.

### How to set up permissions?

- `/login` and `/register` require no permissions -- all players can use them
- `/changepassword` requires `ultilogin.changepassword` (default: all players)
- `/logadmin` commands require `ultilogin.admin` (default: OP only)
- `/regs` requires `ultilogin.email` (default: all players)
- `/recover` requires `ultilogin.recover` (default: all players)
- Use a permissions plugin (e.g., LuckPerms) to adjust as needed

### What is the difference between GUI mode and command mode?

| Comparison | Command Mode (Default) | GUI Mode |
|------------|----------------------|----------|
| Password type | Any characters | Digits only (1-9) |
| Password length | 6-32 characters (configurable) | Fixed length (default 4 digits) |
| Interaction | Type commands | Click number buttons |
| Security | Higher (complex passwords) | Lower (short numeric passwords) |
| Convenience | Requires typing | Click-based |

Command mode is recommended for servers prioritizing security. GUI mode is better suited for casual servers (e.g., minigame servers) where convenience matters more.

### What does session persistence mean?

When enabled, a player reconnecting from the same IP address within the session timeout (default 30 minutes) will be automatically logged in without entering a password. This is convenient for players who disconnect and quickly reconnect. You can adjust the timeout or disable this feature in the configuration.

### How to unlock a locked-out player?

If a player gets locked out due to too many failed login attempts:
- **Wait for the lockout to expire** - Default is 900 seconds (15 minutes)
- **Admin force-login** - `/logadmin forcelogin <player>` lets the player play but does not remove or shorten existing locks; it does not clear an IP lock
- **Restart the server** - Lockout data is stored in memory and cleared on restart

### Email binding not available?

The email feature depends on UltiTools framework's EmailService. If you see "Email service is not enabled":
1. Make sure SMTP email service is configured in the UltiTools main configuration
2. Confirm the email service is enabled and connected
3. Check the server console for email-related errors

### Web Panel Sign-In and the First Game Password

`/panel` is usable before game login, but the owner must first run `ulticloud login` in the server console and set `ulticloud.enabled: true` in `config/login.yml`. Both link creation and polling use the server owner's UltiCloud credential. The old anonymous path is removed immediately, with no anonymous fallback or grace period. A signed-out server, a failed connection or a refused credential creates no link; follow the game and console messages rather than disabling authentication.

1. Run `/panel` and click the chat link (valid for five minutes). Opening it alone never logs anyone in.
2. An already-linked game name needs the linked account's password or one click on a device that account previously remembered. A player already logged in in game can confirm linking with a signed-in website account. A name without an UltiLogin account on this server may create an account on the web.
3. An existing game account that is neither logged in in game nor linked is refused: run `/login` first, then `/panel` again. Ordinary game `/login`, normal website account login, and browser verification, completion and cancellation using the link code all remain available.
4. A web-created account is registered on this server without a game password and logged in, with a prompt to use `/setpassword <new> <confirm>`. For example, while logged in run `/setpassword MyPass123 MyPass123`. An account with a password uses `/changepassword`. Until a game password is set, `/login` always refuses without counting a wrong password; GUI mode does not show an impossible-to-satisfy number pad either.

A pending link pauses an unauthenticated player's login countdown, not the movement or chat restrictions. Cancellation, refusal or expiry resumes the time left, never a fresh timeout; failed creation restores it silently. A cancelled link can still complete in the browser before expiry. Quitting invalidates pending links, so completing one after leaving logs nobody in. Web outcomes and refusal reasons are shown in game; a refused server credential is also logged to the console. Running `/panel` again can keep the countdown paused for another five-minute link, but the other restrictions remain.

### Failed-Login Protection and Upgrade Values

A new file uses `max-register-per-ip: 0` (unlimited), because players on campus or mobile networks may share a public address. Existing values such as `3` are not rewritten. An explicitly set limit also applies to web registration: the web can report registration while the game refuses to create the account because of that limit.

The new `security.lockout-type` default is `BOTH`: failures at one address for one account form a pair; reaching the threshold locks that pair. Reaching the threshold of different failing accounts at an address separately locks the whole address. `UUID` counts per account; `IP` shares the address count. Success clears only its own UUID or pair count, never the IP count or BOTH address collection, and never shortens an existing lock. IP counts and each address-collection member expire `lockout-duration` seconds after their respective latest failure; unlocked UUID/pair counts do not time-expire and reset on their own success or corresponding lock expiry.

Upgrades keep existing modes, including `IP` and lowercase `uuid`; they do not opt you into the new default. To change, explicitly set `security.lockout-type: BOTH` and run `/ul reload UltiLogin`. Case and surrounding spaces are ignored. An unusable value warns and uses BOTH in memory only, leaving the file unchanged. `security.max-login-attempts: 0` disables new failure counts and locks and reports wrong passwords; it is not a command to clear existing locks. A proxy without real-address forwarding makes players share address protection, and these measures do not stop guesses distributed over many addresses.

`allowed-commands: []` or `~` does not block every command: it warns and uses the shipped nonempty list at runtime, leaving the file as written. Edit individual entries to add or remove allowed commands.

### Language, Reload and Known Limitations

The three GUI titles and twenty-one messages in the configuration follow the server language at startup and `/ul reload` while they are still built-in text, including another language's or an old shipped default. Operator-edited text is kept. Change at least one character to keep a built-in text without having it follow language. Edit these texts in `config/login.yml`, not by editing the language file. Framework-written comments follow language; custom comments stay. Official JSON language files are restored at start and module reload, with edited copies kept as `.bak`. For custom text copy to `lang/en-myserver.json` and set `language: en-myserver` in the UltiTools main configuration. The unused `messages.wrong-password` is no longer written to new files; leftovers warn and can be deleted. The real wrong-password reply comes from `wrong_password` in the custom language file.

While enabled, the module masks password arguments in Paper's player-command log lines, including aliases, case variants and namespaces. It does not mask every output: a password reset sent through the panel remote console still enters remote-command and audit logs; a reset run in the server console still replies with the password and mirrors it to the panel log stream. Run admin resets in game so the reply goes only to the operator. A filter-installation failure warns at startup; do not assume masking then.

Session auto-login also counts as logged in in game. On an offline-mode server sharing public addresses, someone joining with a not-yet-linked name in that window could claim its web link; disable sessions (`session-enabled: false`) or link your name early. An account registered in game before pending web registration completes stays untouched. Failed account writes are logged, but login, panel login and email binding still follow their previous failure paths; notably a lost binding can still report success and give its reward, so the message is not proof of durable storage. New JARs require a restart; `/ul reload UltiLogin` only re-reads configuration and language. Unloading unregisters commands and listeners.

## Changelog

### v2.0.0

#### Added

- `/setpassword <new> <confirm>` (alias `/setpw`) sets the first game password of an account created on the web
  through `/panel`. It works only while the player is logged in and the account has no game password, and it follows
  the same password rules as `/register`; afterwards `/login` works with it. An account that already has a password
  is told to use `/changepassword`.

- A web registration counts as an UltiLogin registration. When a player whose name has no UltiLogin account on this
  server creates a new UltiKits account on the `/panel` page, the game creates their UltiLogin account without a game
  password, logs them in and tells them once to set one with `/setpassword`. `/login` refuses such an account, whatever
  is typed, until a game password is set, and the refused try is not counted as a wrong password. If the player
  registers in game first, that account is kept untouched. A `max-register-per-ip` limit, when set, applies to it too.
  With `gui-mode.enabled: true` such an account is never shown the number pad, which no digits could satisfy: on
  joining and at every re-prompt the player is told to log in with `/panel` and then set a game password.

- Every web outcome of a `/panel` link is shown in game: cancelled on the page, refused by the web (with the reason),
  expired, signed in, or the server's UltiCloud credential refused (also logged to the console). While a player who
  has not logged in holds a pending link, the login countdown is paused; it resumes with the time that was left when
  the link is cancelled, refused or expires, never with a fresh full timeout. The other restrictions stay. A player who
  leaves the server loses their pending links, so a sign-in completed on the web after they left logs nobody in.

#### Changed

- **Lockout redesign (UltiKits/UltiLogin#50):** BOTH now counts and locks each (address, account UUID) pair,
  independently of that account at other addresses, and separately locks an address after `max-login-attempts`
  different accounts fail there. Success clears only its own pair, never the address's failed-account memberships.
  IP-mode successes no longer clear the shared address count, closing the success-reset bypass. IP counts and
  each BOTH address membership expire `lockout-duration` seconds after their latest failure; unlocked UUID/pair
  counts still reset only on their own success or corresponding lock expiry. BOTH is the new fresh/missing-key
  default. Existing operator values (including IP and lowercase uuid) stay byte for byte; unusable values warn and
  fall back to BOTH only in memory. Recognised old shipped comments refresh without overwriting custom comments.

- **`/panel` requires the server to be signed in to UltiCloud.** Create and poll both use the server owner's
  credential; there is no anonymous fallback or grace period for older plugins. If the server is not signed in,
  no link is created: the player is told to ask the owner to run `ulticloud login` in the console. A failed creation
  restores the remaining login countdown silently; it does not grant a new timeout. A refused credential (HTTP
  401/403) is reported in game and in the console, never retried without it. Opening a link never logs the player
  in by itself: the page asks for the linked account's password, a device that account told it to remember (one
  click), confirmation by a signed-in account (only for a player logged in in game), or a new account (only for a
  name without an UltiLogin account). A name with an UltiLogin account that is neither logged in in game nor linked
  is refused until the player runs `/login` once. Normal website account login, browser link verification,
  completion and cancellation, and game `/login` remain available.

- UltiLogin 2.0.0 requires UltiTools-API 6.3.0 or later and raises `api-version` in `plugin.yml` from `620`
  (the last released version, 1.0.0) to `630`. Older frameworks cannot load this module; upgrade UltiTools before
  installing it. A new module JAR needs a server restart; `/ul reload` only reloads configuration
  (UltiKits/UltiTools-Reborn#544).

- `plugin.yml` now declares `identify-string: ultilogin`, the key of this module's entry in the UltiCloud catalogue.
  The framework's update check and `/upm update` skip a module that does not declare it, so this module now takes part
  in both: a later published version carrying the same key is reported at startup and can be installed with
  `/upm update` (UltiKits/UltiTools-Reborn#474).

- `max-register-per-ip` in `config/login.yml` now ships as `0` (no per-IP registration limit) instead of `3`. Many
  players can share one public IP address (carrier-grade NAT, common in mainland China and on mobile and campus
  networks), so a limit can stop legitimate players from registering; the comment above the key now says so. Only a
  file without the key gets the new default: a value already in your file, including `3`, is kept, and only the comment
  earlier versions wrote above it is replaced. When you set a limit, it also applies to an account created on the web
  through `/panel`: the web page reports the registration, but the game refuses the account and the player sees the
  IP-limit message.

- `allowed-commands: []` (or `~`) in `config/login.yml` no longer refuses every command to a player who has not
  logged in. The setting is declared `@NotEmpty`, and from UltiTools 6.3.0 the framework treats an empty value of such a
  list as unusable: the module runs on the shipped list (`login, l, register, reg, panel, regs, recover`) and logs one
  WARNING naming `allowed-commands`, the value as written and that default. The file is left exactly as you wrote it.
  Before, `[]` was loaded as an empty list, so `/login` and `/register` were refused too; `~` ran the default list but
  the file was rewritten. To allow fewer commands, list them; to allow more, add them (UltiKits/UltiLogin#52).

- Message and title settings in `config/login.yml` — the three GUI titles (`gui-mode.title-login`,
  `gui-mode.title-register`, `gui-mode.title-confirm`) and the twenty-one messages (`messages.register-prompt`,
  `register-prompt-gui`, `login-prompt`, `login-prompt-gui`, `register-success`, `login-success`, `already-logged`,
  `not-registered`, `already-registered`, `password-mismatch`, `password-too-short`, `password-too-long`,
  `timeout-kick`, `account-locked`, `attempts-remaining`, `gui-password-invalid`, and `messages.admin.password-reset`,
  `force-login`, `unregister`, `player-not-found`, `account-not-found`) — are written in the server's language when
  the module starts, and the file is what the module shows (for example `messages.login-success:
  '&aLogin successful! Welcome back!'` under `language: en`); previously they were fixed Chinese text, so
  `language: en` had no effect on them. A setting that is still built-in text — in any language, or a default an
  earlier version shipped — follows `language`: it is rewritten when the module starts or after `/ul reload`. A
  setting you edited is kept. To keep a built-in text but stop it following `language`, change at least one
  character (UltiKits/UltiLogin#20). The text written is this module's built-in text: edit these settings in `config/login.yml`; an edit of the extracted
  language file does not change them (earlier versions never read them from the language file either).

- `language: en` now applies to everything this module shows or logs: the help of `/login`,
  `/register`, `/changepassword`, `/logadmin` and `/panel`, the `/changepassword` and `/logadmin`
  replies, the `/logadmin info` block, the registration refusal when an IP has reached its limit,
  the session auto-login line, the login and registration keypads (item names, lore, the
  confirmation step and the registration failure), the seven command descriptions, and the console
  lines. Most of this was fixed Chinese text in every language, although the language files already
  held English text for much of it that no code read; the console lines were fixed English text and
  now follow `language: zh` too (UltiKits/UltiLogin#20).

- The login and registration keypads' buttons now work under every language and under titles you
  have customised; how the keypads are recognised is in the UltiKits/UltiLogin#35 entry under
  `### Fixed`. They used to be
  recognised by whether the inventory title contained the Chinese word for "password", "login" or
  "register": a keypad whose title contained none of them cancelled every click, which with the
  titles now following `language` would have included the English ones, and another plugin's
  inventory whose title happened to contain one of those words could be clicked by a player who had
  not logged in (UltiKits/UltiLogin#20).

- A wrong code in `/recover <code> <password> <confirm>` now says how many attempts are left, for
  example `Invalid verification code! Remaining attempts: 2`. It used to show the placeholder itself,
  `Remaining attempts: {COUNT}`, because the recovery path never filled it in; `/regs <code>`
  already did (UltiKits/UltiLogin#21).

- A player who has not logged in can no longer equip or remove an armor stand's items, interact with
  an entity at a precise point on its body, or swap their main hand and off hand. All three were
  still allowed: the login protection already refused ordinary entity interaction, but Bukkit
  delivers each of these through a separate event, so the existing guards never saw them.
  Armor-stand equipping is the one that was reported and reproduced — an unauthenticated player
  placed a block onto an armor stand and their held stack went down by one.

- Writing a sign is now refused before login. Another plugin can open a sign editor for a player who
  has not logged in yet, which follows no interaction of the player's own, so nothing else refused
  it. Opening the editor is refused as well as the write.

- Writing a book is now refused before login. A player who has not logged in really can reach the
  book editor — the client opens it without asking the server, so no guard can stop it opening — and
  the write then reaches the server on its own, where nothing else refused it. The editor still
  opens; the text and the signature no longer do anything, and the book stays blank.

- Also refused before login, though no way to reach it was demonstrated and none may exist: dragging
  items inside an inventory, middle-click item pick, swapping the held item with an equipment slot,
  and recipe-book clicks. These are refused explicitly rather than left resting on the expectation
  that other guards make them unreachable (UltiKits/UltiLogin#24).

- After `/upm uninstall UltiLogin`, this module's commands (`/login`, `/register`,
  `/changepassword`, `/logadmin`, `/recover`, `/regs`, `/panel`) are now really removed and its
  `LoginProtectionListener` stops firing. Previously this module replaced the framework's unload
  method with one that only logged a line, so both stayed active until the server restarted
  (UltiKits/UltiLogin#29).

- With `security.max-login-attempts: 0` (unlimited attempts), a wrong password now replies "Wrong password! Please
  try again." instead of claiming the account was locked when nothing was locked. This reply uses `wrong_password`
  in the module's language catalogue and follows `language`. With a limit, a wrong password shows the remaining
  attempts until a lock is actually reached, then shows `messages.account-locked` (UltiKits/UltiLogin#23).

#### Removed

- `lang/en.yml` and `lang/zh.yml`. The framework reads only `lang/en.json` and `lang/zh.json`, and
  every entry in the two YAML files was a copy of an entry in the JSON file of the same language, so
  editing them never changed anything. If you customised `lang/*.yml` on disk, carry those edits into a
  custom language file, not into the official `lang/*.json`: copy the official file in the same `lang/` folder to a name that starts with its language code and a hyphen,
  keeping the extension (for example `lang/en-myserver.json`), and set `language: en-myserver` in `plugins/UltiTools/config.yml`.
  An edit made in an official file is undone when the file is restored, at every start and module reload,
  and survives only in its `.bak` (UltiKits/UltiTools-Reborn#616).

- The `email_bind_reward` and `panel_auth_success` language entries. No code ever read them, so
  removing them changes nothing players see.

- The module's own `UltiLogin 已禁用！` ("UltiLogin disabled!") console line on unload and its own
  `UltiLogin 配置已重载！` ("UltiLogin configuration reloaded!") console line on `/ul reload UltiLogin`
  (both printed in Chinese under either `language` setting), and the never-read `login_disabled` and
  `login_reloaded` language keys that described them. UltiTools 6.3.0 logs one reload line per module
  (`Module 'UltiLogin' reloaded.`). Reloading still re-reads `login.yml` into the running module,
  exactly as before: that was already done by the framework's reload method, which this module's
  override called first (UltiKits/UltiLogin#29).

- The `messages.wrong-password` setting in `config/login.yml`. It never took effect in any version:
  no code read it, so editing it never changed what a player saw. The wrong-password reply that
  now exists (see `### Fixed`) takes its text from this module's language file instead — entry
  `wrong_password` in `lang/<language>.json`, beside the `config` folder — so it follows the
  server's `language` setting. To customise it, copy the official language file to one whose name starts
  with its language code and a hyphen (for example `lang/en-myserver.json`), edit `wrong_password` there
  and set `language: en-myserver` in `plugins/UltiTools/config.yml`; an edit made in the official file
  itself is restored at the next start or module reload, the edited file kept as `.bak` (UltiKits/UltiTools-Reborn#616).
  A server upgraded from an earlier version keeps the key in its `login.yml`, because the framework
  never deletes a key from an operator's file; while it is there, the module logs one warning at
  startup and on every reload of this module (`/ul reload` or `/ul reload UltiLogin`), naming the
  file and the key, and the key can simply
  be deleted (UltiKits/UltiLogin#23).

#### Fixed

- Passwords no longer reach the server log in plain text. Paper writes every player command line to the console and
  `logs/latest.log`, and UltiTools-API 6.3.0 mirrors the console to the UltiPanel log stream, so `/login`, `/register`,
  `/changepassword`, `/setpassword`, `/recover` and `/logadmin reset`, with every alias, used to be recorded with the
  password. While the module is enabled a filter on the server's Log4j root logger now replaces their arguments with
  `******` (`Steve issued server command: /login ******`), in any letter case and with any namespace prefix; other
  commands are logged unchanged, and the filter is removed when the module is unloaded. Two paths are not covered and
  are documented under Known limitations: a reset sent from the panel's remote console, and the reply to
  `logadmin reset` run from the console (UltiKits/UltiLogin#57).

- The failed-login count now follows what `security.lockout-type` locks. With `UUID` it is kept per account, so
  one account's lock no longer leaves every other account at the same address one wrong password away from being
  locked, and one account's wrong passwords no longer count against another's; `messages.attempts-remaining`
  is per account too. With `IP` it stays per address (accounts behind one address share it, by design). With
  `BOTH`, failures are counted per (address, account UUID) pair and separately by different failing accounts at
  each address, as described in the lockout redesign above; remaining attempts follow the pair's count
  (UltiKits/UltiLogin#48, UltiKits/UltiLogin#45).

- An account write whose stored row no longer exists is now reported as failed on every storage type. On a
  database shared by several servers, another server's `/logadmin unregister` between this module's read and
  its write used to leave the write silently lost. Each of the six writes (login, panel login, `/changepassword`,
  an admin password reset, a recovery password reset, an email bind) now logs its own error line followed by
  "The stored account row no longer exists, so nothing was written" and takes the result it already has for a
  failed write: an admin or recovery reset hands out no new password and `/changepassword` does not change
  anything, while a login, a panel login and an email bind carry on as they do for a failed write (a player
  whose bind was lost is still told it succeeded and still receives the reward) (UltiKits/UltiLogin#47).

- The comments above the keys of `config/login.yml` (42) and `config/email.yml` (8) now come from the
  module's language files: a server set to `language: en` writes English comments on a fresh install
  (earlier versions wrote Chinese-only comments in every language). The comments the framework wrote on
  these keys, the Chinese ones earlier versions wrote included (the old comment above `security.lockout-type`
  too, UltiKits/UltiLogin#51), switch to the server's language at the next start, and after you change
  `language` and run a bare `/ul reload`; values are untouched, and a comment you wrote yourself is kept as you
  wrote it (UltiKits/UltiTools-Reborn#611). The comment above `security.lockout-type` now also says
  what each type counts and locks (see the failed-login count entry) (UltiKits/UltiLogin#46, UltiKits/UltiLogin#45).

- The console warning about a setting this version no longer reads names the file exactly as it is: a
  server installed under a directory whose name contains `{KEY}` or `{REASON}` used to get a path that does
  not exist, because the path was inserted before those placeholders were filled. Every placeholder of the
  line is now filled in one pass (the same fix as UltiKits/UltiMail#37).

- Plugin NPCs are no longer treated as unauthenticated players: a player-type NPC carrying the `NPC`
  metadata that NPC plugins such as Citizens set is left alone by the whole login protection — it can take
  damage, ride and move, and it is not prompted or timed out. Before, such an NPC was invulnerable, could not
  ride and was dropped from moving vehicles (UltiKits/UltiLogin#42).

- With `security.lockout-type: UUID`, a player whose lockout has expired gets the full
  `security.max-login-attempts` again. Before, the failure count was kept, so the first wrong password
  after the lockout locked the account again at once (UltiKits/UltiLogin#38).

- An unusable `security.lockout-type` in `config/login.yml` (anything other than `IP`, `UUID` or `BOTH`, ignoring
  letter case and surrounding spaces) now falls back to `BOTH` in memory only. The module names the original value
  in a console warning at start-up and on `/ul reload`; the file is unchanged. Before, an unrecognised value switched
  lockout off while the wrong-password reply still claimed the account was locked (UltiKits/UltiLogin#37).

- The registration window (`gui-mode.enabled: true`) now shows `gui-mode.title-confirm` once the first
  password is entered, and `gui-mode.title-register` again after a mismatch: the page re-opens its window
  with the new title, keeping what was entered. Before, the title was stored but the open window kept its
  first title, so both stages looked the same (UltiKits/UltiLogin#25).

- On the login screen an unauthenticated player can no longer rearrange their own inventory. While
  the login or registration keypad was open, clicks in the player's own inventory rows were allowed,
  because the keypad was recognised by the title of the whole window, and that window includes the
  player's own rows. The keypad is now recognised by which window is open — this module's own login
  or registration page, whatever its title says — and only clicks on the keypad itself are allowed;
  another inventory whose title reads like the keypad's no longer opens for a player who has not
  logged in (UltiKits/UltiLogin#35).

- A player who has not logged in can no longer be carried by a vehicle. A minecart rider, a boat's
  second-seat passenger or anyone carried by rails or water was moved across blocks while not
  logged in, because only a player steering a vehicle is held in place, and a player who quit while
  riding a moving minecart was put back in it on rejoin and carried on. A player who has not logged
  in now rides nothing: getting into a vehicle is refused, a player who quit while riding is taken
  off the vehicle one tick after rejoining (the vehicle stays where it is), a player whose login is
  revoked while riding is dismounted, and a moving minecart or boat drops such a passenger. After
  logging in they can get back in (UltiKits/UltiLogin#41).

### v1.0.0 (2026-02-15)

Added: Login authentication system core features
- Added: Player registration and login, supporting both command mode and GUI numeric keypad mode
- Added: SHA-256 + salt password hashing
- Added: IP session persistence (auto-login on quick reconnect from same IP)
- Added: Login timeout auto-kick
- Added: Pre-login protection (blocks movement, chat, block breaking, interactions, and more)
- Added: Blindness effect for unauthenticated players
- Added: Spawn location teleport for unauthenticated players
- Added: Failed login lockout mechanism (supports IP / UUID / BOTH lockout types)
- Added: Per-IP registration limits
- Added: Change password command (`/changepassword`)
- Added: Admin commands (reset password, force login, delete account, view info)
- Added: GUI numeric keypad login mode (optional)
- Added: Email binding (`/regs <email>`) with verification codes
- Added: Email-based password recovery (`/recover`)
- Added: Email binding rewards (configurable command rewards)
- Added: Temporary email domain blacklist
- Added: UltiCloud panel integration (`/panel` command)
- Added: Pre-login allowed command whitelist
- Added: Fully customizable messages (via config file)
- Added: Chinese and English language support
