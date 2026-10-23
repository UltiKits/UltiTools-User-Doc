# Web Panel

UltiTools provides a web panel (UltiPanel) for remotely managing your Minecraft server through a browser.

## Features

- Execute server commands remotely
- View server logs in real-time
- Edit server files online
- Monitor server performance
- Manage players
- Manage modules and configuration

## Accessing the Panel

Panel URL: [panel.ultikits.com](https://panel.ultikits.com)

## Connecting Your Server

To connect your Minecraft server to the panel:

Run this in the **server console** (not in game):

```
ulticloud login
```

Open the printed magic link in your browser, sign in with your UltiKits account and approve the server link. Use `ulticloud status` to check the link state and `ulticloud logout` to remove it. Credentials are stored in `.ultikits/credentials.json` under the server root. Do not edit or share that file; do not put your account password in `config.yml`.

See [Account Binding](/en/guide/essentials/account-bind).

## Network Requirements

Your server needs outbound internet access. The panel uses WebSocket connections — no additional ports need to be opened.
