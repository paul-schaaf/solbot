import Server from '../../server';
import PriceService from '../../services/PriceService';
import WalletService from '../../services/WalletService';
import {COMMAND_PREFIX} from "../../config";

export default {
  name: 'me',
  description: 'Returns public key and its balance for the currently selected cluster. You must be logged in to use this command.',
  usage: [COMMAND_PREFIX + 'me'],
  async execute(message) {
    const { publicKey } = await WalletService.getKeyPair(message.author.id);
    const cluster = await WalletService.getCluster(message.author.id);
    const sol = PriceService.convertLamportsToSol(await Server.getBalance(publicKey, cluster));
    const dollarValue = await PriceService.getDollarValueForSol(sol);
    message.channel.send(`Your public key: ${publicKey}\nYour account balance: ${sol} Sol (~$${dollarValue}) on cluster: ${cluster}`);
  },
};
