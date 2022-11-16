import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPoll, contest, listContestants } from '../Blockchain.services'
import { useGlobalState, setGlobalState, truncate } from '../store'
import Moment from 'react-moment'
import Identicon from 'react-identicons'

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
    <div className="w-full md:w-4/5 mx-auto p-4">
      <div className="text-center my-5">
        <h1 className="text-5xl text-black-600 font-bold">{poll?.title}</h1>
        <p className="pt-5 text-gray-600 text-xl font-medium">
          {poll?.description}
        </p>

        <div className="flex justify-center items-center space-x-2 my-2 text-sm">
          <Moment className="text-gray-500" unix format="ddd DD MMM, YYYY">
            {poll?.startsAt}
          </Moment>
          <span> - </span>
          <Moment className="text-gray-500" unix format="ddd DD MMM, YYYY">
            {poll?.endsAt}
          </Moment>
        </div>

        <div className="flex justify-center items-center space-x-2 text-sm">
          <Identicon
            string={poll?.director}
            size={25}
            className="h-10 w-10 object-contain rounded-full"
          />
          <span className="font-bold">
            {poll?.director ? truncate(poll?.director, 4, 4, 11) : '...'}
          </span>
        </div>

        <div className="flex justify-center my-3">
          {new Date().getTime() > Number(poll?.startsAt + '000') ? null : (
            <div className="flex space-x-2">
              <button
                type="button"
                className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600
                font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5
                focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                onClick={handleContest}
              >
                Contest
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2 border-2 border-gray-600 text-gray-600
                font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5
                focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                onClick={() => setGlobalState('updatePollModal', 'scale-100')}
              >
                Edit
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2 border-2 border-red-600 text-red-600
                font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5
                focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h4 className="text-lg font-medium uppercase mt-6 mb-3">Contestants</h4>
        {contestants.map((contestant, i) => (
          <Votee key={i} contestant={contestant} poll={poll} />
        ))}
      </div>
    </div>
  )
}

const Votee = ({ contestant, poll }) => (
  <div className="flex justify-start w-full md:w-3/5 mx-auto rounded-lg bg-white shadow-lg">
    <div>
      <img
        className="w-40 h-full object-cover rounded-lg md:rounded-none"
        src={contestant?.image}
        alt={contestant?.fullname}
      />
    </div>

    <div className="p-6 flex flex-col justify-start ">
      <p className="text-gray-700 text-base font-bold">
        {contestant?.fullname}
      </p>

      <div className="flex justify-start items-center space-x-2 text-sm my-2">
        <Identicon
          string={contestant?.voter}
          size={20}
          className="h-10 w-10 object-contain rounded-full"
        />
        <span className="font-bold">
          {truncate(contestant?.voter, 4, 4, 11)}
        </span>
      </div>

      <div className="flex justify-start items-center">
        <span className="text-gray-600 text-sm">{contestant?.votes} votes</span>
        {new Date().getTime() > Number(poll?.startsAt + '000') ? (
          <button
            type="button"
            className="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800
                  font-medium text-xs leading-tight uppercase rounded-full hover:bg-black
                  hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150
                  ease-in-out ml-8"
          >
            Vote
          </button>
        ) : null}
      </div>
    </div>
  </div>
)

export default Vote
