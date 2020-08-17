import Server from '../../server';
import PriceService from '../../services/PriceService';
import WalletService from '../../services/WalletService';
import UserService from '../../services/UserService';
import { COMMAND_PREFIX } from '../../config';

function getUserFromMention(mention) {
  const matches = mention.match(/^<@!?(\d+)>$/);
  if (!matches) {
    return null;
  }
  return matches[1];
}

export default {
  name: 'send',
  description: 'Lets you send sol to someone on the currently selected cluster. To specify the recipient,'
      + 'you can use a public key or tag someone with @<username> someone. You must be logged in to use this command.',
  usage: [`${COMMAND_PREFIX}send 5 GsbwXfJraMomNxBcjYLcG3mxkBUiyWXAB32fGbSMQRdW`, `${COMMAND_PREFIX}send 5 @<username>`],
  async execute(message, args) {
    if (args.length !== 3) {
      message.channel.send('⚠️ Wrong number of arguments ⚠️');
      return;
    }

    const solToSend = parseFloat(args[1]);
    let toPublicKeyString = args[2];

    if (!Server.isValidPublicKey(args[2])) {
      const recipientId = getUserFromMention(args[2]);
      if (!recipientId) {
        message.channel.send('⚠️ Given recipient is neither a public key nor a user ⚠️');
        return;
      }
      const recipient = await UserService.getUser(recipientId);
      if (!recipient) {
        message.channel.send('⚠️ Given recipient has not registered a discord public key ⚠️');
        return;
      }

      toPublicKeyString = recipient.publicKey;
    }

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

    let currentPrice;
    try {
      currentPrice = await PriceService.getSolPriceInUSD();
    } catch {}

    const dollarValue = currentPrice
      ? await PriceService.getDollarValueForSol(solToSend, currentPrice)
      : null;

    message.channel.send(`💸 Successfully sent ${solToSend} Sol ${dollarValue ? `(~${dollarValue}) ` : ''}to ${toPublicKeyString} on cluster: ${cluster} 💸\nSignature: ${signature}`);

    try {
      const balance = await Server.getBalance(keypair.publicKey, cluster);
      const sol = PriceService.convertLamportsToSol(balance);
      message.channel.send(`Your new account balance: ${sol} Sol ${currentPrice ? `(~${await PriceService.getDollarValueForSol(sol, currentPrice)})` : ''}`);
    } catch (e) {
      message.channel.send(e.message);
    }
  },
};
