# Rules Bot

A free, open-source Discord bot that provides an interactive rules menu using Discord's Components v2. Built with discord.js and fully customizable through slash commands.

## ⚠️ ANTI-RESALE NOTICE

This bot is **source-available** and licensed under **Apache License 2.0 with Commons Clause**.

The Commons Clause **explicitly prohibits** selling the bot (or offering it as a paid/hosted service) where its main value comes from this code — even with minor changes like renaming/reskinning.

If you're selling copies or "premium" versions of this bot:
- You're exceeding the license grant → violating the terms.
- This may constitute copyright infringement (especially if notices/attribution are removed).
- Your permission to use/distribute the code is limited or revoked under the license.

We take this seriously:
- GitHub commit history + timestamps prove original authorship (AshhLattee, 2026).
- Public callouts + reports to marketplaces/platforms happen when violations are found.
- Cease & desist letters will be sent to clear violators.
- Further legal action (including claims for damages) is possible if needed.

If you **paid** for this bot: You were likely scammed.  
Delete it, report the seller, and download the **free official version** here.  
The community stays protected when we all use/share it properly.

Fork, modify, learn — just don't resell lazy copies. Thanks for respecting the work! 🌙

**Official Repository:** https://github.com/AshhLattee/AshhLattee-Rules

---

## ✨ Features

- 📋 **Interactive Buttons** - Modern Discord Components v2 UI with container-based layout
- ⚡ **Easy Management** - Modal-based interface with file upload support for thumbnails
- 🎨 **Full Markdown** - Complete control over rule formatting and styling
- 💾 **Persistent** - Auto-updates existing message, remembers channel and message ID
- 🔒 **Admin Only** - All commands require Administrator permission
- 📸 **Image Support** - Upload thumbnails for main message via modal

## 🚀 Quick Start

### 1. Get Bot Token
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create New Application → Bot tab → Add Bot
3. Copy your bot token and Application ID

### 2. Setup & Run
```bash
git clone https://github.com/AshhLattee/AshhLattee-Rules.git
cd AshhLattee-Rules
npm install
cp .env.example .env
```

Edit `.env`:
```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id
```

Start the bot:
```bash
npm start
```

### 3. Invite Bot
Use this URL (replace `CLIENT_ID`):
```
https://discord.com/oauth2/authorize?client_id=CLIENT_ID&permissions=274878221376&scope=bot%20applications.commands
```

### 4. Deploy & Customize
```
/setup          # Deploy rules message in current channel
/setmessage     # Customize main text and upload thumbnail
/add            # Add rule categories with markdown support
/edit           # Edit existing categories
/delete         # Remove categories
```

## 📖 Commands

| Command | Description |
|---------|-------------|
| `/setup` | Deploy or update rules message |
| `/setmessage` | Set main message text and image |
| `/add` | Add new category (supports markdown & thumbnails) |
| `/edit` | Edit existing category |
| `/delete` | Delete category |
| `/reset` | Reset all data (DANGER: Cannot be undone!) |

**All commands are admin-only and rules auto-update on changes.**

## 📂 Project Structure

```
src/
├── commands/      # Slash commands (setup, add, edit, delete, setmessage)
├── handlers/      # Modal, button, and select menu handlers
└── utils/         # Rules manager & message builder
data/
└── rules.json     # Auto-generated storage (categories + config)
```

## 💡 Tips

- Rules support full markdown - format however you want
- Upload images in modals for thumbnails
- Bot auto-updates the message when you make changes
- Back up `data/rules.json` to save your configuration

## 🤝 Contributing

Contributions welcome! Fork, modify, and submit PRs.

1. Fork the repo
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push (`git push origin feature/NewFeature`)
5. Open Pull Request

## 👤 Author

**AshhLattee** - AI-Augmented Engineer
- GitHub: [@AshhLattee](https://github.com/AshhLattee)
- Discord: AshhLattee

*This project was developed with AI assistance as part of modern AI-augmented engineering practices.*

## 🐛 Report Violations

If you find someone selling this bot, please report it by opening an issue on this repository.

## ⚖️ Legal

This software is licensed under the Apache License 2.0 with Commons Clause. You may use, modify, and redistribute this software for free, but you may NOT sell it or charge for services based on it.

The Commons Clause specifically prohibits providing the software to third parties for a fee or other consideration. This includes:
- Selling the bot or its code
- Selling access to a hosted version
- Charging for consulting/support services related to the bot
- Any commercial use that derives value from the software

For full license terms, see the [LICENSE](LICENSE) file.

---

**Made with ❤️ by AshhLattee (AI-Augmented Engineer) | Free Forever | Open Source**

*Developed with AI assistance*
