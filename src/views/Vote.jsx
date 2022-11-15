import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPoll, contest, listContestants } from '../Blockchain.services'
import Contestant from '../images/contestant.jpg'
import { useGlobalState, truncate } from '../store'

const Vote = () => {
  const { id } = useParams()
  const [poll] = useGlobalState('poll')
  const [contestants] = useGlobalState('contestants')

  const handleContest = async () => {
    await contest(id)
    console.log('Contested')
  }

  useEffect(async () => {
    await getPoll(id)
    await listContestants(id)
  }, [])

  return (
    <div className="w-3/5 mx-auto">
      <div className="text-center my-5 p-4">
        <h1 className="text-5xl text-black-600 font-bold">{poll?.title}</h1>
        <p className="pt-5 text-gray-600 text-xl font-medium">
          {poll?.description}
        </p>
        <div className="flex justify-center pt-10">
          <div>
            {new Date().getTime() > Number(poll?.startsAt + '000') ? null : (
              <button
                type="button"
                className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600
                font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5
                focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                onClick={handleContest}
              >
                Contest
              </button>
            )}
          </div>
        </div>
      </div>

      {contestants.map((contestant, i) => (
        <Votee key={i} contestant={contestant} />
      ))}
    </div>
  )
}

const Votee = ({ contestant }) => (
  <div className="flex justify-start w-3/5 mx-auto rounded-lg bg-white shadow-lg">
    <div>
      <img
        className="w-40 h-full object-cover rounded-lg md:rounded-none"
        src={contestant?.image}
        alt={contestant?.fullname}
      />
    </div>

    <div className="p-6 flex flex-col justify-start ">
      <p className="text-gray-700 text-base mb-4 font-bold">{contestant?.fullname}</p>
      <p className="text-gray-700 text-base mb-4">{truncate(contestant?.voter, 4, 4, 11)}</p>
      <div className="flex justify-start items-center">
        <span className="text-gray-600 text-sm">{contestant?.votes} votes</span>
        <button
          type="button"
          className="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800
                  font-medium text-xs leading-tight uppercase rounded-full hover:bg-black
                  hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150
                  ease-in-out ml-8"
        >
          vote
        </button>
      </div>
    </div>
  </div>
)

export default Vote
