import axios from "axios";

export const getSOLPriceUSD = async () => {
  try {
    const solPrice = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );

    return Number(solPrice.data.solana.usd);
  } catch (error) {
    return 0;
  }
};