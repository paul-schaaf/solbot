import * as web3 from '@solana/web3.js';
import { CLUSTERS } from '../config';

let cluster = web3.clusterApiUrl('testnet');

export default {
  getCluster() {
    return cluster;
  },
  setCluster(newClusterName) {
    if (Object.keys(CLUSTERS).includes(newClusterName.toUpperCase())) {
      cluster = web3.clusterApiUrl(CLUSTERS[newClusterName.toUpperCase()]);
    } else {
      throw new Error(`⚠️ Invalid cluster name ${newClusterName} ⚠️`);
    }
  },
};
