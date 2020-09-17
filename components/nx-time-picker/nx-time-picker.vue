<!-- 时间预约插件 -->
<!-- @auto:Nxiang -->
<template>
	<view class="index">
		<view class="page">
			<scroll-view class="weekSelection" scroll-x >
					<view :class="weekcheck == index ? 'weekSelectionBoxOn' : 'weekSelectionBox'" v-for="(item,index) in week" @click="bbb(index)">
						<view class="week">{{item.name}}</view>
						<view class="date">{{item.date}}</view>
					</view>
			</scroll-view>
		</view>
		<view class="checkbtn">
			<view class="check"style="background-color: #dedede;">禁用</view>
			<view class="check" style="background-color: #007AFF; color: #FFFFFF;">选中</view>
			<view class="check" style="background-color: #83DC42; color: #FFFFFF;">您已预约</view>
			<view class="check" style="background-color: #4CD964; color: #FFFFFF;">他人已预约</view>
		</view>
		<view class="page"  >
			<scroll-view class="dateSelection" scroll-y >
					<view :class="item.isCan == 5 ? 'dateSelectionBoxOn' : item.isCan == 1 || item.isCan == 4 ?'dateSelectionBoxOff':item.isCan == 2 ?'dateSelectionBoxYou':item.isCan == 3?'dateSelectionBoxThem':'dateSelectionBox' " v-for="(item,index) in date" @click="aaa(index)">{{bookdate(item.startTime)}}</view>
			</scroll-view>
		</view>
		<view class="btn">
			<view class="btnqx" @click="btn(1)">取消</view>
			<view class="btnqd" @click="btn(2)">确定</view>
		</view>
	</view>
	
</template>

