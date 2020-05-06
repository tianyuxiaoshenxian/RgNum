<template>
	<view class="content">
		<view class="img-org">
			<image style="margin:auto auto 0;" src="../../static/img/bck.png" mode=""></image>
		</view>
		<view v-if="hasLogin" class="hello">
			<view class="title ul">
				您好 {{}}
			</view>
			<view class="ul">
				现在是 : {{CURRENTTIME}}
			</view>
			<view class="ul">
				<view>今日已预约 : {{10}} 人</view>
			</view>
			<view class="ul">当前为 : {{2}}&nbsp;号就诊</view>
		</view>
		<view v-if="!hasLogin" class="hello">

			<view class="ul">
				<view>今日已预约 : {{RegNum}} 人</view>
			</view>
			<view class="ul">当前为 : {{2}}&nbsp;号就诊</view>

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
	export default {
		data() {
			return {
				CURRENTTIME: '',
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false,
				isRotate:false,
				RegNum:''//挂号人数
			}
		},
		components:{
			wButton
		},
		methods: {
			// getTime: function() {
			// 	var _this = this;
			// 	let yy = new Date().getFullYear();
			// 	let mm = new Date().getMonth() + 1;
			// 	let dd = new Date().getDate();
			// 	let hh = new Date().getHours();
			// 	let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
			// 	let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
			// 	_this.CURRENTTIME = yy + '年' + mm + '月' + dd + '日 ' + hh + ':' + mf + ':' + ss;
			// },
			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			connectSocketInit() {
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "ws://localhost:8080/websocket/manager",
					success(data) {
						console.log("websocket连接成功");
					},
				});

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
						this.RegNum = res.data
						console.log("收到服务器内容：" + res.data);
					});
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					console.log("已经被关闭了")
				})
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
				this.socketTask.send({
					data: "6",
					async success() {
						console.log("消息发送成功");
					},
				});
				// this.closeSocket();
				// uni.navigateTo({
				// 	url: "/pages/login/register"
				// })
			}
		},
		created() {
			setInterval(this.getTime, 1000)
		},
		beforeDestroy() {
			this.closeSocket();
		},
		onLoad() {
			var that = this
			wx.request({
				url: "http://localhost:8080/registerNumber/getRegisterNum",
				data: {},
				method: 'post',
				success(res) {
					let $data = res.data
					if( $data.message == 'ok'){
					that.RegNum = $data.data.RegNum 
						
					} else {
						that.$message($data.message)
					}
				}
			})

			this.connectSocketInit();
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
