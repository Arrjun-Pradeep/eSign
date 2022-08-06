const ethers = require("ethers");
const axios = require("axios");
const tokenABI = require("../artifacts/contracts/eSign.sol/eSign.json").abi;
require('dotenv').config();

var tokenContract, tokenContractAddress, signer;

// INTITIALIZE WEB3
const initializeWeb3 = async () => {
  try {
    var url = process.env.PROVIDER;
    provider = new ethers.providers.JsonRpcProvider(url);
  } catch (error) {
    console.log(":: INITIALIZE_WEB3 :: ERROR :: \n", error);
    return;
  }
};

// INITIALIZE SIGNER
const initializeSigner = async () => {
    try {

      let wallet = new ethers.Wallet(
        process.env.SIGNER_KEY,
        provider
      );
  
      signer = wallet.connect(provider);
      console.log("SIGNER ::", signer);
  
      return signer;

    } catch (error) {
      console.log(":: INITIALIZE_SIGNER :: ERROR :: \n", error);
      return;
    }
  };

  const initializeSigner1 = async () => {
    try {

      let wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY1,
        process.env.PROVIDER
      );
  
      signer = wallet.connect(process.env.PROVIDER);
      console.log("SIGNER ::", signer);
  
      let s = await signer.signMessage("sign");

      return s;

    } catch (error) {
      console.log(":: INITIALIZE_SIGNER :: ERROR :: \n", error);
      return;
    }
  };

// INITIALIZE TOKEN CONTRACT
const initializeTokenContract = async () => {
  try {

    await initializeSigner();

    // NFT CONTRACT ADDRESS
    tokenContractAddress = process.env.CONTRACT_ADDRESS;
    tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
    signerAddress = signer.address;
  } catch (error) {
    console.log(":: INITIALIZE_TOKEN_CONTRACT :: ERROR :: \n", error);
    return;
  }
};

// eSign
const storeData = async (id, sender, reciever, hash, signature) => {
  try {
    let promises = await Promise.all([
      initializeWeb3(),
      initializeTokenContract(await initializeSigner()),
    ]);

    let txn = await tokenContract.connect(signer).storeDocumentInfo(1, "0x79Fb2A65920B7f211CF294C193F85da260eABA0A", "0x79Fb2A65920B7f211CF294C193F85da260eABA0A", "4", "5");

    console.log("TXN", txn);

    if(txn.hash != null) {
        return txn.hash
    }

  } catch (error) {

    console.log(":: STORE_DATA :: ERROR :: ", error);   

  }
};

module.exports = {
    storeData,
    initializeSigner1
};