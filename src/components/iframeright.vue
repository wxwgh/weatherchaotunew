<template>
	<div class="right_iframe" v-if="get_flag">
		<div class="right_iframe_header">
			<span></span>
			<span class="iconfont icon-guanbi4" @click="right_iframe_close()"></span>
		</div>
		<div class="right_iframe_main">
			<iframe :src="get_src" width="100%" height="100%" allowTransparency="true" frameborder="0" scrolling="auto"></iframe>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'iframeright',
		data() {
			return {
			}
		},
		computed: {
			get_flag: function() {
				return this.$store.state.right_iframe_flag;
			},
			get_src:function(){
				return this.$store.state.right_iframe_src;
			}
		},
		methods: {
			right_iframe_close() {
				this.$store.state.right_iframe_flag=false;
			},
		},
	}
</script>

<style lang="less">

@hovercolor:#409EFF;
.right_iframe{
	position:absolute;
	width:480px;
	height:850px;
	top:140px;
	right:11px;
	z-index:1003;
	background: rgba(10,15,25,.5);
	border: 1px rgba(31,126,252,.6) solid;
	color:#fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items:center;
}
.right_iframe:before{
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
.right_iframe_header{
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
.right_iframe_header span:last-child:hover{
	color:@hovercolor;
	cursor:pointer;
}
/*
.right_iframe_header>span:nth-child(1):after{
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
*/
.right_iframe_header>span:nth-child(1){
	margin-left: 12px;
}
.right_iframe_main{
	width: 100%;
	height:100%;
	padding: 0;
	background: transparent;
}
</style>
