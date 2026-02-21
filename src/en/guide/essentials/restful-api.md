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

1. Register an account on the panel
2. Add your credentials to `plugins/UltiTools/config.yml`:

```yaml
account:
  username: "your_username"
  password: "your_password"
```

3. Restart the server

The server will automatically connect to the panel via WebSocket. Once connected, you can see and manage your server from the panel.

See [Account Binding](/en/guide/essentials/account-bind).

## Network Requirements

Your server needs outbound internet access. The panel uses WebSocket connections — no additional ports need to be opened.
