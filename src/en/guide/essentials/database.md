# Database & Sync

UltiTools supports three storage backends. Choose the one that fits your needs.

## Comparison

| Backend | Pros | Cons | Best For |
|---------|------|------|----------|
| JSON | Human-readable data files | Lowest performance, crash risk | Testing only |
| SQLite | Local storage, stable | No cross-server sync | Single server (recommended) |
| MySQL | Best performance, multi-server sync | Requires database setup | Proxy networks |

## Configuration

Edit `plugins/UltiTools/config.yml`:

```yaml
datasource:
  type: "sqlite"  # Options: json, sqlite, mysql
```

::: danger Important
Switching storage backends **does not migrate data automatically**. Back up your data first.
:::

## MySQL Setup

If using MySQL, configure the connection:

```yaml
datasource:
  type: "mysql"

mysql:
  enable: true
  host: localhost
  port: 3306
  username: root
  password: "your_password"
  database: ultitools
```

::: tip
You need to create the database beforehand. UltiTools will automatically create the required tables.
:::

### Connection Pool Settings

These can be left at defaults unless you have specific requirements:

| Setting | Description | Default |
|---------|-------------|---------|
| `connectionTimeout` | Connection timeout (ms) | 30000 |
| `keepaliveTime` | Keep-alive interval (ms) | 60000 |
| `maxLifetime` | Max connection lifetime (ms) | 1800000 |
| `maximumPoolSize` | Max pool connections | 8 |

## Multi-Server Sync

For BungeeCord/Velocity proxy networks, configure all sub-servers to use the same MySQL database:

1. Set up a MySQL database
2. Configure the same MySQL connection in every sub-server's `config.yml`
3. Restart all sub-servers

Player data (homes, backups, economy, etc.) will automatically sync across all sub-servers.
