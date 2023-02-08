import request from '../../../request.js' //请求拦截器 响应拦截器
import { baseUrl } from '../index.js' // 请求地址前缀 


const obj = {}
// 获取商品分类
// obj.spuTypeApi = (data) => uni.request({
//   url: '/spu/type',
//   method: 'POST',
//   data,
//   baseURL: baseUrl
// })
obj.spuTypeApi = (data) => request({
  url: `/spu/type`,
  method: 'POST',
  data,
})

obj.getDetailApi = (data) =>request({
	url: `/spu/detail`,
	method: 'POST',
	data,
})

obj.spuUpdateApi = (data) =>request({
	url: `/spu/update`,
	method: 'POST',
	data,
})

obj.spuCreateApi = (data) =>request({
	url: `/spu/create`,
	method: 'POST',
	data,
})
// export function getDocArticle (data) {
// 	return request({
// 		method: "post", // 请求方式
// 		url: '请求的url', // 请求的url
// 		data: data // 参数
// 	})
// }
// // 查询详情
// obj.spuTypeApi = function(data) {
//   return request({
//     url: '/spu/findAll',
//     method: 'GET',
//     params: data,
//     baseURL: baseURL
//   })
// }

export default obj
