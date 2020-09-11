<template>
	<view>
		<darkCalendar
			:signeddates="[1]"
			@on-click="onClickDate"
		></darkCalendar>
		<input type="text" v-model="dateChecked">
	</view>
</template>

<script>
	import darkCalendar from '../../components/dark-calendar/dark-calendar.vue'
	export default{
		components:{
			darkCalendar
		},
		data(){
			return {
				dateChecked:''
			}
		},
		methods:{
			onClickDate(date){
				this.dateChecked =date
			}
		}
	}
</script>

<style>
</style>
