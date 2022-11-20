import { createGlobalState } from 'react-hooks-global-state'
import moment from 'moment'

const { getGlobalState, useGlobalState, setGlobalState } = createGlobalState({
  contestModal: 'scale-0',
  createPollModal: 'scale-0',
  updatePollModal: 'scale-0',
  deletePollModal: 'scale-0',
  connectedAccount: '',
  currentUser: null,
  contract: null,
  user: null,
  polls: [],
  poll: null,
  contestants: [],
  group: null
})

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const toDate = (timestamp) => {
  const date = new Date(timestamp)
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const yyyy = date.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

const toHex = (str) => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16)
  }
  return result.slice(0, 6)
}

export {
  getGlobalState,
  useGlobalState,
  setGlobalState,
  truncate,
  toDate,
  toHex,
}
