import React, { useEffect, useState, ReactElement } from "react";
import { StaticJsonRpcProvider, JsonRpcProvider } from "@ethersproject/providers";
import { RPC_URL, INFURA_ID, CHAIN } from 'config'
import { getChainData } from 'utils/getChainData'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import WalletConnectProvider from '@walletconnect/web3-provider'

export type Web3ContextData = {
  provider: JsonRpcProvider;
  setProvider: any;
  account: string;
  setAccount: any;
  connectWallet: any;
  disconnect: any;
} | null;

export const Web3Context = React.createContext<Web3ContextData>(null);

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [provider, setProvider] = useState<JsonRpcProvider>(new StaticJsonRpcProvider(RPC_URL));
  const [account, setAccount] = useState<string>('');

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet()
    }
  }, []);

  const providerOptions =  {
    walletlink: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "NFT Stakging", // Required
        infuraId: INFURA_ID // Required unless you provide a JSON RPC url; see `rpc` below
      }
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID // required
      }
    }
  }

  const web3Modal = new Web3Modal({
    network: getChainData(CHAIN).network,
    cacheProvider: true, // optional
    providerOptions: providerOptions
  })

  const connectWallet = async() => {
    try{
      const provider = await web3Modal.connect()
      const library = new ethers.providers.Web3Provider(provider)
      const accounts = await library.listAccounts()

      if (accounts) {
        setAccount(accounts[0])
      }
      if (library) {
        setProvider(provider)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const disconnect = async () => {
    await web3Modal.clearCachedProvider()
    setAccount('')
  }

  return <Web3Context.Provider value={{ provider, setProvider, account, setAccount, connectWallet, disconnect }}>{children}</Web3Context.Provider>;
};
