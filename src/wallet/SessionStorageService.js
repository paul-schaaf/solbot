import Keyv from 'keyv';

const privateKeys = new Keyv();
const publicKeys = new Keyv();
const clusters = new Keyv();

const setKeyPair = async (id, privateKey, publicKey, expiryTime) => {
  await Promise
    .all([
      privateKeys.set(id, privateKey, expiryTime),
      publicKeys.set(id, publicKey, expiryTime),
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

const setCluster = (id, clusterName, expiryTime) => clusters.set(id, clusterName, expiryTime);

const getCluster = (id) => clusters.get(id);

const deleteAll = (id) => Promise
  .all([privateKeys.delete(id), publicKeys.delete(id), clusters.delete(id)]);

const getPrivateKey = (id) => privateKeys.get(id);

export default {
  getPrivateKey,
  setKeyPair,
  getKeyPair,
  getCluster,
  setCluster,
  deleteAll,
};
