import WalletService from '../../services/WalletService';

export default {
  name: 'logout',
  description: 'logs out user from wallet',
  async execute(message) {
    const userId = message.author.id;
    await WalletService.deleteAll(userId);
    message.channel.send('🥳 Successfully logged out 🥳');
  },
};
