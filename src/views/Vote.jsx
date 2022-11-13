import React from 'react'
import Contestant from '../images/contestant.jpg'

const Vote = () => {
  return (
    <div>
      <div className="text-center mt-10 p-4">
        <h1 className="text-5xl text-black-600 font-bold">PAGEANTRY</h1>
        <p className="pt-5 text-gray-600 text-xl font-medium">
          This online voting system offers the highest level of transparency,
          control, security <br></br>and efficiency of election processes using
          the <strong>Blockchain Technology</strong>
        </p>
        <div className="flex justify-center pt-10">
          <div>
            <button
              type="button"
              class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Contest
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div class="flex justify-center mb-10">
          <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            <div className="flex content-center items-center m-auto">
              <img
                class="w-full h-40 md:h-40 object-cover md:w-48 rounded-lgs md:rounded-none md:rounded-lg "
                src={Contestant}
                alt=""
              />
            </div>
            <div class="p-6 flex flex-col justify-start ">
              <p class="text-gray-700 text-base mb-4 font-bold">
                Name: Kelechi Prince
              </p>
              <p class="text-gray-700 text-base mb-4">
                Wallet Address: 0x1f...2e5
              </p>
              <div class="p-6 flex justify-start items-center">
                <h2 class="text-gray-600 text-xs">18 votes</h2>
                <button
                  type="button"
                  class="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out ml-8"
                >
                  vote
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mb-10">
          <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            <div className="flex content-center items-center m-auto">
              <img
                class="w-full h-40 md:h-40 object-cover md:w-48 rounded-lg md:rounded-none md:rounded-lg "
                src={Contestant}
                alt=""
              />
            </div>
            <div class="p-6 flex flex-col justify-start ">
              <p class="text-gray-700 text-base mb-4 font-bold">
                Name: Kelechi Prince
              </p>
              <p class="text-gray-700 text-base mb-4">
                Wallet Address: 0x1f...2e5
              </p>
              <div class="p-6 flex justify-start items-center">
                <h2 class="text-gray-600 text-xs">18 votes</h2>
                <button
                  type="button"
                  class="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out ml-8"
                >
                  vote
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mb-10">
          <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            <div className="flex content-center items-center m-auto">
              <img
                class="w-full h-40 md:h-40 object-cover md:w-48 rounded-lg md:rounded-none md:rounded-lg "
                src={Contestant}
                alt=""
              />
            </div>
            <div class="p-6 flex flex-col justify-start ">
              <p class="text-gray-700 text-base mb-4 font-bold">
                Name: Kelechi Prince
              </p>
              <p class="text-gray-700 text-base mb-4">
                Wallet Address: 0x1f...2e5
              </p>
              <div class="p-6 flex justify-start items-center">
                <h2 class="text-gray-600 text-xs">18 votes</h2>
                <button
                  type="button"
                  class="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out ml-8"
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
