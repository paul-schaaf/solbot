import KeyService from '../../services/KeyService';
import AccountUtil from '../../account';

export default {
  name: 'delete-private',
  description: 'Command that deletes the user\'s private key',
  async execute(message) {
    const userId = message.author.id;
    AccountUtil.deleteAccount();
    await KeyService.deletePrivateKey(userId);
    message.channel.send('Successfully deleted private key');
  },
};
