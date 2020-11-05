import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = data => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(baseUrl, data, config)
  return response
}

const updateLikes = (data, blogId) => {
  const response = axios.put(`${baseUrl}/${blogId}`, data)
  return response
}

const deletePost = blogId => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${baseUrl}/${blogId}`, config)
  return response
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, setToken, updateLikes, deletePost }
