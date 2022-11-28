import React from 'react'
import styled from 'styled-components'
import { useWeb3Context } from 'hooks/useWeb3Context'

const StyledConnectButtonPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: 'images/wallet-button.svg';
`

const StyledConnectButton = styled.button`
  position: relative;
  font-family: "Adobe Garamond Pro Regular";
  font-size: 1.7rem;
  font-weight: 600;
  cursor: pointer;
  background: url('assets/images/wallet-button.svg');
`

const WalletConnectButton = () => {
  const web3Context = useWeb3Context()

  const displayAddress =  `${web3Context?.account.substring(0, 4)}...${web3Context?.account.substring(web3Context?.account.length - 4)}`
  
  return (
    <>
     <button className=' relative' onClick={web3Context?.disconnect}>
         
         <img src='/images/Group 13.png' alt='wallet' />
       <div className=' absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 text-2xl'>
       {web3Context?.account ? 'Disconnect' : 'Connect Wallet'}
       </div>
       </button>
    </>
  )
}

export default WalletConnectButton