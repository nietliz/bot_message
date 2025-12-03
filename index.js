class BotMessage {
    constructor(name = "bot") {
        this.name = name;
    }

    sendMessage(message) {
        console.log(message);
    }
}

require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Routes,
  REST
} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// comando
const comando = [
  new SlashCommandBuilder()
    .setName('enviar')
    .setDescription('Escolher canal e depois escrever mensagem')
    .addChannelOption(opt =>
      opt.setName('canal').setDescription('Canal destino').setRequired(true)
    )
].map(c => c.toJSON());

// registrar
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
  { body: comando }
);

// bot
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== 'enviar') return;

  const canal = interaction.options.getChannel('canal');

  await interaction.reply({
    content: `Digite a mensagem para enviar em <#${canal.id}>.`,
    ephemeral: true
  });

  const filtro = (m) => m.author.id === interaction.user.id;
  const coletor = interaction.channel.createMessageCollector({ filter: filtro, max: 1, time: 60000 });

  coletor.on('collect', async (msg) => {
    await canal.send(msg.content);
    await interaction.followUp({ content: 'Enviado.', ephemeral: true });
  });
});

client.once('clientReady', () => {
  console.log('Bot online');
});

client.login(process.env.TOKEN);



// require('dotenv').config();
// const { Client, GatewayIntentBits } = require('discord.js');

// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.once('clientReady', () => {
//   // Instância do bot
  

//   const canal = client.channels.cache.get('1416165483006136412');
//   canal.send("Hello, world!");
// });

// client.login(process.env.TOKEN);

