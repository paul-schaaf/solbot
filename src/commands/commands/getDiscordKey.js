import UserService from '../../services/UserService';
import {COMMAND_PREFIX} from "../../config";

export default {
  name: 'get-discordkey',
  description: 'Displays your discord public key.',
  usage: [COMMAND_PREFIX + 'get-discordkey'],
  async execute(message) {
    let user = '';
    try {
      user = await UserService.getUser(message.author.id);
    } catch (e) {
      message.channel.send('It seems there is a problem with the bot. Please talk to the server admins.');
      return;
    }
    if (!user) {
      message.channel.send('You don\'t have a discord public key configured yet. Configure one to receive tips through discord!');
      return;
    }
    message.channel.send(`Your discord public key: ${user.publicKey}`);
  },
};
