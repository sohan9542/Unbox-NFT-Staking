
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { getNFTContract } from '../contractHelpers'
import { getStakingAddress } from '../addressHelpers'
import presalewhitelist from 'config/whitelist'
import { ethers } from 'ethers'

export const callApproveForAll = async (provider: any, address: string, approved: boolean) => {
  const nftContract = getNFTContract(provider)
  const stakingAddress = getStakingAddress()
  // return new Promise(async(resolve, reject) => {
  return  await nftContract.methods
      .setApprovalForAll(stakingAddress, approved)
      .send({ from: address })
      // , (err: any, data: any) => {
      //   if (err) {
      //     reject(err)
      //   }
      //   resolve(data)
      // })
  // })
}

export const callMintForPublicSale = async (provider: any, address: string, quantity: number, price: number) => {
  const nftContract = getNFTContract(provider)
  // return new Promise(async(resolve, reject) => {
  return  await nftContract.methods
      .mintNFTForPublicSale(quantity)
      .send({ from: address, value: ethers.utils.parseEther((price * quantity).toString()) })
      // , (err: any, data: any) => {
      //   if (err) {
      //     reject(err)
      //   }
      //   resolve(data)
      // })
  // })
}


export const callMintForPresale = async (provider: any, address: string, quantity: number, price: number) => {
  const preSaleLeafNodes = presalewhitelist.map((addr: string) => keccak256(addr));
  const preSaleMerkleTree = new MerkleTree(preSaleLeafNodes, keccak256, {sortPairs: true});
  const claimingAddress = keccak256(address);
  const hexProof = preSaleMerkleTree.getHexProof(claimingAddress);
  const nftContract = getNFTContract(provider)
  // return new Promise(async(resolve, reject) => {
  return  await nftContract.methods
      .mintNFTForPresale(hexProof, quantity)
      .send({ from: address, value: ethers.utils.parseEther((price * quantity).toString()) })
      // , (err: any, data: any) => {
      //   if (err) {
      //     reject(err)
      //   }
      //   resolve(data)
      // })
  // })
}

