import TESTNET_WETH from "@/abi/testnet-weth-abi.json";
import MAINNET_WETH from "@/abi/mainnet-weth-abi.json";

import { I_Abi } from "@/abi/types/abi.type";

export const abi: I_Abi = {
  testnet_weth_abi: TESTNET_WETH,
  mainnet_weth_abi: MAINNET_WETH,
};
