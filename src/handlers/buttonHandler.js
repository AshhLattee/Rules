// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under GPL-3.0 - see LICENSE file
// GitHub: https://github.com/AshhLattee/rules-menu-bot

const rulesManager = require('../utils/rulesManager');
const { deployRulesMessage } = require('../utils/messageBuilder');

module.exports = {
    async execute(interaction) {
        const { customId } = interaction;

        if (customId.startsWith('confirm_delete_')) {
            const categoryId = customId.replace('confirm_delete_', '');
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
        } else if (customId === 'cancel_delete') {
            await interaction.update({
                content: '❌ Deletion cancelled.',
                components: []
            });
        }
    }
};
