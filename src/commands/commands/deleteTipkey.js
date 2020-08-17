import UserService from '../../services/UserService';

export default {
  name: 'delete-tipkey',
  description: 'Command that deletes tip public key',
  async execute(message) {
    await UserService.deleteUser(message.author.id);
    message.channel.send('🥳 Successfully deleted tip public key 🥳');
    message.channel.send('ℹ️ You can no longer be tipped through discord ℹ️');
  },
};
