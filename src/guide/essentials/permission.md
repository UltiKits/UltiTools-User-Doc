# 权限与 LuckPerms

## 命令权限

UltiTools 的管理命令需要 OP 权限：

| 命令 | 说明 |
|------|------|
| `/ul` | UltiTools 核心命令（reload、list、help） |
| `/upm` | UPM 包管理器命令 |

## 模块权限

每个模块定义了自己的权限节点，详见各模块文档。常见权限节点格式：

```
ultikits.模块名.功能名
```

例如：
- `ultikits.essentials.home` — 使用 /home 命令
- `ultikits.essentials.tpa` — 使用 /tpa 命令

## 使用 LuckPerms

UltiTools 对 [LuckPerms](https://luckperms.net/) 有官方支持。

### 设置权限

```
/lp user <玩家名> permission set ultikits.essentials.home true
```

### 按组设置权限

```
/lp group default permission set ultikits.essentials.home true
```

### 查看权限

```
/lp user <玩家名> permission info
```

::: tip
推荐使用 LuckPerms 的网页编辑器来管理权限，比命令行更加直观。访问 [luckperms.net/editor](https://luckperms.net/editor)。
:::

## 默认权限

大部分模块的基础功能默认对所有玩家开放，管理命令默认需要 OP 权限。具体权限请参考各模块的文档。
