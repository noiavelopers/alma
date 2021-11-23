const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES
]});
const prefix = "alma"

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on("message", async message => {
	if (!message.content.startsWith(prefix)) return;

  switch (message.content.toLowerCase().replace(`${prefix} `, "")) {
    case "ping":
      message.reply("Poggers!")
      break;
  
    default:
      break;
  }
});

// Login to Discord with your client's token
client.login(token);