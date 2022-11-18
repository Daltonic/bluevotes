import { useState } from 'react'
import Identicon from 'react-identicons'
const Messages = () => {
  const [message, setMessage] = useState('')

  const handleMessage = (e) => {
    e.preventDefault()
  }

  return (
    <div
      className="w-full mx-auto rounded-lg py-4 px-6 my-2
    bg-white shadow-lg"
    >
      <div className="w-full h-[calc(100vh_-_16rem)] overflow-y-auto">
        {Array(15)
          .fill()
          .map((msg, i) => (
            <Message
              key={i}
              message={`Maxime dolorum quam in totam vero.
            Consequatur obcaecati ea at nesciunt architecto.`}
              timestamp={new Date().toDateString()}
              owner={'address' + i}
            />
          ))}
      </div>

      <form onSubmit={handleMessage} className="flex w-full">
        <input
          className="w-full bg-gray-200 rounded-lg p-4 
          focus:ring-0 focus:outline-none border-gray-500"
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" hidden>
          Send
        </button>
      </form>
    </div>
  )
}

const Message = ({ message, timestamp, owner }) => (
  <div className="flex flex-row justify-start w-2/5 my-2">
    <div className="flex justify-center items-end space-x-2">
      <div className="flex flex-col">
        <div className="flex justify-start items-center space-x-1">
          <div className="flex justify-start items-center space-x-1">
            <Identicon
              string={owner}
              size={20}
              className="h-10 w-10 object-contain rounded-full"
            />
            <span className="font-bold text-xs">@You</span>
          </div>
          <span className="text-gray-800 text-[10px]">{timestamp}</span>
        </div>
        <small className="leading-tight text-md my-1">{message}</small>
      </div>
    </div>
  </div>
)

export default Messages
