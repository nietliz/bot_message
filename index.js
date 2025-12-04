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
  
  // --- MUDANÇA: Obtendo Nickname e Status de Admin ---
  // O `interaction.member` só existe se for executado em um servidor (guild)
  const member = interaction.member; 
  
  if (member) {
    // Obtém o apelido do usuário no servidor (ou nome de usuário se não houver apelido)
    const nicknameUsuario = member.displayName;
    // Verifica se o usuário tem a permissão de Administrador (Discord.js v14+)
    const isAdmin = member.permissions.has('Administrator');
    // Exemplo de uso: logar ou usar na interação inicial
    console.log(`Comando /enviar usado por: ${nicknameUsuario}`);
    console.log(`É Administrador: ${isAdmin}`);
    // ---------------------------------------------------
  
    // Adicionando uma verificação de admin, se desejar restringir:
    // if (!isAdmin) {
    //   return interaction.reply({ content: 'Você precisa ser Administrador para usar este comando.', ephemeral: true });
    // }
  
  } else {
    // Caso o comando seja usado em DM, interaction.member será null.
    console.log(`Comando /enviar usado fora de um servidor por: ${interaction.user.tag}`);
  }

  
  if(isAdmin){
    const canal = interaction.options.getChannel('canal');
    
    await interaction.reply({
      // Exemplo de uso do nickname na resposta:
      content: `Olá, **${member ? member.displayName : interaction.user.username}**! Digite a mensagem para enviar em <#${canal.id}>.`,
      ephemeral: true
    });
    
    const filtro = (m) => m.author.id === interaction.user.id;
    const coletor = interaction.channel.createMessageCollector({ filter: filtro, max: 1, time: 60000 });
    
    coletor.on('collect', async (msg) => {
      await canal.send(msg.content);
      await interaction.editReply({ content: 'Enviado. (Mensagem enviada com sucesso!)', components: [] });
    });
  }else{
    console.log('Não é administrador');
  }
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

