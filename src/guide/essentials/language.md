# 自定义语言与国际化

UltiTools 内置中英文支持，你也可以自定义语言文件。

## 设置语言

编辑 `plugins/UltiTools/config.yml`：

```yaml
language: "zh"  # zh 中文, en 英文
```

修改后执行 `/ul reload` 生效。

## 自定义消息文本

每个模块的语言文件存放在 `plugins/UltiTools/pluginConfig/模块名/` 目录下。你可以修改这些文件来自定义消息内容。

修改后执行 `/ul reload` 或 `/ul reload <模块名>` 生效。

::: tip
建议在修改前先备份原始文件，以便出问题时恢复。
:::
