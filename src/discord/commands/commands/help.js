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
      .setTitle('Solbot')
      .setDescription('Hi! I\'m Solbot. 😁\nYou can use me to send and receive SOL through discord!\n🚨 Warning 🚨 This wallet'
          + ' is not built to be the most secure wallet ever and provides no guarantees for 100% bug-free code and takes no responsibility for the loss'
          + ' of funds. Please use the bot to create a new wallet to be used in discord and only transfer small amounts to it.\n'
          + 'ℹ️ To keep your wallet info safe, only the "!send" command is available in a public discord channel. DM the bot for all other commands. ℹ️️'
          + '\nIf you\'re interested in the source code, go here: https://github.com/paul-schaaf/solbot')
      .addFields(...commandInstructions);

    message.channel.send(embed);
  },
};
