import dotenv from 'dotenv';

export default {
  init() {
    if ((process.env.NODE_ENV || 'development') === 'development') {
      dotenv.config({ path: './src/secret/.env' });
    }
  },
};

export const CLUSTERS = {
  MAINNET: 'mainnet-beta',
  TESTNET: 'testnet',
  DEVNET: 'devnet',
};

export const commandPrefix = '!';
