import Server from '../../server';
import AccountUtil from '../../account';
import PriceService from '../../services/PriceService';

export default {
  name: 'me',
  description: 'Command that returns public key and its balance',
  async execute(message) {
    const { publicKey } = AccountUtil.getAccount();
    const sol = PriceService.convertLamportsToSol(await Server.getBalance(publicKey));
    const dollarValue = await PriceService.getDollarValueForSol(sol);
    message.channel.send(`Your public key: ${publicKey}\nYour account balance: ${sol} Sol (~$${dollarValue}) on cluster: ${Server.getCluster()}`);
  },
};
