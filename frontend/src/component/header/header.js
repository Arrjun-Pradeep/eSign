import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import headerCSS from './header.module.css';
// import Hackathonn from './hackathonn.jpg';
import MINERS from './MINERS.png';
export default function Header() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [isConnected, setisConnected] = useState(true);
    // const [Color, setColor] = useState("white")


    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", accountsChanged);
            // window.ethereum.on("chainChanged", chainChanged);
            return () => {
                window.ethereum.removeListener("chainChanged", networkChanged);
            };
        }
    }, []);
    const buttonConnect = () => {
        setisConnected(isConnected => !isConnected);
    }
    const networks = {
        polygon: {
            chainId: `0x${Number(137).toString(16)}`,
            chainName: "Polygon Mainnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"]
        },
    };
    const changeNetwork = async ({ networkName }) => {
        try {
            if (!window.ethereum) throw new Error("No crypto wallet found");
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks[networkName]
                    }
                ]
            });
        } catch (err) {
            console.log(err.message);
        }
        if (networkName === "polygon") {
            console.log("true")

        }
        else {
            console.log("false");
        }
    };
    const handleNetworkSwitch = async (networkName) => {

        await changeNetwork({ networkName });
        //  if(networkName === "polygon"){
        //    console.log("true");
        //   }
        //   else{
        //     console.log("false");
        //   }
    }
    const networkChanged = (chainId) => {
        console.log({ chainId })
    };
    const connectHandler = async () => {

        if (window.ethereum) {
            try {
                const res = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                handleNetworkSwitch('polygon');
                buttonConnect();
                // newFunction();
                //  buttonConnect();
            } catch (err) {
                console.error(err);
                setErrorMessage("There was a problem connecting to MetaMask");
            }
        } else {
            setErrorMessage("Install MetaMask");
        }
    };
    const accountsChanged = async (newAccount) => {
        setAccount(newAccount);
        if (newAccount.length === 0) {
            setisConnected(true)
        } else {

            try {
                const balance = await window.ethereum.request({
                    method: "eth_getBalance",
                    params: [newAccount.toString(), "latest"],
                });
                setBalance(ethers.utils.formatEther(balance));
            } catch (err) {
                console.error(err);
                setErrorMessage("There was a problem connecting to MetaMask");
            }
        }
    };
    return (
        <header className={headerCSS.mainHeader}>
            <div className={headerCSS.imgDiv}>
                <img className={headerCSS.img} src={MINERS} alt="logo" />
            </div>
            <div className={headerCSS.button}>
                <span className={headerCSS.spans}>
                    <a className={headerCSS.spanlinks} href="/login">Login</a>
                </span>
                <span className={headerCSS.spans}>
                    <a className={headerCSS.spanlinks} href="/signup">Sign Up</a>
                </span>
                {
                    isConnected ?
                        <button className={headerCSS.Color} onClick={connectHandler}>CONNECT WALLET</button>
                        :
                        <button className={headerCSS.Color} onClick={buttonConnect}><span className='btn-spans-body'> <span className={headerCSS.account}> {account}</span>
                        </span></button>
                }
            </div>

        </header>
    )
}
