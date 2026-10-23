# Account Binding

A UltiKits account connects your Minecraft server to the web panel and UltiCloud module repository.

## Register

Visit [panel.ultikits.com](https://panel.ultikits.com) and click Register to create your UltiKits account.

## Bind Your Server

Run this in the **server console** (not in game):

```
ulticloud login
```

Open the printed magic link in your browser, sign in with your UltiKits account and approve the server link. Use `ulticloud status` to check the link state and `ulticloud logout` to remove it. Credentials are stored in `.ultikits/credentials.json` under the server root. Do not edit or share that file; do not put your account password in `config.yml`.

## What Does Binding Enable?

| Feature | Description |
|---------|-------------|
| Web Panel | Manage your server remotely via [panel.ultikits.com](https://panel.ultikits.com) |
| UPM Module Downloads | Install modules from the cloud using `/upm install` |
| Module Updates | Update installed modules using `/upm update` |

::: tip
You can still install modules manually by downloading JAR files even without an account. But binding makes UPM online installation much more convenient.
:::
