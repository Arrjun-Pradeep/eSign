import React from 'react'
import verifyCSS from './verify.module.css';
import Head from '../header2/head';
import {ethers} from 'ethers';
export default function Verify() {
    const signMessage = async (message) => {
        try {
    
          const { ethereum } = window;
    
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const signature = await signer.signMessage("hai");
            console.log("signature", signature);
            const address = await signer.getAddress();
            console.log("address", address)
          } else {
            console.log("Ethereum object doesn't exist!");
          }
    
        } catch (error) {
          console.log(error);
        }
      };
    
      const verifyMessage = async (message, address, signature) => {
    
        try {
    
          const signerAddr = await ethers.utils.verifyMessage("hai", "0xbc880d9b5228c454476de5caeabc1b1b2f4c9930ea992537d6d909590133075e2bd6cd65cc982fdb77740fc4a27abbfebc5bfd465ea660de0697e8b42d11bf951c")
    
          if (signerAddr != address) {
    
            console.log("result", false);
            return false;
    
          }
    
          console.log("result", true);
          return true;
    
        } catch (error) {
    
          console.log(":: ERROR ::", error)
    
        }
    
      }
    
    return (
        <div className={verifyCSS.parent}>
            <div>
                <Head />
            </div>
            <div>
                <input
                    type="text"

                />
                <div>
                    <input
                        type="text"

                    />
                </div>
                <div>
                    <input
                        type="text"
                    />
                </div>
                <button onClick={signMessage}>Sign</button>
                <button onClick={verifyMessage}>Verify</button>
            </div>
        </div>
    )
}
