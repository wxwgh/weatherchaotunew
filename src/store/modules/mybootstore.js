
const myboot_store = {

	state: {
		// 当前在线设备服务 测试地址
		online_unit_url:"http://127.0.0.1:18081/Message",
		// 当前在线设备服务地址
		// online_unit_url:"https://t6.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=4fd9747624d5f7fb54ebf61ce66c96c5",
	},
	actions: {},
	mutations: {
		// set_map: (state, data) => {
		// 	state.map = data;
		// },
	},
	getters: {
		get_online_unit_url: (state) => {
			return state.online_unit_url;
		},
	}
}
export default myboot_store
