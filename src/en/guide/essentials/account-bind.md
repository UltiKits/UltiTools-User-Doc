# Account Binding

A UltiKits account connects your Minecraft server to the web panel and UltiCloud module repository.

## Register

Visit [panel.ultikits.com](https://panel.ultikits.com) and click Register to create your UltiKits account.

## Bind Your Server

Add your credentials to `plugins/UltiTools/config.yml`:

```yaml
account:
  username: "your_username"
  password: "your_password"
```

Restart the server. UltiTools will automatically connect to UltiCloud.

## What Does Binding Enable?

| Feature | Description |
|---------|-------------|
| Web Panel | Manage your server remotely via [panel.ultikits.com](https://panel.ultikits.com) |
| UPM Module Downloads | Install modules from the cloud using `/upm install` |
| Module Updates | Update installed modules using `/upm update` |

::: tip
You can still install modules manually by downloading JAR files even without an account. But binding makes UPM online installation much more convenient.
:::
