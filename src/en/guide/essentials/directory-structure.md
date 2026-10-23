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
- **Language** (`language`): `zh`, `en` or a custom name such as `en-myserver`
- **Email** (`email`): Optional SMTP service
- **Panel** (`ultipanel`): Remote capabilities and logging; link with `ulticloud login` in the server console
- **MySQL connection** (`mysql`): Database configuration when using MySQL

See [Configuration](/en/guide/essentials/config).

### .ultikits/credentials.json (server root, from 6.3.0)

Server credentials are stored in `.ultikits/credentials.json` under the server root, outside `plugins/UltiTools/`. An existing `plugins/UltiTools/data.json` is migrated there. **Do not edit the credential file manually or share it.** Use `ulticloud login` in the server console to link the panel.
