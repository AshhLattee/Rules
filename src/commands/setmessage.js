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
    ActionRowBuilder,
    FileUploadBuilder,
    LabelBuilder
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

        const imageUpload = new FileUploadBuilder()
            .setCustomId('main_image')
            .setRequired(false)
            .setMinValues(0)
            .setMaxValues(1);

        const imageLabel = new LabelBuilder()
            .setLabel('Main Image (optional)')
            .setDescription('Upload an image for the main message')
            .setFileUploadComponent(imageUpload);

        modal.addComponents(
            new ActionRowBuilder().addComponents(messageInput)
        );
        
        modal.addLabelComponents(imageLabel);

        await interaction.showModal(modal);
    }
};
