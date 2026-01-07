// Rules Menu Bot - Discord Rules Management System
// Copyright (C) 2026 AshhLattee
// Licensed under Apache 2.0 with Commons Clause - see LICENSE file
// GitHub: https://github.com/AshhLattee/AshhLattee-Rules

const { 
    EmbedBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags,
    FileUploadBuilder,
    LabelBuilder
} = require('discord.js');
const rulesManager = require('../utils/rulesManager');
const { deployRulesMessage } = require('../utils/messageBuilder');

module.exports = {
    async execute(interaction) {
        const { customId, values } = interaction;

        if (customId === 'rules_select') {
            await handleRulesSelect(interaction, values[0]);
        } else if (customId === 'edit_category_select') {
            await handleEditSelect(interaction, values[0]);
        } else if (customId === 'delete_category_select') {
            await handleDeleteSelect(interaction, values[0]);
        }
    }
};

async function handleRulesSelect(interaction, categoryId) {
    const category = rulesManager.getCategory(categoryId);

    if (!category) {
        return await interaction.reply({
            content: '❌ Category not found!',
            flags: MessageFlags.Ephemeral
        });
    }

    const embed = new EmbedBuilder()
        .setTitle(category.label)
        .setDescription(category.rules.map((rule, i) => `${i + 1}. ${rule}`).join('\n'))
        .setColor(category.color || 0x5865F2)
        .setFooter({ text: 'Server Rules' })
        .setTimestamp();

    await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral
    });
}

async function handleEditSelect(interaction, categoryId) {
    const category = rulesManager.getCategory(categoryId);

    if (!category) {
        return await interaction.reply({
            content: '❌ Category not found!',
            flags: MessageFlags.Ephemeral
        });
    }

    const modal = new ModalBuilder()
        .setCustomId(`edit_category_${categoryId}`)
        .setTitle(`Edit: ${category.label}`);

    const labelInput = new TextInputBuilder()
        .setCustomId('category_label')
        .setLabel('Category Label')
        .setStyle(TextInputStyle.Short)
        .setValue(category.label)
        .setRequired(true)
        .setMaxLength(100);

    const rulesInput = new TextInputBuilder()
        .setCustomId('category_rules')
        .setLabel('Rules (one per line)')
        .setStyle(TextInputStyle.Paragraph)
        .setValue(category.rules.join('\n'))
        .setRequired(true)
        .setMaxLength(4000);

    const thumbnailUpload = new FileUploadBuilder()
        .setCustomId('category_thumbnail')
        .setRequired(false);

    const thumbnailLabel = new LabelBuilder()
        .setLabel('Thumbnail (optional)')
        .setDescription('Upload new thumbnail or leave empty to keep current')
        .setFileUploadComponent(thumbnailUpload);

    modal.addComponents(
        new ActionRowBuilder().addComponents(labelInput),
        new ActionRowBuilder().addComponents(rulesInput)
    );
    
    modal.addLabelComponents(thumbnailLabel);

    await interaction.showModal(modal);
}

async function handleDeleteSelect(interaction, categoryId) {
    const category = rulesManager.getCategory(categoryId);

    if (!category) {
        return await interaction.reply({
            content: '❌ Category not found!',
            ephemeral: true
        });
    }

    const confirmButton = new ButtonBuilder()
        .setCustomId(`confirm_delete_${categoryId}`)
        .setLabel('Confirm Delete')
        .setStyle(ButtonStyle.Danger);

    const cancelButton = new ButtonBuilder()
        .setCustomId('cancel_delete')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton);

    await interaction.update({
        content: `⚠️ Are you sure you want to delete **${category.label}**?\nThis action cannot be undone.`,
        components: [row]
    });
}
