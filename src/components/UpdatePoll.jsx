import { setGlobalState, useGlobalState, toDate } from '../store'
import { FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { updatePoll } from '../Blockchain.services'
import { toast } from 'react-toastify'

const UpdatePoll = () => {
  const [updatePollModal] = useGlobalState('updatePollModal')
  const [poll] = useGlobalState('poll')
  const [title, setTitle] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    setTitle(poll?.title)
    setDescription(poll?.description)
    setImage(poll?.image)
    setStartsAt(toDate(poll?.startsAt))
    setEndsAt(toDate(poll?.endsAt))
  }, [poll])

  const closeModal = () => {
    setGlobalState('updatePollModal', 'scale-0')
  }

  const toTimestamp = (strDate) => {
    const datum = Date.parse(strDate)
    return datum / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !image || !startsAt || !endsAt || !description) return

    const params = {
      id: poll?.id,
      title,
      image,
      startsAt: toTimestamp(startsAt),
      endsAt: toTimestamp(endsAt),
      description,
    }

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await updatePoll(params)
          .then(() => resolve())
          .catch(() => reject())
      }),
      {
        pending: 'Approve transaction...',
        success: 'Updated updated successfully 👌',
        error: 'Encountered error 🤯',
      },
    )
    closeModal()
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center z-50
      justify-center bg-black bg-opacity-50 transform transition-transform
      duration-300 ${updatePollModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold text-black">Edit Poll</p>
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
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ''}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
            text-slate-500 bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="date"
              name="date"
              placeholder="Date"
              onChange={(e) => setStartsAt(e.target.value)}
              value={startsAt || ''}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              className="block w-full text-sm
            text-slate-500 bg-transparent border-0
              focus:outline-none focus:ring-0"
              type="date"
              name="date"
              placeholder="Date"
              onChange={(e) => setEndsAt(e.target.value)}
              value={endsAt || ''}
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
              value={image || ''}
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea
              className="block w-full text-sm resize-none
                text-slate-500 bg-transparent border-0
                focus:outline-none focus:ring-0 h-20"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description || ''}
              required
            ></textarea>
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
            Update Poll
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePoll
