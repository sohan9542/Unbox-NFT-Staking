import BigNumber from 'bignumber.js'
import ERC721ABI from 'config/abis/erc721.json'
import { getAddress, getNFTAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import { NFTConfig } from 'config/nfts'

export const fetchNFTTokenBalances = async (account: string) => {
  const nftAddress = getNFTAddress()
  const calls = [
    {
      address: nftAddress,
      name: 'balanceOf',
      params: [account],
    }
  ]

  const rawTokenBalances = await multicall(ERC721ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance: any) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchNFTTokenIds = async (account: string, balance: number) => {
  const calls = []
  const nftAddress = getNFTAddress()
  for (let i = 0; i < balance; i ++) {
    const callData =  {
      address: nftAddress,
      name: 'tokenOfOwnerByIndex',
      params: [account, i],
    }
    calls.push(callData)
  }

  const rawTokenIds = await multicall(ERC721ABI, calls)
  const parsedTokenIds = rawTokenIds.map((tokenBalance: any) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenIds
}

export const fetchNFTBaseUri = async (nfts: NFTConfig[]) => {
  const calls = nfts.map((nft) => {
    const nftAddress = getAddress(nft.address)
    return {
      address: nftAddress,
      name: 'baseTokenURI',
    }
  })

  const rawBaseUri = await multicall(ERC721ABI, calls)
  
  return rawBaseUri
}