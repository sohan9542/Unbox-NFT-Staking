import BigNumber from 'bignumber.js'
import ERC721ABI from 'config/abis/erc721.json'
import StakingABI from 'config/abis/nftStaking.json'
import { getNFTAddress, getStakingAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'

export const fetchApprovalStatus = async (account: string) => {
  const nftAddress = getNFTAddress()
  const stakingAddress = getStakingAddress()

  const calls = [
    {
      address: nftAddress,
      name: 'isApprovedForAll',
      params: [account, stakingAddress],
    },
  ]

  const rawApprovalStatus = await multicall(ERC721ABI, calls)
  const parsedApprovalStatus = rawApprovalStatus.map((status: any) => {
    return status[0]
  })
  return parsedApprovalStatus
}

export const fetchStakingAmount = async (account: string) => {
  const stakingAddress = getStakingAddress()

  const calls = [
    {
      address: stakingAddress,
      name: 'stakingAmount',
      params: [account],
    },
  ]

  const rawStakingAmount = await multicall(StakingABI, calls)
  const parsedStakingAmount = new BigNumber(rawStakingAmount[0][0]._hex).toNumber()
  return parsedStakingAmount
}

export const fetchPendingTotalReward = async (account: string) => {
  const stakingAddress = getStakingAddress()

  const calls = [
    {
      address: stakingAddress,
      name: 'pendingTotalReward',
      params: [account],
    },
  ]

  const rawPendingTotalReward = await multicall(StakingABI, calls)
  const parsedPendingTotalReward = new BigNumber(rawPendingTotalReward[0][0]._hex).toJSON()
  return parsedPendingTotalReward
}

export const fetchNFTTokenIdsOnStaking = async (account: string, amount: number) => {
  const calls = []
  const stakingAddress = getStakingAddress()
  for (let i = 0; i < amount; i ++) {
    const callData =  {
      address: stakingAddress,
      name: 'userInfo',
      params: [account, i],
    }
    calls.push(callData)
  }

  const rawUserInfos = await multicall(StakingABI, calls)
  const parsedTokenIds = rawUserInfos.map((userInfo: any) => {
    return new BigNumber(userInfo.tokenId._hex).toNumber()
  })
  return parsedTokenIds
}