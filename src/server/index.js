import * as web3 from '@solana/web3.js';
import TransactionUtil from './transaction';

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
  getBalance,
  transfer,
};
