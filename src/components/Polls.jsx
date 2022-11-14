import { useNavigate } from 'react-router-dom'

const Polls = () => {
  return (
    <div className="pt-10">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4 gap-6 md:gap-4 lg:gap-4 xl:gap-3 py-2.5 w-4/5
        mx-auto"
      >
        {Array(5)
          .fill()
          .map((poll, i) => (
            <Poll key={i} id={i} />
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

const Poll = ({ id }) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href="#!">
          <img
            className="rounded-t-lg"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Pageantry</h5>
          <p className="text-gray-700 text-base mb-4">
            Enter to vote for your favorite contestant in the Pageantry award
            category
          </p>
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
          active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => navigate('/polls/' + id)}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

export default Polls
