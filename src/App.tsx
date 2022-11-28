import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import './App.css'

// import Staking from 'views/Staking'
import Mint from 'views/Mint'
// import Menu from 'views/Menu'

const App = () => {

  return (
    <RefreshContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mint /> } />
          {/* <Route path="/stake" element={<Staking /> } />
          <Route path="/mint" element={<Mint /> } /> */}
        </Routes>
      </BrowserRouter>
    </RefreshContextProvider>
    
  );
}

export default App;
