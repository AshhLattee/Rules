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

    const rulesText = category.rules.map((rule, i) => `${i + 1}. ${rule}`).join('\n');

    const container = new ContainerBuilder()
        .setAccentColor(category.color || 0x5865F2);
    
    // Add category label with thumbnail as section
    container.addSectionComponents((section) => {
        section.addTextDisplayComponents((text) =>
            text.setContent(`**${category.label}**`)
        );
        
        // Add thumbnail if provided
        if (category.thumbnail) {
            section.setThumbnailAccessory((thumbnail) => thumbnail.setURL(category.thumbnail));
        }
        
        return section;
    });
    
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
