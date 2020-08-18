import PriceAPI from './priceAPI';

const convertLamportsToSol = (lamports) => (lamports * 0.000000001).toFixed(4);

const getDollarValueForSol = async (sol, price) => {
  const currentPrice = price || await PriceAPI.getSolPriceInUSD();
  return (sol * currentPrice).toFixed(2);
};

export default {
  convertLamportsToSol,
  getSolPriceInUSD: PriceAPI.getSolPriceInUSD,
  getDollarValueForSol,
};
