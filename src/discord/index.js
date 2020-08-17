import Discord from 'discord.js';
import CommandUtil from '../commands';
import { COMMAND_PREFIX } from '../config';
import WalletService from '../services/WalletService';

const initHandler = async () => {
  const client = new Discord.Client();
  await CommandUtil.initCommands(client);

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('message', async (message) => {
    if (!message.content.startsWith(COMMAND_PREFIX) || message.author.bot) return;

    const args = message.content.slice(COMMAND_PREFIX.length).trim().split(/ +/);
    const command = args[0];

    if (!client.commands.keyArray().includes(command)) {
      return;
    }

    if (message.channel.type === 'dm') {
      if (!(await WalletService.isLoggedIn(message.author.id))
                && !CommandUtil.creationCommands.includes(command)
                && !CommandUtil.tipStorageCommands.includes(command)
      ) {
        message.channel.send(
          `🚧 You must create a wallet or login before making transfers. (commands: ${CommandUtil.creationCommands.map((c) => COMMAND_PREFIX + c)}) 🚧`,
        );
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

export default {
  initHandler,
};
