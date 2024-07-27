import inquirer from "inquirer";
import { bridgePairs } from "@/constants";

export const promptNetworkAndKey = async () => {
  const questions = [
    {
      type: "list",
      name: "networkType",
      message: "Select network type:",
      choices: ["mainnet", "testnet"],
    },
    {
      type: "password", // Change this line to hide the input
      name: "privateKey",
      message: "Enter your private key:",
      mask: "*", // Optional: masks the input with asterisks
      validate: (input: string) => {
        if (input.startsWith("0x") && input.length === 66) {
          return true;
        } else {
          return "Please enter a valid private key (0x-prefixed, 64 hex characters).";
        }
      },
    },
  ] as any;

  return inquirer.prompt(questions);
};

export const promptActionType = async () => {
  const question = {
    type: "list",
    name: "actionType",
    message: "Select action:",
    choices: ["Check balance", "Wrap-unwrap", "Bridge", "Exit"],
  } as any;

  return inquirer.prompt(question);
};

export const promptWrapUnwrapCount = async () => {
  const question = {
    type: "input",
    name: "wrapUnwrapCount",
    message: "Count for wrap-unwrap:",
  } as any;

  return inquirer.prompt(question);
};

export const promptBalanceType = async () => {
  const question = {
    type: "list",
    name: "balanceType",
    message: "Select balance to check:",
    choices: ["ETH", "WETH", "Back", "Exit"],
  } as any;

  return inquirer.prompt(question);
};

export const promptBridgePair = async (networkType: "testnet" | "mainnet") => {
  const pairLabels = bridgePairs.filter(
    (bridgePair) => bridgePair.networkType === networkType
  ).map(bridgePair => bridgePair.label);

  const question = {
    type: "list",
    name: "bridgePair",
    message: "Select ETH bridge pair:",
    choices: [...pairLabels, "Back", "Exit"],
  } as any;

  return inquirer.prompt(question);
};

export const promptBridgeAmountInput = async (availableBalance: string) => {
  const question = {
    type: "list",
    name: "bridgeAmountInput",
    message: `Choose ETH amount input type:\nYou have ${availableBalance} ETH in your account`,
    choices: ["Use max ETH balance", "Insert amount", "Back", "Exit"],
  } as any;

  return inquirer.prompt(question);
};

export const promptInsertBridgeAmount = async (availableBalance: string) => {
  const question = {
    type: "input",
    name: "insertBridgeAmount",
    message: `You have ${availableBalance} ETH in your account, Insert amount of ETH to bridge:`,
  } as any;

  return inquirer.prompt(question);
};