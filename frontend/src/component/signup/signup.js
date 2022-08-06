import React, { useState, useEffect } from 'react'
import SignupCSS from './signup.module.css';
import { useFormik } from 'formik';
import { ethers } from 'ethers';
import * as Yup from 'yup';
import { FaWallet } from 'react-icons/fa'
import { Navigate } from 'react-router-dom';
import Head from '../header2/head';

var val;
export default function Signup() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [isConnected, setisConnected] = useState(true);
    // const [Color, setColor] = useState("green");
    const [veri, setveri] = useState(false);
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
                // setveri(true);
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
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            email: Yup
                .string()
                .email()
                .required('Please Enter your Email'),
            // password: Yup
            //     .string()
            //     .required('Please Enter your password')
            //     .matches(
            //         "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$",
            //         "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            //     ),
            // confirmPassword: Yup
            //     .string()
            //     .required()
            //     .oneOf([Yup.ref("password"), null], "Passwords must match")
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            val = values
            console.log("kcjwdicjnwd", values);
        },
    });
useEffect(()=>{
    let data ={
        val,
        address:{account}
    }
    const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
      fetch('http://localhost:5000/signUp', fetchOptions)
        .then((res) => {
          console.log('Post Done');
          console.log(res);
        })
        .catch((err) => {
   console.log(err);
        })
    });
    if (veri) {
        return <Navigate to="/login" />
    }
    return (
        <div className={SignupCSS.parent}>
            <Head />
            <div className={SignupCSS.mainDiv}>
                <form className={SignupCSS.form} onSubmit={formik.handleSubmit}>
                    <div className={SignupCSS.welcome}>
                        Hi, Welcome
                    </div>
                    <div className='form-signup-div'>
                        <div >
                            <input
                                className={SignupCSS.inputs}
                                name="name"
                                type="text"
                                placeholder='Enter your First name'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </div>
                        {formik.errors.firstname ? <div className='error'>{formik.errors.firstname}</div> : null}
                        <div>
                            <input
                                className={SignupCSS.inputs}
                                name="email"
                                type="email"
                                placeholder='Enter your Email Address'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        {formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                        <div>
                            <input
                                className={SignupCSS.inputs}
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        {formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
                        <div>
                            {
                                isConnected ?
                                    <button className={SignupCSS.green} type="submit" onClick={connectHandler}><span>Connect Wallet</span><span className={SignupCSS.wallet} >< FaWallet /></span></button>
                                    :
                                    <button className={SignupCSS.green} type="submit" onClick={buttonConnect}><span className='btn-spans-body'> <span className={SignupCSS.account}> {account}</span>
                                    </span></button>
                            }
                        </div>
                        {/* <div>
                        <button className={SignupCSS.submit} type="submit">Let me In</button>
                    </div> */}
                    </div>
                    </form>
                    <div className={SignupCSS.already}>
                        Already have an account?
                        <span>
                            <a className={SignupCSS.loginLink} href="/login">Login</a>
                        </span>
                    </div>
                
            </div>
        </div>
    )
}