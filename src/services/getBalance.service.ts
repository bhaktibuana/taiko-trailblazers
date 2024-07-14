import Web3, { Numbers } from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

import { abi } from "@/abi";
import { T_NetworkType } from "@/services/types/getBalance.service.type";
import { config } from "@/configs";

export const getEthBalance = async (
  web3: Web3<RegisteredSubscription>,
  address: string
) => {
  try {
    const balanceWei = await web3.eth.getBalance(address);
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");

    return {
      public_key: address,
      eth: balanceEther,
      eth_wei: BigInt(balanceWei),
    };
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

export const getWethBalance = async (
  web3: Web3<RegisteredSubscription>,
  networkType: T_NetworkType,
  address: string
) => {
  const wethContractAddress =
    networkType === "mainnet" ? config.MAINNET_WETH_CA : config.TESTNET_WETH_CA;
  const wethAbi =
    networkType === "mainnet" ? abi.mainnet_weth_abi : abi.testnet_weth_abi;

  const contract = new web3.eth.Contract(wethAbi, wethContractAddress);

  try {
    const balanceWei = (await contract.methods
      .balanceOf(address)
      .call()) as Numbers;
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");

    return {
      public_key: address,
      weth: balanceEther,
      weth_wei: BigInt(balanceWei),
    };
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};
