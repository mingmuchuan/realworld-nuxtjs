/*
 * @Author: your name
 * @Date: 2020-12-14 18:56:51
 * @LastEditTime: 2020-12-15 10:34:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /realworld-nuxtjs/apis/tags.js
 */
import { request } from '@/plugins/request'


export function getTags(tag) {
  return request({
    url: "api/tags",
    method: "get",
    params: { tag }
  })
}