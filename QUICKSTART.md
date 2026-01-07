# Quick Start Guide

## Setup Steps

### 1. Create Discord Bot
1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Give it a name and create
4. Go to "Bot" tab → Click "Add Bot"
5. Under "Token" → Click "Reset Token" and copy it
6. Enable these intents:
   - Server Members Intent (optional)
   - Message Content Intent (optional)
7. Copy your Application ID from "General Information" tab

### 2. Install & Configure

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `.env`:
```
DISCORD_TOKEN=your_bot_token_from_step_1.5
CLIENT_ID=your_application_id_from_step_1.7
```

### 3. Invite Bot to Server

Use this URL (replace CLIENT_ID):
```
https://discord.com/oauth2/authorize?client_id=CLIENT_ID&permissions=274878221376&scope=bot%20applications.commands
```

### 4. Start Bot

```bash
npm start
```

You should see:
```
✅ Logged in as YourBot#1234
🔄 Registering slash commands...
✅ Slash commands registered!
```

### 5. Deploy Rules Message

In any channel, type:
```
/setup
```

This sends the rules menu message!

### 6. Add Your First Category

```
/add
```

Fill in the form:
- **Category ID**: `general`
- **Label**: `📜 General Rules`
- **Description**: `Basic server rules`
- **Emoji**: `📜`
- **Rules**: 
```
Be respectful to everyone
No spam or self-promotion
Keep conversations on-topic
```

Done! The rules message will automatically update.

## Commands Reference

| Command | Description | Permission |
|---------|-------------|------------|
| `/setup` | Deploy or update the rules message | Admin |
| `/add` | Add a new rule category | Admin |
| `/edit` | Edit an existing category | Admin |
| `/delete` | Delete a category | Admin |

## Tips

- The bot remembers the message and updates it automatically
- If the message is deleted, just run `/setup` again
- Users see rules in private messages (ephemeral)
- No limit on categories - add as many as you need!
- Back up `data/rules.json` to save your rules

## Troubleshooting

**Commands not showing?**
- Wait a few minutes for Discord to sync
- Check bot has "applications.commands" scope
- Try `/` in your server

**Bot can't send message?**
- Check bot has "Send Messages" permission
- Check bot role is high enough in hierarchy

**Message not updating?**
- The bot auto-updates when you add/edit/delete
- Manually run `/setup` to force update

## Need Help?

Open an issue on GitHub: https://github.com/AshhLattee/rules-menu-bot/issues
