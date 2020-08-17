import UserService from '../../services/UserService';
import { COMMAND_PREFIX } from '../../config';

export default {
  name: 'delete-discordkey',
  description: 'Deletes your discord public key.',
  usage: [`${COMMAND_PREFIX}delete-discordkey`],
  async execute(message) {
    await UserService.deleteUser(message.author.id);
    message.channel.send('🥳 Successfully deleted discord public key 🥳');
    message.channel.send('ℹ️ You can no longer be tipped through discord ℹ️');
  },
};
