import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { useWeb3Context } from 'hooks/useWeb3Context'
import { NFTData } from 'state/user'
import { useNFT, useStakedNFT, useBalances, useNFTUserData } from 'state/user/hooks'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { callClaim } from 'utils/calls'
import Header from '../Header'
import ActionContainer from './components/ActionContainer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledWrapper = styled.div`
  margin-bottom: 70px;
`

const StyledTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`

const StyledContainers = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const StyledActionArea = styled.div`
  margin-top: 10px;
  width: 98%;
`

const StyledBalanceTitle = styled.div`
  font-size: 30px;
`

const StyledBalanceContainer = styled.div`
  max-width: 1200px;
  padding: 20px;
  border: 3px solid #ffffff;
  border-radius: 10px;
  margin-top: 30px;
`

const StyledBalanceArea = styled.div`
  display: flex;
  justify-content: space-between;  
`

const StyledBalanceInfo = styled.div<{width: string, type: string}>`
  width: ${({ width }) => width};
  border: 2px solid #ffffff;
  margin: 0 5px;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: ${({ type }) => type === 'button' ? 'pointer' : 'normal'};
`

const StyledBalanceInfoTitle = styled.div`
  font-size: 18px;
`

const StyledValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`

const StyledDescription = styled.div`
  font-size: 18px;
`

const StyledButton = styled.button`
  align-items: center;
  justify-content: center;
  display: flex;
  font-family: "Adobe Garamond Pro Regular";
  font-size: 1.4rem;
  font-weight: 600;
  fill: #141414;
  color: #141414;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: #ffffff;
  padding: 11px 20px 11px 20px;
  cursor: pointer;
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotateImage = styled.img`
  animation: ${rotate} 2s linear infinite;
  width: 23px;
  margin-left: 5px;
`
interface BalanceInfoProps { 
  title: string,
  value: string,
  width?: string,
  as?: string,
  event?: () => void
}

const Staking = () => {
  const web3Context = useWeb3Context()
  const [pendingClaim, setPendingClaim] = useState(false)

  const [reload, setReload] = useState(false)

  useNFTUserData(web3Context?.account, reload)
  
  const nftsOnWallet: NFTData[] = useNFT()
  const nftsOnStaking: NFTData[] = useStakedNFT()
  const balance = useBalances()

  const handleClaim = async () => {
    setPendingClaim(true)
    try {
      if (web3Context?.provider && web3Context?.account) {
        await callClaim(web3Context?.provider, web3Context?.account)
        setReload(!reload)
      } else {
        toast.warn('Check the wallet connection.', {
          position: "top-center",
          theme: "dark",
          });
        }
    } catch (error) {
    }
    setPendingClaim(false)
  }

  const BalanceInfo: React.FC<BalanceInfoProps> = ({ title, value, width = 'auto', as = 'text', event }) => {
    return (
      <StyledBalanceInfo width={width} type={as} onClick={event ? event : ()=>{}} >
        <StyledBalanceInfoTitle>{title}</StyledBalanceInfoTitle>
        <StyledValue>{value}</StyledValue>
      </StyledBalanceInfo>
    )
  }

  return (
    <div className="App">
      <ToastContainer />
      <div className='App-Container'>
        <Header />
        <StyledWrapper>
          <StyledTitle>Spectrum NFT Staking Platform</StyledTitle>
          <StyledDescription>
            <div>Earn $ALT by staking your Spectrum NFTs. 1 Spectrum NFT earns 10 $ALT a day.</div>
            <div>Stake long time to get bonus.</div>
          </StyledDescription>
          <StyledBalanceContainer>
            <StyledBalanceArea>              
              <StyledBalanceArea>
                <BalanceInfo title="$ALT Claimable" value={getFullDisplayBalance(new BigNumber(balance.pendingReward))} />
                {/* <BalanceInfo title="Claim" value="$BOX" as="button" event={handleClaim} /> */}
                <StyledButton onClick={handleClaim}>
                  { pendingClaim ? 'Process' : 'Claim $ALT' }
                  { pendingClaim && <RotateImage src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Spinner_font_awesome.svg" alt="renew" /> }
                </StyledButton>
              </StyledBalanceArea>
              <BalanceInfo title="$ALT Balance" value={getFullDisplayBalance(new BigNumber(balance.rewardBalance))} />
            </StyledBalanceArea>
          </StyledBalanceContainer>
          <StyledBalanceContainer>
            <StyledBalanceArea>
              <BalanceInfo title="Spectrum NFT Balance" value={(nftsOnWallet.length + nftsOnStaking.length).toString()} width="100%" />
              <BalanceInfo title="Not Staked" value={nftsOnWallet.length.toString()} width="100%" />
              <BalanceInfo title="Staked" value={nftsOnStaking.length.toString()} width="100%" />
            </StyledBalanceArea>
          </StyledBalanceContainer>
          <StyledContainers>
            <StyledActionArea>
              <StyledBalanceTitle>Not Staked</StyledBalanceTitle>
              <ActionContainer type="stake" reload={reload} setReload={setReload}/>
            </StyledActionArea>
            <StyledActionArea>
              <StyledBalanceTitle>Staked</StyledBalanceTitle>
              <ActionContainer type="unstake"  reload={reload} setReload={setReload}/>
            </StyledActionArea>
          </StyledContainers>
        </StyledWrapper>
      </div>
    </div>
  )
}

export default Staking