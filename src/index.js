import dotenv from 'dotenv';
import Discord from 'discord.js';

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  dotenv.config({ path: './src/secret/.env' });
}

const pre = '!';

const main = async () => {
  const client = new Discord.Client();

  client.once('ready', () => {
        console.log('Ready!');
  });

  client.on('message', (message) => {
    if (!message.content.startsWith(pre) || message.author.bot) return;

    const args = message.content.slice(pre.length).trim().split(/ +/);
    const command = args[0];

    if (message.channel.type === 'dm') {
      if (command === 'me') {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
      }
    }
  });

  try {
    await client.login(process.env.DISCORD_TOKEN);
  } catch (e) {
    console.error('Bot has failed to connect to discord.');
    process.exit(1);
  }
};

main();
