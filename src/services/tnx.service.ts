import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

import { T_NetworkType } from "@/services/types/getBalance.service.type";
import { config } from "@/configs";
import { abi } from "@/abi";
import { getGasPrice } from "@/utils";

export const wrap = async (
  web3: Web3<RegisteredSubscription>,
  networkType: T_NetworkType,
  amount: string,
  address: string
) => {
  const wethContractAddress =
    networkType === "mainnet" ? config.MAINNET_WETH_CA : config.TESTNET_WETH_CA;
  const wethAbi =
    networkType === "mainnet" ? abi.mainnet_weth_abi : abi.testnet_weth_abi;

  const wethContract = new web3.eth.Contract(wethAbi, wethContractAddress);

  const amountInWei = web3.utils.toWei(amount, "ether");
  const tx = wethContract.methods.deposit();

  const data = tx.encodeABI();
  const gas = await tx.estimateGas({
    from: address,
    value: amountInWei,
    data,
  });

  const gasPrice = await getGasPrice(web3, gas, "0.0000046");
  const gasPriceHex = web3.utils.toHex(gasPrice);

  const txData = {
    from: address,
    to: wethContractAddress,
    data,
    value: amountInWei,
    gas,
    gasPrice: gasPriceHex,
  };

  const startTime = Date.now();

  try {
    const receipt = await web3.eth.sendTransaction(txData);
    const endTime = Date.now();
    const confirmationTime = (endTime - startTime) / 1000;

    return {
      success: true,
      confirmed_in: confirmationTime,
      receipt: receipt,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message,
    };
  }
};

export const unwrap = async (
  web3: Web3<RegisteredSubscription>,
  networkType: T_NetworkType,
  amount: string,
  address: string
) => {
  const wethContractAddress =
    networkType === "mainnet" ? config.MAINNET_WETH_CA : config.TESTNET_WETH_CA;
  const wethAbi =
    networkType === "mainnet" ? abi.mainnet_weth_abi : abi.testnet_weth_abi;

  const wethContract = new web3.eth.Contract(wethAbi, wethContractAddress);

  const amountInWei = web3.utils.toWei(amount, "ether");
  const tx = wethContract.methods.withdraw(amountInWei);

  const data = tx.encodeABI();
  const gas = await tx.estimateGas({
    from: address,
    data,
  });

  const gasPrice = await getGasPrice(web3, gas, "0.0000031");
  const gasPriceHex = web3.utils.toHex(gasPrice);

  const txData = {
    from: address,
    to: wethContractAddress,
    data,
    gas,
    gasPrice: gasPriceHex,
  };

  const startTime = Date.now();

  try {
    const receipt = await web3.eth.sendTransaction(txData);
    const endTime = Date.now();
    const confirmationTime = (endTime - startTime) / 1000;

    return {
      success: true,
      confirmed_in: confirmationTime,
      receipt: receipt,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message,
    };
  }
};
