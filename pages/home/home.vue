<template>
	<view class="content">
		<view class="img-org">
			<image style="margin:auto auto 0;" src="../../static/img/bck.png" mode=""></image>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="title ul">
				您好
			</view>
			<view class="ul">
				<view>今日已预约 : {{RegNum}} 人</view>
			</view>
			
			
			<!-- <view class="ul">
				现在是 : {{currentTime}}
			</view>
			 -->
			<!-- <popupData
			@close-popup="close"
			:openPopup="openPopup"
			 ></popupData> -->
			 <w-picker
			         mode="linkage"
			         :value="defaultRegion1"
			         :options="options"
			         :level="4"
			         default-type="id"
			         :default-props="defaultProps1"
			         @confirm="onConfirm($event,'linkage')"
			         @cancel="onCancel"
			         ref="linkage" 
			     ></w-picker>
			 
			<view class="ul" v-if="!hasRGstatus">
				<wButton
					text="立即预约"
					:rotate="isRotate" 
					@click.native="startLogin()"
					class="wbutton"
				></wButton>
				
				
			</view>
		
			
		</view>
		<view v-if="hasLogin" class="hello">

			<view class="ul">
				<view>今日已预约 : {{RegNum}} 人</view>
			</view>
			<view class="ul">
				<view>您的号码是 : {{newMyRegNum}} 号</view>
			</view>
			<!-- <template v-if="currentTime"> -->
				<view class="ul">
					<input type="text" v-model="currentTime" placeholder="请选择预约时间"/>
				</view>
				
			<!-- </template> -->
			<template v-if="!currentTime">
				<view class="ul"><wButton
						text="我的预约"
						:rotate="isRotate" 
						@click.native="startLogin()"
						class="wbutton"
					></wButton></view>
				
			</template>
			<view class="ul">
				<wButton
					text="立即预约"
					:rotate="isRotate" 
					@click.native="startLogin()"
					class="wbutton"
				></wButton>
			</view>
			
		</view>

	</view>
</template>

<script>
	import wButton from '../../components/watch-login/watch-button.vue'
	import popupData from "./popupData/popupData.vue";
	import timeSelector from '../../components/xiujun-time-selector/index.vue';
	import wPicker from '../../components/w-picker/w-picker.vue';
	export default {
		data() {
			return {
				userName:'',
				currentTime:'',
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				isRotate:false,
				RegNum:0,//挂号人数
				hasLogin:false,//是否为登陆状态
				hasRGstatus:false,//是否为预约成功状态
				newMyRegNum:'',//当前用户排号号码
				startYear:'',
				userInfo:{},
				openPopup:false,
				thisIsChecked:[],
				regNumDataRange:[
					{
						label:'01',
						value:'8:30-9:30',
						checked:false
					},
					{
						label:'02',
						value:'9:30-10:30',
						checked:false
					},
					{
						label:'03',
						value:'10:30-11:30',
						checked:false
					},
					{
						label:'04',
						value:'14:30-15:30',
						checked:false
					},
					{
						label:'05',
						value:'15:30-16:30',
						checked:false
					},
					{
						label:'06',
						value:'16:30-17:30',
						checked:false
					}
					
				],
				weeks:["周日","周一","周二","周三","周四","周五","周六"],
				
			}
		},
		components:{
			wButton,
			timeSelector,
			wPicker,
			popupData
		},
		updated() {
			this.socketTask.onMessage((res) => {
				console.log("收到服务器内容：" + res.data);
				this.RegNum = res.data
			});
		},
		methods: {
			clickWpicker(){
				//打开时间选择框
				// this.$refs.dataRange.open()
				this.$refs.linkage.show()
				this.openPopup = true
			},
			close(e){
				this.openPopup = e
			},
			
			onConfirm(e){
				//时间选择框确认按钮之后
				this.currentTime = e.result
			},
			checkedInput(index){
				//选中了当前时间段
				this.$set(this.regNumDataRange,this.regNumDataRange[index].checked,true)
			},
			// getTime: function() {
			// 	let yy = new Date().getFullYear();
			// 	let mm = new Date().getMonth() + 1;
			// 	let dd = new Date().getDate();
			// 	let hh = new Date().getHours();
			// 	let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			// 	let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
			// 	return yy + '年' + mm + '月' + dd + '日 ' + hh + ':' + mf + ':' + ss;
			// },
			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			connectSocketInit() {
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = this.$socketTask()

				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					this.is_open_socket = true;
					// 注：只有连接正常打开中 ，才能正常成功发送消息
					this.socketTask.send({
						data: "uni-app发送一条消息",
						async success() {
							console.log("消息发送成功");
						},
					});
					// 注：只有连接正常打开中 ，才能正常收到消息
					this.socketTask.onMessage((res) => {
						console.log("收到服务器内容：" + res.data);
					});
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				// this.socketTask.onClose(() => {
				// 	console.log("已经被关闭了")
				// })
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				this.socketTask.close({
					success(res) {
						this.is_open_socket = false;
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},
			clickRequest() {
				if (this.is_open_socket) {
					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					this.socketTask.send({
						data: "请求一次发送一次message",
						async success() {
							console.log("消息发送成功");
						},
					});
				}
			},
			startLogin() {
				// this.socketTask.send({
				// 	data: "6",
				// 	async success() {
				// 		console.log("消息发送成功");
				// 	},
				debugger
				// });\
				var token =uni.getStorageSync('token')
				var that =this 
				if(!this.VglobalData.isLogin){
					uni.reLaunch({
						url: "/pages/login/login"
					})
				} 
				else {
					if( !this.currentTime ){
						debugger
						uni.redirectTo({
							url:'../yuyue/index'
						})
						this.$message('请选择预约时间')
						return
					} else {
						uni.request({
							url:'http://' + this.BASE_URL + '/registerNumber/setRegisterNum',
							data: 
								that.userInfo
							,
							method: 'post',header:{accessToken:token},
							success(res) {
								let $data = res.data
								if( $data.message == 'ok'){
									debugger
									if($data.data.result.id!=""){
										that.newMyRegNum = $data.data.result.rgNumber
										that.hasRGstatus = true
									} else {
										that.hasRGstatus = false
									}
									
									
									that.socketTask.send({
										data: $data.data.result.rgNumber,
										async success() {
											console.log("消息发送成功");
										},
									});
								} else {
									that.$message($data.resultMsg)
								}
							}
						})
					}
					
					
				}
				
			}
		},
		created() {
			// this.currentTime = this.getTime()
			
			
			this.socketTask = this.$socketTask()
		},
		beforeDestroy() {
			// this.closeSocket();
		},
		onLoad() {
			// weekday:weeks[new data().getDay()]
			this.hasLogin = this.VglobalData.isLogin
			this.userName = this.VglobalData.userInfo.userName
			this.userInfo = {...this.VglobalData.userInfo}
			var that = this
			uni.request({
				url: "http://"+this.BASE_URL+"/registerNumber/getRegisterNum",
				data: {},
				method: 'post',
				success(res) {
					if( res.data.message == 'ok'){
				 	that.RegNum = res.data.data.RegNum ? res.data.data.RegNum : 0
					that.startYear = res.data.data.currentTime.substring(0,4)
					} else {
						that.$message(res.data.resultMsg)
					}
				}
			})

		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;

	}

	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
		position: relative;
		z-index: 2;
		height: 100%;
		background: rgba(255, 255, 255, .5);
		box-sizing: border-box;
		padding: 30rpx;
		align-items: center
	}

	.img-org {
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		display: flex;
	}

	.title {
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		margin-top: 15px;
	}

	.ul>view {
		line-height: 25px;
	}
	
</style>
