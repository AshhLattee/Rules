// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under GPL-3.0 - see LICENSE file
// GitHub: https://github.com/AshhLattee/rules-menu-bot

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { deployRulesMessage } = require('../utils/messageBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Send or update the rules message in this channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        try {
            const message = await deployRulesMessage(interaction.channel);
            await interaction.editReply({
                content: `✅ Rules message deployed successfully!\n[Jump to message](${message.url})`
            });
        } catch (error) {
            console.error('Error in setup command:', error);
            await interaction.editReply({
                content: '❌ Failed to deploy rules message. Check bot permissions and try again.'
            });
        }
    }
};
