import * as bip39 from 'bip39';
import KeyService from '../../services/KeyService';
import AccountUtil from '../../account';

export default {
  name: 'create-new',
  description: 'Command that creates a new keypair',
  async execute(message) {
    const userId = message.author.id;
    const privateKey = await KeyService.getPrivateKey(userId);
    if (privateKey) {
      message.channel.send('There\'s already a private key associated with your user. If you want to create a new keypair, please delete the existing private key first. (command: !delete-private)');
      return;
    }
    const mnemonic = bip39.generateMnemonic();
    const account = await AccountUtil.createAccountFromMnemonic(mnemonic);
    await KeyService.setPrivateKey(userId, account.secretKey);
    message.channel.send(`Public key: ${account.publicKey}`);
    const seedPhraseMessage = await message.channel.send(`Seed phrase: ${mnemonic}`);
    message.channel.send('🚧 The previous message will self-destruct in 5 minutes 🚧');
    seedPhraseMessage.delete({ timeout: 1000 * 60 * 5});
  },
};
