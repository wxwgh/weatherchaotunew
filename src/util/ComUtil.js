import md5 from "md5";
import Vue from "vue";
export default class ComUtil {
	static dataVersion: string = "1.0.1";
	static EARTH_RADIUS = 6378137.0;	//地球吧半径

	// array 转 object
	static mapArray(arr, keyName): any {
		var rst = {};
		for (var i = 0; i < arr.length; ++i) {
			rst[arr[i][keyName]] = arr[i];
		}
		return rst;
	}

	// get object first key
	static objFirstKey(obj: object) {
		for (var key in obj) {
			return key;
		}
		return null;
	}

	// base64 image => blob
	static b64ImgToBlob(b64ImgData) {
		/^data:(.*?);base64,/.test(b64ImgData);
		var contentType = RegExp.$1;
		var b64Data = b64ImgData.replace(/data:.*?;base64,/, "");
		return ComUtil.b64toBlob(b64Data, contentType, 512);
	}

	// base64 => blob
	static b64toBlob(b64Data, contentType, sliceSize = 512) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, { type: contentType });
		return blob;
	}

	// 面积计算
	static calcArea(pos1, pos2, pos3) {
		//三角形三条边的长度
		var lineP1P2: number = ComUtil.calcRange(pos1, pos2);
		var lineP2P3: number = ComUtil.calcRange(pos2, pos3);
		var lineP1P3: number = ComUtil.calcRange(pos1, pos3);

		//半周长
		var semic: number = (lineP1P2 + lineP2P3 + lineP1P3) / 2;

		//海伦公式求三角形面积
		var s: number = Math.sqrt(semic * (semic - lineP1P2) * (semic - lineP2P3) * (semic - lineP1P3));
		return s;
	}

	// 距离计算
	static calcRange(pos1, pos2) {
		// var dx = (pos2.pntx - pos1.pntx);
		// var dy = (pos2.pnty - pos1.pnty);
		var dz = (pos2.height - pos1.height);
		// var len = Math.sqrt(dx*dx + dy*dy + dz*dz);
		var gpsLen = ComUtil.getGreatCircleDistance(pos1.lon, pos1.lat, pos2.lon, pos2.lat);
		var len = Math.sqrt(gpsLen * gpsLen + dz * dz);
		return len;
	}

	//两坐标（经纬度）之间距离计算
	// 返回 米
	static getGreatCircleDistance(startLon, startLat, endLon, endLat) {
		var EARTH_RADIUS = 6378137.0;

		var radLat1 = ComUtil.getRad(startLat);
		var radLat2 = ComUtil.getRad(endLat);
		var dy = radLat1 - radLat2; // a
		var dx = ComUtil.getRad(startLon) - ComUtil.getRad(endLon); // b
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(dy / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(dx / 2), 2)));
		s = s * EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000.0;
		return s;
	}

	// 度转弧度
	static getRad(d) {
		return d * Math.PI / 180.0;
	}

	// 合并对象
	// 相同属性，data将覆盖template
	static mergeObj(template: object, data: object)
	static mergeObj(template: object, data: object, isReturnNew: boolean)
	static mergeObj(template: object, ...args: object[])
	static mergeObj(template: object, b?, c?) {
		var isReturnNew = false;
		var arrData = [];
		if (arguments.length == 3 && typeof (arguments[2]) == "boolean") {
			isReturnNew = c;
			arrData.push(b);
		} else {
			for (var i = 1; i < arguments.length; ++i) {
				arrData.push(arguments[i]);
			}
			if (arguments.length >= 3) {
				// console.info(template, b);
			}
		}
		var rst = isReturnNew ? this.mix(template) : template;
		// if(isMix){
		// 	rst = isReturnNew ? this.mix(template) : template;
		// }else{
		// 	rst = isReturnNew ? this.extend(template, true) : template;
		// }

		for (var i = 0; i < arrData.length; ++i) {
			var data = arrData[i];

			for (var key in data) {
				try {
					var des = Object.getOwnPropertyDescriptor(data, key);
					if ("get" in des) {
						Object.defineProperty(rst, key, des);
						// console.info(key, source[key], Object.getOwnPropertyDescriptor(source, key));
						continue;
					}
				} catch (ex) { }

				try {
					if (key in rst) {
						var des = Object.getOwnPropertyDescriptor(rst, key);
						if ("get" in des) {
							var tmp = this.mix(rst[key]);
							delete rst[key];
							rst[key] = tmp;
						}
					}
				} catch (ex) { }

				if (this.isArray(data[key])) {
					var sub = template[key] || [];
					if (typeof (sub) != "object") {
						sub = [];
					}
					rst[key] = this.mergeObj(sub, data[key]);
				} else if (typeof (data[key]) == "object") {
					var sub = template[key] || {};
					if (typeof (sub) != "object") {
						sub = {};
					}
					rst[key] = this.mergeObj(sub, data[key]);
				} else {
					rst[key] = data[key];
				}
			}
		}
		return rst;
	}

	// 拷贝对象
	static extend(source, isDeep = false) {
		if (typeof (source) != "object") {
			return source;
		}

		var rst = {};
		if (this.isArray(source)) {
			rst = [];
		}

		if (isDeep) {
			for (var key in source) {
				// try{
				// 	var des = Object.getOwnPropertyDescriptor(source, key);
				// 	if("get" in des){
				// 		Object.defineProperty(rst, key, des);
				// 		continue;
				// 	}
				// }catch(ex){ }

				rst[key] = this.extend(source[key], isDeep);
			}
		} else {
			for (var key in source) {
				// try{
				// 	var des = Object.getOwnPropertyDescriptor(source, key);
				// 	if("get" in des){
				// 		Object.defineProperty(rst, key, des);
				// 		continue;
				// 	}
				// }catch(ex){ }

				rst[key] = source[key];
			}
		}
		return rst;
	}

	// 混合
	static mix(source) {
		if (typeof (source) != "object") {
			return source;
		}

		var rst = {};
		if (this.isArray(source)) {
			rst = [];
		}

		for (var key in source) {
			try {
				var des = Object.getOwnPropertyDescriptor(source, key);
				if ("get" in des) {
					Object.defineProperty(rst, key, des);
					continue;
				}
			} catch (ex) { }

			rst[key] = this.mix(source[key]);
		}

		return rst;
	}

	// 是否为数组
	static isArray(value) {
		if (typeof (Array.isArray) === "function") {
			return Array.isArray(value);
		} else {
			return Object.prototype.toString.call(value) === "[object Array]";
		}
	}

	// 是否为IE浏览器
	static isIE() {
		if (!!window["ActiveXObject"] || "ActiveXObject" in window) {
			return true;
		} else {
			return false;
		}
	}

	static getRgba(str) {
		var val = str.trim();
		var rst = { r: 0, g: 0, b: 0, a: 1 };

		if (val.substr(0, 1) == "#") {
			// #ffffff
			if (val.length == 4) {
				var r = parseInt(val.substr(1, 1), 16);
				var g = parseInt(val.substr(2, 1), 16);
				var b = parseInt(val.substr(3, 1), 16);
				rst.r = (r << 4) + r;
				rst.g = (g << 4) + g;
				rst.b = (b << 4) + b;
			} else if (val.length == 7) {
				rst.r = parseInt(val.substr(1, 2), 16);
				rst.g = parseInt(val.substr(3, 2), 16);
				rst.b = parseInt(val.substr(5, 2), 16);
			}
			rst.a = 1;
		} else if (val.substr(0, 4) == "rgba") {
			// rgba
			var isMatch = /^rgba\(([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9.]+)\)$/.test(val);
			if (isMatch) {
				rst.r = parseInt(RegExp.$1);
				rst.g = parseInt(RegExp.$2);
				rst.b = parseInt(RegExp.$3);
				rst.a = parseFloat(RegExp.$4);
			}
		} else if (val.substr(0, 4) == "rgb(") {
			// rgb
			var isMatch = /^rgb\(([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)\)$/.test(val);
			if (isMatch) {
				rst.r = parseInt(RegExp.$1);
				rst.g = parseInt(RegExp.$2);
				rst.b = parseInt(RegExp.$3);
				rst.a = 1;
			}
		} else {
			rst = { r: 255, g: 255, b: 255, a: 1 };
		}
		return rst;
	}

	static rgb2hsl(rgb: [number, number, number]) {
		for (var i = 0; i < rgb.length; ++i) {
			rgb[i] = rgb[i] / 256;
		}
		var [r, g, b] = rgb;
		var h, s, l;
		h = s = l = 0;
		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var range = max - min;

		l = (min + max) / 2;
		if (range == 0) {
			s = 0;
			h = 0;
		} else {
			if (l < 0.5) {
				s = (max - min) / (max + min);
			} else {
				s = (max - min) / (2 - max - min);
			}

			var dr = (((max - r) / 6.0) + (range / 2.0)) / range;
			var dg = (((max - g) / 6.0) + (range / 2.0)) / range;
			var db = (((max - b) / 6.0) + (range / 2.0)) / range;

			if (r == max) h = db - dg;
			else if (g == max) h = (1.0 / 3.0) + dr - db;
			else if (b == max) h = (2.0 / 3.0) + dg - dr;

			if (h < 0) h += 1;
			if (h > 1) h -= 1;
		}
		return [h, s, l];
	}

	static cssSheet = null;

	static css(text: string) {
		this.cssSheet = this.cssSheet || this.createCss();

		try {
			this.cssSheet.appendChild(document.createTextNode(text));
		} catch (ex) {
			this.cssSheet.styleSheet.cssText = text;
		}
	}

	static createCss() {
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		style.type = 'text/css';
		// style.setAttribute("aaa", "aaa");
		// head.appendChild(style);
		document.body.appendChild(style);

		return style;
		// return style.sheet || (style as any).styleSheet;
	}

	static sign(params, appsecret) {
		/**
		* 签名生成规则
		* 1、所有请求参数（排除lhsign），根据参数key排序（升序）拼接成键值连接的字符串
		* 2、最后把appsecret加在前面，得到待加密字符串
		* 3、再进行md5加密转大写，得到签名
		* @param params    请求参数map,带有lhappid,lhtime
		* @param appsecret app密钥
		* @return
		*/

		//如果有，去掉签名字段
		if (params.hasOwnProperty("lhsign"))
			delete params["lhsign"];


		//根据参数Key排序（升序）
		let tempKeySort = Object.keys(params).sort();
		//构造待签名的请求串
		let sb = "";

		tempKeySort.forEach((k, v) => {
			sb += k + params[k];
		});

		//把密钥加载最前面
		sb = appsecret + sb;
		//生成md5值,转大写
		let lhsign = md5(sb).toUpperCase();
		return lhsign;
	}

	static abgr2rgba = function (str) {
		var newstr = str.trim();
		var val = newstr.split("").reverse().join("");
		var rst = "";
		if (val.length == 8) {
			var r = parseInt(val.substr(0, 2), 16);
			var g = parseInt(val.substr(2, 2), 16);
			var b = parseInt(val.substr(4, 2), 16);
			var a = parseInt(val.substr(6, 2), 16);
			rst = "rgba(" + r + "," + g + "," + b + "," + a + ")";
		}
		return rst;
	}

	/**
	*@description: 禁用浏览器右键单击内容
	*@author:郑心怡
	*@date: 2020-06-16 08:53:51
	*@version V1.0.0
	*/
	static rigthclickoff = function () {
		document.oncontextmenu = function (e) {
			return false;
		}
	}

	/**
	*@description: 启用浏览器右键单击内容
	*@author:郑心怡
	*@date: 2020-06-16 08:53:56
	*@version V1.0.0
	*/
	static rigthclickon = function () {
		document.oncontextmenu = function (e) {
			return true;
		}
	}

}

