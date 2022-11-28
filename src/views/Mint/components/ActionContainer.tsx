import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useWeb3Context } from 'hooks/useWeb3Context'
import { callMintForPresale, callMintForPublicSale } from 'utils/calls'
import { useMintData, useMintInfo, useMintLoading } from 'state/mint/hooks'
import { SaleState } from 'state/mint'
import action_back from 'assets/images/action-background.svg'

const StyledContainer = styled.div`
  height: 800px;
  width: 800px;
  
  background-image: url(${action_back});
`

const StyledActionsArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px 0px;
  border-radius: 16px;
  margin-bottom: 50px;
`

const StyledTotalMintedPanel = styled.div`
  font-size: 28px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px
`

const StyledButton = styled.button`
  align-items: center;
  justify-content: center;
  display: flex;
  font-family: "Adobe Garamond Pro Regular";
  font-size: 1.7rem;
  font-weight: 600;
  fill: #141414;
  color: #141414;
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: #ffffff;
  padding: 11px 70px 11px 70px;
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

const StyledTitle = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 36px;
  font-weight: bold;
`

const StyledLeftArrowButton = styled.div`
  color: white;
  width: 0px;
  height: 0px;
  border: 30px solid black;
  border-top-color: transparent;
  border-right-color: white;
  border-bottom-color: transparent;
  border-left-color: transparent;
  cursor: pointer;
`

const StyledRightArrowButton = styled.div`
  color: white;
  width: 0px;
  height: 0px;
  border: 30px solid black;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: white;
  cursor:pointer;
`

const StyledNumPanel = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 15px
`

const StyledNumBox = styled.div`
  display: flex;  
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  font-size: 30px;
  color: black;
  width: 50px;
  margin-right: 20px;
  margin-left: 20px;
`

const StyledPricePanel = styled.div`
  font-size: 26px;
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 30px;
`

interface Props {
  type: string
}

const ActionContainer: React.FC<Props> = ({ type }) => {
  const web3Context = useWeb3Context()

  const [mintNum, setMintNum] = useState(1)
  const [pending, setPending] = useState(false)

  useMintData()
  const saleInfo = useMintInfo()
  console.log("sniper: saleInfo: ", saleInfo)
  const price = saleInfo.saleState === SaleState.PreSale? saleInfo.preSalePrice :
                saleInfo.saleState === SaleState.PublicSale?  saleInfo.publicSalePrice : 0 
  const mintLimit = saleInfo.saleState === SaleState.PreSale? saleInfo.preSaleLimit :
                saleInfo.saleState === SaleState.PublicSale?  saleInfo.publicSaleLimit : 0 
  const remainTime =  saleInfo.saleState === SaleState.Preparing? saleInfo.preSaleStartTime :
                      saleInfo.saleState === SaleState.PreSale?  saleInfo.publicSaleStartTime :
                      saleInfo.saleState === SaleState.PublicSale?  saleInfo.publicSaleStartTime + 86400 * 10 : 0 
  const loading = useMintLoading()

  console.log("sniper: saleinfo: ", saleInfo)

  
  const handleMint = async () => {
    if(loading !== 'fulfilled') {
      return
    }
    setPending(true)
    try {
      if (web3Context?.provider && web3Context?.account) {
        if(saleInfo.saleState === SaleState.PreSale) {
          await callMintForPresale(web3Context?.provider, web3Context?.account, mintNum, price)
        } else if(saleInfo.saleState === SaleState.PublicSale) {
          await callMintForPublicSale(web3Context?.provider, web3Context?.account, mintNum, price)
        }
        
        setPending(false)
      }
    } catch {
      setPending(false)
    }
  }

  const handleConnectWallet = async () => {
    await web3Context?.connectWallet()
  }

  const handleDecreaseNumber = () => {
    if (mintNum > 1){
      const tmp = mintNum - 1;
      setMintNum(tmp);
    }    
  }

  const handleIncreaseNumber = () => {
    const tmp = mintNum + 1;
    if (mintNum < mintLimit){
      setMintNum(tmp);
    } 
  }

  return (
    <StyledContainer>
      {/* <StyledTitle>
        <div>Mint Your Spectrum</div>
      </StyledTitle>
      <StyledTotalMintedPanel>
        <div style={{marginRight: '20px'}}>Total Minted:</div>
        <div style={{marginLeft: '20px'}}>{`100/${saleInfo.totalMinted}`}</div>
      </StyledTotalMintedPanel>
      <StyledNumPanel>
        <StyledLeftArrowButton onClick={handleDecreaseNumber} />
        <StyledNumBox className='numpanel perfect-center' >
          {mintNum}
        </StyledNumBox>
        <StyledRightArrowButton onClick={handleIncreaseNumber}/>
      </StyledNumPanel>
      <StyledPricePanel>
        <div>{`Total ${Number((price * mintNum).toFixed(5))}ETH`}</div>
      </StyledPricePanel>
      <StyledActionsArea>
        <StyledButton onClick={web3Context?.account? handleMint : handleConnectWallet}>
          { !web3Context?.account ? 'Connect Wallet' : pending ? 'Minting' : 'Mint' }
          { pending && <RotateImage src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Spinner_font_awesome.svg" alt="renew" /> }
        </StyledButton>
      </StyledActionsArea> */}
    </StyledContainer>
  )
}

export default ActionContainer