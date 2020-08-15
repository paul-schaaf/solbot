import Server from '../../server';
import AccountUtil from '../../account';

export default {
  name: 'me',
  description: 'Command that returns public key and its balance',
  async execute(message) {
    const { publicKey } = AccountUtil.getAccount();
    const balance = await Server.getBalance(publicKey);
    message.channel.send(`Your public key: ${publicKey}\nYour account balance: ${balance * 0.000000001} Sol on cluster: ${Server.getCluster()}`);
  },
};