//ABGR值转RGBA值
Vue.prototype.abgr2rgba = function (str) {
	var newstr = str.trim();
	var val = newstr.split("").reverse().join("");
	var rst = "";
	if (val.length == 8) {
		var r = parseInt(val.substr(0, 2), 16);
		var g = parseInt(val.substr(2, 2), 16);
		var b = parseInt(val.substr(4, 2), 16);
		var a = parseInt(val.substr(6, 2), 16);
		rst = "rgba(" + r + "," + g + "," + b + "," + a + ")";
	}
	return rst;
}
//ABGR值转RGBA值-CesiumCalor
Vue.prototype.abgr2cesiumrgba = function (str) {
	var newstr = str.trim();
	var val = newstr.split("").reverse().join("");
	var rst = { r: 1, g: 1, b: 1, a: 1 };
	if (val.length == 8) {
		var r = parseInt(val.substr(0, 2), 16);
		var g = parseInt(val.substr(2, 2), 16);
		var b = parseInt(val.substr(4, 2), 16);
		var a = parseInt(val.substr(6, 2), 16);
		rst = { r: Number((r / 255).toFixed(1)), g: Number((g / 255).toFixed(1)), b: Number((b / 255).toFixed(1)), a: Number((a / 255).toFixed(1)) };
	}
	return rst;
}
//龙慧数据签名生成
Vue.prototype.sign = function (params, appsecret) {
	/**
	* 签名生成规则
	* 1、所有请求参数（排除lhsign），根据参数key排序（升序）拼接成键值连接的字符串
	* 2、最后把appsecret加在前面，得到待加密字符串
	* 3、再进行md5加密转大写，得到签名
	* @param params    请求参数map,带有lhappid,lhtime
	* @param appsecret app密钥
	* @return
	*/

	//如果有，去掉签名字段
	if (params.hasOwnProperty("lhsign"))
		delete params["lhsign"];


	//根据参数Key排序（升序）
	let tempKeySort = Object.keys(params).sort();
	//构造待签名的请求串
	let sb = "";

	tempKeySort.forEach((k, v) => {
		sb += k + params[k];
	});

	//把密钥加载最前面
	sb = appsecret + sb;
	//生成md5值,转大写
	let lhsign = md5(sb).toUpperCase();
	return lhsign;
}

