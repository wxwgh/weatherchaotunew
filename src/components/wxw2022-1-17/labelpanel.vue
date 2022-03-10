<template>
	<div class="labelpanel_div_parent" v-if="get_flag">
		<div class="labelpanel_parent">
			<!-- 头部标题 -->
			<div class="labelpanel_header">
				<span>人员信息</span>
				<span class="iconfont icon-guanbi4" @click="close_click()"></span>
			</div>
			<!-- 内容 -->
			<div class="labelpanel_main">
				<div>
					<div>
						<div @click="info_click()">
							<span>基本概况</span>
						</div>
						<div>
							<span>基本信息</span>
						</div>
					</div>
					<div>
						<img src="../../assets/images/touxiang.png" />
					</div>
					<div>
						<div>
							<span>任务标签</span>
						</div>
						<div>
							<span>社会经历</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'labelpanel',
		data() {
			return {
			}
		},
		computed: {
			get_flag: function() {
				return this.$store.state.labelpanel_flag;
			},
		},	
		methods: {
			close_click() {
				this.$store.state.labelpanel_flag=false;
			},
			info_click() {
				this.$store.state.iframeinfo_flag=true;
			},
		},
	}
</script>

<style lang="less">
	//引入全局样式
	@import "../../assets/less/style.less";
	
	.labelpanel_div_parent{
		position: absolute;
		left: 50%;
		top: 0;
		width: 600px;
		height: 100%;
		z-index: 1006;
		margin-left: -300px;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
	}
	.labelpanel_parent{
		position: relative;
		pointer-events: auto;
		color: #fff;
		width: 100%;
		height:50%;
		z-index: 1006;
		background: rgba(10, 15, 25, .5);
		border: 1px rgba(31, 126, 252, .6) solid;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.labelpanel_parent:before {
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
	.labelpanel_header {
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
	
	.labelpanel_header>span:nth-child(1) {
		margin-left: 12px;
		font-weight: bold;
		font-size: 20px;
		width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.labelpanel_header>span:nth-child(2) {
		width: 16px;
		cursor: pointer;
	}
	
	.labelpanel_header>span:nth-child(2):hover {
		color: #409EFF;
	}
	
	.labelpanel_header>span:nth-child(1):after {
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
	
	.labelpanel_main{
		@display_column_start();
		align-items: center;
		height:100%;
		width: 100%;
		overflow: auto;
		&>div{
			width:90%;
			height: 100%;
			color:#fff;
			font-weight: bold;
			@display_row_between();
			&>div:nth-child(1){
				width:25%;
				height:300px;
				@display_column_around();
				align-items: center;
				&>div{
					width:100%;
					line-height: 40px;
					text-align: center;
					cursor:pointer;
					border:0.0625rem rgba(31, 126, 252, 0.8) solid;
					box-shadow: 0 0 0.75rem #1f7efc inset
				}
				&>div:hover{cursor:pointer;box-shadow:0 0 12px rgba(232,233,0,.5) inset;color:#e8e900;border-color:rgba(232,233,0,.5);}
			}
			&>div:nth-child(2){
				width: 37%;
				@display_column_center();
				&>img{
					width:100%;
					height:300px;
				}
			}
			&>div:nth-child(3){
				width:25%;
				height:300px;
				@display_column_around();
				&>div{
					width:100%;
					line-height:40px;
					text-align: center;
					cursor:pointer;
					border:0.0625rem rgba(31, 126, 252, 0.8) solid;
					box-shadow: 0 0 0.75rem #1f7efc inset
				}
				&>div:hover{cursor:pointer;box-shadow:0 0 12px rgba(232,233,0,.5) inset;color:#e8e900;border-color:rgba(232,233,0,.5);}
			}
		}
		
	}
</style>
