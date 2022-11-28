import styled from 'styled-components'
import WalletConnectButton from 'components/WalletConnectButton'




const Header = () => {
  
  return (
    <div className=' items-center flex justify-center lg:justify-between flex-col lg:flex-row py-8'>
      <a href="/">
        <img src="/images/Phase 2.png" alt="logo" />
      </a>
      <WalletConnectButton />
    </div>
  )
}

export default Header