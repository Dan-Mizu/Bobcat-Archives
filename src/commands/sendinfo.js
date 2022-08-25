const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendinfo")
    .setDescription("Sends Guild's Info")
    .setDefaultMemberPermissions(0)
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await wait(2000);
    await interaction.editReply({ content: "Yo..." });
  },
};
