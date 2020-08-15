import Discord from 'discord.js';
import AccountUtil from './functions/account';
import TransactionUtil from './functions/transaction';
import CommandUtil from './commands';
import Server from './server';
import ConfigUtil, { commandPrefix } from './config';

ConfigUtil.init();

const solToSend = 1;

const main = async () => {
  const account = await AccountUtil.createAccountFromMnemonic('radar motor cement wave label train into tennis clerk step negative play');
  const client = new Discord.Client();
  await CommandUtil.initCommands(client);
  Server.init('testnet');

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('message', async (message) => {
    if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

    const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
    const command = args[0];

    if (message.channel.type === 'dm') {
      if (command === 'me') {
        const balance = await Server.getConnection().getBalance(account.publicKey);
        message.channel.send(`Your public key: ${account.publicKey}\nYour account balance: ${balance * 0.000000001} Sol`);
      } else if (command === 'cluster') {
        client.commands.get('cluster').execute(message, args);
      } else if (command === 'send') {
        const recipient = '7VKx6kzqpbdixUKt2QGk2MbUit23oeUxtJwQT3SYU3Ps';

        let signature = '';
        try {
          signature = await TransactionUtil.transfer(account, recipient, Server.getConnection(), 1);
        } catch (e) {
          message.channel.send(e.message);
          return;
        }

        const balance = await Server.getConnection().getBalance(account.publicKey);
        message.channel.send(`Successfully sent ${solToSend} Sol to ${recipient} on cluster: ${Server.getCluster()} 💸💸\nSignature: ${signature}\nYour new account balance: ${balance * 0.000000001} Sol`);
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
