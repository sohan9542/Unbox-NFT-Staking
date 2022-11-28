import { getStakingContract } from '../contractHelpers'

export const callStakeNFTs = async (provider: any, address: string, ids: number[]) => {
  const stakingContract = getStakingContract(provider)
  // return new Promise(async(resolve, reject) => {
  return  await stakingContract.methods
      .stake(ids)
      .send({ from: address })
      // , (err: any, data: any) => {
      //   if (err) {
      //     reject(err)
      //   }
      //   resolve(data)
      // })
  // })
}

export const callUnstakeNFTs = async (provider: any, address: string, ids: number[]) => {
  const stakingContract = getStakingContract(provider)
  // return new Promise(async(resolve, reject) => {
  return  await stakingContract.methods
      .unstake(ids)
      .send({ from: address })
  //     , (err: any, data: any) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(data)
  //     })
  // })
}

export const callClaim = async (provider: any, address: string) => {
  const stakingContract = getStakingContract(provider)
  // return new Promise(async(resolve, reject) => {
  return  await stakingContract.methods
      .claim()
      .send({ from: address })
  //     , (err: any, data: any) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(data)
  //     })
  // })
}