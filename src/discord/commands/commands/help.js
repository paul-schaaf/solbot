import Discord from 'discord.js';
import CommandUtil from '../index';
import { COMMAND_PREFIX } from '../../../config';

export default {
  name: 'help',
  description: 'Displays bot instructions.',
  usage: [`${COMMAND_PREFIX}help`],
  async execute(message) {
    const allCommands = CommandUtil.getAllCommands();
    const commandInstructions = allCommands.map((c) => ({ name: COMMAND_PREFIX + c.name, value: `${c.description}\n\nExample usage: ${c.usage.join(', ')}` }));

    const embed = new Discord.MessageEmbed();
    embed
      .setColor('#0099ff')
      .setTitle('Solana Discord Tipping Bot')
      .setDescription('Hi! I\'m the Solana Discord Tipping Bot.\nYou can use me to send and receive SOL through discord!\n🚨Warning🚨 This wallet' +
          ' is not built to be the most secure wallet ever and provides no guarantees for 100% bug-free code and takes no responsibility for the loss' +
          ' of funds. Please use the bot to create a new wallet and only transfer small amounts to it.')
      .addFields(...commandInstructions);

    message.channel.send(embed);
  },
};
