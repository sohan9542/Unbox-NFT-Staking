import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { NFTData } from 'state/user'
import { useNFT, useStakedNFT, useNFTApprovalStatus, useApprovalStatus } from 'state/user/hooks'
import { useWeb3Context } from 'hooks/useWeb3Context'
import { callStakeNFTs, callUnstakeNFTs, callApproveForAll } from 'utils/calls'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled.div`
  color: white;
  width: 100%;
  height: 600px;
  margin-top: 10px;
  border: 4px solid #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px #ffffff;
`

const StyledActionsArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #00000000;
  border-radius: 16px;
`

const StyledNFTArea = styled.div`
  height: 475px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  margin: 30px;
  overflow: overlay;
  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const StyledNFTImage = styled.img`
  width: 200px;
  height: 200px;
  min-width: 200px;
  min-height: 200px;
  border: 2px solid #ffffff;
  border-radius: 10px;
  margin: 20px auto;
`

const StyledCheckImage = styled.img`
  width: 40px;
  position: relative;
  top: -222px;
  right: -160px;
  cursor: pointer;
  display: flex;
  justify-content: end;
  background: #123123;
  text-align: right;
  align-items: end;
  border: 1px solid;
  border-radius: 40px;
  align-items: center;
  @media only screen and (max-width: 800px) {
    right: -200px;
  }
`

const StyledDetailArea = styled.div`
  width: 50px;
  position: relative;
  bottom: 100px;
  right: -150px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  background: #123123;
  text-align: center;
  align-items: center;
  border: 1px solid;
  border-radius: 40px;
  align-items: center;
  @media only screen and (max-width: 800px) {
    right: -200px;
  }
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

const StyledItem = styled.div`
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

interface Props {
  type: string
  reload: boolean
  setReload: (reload: boolean) => void
}

const ActionContainer: React.FC<Props> = ({ type, reload, setReload }) => {
  const web3Context = useWeb3Context()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [changed, setChanged] = useState(false)
  const [approveProgress, setApproveProgress] = useState(false)
  const [pendingStake, setPendingStake] = useState(false)
  const [pendingUnStake, setPendingUnStake] = useState(false)

  useApprovalStatus(web3Context?.account, approveProgress)

  const nftsOnWallet: NFTData[] = useNFT()
  const nftsOnStaking: NFTData[] = useStakedNFT()

  const nfts = type === 'stake' ? nftsOnWallet : nftsOnStaking
  
  const approvalStatus = useNFTApprovalStatus()

  const handleSelect = (id: number) => {
    const items = selectedItems
    if (!items.includes(id)) {
      items.push(id)
      items.sort()
      setSelectedItems(items)
    } else {
      const filteredItems = items.filter((item) => item !== id )
      setSelectedItems(filteredItems)
    }
    setChanged(!changed)
  }

  const handleStake = async () => {
    if(selectedItems.length === 0) {
      toast.warn('Please select the NFTs you want to stake!', {
        position: "top-center",
        theme: "dark",
        });
      return
    }
    
    setPendingStake(true)    
    try {    
      if (web3Context?.provider && web3Context?.account) {
          await callStakeNFTs(web3Context?.provider, web3Context?.account, selectedItems)
          setSelectedItems([])
          setReload(!reload)
      } else {
        toast.warn('Check the wallet connection.', {
          position: "top-center",
          theme: "dark",
          });
      }
    } catch (error) {
      console.error(error)
    }
    setPendingStake(false)
  }

  const handleUnstake = async () => {
    if(selectedItems.length === 0) {
      toast.warn('Please select the NFTs you want to unstake!', {
        position: "top-center",
        theme: "dark",
        });
      return
    }

    setPendingUnStake(true)    
    try {    
      if (web3Context?.provider && web3Context?.account) {
        await callUnstakeNFTs(web3Context?.provider, web3Context?.account, selectedItems)
        setSelectedItems([])
        setReload(!reload)
      } else {
        toast.warn('Check the wallet connection.', {
          position: "top-center",
          theme: "dark",
          });
      }
    } catch (error) {
      console.error(error)
    }
    setPendingUnStake(false)
  }

  const handleApprove = async () => {
    setApproveProgress(true)
    try {
      if (web3Context?.provider && web3Context?.account) {
        await callApproveForAll(web3Context?.provider, web3Context?.account, true)
      } else {        
        toast.warn('Check the wallet connection.', {
          position: "top-center",
          theme: "dark",
          });
      }
    } catch {
    }
    setApproveProgress(false)
  }

  useEffect(() => {
    if (approvalStatus[0]) {
      setApproveProgress(false)
    }
  }, [approvalStatus, approvalStatus[0]])

  return (
    <StyledContainer>
      <ToastContainer />
      <StyledNFTArea>
        {nfts.map((nft, index) => {
          const isChecked = selectedItems.includes(nft.id)
          return (
            <StyledItem onClick={() => handleSelect(nft.id)} key={index}>
              {/* <StyledNFTImage src={nft.image} alt={index.toString()} /> */}
              <StyledNFTImage src="images/background1.jpg" alt={index.toString()} />
              <StyledCheckImage src={isChecked ? "images/check.png" : "images/uncheck.png"} alt="check" />
              <StyledDetailArea>
                {nft.id}
              </StyledDetailArea>
            </StyledItem>
          )
        })}
      </StyledNFTArea>
      { type === "stake" ? 
        ( !approvalStatus[0] ? 
          <StyledActionsArea>
            <StyledButton onClick={handleApprove}>
              { approveProgress ? 'Approving' : 'Approve' }
              { approveProgress && <RotateImage src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Spinner_font_awesome.svg" alt="renew" /> }
            </StyledButton>
          </StyledActionsArea>
          :
          <StyledActionsArea>
            <StyledButton onClick={handleStake}>
              { pendingStake ? 'Process' : 'Stake' }
              { pendingStake && <RotateImage src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Spinner_font_awesome.svg" alt="renew" /> }
            </StyledButton>
          </StyledActionsArea>
        )
        :
        <StyledActionsArea>          
          <StyledButton onClick={handleUnstake}>
              { pendingUnStake ? 'Process' : 'UnStake' }
              { pendingUnStake && <RotateImage src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Spinner_font_awesome.svg" alt="renew" /> }
            </StyledButton>
        </StyledActionsArea>
      }
    </StyledContainer>
  )
}

export default ActionContainer