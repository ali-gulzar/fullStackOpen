import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postData = async (data) => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, postData }