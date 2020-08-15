import ClusterUtil from '../../server/cluster';
import { CLUSTERS } from '../../config';
import Server from '../../server';

export default {
  name: 'cluster',
  description: 'Command for managing clusters',
  execute(message, args) {
    if (args.length === 1) {
      message.channel.send(`Currently selected cluster: ${ClusterUtil.getCluster()}`);
      return;
    }
    if (Object.keys(CLUSTERS).includes(args[1].toUpperCase())) {
      try {
        Server.changeCluster(args[1]);
        message.channel.send(`Successfully switched to cluster: ${ClusterUtil.getCluster()}`);
      } catch (e) {
        message.channel.send(e.message);
      }
    } else {
      message.channel.send(`⚠️ Invalid Cluster: ${args[1]} ⚠️`);
    }
  },
};
