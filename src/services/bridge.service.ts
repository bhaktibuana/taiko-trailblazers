import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

export const bridgeEther = async (
  fromWeb3: Web3<RegisteredSubscription>,
  amount: string,
  fromAddress: string,
  toAddress: string
) => {
  const amountInWei = fromWeb3.utils.toWei(amount, "ether");

  const tx = {
    from: fromAddress,
    to: toAddress,
    value: amountInWei,
  };

  const gas = await fromWeb3.eth.estimateGas(tx);
  const maxGasPrice = fromWeb3.utils.toWei("0.0000046", "ether");

  const currentGasPrice = await fromWeb3.eth.getGasPrice();
  const calculatedGasPrice = BigInt(currentGasPrice) < BigInt(maxGasPrice) ? currentGasPrice : maxGasPrice;

  const gasPrice = calculatedGasPrice;
  const gasPriceHex = fromWeb3.utils.toHex(gasPrice);

  const txData = {
    ...tx,
    gas,
    gasPrice: gasPriceHex,
  };

  const startTime = Date.now();

  try {
    const transaction = await fromWeb3.eth.sendTransaction(txData);
    const endTime = Date.now();
    const confirmationTime = (endTime - startTime) / 1000;

    return {
      success: true,
      confirmed_in: confirmationTime,
      transaction,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message,
    };
  }
};
