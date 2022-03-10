<template>
	<div class="iframeinfo_parent" v-if="get_flag">
		<div class="iframeinfo_header">
			<span>{{get_title}}</span>
			<span class="iconfont icon-guanbi4" @click="close_click()"></span>
		</div>
		<div class="iframeinfo_main">
			<iframe :src="get_src" width="100%" height="100%" allowTransparency="true" frameborder="0" scrolling="auto"></iframe>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'iframeinfo',
		data() {
			return {
			}
		},
		computed: {
			get_flag: function() {
				return this.$store.state.iframeinfo_flag;
			},
			get_title: function() {
				return this.$store.state.iframeinfo_title;
			},
			get_src:function(){
				return this.$store.state.iframeinfo_src;
			}
		},
		methods: {
			close_click() {
				this.$store.state.iframeinfo_flag=false;
			},
		},
	}
</script>

<style lang="less">
@hovercolor:#409EFF;
.iframeinfo_parent{
	position:absolute;
	width:100%;
	height:100%;
	top:0;
	left:0;
	z-index:1007;
	background: rgba(10,15,25,.5);
	color:#fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items:center;
}
.iframeinfo_parent:before{
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
.iframeinfo_header{
	position: relative;
	width:98%;
	line-height:60px;
	height:60px;
	font-size: 16px;
	background: url(../../assets/images/indexs_head.png) 0 0 no-repeat;
	text-align: center;
	font-weight: bold;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
}
.iframeinfo_header span:last-child:hover{
	color:@hovercolor;
	cursor:pointer;
}

.iframeinfo_main{
	width: 100%;
	height:100%;
	padding: 0;
	background: transparent;
}
</style>
