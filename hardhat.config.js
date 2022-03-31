require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const ROPSTEN_PK = process.env.ROPSTEN_PK;
const ALCHEMY_URL_ROP = process.env.ALCHEMY_URL_ROPSTEN;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: ALCHEMY_URL_ROP,
      accounts: [`${ROPSTEN_PK}`]
    },
    mainnet: {
      url: process.env.ALCHEMY_URL_MAINNET,
      accounts: [`${process.env.MAINNET_PK}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  }
};
