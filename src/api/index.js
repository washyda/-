import axios from '@/utils/axios.js'
export const initData = function() {
  return axios.get('/home')
}
export const getUser = function(params) {
  return axios.get('/user/getUser', params)
}
export const addUser = function(data) {
  return axios.post('/user/addUser', data)
}
export const editUser = function(data) {
  return axios.post('/user/editUser', data)
}
export const removeUser = function(data) {
  return axios.post('/user/removeUser', data)
}
export const getMenu = function(data) {
  return axios.post('/api/getMenu', data)
}
