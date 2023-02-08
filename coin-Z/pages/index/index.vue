<template>
	<view class="view">
		<uni-forms :modelValue="formData" label-position="left" :inline="true" label-width="80px">
			<uni-forms-item label="商品名称:" name="spuName">
				<uni-easyinput style="width: 200px" type="text" v-model="formData.spuName" placeholder="请输入商品名称"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="标题:" name="price">
				<uni-easyinput style="width: 200px" type="text" v-model="formData.price" placeholder="请输入标题"></uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<view class="jump-next-area">
				<button @click="jumpSecondPage" class="jump-next" size="mini" type="primary">新增</button>
				<button @click="seach" class="jump-next" size="mini" type="primary">搜索</button>
		</view>
		<view class="content">
			<uni-table ref="table" border stripe type="selection" @selection-change="selectionChange">
					<uni-tr>
						<uni-th width="50" align="center">序号</uni-th>
						<uni-th width="150" align="center">商品主图片</uni-th>
						<uni-th align="center">商品名称</uni-th>
						<uni-th align="center">价格</uni-th>
						<!-- <uni-th align="center">标题</uni-th> -->
						<uni-th align="center">描述</uni-th>
						<uni-th align="center">所属分类</uni-th>
						<uni-th align="center">是否天天特价</uni-th>
						<uni-th align="center">是否每日推荐</uni-th>
						<uni-th align="center">新建时间</uni-th>
						<uni-th align="center">更新时间</uni-th>
						<!-- <uni-th align="center">商品状态</uni-th> -->
						<uni-th align="center">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in showTableData" :key="index">
						<uni-td align="center">{{ index + 1 }}</uni-td>
						<uni-td align="center">
							<image style="width: 120rpx;height: 120rpx;" :src="typeof(item.mainUrl) == 'string'?(bwCoinCDNUrl + item.mainUrl):URL.createObjectURL(item.mainUrl.file)" mode=""></image>
						</uni-td>
						<uni-td align="center">{{ item.spuName }}</uni-td>
						<uni-td align="center">{{ item.price }}</uni-td>
						<!-- <uni-td align="center">{{ item.title }}</uni-td> -->
						<uni-td align="center">{{ item.desc }}</uni-td>
						
						<uni-td align="center">{{ dealCodeToName(spuAllTypeOptsMixins,item.type) }}</uni-td>
						<uni-td align="center">{{ item.dailySpecial}}</uni-td>
						<uni-td align="center">{{ item.dailyRecommend}}</uni-td>
						<uni-td align="center">{{ dateFormat(item.create_time) }}</uni-td>
						<uni-td align="center">{{ dateFormat(item.update_time) }}</uni-td>
						<!-- <uni-td align="center">{{ item.status }}</uni-td> -->
						<uni-td align="center">
							<view class="uni-group">
								<button class="uni-button" size="mini" type="primary" @click="edit(item)">修改</button>
								<button class="uni-button" size="mini" type="warn" @click="deleteBut(item.spuCode)">删除</button>
							</view>
						</uni-td>
					</uni-tr>
			</uni-table>
			<view class="footer uni-pagination-box">
				<uni-pagination
					show-icon
				    @change="handleCurrentChange"
				    :current="pageIndex"
				    :page-size="pageSize"
				    :total="total"
					/>
			</view>
		</view>
	</view>
</template>

<script>
import { getAliOosClient, bwCoinImgcdnUrl } from '../../tool.js';
import { spuAllTypeMixins } from '../mixins/dictionaryOpts.js'
	export default {
		mixins: [ spuAllTypeMixins ],
		data() {
			return {
				bwCoinCDNUrl: bwCoinImgcdnUrl,
				pageIndex: 1, // 第几页
				pageSize: 5, // 每页几条数据
				total: 0, // 总条目数
				tableData: [], // 所有的数据
				showTableData: [], // 当前展示的数据
				searchVal: '',
				title: 'index',
				formData: {
					spuName: "",
					price: ""
				},
				typeOpts:[],

			}
		},
		onShow(){
		    this.getData();
		},
		onLoad() {
			this.selectedIndexs = []
			},
		mounted() {
			this.getData()
			// 获取类型
			this.initspuAllTypeOptsMixins()
			
		},
		methods: {
			// 处理数组对象[{}]为对象{} 返回类型名称
			dealCodeToName(opts,code){
				let arr = opts;
				let obj = {};
				for (let i = 0; i < arr.length; i ++) {
					let key = arr[i]
				    obj[key.value] = key.realName
				}
				console.log('obj',obj)
				return obj[code]
			},
			dateFormat(time) {
				let data = time.substr(0, 19); 
				let newDate = data.replace(/T/g, ' ')
				return newDate
			},
			getShowTableData() {
			  // 5. 获取截取开始索引
			  let begin = (this.pageIndex - 1) * this.pageSize;
			  // 6. 获取截取结束索引
			  let end = this.pageIndex * this.pageSize;
			  // 7. 通过索引去截取，从而展示
			  this.showTableData = this.tableData?.slice(begin, end);
			},
			// 8. 页数改变，重新截取
			handleCurrentChange(e) {
			  this.pageIndex = e.current;
			  this.getShowTableData();
			},
			// 多选处理
			selectedItems() {
				return this.selectedIndexs.map(i => this.tableData[i])
			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			//批量删除
			delTable() {
				console.log(this.selectedItems())
			},
			// 分页触发
			// change(e) {
			// 	this.$refs.table.clearSelection()
			// 	this.selectedIndexs.length = 0
			// 	this.getData(e.current)
			// },
			seach(){
				this.pageIndex = 1,
				this.getData()
			},
			getData(){
				// let params = {
				//           // "phone":this.userphone,
				//           // "name":this.username

				//     }
					// this.pageCurrent = pageCurrent
				    uni.request({
						  url: `${this.$baseUrl}/spu/findAll`,
						  method: 'GET',
						  success: (res)=>{
							  console.log("res",res)
							  this.tableData = res.data.data
							  this.total = res.data.total
							  this.getShowTableData();
						  },
						  fail: (err)=>{}
				    })
			},
			jumpSecondPage(){
				uni.navigateTo({
					url:'add',
					fail: (error) => {
						console.log(error)
					}
				})
			},
			edit(item){
				console.log("item",item)
				// uni.navigateTo({
				// 	url:`add/add?item=${encodeURIComponent(JSON.stringify(item))}`,
				// 	fail: (error) => {
				// 		console.log(error)
				// 	}
				// })
				uni.navigateTo({
					url:`update?code=${item.spuCode}`,
					fail: (error) => {
						console.log(error)
					}
				})
			},
			deleteBut(spuCode){
				console.log("spuCode",spuCode)
				let params = {
				         "spuCode":spuCode,
									}
				uni.request({
						url: `${this.$baseUrl}/spu/delete`,
						method: 'POST',
						data:params,
						success: (res)=>{
							if(res){
								uni.showToast({
									title: '删除成功'
								})
								this.seach()
							}
						},
						fail: (err)=>{}
				})
			}
		}
	}
</script>

<style>
	.view{
		margin: 1rem;
	}
	.content{
		/* width: 750rpx; */
		font-family: PingFang SC-Regular, PingFang SC;
	}
	/* 底部 */
	.footer{
		position: fixed;
		left: 0rpx;
		bottom: 0rpx;
		width: 100%;
		height: 106rpx;
		background: #F5F5F5;
	}
</style>
