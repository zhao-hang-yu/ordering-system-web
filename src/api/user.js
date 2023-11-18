import request from '@/utils/request'

export default {
  getUserInfo() {
    return request({
      url: '/user/getCurrent',
      method: 'get'
    })
  },
  updateUser(userForm) {
    return request({
      url: '/user/update',
      method: 'post',
      data: userForm
    })
  }
  
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// export function getUserInfo() {
//   return request({
//     url: '/user/getCurrent',
//     method: 'get'
//   })
// }
