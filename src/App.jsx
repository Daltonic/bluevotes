import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Joinpollform from './components/Joinpollform'

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

      <Joinpollform />
      <Footer />
    </div>
  )
}

export default App
