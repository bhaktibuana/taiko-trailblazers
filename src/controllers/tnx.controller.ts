import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

import { T_NetworkType } from "@/utils/types/connection.util.type";
import { promptWrapUnwrapCount } from "@/views";
import { getEthBalance, getWethBalance, unwrap, wrap } from "@/services";
import { secondsToHms } from "@/utils";

export const wrapUnwrap = async (
  web3: Web3<RegisteredSubscription>,
  networkType: T_NetworkType,
  account: any
) => {
  const { wrapUnwrapCount } = await promptWrapUnwrapCount();

  let step = 0;
  let totalTimeInSecond = 0;

  while (step < parseInt(wrapUnwrapCount)) {
    step += 1;

    const ethBalance = await getEthBalance(web3, account.address);
    const wethBalance = await getWethBalance(
      web3,
      networkType,
      account.address
    );

    const ethMinBalance = {
      ether: "0.0001",
      wei: BigInt(web3.utils.toWei("0.0001", "ether")),
    };

    if (ethBalance.eth_wei > wethBalance.weth_wei) {
      if (
        (ethMinBalance.wei * BigInt(80)) / BigInt(100) >=
        ethBalance.eth_wei
      ) {
        console.log("Balance of ETH must be at least 0.00008 ETH");
        break;
      }

      const ethVal = web3.utils.fromWei(
        ethBalance.eth_wei - BigInt(web3.utils.toWei("0.0001", "ether")),
        "ether"
      );

      const res = await wrap(web3, networkType, ethVal, account.address);
      if (res.success) {
        totalTimeInSecond += res.confirmed_in as number;
        console.log(
          `[WRAP SUCCESS] Wrapped ${ethVal} ETH. Confirmed in ${res.confirmed_in}s`
        );
      } else {
        console.log(`[WRAP FAILED] ${res.error}`);
      }
    } else {
      const wethVal = wethBalance.weth;

      const res = await unwrap(web3, networkType, wethVal, account.address);
      if (res.success) {
        totalTimeInSecond += res.confirmed_in as number;
        console.log(
          `[UNWRAP SUCCESS] Unwrapped ${wethVal} WETH. Confirmed in ${res.confirmed_in}s`
        );
      } else {
        console.log(`[UNWRAP FAILED] ${res.error}`);
      }
    }
  }

  console.log("[PROCESS FINISHED]");
  console.log(`Tnx count: ${step}`);
  console.log(`Tnx total time: ${secondsToHms(totalTimeInSecond)}`);
};
