import Hero from '../components/Hero'
import Polls from '../components/Polls'
import { useGlobalState } from '../store'

const Home = () => {
  const [polls] = useGlobalState('polls')

  return (
    <div>
      <Hero />
      <Polls polls={polls.filter((poll) => !poll.deleted)} />
    </div>
  )
}

export default Home
