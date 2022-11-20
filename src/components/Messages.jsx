import { useEffect, useState } from 'react'
import Identicon from 'react-identicons'
import { CometChat, getMessages, sendMessage } from '../Chat.services'
import { truncate, useGlobalState } from '../store'
const Messages = ({ guid }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [connectedAccount] = useGlobalState('connectedAccount')

  useEffect(() => {
    getMessages(guid).then((msgs) => {
      if (!!!msgs.code)
        setMessages(msgs.filter((msg) => msg.category == 'message'))
    })

    listenForMessage(guid)
  }, [guid])

  const listenForMessage = (listenerID) => {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message) => {
          setMessages((prevState) => [...prevState, message])
          scrollToEnd()
        },
      }),
    )
  }

  const handleMessage = async (e) => {
    e.preventDefault()
    await sendMessage(guid, message).then((msg) => {
      if (!!!msg.code) {
        setMessages((prevState) => [...prevState, msg])
        setMessage('')
        scrollToEnd()
      }
    })
  }

  const scrollToEnd = () => {
    const elmnt = document.getElementById('messages-container')
    elmnt.scrollTop = elmnt.scrollHeight
  }

  return (
    <div
      className="w-full mx-auto rounded-lg py-4 px-6 my-2
    bg-white shadow-lg"
    >
      <div
        id="messages-container"
        className="w-full h-[calc(100vh_-_30rem)] overflow-y-auto"
      >
        {messages.map((msg, i) => (
          <Message
            key={i}
            message={msg.text}
            timestamp={new Date().toDateString()}
            owner={msg.sender.uid}
            isOwner={msg.sender.uid == connectedAccount}
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

const Message = ({ message, timestamp, owner, isOwner }) => (
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
            <span className="font-bold text-xs">
              {isOwner ? '@You' : truncate(owner, 4, 4, 11)}
            </span>
          </div>
          <span className="text-gray-800 text-[10px]">{timestamp}</span>
        </div>
        <small className="leading-tight text-md my-1">{message}</small>
      </div>
    </div>
  </div>
)

export default Messages
