import { CHAIN } from 'config'
import addresses from 'config/contracts'
import { Address } from 'config/types'

export const getAddress = (address: Address): string => {
  const chainId = CHAIN
  return address[chainId]
}

export const getNFTAddress = () => {
  return getAddress(addresses.nft)
}
export const getStakingAddress = () => {
  return getAddress(addresses.staking)
}
export const getRewardAddress = () => {
  return getAddress(addresses.reward)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multicall)
}