<template>
	<view>
		<darkCalendar
			:signeddates="[1]"
			@on-click="onClickDate"
		></darkCalendar>
		<nx-time-picker :date="date" @showClose="showClose" @showTime="showTime" @checkDate="checkDate" ></nx-time-picker>
		<input type="text" v-model="dateChecked">
	</view>
</template>

<script>
	import nxTimePicker from '@/components/nx-time-picker/nx-time-picker.vue';
	import darkCalendar from '../../components/dark-calendar/dark-calendar.vue'
	export default{
		components:{
			darkCalendar,
			nxTimePicker
			
		},
		data(){
			return {
				dateChecked:'',
				 date:[
				            {
				                id:1,
				                startTime:"8:00",
				                isCan:0 
				            },
				            {
				                id:2,
				                startTime:"8:30",
				                isCan:0 
				            }
				        ,
				        
				            {
				                id:1,
				                startTime:"9:00",
				                isCan:0 
				            },
				            {
				                id:2,
				                startTime:"9:30",
				                isCan:0 
				            }
				        ,
				       
				            {
				                id:1,
				                startTime:"10:00",
				                isCan:0 
				            },
				            {
				                id:2,
				                startTime:"10:30",
				                isCan:0 
				            }
				        ]
			}
		},
		methods:{
			onClickDate(date){
				this.dateChecked =date
			},
			  showClose(){
			        console.log("点击了取消")
			    },
			    showTime(obj){
			        console.log("点击了确定")
			        console.log(obj)
			    },
			    checkDate(date){
			        console.log("选择了日期")
			        console.log(date)
			        this.date = this.date1
			    }
		}
	}
</script>

<style>
</style>
