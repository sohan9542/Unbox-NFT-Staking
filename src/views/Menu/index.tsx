import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from 'views/Header'

const StyledWrapper = styled.div`
  margin-bottom: 70px;
`

const StyledTitle = styled.div`
  font-size: 46px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 30px;
`

const StyledContainers = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`

const StyledActionArea = styled.div`
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
  width: 100%;
  width: 500px;
  background-color: white;
  height: 100px;
  justify-content: center;
  align-items: center;
  display: flex;
`

const Mint = () => {
  return (
    <div className="App">
      <div className='App-Container'>
        <Header />
        <StyledWrapper>
          <StyledTitle>Spectrum Minting and Staking Platform</StyledTitle>
          <StyledContainers>
            <StyledActionArea>
              <Link to="/mint">Mint</Link>
            </StyledActionArea>
            <StyledActionArea>
              <Link to="/stake">Stake</Link>
            </StyledActionArea>
          </StyledContainers>
        </StyledWrapper>
      </div>
    </div>
  )
}

export default Mint