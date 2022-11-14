import { useNavigate } from 'react-router-dom'
import { daysRemaining } from '../store'

const Polls = ({ polls }) => {
  return (
    <div className="pt-10">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4 gap-6 md:gap-4 lg:gap-4 xl:gap-3 py-2.5 w-4/5
        mx-auto"
      >
        {polls.map((poll, i) => (
          <Poll key={i} poll={poll} />
        ))}
      </div>

      <div className=" flex justify-center mt-20">
        <button
          type="button"
          className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
          active:shadow-lg transition duration-150 ease-in-out"
        >
          Load More
        </button>
      </div>
    </div>
  )
}

const Poll = ({ poll }) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <img
          className="rounded-t-lg w-full"
          src={poll.image}
          alt={poll.title}
        />
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {poll.title}
          </h5>
          <small className="font-semibold">
            Starts on: <span className="text-red-700 ">{poll.startsAt}</span>
          </small>
          <p className="text-gray-700 text-base mb-4">{poll.description}</p>
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
          active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => navigate('/polls/' + poll.id)}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Polls
