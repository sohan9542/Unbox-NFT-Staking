import { ethers } from 'ethers'
import { getNFTContractWithoutSigner } from 'utils/contractHelpers'

export const fetchMintData = async () => {
  const nftContract = getNFTContractWithoutSigner()
  console.log("sniper: nftContract: ", nftContract)
  const saleConfig = await nftContract.saleConfig()
  console.log("sniper: saleConfig: ", saleConfig)
  const saleState = await nftContract.getSaleState()
  const totalSupply = await nftContract.totalSupply()
  
  return {
    preSaleStartTime: Number(saleConfig.preSaleStartTime),
    publicSaleStartTime: Number(saleConfig.publicSaleStartTime),
    preSalePrice: Number(ethers.utils.formatEther(saleConfig.preSalePrice)),
    publicSalePrice: Number(ethers.utils.formatEther(saleConfig.publicSalePrice)),
    preSaleLimit: Number(saleConfig.preSaleLimit),
    publicSaleLimit: Number(saleConfig.publicSaleLimit),
    saleState: Number(saleState),
    totalMinted: Number(totalSupply)
  }
}
