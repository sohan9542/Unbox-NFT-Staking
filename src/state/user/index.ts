import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state'
import getMetadatas from 'utils/getMetadatas'
import { fetchNFTTokenBalances, fetchNFTTokenIds } from './fetchNFTUser'
import { fetchStakingAmount, fetchNFTTokenIdsOnStaking, fetchPendingTotalReward } from './fetchNFTStakingUser'
import { fetchRewardTokenBalances, fetchSubRewardTokenBalances } from './fetchReward'
import { NFT_IPFS } from 'config'

export interface NFTData {
  id: number
  name: string
  image: string
  description: string
}

interface NFTUserDataResponse {
  nfts: NFTData[],
  stakedNFTs: NFTData[],
  pendingReward: string,
  rewardBalance: string,
  subRewardBalance: string,
}

export interface UserState {
  nfts: NFTData[],
  stakedNFTs: NFTData[],
  pendingReward: string,
  rewardBalance: string,
  subRewardBalance: string,
  nftStatus: boolean,
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UserState = {
  nfts: [],
  stakedNFTs: [],
  pendingReward: '',
  rewardBalance: '',
  subRewardBalance: '',
  nftStatus: false,
  status: 'idle',
}

// const fetchNFTUserDataPerCollectoin = async (ids: number[]) => {
//   const datas = await getMetadatas(ids)
//   const items = ids.map((id: number, index: number) => {
//     const data = datas[index]
//     const nft = {
//       id,
//       name: data.name,
//       image: data.image,
//       description: data.description,
//     }
//     return nft
//   })
//   return items
// }

const fetchNFTUserDataPerCollectoin = async (ids: number[]) => {
  // const datas = await getMetadatas(ids)
  const items = ids.map((id: number, index: number) => {
    // const data = datas[index]
    const nft = {
      id,
      name: "Spectrum",
      image: NFT_IPFS,
      description: "Spectrum NFT",
    }
    return nft
  })
  return items
}

export const fetchNFTUserDataSync = createAsyncThunk<NFTUserDataResponse, {account: string}, {state: RootState}>(
  'user/fetchNFTUserData',
  async ({ account }) => {
    console.log("sniper: call fetch nft user data sync: ", account)
    const userNFTTokenBalances = await fetchNFTTokenBalances(account)
    console.log("sniper: userNFTTokenBalances", userNFTTokenBalances)
    const ids = await fetchNFTTokenIds(account, userNFTTokenBalances)
    console.log("sniper: ids", ids)
    const nfts = await fetchNFTUserDataPerCollectoin(ids)
console.log("sniper: userNFTTokenBalances", userNFTTokenBalances, ids)
    const stakingAmount = await fetchStakingAmount(account)
    const idsOnStaking = await fetchNFTTokenIdsOnStaking(account, stakingAmount)
    const nftsOnStaking = await fetchNFTUserDataPerCollectoin(idsOnStaking)

    const pendingReward = await fetchPendingTotalReward(account)

    const rewardBalance = await fetchRewardTokenBalances(account)
    const subRewardBalance = await fetchSubRewardTokenBalances(account)

    return {
      nfts,
      stakedNFTs: nftsOnStaking,
      pendingReward,
      rewardBalance,
      subRewardBalance,
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateApprovalStatus: (state, action) => {
      state.nftStatus = action.payload.nftStatus
    },
    updateNFTUserDataWithEmpty: (state) => {
      state.nfts = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNFTUserDataSync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchNFTUserDataSync.fulfilled, (state, action) => {
        state.nfts = action.payload.nfts
        state.stakedNFTs = action.payload.stakedNFTs
        state.pendingReward = action.payload.pendingReward
        state.rewardBalance = action.payload.rewardBalance
        state.subRewardBalance = action.payload.subRewardBalance
        state.status = 'idle'
      })
      .addCase(fetchNFTUserDataSync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { updateApprovalStatus, updateNFTUserDataWithEmpty } = userSlice.actions

export default userSlice.reducer
