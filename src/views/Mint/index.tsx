import styled from 'styled-components'
import Header from '../Header'
import ActionContainer from './components/ActionContainer'




const Mint = () => {
  return (
    <div className="App">
      <div className='App-Container'>
        <Header />
        <div className=' flex items-center justify-center w-full'>
          <div className=' relative hidden lg:block' >
            <img src="/images/Group 15.svg" className=' hidden lg:block' alt="" />

            <div className=' absolute top-0 left-0 w-full h-full z-20'>
              <div className=' flex items-center justify-center w-full'>
                <img src="/images/logo.svg" alt="" />
              </div>
              <div className=' flex items-center justify-center w-full'>
                <img src="/images/Group 22.png" alt="" />
              </div>
              <div className=' flex items-center justify-around w-full'>
                <p className=' uppercase text-2xl text-white'>price</p>
                <p className=' uppercase text-2xl text-white'>0.07 eth</p>
              </div>
              <div className=' flex items-center justify-center w-full'>
                <p className=' uppercase text-sm text-white'>total supply</p>


              </div>
              <p className=' uppercase text-lg text-white w-full text-center pt-2'>0000/8888</p>
              <p className=' uppercase text-lg  w-full text-center pt-6' style={{ color: "#ACBB54" }}>Your wallet is whitelisted</p>
            </div>
            <div className=' absolute bottom-8 left-0 w-full flex items-center justify-center z-30'>
              <div className=' h-16 relative cursor-pointer'>
                <img src="/images/Group 21.svg" className=' object-contain  h-full' alt="" />
                <div className=' absolute top-3 left-0 w-full  z-40 flex items-center justify-center'>
                  <h1 className=' uppercase text-2xl ' style={{ color: "#FBD000" }}>mint nft</h1>
                </div>
              </div>
            </div>
          </div>
          <div className=' relative block lg:hidden' style={{ height: "750px" }} >
            <img src="/images/Group 15.png" className=' h-full' alt="" />

            <div className=' absolute top-0 left-0 w-full h-full z-20 px-8'>
              <div className=' flex items-center justify-center mt-9 w-full'>
                <img src="/images/Phase 2.png" className=' h-12' alt="" />
              </div>
              <div className=' flex items-center justify-center w-full'>
                <img src="/images/Group 22.png" className=' w-full object-cover' alt="" />
              </div>
              <div className=' flex items-center justify-between px-10 w-full pt-2'>
                <p className=' uppercase text-2xl text-white'>price</p>
                <p className=' uppercase text-2xl text-white'>0.07 eth</p>
              </div>
              <div className=' flex items-center justify-around w-full px-4 pt-2'>
                <img src="/images/Group 18.png" className=' w-full' alt="" />
              </div>

              <div className=' flex items-center justify-around w-full pt-3'>
                <img src="/images/Group 8.png" alt="" />
                <div>
                  <p className=' uppercase text-xl text-white'>total supply</p>
                  <p className=' uppercase text-lg text-white w-full text-center pt-2'>0000/8888</p>
                </div>
                <img src="/images/Group 9.png" alt="" />
              </div>
              <div className=' flex items-center justify-around w-full px-4 pt-2'>
                <img src="/images/Group 19.png" className=' w-full' alt="" />
              </div>
              <p className=' uppercase text-lg  w-full text-center pt-6' style={{ color: "#ACBB54" }}>Your wallet is whitelisted</p>
            </div>
            <div className=' absolute bottom-8 left-0 w-full flex items-center justify-center z-30'>
              <div className=' h-16 relative cursor-pointer'>
                <img src="/images/Group 21.svg" className=' object-contain  h-12' alt="" />
                <div className=' absolute top-2 left-0 w-full  z-40 flex items-center justify-center'>
                  <h1 className=' uppercase text-xl ' style={{ color: "#FBD000" }}>mint nft</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint