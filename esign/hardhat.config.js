require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity:"0.8.14",
  networks: {
    testnet: {
      url: process.env.PROVIDER,
      chainId: 80001, // Polygon Mumbai
      accounts:[`0x${PRIVATE_KEY}`],
      gas: 1200000,
      gasPrice: "auto"
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.EXPLORER_API_KEY
    } 
  }

};