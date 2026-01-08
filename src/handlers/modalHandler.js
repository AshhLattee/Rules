// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under Apache 2.0 with Commons Clause - see LICENSE file
// GitHub: https://github.com/AshhLattee/AshhLattee-Rules

const { 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder,
    MessageFlags 
} = require('discord.js');
const rulesManager = require('../utils/rulesManager');
const { deployRulesMessage } = require('../utils/messageBuilder');

module.exports = {
    async execute(interaction) {
        if (interaction.customId === 'add_category') {
            await handleAddCategory(interaction);
        } else if (interaction.customId.startsWith('edit_category_')) {
            await handleEditCategory(interaction);
        } else if (interaction.customId === 'set_main_message') {
            await handleSetMainMessage(interaction);
        }
    }
};

async function handleAddCategory(interaction) {
    const id = interaction.fields.getTextInputValue('category_id').toLowerCase().replace(/\s+/g, '_');
    const label = interaction.fields.getTextInputValue('category_label');
    const rulesText = interaction.fields.getTextInputValue('category_rules');
    
    // Get uploaded thumbnail file
    const thumbnailFiles = interaction.fields.getUploadedFiles('category_thumbnail');
    const thumbnail = thumbnailFiles && thumbnailFiles.size > 0 ? thumbnailFiles.first().url : null;

    // Check if category already exists
    const existing = rulesManager.getCategory(id);
    if (existing) {
        return await interaction.reply({
            content: `❌ A category with ID \`${id}\` already exists!`,
            flags: MessageFlags.Ephemeral
        });
    }

    // Parse rules (one per line)
    const rules = rulesText.trim();

    // Create category
    const category = {
        id,
        label,
        rules,
        thumbnail,
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
        flags: MessageFlags.Ephemeral
    });
}

async function handleEditCategory(interaction) {
    const categoryId = interaction.customId.replace('edit_category_', '');
    const category = rulesManager.getCategory(categoryId);

    if (!category) {
        return await interaction.reply({
            content: '❌ Category not found!',
            flags: MessageFlags.Ephemeral
        });
    }

    const label = interaction.fields.getTextInputValue('category_label');
    const rulesText = interaction.fields.getTextInputValue('category_rules');
    
    // Get uploaded thumbnail file (if any), otherwise clear it
    const thumbnailFiles = interaction.fields.getUploadedFiles('category_thumbnail');
    const thumbnail = thumbnailFiles && thumbnailFiles.size > 0 ? thumbnailFiles.first().url : null;

    const rules = rulesText.trim();

    const updatedCategory = {
        label,
        rules,
        thumbnail
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
        flags: MessageFlags.Ephemeral
    });
}

async function handleSetMainMessage(interaction) {
    const mainMessage = interaction.fields.getTextInputValue('main_message');
    
    // Get uploaded image file (if any), otherwise clear it
    const imageFiles = interaction.fields.getUploadedFiles('main_image');
    const mainImage = imageFiles && imageFiles.size > 0 ? imageFiles.first().url : null;

    rulesManager.setConfig({ mainMessage, mainImage });

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
        content: '✅ Main message updated successfully!',
        flags: MessageFlags.Ephemeral
    });
}
