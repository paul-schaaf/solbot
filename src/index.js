import dotenv from 'dotenv';
import Discord from 'discord.js';
import * as web3 from '@solana/web3.js';
import nacl from 'tweetnacl';
import * as bip39 from 'bip39';

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  dotenv.config({ path: './src/secret/.env' });
}

const cluster = web3.clusterApiUrl('testnet');
const pre = '!';
const solToSend = 1;

async function createAccountFromMnemonic(mnemonic) {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
  return new web3.Account(keyPair.secretKey);
}

const main = async () => {
  const account = await createAccountFromMnemonic('radar motor cement wave label train into tennis clerk step negative play');
  const client = new Discord.Client();

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('message', async (message) => {
    if (!message.content.startsWith(pre) || message.author.bot) return;

    const args = message.content.slice(pre.length).trim().split(/ +/);
    const command = args[0];
    const connection = new web3.Connection(cluster, 'recent');

    if (message.channel.type === 'dm') {
      if (command === 'me') {
        const balance = await connection.getBalance(account.publicKey);
        message.channel.send(`Your public key: ${account.publicKey}\nYour account balance: ${balance * 0.000000001} Sol`);
      } else if (command === 'cluster') {
        message.channel.send(`Currently selected cluster: ${cluster}`);
      } else if (command === 'send') {
        let recipient = '';
        try {
          recipient = new web3.PublicKey('7VKx6kzqpbdixUKt2QGk2MbUit23oeUxtJwQT3SYU3Ps');
        } catch (err) {
          console.error('Invalid recipient key');
          return;
        }

        const transaction = web3.SystemProgram.transfer({
          fromPubkey: account.publicKey,
          toPubkey: recipient,
          lamports: solToSend * 1000000000,
        });

        let signature = '';
        try {
          signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [account],
            { confirmations: 1 },
          );
        } catch (err) {
          message.channel.send('Fees were paid, but the transaction failed 😔');
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
