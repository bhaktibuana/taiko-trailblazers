export type T_BridgePairLabel = "Taiko-Base" | "Base-Taiko" | "Taiko-ZKsync" | "ZKsync-Taiko" | "Hekla-Holesky" | "Holesky-Hekla";
export type T_BridgeSymbol = "Taiko" | "Base" | "ZKsync" | "Hekla" | "Holesky";

interface I_BridgePair {
  networkType: "testnet" | "mainnet";
  label: T_BridgePairLabel;
  from: T_BridgeSymbol;
  to: T_BridgeSymbol;
  fromRPC: string;
  toRPC: string;
}

export type T_BridgePairs = I_BridgePair[];
