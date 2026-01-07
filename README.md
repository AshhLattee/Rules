# Rules Menu Bot

A free, open-source Discord bot that provides an interactive rules menu using Discord's Components v2. Built with discord.js and fully customizable through slash commands.

## ⚠️ ANTI-RESALE NOTICE

**This bot is FREE and open-source under Apache License 2.0 with Commons Clause.**

### If you are selling this bot:
- You are **violating copyright law**
- You are committing **license infringement**
- Your rights to use this code are **automatically terminated**
- You will face **legal action** including:
  - DMCA takedown notices
  - Cease and desist letters
  - Civil lawsuits for damages
  - Payment processor/platform bans

### We WILL enforce this:
- All sales are tracked and reported
- GitHub commit history proves original authorship
- Legal action will be taken against resellers
- Commons Clause specifically prohibits commercial sale

**If you paid for this bot:** You were scammed. Report the seller and download the free version from the official repository.

**Official Repository:** https://github.com/AshhLattee/rules-menu-bot

---

## ✨ Features

- 📋 **Interactive Select Menus** - Modern Discord Components v2 UI
- ⚡ **Easy Management** - Add, edit, and delete rule categories via slash commands
- 🎨 **Customizable** - Set custom emojis, colors, and descriptions for each category
- 💾 **Persistent** - Automatically updates existing message on bot restart
- 🔒 **Admin Only** - All management commands require Administrator permission
- 📱 **User Friendly** - No coding required to manage rules

## 📋 Requirements

- Node.js 16.9.0 or higher
- A Discord bot token ([Get one here](https://discord.com/developers/applications))
- Administrator permission in your Discord server

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/AshhLattee/rules-menu-bot.git
cd rules-menu-bot
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and add your bot credentials:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

4. **Start the bot:**
```bash
npm start
```

## 📖 Usage

### Initial Setup

1. **Invite the bot** to your server with these permissions:
   - Send Messages
   - Embed Links
   - Use Application Commands

2. **Run setup command** in the channel where you want the rules menu:
```
/setup
```

### Managing Rule Categories

#### Add a New Category
```
/add
```
Fill in the modal form with:
- **Category ID**: Unique identifier (e.g., `general`, `voice`)
- **Label**: Display name (e.g., "📜 General Rules")
- **Description**: Short description for the menu
- **Emoji**: Optional emoji for the category
- **Rules**: List of rules (one per line)

#### Edit a Category
```
/edit
```
Select the category from the dropdown, then update the fields.

#### Delete a Category
```
/delete
```
Select the category and confirm deletion.

### User Experience

Users simply click the select menu in the rules message, choose a category, and receive an ephemeral (private) message with the rules.

## 📂 Project Structure

```
Rules/
├── LICENSE                    # GPL-3.0 License
├── README.md                  # This file
├── package.json               # Dependencies
├── .env                       # Environment variables (create from .env.example)
├── data/
│   └── rules.json            # Auto-generated rules storage
└── src/
    ├── index.js              # Main bot entry point
    ├── commands/             # Slash commands
    │   ├── setup.js          # Deploy rules message
    │   ├── add.js            # Add category
    │   ├── edit.js           # Edit category
    │   └── delete.js         # Delete category
    ├── handlers/             # Interaction handlers
    │   ├── modalHandler.js   # Modal submissions
    │   ├── selectMenuHandler.js  # Select menu interactions
    │   └── buttonHandler.js  # Button interactions
    └── utils/
        ├── rulesManager.js   # Data management
        └── messageBuilder.js # Message construction
```

## 🔧 Configuration

The bot stores all data in `data/rules.json`. This file is automatically created and managed by the bot.

Example category structure:
```json
{
  "id": "general",
  "label": "📜 General Rules",
  "description": "Basic server rules",
  "emoji": "📜",
  "rules": [
    "Be respectful to everyone",
    "No spamming or flooding",
    "Use appropriate channels"
  ],
  "color": 5814015
}
```

## 🤝 Contributing

Contributions are welcome! This project is open-source under GPL-3.0.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

**This means:**
- ✅ Use it for free
- ✅ Modify it
- ✅ Share it
- ✅ Contribute to it
- ❌ **Sell it**
- ❌ Make it proprietary

Copyright (C) 2026 AshhLattee

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
