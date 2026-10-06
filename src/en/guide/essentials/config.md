# Configuration

## Core Configuration (config.yml)

The core configuration file is located at `plugins/UltiTools/config.yml`.

### Full Configuration Example

```yaml
# Storage backend: json, sqlite, mysql
datasource:
  type: "sqlite"
  # JSON-only: auto-save interval in seconds
  flushRate: 10

# Language: zh for Chinese, en for English
language: "en"

# UltiKits account (for web panel and cloud module downloads)
account:
  username: ""
  password: ""

# MySQL configuration (only used when datasource.type is mysql)
mysql:
  enable: true
  host: localhost
  port: 3306
  username: root
  password: "your_password"
  database: ultitools
  connectionTimeout: 30000
  keepaliveTime: 60000
  maxLifetime: 1800000
  connectionTestQuery: "select 1"
  maximumPoolSize: 8
  cachePrepStmts: true
  prepStmtCacheSize: 250
  prepStmtCacheSqlLimit: 2048
```

### Configuration Reference

| Setting | Description | Default |
|---------|-------------|---------|
| `datasource.type` | Storage backend | `sqlite` |
| `datasource.flushRate` | JSON auto-save interval (seconds) | `10` |
| `language` | Interface language | `zh` |
| `account.username` | UltiKits account | empty |
| `account.password` | UltiKits password | empty |

## Module Configuration

Each module's configuration files are in `plugins/UltiTools/pluginConfig/ModuleName/`. See individual module documentation for details.

### Resetting and blanking a setting (from 6.3.0)

- **Back to the default**: delete the setting's line and restart the server. At start the framework puts the missing setting back with its default and its explanatory comment, and changes no other byte of the file.
- **Leave a text setting blank**: write an empty string, for example `prefix: ''`. **Do not delete the line**: a deleted setting comes back with its default at the next start, which resets it rather than blanking it. An empty string is never rewritten by a start, a reload or a save. A number or true/false setting cannot be blank: with `''` the console shows a warning and the default is used, and the file is not changed.
- **Every setting of a section deleted**: for example, you delete the only line under `messages:` and leave `messages:` with nothing after the colon. At the next start the framework puts the missing settings back below that line. The line keeps its key and its comment; only extra spaces on it may be tidied (`messages :   # note  ` becomes `messages: # note`). Lines you commented out under it stay where they are, as long as they follow the line directly, with no blank line, at the file's usual indentation. Otherwise (a blank line before them, a blank line between two commented blocks, or a deeper indentation) the settings are not put back and the console names the line: remove the blank line or fix the indentation and restart.
- **A section written as an empty value**: `messages: {}`, `messages: ~` or `messages: null` is a value you wrote. The framework does not change it and does not add the missing settings to it. The console names the line: delete the value after the colon (leaving just `messages:`) and the settings come back at the next start, or add them by hand.

## Reloading Configuration

After modifying configuration files:

```
/ul reload          # Reload all module configs
/ul reload ModuleName   # Reload a specific module's config
```

::: tip
`/ul reload` only reloads configuration files. It does not reload module JARs. If you modified a module's JAR file, restart the server.
:::
