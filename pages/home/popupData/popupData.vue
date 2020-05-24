<template>
	<view >
		<uni-popup ref="dataRange" type="center" @closepupop="closePupop" :maskClick="false">
			 <view class="popup-data">
				 <view class="popup-content"  v-for="item,index in regNumDataRange" :key="index">
				 					 
				 	<input type="text" v-model="item.value" disabled :class="item.checked"  @click="checkedInput(index)"/>
				 </view>
				 <button type="default" @click="close">aaaaa</button>
			 </view>
		</uni-popup>
	</view>
			
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import wPicker from '@/components/w-picker/w-picker.vue';
	export default {
		props:{
			openPopup:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			openPopup(oldVal){
				if( !oldVal){
					this.$emit('closePopup',false)
					
				} else {
					this.$refs.dataRange.open()
				}
			}
		},
		data() {
			return {
				
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
			uniPopup,
			wPicker
		},
		updated() {
			
		},
		methods: {
			close(){
				this.openPopup = false 
				this.$refs.dataRange.close()
			},
			open() {
				this.$refs.dataRange.open()
			},
		},
		created() {
		
		},
		onLoad(option) {
		
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
	.popup-data{
		background: #fff;
		width: 500rpx;
		height: 500rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: space-around;

	}
	.popup-content{
		border: 1px solid #ccc;
		width: 94%;
		border-radius: 30rpx;

	}
</style>
