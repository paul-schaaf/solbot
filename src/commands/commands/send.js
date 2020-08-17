import Server from '../../server';
import PriceService from '../../services/PriceService';
import WalletService from '../../services/WalletService';

export default {
  name: 'send',
  description: 'Command to send sol to someone',
  async execute(message, args) {
    if (args.length !== 3) {
      message.channel.send('⚠️ Wrong amount of arguments ⚠️');
      return;
    }

    const solToSend = parseInt(args[1], 10);
    const toPublicKeyString = args[2];

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(solToSend) || solToSend <= 0) {
      message.channel.send('⚠️ Invalid sol amount ⚠️');
      return;
    }

    message.channel.send('Sending...');

    const userId = message.author.id;
    const cluster = await WalletService.getCluster(userId);
    const keypair = await WalletService.getKeyPair(userId);
    const { privateKey } = keypair;

    let signature = '';
    try {
      signature = await Server
        .transfer(cluster, Object.values(privateKey), toPublicKeyString, solToSend);
    } catch (e) {
      message.channel.send(e.message);
      return;
    }

    const currentPrice = await PriceService.getSolPriceInUSD();
    message.channel.send(`Successfully sent ${solToSend} Sol (~$${await PriceService.getDollarValueForSol(solToSend, currentPrice)}) to ${toPublicKeyString} on cluster: ${cluster} 💸💸\nSignature: ${signature}`);

    try {
      const balance = await Server.getBalance(keypair.publicKey, cluster);
      const sol = PriceService.convertLamportsToSol(balance);
      message.channel.send(`Your new account balance: ${sol} Sol (~$${await PriceService.getDollarValueForSol(sol, currentPrice)})`);
    } catch (e) {
      message.channel.send(e.message);
    }
  },
};
