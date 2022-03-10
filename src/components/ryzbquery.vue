<template>
	<div class="rightpanel_div_parent left_div">
		<div class="rightpanel_div" v-if="get_right_flag">
			<div class="rightpanel_parent">
				<!-- 头部标题 -->
				<div class="rightpanel_header">
					<span>北斗星通</span>
					<span class="iconfont icon-guanbi4" @click="close_click()"></span>
				</div>
				<!-- 内容 -->
				<div class="rightpanel_main">
					<div class="rightpanel_main_header">
						<span>总队筛选</span>
					</div>
					<div class="rightpanel_scope_parent">
						<span>总队名称：</span>
						<el-dropdown size="mini" split-button type="primary" @command="changeDW" style="top:5px;left:20px">
							{{currentduiwu}}
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item  v-for="item in duiwuList" :key="item.subname" :command="item.name+'-'+item.subname">{{item.name}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div class="scope_button_parent">
						<div @click="search_by_dw('人员装备信息','北斗星通')">
							<div>
								<span class="iconfont icon-sousuo"></span>
								<span>筛选</span>
							</div>
						</div>
						<div @click="search_by_dw_clear('人员装备信息','北斗星通')">
							<div>
								<span class="iconfont icon-qingchu2"></span>
								<span>清除</span>
							</div>
						</div>
					</div>
					<div class="rightpanel_main_header">
						<span>历史在线设备查询</span>
					</div>
					<div class="rightpanel_time_parent">
						<span>时间范围</span>
						<el-date-picker v-model="search_time" popper-class="time_select_class_uav" align="left"
							size="mini" type="datetimerange" range-separator="至" start-placeholder="开始时间"
							end-placeholder="结束时间">
						</el-date-picker>
					</div>
					<div class="time_button_parent">
						<div @click="search_by_time('人员装备信息','北斗星通')">
							<div>
								<span class="iconfont icon-sousuo"></span>
								<span>开始查询</span>
							</div>
						</div>
						<div @click="search_by_time_clear('人员装备信息','北斗星通')">
							<div>
								<span class="iconfont icon-qingchu2"></span>
								<span>清除</span>
							</div>
						</div>
					</div>
					
					<div class="rightpanel_main_header">
						<span>短报文</span>
					</div>
					<div class="rightpanel_time_parent">
						<span>时间范围</span>
						<el-date-picker v-model="person_track_time" popper-class="time_select_class_uav" align="left"
							size="mini" type="datetimerange" range-separator="至" start-placeholder="开始时间"
							end-placeholder="结束时间">
						</el-date-picker>
					</div>
					<div class="time_button_parent">
						<div @click="person_track_new('人员装备信息','北斗星通')">
							<div>
								<span class="iconfont icon-sousuo"></span>
								<span>开始查询</span>
							</div>
						</div>
						<div @click="scope_clear('人员装备信息','北斗星通')">
							<div>
								<span class="iconfont icon-qingchu2"></span>
								<span>清除</span>
							</div>
						</div>
					</div>
					<div class="dbw_main_parent">
						<div v-for="post in get_dbw_config">
							<div>
								<span>设备ID：</span>
								<span>{{post.useraddress}}</span>
							</div>
							<div>
								<span>入库时间：</span>
								<span>{{post.jlrksj}}</span>
							</div>
							<div>
								<span>单位名称：</span>
								<span>{{post.dw}}</span>
							</div>
							<div>
								<span>内容：</span>
								<span>{{post.message}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ryzbquery',
		data() {
			return {
				currentduiwu:'请选择',
				currentduiwusub:'',
        		duiwuList:[
					{
						"name":"云南总队",
						"subname":"云南"
					},
					{
						"name":"新疆总队",
						"subname":"新疆"
					},
					{
						"name":"甘肃总队",
						"subname":"甘肃"
					},
					{
						"name":"福建总队",
						"subname":"福建"
					},
					{
						"name":"内蒙古总队",
						"subname":"内蒙古"
					},
					{
						"name":"四川总队",
						"subname":"四川"
					},
					{
						"name":"吉林总队",
						"subname":"吉林"
					},
					{
						"name":"西藏总队",
						"subname":"西藏"
					},
					{
						"name":"黑龙江总队",
						"subname":"黑龙江"
					}
				],
				person_track_time: "",
				search_time:"",
				
			}
		},
		computed: {
			get_right_flag: function() {
				this.currentduiwu="请选择";
				return this.$store.state.ryzbquery_flag;
			},
			get_dbw_config:function(){
				return this.$store.state.dbw_config;
			}
		},
		mounted: function() {
			// this.init_dbw();
		},
		methods: {
			//初始化短报文
			init_dbw(){
				let $this = this;
				var params = {
					"starttm": $this.moment(new Date()).format("YYYY-MM-DD")+" 00:00:00", //开始时间
					"endtm":$this.moment(new Date()).format("YYYY-MM-DD")+" 23:59:59", //结束时间
				}
				this.axios({
					method: "get",
					url: this.$store.state.message_url,
					params: params
				}).then(function(result) {
					$this.$store.state.dbw_config = result.data.data;
					if($this.$store.state.dbw_config.length>0){
						for(let i=0;i<$this.$store.state.dbw_config.length;i++){
							$this.$store.state.dbw_config[i]["jlrksj"] = $this.moment($this.$store.state.dbw_config[i]["jlrksj"]).format('YYYY-MM-DD HH:mm:ss');
						}
					}else{
						$this.myCommon.get_message("今日暂无短报文信息");
					}
				})
			},
			close_click() {
				this.$store.state.ryzbquery_flag = false;
				this.currentduiwu="请选择";
			},
			changeDW(data){
                // 处理点击时不选的错误
                if(typeof data == "object"){
                    return
                }
                
                this.currentduiwu = data.split('-')[0]
				this.currentduiwusub = data.split('-')[1]
			},
			init_dw(){
				let $this = this;
				let type = "人员装备信息";
				let name = "北斗星通";
				var post;
				var left_configs = this.$store.state.left_panel_config;
				$this.$store.state.loading=true;
				for(let i=0;i<left_configs.length;i++){
					for(let j=0;j<left_configs[i].child.length;j++){
						if(type===left_configs[i].child[j].name){
							for(let x=0;x<left_configs[i].child[j].child.length;x++){
								if(name === left_configs[i].child[j].child[x].name){
									post = left_configs[i].child[j].child[x];
								}
							}
						}
					}
				}
				this.axios({
					method: "get",
					url: post.url
				}).then(function(result) {
					var datas = result.data.data;
					if(datas.length<=0){
						$this.$store.state.loading=false;
						$this.myCommon.get_message("当前无在线设备");
					}else{
						for (let i = 0; i < datas.length; i++) {
							var temp_config = $this.get_right_config(datas[i], type,post.name);
							temp_config.attribution.时间 = $this.moment(temp_config.attribution.时间).format('YYYY-MM-DD HH:mm:ss');
							$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
								post.icon_url, temp_config, "人员装备信息","");
						}
						$this.$store.state.loading=false;
					}
				}).catch(function(e){
					$this.$store.state.loading=false;
					$this.myCommon.get_message("请求超时或服务无响应");
				})
			},
			clear_markers(type,name){
				var post;
				var left_configs = this.$store.state.left_panel_config;
				for(let i=0;i<left_configs.length;i++){
					for(let j=0;j<left_configs[i].child.length;j++){
						if(type===left_configs[i].child[j].name){
							for(let x=0;x<left_configs[i].child[j].child.length;x++){
								if(name === left_configs[i].child[j].child[x].name){
									post = left_configs[i].child[j].child[x];
								}
							}
						}
					}
				}
				// 清除marker
				if (post.markers) {
					for (let s = 0; s < post.markers.length; s++) {
						post.markers[s].remove();
					}
					post.markers = [];
				}
			},
			search_by_time(type,name){
				let $this = this;
				$this.$store.state.loading=true;
				let post;
				let left_configs = this.$store.state.left_panel_config;
				for(let i=0;i<left_configs.length;i++){
					for(let j=0;j<left_configs[i].child.length;j++){
						if(type===left_configs[i].child[j].name){
							for(let x=0;x<left_configs[i].child[j].child.length;x++){
								if(name === left_configs[i].child[j].child[x].name){
									post = left_configs[i].child[j].child[x];
								}
							}
						}
					}
				}
				this.clear_markers(type,name);
				var start_time = this.moment(this.search_time[0]).format("YYYY-MM-DD HH:mm:ss");
				var end_time = this.moment(this.search_time[1]).format("YYYY-MM-DD HH:mm:ss");
				var params = {
					"starttm": start_time, //开始时间
					"endtm": end_time, //结束时间
				}
				this.axios({
					method: "get",
					url: post.url_time,
					params: params
				}).then(function(result) {
					let datas = result.data.data;
					if(datas.length<=0){
						$this.$store.state.loading=false;
						$this.myCommon.get_message("当前时间区间无在线设备");
					}else{
						for (let i = 0; i < datas.length; i++) {
							let temp_config = $this.get_right_config(datas[i], type,post.name);
							temp_config.attribution.时间 = $this.moment(temp_config.attribution.时间).format('YYYY-MM-DD HH:mm:ss');
							$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
								post.icon_url, temp_config, "人员装备信息","");
						}
						$this.$store.state.loading=false;
					}
					
				}).catch(function(e){
					$this.$store.state.loading=false;
					$this.myCommon.get_message("请求超时或服务无响应");
				})
			},
			search_by_time_clear(type,name){
				this.clear_markers(type,name);
				//初始化为 全部在线设备
				this.init_dw();
			},
			search_by_dw(type,name) {
				if(this.currentduiwusub == '') return;

				var $this = this;
				$this.$store.state.loading=true;
				var post;
				var left_configs = this.$store.state.left_panel_config;
				for(let i=0;i<left_configs.length;i++){
					for(let j=0;j<left_configs[i].child.length;j++){
						if(type===left_configs[i].child[j].name){
							for(let x=0;x<left_configs[i].child[j].child.length;x++){
								if(name === left_configs[i].child[j].child[x].name){
									post = left_configs[i].child[j].child[x];
								}
							}
						}
					}
				}
				this.clear_markers(type,name);
				var params = {
					"dwdm": this.currentduiwusub
				}

				this.axios({
					method: "get",
					url: post.url_dwdm,
					params: params
				}).then(function(result) {
					var datas = result.data.data;
					if(datas.length<=0){
						$this.$store.state.loading=false;
						$this.myCommon.get_message("当前队伍无在线设备");
					}else{
						for (let i = 0; i < datas.length; i++) {
							var temp_config = $this.get_right_config(datas[i], type,post.name);
							temp_config.attribution.时间 = $this.moment(temp_config.attribution.时间).format('YYYY-MM-DD HH:mm:ss');
							$this.myCommon.create_marker([temp_config.attribution.纬度, temp_config.attribution.经度],
								post.icon_url, temp_config, "人员装备信息","");
						}
						$this.$store.state.loading=false;
					}
					
				}).catch(function(e){
					$this.$store.state.loading=false;
					$this.myCommon.get_message("请求超时或服务无响应");
				})
			},
			search_by_dw_clear(type,name){
				this.clear_markers(type,name);
				//初始化为 全部在线设备
				this.init_dw();
			},
			scope_clear(type,name){
				var $this = this;
				this.init_dbw();
			},
			person_track_new(type,name){
				if (this.person_track_time == "" || this.person_track_time == null) {
					this.myCommon.get_message("请先选择时间范围");
					return false;
				}

				var $this = this;

				var start_time = this.moment(this.person_track_time[0]).format("YYYY-MM-DD HH:mm:ss");
				var end_time = this.moment(this.person_track_time[1]).format("YYYY-MM-DD HH:mm:ss");
				var params = {
					"starttm": start_time, //开始时间
					"endtm": end_time, //结束时间
				}
				this.axios({
					method: "get",
					url: $this.$store.state.message_time_url,
					params: params
				}).then(function(result) {
					$this.$store.state.dbw_config = result.data.data;
					if($this.$store.state.dbw_config.length>0){
						for(let i=0;i<$this.$store.state.dbw_config.length;i++){
							$this.$store.state.dbw_config[i]["jlrksj"] = $this.moment($this.$store.state.dbw_config[i]["jlrksj"]).format('YYYY-MM-DD HH:mm:ss');
						}
					}else{
						$this.myCommon.get_message("查询暂无数据");
					}
				})
			},
			get_right_config(data, type,child_name) {
				var $this = this;
				var temp_config = {};
				var left_configs = $this.$store.state.left_panel_config;
				for (let i = 0; i < left_configs.length; i++) {
					for (let j = 0; j < left_configs[i].child.length; j++) {
						if (type === left_configs[i].child[j].name) {
							temp_config = JSON.parse(JSON.stringify(left_configs[i].child[j].right_config));
						}
					}
				}
				temp_config.child_name=child_name;
				if (type === "人员装备信息") {
					temp_config.name = data.xm;
					temp_config.gpsid=data.gpsid;
					for (let key in temp_config.attribution) {
						if (key === "电量") {
							temp_config.attribution[key] = (Number(data[temp_config.attribution[key]]) > 0 ? data[
								temp_config.attribution[key]] + '%' : '');
						} else {
							temp_config.attribution[key] = data[temp_config.attribution[key]];
						}
					}
				} 
				return temp_config;
			}
		}
		
	}
