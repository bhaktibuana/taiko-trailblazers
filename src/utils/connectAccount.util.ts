import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

import { T_PrivateKey } from "@/utils/types/connectAccount.util.type";

export const connectAccount = async (
  web3: Web3<RegisteredSubscription>,
  privateKey: T_PrivateKey
) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  return account;
};
