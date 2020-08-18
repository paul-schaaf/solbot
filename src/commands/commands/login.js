import WalletService from '../../services/WalletService';
import PriceService from '../../services/PriceService';
import Solana from '../../solana';
import { COMMAND_PREFIX } from '../../config';

export default {
  name: 'login',
  description: 'Logs you in for 30 minutes. Use "!logout" to logout earlier.',
  usage: [`${COMMAND_PREFIX}login <seed phrase>`],
  async execute(message, args) {
    const userId = message.author.id;
    let account;
    try {
      account = await Solana.createAccountFromMnemonic(args.slice(1).join(' '));
    } catch (e) {
      message.channel.send(e.message);
    }
    const { publicKey, secretKey: privateKey } = account;
    const publicKeyString = publicKey.toString();
    const { cluster } = await WalletService.login(userId, privateKey, publicKeyString);

    const sol = PriceService
      .convertLamportsToSol(
        await Solana.getBalance(publicKeyString, cluster),
      );

    let dollarValue;
    try {
      dollarValue = await PriceService.getDollarValueForSol(sol);
    } catch (e) {}

    message.channel.send('🥳 You\'re logged in for 30 minutes, use \'!logout\' to logout earlier! 🥳');
    message.channel.send(`ℹ️ You're currently on cluster: ${cluster}. Use '!cluster' to switch between clusters! ℹ️`);
    message.channel.send(`Your public key: ${publicKey}\nYour account balance: ${sol} Sol ${dollarValue ? `(~${dollarValue})` : ''}`);
    message.channel.send('🚧 Please consider deleting your previous message now to keep your seed phrase secret 🚧');
  },
};