// 转为unicode 编码  
Vue.prototype.encodeUnicode = function (str) {
	var res = [];
	for (var i = 0; i < str.length; i++) {
		res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
	}
	return "\\u" + res.join("\\u");
}

// 解码  
Vue.prototype.decodeUnicode = function (str) {
	str = str.replace(/\\/g, "%");
	return unescape(str);
}

Vue.prototype.timeago = function (dateTimeStamp) {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
	var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
	var hour = minute * 60;
	var day = hour * 24;
	var week = day * 7;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();   //获取当前时间毫秒
	var diffValue = now - dateTimeStamp;//时间差

	if (diffValue < 0) {
		return;
	}
	var minC = diffValue / minute;  //计算时间差的分，时，天，周，月
	var hourC = diffValue / hour;
	var dayC = diffValue / day;
	var weekC = diffValue / week;
	var monthC = diffValue / month;
	var result;
	if (monthC >= 1 && monthC <= 3) {
		result = " " + parseInt(String(monthC)) + "月前"
	} else if (weekC >= 1 && weekC <= 3) {
		result = " " + parseInt(String(weekC)) + "周前"
	} else if (dayC >= 1 && dayC <= 6) {
		result = " " + parseInt(String(dayC)) + "天前"
	} else if (hourC >= 1 && hourC <= 23) {
		result = " " + parseInt(String(hourC)) + "小时前"
	} else if (minC >= 1 && minC <= 59) {
		result = " " + parseInt(String(minC)) + "分钟前"
	} else if (diffValue >= 0 && diffValue <= minute) {
		result = "刚刚"
	} else {
		var datetime = new Date();
		datetime.setTime(dateTimeStamp);
		var Nyear = datetime.getFullYear();
		var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
		var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
		var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
		var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
		result = Nyear + "-" + Nmonth + "-" + Ndate
	}
	return result;
}

