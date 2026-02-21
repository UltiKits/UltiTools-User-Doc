# 故障排除

## 常见问题

### 插件无法加载

**现象**：启动日志中没有 UltiTools 的加载信息。

**可能原因**：
- JAR 文件没有放在正确的位置（应放在 `plugins/` 目录）
- 服务端版本低于 1.21
- Java 版本低于 21

**解决方法**：检查 `logs/latest.log`，搜索 `UltiTools` 相关的错误信息。

### 模块无法加载

**现象**：通过 `/upm install` 安装的模块没有生效。

**可能原因**：
- 安装后没有重启服务器（`/ul reload` 不会加载新模块）
- 模块 JAR 文件损坏

**解决方法**：重启服务器。如果仍然无法加载，删除模块 JAR 并重新安装。

### 数据库连接失败

**现象**：启动日志中出现 MySQL 连接错误。

**可能原因**：
- MySQL 服务未启动
- `config.yml` 中的数据库连接信息有误
- 数据库不存在（需要提前创建）
- 防火墙阻止了连接

**解决方法**：
1. 确认 MySQL 服务正在运行
2. 检查 `config.yml` 中的 host、port、username、password
3. 确认数据库已创建：`CREATE DATABASE ultitools;`
4. 测试是否能从服务器连接到 MySQL

### 命令无效或报错

**现象**：执行 `/ul` 或 `/upm` 命令无反应或报错。

**可能原因**：
- 没有 OP 权限
- 插件未正确加载

**解决方法**：确认你有 OP 权限，并检查 `/plugins` 列表中 UltiTools 是否显示为绿色（已加载）。

## 日志位置

- 服务器日志：`logs/latest.log`
- UltiTools 会将错误信息输出到服务器日志中

## 报告 Bug

如果以上方法无法解决你的问题，请通过以下方式反馈：

1. **GitHub Issues**：[github.com/UltiKits/UltiTools-Reborn/issues](https://github.com/UltiKits/UltiTools-Reborn/issues)
2. **QQ 群**：[点击加入](https://jq.qq.com/?_wv=1027&k=Q6f7vT3k)

反馈时请附上：
- 服务端类型和版本（如 Paper 1.21.1）
- UltiTools 版本
- 完整的报错日志
- 复现步骤
