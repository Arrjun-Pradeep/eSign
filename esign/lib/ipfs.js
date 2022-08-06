const ethers = require("ethers");
const axios = require("axios");
const { create } = require("ipfs-http-client");

var client;

// INITIALIZE IPFS
const initializeIPFS = async () => {
  try {
    const projectId = "1yAQKsMawsft8Fw9FtNX1ZOgPz8";
    const projectSecret = "5e1658b5a43a08c7257712e407b99e4d";
    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");
    client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
  } catch (error) {
    console.log(":: INITIALIZE_IPFS :: ERROR :: \n", error);
    return;
  }
};

// UPLOAD FILE TO IPFS
const uploadFileToIPFS = async (file, senderAddress, recieverAddress, id, signature) => {

  try {
    await initializeIPFS();

    //1 ADD File to IPFS
    const url = await client.add(file, {
      cidVersion: 1,
      hashAlg: "sha2-256",
    });

    console.log("URL::", url);

    // URL (1) https://gateway.ipfs.io/ipfs/ OR (2) https://ipfs.infura.io/ipfs/
    const documentUrl = `https://gateway.ipfs.io/ipfs/${url?.path}`;

    //2 ADD Metadata to IPFS
    const metadata = {
      sender: senderAddress,
      reciever: recieverAddress,
      id: id,
      signature: signature,
      document: documentUrl,
    };

    const metadataRes = await client.add(JSON.stringify(metadata), {
      cidVersion: 1,
      hashAlg: "sha2-256",
    });

    const metaDataUrl = `https://gateway.ipfs.io/ipfs/${metadataRes?.path}`;

    //3 return image & metadata URLs and also the CID for each
    return {
      documentUrl,
      metaDataUrl,
      // metaDataHashCID: metadataRes?.path,
      // imageHashCID: url?.path,
    };
  } catch (e) {
    console.log(":: ERROR UPLOADING TO IPFS ::", e);
    return;
  }
};

module.exports = {
  uploadFileToIPFS
}