import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state/hooks'
import { fetchNFTUserDataSync, updateApprovalStatus, updateNFTUserDataWithEmpty } from '.'
import { fetchApprovalStatus } from './fetchNFTStakingUser'

export const useNFTUserData = (_account: string | undefined, reload: boolean) => {
  const dispatch = useAppDispatch()
  const {fastRefresh} = useRefresh()
  
  useEffect(() => {
    console.log("sniper: fastRefresh: ", fastRefresh)
    if (_account) {
      dispatch(fetchNFTUserDataSync({ account: _account }))
    } else {
      dispatch(updateNFTUserDataWithEmpty())
    }
  }, [_account, fastRefresh, dispatch, reload])
}

export const useNFT = () => {
  const nfts = useSelector((state: any) => state.user.nfts)
  return nfts
}

export const useStakedNFT = () => {
  const stakedNFTs = useSelector((state: any) => state.user.stakedNFTs)
  return stakedNFTs
}

export const useBalances = () => {
  const pendingReward = useSelector((state: any) => state.user.pendingReward)
  const rewardBalance = useSelector((state: any) => state.user.rewardBalance)
  const subRewardBalance = useSelector((state: any) => state.user.subRewardBalance)
  
  return { pendingReward, rewardBalance, subRewardBalance }
}

export const useNFTApprovalStatus = () => {
  const nftStatus = useSelector((state: any) => state.user.nftStatus)
  return nftStatus
}

export const useApprovalStatus = (_account: string | undefined, _changed: boolean) => {
  const dispatch = useAppDispatch()
  const {fastRefresh} = useRefresh()
  
  useEffect(() => {
    const fetchApprove = async (_account: string) => {
      const status = await fetchApprovalStatus(_account)
      dispatch(updateApprovalStatus({nftStatus: status}))
    }
    if (_account) {
      fetchApprove(_account)
    }
  }, [_account, _changed, fastRefresh, dispatch])
}