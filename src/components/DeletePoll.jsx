import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deletePoll } from '../Blockchain.services'
import { setGlobalState, useGlobalState } from '../store'

const DeletePoll = () => {
  const navigate = useNavigate()
  const [poll] = useGlobalState('poll')
  const [deletePollModal] = useGlobalState('deletePollModal')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await deletePoll(poll.id)
          .then(() => resolve())
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Deleted successfully 👌',
        error: 'Encountered error 🤯',
      },
    )

    setGlobalState('deletePollModal', 'scale-0')
    console.log('Poll Deleted!')
    navigate('/')
  }

  const closeModal = () => {
    setGlobalState('deletePollModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform z-50
        transition-transform duration-300 ${deletePollModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-black">#{poll?.title}</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-black" />
            </button>
          </div>

          <div className="flex flex-row justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                alt="Project"
                className="h-full w-full object-cover cursor-pointer"
                src={poll?.image}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center mt-5">
            <p>Are you sure?</p>
            <small className="text-red-400">This is irriversible!</small>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="flex flex-row justify-center items-center w-full 
              text-white text-md bg-red-500
              py-2 px-5 rounded-full drop-shadow-xl
              border-transparent border
              hover:bg-transparent hover:text-red-500
              hover:border hover:border-red-500
              focus:outline-none focus:ring mt-5"
          >
            Delete Poll
          </button>
        </form>
      </div>
    </div>
  )
}

export default DeletePoll