</script>

<style lang="less">
	.rightpanel_div_parent{
		position: absolute;
		right: 55px;
		top: 0;
		width: 380px;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
	}
	.left_div{
		left: 250px !important;
	}
	.dbw_main_parent{
		width:100% !important;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		&>div{
			margin-bottom: 3%;
			width:95%;
			border: 1px rgba(255, 255, 255, 0.2) solid;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			&>div{
				width: 95%;
				&>span:nth-child(1){
					color:#409EFF;
					font-size: 13px;
				}
				&>span:nth-child(2){
					white-space: pre-wrap;
					font-size: 12px;
				}
			}
		}
		&>div:hover{
			border: 1px rgba(31,126,252,.8) solid;
			box-shadow: 0 0 12px rgb(31,126,252,0.5) inset;
		}
	}
	.rightpanel_div {
		position: relative;
		color: #fff;
		width: 100%;
		margin-top:30px;
		max-height:70%;
		z-index: 1006;
		background: rgba(10, 15, 25, .5);
		border: 1px rgba(31, 126, 252, .6) solid;
	}

	.rightpanel_parent {
		width: 100%;
		height: 100%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}

	.rightpanel_parent:before {
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

	.rightpanel_header {
		width: 92%;
		height: 40px;
		line-height: 40px;
		position: relative;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		background: url(../assets/images/indexs_head.png) 0 0 no-repeat;
	}

	.rightpanel_header>span:nth-child(1) {
		margin-left: 12px;
		font-weight: bold;
		font-size: 20px;
		width: 300px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rightpanel_header>span:nth-child(2) {
		width: 16px;
		cursor: pointer;
	}

	.rightpanel_header>span:nth-child(2):hover {
		color: #409EFF;
	}

	.rightpanel_header>span:nth-child(1):after {
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

	.rightpanel_main {
		width: 92%;
		max-height: 100%;
		margin-bottom: 2%;
		overflow: auto;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-top: 15px;
		border: 1px rgba(255, 255, 255, 0.2) solid;
	}

	.rightpanel_main_header {
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

	.rightpanel_main_header:before {
		content: '';
		display: block;
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0;
		height: 1px;
		background: rgba(255, 255, 255, .2);
	}

	.rightpanel_main_header>span {
		margin-left: 12px;
		font-size: 17px;
	}

	.rightpanel_main_header>span:after {
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

	.rightpanel_main_content {
		position: relative;
		width: 92%;
		line-height: 24px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}

	.rightpanel_main_content>div {
		margin-top: 4px;
		color: #fff;
		font-size: 15px;
		background: url(../assets/images/list.png) 0 center no-repeat;
		padding-left: 24px;
	}

	.rightpanel_main_content>div:nth-child(1) {
		margin-top: 14px;
	}

	.rightpanel_main_content>div:last-child {
		margin-bottom: 10px;
	}

	.danwei_parent {
		font-size: 13px;
	}

	.danwei_parent>span {
		cursor: pointer;
	}

	.danwei_parent>span:first-child {
		margin-right: 5px;
	}

	.danwei_parent>span.active,
	.danwei_parent>span:hover {
		color: #409EFF;
	}

	.rightpanel_time_parent {
		width: 92%;
		margin-top: 15px;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		// align-items: flex-start;
	}

	.rightpanel_time_parent>span {
		border: 1px rgba(255, 255, 255, .2) solid;
		border-right: 0;
		text-align: center;
		font-size: 13px;
		line-height: 34px;
		color: #409EFF;
		font-weight: bold;
		padding: 0 15px;
	}

	//时间下拉框样式
	.time_select_class {
		left:auto !important;
		right:40px !important;
	}

	//时间下拉框样式
	.time_select_class_uav {
		left:auto !important;
		left:360px !important;
	}

	.rightpanel_main_content>div>span:last-child {
		white-space: nowrap;
		/* 强制性的在一行显示所有的文本，直到文本结束或者遭遇br标签对象才换行*/
		overflow: hidden;
		/* 溢出的文字隐藏起来*/
		text-overflow: ellipsis;

	}

	//范围查询样式
	.rightpanel_scope_parent {
		width: 92%;
		margin-top: 15px;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}

	.rightpanel_scope_parent>span:first-child {
		border: 1px rgba(255, 255, 255, .2) solid;
		border-right: 0;
		text-align: center;
		font-size: 13px;
		line-height: 34px;
		color: #409EFF;
		font-weight: bold;
		padding: 0 15px;
	}

	.rightpanel_scope_parent>span:last-child {
		border: 1px rgba(255, 255, 255, .2) solid;
		border-left: 0;
		text-align: center;
		font-size: 13px;
		line-height: 34px;
		color: #fff;
		font-weight: bold;
		padding: 0 15px;
	}

	.scope_input {
		flex: 1;
	}

	.scope_input .el-input__inner {
		background: 0;
		border: 1px rgba(255, 255, 255, .2) solid !important;
		line-height: 34px !important;
		font-size: 13px;
		padding: 0 15px;
		border-radius: 0;
		color: #fff;
	}

	// 输入提示框样式
	// .scope_select_class{
	// 	background: rgba(10,15,25,.5);
	// 	border: 1px rgba(31,126,252,.6) solid;
	// }
	// .scope_select_class .el-autocomplete-suggestion__list>li{
	// 	color:#fff;
	// }
	// .scope_select_class .el-autocomplete-suggestion__list>li:hover{
	// 	background: rgba(31, 126, 252, 0.4);
	// }
	// .scope_select_class>.popper__arrow:after{
	// 	border-top-color: rgba(10,15,25,.5)!important;
	// 	border-bottom-color: rgba(10,15,25,.5)!important;
	// }
	// .scope_select_class>.popper__arrow{
	// 	border-top-color: #409EFF!important;
	// 	border-bottom-color:#409EFF!important;
	// }
	.scope_button_parent {
		width: 92%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
		text-align: center;
		font-size: 13px;
		color: #fff;
	}

	.scope_button_parent>div {
		background: #236FD1;
		margin-right: 10px;
		width: 90px;
		height: 26px;
		line-height: 26px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		border-radius: 3px;
		cursor: pointer;
	}

	.scope_button_parent>div:hover {
		background: #409EFF;
	}

	.scope_button_parent>div>div {
		line-height: 26px;
	}

	.scope_button_parent>div:last-child {
		width: 64px;
		margin-right: 0;
	}

	.scope_button_parent>div>div>span:first-child {
		font-size: 14px;
		margin-right: 5px;
	}

	// 轨迹查询样式
	.time_button_parent {
		width: 92%;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
		text-align: center;
		font-size: 13px;
		color: #fff;
	}

	.time_button_parent>div {
		background: #236FD1;
		width: 90px;
		height: 26px;
		line-height: 26px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		border-radius: 3px;
		cursor: pointer;
	}

	.time_button_parent>div:hover {
		background: #409EFF;
	}

	.time_button_parent>div>div {
		line-height: 26px;
	}

	.time_button_parent>div:last-child {
		margin-left: 10px;
		width: 64px;
	}

	.time_button_parent>div>div>span:first-child {
		font-size: 14px;
		margin-right: 5px;
	}

	// 时间选择框
	.rightpanel_time_parent .el-range-editor--mini.el-input__inner {
		height: 36px;
		padding: 0 10px;
	}

	.rightpanel_time_parent .el-input__inner {
		background: none;
		border: 1px rgba(255, 255, 255, .2) solid;
		border-radius: 0;
		text-align: center;
	}

	.rightpanel_time_parent .el-date-editor .el-range__icon {
		line-height: 34px !important;
	}

	.rightpanel_time_parent .el-range-editor .el-range-input {
		color: #fff;
		font-family: 'arial';
		background: none;
	}

	.rightpanel_time_parent .el-date-editor .el-range-separator {
		color: #fff;
		line-height: 34px;
		width: auto;
	}

	.rightpanel_time_parent .el-range-editor--mini .el-range__close-icon,
	.el-range-editor--mini .el-range__icon {
		line-height: 34px;
	}

	//范围结果列表演示
	.scope_list_parent {
		width: 92%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 15px;
		border: 1px rgba(255, 255, 255, 0.2) solid;
	}

	.scope_result_parent {
		width: 92%;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		max-height:300px;
		overflow: auto;
	}

	.scope_result {
		background: rgba(25, 40, 58, .4);
		margin-bottom: 10px;
		font-size: 13px;
		padding: 10px;
		border: 1px rgba(31,126,252,.1) solid;
		cursor:pointer
	}

	.scope_result>div:nth-child(1) {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.scope_result.active,
	.scope_result:hover{
		border: 1px rgba(31,126,252,.8) solid;
		box-shadow: 0 0 12px rgb(31,126,252,0.5) inset;
	}
	.scope_result>div:nth-child(1)>span {
		color: #409EFF;
		font-weight: bold;
	}

	.scope_result>div:not(.scope_result>div:nth-child(1)) {
		margin-left: 22px;
	}

	.scope_result img {
		width: 22px;
		height: 22px;
	}

	// 卫星图片
	.rightpanel_img_parent {
		width: 92%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin-top: 25px;
		margin-bottom: 25px;
	}

	.rightpanel_img_parent>div>img {
		width: 152px;
		height: 95px;
	}

	.rightpanel_img_parent>div {
		position: relative;
		cursor: pointer;
	}

	.rightpanel_img_parent>div>span {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		font-size: 13px;
		line-height: 30px;
		background: rgba(0, 0, 0, .5);
		padding: 0 10px
	}

	// 大图样式
	.overlay-boxs {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .9);
		z-index: 1010;
	}

	.overlay-boxs span.close {
		position: absolute;
		right: 20px;
		top: 20px;
		width: 30px;
		height: 40px;
		line-height: 40px;
		z-index: 1010;
	}

	.overlay-boxs span.close i.iconfont {
		font-size: 24px;
		color: #fff;
		z-index: 1010;
	}

	.overlay-boxs span.close:hover i.iconfont {
		color: #409EFF;
		cursor: pointer;
		z-index: 1010;
	}

	.overlay-head {
		float: left;
		width: 100%;
		height: 80px;
		font-size: 20px;
		font-weight: bold;
		color: #fff;
		padding: 0 20px;
		line-height: 80px;
	}

	.overlay-main {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 80px;
		overflow: hidden;
		text-align: center;
		z-index: 1003;
	}

	.fullImg {
		width: auto;
		height: 80%;
		display: inline-block;
	}
</style>
