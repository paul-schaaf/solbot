import Keyv from 'keyv';

const privateKeys = new Keyv();
const publicKeys = new Keyv();
const clusters = new Keyv();

const setKeyPair = async (id, privateKey, publicKey) => {
  await Promise
    .all([
      privateKeys.set(id, privateKey),
      publicKeys.set(id, publicKey),
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

const setCluster = (id, clusterName) => clusters.set(id, clusterName);

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
