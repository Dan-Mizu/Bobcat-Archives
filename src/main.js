//get servers
const server_data = require("./config/server_data.json");

//dependencies
const fs = require('node:fs');
const path = require('node:path');

//init discord.js
const { Client, Intents, SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

//generate commands
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

//loop through servers
for (let i = 0; i < server_data.length; i++) {
  //init instance
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  //init rest api
  const rest = new REST({ version: "10" }).setToken(
    server_data[i].client_token
  );

  //register commands
  rest
    .put(Routes.applicationGuildCommands(server_data[i].client_id, server_data[i].guild_id), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);

  //provide client token
  client.login(server_data[i].client_token);
}

//send embedded message
async function sendEmbeddedMessage(messageData, interaction) {
  let loop = 0;
  for (let i = 0; i < messageData.length; i++) {
    loop++;
  }
}

// //updates thread helper image by deleting old ones and sending a new one
// function updateThreadHelperImage(client, channelID) {
//   //get bot ID
//   let botID = client.user.id;

//   //remove older messages
//   client.channels.fetch(channelID).then((channel) => {
//     deletePastMessagesFromUser(botID, channel);
//   });

//   //send new image
//   client.channels.fetch(channelID).then((channel) => {
//     sendThreadHelperImage(channel);
//   });
// }

// //send thread helper image in this channel
// function sendThreadHelperImage(channel) {
//   channel.send({ files: ["./resources/create_thread.png"] });
// }

// //delete all past messages from this bot in this channel
// function deletePastMessagesFromUser(userID, channel) {
//   channel.messages.fetch({ limit: 100 }).then((messages) => {
//     messages.forEach((message) => {
//       if (message.author.id == userID) {
//         message.delete();
//       }
//     });
//   });
// }
