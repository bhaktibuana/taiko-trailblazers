import TESTNET_WETH from "@/abi/testnet-weth-abi.json";
import MAINNET_WETH from "@/abi/mainnet-weth-abi.json";

export interface I_Abi {
  testnet_weth_abi: typeof TESTNET_WETH;
  mainnet_weth_abi: typeof MAINNET_WETH;
}
