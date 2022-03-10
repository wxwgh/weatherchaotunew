<template>
	<div class="satebuttonslfhzy_div"v-if="get_button_flag">
		<div class="satebuttonslfhzy_container">
			<div v-for="post in get_button_config" :class="{'satebuttonslfhzy_parent':true,'active':post.is_active}" @click="button_click(post)">
				<span>{{post.name}}</span>
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'statebutton',
		data() {
			return {
			}
		},
		computed:{
			get_button_config:function(){
				var temp_config = this.$store.state.slfhzy;
				return temp_config.child;
			},
			get_button_flag:function(){
				return this.$store.state.task_config.task_button_flag;
			}
		},
		methods: {
			button_click(post) {
				var $this = this;
				var config = this.$store.state.slfhzy;
				var type = post.type;
				// 设置子菜单选中或取消
				for(let x=0;x<config.child.length;x++){
					if(post.name == config.child[x].name){
						if(config.child[x].is_active){
							config.child[x].is_active=false;
							// 清除marker
							for(let s=0;s<config.child[x].markers.length;s++){
								config.child[x].markers[s].remove();
							}
							config.child[x].markers=[];
							
							//关闭右侧面板
							$this.$store.state.right_panel_flag=false;
							return false;
						}else{
							config.child[x].is_active=true;
						}
					}
				}

				//调用服务
				this.axios({
					method:"get",
					url:post.url
				}).then(function(result){
					var datas = result.data.data;
					//根据数据创建marker
					var num = 500;
					if(datas.length <num){
						num = datas.length;
					}
					
					for (let i = 0; i < num; i++) {
						var temp_config = $this.get_right_config(datas[i], type,post.name);
						temp_config.name = datas[i].NAME;
						var points = datas[i].POSITION.substring(6,datas[i].POSITION.length-1).split(" ");
						
						$this.myCommon.create_marker([points[1],points[0]], post.icon_url,temp_config,"森林防火资源","");
						
					}
				})
			},
			get_right_config(data,type,child_name){
				var $this =this;
				var temp_config={};
				var left_configs = $this.$store.state.slfhzy;
				temp_config = JSON.parse(JSON.stringify(left_configs.right_config));	
				temp_config.child_name=child_name;

				for(let key in temp_config.attribution){
					temp_config.attribution[key] = data[temp_config.attribution[key]];
				}
				return temp_config;
			},
			
		},
	}
</script>

<style lang="less">

.satebuttonslfhzy_div{
	position: absolute;
	bottom:68px;
	width:100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	z-index:1002;
	pointer-events: none;
}
.satebuttonslfhzy_container{
	width:615px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
	align-items: center;
	pointer-events:auto
}
.satebuttonslfhzy_parent{
	font-size: 15px;
	border: 1px rgba(255,255,255,.2) solid;
	padding: 0 14px;
	line-height: 34px;
	color:#fff;
	font-weight: bold;
	// box-shadow: 0 0 10px rgb(255,255,255,0.2) inset;	
	cursor: pointer;
}
.satebuttonslfhzy_parent.active,
.satebuttonslfhzy_parent:hover{
	box-shadow: 0 0 12px rgb(232,233,0,0.5) inset;
	color: #e8e900;
	border-color: rgba(232,233,0,0.5);
}
</style>
