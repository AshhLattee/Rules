// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under GPL-3.0 - see LICENSE file
// GitHub: https://github.com/AshhLattee/rules-menu-bot

const { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    StringSelectMenuBuilder, 
    ActionRowBuilder 
} = require('discord.js');
const rulesManager = require('../utils/rulesManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Delete a rule category')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        const categories = rulesManager.getCategories();

        if (categories.length === 0) {
            return await interaction.reply({
                content: '❌ No categories exist to delete.',
                ephemeral: true
            });
        }

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('delete_category_select')
            .setPlaceholder('Choose a category to delete')
            .addOptions(
                categories.map(cat => ({
                    label: cat.label,
                    value: cat.id,
                    description: cat.description,
                    emoji: cat.emoji || undefined
                }))
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
            content: '🗑️ Select a category to delete:',
            components: [row],
            ephemeral: true
        });
    }
};
