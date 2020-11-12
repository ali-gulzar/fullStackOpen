const getId = () => (100000 * Math.random()).toFixed(0)

const sortAnectodes = (a,b) => {
  if (a.votes > b.votes) return -1
  if (b.votes > a.votes) return 1
  return 0
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      return state.map(a => (a.id) === action.data.id ? {...a, votes: a.votes + 1} : a).sort(sortAnectodes)
    case 'ADD':
      return [...state, action.data.content].sort(sortAnectodes)
    case 'INIT':
      return action.data.anecdotes
    default:
      return state.sort(sortAnectodes)
  }
}

export const voteAction = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const addAction = (content) => {
  return {
    type: 'ADD',
    data: {
      content
    }
  }
}

export const initData = (anecdotes) => {
  return {
    type: 'INIT',
    data: {
      anecdotes
    }
  }
}

export default reducer