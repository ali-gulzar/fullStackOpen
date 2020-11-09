const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnectodes = (a,b) => {
  if (a.votes > b.votes) return -1
  if (b.votes > a.votes) return 1
  return 0
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState.sort(sortAnectodes), action) => {
  switch(action.type) {
    case 'VOTE':
      return state.map(a => (a.id) === action.data.id ? {...a, votes: a.votes + 1} : a).sort(sortAnectodes)
    case 'ADD':
      return [...state, { content: action.data.content, id: getId(), votes: 0 }].sort(sortAnectodes)
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

export default reducer