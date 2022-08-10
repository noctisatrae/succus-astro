import React, { useCallback, useState, useEffect } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Blockies from "react-blockies";

import { INFURA_ID } from "&";
import {Address} from "$";

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: INFURA_ID,
        },
      },
    },
});
  
const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    window.localStorage.removeItem("walletconnect");
    setTimeout(() => {
      window.location.reload();
    }, 1);
};

const Wallet = () => {

    const [ InjectedProvider, setInjectedProvider ] = useState();
    const [address, setAddress] = useState();
    const [isConnected, setIsConnected] = useState();

    const loadWeb3Modal = useCallback(async () => {
      const provider = await web3Modal.connect();
      setInjectedProvider(new ethers.providers.Web3Provider(provider)) 

      provider.on("chainChanged", chainId => {
        console.log(`chain changed to ${chainId}! updating providers`);
        setInjectedProvider(new ethers.providers.Web3Provider(provider));
      });
  
      provider.on("accountsChanged", () => {
        console.log(`account changed!`);
        setInjectedProvider(new ethers.providers.Web3Provider(provider));
      });
  
      // Subscribe to session disconnection
      provider.on("disconnect", (code, reason) => {
        console.log(code, reason);
        logoutOfWeb3Modal();
      });

    }, [setInjectedProvider]);

    useEffect(() => {
        InjectedProvider?.getSigner()?.getAddress().then(theAddress => {
            setAddress(theAddress);
            setIsConnected(true);
        })
    }, [InjectedProvider]) 
    
    useEffect(() => {
      if (web3Modal.cachedProvider) {
        loadWeb3Modal();
      }
    }, [loadWeb3Modal]);

    return (
        <>
            {(isConnected === true) ? 
                
                <div class="flex">
                <button class="btn btn-ghost btn-circle">
                    <div class="indicator">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      <span class="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                  </button>
                  <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                      <div class="rounded-full">
                        <Blockies seed={address}></Blockies>
                      </div>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
                      <li><Address ethAddress={address}></Address></li>
                      <li><a href="/inbox">Inbox</a></li>
                      <li><button onClick={logoutOfWeb3Modal}>Log Out</button></li>
                    </ul>
                  </div>
                </div>
                
                : 

                <div>
                    <button onClick={loadWeb3Modal} className="btn btn-xs">Connect with Wallet</button> 
                </div>}

        </>
    )
}

export default Wallet;