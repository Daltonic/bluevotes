import { createGlobalState } from 'react-hooks-global-state'
const { getGlobalState, useGlobalState, setGlobalState } = createGlobalState({
  contestModal: 'scale-0',
  createPollModal: 'scale-0',
})
export { getGlobalState, useGlobalState, setGlobalState }
