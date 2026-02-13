# Official Module Documentation

UltiTools 6 uses a modular architecture where all features are provided as independent modules. Install only what you need.

## Module List

| Module | Description |
|--------|-------------|
| [UltiEssentials](./ultiessentials) | Essentials (home, TPA, fly, heal, death penalty, etc.) |
| [UltiWorlds](./ultiworlds) | Multi-world management (create, teleport, settings, rules) |
| [UltiLogin](./ultilogin) | Authentication (command/GUI login, email password recovery) |
| [UltiChat](./ultichat) | Smart chat (auto-reply, formatting, channels, anti-spam) |
| [UltiMenu](./ultimenu) | Custom menus (YAML GUI config, item binding, sub-menus) |
| [UltiKits](./ultikits) | Kit system (GUI claim, economy, cooldowns, permissions) |
| [UltiMail](./ultimail) | In-game mail (send items/messages, GUI interface) |
| [UltiBackup](./ultibackup) | Inventory backup (auto/manual backup, one-click restore) |
| [UltiRemoteBag](./ultiremotebag) | Remote inventory (view/edit player inventory and ender chest) |
| [UltiSideBar](./ultisidebar) | Sidebar (scoreboard display, PlaceholderAPI support) |
| [UltiSocial](./ultisocial) | Friends system (add/remove friends, teleport to friends) |
| [UltiTrade](./ultitrade) | Player trade (GUI trade interface, confirmation system) |
| [UltiCleaner](./ulticleaner) | Auto cleaner (timed/smart cleanup, TPS adaptive) |
| [UltiRecipe](./ultirecipe) | Custom recipes (YAML-configured crafting recipes) |

## Installation

All modules support two installation methods:

**Method 1: Install via UPM (Recommended)**

```
/upm install module-name
```

**Method 2: Manual Installation**

1. Download the module JAR file
2. Place it in the `plugins/UltiTools/plugins/` directory
3. Restart the server

:::tip
Newly installed modules require a server restart to take effect. `/ul reload` only reloads configuration files.
:::
