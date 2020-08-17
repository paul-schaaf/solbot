import UserService from '../../services/UserService';

export default {
  name: 'get-tipkey',
  description: 'Command that displays tip public key',
  async execute(message) {
    let user = '';
    try {
      user = await UserService.getUser(message.author.id);
    } catch (e) {
      message.channel.send('It seems there is a problem with the bot. Please talk to the server admins.');
      return;
    }
    if (!user) {
      message.channel.send('You don\'t have a tip public key configured yet. Configure one to receive tips through discord!');
      return;
    }
    message.channel.send(`Your tip public key: ${user.publicKey}`);
  },
};
