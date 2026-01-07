// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under GPL-3.0 - see LICENSE file
// GitHub: https://github.com/AshhLattee/rules-menu-bot

const { ContainerBuilder, StringSelectMenuBuilder, MessageFlags } = require('discord.js');
const rulesManager = require('./rulesManager');

async function createRulesMessage() {
    const categories = rulesManager.getCategories();
    
    if (categories.length === 0) {
        return {
            content: '⚠️ No rule categories configured yet! Use `/rules add` to create categories.',
            components: []
        };
    }

    const selectOptions = categories.map(cat => ({
        label: cat.label,
        value: cat.id,
        description: cat.description,
        emoji: cat.emoji || undefined
    }));

    const container = new ContainerBuilder()
        .setAccentColor(0x5865F2)
        .addTextDisplayComponents((text) =>
            text.setContent('**📜 Server Rules**\n\nSelect a category below to view the rules.')
        )
        .addActionRowComponents((row) =>
            row.setComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('rules_select')
                    .setPlaceholder('Choose a rule category...')
                    .addOptions(selectOptions)
            )
        );

    return {
        components: [container],
        flags: MessageFlags.IsComponentsV2
    };
}

async function deployRulesMessage(channel) {
    const config = rulesManager.getConfig();
    const messageContent = await createRulesMessage();

    try {
        // Try to find and edit existing message
        if (config.messageId) {
            try {
                const existingMessage = await channel.messages.fetch(config.messageId);
                await existingMessage.edit(messageContent);
                return existingMessage;
            } catch (error) {
                // Message not found, send new one
                console.log('Existing message not found, sending new one...');
            }
        }

        // Send new message
        const newMessage = await channel.send(messageContent);
        rulesManager.setConfig({ messageId: newMessage.id, channelId: channel.id });
        return newMessage;
    } catch (error) {
        console.error('Error deploying rules message:', error);
        throw error;
    }
}

module.exports = { createRulesMessage, deployRulesMessage };
