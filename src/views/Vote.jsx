import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPoll } from '../Blockchain.services'
import Contestant from '../images/contestant.jpg'
import { useGlobalState } from '../store'

const Vote = () => {
  const { id } = useParams()
  const [poll] = useGlobalState('poll')

  useEffect(async () => {
    await getPoll(id)
  }, [])

  return (
    <div className='w-3/5 mx-auto'>
      <div className="text-center my-5 p-4">
        <h1 className="text-5xl text-black-600 font-bold">{poll?.title}</h1>
        <p className="pt-5 text-gray-600 text-xl font-medium">{poll?.description}</p>
        <div className="flex justify-center pt-10">
          <div>
            <button
              type="button"
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600
              font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5
              focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Contest
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-center mb-10">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            <div className="flex content-center items-center m-auto">
              <img
                className="w-full h-40 md:h-40 object-cover md:w-48 rounded-lgs md:rounded-none "
                src={Contestant}
                alt=""
              />
            </div>
            <div className="p-6 flex flex-col justify-start ">
              <p className="text-gray-700 text-base mb-4 font-bold">
                Name: Kelechi Prince
              </p>
              <p className="text-gray-700 text-base mb-4">
                Wallet Address: 0x1f...2e5
              </p>
              <div className="p-6 flex justify-start items-center">
                <h2 className="text-gray-600 text-xs">18 votes</h2>
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
        </div>
      </div>
    </div>
  )
}

export default Vote
