import dotenv from 'dotenv';
import Discord from 'discord.js';
import * as web3 from '@solana/web3.js';
import AccountUtil from './functions/account';
import TransactionUtil from './functions/transaction';

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  dotenv.config({ path: './src/secret/.env' });
}

const cluster = web3.clusterApiUrl('testnet');
const pre = '!';
const solToSend = 1;

const main = async () => {
  const account = await AccountUtil.createAccountFromMnemonic('radar motor cement wave label train into tennis clerk step negative play');
  const connection = new web3.Connection(cluster, 'recent');
  const client = new Discord.Client();

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('message', async (message) => {
    if (!message.content.startsWith(pre) || message.author.bot) return;

    const args = message.content.slice(pre.length).trim().split(/ +/);
    const command = args[0];

    if (message.channel.type === 'dm') {
      if (command === 'me') {
        const balance = await connection.getBalance(account.publicKey);
        message.channel.send(`Your public key: ${account.publicKey}\nYour account balance: ${balance * 0.000000001} Sol`);
      } else if (command === 'cluster') {
        message.channel.send(`Currently selected cluster: ${cluster}`);
      } else if (command === 'send') {
        const recipient = '7VKx6kzqpbdixUKt2QGk2MbUit23oeUxtJwQT3SYU3Ps';

        let signature = '';
        try {
          signature = await TransactionUtil.transfer(account, recipient, connection, 1);
        } catch (e) {
          message.channel.send(e.message);
          return;
        }

        const balance = await connection.getBalance(account.publicKey);
        message.channel.send(`Successfully sent ${solToSend} Sol to ${recipient} 💸💸\nSignature: ${signature}\nYour new account balance: ${balance * 0.000000001} Sol`);
      }
    }
  });

  try {
    await client.login(process.env.DISCORD_TOKEN);
  } catch (e) {
    console.error('Bot has failed to connect to discord.');
    process.exit(1);
  }
};

main();
