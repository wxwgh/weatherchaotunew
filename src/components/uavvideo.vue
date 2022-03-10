<template>
	<div class="uav_video" v-if="get_flag">
		<div class="uav_video_header">
			<span>浮空平台视频</span>
			<span class="iconfont icon-guanbi4" @click="uav_video_close()"></span>
		</div>
		<div class="uav_video_main">
			<div class="uav_video_child"></div>
			<div>
				<span style="height:1px;flex-grow:1;background-color:rgba(31,126,252,.6)"></span>
			</div>
			<div class="uav_video_child"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'uavvideo',
		data() {
			return {
			}
		},
		computed: {
			get_flag: function() {
				return this.$store.state.uav_video_flag;
			}
		},
		methods: {
			uav_video_close() {
				this.$store.state.uav_video_flag=false;
			},
		},
	}
</script>

<style lang="less">

@hovercolor:#409EFF;
.uav_video{
	position:absolute;
	width:560px;
	height:850px;
	top:140px;
	right:55px;
	z-index:1003;
	background: rgba(10,15,25,.5);
	border: 1px rgba(31,126,252,.6) solid;
	color:#fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items:center;
}
.uav_video:before{
	content: '';
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 140px;
	background: linear-gradient(to bottom, rgba(12,52,130,.5), transparent);
	z-index: -100;
}
.uav_video_header{
	position: relative;
	width:92%;
	line-height:40px;
	height:40px;
	font-size: 15px;
	background: url(../assets/images/indexs_head.png) 0 0 no-repeat;
	text-align: center;
	font-weight: bold;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
}
.uav_video_header span:last-child:hover{
	color:@hovercolor;
	cursor:pointer;
}
.uav_video_header>span:nth-child(1):after{
	content: '';
	display: block;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 4px;
	height: 16px;
	background: #fff;
	border-radius: 2px;
}
.uav_video_header>span:nth-child(1){
	margin-left: 12px;
	font-size: 20px;
}
.uav_video_main{
	width: 100%;
	height:100%;
	padding: 0;
	background: transparent;
	display: absolute;
}

.uav_video_child{
	float:left;
	width:540px;
	height:380px;
	z-index:1003;
	margin:10px;
	background: rgba(10,15,25,.5);
	border: 1px rgba(31,126,252,.6) solid;
	color:#fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items:center;
}
</style>
