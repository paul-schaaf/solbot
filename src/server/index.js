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

const getBalance = (publicKey) => getConnection().getBalance(publicKey);

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
