import { BIG_TEN } from 'utils/bigNumber'
import { parseUnits } from 'ethers/lib/utils'

export const INFURA_ID = 'PkSg__OS-7f9zA6VGKy5UDEx1V28aD5-'
// export const RPC_URL = 'https://eth-mainnet.alchemyapi.io/v2/PkSg__OS-7f9zA6VGKy5UDEx1V28aD5-' // eth - mainnet
export const RPC_URL = 'https://eth-goerli.alchemyapi.io/v2/PkSg__OS-7f9zA6VGKy5UDEx1V28aD5-' // goerli - testnet
export const CHAIN = 5

export const NFT_IPFS = 'https://product.mypinata.cloud/ipfs/QmZDpxWXtS1zCMvW4oV7KV8vmdnbgiSH4We1tKVMAvWsc5'

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000


export enum GAS_PRICE {
  default = '5',
  fast = '6',
  instant = '7',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}