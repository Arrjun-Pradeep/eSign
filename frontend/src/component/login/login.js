import React, { useState, useEffect } from 'react'
import Head from '../header2/head';
import { ethers } from 'ethers';
import { useFormik } from 'formik';
import loginCSS from './login.module.css';
import { Navigate } from 'react-router-dom';

let valu;
export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnected, setisConnected] = useState(true);
  // const [Color, setColor] = useState("green")
  const [home, sethome] = useState(false);


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
    // setColor(isConnected ? "green" : "green1")
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
        sethome(true)
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
      // setColor("green1")
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
  const formik = useFormik({
    initialValues: {
      Email: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      valu = values;
      console.log("kcjwdicjnwd", values);
    },
  });
    let data ={
        valu,
        address:{account}
    }
    const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
      fetch('http://localhost:5000/login', fetchOptions)
        .then((res) => {
          console.log('Post Done');
          console.log(res);
        })
        .catch((err) => {
   console.log(err);
        })
  if (home) {
    return <Navigate to="/" />
  }
  return (
    <div className={loginCSS.bigDIV}>
      <Head />
      <div className={loginCSS.mainDiv}>
        <form onSubmit={formik.handleSubmit} className={loginCSS.formikLogin}>
          <div className={loginCSS.Welcome}>
            Welcome Back,
          </div>
          <div>
            <input
              className={loginCSS.inputLogin}
              name="Email"
              type="email"
              placeholder="Enter your Email"
              onChange={formik.handleChange}
              value={formik.values.Email}
            />
          </div>
          <div>
            <input
              className={loginCSS.inputLogin}
              name="password"
              type="text"
              placeholder="Enter your Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div>
            <a className={loginCSS.forgetLogin} href="/forgot">Forgot your password?</a>
          </div>
          <div className={loginCSS.buttonDiv}>
            <div className={loginCSS.divSpan}>
            </div>
            <div >
              {
                isConnected ?
                  <button className={loginCSS.green} type="submit" onClick={connectHandler}>Let me In</button>
                  :
                  <button className={loginCSS.green} type="submit" onClick={buttonConnect}><span className='btn-spans-body'><span className={loginCSS.account}> {account}</span>
                  </span></button>
              }
            </div>
          </div>

        </form>
        <div className={loginCSS.textAccount}>Do you have an account?
          <span><a className={loginCSS.registerLink} href="/signup">Create Account</a></span>
        </div>
      </div >
    </div >
  )
}
