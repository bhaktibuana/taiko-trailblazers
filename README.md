# Taiko Trailblazers Season 1 Airdrop Automation

This repository was created to complete the Taiko Trailblazers Season 1 Airdrop task, where users must wrap and unwrap ETH on the Taiko Mainnet 160 times daily. Since this task can be very tedious, I created code to automate the wrap-unwrap process and also check ETH and WETH balances on the connected wallet.

## Benefits of Using This Code

- **Process Automation:** Eliminates the need to manually wrap and unwrap ETH.
- **Cost Efficiency:** With this code, the transaction fee is only around 0.0000015 ETH per transaction, compared to 0.000004 ETH on other DEXs like [ritsu.xyz](https://ritsu.xyz).
- **Balance Checking:** Allows users to easily check ETH and WETH balances.

## Requirements

- Node.js version 18 or higher

## Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/bhaktibuana/taiko-trailblazers.git
    cd taiko-trailblazers
    ```

2. Install dependencies using npm or yarn:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Rename the `.env.example` file to `.env` and adjust its contents to match your configuration.

4. Build the project:
    ```sh
    yarn build:prod
    # or
    npm run build:prod

    # if the production build fails, use

    yarn build:dev
    # or
    npm run build:dev
    ```

5. Run the application:
    ```sh
    yarn start
    # or
    npm start
    ```

## Usage

1. Select the network: Testnet or Mainnet.
2. Enter your wallet's private key.
3. Choose an option:
    - **Check Balance:** Check the ETH or WETH balance.
    - **Wrap-Unwrap:** Perform wrap-unwrap transactions.

### Wrap-Unwrap Process

- The minimum ETH balance required to perform wrap-unwrap is 0.0002 ETH.
- The wrap-unwrap process involves:
  - Wrapping the entire ETH balance minus 0.0001 ETH reserved for gas fees.
  - Unwrapping the entire WETH balance.
  - Repeating this process for the number of transactions input by the user.

### Important Notes

- It is recommended not to perform 160 transactions in one run. For example, perform 50 transactions per wrap-unwrap run.
- The wrap-unwrap process will stop if the ETH balance is less than 0.0001 ETH.

### Block Explorers

- **Mainnet:** [taikoscan.io](https://taikoscan.io/)
- **Testnet:** [hekla.taikoscan.network](https://hekla.taikoscan.network/)

For claim testnet faucet, you can google it with keyword: How to get taiko hekla testnet ETH faucet.

---

By using this repository, you can save time and costs while completing the Taiko Trailblazers Season 1 Airdrop task. Happy airdropping!
