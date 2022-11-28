import { ethers } from 'ethers'
import Web3 from 'web3'
import { simpleRpcProvider } from 'utils/providers'

// Addresses
import {
  getNFTAddress,
  getStakingAddress,
  getMulticallAddress,
} from 'utils/addressHelpers'

// ABI
import NFTABI from 'config/abis/nft.json'
import NFTStaking from 'config/abis/nftStaking.json'
import MultiCallAbi from 'config/abis/multicall.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export function getContractWithWeb3(abi: any, address: string, provider: any) {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(abi, address)
}

export const getNFTContract = (provider: any) => {
  return getContractWithWeb3(NFTABI, getNFTAddress(), provider)
}

export const getNFTContractWithoutSigner = () => {
  return getContract(NFTABI, getNFTAddress(), undefined) as any
}

export const getStakingContract = (provider: any) => {
  return getContractWithWeb3(NFTStaking, getStakingAddress(), provider)
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer) as any
}