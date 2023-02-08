<template>
	<view class="view">
		<view style="font-size: 16px; font-weight: bold;" class="" v-if="this.form.spuCode">
			编辑
		</view>
		<view style="font-size: 16px; font-weight: bold;" class="" v-else>
			新增
		</view>
		<uni-forms :modelValue="form" label-position="left" label-width="100px">
			<uni-forms-item label="商品名称:" name="spuName">
				<uni-easyinput style="width: 400rpx" type="text" v-model="form.spuName" placeholder="请输入商品名称">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="价格:" name="price">
				<uni-easyinput style="width: 400rpx" type="text" v-model="form.price" placeholder="请输入价格">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="描述:" name="desc">
				<uni-easyinput style="width: 400rpx" type="text" v-model="form.desc" placeholder="请输入标题">
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="所属分类:" name="type">
				<uni-data-select style="width: 400rpx" v-model="form.type" :localdata="spuAllTypeOptsMixins" @change="changeType">
				</uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="上传主页图:" name="mainUrl">
				<uni-file-picker v-model="form.mainUrl" fileMediatype="image" :del-icon="false" disable-preview  @select="selectMain" ref="uploadMain" limit="1" />
			</uni-forms-item>
			<uni-forms-item label="上传详情图:" name="type">
				<uni-file-picker v-model="form.imgs" fileMediatype="image" mode="grid" @select="select"
					@progress="progress" @success="success" @delete="deletephoto" @fail="fail" ref="upload" limit="9" />
			</uni-forms-item>
		</uni-forms>
		<view class="jump-next-area">
			<button class="jump-next submit" size="mini" type="primary" @click="addSub">保存</button>
			<button class="jump-next submit" size="mini" type="primary" @click="handleBut">取消</button>
		</view>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import { getAliOosClient, bwCoinImgcdnUrl } from '../../../tool.js';
import { spuAllTypeMixins } from '../../mixins/dictionaryOpts.js'
	export default {
		mixins: [ spuAllTypeMixins ],
		data() {
			return {
				msgType: 'success',
				messageText: '',
				title: '新增',
				form: {
					spuName: "",
					price: "",
					title: "",
					type: "",
					mainUrl: [], // 主图
					imgs: [], //{id:0,imgUrl:''url}
				},
				typeOpts: [],
			}
		},
		mounted() {
			this.initspuAllTypeOptsMixins()
		},
		onLoad(option) {
			if (option.item) {
				this.form = JSON.parse(decodeURIComponent(option.item))
			}
		},
		methods: {
			async addSub() {
				if (this.form.spuCode) {
					let params = {
						"spuName": this.form.spuName,
						"price": this.form.price,
						"desc": this.form.desc,
						"spuCode": this.form.spuCode
						// "type":this.form.type,
					}
					uni.request({
						url: `${this.$baseUrl}/spu/update`,
						method: 'POST',
						data: params,
						success: (res) => {
							// if(res){
							uni.showToast({
								title: '编辑成功'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1,
								})
							}, 2000)
							// }
						},
						fail: (err) => {}
					})
		
				} else {
					let list = this.form.imgs
					console.log('list',list);
					for (let i = 0; i < list.length; i++) {
						console.log('list[i]',list[i]);
						if (typeof list[i] === 'object') {
							const client = await getAliOosClient('bwcoin'); //新建存放图片的文件夹
							const file = list[i];
							console.log('file',file);
							const result = await client.put(
								'spu-imgs-'+ this.form.spuName.replace(/\s/g, '-') + i +  '.' + file.extname,
								file.file,
							);
							console.log('result',result);
							list[i] = {
								imgUrl : result.name
							};
						}
					}
					console.log('typeof this.form.mainUrl',typeof this.form.mainUrl);
					if (typeof this.form.mainUrl === 'object') {
						const client = await getAliOosClient('bwcoin'); //新建存放图片的文件夹 bwcoin
						const file = this.form.mainUrl;
						console.log('file',file);
						const result = await client.put(
							'spu-main-url-' + this.form.spuName.replace(/\s/g, '-') + '.' +file[0].extname,
							file[0].file,
						);
						console.log('result',result);
						this.form.mainUrl = [result.name];
					}
					let params = {
						"spuName": this.form.spuName,
						"price": this.form.price,
						"desc": this.form.desc,
						"type": this.form.type,
						"imgs": this.form.imgs,
						"mainUrl":this.form.mainUrl[0],
					}
					console.log('params',params);
					uni.request({
						url: `${this.$baseUrl}/spu/create`,
						method: 'POST',
						data: params,
						success: (res) => {
							if (res) {
								uni.showToast({
									title: '新增成功'
								})
								setTimeout(function() {
									uni.navigateBack({
										delta: 1,
									}, 2000)
								})
							}
						},
						fail: (err) => {
							console.log('err',err);
						}
					})
				}
			},
			// 获取所有类型
			getTypeRange(){
				uni.request({
					url: `${this.$baseUrl}/spu/type`,
					method: 'POST',
					// data: ,
					success: (res) => {
						if(res){
							console.log('res.data',res.data);
							let data = res.data.data
							this.typeOpts = data.map((item) => {
								return{
									text: item.name + '(' + item.id + ')',
									value: item.id
								}
							})
						}
					},
					fail: (err) => {}
				})
			},
			
			validateFile: function (file) {
				if (file.size / 1024 / 1024 > 0.1) {
					// this.$notify({
					// 	message: '图片最大不能超过10M',
					// 	type: 'warning',
					// });
					this.messageToggle('error')
					return false;
				}
				return true;
			},
			
			// 获取主图状态
			selectMain(file) {
				this.form.mainUrl = file.tempFiles;
			},
			
			// 获取上传状态
			select(file) {
				console.log('选择文件：', file)
				this.form.imgs.push(...file.tempFiles);
				console.log('this.form.imgs', this.form.imgs);
			},
			
			// 移出图片函数
			deletephoto(e) {
				let index = this.form.imgs.findIndex((item)=>{e.tempFilePath === item.url})
				this.form.imgs.splice(index,1)
			},

			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功', e)
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			
			//切换类型
			changeType(e) {
				console.log("e:-----", e);
			},
			
			handleBut() {
				console.log("====");
				uni.navigateBack({
					delta: 1,
				})
			},
			
			}
	}
</script>

<style>
	.view {
		margin: 1rem;
	}

	,
	.submit {
		margin: 2rem;
	}

	.file-picker__box {
		width: 100px;
		height: 100px;
	}
</style>
