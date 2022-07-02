const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = {
        ...state,
        good: state.good + 1
      }
      return newState
    case 'OK':
      return state
    case 'BAD':
      return state
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer