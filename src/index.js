import DiscordHandler from './discord';
import ConfigUtil from './config';

ConfigUtil.init();

const main = async () => {
  await DiscordHandler.initHandler();
};

main();