Vue.prototype.formatDegree = function (value) {
	///<summary>将度转换成为度分秒</summary>
	value = Math.abs(value);
	var v1 = Math.floor(value);//度
	var v2 = Math.floor((value - v1) * 60);//分
	// var v3 = Math.round((value - v1) * 3600 % 60);//秒
	var v3 = (((value - v1) * 60 - v2) * 60).toFixed(3)//秒
	return v1 + '°' + v2 + '\'' + v3 + '"';
};



Vue.prototype.DegreeConvertBack = function (value) { ///<summary>度分秒转换成为度</summary>
	var du = value.split("°")[0];
	var fen = value.split("°")[1].split("'")[0];
	var miao = value.split("°")[1].split("'")[1].split('"')[0];
	return Math.abs(du) + "." + (Math.abs(fen) / 60 + Math.abs(miao) / 3600);
}

//获取图片宽高
Vue.prototype.getImgSize = function (data: any) {
	return new Promise((resolve, reject) => {
		let img = new Image()
		img.src = data;
		img.onload = function () {
			resolve({
				width: img.width,
				height: img.height
			})
		}
	});
}

//获取字符串实际长度
Vue.prototype.getStrLength = function (str) {
	//获得字符串实际长度，中文2，英文1
	//要获得长度的字符串
	var realLength = 0, len = str.length, charCode = -1;
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128)
			realLength += 1;
		else
			realLength += 2;
	}
	return realLength;
}

//经纬度转墨卡托
Vue.prototype.lonlat2mercator = (lonlat) => {
	var mercator = { x: 0, y: 0 };
	var x = lonlat.x * 20037508.34 / 180;
	var y = Math.log(Math.tan((90 + lonlat.y) * Math.PI / 360)) / (Math.PI / 180);
	y = y * 20037508.34 / 180;
	mercator.x = x;
	mercator.y = y;
	return mercator;
}

//墨卡托转经纬度
Vue.prototype.mercator2lonlat = (mercator) => {
	var lonlat = { x: 0, y: 0 };
	var x = mercator.x / 20037508.34 * 180;
	var y = mercator.y / 20037508.34 * 180;
	y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
	lonlat.x = x;
	lonlat.y = y;
	return lonlat;

}

/**
*@description: 生成uuid
*@author:郑心怡
*@date: 2020-06-11 16:46:53
*@version V1.0.0
*/
Vue.prototype.uuid = (len, radix) => {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [], i;
	var radix = radix || chars.length;
	var len = len || 32;
	if (len) {
		// Compact form  
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		// rfc4122, version 4 form  
		var r;

		// rfc4122 requires these characters  
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data.  At i==19 set the high bits of clock sequence as  
		// per rfc4122, sec. 4.1.5  
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
}