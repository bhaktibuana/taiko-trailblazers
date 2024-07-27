import { T_BridgePairs } from "@/constants/types/bridge.constant.type";
import { config } from "@/configs";

export const bridgePairs: T_BridgePairs = [
  {
    networkType: "testnet",
    label: "Hekla-Holesky",
    from: "Hekla",
    to: "Holesky",
    fromRPC: config.TESTNET_RPC,
    toRPC: config.HOLESKY_RPC,
  },
  {
    networkType: "testnet",
    label: "Holesky-Hekla",
    from: "Holesky",
    to: "Hekla",
    fromRPC: config.HOLESKY_RPC,
    toRPC: config.TESTNET_RPC,
  },
  {
    networkType: "mainnet",
    label: "Taiko-Base",
    from: "Taiko",
    to: "Base",
    fromRPC: config.MAINNET_RPC,
    toRPC: config.BASE_RPC,
  },
  {
    networkType: "mainnet",
    label: "Base-Taiko",
    from: "Base",
    to: "Taiko",
    fromRPC: config.BASE_RPC,
    toRPC: config.MAINNET_RPC,
  },
  {
    networkType: "mainnet",
    label: "Taiko-ZKsync",
    from: "Taiko",
    to: "ZKsync",
    fromRPC: config.MAINNET_RPC,
    toRPC: config.ZKSYNC_RPC,
  },
  {
    networkType: "mainnet",
    label: "ZKsync-Taiko",
    from: "ZKsync",
    to: "Taiko",
    fromRPC: config.ZKSYNC_RPC,
    toRPC: config.MAINNET_RPC,
  },
];
