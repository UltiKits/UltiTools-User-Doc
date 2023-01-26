# 目录结构

UltiTools 6 较上一代发生的较大的变化，因此熟悉新的目录结构是十分必要的

## 总览

如果插件正常加载，在 ` /plugin/UltiTools ` 的目录结构是这样的：

```
UltiTools ———— plugins        (文件夹，用于存放UltiTools功能模块)
           |
           |—— pluginConfig   (文件夹，用于存放UltiTools功能模块的配置文件)
           |
           |—— lib            (文件夹，用于存放UltiTools的依赖库)
           |
           |—— versions       (文件夹，用于存放版本兼容库)
           |
           |—— config.yml     (UltiTools 核心配置文件)
           |
           |__ data.json      (UltiTools 核心数据文件)
```

::: info 注意
这仅仅首次启动生成的结构，随着配置的深入，将会有额外的文件
:::

## 详解

### plugins

` plugins ` 目录是专门用于存放UltiTools功能模块的地方，放置在这里的所有 Jar 文件都会被读取，但只有符合要求的模块才会被载入

### pluginConfig

` pluginConfig ` 目录储存了各个模块的配置文件与数据文件

### lib

` lib ` 目录存放着 UltiTools 所依赖的类库，Full版本没有此文件夹，如果你不是很确定你在做什么，就不要对其中的文件就行改动

### versions

` versions ` 目录存放在 UltiTools 的版本兼容库，Full版本没有此文件夹，如果你不是很确定你在做什么，就不要对其中的文件就行改动

### config.yml

` config.yml ` 是 UltiTools 的核心配置文件，管理 API 端口和 UltiKits 账号等配置项

### data.yml

` data.yml ` 是 UltiTools 的核心数据文件，储存了服务器 UUID 等重要数据

---

还有一些可能会出现的其他文件将会单独介绍