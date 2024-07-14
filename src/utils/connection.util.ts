import Web3 from "web3";

import { T_NetworkType } from "@/utils/types/connection.util.type";
import { config } from "@/configs";

export const connection = (networkType: T_NetworkType) => {
  const rpc =
    networkType === "mainnet" ? config.MAINNET_RPC : config.TESTNET_RPC;

  const con = new Web3.providers.HttpProvider(rpc);
  return {
    web3: new Web3(con),
    networkType,
  };
};
