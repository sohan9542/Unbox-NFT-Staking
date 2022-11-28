import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'state'
import { fetchMintData } from './fetchMintData'

export enum SaleState {
    Preparing, PreSale, PublicSale, End
}

export interface MintData {
    preSaleStartTime: number
    publicSaleStartTime: number
    preSalePrice: number
    publicSalePrice: number
    preSaleLimit: number
    publicSaleLimit: number
    saleState: SaleState
    totalMinted: number
    status: 'idle' | 'loading' | 'failed' | 'fulfilled'
}

interface MintDataResponse {
    preSaleStartTime: number
    publicSaleStartTime: number
    preSalePrice: number
    publicSalePrice: number
    preSaleLimit: number
    publicSaleLimit: number
    saleState: SaleState
    totalMinted: number
}

const initialState: MintData = {
    preSaleStartTime: 0,
    publicSaleStartTime: 0,
    preSalePrice: 0,
    publicSalePrice: 0,
    preSaleLimit: 0,
    publicSaleLimit: 0,
    saleState: SaleState.Preparing,
    totalMinted: 0,
    status: 'idle',
}

export const fetchMintDataSync = createAsyncThunk<MintDataResponse>(
  'user/fetchMintData',
  async () => {
    return await fetchMintData()
  }
)

export const mintSlice = createSlice({
  name: 'mint',
  initialState,
  reducers: {
    updateMintDataWithEmpty: (state) => {
        state.preSaleStartTime = 0
        state.publicSaleStartTime = 0
        state.preSalePrice = 0
        state.publicSalePrice = 0
        state.preSaleLimit = 0
        state.publicSaleLimit = 0
        state.saleState = SaleState.Preparing
        state.totalMinted = 0
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMintDataSync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMintDataSync.fulfilled, (state, action) => {
        state.preSaleStartTime = action.payload.preSaleStartTime
        state.publicSaleStartTime = action.payload.publicSaleStartTime
        state.preSalePrice = action.payload.preSalePrice
        state.publicSalePrice = action.payload.publicSalePrice
        state.preSaleLimit = action.payload.preSaleLimit
        state.publicSaleLimit = action.payload.publicSaleLimit
        state.saleState = action.payload.saleState
        state.totalMinted = action.payload.totalMinted
        state.status = 'fulfilled'
      })
      .addCase(fetchMintDataSync.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { updateMintDataWithEmpty } = mintSlice.actions

export default mintSlice.reducer
