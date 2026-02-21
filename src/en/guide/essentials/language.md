# Localization

UltiTools has built-in Chinese and English support. You can also customize language files.

## Setting the Language

Edit `plugins/UltiTools/config.yml`:

```yaml
language: "en"  # zh for Chinese, en for English
```

Run `/ul reload` to apply.

## Customizing Messages

Each module's language files are stored in `plugins/UltiTools/pluginConfig/ModuleName/`. You can modify these files to customize message text.

Run `/ul reload` or `/ul reload <module>` after making changes.

::: tip
Back up the original files before editing, so you can restore them if needed.
:::
