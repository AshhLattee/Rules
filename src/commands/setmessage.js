// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under Apache 2.0 with Commons Clause - see LICENSE file
// GitHub: https://github.com/AshhLattee/AshhLattee-Rules

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
        .setName('setmessage')
        .setDescription('Set the main rules message text')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('set_main_message')
            .setTitle('Set Rules Message');

        const messageInput = new TextInputBuilder()
            .setCustomId('main_message')
            .setLabel('Main Message Text (supports markdown)')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('**📜 Server Rules**\n\nClick a button below to view rules.')
            .setRequired(true)
            .setMaxLength(1000);

        const imageInput = new TextInputBuilder()
            .setCustomId('main_image')
            .setLabel('Main Image URL (optional)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('https://i.imgur.com/example.png')
            .setRequired(false)
            .setMaxLength(500);

        modal.addComponents(
            new ActionRowBuilder().addComponents(messageInput),
            new ActionRowBuilder().addComponents(imageInput)
        );

        await interaction.showModal(modal);
    }
};
