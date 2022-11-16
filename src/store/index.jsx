import { createGlobalState } from 'react-hooks-global-state'
import moment from 'moment'

const { getGlobalState, useGlobalState, setGlobalState } = createGlobalState({
  contestModal: 'scale-0',
  createPollModal: 'scale-0',
  updatePollModal: 'scale-0',
  connectedAccount: '',
  user: null,
  polls: [],
  poll: null,
  contestants: [],
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

const daysRemaining = (days) => {
  const todaysdate = moment()
  days = Number((days + '000').slice(0))
  days = moment(days).format('YYYY-MM-DD')
  days = moment(days)
  days = days.diff(todaysdate, 'days')
  return days == 1 ? '1 day' : days + ' days'
}

export {
  getGlobalState,
  useGlobalState,
  setGlobalState,
  truncate,
  toDate,
}