<script>
export default {
	components:{
	},

	data() {
		return {
			weekcheck:0,
			week:[
				{
					name:"周一",
					date:"8/1",
				},
				{
					name:"周二",
					date:"8/1",
				},
				{
					name:"周三",
					date:"8/1",
				},
				{
					name:"周四",
					date:"8/1",
				},
				{
					name:"周五",
					date:"8/1",
				},
				{
					name:"周六",
					date:"8/1",
				},
				{
					name:"周天",
					date:"8/1",
				}
			],
			checkBox1:[],
			checkBox:[],
			dataPickerValue: (new Date()).valueOf() //当前时间
		};
	},
	computed: {
	    // 计算属性的 getter
	    bookdate() {
			debugger
		   return function (date) {
			   console.log(date)
			   if(!date){
				   return null
			   }
		            return this.dateconversion(date,"t").slice(0,5)
		        }
		  
	    },
		
	},
	props:['date'],
	mounted() {
		console.log(this.dataPickerValue)
		this.numberCyclesCorrespondingDate()
	},
	methods:{
		numberCyclesCorrespondingDate(){
			var that = this
			for(let i = 0;i < 7 ;i++){
				this.week[i].name = this.transferDateWeek(this.dataPickerValue+i*24 * 3600 * 1000)
				this.week[i].date = this.dateconversion(this.dataPickerValue+i*24 * 3600 * 1000,"ms","/")
				this.week[i].dateall = this.dateconversion(this.dataPickerValue+i*24 * 3600 * 1000,"yms","-")
			}
			console.log(this.week)
			console.log(this.dataPickerValue)
		},
		
		transferDateWeek(date){
			var weekDay = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
			        var myDate = new Date(date);
			        return weekDay[myDate.getDay()]; 
		},
		
		showPicker(){
			this.$refs.picker.show();
		},
		aaa(index){
			if(this.date[index].isCan == 0){
				this.date[index].isCan = 5
			}else if(this.date[index].isCan == 5){
				this.date[index].isCan = 0
			}
			
		},
		bbb(index){
			var that = this;
			this.weekcheck = index
			this.$emit('checkDate',this.week[index])
		},
		btn(count){
			if(count == 1){
				this.$emit('showClose')
				return
			}
			var obj = []
			var selectTime = this.week[this.weekcheck]
			for (var i = 0; i < this.date.length; i++) {
				if(this.date[i].isCan == 5){
					obj.push( this.date[i] )
				}
				
			}
			var timedata={
				time:obj,
				date:selectTime
			}
			
			this.$emit('showTime',timedata)
			// console.log(obj)
		},
		
		// 自定义时间格式方法
		dateconversion(time,format,split){
			if(!split){
				split = "/"
			}
			debugger
			var returndate = ""
			console.log(time)
			console.log(new Date(time + 8 * 3600 * 1000))
			var date = new Date(time + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', '-').split('-')
			var datex = {
				y:date[0],
				m:date[1],
				s:date[2],
				t:date[3],
			}
			var formatarr = format.split("")
			for(let i = 0;i<formatarr.length;i++){
				if(i == 0){
					returndate = datex[formatarr[i]]
				}else{
					returndate = returndate+split+datex[formatarr[i]]
				}
			}
			return returndate;
		}
	},
	watch:{
		date:function(){
			console.log(this.date)
		}
	}
	
};
</script>

<style>
	.dateSelection{
		display: flex;
		/* width: 100%; */
		/* flex-wrap: wrap; */
		margin: 0 auto;
		height: 650rpx;

		
	}
	.weekSelection{
	  width: 100vw;
      height: 150rpx;
	  overflow:hidden;
	  white-space:nowrap;
	  padding-top: 20rpx;
	  background-color: #dadada;
		/* flex-direction: column; */
		/* flex-wrap: wrap; */
	}
	.weekSelectionBox{
		display: inline-flex;
		border-radius: 10rpx;
		border: #007AFF solid 2rpx;
		width: 130rpx;
		margin: 20rpx;
		height: 100rpx;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #FFFFFF;
	}
	.weekSelectionBoxOn{
		display: inline-flex;
		border-radius: 10rpx;
		border: #007AFF solid 2rpx;
		width: 130rpx;
		margin: 20rpx;
		height: 100rpx;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #4B93FF;
		color: #FFFFFF;
	}
	.dateSelectionBox{
		display: inline-flex;
		border-radius: 10rpx;
		border: #007AFF solid 2rpx;
		width: 20%;
		margin: 15rpx;
		height: 100rpx;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}
	.dateSelectionBoxOn{
		display: inline-flex;
		border-radius: 10rpx;
		border: #007AFF solid 2rpx;
		background-color: #007AFF;
		color: #FFFFFF;
		width: 20%;
		margin: 15rpx;
		height: 100rpx;
		justify-content: center;
		align-items: center;
	}
	.dateSelectionBoxOff{
		display: inline-flex;
		border-radius: 10rpx;
		border: #dedede solid 2rpx;
		width: 20%;
		margin: 15rpx;
		height: 100rpx;
		justify-content: center;
		align-items: center;
		color: #ebebeb;
		background-color: #dedede;
	}
	.dateSelectionBoxYou{
		display: inline-flex;
		border-radius: 10rpx;
		border: #dedede solid 2rpx;
		width: 20%;
		margin: 15rpx;
		height: 100rpx;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background-color: #83DC42;
	}
	.dateSelectionBoxThem{
		display: inline-flex;
		border-radius: 10rpx;
		border: #dedede solid 2rpx;
		width: 20%;
		margin: 15rpx;
		height: 100rpx;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background-color:#4CD964;
	}
	.btn{
		margin-top: 50rpx;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		position: absolute;

	}
	.btnqx{
		flex: 1;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}
	.btnqd{
		flex: 1;
		justify-content: center;
		align-items: center;
		background-color: #2979FF;
		color: #FFFFFF;
	}
	.checkbtn{
		display: flex;
		width: 100%;
	}
	.check{
		flex: 1;
		height: 50rpx;
		justify-content: center;
		align-items: center;
		margin: 10rpx;
	}
</style>
