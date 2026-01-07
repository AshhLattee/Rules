// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under GPL-3.0 - see LICENSE file
// GitHub: https://github.com/AshhLattee/rules-menu-bot

const { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder 
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add a new rule category')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('add_category')
            .setTitle('Add Rule Category');

        const idInput = new TextInputBuilder()
            .setCustomId('category_id')
            .setLabel('Category ID (unique, no spaces)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('e.g., general, voice, chat')
            .setRequired(true)
            .setMaxLength(50);

        const labelInput = new TextInputBuilder()
            .setCustomId('category_label')
            .setLabel('Category Label (display name)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('e.g., General Rules, Voice Chat Rules')
            .setRequired(true)
            .setMaxLength(100);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('category_description')
            .setLabel('Description (shown in menu)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('e.g., Basic server rules')
            .setRequired(true)
            .setMaxLength(100);

        const emojiInput = new TextInputBuilder()
            .setCustomId('category_emoji')
            .setLabel('Emoji (optional)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('e.g., 📜')
            .setRequired(false)
            .setMaxLength(10);

        const rulesInput = new TextInputBuilder()
            .setCustomId('category_rules')
            .setLabel('Rules (one per line)')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Rule 1\nRule 2\nRule 3')
            .setRequired(true)
            .setMaxLength(4000);

        modal.addComponents(
            new ActionRowBuilder().addComponents(idInput),
            new ActionRowBuilder().addComponents(labelInput),
            new ActionRowBuilder().addComponents(descriptionInput),
            new ActionRowBuilder().addComponents(emojiInput),
            new ActionRowBuilder().addComponents(rulesInput)
        );

        await interaction.showModal(modal);
    }
};
