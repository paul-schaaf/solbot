import Discord from 'discord.js';
import AccountUtil from './account';
import CommandUtil from './commands';
import Server from './server';
import ConfigUtil, { commandPrefix } from './config';

ConfigUtil.init();

const main = async () => {
  const client = new Discord.Client();
  await CommandUtil.initCommands(client);
  Server.init('testnet');

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('message', async (message) => {
    if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

    const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
    const command = args[0];

    if (!client.commands.keyArray().includes(command)) {
      return;
    }

    if (message.channel.type === 'dm') {
      if (AccountUtil.getAccount() === null && !CommandUtil.creationCommands.includes(command)) {
        message.channel.send('🚧 You must configure a private key before making transfers. (commands: !create-new, !login) 🚧');
        return;
      }
      await client.commands.get(command).execute(message, args);
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
