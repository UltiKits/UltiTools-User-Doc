# Configuration

## Core Configuration (config.yml)

The core configuration file is located at `plugins/UltiTools/config.yml`.

### Full Configuration Example (6.3.0 shipped defaults)

```yaml
datasource:
  type: "sqlite"
  flushRate: 10
language: "zh"
mysql:
  enable: false
  host: localhost
  port: 3306
  username: root
  password: password
  database: ultitools
  connectionTimeout: 30000
  keepaliveTime: 60000
  maxLifetime: 1800000
  connectionTestQuery: "select 1"
  maximumPoolSize: 8
  cachePrepStmts: true
  prepStmtCacheSize: 250
  prepStmtCacheSqlLimit: 2048
email:
  enable: false
  smtp:
    host: "smtp.example.com"
    port: 587
    username: ""
    password: ""
    ssl: false
    starttls: true
    connectionTimeout: 10000
    readTimeout: 10000
  from:
    address: "noreply@example.com"
    name: "UltiTools Server"
  debug: false
ultipanel:
  logging:
    error-reporting:
      enabled: true
      dedup-window-seconds: 300
      max-errors-per-batch: 10
      sample-after-count: 10
      sample-rate: 0.1
    action-log:
      max-size-bytes: 1048576
      max-files: 5
    batch:
      enabled: true
      size: 10
      interval: 5000
  commands:
    blocklist:
      - op
      - deop
      - stop
      - restart
      - reload
      - ban-ip
      - pardon-ip
      - whitelist
      - save-off
      - save-all
  files:
    editable-roots:
      - plugins
      - logs
  capabilities:
    monitoring: true
    logs: true
    player-events: true
    file-read: true
    file-write: false
    file-delete: false
    commands: false
    server-properties: false
```

### Configuration Reference

| Setting | Description | Default |
|---------|-------------|---------|
| `datasource.type` | Storage backend | `sqlite` |
| `datasource.flushRate` | JSON auto-save interval (seconds) | `10` |
| `language` | Interface language | `zh` |
| `mysql.enable` | Enable the MySQL connection | `false` |
| `email.enable` | Enable the optional SMTP email service | `false` |
| `email.smtp` / `email.from` | SMTP connection and sender settings | See example above |
| `ultipanel` | Panel capabilities, command blocklist, editable roots and logging | See example above |

`language` also accepts a [custom language name](/en/guide/essentials/language), such as `en-myserver`. Link the panel by running `ulticloud login` in the server console; there are no `account.username` or `account.password` settings in the shipped config.

## Module Configuration

Each module's configuration files are in `plugins/UltiTools/pluginConfig/ModuleName/`. See individual module documentation for details.

### Resetting and blanking a setting (from 6.3.0)

This applies to module configuration files. The core `plugins/UltiTools/config.yml` is different: it is created when absent, but deleting an ordinary core key does not put it back in the file; its bundled default is used in memory. Some missing panel keys are added by a separate startup migration.

- **Back to the default**: delete the setting and restart the server: its key line, every line of its value below it (for a list, each `- ...` line), and the comment lines directly above it. At start the framework puts the missing setting back with its default and its explanatory comment, and changes no other byte of the file when it can safely write the change. With layouts such as hand-aligned trailing comments, trailing spaces or YAML anchors, or an insertion after a key with nothing after its colon, it may refuse the write: the file stays untouched and defaults are used in memory. If the console says a setting was not put back, change the line it names and restart (for anchors, follow its file-level warning). Deleting only the key line of a list leaves its `- ...` lines behind. Usually the file can then no longer be read: the console shows `Cannot load <file>: ...; file will not be overwritten`, and every setting in that file runs on its default until you remove those lines. Otherwise the setting above takes them as part of its value.
- **Leave a text setting blank**: write an empty string, for example UltiChat's join title subtitle in `chat.yml`, `sub: ''` under `join-quit.title`. **Do not delete the line**: a deleted setting comes back with its default at the next start, which resets it rather than blanking it. An empty string is never rewritten by a start, a reload or a save. A number or true/false setting cannot be blank: with `''` the console shows a warning and the default is used, and the file is not changed. Some text settings must not be empty, for example UltiChat's announcement `prefix`. With `''` there, the console says the module `refused to load` and names the field (for example `field 'prefix' must not be empty`): the module does not load (a `/ul reload` is refused and keeps the running values). Give such a setting other text instead.
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
