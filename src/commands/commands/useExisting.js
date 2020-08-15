import KeyService from '../../services/KeyService';
import AccountUtil from '../../account';
import * as bip39 from 'bip39';
import PriceService from "../../services/PriceService";
import Server from "../../server";

export default {
    name: 'use-existing',
    description: 'Command that saves the private key for a given seed phrase for 12 hours',
    async execute(message, args) {
        const userId = message.author.id;
        const privateKey = await KeyService.getPrivateKey(userId);
        if (privateKey) {
            message.channel.send('There\'s already a private key associated with your user. If you want to create a new keypair, please delete the existing private key first. (command: !delete-private)');
            return;
        }
        const mnemonic = args.slice(1).join(' ');
        if(!bip39.validateMnemonic(mnemonic)){
            message.channel.send('⚠️ Invalid seed phrase ⚠️');
            return;
        }
        const account = await AccountUtil.createAccountFromMnemonic(mnemonic);
        await KeyService.setPrivateKey(userId, account.secretKey);

        const { publicKey } = AccountUtil.getAccount();
        const sol = PriceService.convertLamportsToSol(await Server.getBalance(publicKey));
        const dollarValue = await PriceService.getDollarValueForSol(sol);
        message.channel.send('Saving your private key for the next 12 hours...');
        message.channel.send(`Your public key: ${publicKey}\nYour account balance: ${sol} Sol (~$${dollarValue}) on cluster: ${Server.getCluster()}`);
        message.channel.send('🚧 Please consider deleting your previous message now to keep your seed phrase secret 🚧');
    }
};
