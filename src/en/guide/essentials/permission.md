# Permissions

## Admin Commands

UltiTools admin commands require OP permission:

| Command | Description |
|---------|-------------|
| `/ul` | Core commands (reload, list, help) |
| `/upm` | UPM package manager commands |

## Module Permissions

Each module defines its own permission nodes. See individual module documentation for details. Common permission format:

```
ultikits.modulename.feature
```

Examples:
- `ultikits.essentials.home` — Use /home command
- `ultikits.essentials.tpa` — Use /tpa command

## Using LuckPerms

UltiTools has official [LuckPerms](https://luckperms.net/) support.

### Set Permissions

```
/lp user <player> permission set ultikits.essentials.home true
```

### Set Group Permissions

```
/lp group default permission set ultikits.essentials.home true
```

### View Permissions

```
/lp user <player> permission info
```

::: tip
The LuckPerms web editor is recommended for managing permissions visually. Visit [luckperms.net/editor](https://luckperms.net/editor).
:::

## Default Permissions

Most module features are accessible to all players by default. Admin commands require OP permission. Check each module's documentation for specifics.
