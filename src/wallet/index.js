import { CLUSTERS } from '../config';
import SessionStorageService from './SessionStorageService';
import Solana from '../solana';

const EXPIRY_TIME = 1000 * 60 * 30; // 30 minutes;

const setCluster = (id, clusterName) => {
  if (Object.values(CLUSTERS).includes(clusterName.toLowerCase())) {
    return SessionStorageService.setCluster(id, clusterName, EXPIRY_TIME);
  }
  throw new Error(`⚠️ Invalid cluster name ${clusterName} ⚠️`);
};

const login = async (id, privateKey, publicKey) => {
  await Promise.all([
    SessionStorageService.setKeyPair(id, privateKey, publicKey, EXPIRY_TIME),
    SessionStorageService.setCluster(id, CLUSTERS.MAINNET, EXPIRY_TIME),
  ]);
  return { keypair: { privateKey, publicKey }, cluster: CLUSTERS.MAINNET };
};

const isLoggedIn = async (id) => (!!(await SessionStorageService.getPrivateKey(id)));

export default {
  getKeyPair: SessionStorageService.getKeyPair,
  getCluster: SessionStorageService.getCluster,
  setCluster,
  login,
  logout: SessionStorageService.deleteAll,
  isLoggedIn,
  createAccount: Solana.createAccount,
  createAccountFromMnemonic: Solana.createAccountFromMnemonic,
  getBalance: Solana.getBalance,
  isValidPublicKey: Solana.isValidPublicKey,
  transfer: Solana.transfer,
};
