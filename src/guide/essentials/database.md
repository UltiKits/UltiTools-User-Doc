# 数据库与多端同步

UltiTools 支持三种数据存储方式，你可以根据需要选择。

## 存储方式对比

| 存储方式 | 优点 | 缺点 | 适用场景 |
|----------|------|------|----------|
| JSON | 可手动编辑数据文件 | 性能最低，崩溃可能丢失数据 | 临时测试 |
| SQLite | 本地存储，性能稳定 | 无法跨服同步 | 单服务器（推荐） |
| MySQL | 性能最高，支持多服同步 | 需要额外搭建数据库 | 群组服/多服务器 |

## 配置存储方式

编辑 `plugins/UltiTools/config.yml`：

```yaml
datasource:
  type: "sqlite"  # 可选值：json, sqlite, mysql
```

::: danger 重要
切换存储方式**不会自动迁移数据**。切换前请做好备份。
:::

## MySQL 配置

如果选择 MySQL 存储，还需要配置数据库连接：

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
你需要提前创建好数据库，UltiTools 会自动创建所需的表。
:::

### 连接池参数

以下参数可保持默认值，除非你有特殊需求：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `connectionTimeout` | 连接超时（毫秒） | 30000 |
| `keepaliveTime` | 连接保活时间（毫秒） | 60000 |
| `maxLifetime` | 连接最大生命周期（毫秒） | 1800000 |
| `maximumPoolSize` | 最大连接数 | 8 |

## 多服同步

在 BungeeCord/Velocity 群组服环境下，所有子服使用同一个 MySQL 数据库即可实现数据同步：

1. 搭建一个 MySQL 数据库
2. 在每个子服的 `config.yml` 中配置相同的 MySQL 连接信息
3. 重启所有子服

玩家数据（家、背包备份、经济等）会自动在所有子服之间同步。
