import Keyv from 'keyv';

const privateKeys = new Keyv();

const setPrivateKey = (id, key) => privateKeys.set(id, key, 1000 * 60 * 60 * 12);

const getPrivateKey = (id) => privateKeys.get(id);

const deletePrivateKey = (id) => privateKeys.delete(id);

export default {
  setPrivateKey,
  getPrivateKey,
  deletePrivateKey,
};
