# Module Management

All UltiTools features are provided as independent modules. Use the UPM (UltiTools Plugin Manager) to install, update, and uninstall modules.

## UPM Commands

All UPM commands require OP permission. Command prefix: `/upm`.

| Command | Description |
|---------|-------------|
| `/upm list [page]` | List available modules |
| `/upm install <module>` | Install the latest version |
| `/upm install <module> <version>` | Install a specific version |
| `/upm versions <module>` | List all available versions |
| `/upm uninstall <module>` | Uninstall a module |
| `/upm check` | Check all modules for updates |
| `/upm update <module>` | Update a specific module |
| `/upm update all` | Update all modules |

## Installing Modules

### Method 1: Using UPM (Recommended)

```
/upm install UltiEssentials
```

**Restart the server** after installation to load the new module.

### Method 2: Manual Installation

1. Download the module JAR file
2. Place it in `plugins/UltiTools/plugins/`
3. Restart the server

## Listing Installed Modules

```
/ul list
```

This shows all currently installed and loaded modules.

## Updating Modules

Check for updates:
```
/upm check
```

Update a single module:
```
/upm update UltiEssentials
```

Update all modules:
```
/upm update all
```

Restart the server after updating.

## Uninstalling Modules

```
/upm uninstall UltiEssentials
```

Restart the server after uninstalling. Module configuration files (in `pluginConfig/`) are not automatically deleted — remove them manually if needed.

::: warning Important
`/ul reload` only reloads configuration files. It **does not load or unload modules**. All module JAR operations require a server restart.
:::

## Module List

View all official modules: [Module Overview](/en/module/)
