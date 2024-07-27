import { bridgePairs } from "@/constants";
import { connectAccount, customConenction } from "@/utils";
import { bridgeEther, getEthBalance } from "@/services";
import { promptBridgeAmountInput, promptInsertBridgeAmount } from "@/views";

import { T_BridgePairLabel } from "@/constants/types/bridge.constant.type";

export const bridge = async (
  privateKey: string,
  bridgePairLabel: T_BridgePairLabel
) => {
  const brdigePair = bridgePairs.filter(
    (bridgePair) => bridgePair.label === bridgePairLabel
  )[0];

  const fromWeb3 = customConenction(brdigePair.fromRPC);
  const toWeb3 = customConenction(brdigePair.toRPC);

  const fromAccount = await connectAccount(fromWeb3, privateKey);
  const toAccount = await connectAccount(toWeb3, privateKey);

  fromWeb3.eth.accounts.wallet.add(fromAccount);
  toWeb3.eth.accounts.wallet.add(toAccount);

  const availableBalance = await getEthBalance(fromWeb3, fromAccount.address);

  const ethMinBalance = {
    ether: "0.0001",
    wei: BigInt(fromWeb3.utils.toWei("0.0001", "ether")),
  };

  if (ethMinBalance.wei >= availableBalance.eth_wei) {
    console.log(
      `Balance of ETH must be at least more than 0.0001 ETH (you have ${availableBalance.eth} ETH)`
    );
    return { back: true };
  }

  const { bridgeAmountInput } = await promptBridgeAmountInput(
    availableBalance.eth
  );

  const insertedAmount = async () => {
    let insertedAmount = "";
    while (true) {
      const { insertBridgeAmount } = await promptInsertBridgeAmount(
        availableBalance.eth
      );
      const amountWei = BigInt(
        fromWeb3.utils.toWei(insertBridgeAmount, "ether")
      );
      if (ethMinBalance.wei >= amountWei) {
        console.log("Inserted amount must be at least more than 0.0001 ETH");
      } else {
        insertedAmount = insertBridgeAmount;
        break;
      }
    }
    return insertedAmount;
  };

  let bridgeAmount = "";

  if (bridgeAmountInput === "Exit") {
    return { exit: true };
  } else if (bridgeAmountInput === "Back") {
    return { back: true };
  } else if (bridgeAmountInput === "Insert amount") {
    bridgeAmount = await insertedAmount();
  } else {
    bridgeAmount = fromWeb3.utils.fromWei(
      availableBalance.eth_wei -
        BigInt(fromWeb3.utils.toWei("0.0001", "ether")),
      "ether"
    );
  }

  if (bridgeAmount === "") return { back: true };

  const result = await bridgeEther(
    fromWeb3,
    bridgeAmount,
    fromAccount.address,
    toAccount.address
  );

  if (result.success) {
    console.log(
      `[BRIDGE SUCCESS] Bridged ${bridgeAmount} ETH from ${brdigePair.from} to ${brdigePair.to}. Confirmed in ${result.confirmed_in}s`
    );
  } else {
    console.log(`[BRIDGE FAILED] ${result.error}`);
  }

  return { exit: false };
};
