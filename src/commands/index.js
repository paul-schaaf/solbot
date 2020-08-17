import fs from 'fs';
import Discord from 'discord.js';

const COMMANDS = {
  CREATE_NEW: 'create-new',
  LOGIN: 'login',
  ME: 'me',
  CLUSTER: 'cluster',
  SEND: 'send',
  LOGOUT: 'logout',
  SAVE_TIPKEY: 'save-tipkey',
  DELETE_TIPKEY: 'delete-tipkey',
  GET_TIPKEY: 'get-tipkey',
};

const initCommands = async (client) => {
  // eslint-disable-next-line no-param-reassign
  client.commands = new Discord.Collection();

  const commandFiles = fs.readdirSync('./src/commands/commands').filter((file) => file.endsWith('.js'));

  const setCommand = async (file) => {
    const path = `./commands/${file}`;
    const command = (await import(path)).default;
    client.commands.set(command.name, command);
  };

  const promises = commandFiles.map(setCommand);

  await Promise.all(promises);
};

export default {
  initCommands,
  creationCommands: [COMMANDS.CREATE_NEW, COMMANDS.LOGIN],
  tipStorageCommands: [COMMANDS.SAVE_TIPKEY, COMMANDS.DELETE_TIPKEY, COMMANDS.GET_TIPKEY],
};
