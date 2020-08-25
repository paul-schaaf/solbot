import PriceService from '../../../price/PriceService';
import Wallet from '../../../wallet';
import { COMMAND_PREFIX } from '../../../config';

const getDollarValue = async (sol) => {
  try {
    return await PriceService.getDollarValueForSol(sol);
  } catch {
    return false;
  }
};

export default {
  name: 'me',
  description: 'Returns public key and its balance for the currently selected cluster. You must be logged in to use this command.',
  usage: [`${COMMAND_PREFIX}me`],
  async execute(message) {
    const { id: userId } = message.author;
    const [{ publicKey }, cluster] = await Promise
      .all([Wallet.getKeyPair(userId), Wallet.getCluster(userId)]);
    let balanceInLamports;
    try {
      balanceInLamports = await Wallet.getBalance(publicKey, cluster);
    } catch (e) {
      message.channel.send('It seems there is a problem with the solana cluster. Please talk to the server admins.');
      return;
    }

    const sol = PriceService.convertLamportsToSol(balanceInLamports);
    const dollarValue = await getDollarValue(sol);

    message.channel.send(`Your public key: ${publicKey}\nYour account balance: ${sol} SOL ${dollarValue ? `(~$${dollarValue}) ` : ''}on cluster: ${cluster}`);
  },
};
