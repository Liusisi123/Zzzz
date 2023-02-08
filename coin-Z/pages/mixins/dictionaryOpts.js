/*
*   字典配置下拉框数据统一
*   命名规范:
*     mixins      xxxMixins
*     下拉框数据   xxxOptsMixins
*     methods     initxxxxxxOptsMixins   请返回 Promise 方便使用 Promise.all
*/
import spu from '../api/spu/index.js'
/*
*   商品分类
*/
export const spuAllTypeMixins = {
  data() {
    return {
      spuAllTypeOptsMixins: [] // 商品分类
    }
  },
  methods: {
    initspuAllTypeOptsMixins(data) {
      return new Promise((resolve, reject) => {
        spu.spuTypeApi(data)
          .then(res => {
            console.log('res---type', res)
            // if (res.code === 0) {}
            const data = []
            const obj = {}
            // 转换属性名
            res.data.forEach(element => {
              data.push({
                value: element['id'],
				name: element['name'] + '(' + element['id'] + '）',
				text: element['name'] + '(' + element['id'] + '）',
				realName: element['name'],
				item: element
              })
              obj[element.id] = element
            })
            this.spuAllTypeOptsMixins = data
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
