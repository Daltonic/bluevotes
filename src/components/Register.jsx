import { setGlobalState, useGlobalState } from '../store'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { registerUser } from '../Blockchain.services'
import { toast } from 'react-toastify'

const Register = () => {
  const [contestModal] = useGlobalState('contestModal')
  const [fullname, setFullname] = useState('')
  const [image, setImage] = useState('')

  const closeModal = () => {
    setGlobalState('contestModal', 'scale-0')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullname || !image) return

    const params = {
      fullname,
      image,
    }

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await registerUser(params)
          .then(() => resolve())
          .catch(() => reject())
      }),
      {
        pending: 'Registering...',
        success: 'Registered successfully 👌',
        error: 'Encountered error 🤯',
      },
    )
    resetForm()
    closeModal()
  }

  const resetForm = () => {
    setFullname('')
    setImage('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center z-50
      justify-center bg-black bg-opacity-50 transform transition-transform
      duration-300 ${contestModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-black">Register to Vote</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes className="text-black" />
            </button>
          </div>

          {image ? (
            <div className="flex flex-row justify-center items-center rounded-xl mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                <img
                  alt="Contestant"
                  className="h-full w-full object-cover cursor-pointer"
                  src={image}
                />
              </div>
            </div>
          ) : null}

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="text"
              name="fullname"
              placeholder="Full name"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0"
              type="url"
              name="image"
              placeholder="Image URL"
              onChange={(e) => setImage(e.target.value)}
              pattern="^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$"
              value={image}
              required
            />
          </div>

          <button
            type="submit"
            className="flex flex-row justify-center items-center
              w-full text-white text-md bg-blue-500
              py-2 px-5 rounded-full drop-shadow-xl
              border-transparent border
              hover:bg-transparent hover:text-blue-500
              hover:border hover:border-blue-500
              focus:outline-none focus:ring mt-5"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
