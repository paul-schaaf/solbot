import Wallet from '../../../wallet';
import { COMMAND_PREFIX } from '../../../config';

export default {
  name: 'create-new',
  description: 'Creates a new wallet and gives you seed phrase to write down. Logs you in.',
  usage: [`${COMMAND_PREFIX}create-new`],
  async execute(message) {
    const userId = message.author.id;
    const account = await Wallet.createAccount();
    const { publicKey, privateKey, mnemonic } = account;
    await Wallet.login(userId, privateKey, publicKey);
    message.channel.send('🎁 Here\'s your new account! 🎁');
    message.channel.send(`Public key: ${account.publicKey}`);
    const seedPhraseMessage = await message.channel.send(`Seed phrase: ${mnemonic}`);
    message.channel.send('☢️ The previous message will self-destruct in 5 minutes ☢️');
    seedPhraseMessage.delete({ timeout: 1000 * 60 * 5 });
    message.channel.send('🥳 You\'re logged in, use \'!logout\' to logout! 🥳');
  },
};
