import useRefresh from "hooks/useRefresh"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "state/hooks"
import { fetchMintDataSync } from "."

export const useMintData = () => {
    const dispatch = useAppDispatch()
    const {fastRefresh} = useRefresh()
    
    useEffect(() => {
      dispatch(fetchMintDataSync())
    }, [fastRefresh, dispatch])
}
  
export const useMintInfo = () => {
    const mint = useSelector((state: any) => state.mint)
    return mint
}
  
export const useMintLoading = () => {
    const loading = useSelector((state: any) => state.mint.status)
    return loading
}
  