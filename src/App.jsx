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

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from '@web3modal/ethereum'
import { useWeb3ModalTheme, Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { localhost } from 'wagmi/chains'
import { setGlobalState } from './store'

const chains = [localhost]

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: '7101921d84ad9726b009f44fc01ebf3f' }),
])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'web3Modal', chains }),
  provider,
})

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains)

const App = () => {
  const [loaded, setLoaded] = useState(false)
  const { setTheme } = useWeb3ModalTheme()

  useEffect(async () => {
    const account = ethereumClient.getAccount()
    if (account.address) {
      setGlobalState('connectedAccount', account.address)
    }

    ethereumClient.watchAccount(async (account) => {
      if (account.address) {
        setGlobalState('connectedAccount', account.address)
        await getPolls()
        await getUser()
      } else {
        setGlobalState('connectedAccount', '')
      }
    })

    // await isWallectConnected()

    setLoaded(true)
    console.log('Blockchain loaded')
  }, [])

  setTheme({
    themeColor: 'blue',
    themeMode: 'light',
    themeBackground: 'themeColor',
  })

  return (
    <div className="min-h-screen">
      <WagmiConfig client={wagmiClient}>
        <Header />
        {loaded ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/polls/:id" element={<Vote />} />
          </Routes>
        ) : null}

        <Register />
        <DeletePoll />
        <CreatePoll />
        <UpdatePoll />
        <Footer />
      </WagmiConfig>

      <Web3Modal
        projectId="7101921d84ad9726b009f44fc01ebf3f"
        ethereumClient={ethereumClient}
      />

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
  )
}

export default App
