import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/util/user'
import { getToken, setToken, removeToken } from "../util/auth";
import { logout } from "@/util/logout";

import myboot_store from './modules/mybootstore';
Vue.use(Vuex)

function UUID() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}

	return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
}


export default new Vuex.Store({
	state: {
		//本地测试地址
		// message_url:"http://192.168.36.253:18081/Message",
		// message_time_url:"http://192.168.36.253:18081/Message_time",
		message_url:"/weatherserver/Message",
		message_time_url:"/weatherserver/Message_time",
		dbw_config:[],
		infopanel_flag:false,
		labelpanel_flag:false,
		iframeinfo_flag:false,
		iframeinfo_src:"https://lusongsong.com/yulu/",
		iframeinfo_title:"个人档案",
		//控制大图全局对象
		is_full_img: {
			flag: false,
			url: "",
			name: "",
		},
		// 全局地图对象
		map: "",
		//全局底图 图层对象
		layer: "",
		//全局 marker对象列表
		markers: [],
		//加载提示模态层
		loading:false,
		statis_url:"",
		statisanalyze_flag:false,
		statis_url_zbqk:"http://18.76.1.9:8078/#/equipment",//内网 装备情况
		statis_url_rwsl:"http://18.76.1.9:8078/#/task-statistics",//内网 任务数量
		statis_url_rwsj:"http://18.76.1.9:8078/#/task-time",//内网 任务时间
		statis_url_ryqk:"http://18.76.1.9:8078/#/comm-person",//内网 人员情况
		statis_url_duanbo:"http://18.76.1.191:10081/db/",//内网 短波
		//天地图路径规划地址
		//tianditu_path_url:"http://api.tianditu.gov.cn/drive",
		//天地图路径规划内网地址
		tianditu_path_url:"http://18.76.1.91:8091/tdtapi/drive",
		tianditu_key:"4fd9747624d5f7fb54ebf61ce66c96c5",
		//超图iserver 服务地址外网
		//chaotu_iserver_url:"http://114.112.161.155:8090",
		//超图iserver 服务地址内容
		chaotu_iserver_url:"http://18.76.1.191:8090",


		//气象图例
		qxlegends: [],
		//服务地址
		//host_url: "http://114.112.161.155:8090",
		//内网地址
		host_url:"http://18.76.1.191:8090",
		//AIWEISI_SLWMS_URL: "http://111.205.114.39/slwms", //艾维斯气象服务图层(外网)
		AIWEISI_SLWMS_URL:"http://18.76.1.91:8091/awsqxtc/slwms",//艾维斯气象服务图层(内网)
		//艾维斯气象服务地址(外网)
		//AIWEISI_QIXIANG_URL: "http://114.112.161.154:80",
		AIWEISI_QIXIANG_URL:"http://18.76.1.91:8091/awsqx",//艾维斯气象服务地址(内网)
		//SUPERMAP_CHINA_URL: 'http://114.112.161.155:8090/iserver/services/map-zhpt/rest/maps/China_L', //iServer国界 外网
		SUPERMAP_CHINA_URL:'http://18.76.1.191:8090/iserver/services/map-zhpt/rest/maps/China_L',//iServer国界 内网



		//龙慧服务接口地址 外网
		// out_in_host_url: "http://task.lonhcloud.net/webmvc/v2",
		//龙慧服务接口地址 内网
		out_in_host_url:"http://18.76.1.91:8091/lonhcloud/webmvc/v2",
		//查询数字签字 参数对象
		info: {
			"appid": "5e5c673ee4b07d0df76eae6e", //应用id
			"appsecret": "8c2944019ce74b4018dd0190e228113a45cbc19b", //密钥
			"projectid": "slfh", //系统id
			"groupid": "37054", //单位id
			"groupname": "应急管理部森林消防局" //单位名称
		},
		//当前卫星遥感的选项，实现单选
		currentwxyg:"",
		//遂行任务配置
		task_config: {
			//遂行底部按钮面板显隐
			task_button_flag: true,
			//遂行任务顶部时间条面板显隐
			task_progress_flag: false,
			//火场查询地址
			url: "/fireground/findFireGroupByAdcd",
			//火场态势图服务地址
			fire_state_url: "/fireground/findFiregroundpm",
			//火场图标
			//icon_url: require("../assets/images/satellite/icon_fire.png"),
			icon_url:[
				require("../assets/images/satellite/fireHot.png"),
				require("../assets/images/satellite/icon_f2.png"),
				require("../assets/images/satellite/water.png"),
			],
			// 火场marker集合
			markers: [],
			//火场态势数据marker,layer集合
			state_markers: [],
			//时间轴开始时间
			start_time: 0,
			//时间轴结束时间
			end_time: 0,
			//mask_value
			mask_value: {},
			//当前选中火场id
			fire_id: "",
			//当前选中在线人员gpsid
			person_id:"",
			//当前选中在线人员类型
			person_type:"",
			//当前选中浮空平台gpsid
			uav_id:"",
			//当前选中浮空平台类型
			uav_type:"",
			//火场历史过程查询 地址
			fire_url: "/fireground/findNewFiregroundpmhistory",
			tab_value: 0,
			tab_switch:false,
			//海量marker图层
			marker_canvas_layer:"",
			right_config: {
				type: "火场",
				name: "",
				title: "任务信息",
				id:"",
				attribution: {
					"经度": "",
					"纬度": "",
					"单位": "createunit",
					"时间": "createtm",
				},
			},
			//人员轨迹 marker图层
			track_marker_layer:"",
			//人员轨迹 线图层
			track_line_layer:"",
			//浮空平台轨迹
			track_uavrecord_line_layer:"",
			track_uavrecord_amerker_layer:"",
			//火场范围查询marker图层
			fire_marker_layer:[],
			//火场范围查询circle图层
			fire_circle_layer:"",
			fire_marker_icon_url:{
				0:require("../assets/images/icon_u3.png"),
				1:require("../assets/images/icon_u2.png"),
				2:require("../assets/images/icon_u1.png"),
			},
			fire_scope_result:[],
			fire_scope_result_flag:false,
		},
		//浮空平台视频窗口显隐
		uav_video_flag:false,
		//浮空平台历史轨迹
		uav_history_record:[],
		//左侧iframe显隐ifr
		left_iframe_flag:false,
		//左侧iframe外网地址
		//left_iframe_src:"http://114.112.161.154/dp/#/",
		//左侧iframe内网地址
		left_iframe_src:"http://18.76.1.91/dp/#/",
		//右侧iframe显隐
		right_iframe_flag:false,
		//右侧iframe外网地址
		//:"http://114.112.161.151/#/preview/572",
		//右侧iframe内网地址
		right_iframe_src:"http://18.76.1.191:10081/sxyc#/preview/560",
		
		//人员装备搜索
		ryzbquery_flag: false,
		
		//左侧面板显隐对象
		left_panel_flag: false,
		left_panel_config: [
			{
				id: UUID(),
				type: "卫星热点",
				is_show: false,
				child: [{
						id: UUID(),
						name: "卫星热点",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "卫星热点",
							name: "",
							title: "热点信息",
							child_name:"",
							attribution: {
								"热点编号": "rdbh",
								"热点区域": "adnm",
								"卫星编号": "xb",
								"纬度": "wd",
								"经度": "jd",
								"面积(像素)": "xss",
								"接收时间": "jssj",
								"下发时间": "xfsj"
							},
						},
						is_active: false,
						child: [{
							id: UUID(),
							name: "卫星热点",
							type: "卫星热点",
							//带问号的火苗【核查中、未反馈、空】
							icon_url_check: require("../assets/images/satellite/fireCheck.png"),
							//动态火苗【林火、草原火、树冠火】
							icon_url_gif: require("../assets/images/satellite/fire.gif"),
							//默认火苗
							icon_url_default: require("../assets/images/satellite/fire.png"),
							//静态火苗【林火、草原火、树冠火】
							icon_url_static: require("../assets/images/satellite/fireHot.png"),
							url: "http://task.lonhcloud.net/webmvc/v2/fireinfo/findHotfirepointForTm",
							markers: [],
							is_active: false,
						}, ]
					},
					{
						id: UUID(),
						name: "卫星遥感",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "卫星遥感",
							name: "",
							title: "热点信息",
							child_name:"",
							attribution: {
								"经度": "longitude",
								"纬度": "latitude",
								"观测时间": "observationDatetime",
								"强度": "strength",
								"强度等级": "strengthLevel",
								"林地占比": "woodland",
								"草地占比": "grassland",
								"农田占比": "farmland",
								"其他占比": "otherland",
								"面积(公顷)": "area",
								"可信度": "credibility",
								"像元面积": "pixelarea",
								"像元数": "pixelNumber",
								"地址": "formattedAddress",
								"火警编号": "rireno",
							},
							attribution_img: {
								"可见光图片地址": "visibleLightImageAddress",
								"热成像图片地址": "irimageAddress"
							}
						},
						is_active: false,
						child: [{
							id: UUID(),
							name: "一小时内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/1",
							markers: [],
							is_active: false,
						},{
							id: UUID(),
							name: "三小时内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/2",
							markers: [],
							is_active: false,
						},{
							id: UUID(),
							name: "一天内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/3",
							markers: [],
							is_active: false,
						},{
							id: UUID(),
							name: "三天内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/4",
							markers: [],
							is_active: false,
						},{
							id: UUID(),
							name: "五天内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/5",
							markers: [],
							is_active: false,
						}, ]
					}
				]
			},
			{
				id: UUID(),
				type: "气象信息",
				is_show: true,
				child: [{
						id: UUID(),
						name: "全球植物可燃物分布",
						class: "iconfont icon-zhuanti",
						is_active: false,
						child: [{
							id: UUID(),
							name: "全球植物可燃物分布图",
							type: "全球植物可燃物分布",
							url: "/api/slhx/fm",
							is_active: false,
							markers: [],
							qxlayer: ""
						}, ]
					},
					{
						id: UUID(),
						name: "全球气象灾害预警",
						class: "iconfont icon-zhuanti",
						is_active: false,
						child: [{
							id: UUID(),
							name: "全球气象灾害预警图",
							type: "全球气象灾害预警",
							url: "/weatherserver/findEarlyWarningDisasterInfoList",
							content_url:"/weatherserver/findEarlyWarningDisasterContent",
							icon_url:"images/weatherIcons",
							is_active: false,
							markers: [],
							qxlayer: ""
						}, ]
					},
					{
						id: UUID(),
						name: "气象预报信息",
						class: "iconfont icon-zhuanti",
						is_active: false,
						child: [{
								id: UUID(),
								name: "温度预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "slhx:forecast_temp",
								uri: "/api/forecast/temp",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "降水预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "slhx:forecast_tp",
								uri: "/api/forecast/tp",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "风预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "slhx:forecast_wind",
								uri: "/api/forecast/wind",
								fcuri: "/api/forecast/windflow?time=",
								qxlayer: "",
								fclayer: "",
							},
							{
								id: UUID(),
								name: "相对湿度预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "slhx:forecast_r",
								uri: "/api/forecast/r",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "天气预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "P_CITY",
								MapGrade: -1,
								url: "/weatherserver/getWeatherList",
								qxlayer: ""
							}
						]
					},
					{
						id: UUID(),
						name: "气象实况信息",
						class: "iconfont icon-zhuanti",
						is_active: false,
						child: [{
								id: UUID(),
								name: "全球雷达拼图实况",
								type: "气象实况信息",
								is_active: false,
								layerName: "slhx:live_radar",
								uri: "/api/live/radar",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "葵花真彩色",
								type: "气象实况信息",
								is_active: false,
								layerName: "slhx:live_himawari",
								uri: "/api/live/himawari",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "地面温度",
								type: "气象实况信息",
								is_active: false,
								layerName: "slhx:live_gst",
								uri: "/api/live/gst",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "前1小时雨量",
								type: "气象实况信息",
								layerName: "slhx:live_pre1h",
								uri: "/api/live/pre1h",
								is_active: false,
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "气温",
								type: "气象实况信息",
								layerName: "slhx:live_temp",
								uri: "/api/live/temp",
								is_active: false,
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "相对湿度",
								type: "气象实况信息",
								layerName: "slhx:live_r",
								uri: "/api/live/r",
								is_active: false,
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "风力风向",
								type: "气象实况信息",
								layerName: "slhx:live_wind",
								uri: "/api/live/wind",
								fcuri: "/api/live/windflow?time=",
								is_active: false,
								qxlayer: "",
								fclayer: "",
							},
						]

					}
				]
			},
			{
				id: UUID(),
				type: "浮空平台",
				is_show: false,
				child: [{
						id: UUID(),
						name: "浮空平台火场态势",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "浮空平台火场态势",
							name: "",
							title: "火场信息",
							child_name:"",
							attribution: {
								"边际点经度": "longtitude",
								"边际点纬度": "latitude",
								"火情级别": "fireClass",
								"火情范围": "fireScope",
								"火情情况": "fireInfo",
								"火情开始时间": "fireStart",
								"火情结束时间": "fireEnd"
							},
						},
						is_active: false,
						child: [{
							id: UUID(),
							name: "浮空平台火场",
							type: "浮空平台火场态势",
							icon_url: require("../assets/images/uav/uav_fire.png"),
							url: "/weatherserver/getFirePlotList",
							markers: [],
							is_active: false,
						}, ]
					},
					{
						id: UUID(),
						name: "浮空平台轨迹",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "浮空平台轨迹",
							name: "",
							gpsid:"",
							title: "浮空平台信息",
							track_url:"/weatherserver/getDroneTrace",
							child_name:"",
							start_icon_url:require("../assets/images/track/guiji_start.png"),
							mid_icon_url:require("../assets/images/track/guiji_mid.png"),
							end_icon_url:require("../assets/images/track/guiji_end.png"),
							attribution: {
								"经度": "longtitude",
								"纬度": "latitude",
								"高度": "height",
								"时间": "createDate"
							}
						},
						is_active: false,
						child: [{
							id: UUID(),
							name: "浮空平台",
							type: "浮空平台轨迹",
							icon_url: require("../assets/images/uav/icon_uav_0926.png"),
							url: "/weatherserver/getDronePointList",
							markers: [],
							is_active: false,
						}, ]
					},
				]
			},
			{
				id: UUID(),
				type: "人员单位",
				is_show: false,
				child: [
					{
						id: UUID(),
						name: "人员单位信息",
						class: "iconfont icon-zhuanti",
						is_active: false,
						right_config: {
							type: "人员单位信息",
							name: "",
							title: "装备信息",
							title2: "单位信息",
							danwei: true,
							danwei_xiashu: false,
							child_name:"",
							attribution_danwei: {
								"通信消防员": 0,
								"通信干部": 0,
								"卫星便携站": 0,
								"超短波设备": 0,
								"短波设备": 0,
								"卫星电话": 0,
								"北斗卫星设备": 0,
								"浮空平台": 0
							},
							attribution_danwei_xiashu: {
								"通信消防员": 0,
								"通信干部": 0,
								"卫星便携站": 0,
								"超短波设备": 0,
								"短波设备": 0,
								"卫星电话": 0,
								"北斗卫星设备": 0,
								"浮空平台": 0
							},
							attribution_danwei_zhudi: {
								"经度": 0,
								"纬度": 0,
								"地址": "",
							}
						},
						child: [{
								id: UUID(),
								name: "总队",
								type: "人员单位信息",
								icon_url: require("../assets/images/icon_u1.png"),
								url: "/weatherserver/findTeamInfo?type=2",
								data: {
									type: 2
								},
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "支队",
								type: "人员单位信息",
								icon_url: require("../assets/images/icon_u2.png"),
								url: "/weatherserver/findTeamInfo?type=1",
								data: {
									type: 1
								},
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "大中队",
								type: "人员单位信息",
								icon_url: require("../assets/images/icon_u3.png"),
								url: "/weatherserver/findTeamInfo?type=0",
								data: {
									type: 0
								},
								markers: [],
								is_active: false,
							},
						]
					},
					/*{
						id: UUID(),
						name: "单位驻地信息",
						class: "iconfont icon-zhuanti",
						is_active: false,
						right_config: {
							type: "单位驻地信息",
							name: "",
							title: "单位信息",
							child_name:"",
							attribution: {
								"经度": 0,
								"纬度": 0,
								"地址": "",
							}
						},
						child: [{
								id: UUID(),
								name: "总队",
								type: "单位驻地信息",
								icon_url: require("../assets/images/icon_u1.png"),
								url: "/weatherserver/findTeamInfo?type=2",
								data: {
									type: 2
								},
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "支队",
								type: "单位驻地信息",
								icon_url: require("../assets/images/icon_u2.png"),
								url: "/weatherserver/findTeamInfo?type=1",
								data: {
									type: 1
								},
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "大中队",
								type: "单位驻地信息",
								icon_url: require("../assets/images/icon_u3.png"),
								url: "/weatherserver/findTeamInfo?type=0",
								data: {
									type: 0
								},
								markers: [],
								is_active: false,
							},
						]
					},*/
					{
						id: UUID(),
						name: "人员装备信息",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "人员装备信息",
							name: "",
							gpsid:"",
							track_url:"/weatherserver/BeiDou_path",
							child_name:"",
							start_icon_url:require("../assets/images/track/guiji_start.png"),
							mid_icon_url:require("../assets/images/track/guiji_mid.png"),
							end_icon_url:require("../assets/images/track/guiji_end.png"),
							title: "基本信息",
							attribution: {
								"经度": "longtitude",
								"纬度": "latitude",
								"区域": "adcdname",
								"手机": "phonenum",
								"职务": "position",
								"电量": "battery",
								"单位": "dwdm",
								"时间": "positime",
							}
						},
						is_active: false,
						child: [
							// {
							// 	id: UUID(),
							// 	name: "普通设备",
							// 	type: "在线人员位置",
							// 	data_type: 0,
							// 	icon_url: require("../assets/images/icon_p1.png"),
							// 	url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
							// 	markers: [],
							// 	is_active: false,
							// },
							// {
							// 	id: UUID(),
							// 	name: "北斗神州天鸿",
							// 	type: "在线人员位置",
							// 	data_type: 1,
							// 	icon_url: require("../assets/images/icon_p2.png"),
							// 	url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
							// 	markers: [],
							// 	is_active: false,
							// },
							// {
							// 	id: UUID(),
							// 	name: "北斗海聊",
							// 	type: "在线人员位置",
							// 	data_type: 2,
							// 	icon_url: require("../assets/images/icon_p3.png"),
							// 	url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
							// 	markers: [],
							// 	is_active: false,
							// },
							{
								id: UUID(),
								name: "北斗星通",
								type: "人员装备信息",
								data_type: 4,
								icon_url: require("../assets/images/icon_p4.png"),
								// url: "/weatherserver/BeiDou/xt",
								// url_dwdm: "/weatherserver/BeiDou/xt/dwdm",
								// url_time: "/weatherserver/BeiDou/xt/time",
								url:"http://192.168.36.253:18081/BeiDou/xt",
								url_dwdm: "http://192.168.36.253:18081/BeiDou/xt/dwdm",
								url_time: "http://192.168.36.253:18081/BeiDou/xt/time",
								markers: [],
								is_active: false,
							},
							// {
							// 	id: UUID(),
							// 	name: "移动和对讲",
							// 	type: "在线人员位置",
							// 	data_type: 3,
							// 	icon_url: require("../assets/images/icon_p5.png"),
							// 	url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
							// 	markers: [],
							// 	is_active: false,
							// },
						]
					},
				]
			},
		],
		// 左侧面板全局对象
		bottom_panel_config: [
			{
				id: UUID(),
				type: "卫星热点",
				is_show: false,
				child: [{
						id: UUID(),
						name: "卫星热点",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "卫星热点",
							name: "",
							title: "热点信息",
							child_name:"",
							attribution: {
								"热点编号": "rdbh",
								"热点区域": "adnm",
								"卫星编号": "xb",
								"纬度": "wd",
								"经度": "jd",
								"面积(像素)": "xss",
								"接收时间": "jssj",
								"下发时间": "xfsj"
							},
						},
						is_active: false,
						child: [{
							id: UUID(),
							name: "卫星热点",
							type: "卫星热点",
							//带问号的火苗【核查中、未反馈、空】
							icon_url_check: require("../assets/images/satellite/fireCheck.png"),
							//动态火苗【林火、草原火、树冠火】
							icon_url_gif: require("../assets/images/satellite/fire.gif"),
							//默认火苗
							icon_url_default: require("../assets/images/satellite/fire.png"),
							//静态火苗【林火、草原火、树冠火】
							icon_url_static: require("../assets/images/satellite/fireHot.png"),
							url: "http://task.lonhcloud.net/webmvc/v2/fireinfo/findHotfirepointForTm",
							markers: [],
							is_active: false,
						}, ]
					},
					{
						id: UUID(),
						name: "卫星遥感",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "卫星遥感",
							name: "",
							title: "热点信息",
							child_name:"",
							attribution: {
								"经度": "longitude",
								"纬度": "latitude",
								"观测时间": "observationDatetime",
								"强度": "strength",
								"强度等级": "strengthLevel",
								"林地占比": "woodland",
								"草地占比": "grassland",
								"农田占比": "farmland",
								"其他占比": "otherland",
								"面积(公顷)": "area",
								"可信度": "credibility",
								"像元面积": "pixelarea",
								"像元数": "pixelNumber",
								"地址": "formattedAddress",
								"火警编号": "rireno",
							},
							attribution_img: {
								"可见光图片地址": "visibleLightImageAddress",
								"热成像图片地址": "irimageAddress"
							}
						},
						is_active: false,
						child: [{
							id: UUID(),
							name: "一小时内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/1",
							markers: [],
							is_active: false,
						},{
							id: UUID(),
							name: "三小时内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/2",
							markers: [],
							is_active: false,
						},{
							id: UUID(),
							name: "一天内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/3",
							markers: [],
							is_active: false,
						},{
							id: UUID(),
							name: "三天内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/4",
							markers: [],
							is_active: false,
						},{
							id: UUID(),
							name: "五天内",
							type: "卫星遥感",
							icon_url: require("../assets/images/satellite/wxyg.png"),
							url: "/weatherserver/getYgwxexchList/5",
							markers: [],
							is_active: false,
						}, ]
					}
				]
			},
			{
				id: UUID(),
				type: "气象信息",
				is_show: true,
				child: [{
						id: UUID(),
						name: "全球植物可燃物分布",
						class: "iconfont icon-zhuanti",
						is_active: false,
						child: [{
							id: UUID(),
							name: "全球植物可燃物分布图",
							type: "全球植物可燃物分布",
							url: "/api/slhx/fm",
							is_active: false,
							markers: [],
							qxlayer: ""
						}, ]
					},
					{
						id: UUID(),
						name: "全球气象灾害预警",
						class: "iconfont icon-zhuanti",
						is_active: false,
						child: [{
							id: UUID(),
							name: "全球气象灾害预警图",
							type: "全球气象灾害预警",
							url: "/weatherserver/findEarlyWarningDisasterInfoList",
							content_url:"/weatherserver/findEarlyWarningDisasterContent",
							icon_url:"images/weatherIcons",
							is_active: false,
							markers: [],
							qxlayer: ""
						}, ]
					},
					{
						id: UUID(),
						name: "气象预报信息",
						class: "iconfont icon-zhuanti",
						is_active: false,
						child: [{
								id: UUID(),
								name: "温度预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "slhx:forecast_temp",
								uri: "/api/forecast/temp",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "降水预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "slhx:forecast_tp",
								uri: "/api/forecast/tp",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "风预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "slhx:forecast_wind",
								uri: "/api/forecast/wind",
								fcuri: "/api/forecast/windflow?time=",
								qxlayer: "",
								fclayer: "",
							},
							{
								id: UUID(),
								name: "相对湿度预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "slhx:forecast_r",
								uri: "/api/forecast/r",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "天气预报",
								type: "气象预报信息",
								is_active: false,
								layerName: "P_CITY",
								MapGrade: -1,
								url: "/weatherserver/getWeatherList",
								qxlayer: ""
							}
						]
					},
					{
						id: UUID(),
						name: "气象实况信息",
						class: "iconfont icon-zhuanti",
						is_active: false,
						child: [{
								id: UUID(),
								name: "全球雷达拼图实况",
								type: "气象实况信息",
								is_active: false,
								layerName: "slhx:live_radar",
								uri: "/api/live/radar",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "葵花真彩色",
								type: "气象实况信息",
								is_active: false,
								layerName: "slhx:live_himawari",
								uri: "/api/live/himawari",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "地面温度",
								type: "气象实况信息",
								is_active: false,
								layerName: "slhx:live_gst",
								uri: "/api/live/gst",
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "前1小时雨量",
								type: "气象实况信息",
								layerName: "slhx:live_pre1h",
								uri: "/api/live/pre1h",
								is_active: false,
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "气温",
								type: "气象实况信息",
								layerName: "slhx:live_temp",
								uri: "/api/live/temp",
								is_active: false,
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "相对湿度",
								type: "气象实况信息",
								layerName: "slhx:live_r",
								uri: "/api/live/r",
								is_active: false,
								qxlayer: ""
							},
							{
								id: UUID(),
								name: "风力风向",
								type: "气象实况信息",
								layerName: "slhx:live_wind",
								uri: "/api/live/wind",
								fcuri: "/api/live/windflow?time=",
								is_active: false,
								qxlayer: "",
								fclayer: "",
							},
						]

					}
				]
			},
			{
				id: UUID(),
				type: "浮空平台",
				is_show: false,
				child: [{
						id: UUID(),
						name: "浮空平台火场态势",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "浮空平台火场态势",
							name: "",
							title: "火场信息",
							child_name:"",
							attribution: {
								"边际点经度": "longtitude",
								"边际点纬度": "latitude",
								"火情级别": "fireClass",
								"火情范围": "fireScope",
								"火情情况": "fireInfo",
								"火情开始时间": "fireStart",
								"火情结束时间": "fireEnd"
							},
						},
						is_active: false,
						child: [{
							id: UUID(),
							name: "浮空平台火场",
							type: "浮空平台火场态势",
							icon_url: require("../assets/images/uav/uav_fire.png"),
							url: "/weatherserver/getFirePlotList",
							markers: [],
							is_active: false,
						}, ]
					},
					{
						id: UUID(),
						name: "浮空平台轨迹",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "浮空平台轨迹",
							name: "",
							gpsid:"",
							title: "浮空平台信息",
							track_url:"/weatherserver/getDroneTrace",
							child_name:"",
							start_icon_url:require("../assets/images/track/guiji_start.png"),
							mid_icon_url:require("../assets/images/track/guiji_mid.png"),
							end_icon_url:require("../assets/images/track/guiji_end.png"),
							attribution: {
								"经度": "longtitude",
								"纬度": "latitude",
								"高度": "height",
								"时间": "createDate"
							}
						},
						is_active: false,
						child: [{
							id: UUID(),
							name: "浮空平台",
							type: "浮空平台轨迹",
							icon_url: require("../assets/images/uav/icon_uav_0926.png"),
							url: "/weatherserver/getDronePointList",
							markers: [],
							is_active: false,
						}, ]
					},
				]
			},
			{
				id: UUID(),
				type: "人员单位",
				is_show: false,
				child: [
					{
						id: UUID(),
						name: "人员单位信息",
						class: "iconfont icon-zhuanti",
						is_active: false,
						right_config: {
							type: "人员单位信息",
							name: "",
							title: "装备信息",
							title2: "单位信息",
							danwei: true,
							danwei_xiashu: false,
							child_name:"",
							attribution_danwei: {
								"通信消防员": 0,
								"通信干部": 0,
								"卫星便携站": 0,
								"超短波设备": 0,
								"短波设备": 0,
								"卫星电话": 0,
								"北斗卫星设备": 0,
								"浮空平台": 0
							},
							attribution_danwei_xiashu: {
								"通信消防员": 0,
								"通信干部": 0,
								"卫星便携站": 0,
								"超短波设备": 0,
								"短波设备": 0,
								"卫星电话": 0,
								"北斗卫星设备": 0,
								"浮空平台": 0
							},
							attribution_danwei_zhudi: {
								"经度": 0,
								"纬度": 0,
								"地址": "",
							}
						},
						child: [{
								id: UUID(),
								name: "总队",
								type: "人员单位信息",
								icon_url: require("../assets/images/icon_u1.png"),
								url: "/weatherserver/findTeamInfo?type=2",
								data: {
									type: 2
								},
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "支队",
								type: "人员单位信息",
								icon_url: require("../assets/images/icon_u2.png"),
								url: "/weatherserver/findTeamInfo?type=1",
								data: {
									type: 1
								},
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "大中队",
								type: "人员单位信息",
								icon_url: require("../assets/images/icon_u3.png"),
								url: "/weatherserver/findTeamInfo?type=0",
								data: {
									type: 0
								},
								markers: [],
								is_active: false,
							},
						]
					},
					/*{
						id: UUID(),
						name: "单位驻地信息",
						class: "iconfont icon-zhuanti",
						is_active: false,
						right_config: {
							type: "单位驻地信息",
							name: "",
							title: "单位信息",
							child_name:"",
							attribution: {
								"经度": 0,
								"纬度": 0,
								"地址": "",
							}
						},
						child: [{
								id: UUID(),
								name: "总队",
								type: "单位驻地信息",
								icon_url: require("../assets/images/icon_u1.png"),
								url: "/weatherserver/findTeamInfo?type=2",
								data: {
									type: 2
								},
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "支队",
								type: "单位驻地信息",
								icon_url: require("../assets/images/icon_u2.png"),
								url: "/weatherserver/findTeamInfo?type=1",
								data: {
									type: 1
								},
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "大中队",
								type: "单位驻地信息",
								icon_url: require("../assets/images/icon_u3.png"),
								url: "/weatherserver/findTeamInfo?type=0",
								data: {
									type: 0
								},
								markers: [],
								is_active: false,
							},
						]
					},*/
					{
						id: UUID(),
						name: "在线人员位置",
						class: "iconfont icon-zhuanti",
						right_config: {
							type: "在线人员位置",
							name: "",
							gpsid:"",
							track_url:"/patrol/findHistorypath",
							child_name:"",
							start_icon_url:require("../assets/images/track/guiji_start.png"),
							mid_icon_url:require("../assets/images/track/guiji_mid.png"),
							end_icon_url:require("../assets/images/track/guiji_end.png"),
							title: "来报信息",
							attribution: {
								"经度": "longitude",
								"纬度": "latitude",
								"区域": "adcdname",
								"手机": "ownerphone",
								"职务": "position",
								"电量": "battery",
								"单位": "unit",
								"时间": "tm",
							}
						},
						is_active: false,
						child: [{
								id: UUID(),
								name: "普通设备",
								type: "在线人员位置",
								data_type: 0,
								icon_url: require("../assets/images/icon_p1.png"),
								url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "北斗神州天鸿",
								type: "在线人员位置",
								data_type: 1,
								icon_url: require("../assets/images/icon_p2.png"),
								url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "北斗海聊",
								type: "在线人员位置",
								data_type: 2,
								icon_url: require("../assets/images/icon_p3.png"),
								url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "北斗星通",
								type: "在线人员位置",
								data_type: 4,
								icon_url: require("../assets/images/icon_p4.png"),
								url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
								markers: [],
								is_active: false,
							},
							{
								id: UUID(),
								name: "移动和对讲",
								type: "在线人员位置",
								data_type: 3,
								icon_url: require("../assets/images/icon_p5.png"),
								url: "http://task.lonhcloud.net/webmvc/v2/patrol/findGpsrealList",
								markers: [],
								is_active: false,
							},
						]
					},
				]
			},
		],
		//森林防火资源
		slfhzy: {
			id: UUID(),
			name: "森林防火资源",
			class: "iconfont icon-zhuanti",
			right_config: {
				type: "森林防火资源",
				name: "",
				gpsid:"",
				track_url:"/patrol/findHistorypath",
				child_name:"",
				start_icon_url:require("../assets/images/track/guiji_start.png"),
				mid_icon_url:require("../assets/images/track/guiji_mid.png"),
				end_icon_url:require("../assets/images/track/guiji_end.png"),
				title: "来报信息",
				attribution: {
					"地址": "ADDRESS",
					"管理员": "LEADER_NAME",
					"管理员电话": "LEADER_PHONE",
				}
			},
			is_active: false,
			child: [{
					id: UUID(),
					name: "防火指挥部",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/防火指挥部.png"),
					url: "/weatherserver/slfhzy/fhzhb",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "扑火队营房",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/扑火队营房.png"),
					url: "/weatherserver/slfhzy/phdyf",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "重大危险源",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/重大危险源.png"),
					url: "/weatherserver/slfhzy/zdwx",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "专业队",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/专业队.png"),
					url: "/weatherserver/slfhzy/zyd",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "物资库",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/物资库.png"),
					url: "/weatherserver/slfhzy/wzk",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "检查站",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/检查站.png"),
					url: "/weatherserver/slfhzy/jcz",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "瞭望塔",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/瞭望塔.png"),
					url: "/weatherserver/slfhzy/lwt",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "水源地",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/水源地.png"),
					url: "/weatherserver/slfhzy/syd",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "气象站",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/气象站.png"),
					url: "/weatherserver/slfhzy/qxz",
					markers: [],
					is_active: false,
				},
				{
					id: UUID(),
					name: "半专业队",
					type: "森林防火资源",
					icon_url: require("../assets/images/slfhzy/专业队.png"),
					url: "/weatherserver/slfhzy/bzydw",
					markers: [],
					is_active: false,
				}
			]
		},
		//右侧面板显隐对象
		right_panel_flag: false,
		// 右侧面板全局对象
		right_panel_config: {},
		//气象图例配置信息
		qxlegendParams: [{
				"layerName": "slhx:forecast_temp",
				"isShowView": false,
				"legendText": "温度(℃)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "#111115",
						"value": "-70"
					},
					{
						"color": "#271248",
						"value": "-50"
					},
					{
						"color": "#441395",
						"value": "-40"
					},
					{
						"color": "#6241B9",
						"value": "-30"
					},
					{
						"color": "#979BBA",
						"value": "-20"
					},
					{
						"color": "#52AEA9",
						"value": "-10"
					},
					{
						"color": "#306FB3",
						"value": "0"
					},
					{
						"color": "#3C8216",
						"value": "10"
					},
					{
						"color": "#B79F30",
						"value": "20"
					},
					{
						"color": "#AA441D",
						"value": "30"
					},
					{
						"color": "#971837",
						"value": "40"
					},
					{
						"color": "#6C1A2F",
						"value": "50"
					}
				]
			},
			{
				"layerName": "slhx:forecast_tp",
				"isShowView": false,
				"legendText": "降水(mm)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "#375D74",
						"value": "1"
					},
					{
						"color": "#38657C",
						"value": "1.5"
					},
					{
						"color": "#386C81",
						"value": "2"
					},
					{
						"color": "#377B7C",
						"value": "3"
					},
					{
						"color": "#42823B",
						"value": "7"
					},
					{
						"color": "#807C38",
						"value": "10"
					},
					{
						"color": "#87355C",
						"value": "20"
					},
					{
						"color": "#83377C",
						"value": "30"
					}
				]
			},
			{
				"layerName": "slhx:live_radar",
				"isShowView": false,
				"legendText": "雷达拼图(dbz)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "#01A0F6",
						"value": "10"
					},
					{
						"color": "#00ECEC",
						"value": "15"
					},
					{
						"color": "#00D800",
						"value": "20"
					},
					{
						"color": "#019000",
						"value": "25"
					},
					{
						"color": "#FFFF00",
						"value": "30"
					},
					{
						"color": "#E7C000",
						"value": "35"
					},
					{
						"color": "#FF9000",
						"value": "40"
					},
					{
						"color": "#FF0000",
						"value": "45"
					},
					{
						"color": "#D60000",
						"value": "50"
					},
					{
						"color": "#C00000",
						"value": "55"
					},
					{
						"color": "#FF00F0",
						"value": "60"
					},
					{
						"color": "#9600B4",
						"value": "65"
					},
					{
						"color": "#AD90F0",
						"value": "70"
					}
				]
			},
			{
				"layerName": "slhx:forecast_wind",
				"isShowView": false,
				"legendText": "风(m/s)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "#214C82",
						"value": "1.6"
					},
					{
						"color": "#256C6D",
						"value": "5.5"
					},
					{
						"color": "#237B1F",
						"value": "10.8"
					},
					{
						"color": "#81631F",
						"value": "17.2"
					},
					{
						"color": "#6D1F3E",
						"value": "24.5"
					},
					{
						"color": "#723C78",
						"value": "32.6"
					},
					{
						"color": "#72266A",
						"value": "41.4"
					},
					{
						"color": "#70286A",
						"value": "51"
					}
				]
			},
			{
				"layerName": "slhx:live_wind",
				"isShowView": false,
				"legendText": "风实况(m/s)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "#214C82",
						"value": "1.6"
					},
					{
						"color": "#256C6D",
						"value": "5.5"
					},
					{
						"color": "#237B1F",
						"value": "10.8"
					},
					{
						"color": "#81631F",
						"value": "17.2"
					},
					{
						"color": "#6D1F3E",
						"value": "24.5"
					},
					{
						"color": "#723C78",
						"value": "32.6"
					},
					{
						"color": "#72266A",
						"value": "41.4"
					},
					{
						"color": "#70286A",
						"value": "51"
					}
				]
			},
			{
				"layerName": "slhx:forecast_r",
				"isShowView": false,
				"legendText": "相对湿度(%)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "#677065",
						"value": "50"
					},
					{
						"color": "#679862",
						"value": "70"
					},
					{
						"color": "#297829",
						"value": "90"
					},
					{
						"color": "#206D20",
						"value": "100"
					}
				]
			},
			{
				"layerName": "slhx:live_r",
				"isShowView": false,
				"legendText": "相对湿度实况(%)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "#677065",
						"value": "50"
					},
					{
						"color": "#679862",
						"value": "70"
					},
					{
						"color": "#297829",
						"value": "90"
					},
					{
						"color": "#206D20",
						"value": "100"
					}
				]
			},
			{
				"layerName": "slhx:live_temp",
				"isShowView": false,
				"legendText": "气温实况(℃)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "linear-gradient(to right, rgba(75, 0, 130, 0.667), rgba(143, 105, 241, 0.667), rgba(151, 113, 251, 0.667))",
						"value": "-25"
					},
					{
						"color": "linear-gradient(to right, rgba(151, 113, 251, 0.667), rgba(146, 236, 251, 0.667), rgba(107, 242, 230, 0.667))",
						"value": "-15"
					},
					{
						"color": "linear-gradient(to right, rgba(107, 242, 230, 0.667), rgba(61, 210, 222, 0.667), rgba(46, 139, 244, 0.667))",
						"value": "-5"
					},
					{
						"color": "linear-gradient(to right, rgba(46, 139, 244, 0.667), rgba(13, 122, 26, 0.667), rgba(68, 173, 7, 0.667))",
						"value": "5"
					},
					{
						"color": "linear-gradient(to right, rgba(68, 173, 7, 0.667), rgba(188, 227, 33, 0.667), rgba(250, 221, 50, 0.667))",
						"value": "15"
					},
					{
						"color": "linear-gradient(to right, rgba(250, 221, 50, 0.667), rgba(248, 163, 25, 0.667), rgba(231, 80, 20, 0.667))",
						"value": "25"
					},
					{
						"color": "linear-gradient(to right, rgba(231, 80, 20, 0.667), rgba(207, 28, 7, 0.667), rgba(203, 11, 60, 0.667))",
						"value": "35"
					},
					{
						"color": "linear-gradient(to right, rgba(203, 11, 60, 0.667), rgba(185, 4, 0, 0.667), rgba(139, 14, 46, 0.667))",
						"value": "45"
					},
					{
						"color": "linear-gradient(to right, rgba(139, 14, 46, 0.667), rgba(104, 11, 34, 0.667), rgba(92, 10, 31, 0.667))",
						"value": "55"
					}
				]
			},
			{
				"layerName": "slhx:live_gst",
				"isShowView": false,
				"legendText": "地面温度实况(℃)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "linear-gradient(to right, rgba(75, 0, 130, 0.667), rgba(143, 105, 241, 0.667), rgba(151, 113, 251, 0.667))",
						"value": "-25"
					},
					{
						"color": "linear-gradient(to right, rgba(151, 113, 251, 0.667), rgba(146, 236, 251, 0.667), rgba(107, 242, 230, 0.667))",
						"value": "-15"
					},
					{
						"color": "linear-gradient(to right, rgba(107, 242, 230, 0.667), rgba(61, 210, 222, 0.667), rgba(46, 139, 244, 0.667))",
						"value": "-5"
					},
					{
						"color": "linear-gradient(to right, rgba(46, 139, 244, 0.667), rgba(13, 122, 26, 0.667), rgba(68, 173, 7, 0.667))",
						"value": "5"
					},
					{
						"color": "linear-gradient(to right, rgba(68, 173, 7, 0.667), rgba(188, 227, 33, 0.667), rgba(250, 221, 50, 0.667))",
						"value": "15"
					},
					{
						"color": "linear-gradient(to right, rgba(250, 221, 50, 0.667), rgba(248, 163, 25, 0.667), rgba(231, 80, 20, 0.667))",
						"value": "25"
					},
					{
						"color": "linear-gradient(to right, rgba(231, 80, 20, 0.667), rgba(207, 28, 7, 0.667), rgba(203, 11, 60, 0.667))",
						"value": "35"
					},
					{
						"color": "linear-gradient(to right, rgba(203, 11, 60, 0.667), rgba(185, 4, 0, 0.667), rgba(139, 14, 46, 0.667))",
						"value": "45"
					},
					{
						"color": "linear-gradient(to right, rgba(139, 14, 46, 0.667), rgba(104, 11, 34, 0.667), rgba(92, 10, 31, 0.667))",
						"value": "55"
					}
				]
			},
			{
				"layerName": "slhx:live_pre1h",
				"isShowView": false,
				"legendText": "前1小时雨量实况(mm)",
				"legendTime": "",
				"legendMiddles": [{
						"color": "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(59, 123, 161, 0.667), rgba(59, 123, 161, 0.667))",
						"value": "0.5"
					},
					{
						"color": "linear-gradient(to right, rgba(59, 123, 161, 0.667), rgba(59, 126, 161, 0.667), rgba(58, 128, 161, 0.667))",
						"value": "1.5"
					},
					{
						"color": "linear-gradient(to right, rgba(58, 128, 161, 0.667), rgba(58, 132, 162, 0.706), rgba(58, 136, 162, 0.706))",
						"value": "2.5"
					},
					{
						"color": "linear-gradient(to right, rgba(58, 136, 162, 0.706), rgba(58, 153, 161, 0.706), rgba(50, 166, 110, 0.706))",
						"value": "3.5"
					},
					{
						"color": "linear-gradient(to right, rgba(50, 166, 110, 0.706), rgba(74, 163, 57, 0.706), rgba(129, 161, 58, 0.706))",
						"value": "6.0"
					},
					{
						"color": "linear-gradient(to right, rgba(129, 161, 58, 0.706), rgba(161, 161, 59, 0.706), rgba(161, 59, 59, 0.706))",
						"value": "10.0"
					},
					{
						"color": "linear-gradient(to right, rgba(161, 59, 59, 0.706), rgba(170, 54, 107, 0.706), rgba(164, 57, 154, 0.706))",
						"value": "14.0"
					},
					{
						"color": "linear-gradient(to right, rgba(164, 57, 154, 0.706), rgba(164, 57, 154, 0.706), rgba(164, 57, 154, 0.706))",
						"value": "20.0"
					}
				]
			}
		]
	},
	mutations: {},
	actions: {
		/**
		 * 获取用户信息
		 * @param commit
		 * @param state
		 * @returns {Promise<any>}
		 * @constructor
		 */
		 GetUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				getUserInfo(state.token).then(response => {
					if (!response.data) {
						reject("Verification failed, please login again.");
					}
					//将获取到的用户信息存在缓存中，避免前端每次请求接口时都去请求用户信息
					setToken(response.data);
					resolve(response);
				}).catch(error => {
					reject(error);
				});
			})
		},

		/**
		 * 退出
		 * @param commit
		 * @param state
		 * @returns {Promise<any | never>}
		 * @constructor
		 */
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout().then(response => {
					//退出时清除用户信息
					removeToken();
					resolve(response);
				}).catch(error => {
					reject(error);
				})
			});
		}
	},
	getters: {
		authorization() {
			if (getToken()) {
				return true;
			}
			return false;
		}
	},
	modules: {
		myboot_store:myboot_store,
	}
})
