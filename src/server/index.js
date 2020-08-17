import * as web3 from '@solana/web3.js';
import { setConnection, getConnection } from './connection';
import ClusterUtil from './cluster';
import TransactionUtil from './transaction';
import AccountUtil from '../account';

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

const transfer = (publicKeyString, sol) => TransactionUtil
  .transfer(AccountUtil.getAccount(), publicKeyString, getConnection(), sol);

export default {
  init,
  getConnection,
  getCluster: ClusterUtil.getCluster,
  changeCluster,
  getBalance,
  transfer,
};
