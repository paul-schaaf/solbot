import { CLUSTERS, COMMAND_PREFIX } from '../../../config';
import WalletService from '../../../wallet/WalletService';

export default {
  name: 'cluster',
  description: `Lets you switch between clusters. Valid clusters are: ${Object.values(CLUSTERS).join(', ')
  }. You must be logged in to use this command.`,
  usage: [`${COMMAND_PREFIX}cluster to get the current cluster`, `${COMMAND_PREFIX}cluster <clusterName> to switch cluster`],
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
