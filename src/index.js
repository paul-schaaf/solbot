import dotenv from 'dotenv';
import Discord from 'discord.js';

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  dotenv.config({ path: './src/secret/.env' });
}

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (message.content === '!ping') {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong.');
  }
});

client.login(process.env.DISCORD_TOKEN);
