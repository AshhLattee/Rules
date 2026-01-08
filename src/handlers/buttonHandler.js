// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee (AI-Augmented Engineer)
// Licensed under Apache 2.0 with Commons Clause - see LICENSE file
// GitHub: https://github.com/AshhLattee/AshhLattee-Rules
// Developed with AI assistance

const { ContainerBuilder, MessageFlags } = require('discord.js');
const rulesManager = require('../utils/rulesManager');
const { deployRulesMessage } = require('../utils/messageBuilder');

module.exports = {
    async execute(interaction) {
        const { customId } = interaction;

        if (customId.startsWith('view_rules_')) {
            await handleViewRules(interaction);
        } else if (customId.startsWith('confirm_delete_')) {
            await handleConfirmDelete(interaction);
        } else if (customId === 'cancel_delete') {
            await handleCancelDelete(interaction);
        } else if (customId === 'confirm_reset') {
            await handleConfirmReset(interaction);
        } else if (customId === 'cancel_reset') {
            await handleCancelReset(interaction);
        }
    }
};

async function handleViewRules(interaction) {
    const categoryId = interaction.customId.replace('view_rules_', '');
    const category = rulesManager.getCategory(categoryId);

    if (!category) {
        return await interaction.reply({
            content: '❌ Category not found!',
            flags: MessageFlags.Ephemeral
        });
    }

    const rulesText = Array.isArray(category.rules) ? category.rules.join('\n') : category.rules;

    const container = new ContainerBuilder()
        .setAccentColor(category.color || 0x5865F2);
    
    // Add category label with thumbnail if available
    if (category.thumbnail) {
        container.addSectionComponents((section) => {
            section.addTextDisplayComponents((text) =>
                text.setContent(`**${category.label}**`)
            );
            return section.setThumbnailAccessory((thumbnail) => thumbnail.setURL(category.thumbnail));
        });
    } else {
        container.addTextDisplayComponents((text) =>
            text.setContent(`**${category.label}**`)
        );
    }
    
    container
        .addSeparatorComponents((separator) => separator)
        .addTextDisplayComponents((text) =>
            text.setContent(rulesText)
        );

    await interaction.reply({
        components: [container],
        flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
    });
}

async function handleConfirmDelete(interaction) {
    const categoryId = interaction.customId.replace('confirm_delete_', '');
    const category = rulesManager.getCategory(categoryId);

    if (!category) {
        return await interaction.update({
            content: '❌ Category not found!',
            components: []
        });
    }

    rulesManager.deleteCategory(categoryId);

    // Update the rules message
    const config = rulesManager.getConfig();
    if (config.channelId) {
        try {
            const channel = await interaction.client.channels.fetch(config.channelId);
            await deployRulesMessage(channel);
        } catch (error) {
            console.error('Error updating rules message:', error);
        }
    }

    await interaction.update({
        content: `✅ Category **${category.label}** deleted successfully!`,
        components: []
    });
}

async function handleCancelDelete(interaction) {
    await interaction.update({
        content: '❌ Deletion cancelled.',
        components: []
    });
}

async function handleConfirmReset(interaction) {
    const fs = require('fs');
    const path = require('path');
    const DATA_FILE = path.join(__dirname, '../../data/rules.json');

    // Delete the data file
    if (fs.existsSync(DATA_FILE)) {
        fs.unlinkSync(DATA_FILE);
    }

    await interaction.update({
        content: '✅ **All data has been reset!**\n\nAll categories and configuration have been deleted. Use `/add` to create new categories and `/setup` to deploy a new message.',
        components: []
    });
}

async function handleCancelReset(interaction) {
    await interaction.update({
        content: '❌ Reset cancelled. Your data is safe.',
        components: []
    });
}
