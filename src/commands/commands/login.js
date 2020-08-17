import * as bip39 from 'bip39';
import WalletService from '../../services/WalletService';
import AccountUtil from '../../account';
import PriceService from '../../services/PriceService';
import Server from '../../server';
import { CLUSTERS } from '../../config';

export default {
  name: 'login',
  description: 'Command that logs in user for 30 minutes',
  async execute(message, args) {
    const userId = message.author.id;
    const mnemonic = args.slice(1).join(' ');
    if (!bip39.validateMnemonic(mnemonic)) {
      message.channel.send('⚠️ Invalid seed phrase ⚠️');
      return;
    }
    const account = await AccountUtil.createAccountFromMnemonic(mnemonic);
    const { publicKey, secretKey: privateKey } = account;
    await WalletService.login(userId, privateKey.toString(), publicKey.toString());
    const sol = PriceService
      .convertLamportsToSol(
        await Server.getBalance(publicKey, await WalletService.getCluster(userId)),
      );
    const dollarValue = await PriceService.getDollarValueForSol(sol);
    message.channel.send('🥳 You\'re logged in for 30 minutes, use \'!logout\' to logout earlier! 🥳');
    message.channel.send(`ℹ️ You're currently on cluster: ${CLUSTERS.MAINNET}. Use '!cluster' to switch between clusters! ℹ️`);
    message.channel.send(`Your public key: ${publicKey}\nYour account balance: ${sol} Sol (~$${dollarValue})`);
    message.channel.send('🚧 Please consider deleting your previous message now to keep your seed phrase secret 🚧');
  },
};
