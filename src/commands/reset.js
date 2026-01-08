// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under Apache 2.0 with Commons Clause - see LICENSE file
// GitHub: https://github.com/AshhLattee/AshhLattee-Rules

const { 
    SlashCommandBuilder, 
    PermissionFlagsBits,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    MessageFlags
} = require('discord.js');
const rulesManager = require('../utils/rulesManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Reset all rules and configuration (DANGER: Cannot be undone!)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        const confirmButton = new ButtonBuilder()
            .setCustomId('confirm_reset')
            .setLabel('⚠️ Yes, Delete Everything')
            .setStyle(ButtonStyle.Danger);

        const cancelButton = new ButtonBuilder()
            .setCustomId('cancel_reset')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(cancelButton, confirmButton);

        await interaction.reply({
            content: '⚠️ **WARNING: This will delete ALL categories and reset the bot configuration!**\n\nThis action **cannot be undone**. Are you sure?',
            components: [row],
            flags: MessageFlags.Ephemeral
        });
    }
};
