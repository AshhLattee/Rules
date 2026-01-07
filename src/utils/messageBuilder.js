// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under Apache 2.0 with Commons Clause - see LICENSE file
// GitHub: https://github.com/AshhLattee/AshhLattee-Rules

const { ContainerBuilder, ButtonStyle, MessageFlags } = require('discord.js');
const rulesManager = require('./rulesManager');

async function createRulesMessage() {
    const categories = rulesManager.getCategories();
    const config = rulesManager.getConfig();
    
    if (categories.length === 0) {
        return {
            content: '⚠️ No rule categories configured yet! Use `/add` to create categories.',
            components: []
        };
    }

    const mainMessage = config.mainMessage || '**📜 Server Rules**\n\nClick a button below to view the rules for each category.';
    const mainImage = config.mainImage;

    const container = new ContainerBuilder()
        .setAccentColor(0x5865F2);
    
    // Add main message (with or without image)
    if (mainImage) {
        // Use section with thumbnail if image provided
        container.addSectionComponents((section) => {
            section.addTextDisplayComponents((text) =>
                text.setContent(mainMessage)
            );
            return section.setThumbnailAccessory((thumbnail) => thumbnail.setURL(mainImage));
        });
    } else {
        // Use plain text display if no image
        container.addTextDisplayComponents((text) =>
            text.setContent(mainMessage)
        );
    }
    
    container.addSeparatorComponents((separator) => separator);

    // Add each category as a section with a button
    categories.forEach((cat, index) => {
        container.addSectionComponents((section) => {
            section.addTextDisplayComponents((textDisplay) =>
                textDisplay.setContent(`**${cat.label}**`)
            );
            
            // Always add button for categories
            return section.setButtonAccessory((button) =>
                button
                    .setCustomId(`view_rules_${cat.id}`)
                    .setLabel('View Rules')
                    .setStyle(ButtonStyle.Primary)
            );
        });
        
        // Add separator after each category except the last one
        if (index < categories.length - 1) {
            container.addSeparatorComponents((separator) => separator);
        }
    });

    return {
        components: [container],
        flags: MessageFlags.IsComponentsV2
    };
}

async function deployRulesMessage(channel) {
    const config = rulesManager.getConfig();
    const messageContent = await createRulesMessage();

    try {
        // Try to find and edit existing message in the same channel
        if (config.messageId && config.channelId === channel.id) {
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
