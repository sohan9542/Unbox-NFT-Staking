import BigNumber from 'bignumber.js'
import ERC20ABI from 'config/abis/erc20.json'
import addresses from 'config/contracts'
import { getAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'

export const fetchRewardTokenBalances = async (account: string) => {
  const rewardAddress = getAddress(addresses.reward)
  const calls = [
    {
      address: rewardAddress,
      name: 'balanceOf',
      params: [account],
    }
  ]

  const rawTokenBalances = await multicall(ERC20ABI, calls)
  const parsedTokenBalances = new BigNumber(rawTokenBalances[0][0]._hex).toJSON()
  return parsedTokenBalances
}

export const fetchSubRewardTokenBalances = async (account: string) => {
  const subRewardAddress = getAddress(addresses.subReward)
  const calls = [
    {
      address: subRewardAddress,
      name: 'balanceOf',
      params: [account],
    }
  ]

  const rawTokenBalances = await multicall(ERC20ABI, calls)
  const parsedTokenBalances = new BigNumber(rawTokenBalances[0][0]._hex).toJSON()
  return parsedTokenBalances
}