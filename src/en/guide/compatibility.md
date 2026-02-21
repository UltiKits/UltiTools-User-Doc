# Compatibility

## Minecraft Version

UltiTools 6.2.x supports **Minecraft 1.21 and above**.

::: danger Older versions not supported
UltiTools 6 does not support 1.20.x or below. Please upgrade to Paper 1.21+.
:::

## Server Software

### Paper (Recommended)

UltiTools is developed and tested for Paper 1.21+. Paper is the recommended server software.

### Paper Forks (Purpur, Folia, etc.)

Paper-based forks should work in theory but are not officially tested.

### Spigot

UltiTools uses some Paper-specific APIs (such as Adventure components). Running on vanilla Spigot may cause compatibility issues. Migrating to Paper is recommended.

### Unsupported

- CraftBukkit
- Sponge/SpongeForge
- BDS (Bedrock Dedicated Server)

### Modded Servers (Mohist/Arclight, etc.)

Not officially supported. May work, but issues won't be investigated.

## Optional Dependencies

| Plugin | Required? | Purpose |
|--------|-----------|---------|
| Vault | Optional | Economy API, required by UltiEconomy, UltiKits, etc. |
| PlaceholderAPI | Optional | Placeholder variables, required by UltiSideBar, etc. |
| LuckPerms | Optional | Permission management, recommended |

## Compatibility with Other Plugins

### Economy Plugins

UltiTools integrates with the economy system through the Vault API. Any economy plugin that supports Vault will work. If you install UltiEconomy, it automatically registers as a Vault economy provider.

### Login Plugins (AuthMe, etc.)

If you use another login plugin, do not enable the UltiLogin module to avoid command conflicts.

### LuckPerms

UltiTools has official LuckPerms support. See [Permissions](/en/guide/essentials/permission).

### BungeeCord/Velocity Proxy Networks

UltiTools does not have a BungeeCord/Velocity plugin. Install UltiTools on each sub-server and configure a shared MySQL database for data synchronization.

See [Database & Sync](/en/guide/essentials/database).

## Geyser Compatibility

Geyser has not been officially tested. Users have reported that inventory-based GUIs may have display issues on Bedrock clients.
