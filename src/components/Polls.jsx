import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import { truncate } from '../store'

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
          className="rounded-t-lg object-cover h-48 w-full"
          src={poll.image}
          alt={poll.title}
        />
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium">
            {poll.title}
          </h5>
          <small className="font-bold mb-4 text-xs">
            {new Date().getTime() > Number(poll.startsAt + '000') &&
            Number(poll.endsAt + '000') > Number(poll.startsAt + '000') ? (
              <span className="text-green-700">Started</span>
            ) : new Date().getTime() > Number(poll.endsAt + '000') ? (
              <Moment className="text-red-700" unix format="ddd DD MMM, YYYY">
                {poll.endsAt}
              </Moment>
            ) : (
              <Moment className="text-gray-500" unix format="ddd DD MMM, YYYY">
                {poll.startsAt}
              </Moment>
            )}
          </small>
          <p className="text-gray-700 text-base mb-4">{truncate(poll.description, 100, 0, 103)}</p>
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
