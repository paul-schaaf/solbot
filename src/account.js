import * as bip39 from 'bip39';
import nacl from 'tweetnacl';
import * as web3 from '@solana/web3.js';

let account = null;

export default {
  async createAccountFromMnemonic(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
    account = new web3.Account(keyPair.secretKey);
    return account;
  },
  getAccount: () => account,
};
