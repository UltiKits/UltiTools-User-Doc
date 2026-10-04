# Localization

UltiTools has built-in Chinese and English support. You can also customize language files.

## Setting the Language

Edit `plugins/UltiTools/config.yml`:

```yaml
language: "en"  # zh for Chinese, en for English
```

Run `/ul reload` to apply.

## Customizing Messages (from 6.3.0)

::: warning Do not edit the official language files
The official language files belong to UltiTools, and an official file edited in place is restored to the bundled version at every start.
To customise messages, copy an official file, rename it, and select the new name in the main config.
:::

### Where the official language files are

| Messages of | Folder | Official files |
|---|---|---|
| UltiTools itself | `plugins/UltiTools/lang/` | `zh.json`, `en.json` |
| Each module | `plugins/UltiTools/pluginConfig/<module>/lang/` | `zh.json`/`en.json` or `zh.yml`/`en.yml`, depending on the module |

### Three steps

1. **Copy**: in the folder whose messages you want to change, copy an official file under a new name that starts with its language code and a hyphen, keeping the extension. For example, copy `en.json` to `en-myserver.json`.
2. **Edit**: edit the copy. It may keep only the entries you change.
3. **Select**: set this in `plugins/UltiTools/config.yml`:

   ```yaml
   language: "en-myserver"
   ```

   Then restart the server or run `/ul reload`.

That one setting applies to UltiTools and to every module. Put a copy with the same name in the `lang/` folder of each module whose messages you want to change; a module without one keeps using its official English.

### Messages your copy does not contain

Every entry your copy lacks comes from the official language its name starts with: `en-myserver` uses the official `en`, `zh-myserver` the official `zh`. So a copy may contain only the few lines you change, and every other message still shows.

A name that starts with no shipped language code (for example `myserver`) uses English for the missing messages, and the console shows one warning suggesting a better name.

### Your file is never overwritten

A custom file such as `en-myserver.json` is yours: no start, `/ul reload`, upgrade or module update ever writes, replaces or backs it up.

### If you edited an official file directly

At every start, an official file that differs from the bundled version is restored to it, and your edited file is kept in the same folder as `<file>.bak` (then `.1.bak`, `.2.bak`, and so on, never overwriting an existing file). The console shows one line saying the file was restored, where the backup is, and how to customise instead. `/ul reload` does the same for UltiTools' official files and for each module's official file of the language in use.

To get your edits back, **copy** the `.bak` file to a custom file (for example `en-myserver.json`) and select it in the main config. Do not rename the `.bak` back: it would be restored again at the next start.

An official file that is read-only, or a symbolic link, is not restored; the console shows a line saying so.

::: tip Before 6.3.0
Before 6.3.0, UltiTools' own messages were never read from a file on disk and modules did not support custom names; a module's official language file you edited directly was kept.
:::
