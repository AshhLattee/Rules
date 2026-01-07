// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under GPL-3.0 - see LICENSE file
// GitHub: https://github.com/AshhLattee/rules-menu-bot

const { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    StringSelectMenuBuilder, 
    ActionRowBuilder,
    MessageFlags 
} = require('discord.js');
const rulesManager = require('../utils/rulesManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit')
        .setDescription('Edit an existing rule category')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        const categories = rulesManager.getCategories();

        if (categories.length === 0) {
            return await interaction.reply({
                content: '❌ No categories exist yet. Use `/add` to create one first.',
                flags: MessageFlags.Ephemeral
            });
        }

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('edit_category_select')
            .setPlaceholder('Choose a category to edit')
            .addOptions(
                categories.map(cat => ({
                    label: cat.label,
                    value: cat.id,
                    emoji: cat.emoji || undefined
                }))
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
            content: '📝 Select a category to edit:',
            components: [row],
            flags: MessageFlags.Ephemeral
        });
    }
};
