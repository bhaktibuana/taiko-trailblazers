import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

export const getGasPrice = async (
  web3: Web3<RegisteredSubscription>,
  gas: bigint,
  maxGasPrice: string
) => {
  const gasPrice = await web3.eth.getGasPrice();

  const maxGasPriceInWei = web3.utils.toWei(maxGasPrice, "ether");
  const maxGasPriceInBN = BigInt(maxGasPriceInWei);

  let divider = 1;
  let currentGasPrice = gasPrice / BigInt(divider);

  let tnxFee = currentGasPrice * gas;

  while (tnxFee > maxGasPriceInBN) {
    divider += 1;
    currentGasPrice = gasPrice / BigInt(divider);
    tnxFee = currentGasPrice * gas;
  }

  return currentGasPrice;
};
