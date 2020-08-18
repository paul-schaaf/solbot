import * as web3 from '@solana/web3.js';

const isValidPublicKey = (publicKeyString) => {
  try {
    new web3.PublicKey(publicKeyString);
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  isValidPublicKey,
};
