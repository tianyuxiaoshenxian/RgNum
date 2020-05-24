<template>
  <view>
    <view class="person-head">
      <cmd-avatar :src="avatarUrl? avatarUrl :'https://avatar.bbs.miui.com/images/noavatar_small.gif'" @click="fnInfoWin" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
      <view class="person-head-box">
        <view class="person-head-nickname">{{userInfo.userName ? '用户: '+userInfo.userName : '用户'}}</view>
        <view class="person-head-username">{{userInfo.phone ? '手机号: ' +userInfo.phone :'手机号'}}</view>
      </view>
    </view>
    <view class="person-list">
      <cmd-cell-item title="我的预约" slot-left arrow>
        <cmd-icon type="bullet-list" size="24" @click="bbb" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="消息通知" slot-left arrow @click="aaaa">
        <cmd-icon type="message" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
      <cmd-cell-item title="个人信息设置" slot-left arrow>
        <cmd-icon type="settings" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
     <!-- <cmd-cell-item title="检查版本" addon="v1.0" slot-left arrow>
        <cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item> -->
    </view>
  </view>
</template>

<script>
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
  import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
  import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"

  export default {
    components: {
      cmdAvatar,
      cmdCellItem,
      cmdIcon
    },
    data() {
      return {
		  avatarUrl:'',
		  userInfo:{
			  createTime: '',
			  phone: '',
			  role: '',
			  userId:'',
			  userName: '',
			  wechatId: '',
		  },
		  socketTask:null
	  };
    },
	created() {
		if( this.VglobalData.isLogin ){
			this.userInfo = {...this.VglobalData.userInfo}
		}
		this.socketTask = this.$socketTask()
	},
    methods: {
      /**
       * 打开用户信息页
       */
      fnInfoWin() {
        uni.navigateTo({
          url: '/pages/user/info/info'
        })
      },
	  bbb(){
		  uni.navigateTo({
		    url: '/pages/w-picker-demo/w-picker-demo'
		  })
	  },
	  aaaa(){
		  var that = this
		  uni.request({
		  	url:'http://' + this.BASE_URL + '/registerNumber/setRegisterNum',
		  	data: 
		  		that.VglobalData.userInfo
		  	,
		  	method: 'post',
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
</script>

<style>
  .person-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    padding-left: 20px;
    background: linear-gradient(to right, #365fff, #36bbff);
  }

  .person-head-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
  }

  .person-head-nickname {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }

  .person-head-username {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .person-list {
    line-height: 0;
  }
</style>
