import Keyv from 'keyv';
import { CLUSTERS } from '../config';

const privateKeys = new Keyv();
const publicKeys = new Keyv();
const clusters = new Keyv();

const EXPIRING_TIME = 1000 * 60 * 30; // 30 minutes;

const setKeyPair = async (id, privateKey, publicKey) => {
  await Promise
    .all([
      privateKeys.set(id, privateKey, EXPIRING_TIME),
      publicKeys.set(id, publicKey, EXPIRING_TIME),
    ]);
  return { privateKey, publicKey };
};

const getKeyPair = async (id) => {
  const [privateKey, publicKey] = await Promise
    .all([await privateKeys.get(id), await publicKeys.get(id)]);

  return {
    privateKey,
    publicKey,
  };
};

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

const isLoggedIn = async (id) => (!!(await getPrivateKey(id)));

export default {
  setPrivateKey,
  getPrivateKey,
  deletePrivateKey,
  getKeyPair,
  getCluster,
  setCluster,
  deleteAll,
  login,
  isLoggedIn,
};
