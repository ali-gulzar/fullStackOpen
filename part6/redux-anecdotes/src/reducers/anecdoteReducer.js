import anectodeService from '../services/anectodes'

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
      return action.data
    default:
      return state.sort(sortAnectodes)
  }
}

export const voteAction = (id, data) => {
  return async dispatch => {
    const response = await anectodeService.updateData(id, data)
    dispatch({
      type: 'VOTE',
      data: {
        id: response.id
      }
    })
  }
}

export const addAction = (content) => {
  return async dispatch => {
    const response = await anectodeService.postData({content, votes: 0})
    dispatch({
      type: 'ADD',
      data: {
        content: response
      }
    })
  }
}

export const initData = () => {
  return async dispatch => {
    const anecdotes = await anectodeService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer