import { Routes, Route } from 'react-router-dom'
import CreatePoll from './components/CreatePoll'
import Footer from './components/Footer'
import Header from './components/Header'
import Register from './components/Register'

import Home from './views/Home'
import Vote from './views/Vote'

const App = () => {
  return (
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
  )
}

export default App
