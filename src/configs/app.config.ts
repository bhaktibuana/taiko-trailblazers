import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const config = {
  TESTNET_RPC: process.env.TAIKO_TESTNET_RPC || "",
  MAINNET_RPC: process.env.TAIKO_MAINNET_RPC || "",
  HOLESKY_RPC: process.env.HOLESKY_TESTNET_RPC || "",
  BASE_RPC: process.env.BASE_MAINNET_RPC || "",
  ZKSYNC_RPC: process.env.ZKSYNC_MAINNET_RPC || "",
  TESTNET_WETH_CA: process.env.TESTNET_WETH_CA || "",
  MAINNET_WETH_CA: process.env.MAINNET_WETH_CA || "",
};
