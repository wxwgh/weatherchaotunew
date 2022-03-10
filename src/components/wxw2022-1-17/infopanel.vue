<template>
	<div class="infopanel_div_parent" v-if="get_flag">
		<div class="infopanel_parent">
			<!-- 头部标题 -->
			<div class="infopanel_header">
				<span>人员装备信息</span>
				<span class="iconfont icon-guanbi4" @click="close_click()"></span>
			</div>
			<!-- 内容 -->
			<div class="infopanel_main">
				<div class="infopanel_main_header">
					<span>通信指挥员</span>
				</div>
				<div class="infopanel_main_content">
					<div>
						<span>姓名：</span>
						<span @click="name_click()">王小明</span>
					</div>
					<div>
						<span>电话：</span>
						<span>13715614716</span>
					</div>
				</div>
				<div class="infopanel_main_header">
					<span>通信消防员</span>
				</div>
				<div class="infopanel_main_content">
					<div>
						<span>姓名：</span>
						<span @click="name_click()">李小虎</span>
					</div>
					<div>
						<span>电话：</span>
						<span>13715614716</span>
					</div>
				</div>
				<div class="infopanel_main_header">
					<span>通信装备</span>
				</div>
				<div class="infopanel_main_content">
					<div>
						<span>卫星便携站：</span>
						<span>链接</span>
					</div>
					<div>
						<span>北斗车载台：</span>
						<span>链接</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'infopanel',
		data() {
			return {
			}
		},
		computed: {
			get_flag: function() {
				return this.$store.state.infopanel_flag;
			},
		},	
		methods: {
			close_click() {
				this.$store.state.infopanel_flag=false;
			},
			name_click(){
				this.$store.state.labelpanel_flag=true;
			}
		},
	}
</script>

<style lang="less">

	.infopanel_div_parent{
		position: absolute;
		left: 55px;
		top: 0;
		width: 380px;
		height: 100%;
		z-index: 1006;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
	}
	.infopanel_parent{
		position: relative;
		pointer-events: auto;
		color: #fff;
		width: 100%;
		max-height:70%;
		z-index: 1006;
		background: rgba(10, 15, 25, .5);
		border: 1px rgba(31, 126, 252, .6) solid;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.infopanel_parent:before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 140px;
		background: linear-gradient(to bottom, rgba(12, 52, 130, .5), transparent);
		z-index: -100;
	}
	.infopanel_header {
		width: 92%;
		height: 40px;
		line-height: 40px;
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		background: url(../../assets/images/indexs_head.png) 0 0 no-repeat;
	}
	
	.infopanel_header>span:nth-child(1) {
		margin-left: 12px;
		font-weight: bold;
		font-size: 20px;
		width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.infopanel_header>span:nth-child(2) {
		width: 16px;
		cursor: pointer;
	}
	
	.infopanel_header>span:nth-child(2):hover {
		color: #409EFF;
	}
	
	.infopanel_header>span:nth-child(1):after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 13px;
		width: 4px;
		height: 16px;
		background: #fff;
		border-radius: 2px;
	}
	.infopanel_main {
		width: 92%;
		max-height: 100%;
		margin-bottom: 15px;
		overflow: auto;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-top: 15px;
		border: 1px rgba(255, 255, 255, 0.2) solid;
	}
	
	.infopanel_main_header {
		position: relative;
		width: 92%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		text-align: center;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
	}
	
	.infopanel_main_header:before {
		content: '';
		display: block;
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0;
		height: 1px;
		background: rgba(255, 255, 255, .2);
	}
	
	.infopanel_main_header>span {
		margin-left: 12px;
		font-size: 17px;
	}
	
	.infopanel_main_header>span:after {
		content: '';
		display: block;
		position: absolute;
		left: 0px;
		top: 13px;
		width: 4px;
		height: 14px;
		background: #fff;
		border-radius: 2px;
	}
	
	.infopanel_main_content {
		position: relative;
		width: 92%;
		line-height: 24px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		&>div:nth-child(1){
			&>span:nth-child(2){
				color:#409EFF;
				cursor:pointer;
			}
		}
		
	}
	.infopanel_main_content:nth-child(6) {
		&>div>span:nth-child(2){
			color:#409EFF;
			cursor:pointer;
		}
		
	}
	.infopanel_main_content>div {
		margin-top: 4px;
		color: #fff;
		font-size: 15px;
		background: url(../../assets/images/list.png) 0 center no-repeat;
		padding-left: 24px;
	}
	
	.infopanel_main_content>div:nth-child(1) {
		margin-top: 14px;
	}
	
	.infopanel_main_content>div:last-child {
		margin-bottom: 10px;
	}
</style>
