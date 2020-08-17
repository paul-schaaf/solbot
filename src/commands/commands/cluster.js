import { CLUSTERS } from '../../config';
import WalletService from '../../services/WalletService';

export default {
  name: 'cluster',
  description: 'Command for managing clusters',
  async execute(message, args) {
    if (args.length === 1) {
      message.channel.send(`Currently selected cluster: ${await WalletService.getCluster(message.author.id)}`);
      return;
    }
    if (Object.values(CLUSTERS).includes(args[1].toLowerCase())) {
      try {
        await WalletService.setCluster(message.author.id, args[1].toLowerCase());
        message.channel.send(`Successfully switched to cluster: ${args[1].toLowerCase()}`);
      } catch (e) {
        message.channel.send(e.message);
      }
    } else {
      message.channel.send(`⚠️ Invalid Cluster: ${args[1]} ⚠️`);
    }
  },
};
