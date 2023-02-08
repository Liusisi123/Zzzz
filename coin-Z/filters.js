// 过滤器 {{ message | fliters }}
// //枚举数据
// export function enumerationData(obj,key) {
// 	console.log('obj,key',obj,key);
// 	return obj[key];
// }
//枚举数据
export function enumerationData(obj,key) {
	console.log('obj,key',obj,key);
	if (key === undefined || key === null) return '--'
	  if (!(obj instanceof Object)) return
	  return obj[key]
}