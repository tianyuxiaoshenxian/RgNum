import Vue from 'vue'
import App from './App'
import BASE_URL from './static/js/BASE_URL.js'
import VglobalData from './static/js/VglobalData.js'



Vue.config.productionTip = false
Vue.prototype.BASE_URL = BASE_URL
Vue.prototype.VglobalData = VglobalData
Vue.prototype.$socketTask =function (){
	return  uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "wss://"+BASE_URL+"/websocket/managera",
					success(data) {
						console.log("websocket连接成功");
						console.log(data);
					},
				});

} 



Vue.prototype.$showLoading =  function (){
	return uni.showLoading({
					    title: '加载中',
						mask:true
					});
}
Vue.prototype.$hideLoading = function(){
	return uni.hideLoading()
}
//封装Toast xqq
Vue.prototype.$message = function(message){
	return uni.showToast({
		title:message,
		icon:'none',
		duration:1500
	})
}
Vue.prototype.$socketTask = function(){
	return uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "ws://localhost:8080/websocket/manager",
					success(data) {
						console.log("websocket连接成功");
					},
				});
}
 
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
