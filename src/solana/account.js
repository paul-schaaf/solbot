import * as bip39 from 'bip39';
import nacl from 'tweetnacl';
import * as web3 from '@solana/web3.js';

const createAccountFromMnemonic = async (mnemonic) => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('⚠️ Invalid seed phrase ⚠️');
  }
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
  const acc = new web3.Account(keyPair.secretKey);
  return {
    privateKey: acc.secretKey,
    publicKey: acc.publicKey.toString(),
  };
};

const createAccount = async () => {
  const mnemonic = bip39.generateMnemonic();
  const { publicKey, privateKey } = await createAccountFromMnemonic(mnemonic);

  return {
    privateKey,
    publicKey,
    mnemonic,
  };
};

export default {
  createAccountFromMnemonic,
  createAccount,
};
