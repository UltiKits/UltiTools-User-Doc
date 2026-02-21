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

## Reloading Configuration

After modifying configuration files:

```
/ul reload          # Reload all module configs
/ul reload ModuleName   # Reload a specific module's config
```

::: tip
`/ul reload` only reloads configuration files. It does not reload module JARs. If you modified a module's JAR file, restart the server.
:::
