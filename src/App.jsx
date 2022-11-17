import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { getPolls, getUser, isWallectConnected } from './Blockchain.services'
import { ToastContainer } from 'react-toastify'
import CreatePoll from './components/CreatePoll'
import DeletePoll from './components/DeletePoll'
import Footer from './components/Footer'
import Header from './components/Header'
import Register from './components/Register'
import UpdatePoll from './components/UpdatePoll'

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
      <DeletePoll />
      <CreatePoll />
      <UpdatePoll />
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  ) : null
}

export default App
