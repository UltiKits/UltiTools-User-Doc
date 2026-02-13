# 官方模块文档

UltiTools 6 采用模块化架构，所有功能以独立模块的形式提供。你可以按需安装，只启用你需要的功能。

## 模块列表

| 模块 | 说明 |
|------|------|
| [UltiEssentials](./ultiessentials) | 基础功能（家、TPA、飞行、治愈、死亡惩罚等） |
| [UltiWorlds](./ultiworlds) | 多世界管理（创建、传送、设置、独立规则） |
| [UltiLogin](./ultilogin) | 登录注册（命令/GUI两种模式、邮箱找回密码） |
| [UltiChat](./ultichat) | 智能聊天（自动回复、聊天格式、频道、反刷屏） |
| [UltiMenu](./ultimenu) | 自定义菜单（YAML配置GUI、物品绑定、子菜单） |
| [UltiKits](./ultikits) | 礼包系统（GUI领取、经济整合、冷却、权限） |
| [UltiMail](./ultimail) | 游戏邮箱（发送物品/消息、GUI界面） |
| [UltiBackup](./ultibackup) | 背包备份（自动/手动备份、一键恢复） |
| [UltiRemoteBag](./ultiremotebag) | 远程背包（跨距离查看/编辑玩家背包和末影箱） |
| [UltiSideBar](./ultisidebar) | 侧边栏（记分板显示服务器信息、PlaceholderAPI） |
| [UltiSocial](./ultisocial) | 好友系统（添加/删除好友、传送到好友） |
| [UltiTrade](./ultitrade) | 一对一交易（GUI交易界面、确认机制） |
| [UltiCleaner](./ulticleaner) | 智能清道夫（定时/智能清理、TPS自适应） |
| [UltiRecipe](./ultirecipe) | 自定义合成（YAML配置自定义合成配方） |

## 安装方式

所有模块均支持两种安装方式：

**方式一：通过 UPM 安装（推荐）**

```
/upm install 模块名
```

**方式二：手动安装**

1. 下载模块 JAR 文件
2. 放入服务器的 `plugins/UltiTools/plugins/` 目录
3. 重启服务器

:::tip
新安装的模块需要重启服务器才能生效，`/ul reload` 只能重载配置文件。
:::
