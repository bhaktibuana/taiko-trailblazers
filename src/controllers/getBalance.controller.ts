import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

import { promptBalanceType } from "@/views";
import { getEthBalance, getWethBalance } from "@/services";
import { T_NetworkType } from "@/services/types/getBalance.service.type";

export const checkBalance = async (
  web3: Web3<RegisteredSubscription>,
  networkType: T_NetworkType,
  account: any
) => {
  const { balanceType } = await promptBalanceType();

  if (balanceType === "Exit") {
    return { exit: true };
  }

  if (balanceType === "Back") {
    return { back: true };
  }

  if (balanceType === "ETH") {
    const ethBalance = await getEthBalance(web3, account.address);
    console.log(`Address: ${ethBalance.public_key}`);
    console.log(`ETH Balance: ${ethBalance.eth}`);
  } else {
    const wethBalance = await getWethBalance(
      web3,
      networkType,
      account.address
    );
    console.log(`Address: ${wethBalance.public_key}`);
    console.log(`WETH Balance: ${wethBalance.weth}`);
  }

  return { exit: false };
};
