import Keyv from 'keyv';
import * as web3 from '@solana/web3.js';
import { CLUSTERS } from '../config';

const privateKeys = new Keyv();
const publicKeys = new Keyv();
const clusters = new Keyv();

const EXPIRING_TIME = 1000 * 60 * 30; // 30 minutes;

const setKeyPair = async (id, privateKey, publicKey) => {
  await Promise
    .all([
      privateKeys.set(id, privateKey, EXPIRING_TIME),
      publicKeys.set(id, publicKey.toString(), EXPIRING_TIME),
    ]);
  return { privateKey, publicKey };
};

const getKeyPair = async (id) => ({
  privateKey: await privateKeys.get(id),
  publicKey: new web3.PublicKey(await publicKeys.get(id)),
});

const setCluster = (id, clusterName) => {
  if (Object.values(CLUSTERS).includes(clusterName.toLowerCase())) {
    return clusters.set(id, clusterName, EXPIRING_TIME);
  }
  throw new Error(`⚠️ Invalid cluster name ${clusterName} ⚠️`);
};

const getCluster = (id) => clusters.get(id);

const deleteAll = (id) => Promise
  .all([privateKeys.delete(id), publicKeys.delete(id), clusters.delete(id)]);

const setPrivateKey = (id, key) => privateKeys.set(id, key, EXPIRING_TIME);

const getPrivateKey = (id) => privateKeys.get(id);

const deletePrivateKey = (id) => privateKeys.delete(id);

const login = async (id, privateKey, publicKey) => {
  await Promise.all([
    setKeyPair(id, privateKey, publicKey),
    setCluster(id, CLUSTERS.MAINNET),
  ]);
  return { keypair: { privateKey, publicKey }, cluster: CLUSTERS.MAINNET };
};

export default {
  setPrivateKey,
  getPrivateKey,
  deletePrivateKey,
  setKeyPair,
  getKeyPair,
  getCluster,
  setCluster,
  deleteAll,
  login,
};
