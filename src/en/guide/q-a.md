# FAQ

## Installation & Configuration

### How do I install modules?

Use the UPM package manager:
```
/upm install ModuleName
```
Restart the server after installation. See [Module Management](/en/guide/essentials/module).

### Where are the configuration files?

- Core config: `plugins/UltiTools/config.yml`
- Module configs: `plugins/UltiTools/pluginConfig/ModuleName/`

See [Configuration](/en/guide/essentials/config).

### How do I switch storage backends?

Edit the `datasource.type` field in `plugins/UltiTools/config.yml`. Options are `json`, `sqlite`, or `mysql`.

::: warning
Switching storage backends does not automatically migrate data. Back up your data first.
:::

### How do I connect my server to the web panel?

1. Register at [panel.ultikits.com](https://panel.ultikits.com)
2. Enter your credentials in `config.yml`
3. Restart the server

See [Account Binding](/en/guide/essentials/account-bind).

## Usage

### New modules aren't loading after `/ul reload`?

`/ul reload` only reloads configuration files. It does not load new modules. You must restart the server after installing new modules.

### Module commands conflict with other plugins?

You can disable conflicting features in the module's configuration file, or uninstall the conflicting module.

### Why do some modules require Vault?

Vault is a common economy and permissions API for Minecraft servers. Modules that involve economy features (like UltiEconomy and UltiKits) need Vault to provide the economy interface.

## General

### Is UltiTools free?

Yes, UltiTools and all official modules are free and open-source.

### How do I report bugs or suggest features?

- GitHub Issues: [github.com/UltiKits/UltiTools-Reborn/issues](https://github.com/UltiKits/UltiTools-Reborn/issues)

### How can I support UltiKits?

See [Support UltiKits](/en/guide/sponsor).
