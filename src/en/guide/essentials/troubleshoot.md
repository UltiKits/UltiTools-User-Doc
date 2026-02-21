# Troubleshooting

## Common Issues

### Plugin Won't Load

**Symptoms:** No UltiTools messages in the startup log.

**Possible Causes:**
- JAR file not in the correct location (should be in `plugins/`)
- Server version below 1.21
- Java version below 21

**Solution:** Check `logs/latest.log` for UltiTools-related error messages.

### Modules Won't Load

**Symptoms:** Modules installed via `/upm install` don't take effect.

**Possible Causes:**
- Server not restarted after installation (`/ul reload` doesn't load new modules)
- Corrupted module JAR file

**Solution:** Restart the server. If the module still won't load, delete the JAR and reinstall.

### Database Connection Failed

**Symptoms:** MySQL connection errors in the startup log.

**Possible Causes:**
- MySQL service not running
- Incorrect database credentials in `config.yml`
- Database doesn't exist (must be created beforehand)
- Firewall blocking the connection

**Solution:**
1. Verify MySQL is running
2. Check host, port, username, and password in `config.yml`
3. Confirm the database exists: `CREATE DATABASE ultitools;`
4. Test connectivity from the server to MySQL

### Commands Not Working

**Symptoms:** `/ul` or `/upm` commands don't respond or show errors.

**Possible Causes:**
- No OP permission
- Plugin not loaded correctly

**Solution:** Confirm you have OP permission and check that UltiTools appears green (loaded) in the `/plugins` list.

## Log Location

- Server log: `logs/latest.log`
- UltiTools outputs error messages to the server log

## Reporting Bugs

If the above doesn't solve your problem:

1. **GitHub Issues**: [github.com/UltiKits/UltiTools-Reborn/issues](https://github.com/UltiKits/UltiTools-Reborn/issues)

Please include:
- Server software and version (e.g., Paper 1.21.1)
- UltiTools version
- Full error log
- Steps to reproduce
