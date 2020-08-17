import * as bip39 from 'bip39';
import WalletService from '../../services/WalletService';
import AccountUtil from '../../account';

export default {
  name: 'create-new',
  description: 'Command that creates a new keypair and logs in user',
  async execute(message) {
    const userId = message.author.id;
    const mnemonic = bip39.generateMnemonic();
    const account = await AccountUtil.createAccountFromMnemonic(mnemonic);
    const { publicKey, secretKey: privateKey } = account;
    await WalletService.login(userId, privateKey, publicKey);
    message.channel.send('Here\'s your new account!');
    message.channel.send(`Public key: ${account.publicKey}`);
    const seedPhraseMessage = await message.channel.send(`Seed phrase: ${mnemonic}`);
    message.channel.send('🚧 The previous message will self-destruct in 5 minutes 🚧');
    seedPhraseMessage.delete({ timeout: 1000 * 60 * 5 });
    message.channel.send('🥳 You\'re logged in for 30 minutes, use \'!logout\' to logout earlier! 🥳');
  },
};
