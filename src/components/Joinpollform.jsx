import { setGlobalState, useGlobalState } from '../store'
import { FaTimes } from 'react-icons/fa'

const Joinpollform = () => {
  const [boxModal] = useGlobalState('boxModal')
  const onClose = () => {
    setGlobalState('boxModal', 'scale-0')
  }
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
      justify-center bg-black bg-opacity-50 transform transition-transform
      duration-300 ${boxModal}`}
    >
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
        <div className="flex justify-center p-10">
          <button type="button" onClick={onClose} className="border-0">
            <FaTimes className="" />
          </button>
        </div>

        <form>
          <div className="mb-3 w-96">
            <input
              className="form-control block w-full px-3 py-1.5
                text-base font-normal text-gray-700 bg-white bg-clip-padding
                border border-solid border-gray-300 rounded
                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                focus:border-green-600 focus:outline-none"
              type="file"
              id="formFile"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                id="exampleInput123"
                aria-describedby="emailHelp123"
                placeholder="First name"
              />
            </div>
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                id="exampleInput124"
                aria-describedby="emailHelp124"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="form-group mb-6">
            <input
              type="email"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              id="exampleInput125"
              placeholder="Email address"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Joinpollform
