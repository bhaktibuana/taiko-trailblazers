import inquirer from "inquirer";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import { connectAccount, connection } from "@/utils";
import {
  promptActionType,
  promptNetworkAndKey,
  promptBridgePair,
} from "@/views";
import { bridge, checkBalance, wrapUnwrap } from "@/controllers";

export const main = async () => {
  const { networkType, privateKey } = await promptNetworkAndKey();
  const { web3 } = connection(networkType);
  const account = await connectAccount(web3, privateKey);

  web3.eth.accounts.wallet.add(account);

  let keepGoing = true;

  const abort = () => {
    keepGoing = false;
    console.log("Goodbye!");
  };

  while (keepGoing) {
    const { actionType } = await promptActionType();

    if (actionType === "Exit") {
      abort();
      break;
    }

    if (actionType === "Check balance") {
      const result = await checkBalance(web3, networkType, account);
      if (result.exit) {
        abort();
        break;
      }
      if (result.back) {
        continue;
      }
    }

    if (actionType === "Wrap-unwrap") {
      await wrapUnwrap(web3, networkType, account);
    }

    if (actionType === "Bridge") {
      console.log("Be careful, this feature is not ready yet. Do not use mainnet or you might lost your assets!")
      const { bridgePair } = await promptBridgePair(networkType);
      if (bridgePair === "Exit") {
        abort();
        break;
      }
      if (bridgePair === "Back") {
        continue;
      }

      const result = await bridge(privateKey, bridgePair);
      if (result.exit) {
        abort();
        break;
      }
      if (result.back) {
        continue;
      }
    }

    const { continueAction } = await inquirer.prompt({
      type: "confirm",
      name: "continueAction",
      message: "Do you make another action?",
      default: true,
    });

    if (!continueAction) {
      abort();
    }
  }
};
