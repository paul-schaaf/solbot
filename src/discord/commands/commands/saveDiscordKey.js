import UserService from '../../../publicKeyStorage/UserService';
import { COMMAND_PREFIX } from '../../../config';
import Wallet from '../../../wallet';

export default {
  name: 'save-discordkey',
  description:
      'Use this command to connect your discordId to a public key.'
      + ' Whenever someone sends you money using: \'!send <amount> @<yourUsername>\', this is the public key their sol will be sent to.',
  usage: [`${COMMAND_PREFIX}save-discordkey <publicKeyString>`],
  async execute(message, args) {
    if (args.length === 1) {
      message.channel.send('⚠️ Public key missing! ⚠️');
      return;
    }
    const publicKeyString = args[1];

    if (!Wallet.isValidPublicKey(publicKeyString)) {
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
