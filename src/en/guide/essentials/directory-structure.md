# Directory Structure

After installation, UltiTools creates the following directory structure under `plugins/UltiTools/`:

```
plugins/UltiTools/
├── plugins/           Module JAR files
├── pluginConfig/      Module configuration directories
│   ├── UltiEssentials/
│   ├── UltiChat/
│   └── ...
├── sqliteDB/          SQLite database files (when using sqlite storage)
├── backups/           UltiBackup module backup files
├── config.yml         Core configuration file
├── data.json          Core data (server UUID, etc.)
└── ultitools.db       Main SQLite database
```

## Details

### plugins/

Stores all module JAR files. Modules installed via `/upm install` are automatically downloaded here. You can also manually place module JARs in this directory.

### pluginConfig/

Each module's configuration and data files are stored in `pluginConfig/ModuleName/`. For example, UltiEssentials config is in `pluginConfig/UltiEssentials/`.

### config.yml

The core configuration file. Contains settings for:

- **Storage backend** (`datasource.type`): json, sqlite, or mysql
- **Language** (`language`): zh or en
- **UltiKits account** (`account`): Credentials for web panel binding
- **MySQL connection** (`mysql`): Database configuration when using MySQL

See [Configuration](/en/guide/essentials/config).

### data.json

Stores server UUID and other core data. **Do not modify this file manually.**
