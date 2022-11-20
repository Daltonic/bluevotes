import { toast } from 'react-toastify'
import { loginWithCometChat } from '../Chat.services'
import { setGlobalState, useGlobalState } from '../store/index'

const Hero = () => {
  const [user] = useGlobalState('user')
  const [currentUser] = useGlobalState('currentUser')
  const [connectedAccount] = useGlobalState('connectedAccount')

  const handleSubmit = async () => {
    await toast.promise(
      new Promise(async (resolve, reject) => {
        await loginWithCometChat()
          .then(() => resolve())
          .catch(() => reject())
      }),
      {
        pending: 'Signing in...',
        success: 'Logged in successful 👌',
        error: 'Encountered error 🤯',
      },
    )
  }

  return (
    <div className="text-center mt-10 p-4">
      <h1 className="text-5xl text-black-600 font-bold">
        {' '}
        Vote Without <span className="text-blue-600">Rigging</span>
      </h1>
      <p className="pt-5 text-gray-600 text-xl font-medium">
        {' '}
        This online voting system offers the highest level of transparency,
        control, security <br></br>and efficiency of election processes using
        the <strong>Blockchain Technology</strong>{' '}
      </p>
      <div className="flex justify-center pt-10">
        {user?.fullname ? (
          <div className="space-x-2">
            {!currentUser ? (
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs
                leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg hover:text-white
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
                active:shadow-lg transition duration-150 ease-in-out border border-blue-600"
                onClick={handleSubmit}
              >
                Login
              </button>
            ) : (
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
                active:shadow-lg transition duration-150 ease-in-out border border-blue-600"
                onClick={() => setGlobalState('createPollModal', 'scale-100')}
              >
                Create Poll
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium
            text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none
            focus:ring-0 transition duration-150 ease-in-out"
            onClick={() => setGlobalState('contestModal', 'scale-100')}
            disabled={!connectedAccount}
            title={!connectedAccount ? 'Please connect wallet first' : null}
          >
            Register
          </button>
        )}
      </div>
    </div>
  )
}

export default Hero
