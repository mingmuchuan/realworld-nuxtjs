
import { request } from '@/plugins/request'

export function login (user) {
  return request({
    url: "/api/users/login",
    method: "post",
    data: { user }
  })
}


export function register (user) {
  return request({
    url: "/api/users",
    method: "post",
    data: { user }
  })
}