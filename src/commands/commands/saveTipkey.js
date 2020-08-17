import * as web3 from '@solana/web3.js';
import UserService from '../../services/UserService';

export default {
  name: 'save-tipkey',
  description: 'Command that saves tip public key',
  async execute(message, args) {
    if (args.length === 1) {
      message.channel.send('⚠️ Public key missing! ⚠️');
      return;
    }
    const publicKeyString = args[1];

    try {
      new web3.PublicKey(publicKeyString);
    } catch (e) {
      message.channel.send('⚠️ Invalid public key! ⚠️');
      return;
    }

    try {
      await UserService.saveUser({ discordId: message.author.id, publicKey: publicKeyString });
    } catch (e) {
      message.channel.send('⚠️ Failed to save public key ⚠️');
      return;
    }
    message.channel.send(`🥳 You can now receive tips through discord at this address: ${publicKeyString} 🥳`);
  },
};
