# UltiLogin - Login Authentication System

UltiLogin is the player authentication module for UltiTools, providing a secure registration and login system for offline-mode Minecraft servers.

## Feature Overview

UltiLogin provides a complete account protection system for your server. Players must register or log in before they can do anything. Before logging in, all actions are blocked -- movement, chat, block breaking, interactions, and more. An optional blindness effect can be applied to unauthenticated players. The system supports two login modes: traditional command mode (`/login <password>`) and a visual GUI mode (numeric keypad interface). Passwords are stored using SHA-256 hashing with a per-account random salt. Additional security features include IP-based session persistence (skip login on quick reconnect), failed login lockout (brute-force protection), and per-IP registration limits. Admins can reset passwords, force-login players, delete accounts, and view account details. Version 1.0.0 also adds email binding, password recovery, and UltiCloud web panel login integration.

## Installation

### Method 1: Via UPM (Recommended)

Run in-game or from the console:

```
/upm install UltiLogin
```

### Method 2: Manual Installation

1. Download the `UltiLogin` JAR file
2. Place the JAR file in the `plugins/UltiTools/plugins/` directory
3. Restart the server

## Quick Start

After installation, UltiLogin activates automatically with default settings:

1. **New player joins** - Sees the prompt: `Please use /register <password> <confirm> to register`
2. **Register** - Type `/register mypassword mypassword`
3. **Registration complete** - Auto-logged in, can play normally
4. **Next time joining** - Sees the prompt: `Please use /login <password> to login`
5. **Login** - Type `/login mypassword`

To enable the GUI numeric keypad mode, set `gui-mode.enabled` to `true` in the config file and restart the server. Players will see a numeric keypad interface on join.

## Commands

### Player Commands

| Command | Aliases | Description | Permission | Who Can Run |
|---------|---------|-------------|------------|-------------|
| `/login <password>` | `/l` | Log in to your account | None required | Player only |
| `/register <password> <confirm>` | `/reg` | Register a new account | None required | Player only |
| `/changepassword <old> <new> <confirm>` | `/changepw`, `/cpw` | Change password | `ultilogin.changepassword` | Player only |
| `/panel` | - | Open UltiCloud web panel (if enabled) | None required | Player only |
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

File path: `plugins/UltiTools/UltiLogin/config/login.yml`

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
max-register-per-ip: 3

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
  lockout-type: IP

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

  # Wrong password
  wrong-password: "&cWrong password! Please try again."

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

### Email Configuration

File path: `plugins/UltiTools/UltiLogin/config/email.yml`

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
The system generates a random password and displays it to the admin.

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
- UltiTools-API version is >= 6.2.0
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
- **Admin force-login** - Run `/logadmin forcelogin <player>`
- **Restart the server** - Lockout data is stored in memory and cleared on restart

### Email binding not available?

The email feature depends on UltiTools framework's EmailService. If you see "Email service is not enabled":
1. Make sure SMTP email service is configured in the UltiTools main configuration
2. Confirm the email service is enabled and connected
3. Check the server console for email-related errors

## Changelog

### v1.0.0 (2026-02-13)

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
