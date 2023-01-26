# 兼容性

在使用 UltiTools 之前，你有必要了解你的服务端是否能够良好支持该插件。

## Minecraft 版本

### Java 版 (Java Edition)

UtiTools 支持 Minecraft 1.8-1.19 及以上的版本，在新版本的服务端发布后，开发团队将第一时间进行适配

::: warning 部分较低版本的服务端可能出现某些限制

某些低版本的服务端（尤其是 1.12.2 及以下）可能会因API限制从而无法（正常）使用某些功能，如头顶显示和命令补全等

:::

某些功能可能会由于疏忽未进行全面的测试，因此可能会出现兼容性问题

- 使用 1.13.3 及以上的 Spigot 服务端可避免 95% 以上的兼容性问题

- 使用 1.16.5 及以上的 Spigot 服务端可避免 99% 以上的兼容性问题

::: danger 不支持远古版本

UltiTools 不支持 1.7.x 及以下版本的服务端，未来也没有计划进行向下支持，任何向下支持的请求都不予采纳

:::

### 基岩版 (Bedrock Edition)

UltiKits 开发团队没有计划为 PocketMine-MP(PMMP)、Nukkit/NukkitX 以及 Bedrock Dedicated Server(BDS) 等基岩版服务端（不管有没有插件加载器）开发插件，但是你可以使用 Geyser 等插件实现多端互通

参见 [与 Geyser 的兼容性](#与-geyser-的兼容性)

## 网络环境

### 入站

UltiTools 6 的 RESTful API 需要额外占用一个端口，如果你只能使用一个对外端口，那么该功能将无法使用

::: info

如果你使用的是 VPS，那么大概率不需要担心这个问题，如果是面板服，那么你需要咨询你的服务提供商是否能够使用多个端口

PS： 较新版本的 Multicraft 面板和 Pterodactyl (翼龙) 面板是支持多开端口的

:::

### 出站

UltiTools 的下载功能和更新检测功能需要访问外部网络，因此你的服务器需要接入互联网（好像有的服务商的防火墙会拦截插件的联网）

PS：如果你在使用 YUM 插件，那么你有可能看到它会发出 UltiTools 联网的警告，但请放心，插件没有干任何坏事！！！

## 服务端

### Spigot 服务端

UltiTools 是基于 Spigot 开发的，并且经过官方测试，因此 1.8 以上的服务端均可放心使用


### Spigot 分支 (Paper/Torch/Purpurclip 等)

这些服务端是在原版 Spigot 的基础上进行的优化和修改的版本，其 API 与原版 Spigot 基本上相同，理论上可以正常运行，但不排除出现 Bug 的可能性

### CraftBukkit

UltiTools 使用了 Spigot 某些特有的 API，在 Bukkit 环境下运行将会导致某些功能出现异常，若无特殊需要，建议更换为 Spigot

> 3202年了，不会还有人用水桶端吧？不会吧不会吧？

### Mohist/CatServer/LoliServer/Arclight 等现代 Mod 端

这些 Mod 端基于 Spigot 开发，理论上可以使用，但在某些情况下可能会出现异常。

> 绝尘の吐槽：墨端用 UltiTools 的体验是最差的

::: warning Mod 端不受官方支持

官方没有计划对 Mod 端进行兼容支持

:::

### Sponge/SpongeForge (海绵端)

不同于上述的各类服务端，Sponge 使用自己的一套 API，UltiTools 无法运行

Sponge API 不如 Bukkit API 完善且受众较少，因此官方没有计划开发 UltiTools 的 Sponge 版

## 与其他同类插件的兼容性

理论上 UltiTools 与其他同类基础插件在启用的功能不重叠的情况下不会出现兼容性问题

兼容性问题主要是会出现在命令冲突和事件处理方面

下面列举几个使用较多的插件

### Content Management Interfere (CMI)

根据用户反馈和官方测试，以下功能可能会出现冲突，请选择其一使用：

- 自定义命令简写
- Tab 列表
- 重生点与坐标
- ...待补充...

### Essentials/EssentialsX (ESS) 及其附属

- Ess 的 XMPP 模块会占用一个端口，注意不要与 UltiTools 的 RESTful API 端口冲突
- UltiTools 不支持 Ess 的关键词功能，因此在 UltiTools 的配置文件中填写 Ess 关键词是不会生效的
- Ess 的 AntiBuild 模块与 UltiTools 的世界保护模块冲突，请选择一个来使用
- ...待补充...

## 与其他插件的兼容性

### AuthMe 或是其他登录插件

AuthMe 会覆盖 UltiTools 的某些指令，如：`/email`

登录插件选一个就好，用了其他的插件就不要再用 UltiTools 的登录模块了

不支持从其他登录插件迁移数据，因为密码都是加密过的

> qianmoの插嘴：能用外置登录就用外置登录，薄纱各类服内登录

### Residence

已经专门做了兼容，可放心使用

参见 [UltiTools 5.2.1更新说明](https://github.com/wisdommen/UltiTools/releases/tag/5.2.1)

### 经济类插件

UltiTools 使用了 Vault，支持 Vault 的经济类插件放心使用

### LuckPerms

UtiTools 对 LuckPerms 插件进行了官方支持，可放心使用

参见 [权限与LuckPerms](/guide/permission)

### 其他插件待补充...

## 与 Mod 的兼容性

### 反作弊 Mod (猫反作弊、更好的反作弊等)

有用户反馈 UltiTools 的 GUI 登录模块与反作弊 Mod 不兼容，因此使用反作弊 Mod 就不要使用 GUI 登录模块

[来自 MCBBS 用户 Wkurumi 的反馈](https://www.mcbbs.net/forum.php?mod=redirect&goto=findpost&ptid=1062730&pid=20449098)

### 其他 Mod 待补充...

## 与 BC (BungeeCord) 群组端兼容性

UltiTools 没有 BungeeCord 插件，因此你只需要在每个子服安装 UltiTools，并开启数据库储存即可，兼容性受子服的服务端核心影响

参见 [数据库与多端同步](/guide/database)

## 与 Geyser 的兼容性

官方没有对 Geyser 进行测试，目前有用户反馈称 GUI 界面 (Inventory 界面，非基岩版原生界面)，会出现错位问题