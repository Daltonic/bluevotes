import { Web3Button } from '@web3modal/react'
import { useEffect } from 'react'
import { useGlobalState } from '../store'

const ConnectButton = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  useEffect(() => {}, [connectedAccount])
  return <Web3Button />
}

export default ConnectButton