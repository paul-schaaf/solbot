import Wallet from '../../../wallet';
import PriceService from '../../../price/PriceService';
import { COMMAND_PREFIX } from '../../../config';

const getDollarValue = async (sol) => {
  try {
    return await PriceService.getDollarValueForSol(sol);
  } catch {
    return false;
  }
};

export default {
  name: 'login',
  description: 'Logs you in. Use "!logout" to logout.',
  usage: [`${COMMAND_PREFIX}login <seed phrase>`],
  async execute(message, args) {
    const userId = message.author.id;
    let account;
    try {
      account = await Wallet.createAccountFromMnemonic(args.slice(1).join(' '));
    } catch (e) {
      message.channel.send(e.message);
      return;
    }
    const { publicKey, privateKey } = account;
    const { cluster } = await Wallet.login(userId, privateKey, publicKey);

    const sol = PriceService
      .convertLamportsToSol(
        await Wallet.getBalance(publicKey, cluster),
      );

    const dollarValue = await getDollarValue(sol);

    message.channel.send('🥳 You\'re logged in, use \'!logout\' to logout! 🥳');
    message.channel.send(`ℹ️ You're currently on cluster: ${cluster}. Use '!cluster' to switch between clusters! ℹ️`);
    message.channel.send(`Your public key: ${publicKey}\nYour account balance: ${sol} SOL ${dollarValue ? `(~$${dollarValue})` : ''}`);
    message.channel.send('🚨 Please consider deleting your previous message now to keep your seed phrase secret 🚨');
  },
};
