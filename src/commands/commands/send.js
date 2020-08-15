import * as web3 from '@solana/web3.js';
import Server from '../../server';
import AccountUtil from '../../account';

export default {
  name: 'send',
  description: 'Command to send sol to someone',
  async execute(message, args) {
    if (args.length !== 3) {
      message.channel.send('⚠️ Wrong amount of arguments ⚠️');
      return;
    }

    const solToSend = parseInt(args[1], 10);
    const publicKeyString = args[2];

    let publicKey = '';
    try {
      publicKey = new web3.PublicKey(publicKeyString);
    } catch (err) {
        message.channel.send('⚠️ Invalid recipient key ⚠️');
        return;
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(solToSend) || solToSend <= 0) {
        message.channel.send('⚠️ Invalid sol amount ⚠️');
        return;
    }

    message.channel.send('Sending...');
    let signature = '';
    try {
      signature = await Server.transfer(publicKey, solToSend);
    } catch (e) {
      message.channel.send(e.message);
      return;
    }

    message.channel.send(`Successfully sent ${solToSend} Sol to ${publicKeyString} on cluster: ${Server.getCluster()} 💸💸\nSignature: ${signature}`);

    try {
      const balance = await Server.getBalance(AccountUtil.getAccount().publicKey);
      message.channel.send(`Your new account balance: ${balance * 0.000000001} Sol`);
    } catch (e) {
      message.channel.send(e.message);
    }
  },
};
