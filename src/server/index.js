import * as web3 from '@solana/web3.js';
import { setConnection, getConnection } from './connection';
import ClusterUtil from './cluster';
import TransactionUtil from './transaction';

const changeCluster = (clusterName) => {
  ClusterUtil.setCluster(clusterName);
  setConnection(ClusterUtil.getCluster());
};

const init = (clusterName) => {
  ClusterUtil.setCluster(clusterName);
  setConnection(ClusterUtil.getCluster());
};

const getBalance = (publicKey, cluster) => {
  const connection = new web3.Connection(web3.clusterApiUrl(cluster), 'recent');
  return connection.getBalance(publicKey);
};

const transfer = (cluster, fromPrivateKey, toPublicKeyString, sol) => {
  let publicKey = '';
  try {
    publicKey = new web3.PublicKey(toPublicKeyString);
  } catch (err) {
    throw new Error('⚠️ Invalid recipient key ⚠️');
  }

  const connection = new web3.Connection(web3.clusterApiUrl(cluster), 'recent');
  return TransactionUtil.transfer(new web3.Account(fromPrivateKey), publicKey, connection, sol);
};

export default {
  init,
  getConnection,
  getCluster: ClusterUtil.getCluster,
  changeCluster,
  getBalance,
  transfer,
};
