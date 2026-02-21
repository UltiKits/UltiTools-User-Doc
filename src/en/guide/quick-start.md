---
footer: false
---

# Quick Start

This guide will help you install and configure UltiTools in 5 minutes.

## Prerequisites

- Paper 1.21+ server ([Download Paper](https://papermc.io/downloads))
- Java 21

::: tip Optional Dependencies
- [Vault](https://www.spigotmc.org/resources/vault.34315/) — Economy and permissions API (required by UltiEconomy, UltiKits, etc.)
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) — Placeholder variables (required by UltiSideBar, etc.)
- [LuckPerms](https://luckperms.net/) — Permission management (recommended)
:::

## Installation

### 1. Download UltiTools

Download the latest UltiTools JAR from [GitHub Releases](https://github.com/UltiKits/UltiTools-Reborn/releases).

### 2. Install the Plugin

1. Stop your server
2. Place `UltiTools-x.x.x.jar` in the server's `plugins/` folder
3. Start the server

UltiTools will automatically generate its configuration files and directory structure on first start.

### 3. Install Modules

UltiTools core is just a framework — you need to install modules for actual features.

**Method 1: Using UPM (Recommended)**

Run in the server console or in-game (requires OP):

```
/upm install UltiEssentials
```

Restart the server after installation.

**Method 2: Manual Installation**

Download module JAR files from [UltiCloud](https://panel.ultikits.com), place them in `plugins/UltiTools/plugins/`, and restart the server.

### 4. Basic Configuration

Edit `plugins/UltiTools/config.yml`:

```yaml
# Storage backend: json, sqlite, mysql
datasource:
  type: "sqlite"

# Language: zh for Chinese, en for English
language: "en"
```

Run `/ul reload` after changing the configuration.

## Common Commands

| Command | Description |
|---------|-------------|
| `/ul list` | List installed modules |
| `/ul reload` | Reload all configuration files |
| `/ul reload <module>` | Reload a specific module's config |
| `/upm list` | List available modules |
| `/upm install <module>` | Install a module |
| `/upm update all` | Update all modules |

::: warning Note
All commands above require OP permission. `/ul reload` only reloads configuration files — installing new modules or updating JARs requires a server restart.
:::

## Next Steps

- [Directory Structure](/en/guide/essentials/directory-structure) — Understand UltiTools' file layout
- [Module Management](/en/guide/essentials/module) — Learn about the UPM package manager
- [Configuration](/en/guide/essentials/config) — Explore configuration options
- [Browse Modules](/en/module/) — View all available modules
