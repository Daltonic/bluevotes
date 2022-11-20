import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { getPoll, contest, listContestants, vote } from '../Blockchain.services'
import { useGlobalState, setGlobalState, truncate } from '../store'
import Moment from 'react-moment'
import Identicon from 'react-identicons'
import Messages from '../components/Messages'
import { createNewGroup, getGroup, joinGroup } from '../Chat.services'

const Vote = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [poll] = useGlobalState('poll')
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [currentUser] = useGlobalState('currentUser')
  const [contestants] = useGlobalState('contestants')
  const [group, setGroup] = useState(null)

  const handleContest = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await contest(id)
          .then(() => resolve())
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Contested, will reflect within 30sec 👌',
        error: 'Encountered error 🤯',
      },
    )
  }

  const handleGroup = async () => {
    await getGroup(`pid_${id}`).then(async (res) => {
      if (
        res.code &&
        res.code == 'ERR_GUID_NOT_FOUND' &&
        connectedAccount == poll?.director
      ) {
        await createNewGroup(`pid_${id}`, poll?.title)
      } else if (!res.code && !res.hasJoined) {
        await joinGroup(`pid_${id}`)
        setGroup(res)
      } else if (!res.code) {
        setGroup(res)
      } else {
        console.log(res)
      }
    })
  }

  useEffect(async () => {
    await getPoll(id)
    await listContestants(id)
    if (!currentUser) {
      toast('Please, register and login in first...')
      navigate('/')
    }
    await handleGroup()
  }, [])

  return (
    <div className="w-full md:w-4/5 mx-auto p-4">
      <div className="text-center my-5">
        <img
          className="w-full h-40 object-cover mb-4"
          src={poll?.image}
          alt={poll?.title}
        />
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

        <div className="flex justify-center items-center space-x-2 my-2 text-sm">
          <span className="text-gray-500">{poll?.votes} Votes</span>
          <span className="text-gray-500">{poll?.contestants} Contestants</span>
        </div>

        <div className="flex justify-center my-3">
          {new Date().getTime() >
          Number(poll?.startsAt + '000') ? null : poll?.deleted ? null : (
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

              {connectedAccount == poll?.director ? (
                <>
                  <button
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-gray-600 text-gray-600
                 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5
                 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    onClick={() =>
                      setGlobalState('updatePollModal', 'scale-100')
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-block px-6 py-2 border-2 border-red-600 text-red-600
                 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5
                 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    onClick={() =>
                      setGlobalState('deletePollModal', 'scale-100')
                    }
                  >
                    Delete
                  </button>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-3/4 mx-auto">
        <div className="flex flex-col items-center">
          {contestants.length > 0 ? (
            <h4 className="text-lg font-medium uppercase mt-6 mb-3">
              Contestants
            </h4>
          ) : null}

          {contestants.map((contestant, i) => (
            <Votee key={i} contestant={contestant} poll={poll} />
          ))}
        </div>
        {group ? (
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-medium uppercase mt-6 mb-3">
              Live Chats
            </h4>
            <Messages guid={`pid_${id}`} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

const Votee = ({ contestant, poll }) => {
  const handleVote = async (id, cid) => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await vote(id, cid)
          .then(() => resolve())
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Voted, will reflect within 30sec 👌',
        error: 'Encountered error 🤯',
      },
    )
  }

  return (
    <div className="flex justify-start w-full mx-auto rounded-lg bg-white shadow-lg my-2">
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
          <span className="text-gray-600 text-sm">
            {contestant?.votes} votes
          </span>
          {new Date().getTime() > Number(poll?.startsAt + '000') &&
          Number(poll?.endsAt + '000') > new Date().getTime() ? (
            <button
              type="button"
              className="inline-block px-3 py-1 border-2 border-gray-800 text-gray-800
                  font-medium text-xs leading-tight uppercase rounded-full hover:bg-black
                  hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150
                  ease-in-out ml-8"
              onClick={() => handleVote(poll?.id, contestant?.id)}
            >
              Vote
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Vote
