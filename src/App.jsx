import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getPolls, getUser, isWallectConnected } from './Blockchain.services'
import CreatePoll from './components/CreatePoll'
import Footer from './components/Footer'
import Header from './components/Header'
import Register from './components/Register'

import Home from './views/Home'
import Vote from './views/Vote'

const App = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await isWallectConnected().then(async () => {
      console.log('Blockchain loaded')
      await getPolls()
      await getUser()
      setLoaded(true)
    })
  }, [])

  return loaded ? (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/polls/:id" element={<Vote />} />
      </Routes>

      <Register />
      <CreatePoll />
      <Footer />
    </div>
  ) : null
}

export default App
