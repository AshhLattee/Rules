// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under GPL-3.0 - see LICENSE file
// GitHub: https://github.com/AshhLattee/rules-menu-bot

const { 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder 
} = require('discord.js');
const rulesManager = require('../utils/rulesManager');
const { deployRulesMessage } = require('../utils/messageBuilder');

module.exports = {
    async execute(interaction) {
        if (interaction.customId === 'add_category') {
            await handleAddCategory(interaction);
        } else if (interaction.customId.startsWith('edit_category_')) {
            await handleEditCategory(interaction);
        }
    }
};

async function handleAddCategory(interaction) {
    const id = interaction.fields.getTextInputValue('category_id').toLowerCase().replace(/\s+/g, '_');
    const label = interaction.fields.getTextInputValue('category_label');
    const description = interaction.fields.getTextInputValue('category_description');
    const emoji = interaction.fields.getTextInputValue('category_emoji') || null;
    const rulesText = interaction.fields.getTextInputValue('category_rules');

    // Check if category already exists
    const existing = rulesManager.getCategory(id);
    if (existing) {
        return await interaction.reply({
            content: `❌ A category with ID \`${id}\` already exists!`,
            ephemeral: true
        });
    }

    // Parse rules (one per line)
    const rules = rulesText.split('\n').filter(line => line.trim()).map(line => line.trim());

    // Create category
    const category = {
        id,
        label,
        description,
        emoji,
        rules,
        color: 0x5865F2
    };

    rulesManager.addCategory(category);

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

    await interaction.reply({
        content: `✅ Category **${label}** added successfully! Use \`/setup\` to update the rules message.`,
        ephemeral: true
    });
}

async function handleEditCategory(interaction) {
    const categoryId = interaction.customId.replace('edit_category_', '');
    const category = rulesManager.getCategory(categoryId);

    if (!category) {
        return await interaction.reply({
            content: '❌ Category not found!',
            ephemeral: true
        });
    }

    const label = interaction.fields.getTextInputValue('category_label');
    const description = interaction.fields.getTextInputValue('category_description');
    const emoji = interaction.fields.getTextInputValue('category_emoji') || null;
    const rulesText = interaction.fields.getTextInputValue('category_rules');

    const rules = rulesText.split('\n').filter(line => line.trim()).map(line => line.trim());

    const updatedCategory = {
        label,
        description,
        emoji,
        rules
    };

    rulesManager.updateCategory(categoryId, updatedCategory);

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

    await interaction.reply({
        content: `✅ Category **${label}** updated successfully!`,
        ephemeral: true
    });
}
