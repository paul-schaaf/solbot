import * as web3 from '@solana/web3.js';

let connection = null;

export const setConnection = (cluster) => {
  connection = new web3.Connection(cluster, 'recent');
};

export const getConnection = () => connection;
