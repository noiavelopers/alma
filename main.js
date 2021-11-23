const { Client, Intents, MessageEmbed } = require('discord.js');
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

const roles = {
  // Programming languages:
  "python"    : "912400291503165450",
  "java"      : "912401472984059904",
  "c"         : "912402060434108456",
  "c++"       : "912402349845274654",
  "c#"        : "912402613947998208",
  "javascript": "912399934425296906",
  "typescript": "912400935496589402",
  "rust"      : "912403591967420417",
  "go"        : "912403741402103848"
}

const getKeysAsList = (obj) => {
  let list = ""
  Object.keys(obj).map((item, index)=> {
    if (index === Object.keys(obj).length - 1) {
      list += "└╴" + item + "\n"
    } else {
      list += "├╴" + item + "\n" 
    }
  })
  return list;
}

client.on("messageCreate", async message => {
	if (!message.content.startsWith(prefix)) return;

  let command = message.content.toLowerCase().replace(`${prefix} `, "");
  let sender = message.member;

  // Simple Commands
  switch (command) {
    case "rm -rf /":
      message.reply("Vou apagar você, corno!")
      break;

    case "ajuda":
      message.reply({embeds: [new MessageEmbed({
        title: "Ajuda",
        description: "Seguem abaixo os comandos e as opções de cada comando:",
        color: "#FF4D77",
        fields: [
          {
            name: "cargo",
            value: `${getKeysAsList(roles)}`
          }
        ]
      })]});
      break

    case "cargo":
      message.reply("Sintaxe correta é: `alma cargo nomeDoCargo`")
      break;

    default:
      break;
  }

  // Complex Commands
  if (command.includes("cargo ")) {
    roleName = command.replace("cargo ", "").split(" ")[0]
    let role = message.guild.roles.cache.find(r => r.id === roles[roleName])
    if (role) {
      if (sender.roles.cache.some(r => r.id === role.id)) {
        sender.roles.remove(role)
        message.reply("Cargo " + roleName + " removido.")
      } else {
        sender.roles.add(role)
        message.reply("Cargo " + roleName + " adicionado.")
      }
    } else {
      message.reply(`Não encontrei o cargo "${roleName}"`)
    }
  }
});
// Login to Discord with your client's token
client.login(token);