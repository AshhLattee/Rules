// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under GPL-3.0 - see LICENSE file
// GitHub: https://github.com/AshhLattee/rules-menu-bot

const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Store commands
client.commands = new Collection();

// Load command files
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(join(commandsPath, file));
    client.commands.set(command.data.name, command);
}

// Ready event
client.once('ready', async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    
    // Register slash commands
    const commands = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    
    try {
        console.log('🔄 Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('✅ Slash commands registered!');
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
});

// Interaction handler
client.on('interactionCreate', async (interaction) => {
    try {
        // Handle slash commands
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            await command.execute(interaction);
        }
        
        // Handle modals
        if (interaction.isModalSubmit()) {
            const handler = require('./handlers/modalHandler');
            await handler.execute(interaction);
        }
        
        // Handle select menus
        if (interaction.isStringSelectMenu()) {
            const handler = require('./handlers/selectMenuHandler');
            await handler.execute(interaction);
        }
        
        // Handle buttons
        if (interaction.isButton()) {
            const handler = require('./handlers/buttonHandler');
            await handler.execute(interaction);
        }
    } catch (error) {
        console.error('Error handling interaction:', error);
        const reply = { content: '❌ An error occurred!', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(reply);
        } else {
            await interaction.reply(reply);
        }
    }
});

// Login
client.login(process.env.DISCORD_TOKEN);
