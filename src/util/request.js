/**
 * 此处填写文件描述
 * @Author: zhangzf
 * @Date: 2019-08-01
 */
import axios from "axios";
import store from "@/store";
import { getToken, removeToken } from "@/util/auth";

// console.log("/weatherserver")
const service = axios.create({
	baseURL: "/weatherserver",//
	timeout: 5000 // request timeout
});

service.interceptors.request.use(
	config => {
		// Do something before request is sent
		if (store.getters.authorization) {
			// 让每个请求携带authorization-- ['authorization']为自定义key 请根据实际情况自行修改
			config.headers["authorization"] = getToken();
		}
		config.headers["X-Requested-With"] = "XMLHttpRequest";
		return config;
	},
	error => {
		// Do something with request error
		console.log(error); // for debug
		Promise.reject(error);
	}
);

service.interceptors.response.use(
	response => {
		return response;
	}, error => {
		if (error.response.status == '403') {//获取用户信息异常，
			if (error.response.headers.contextpath) {
				removeToken();
				window.location.href = error.response.headers.contextpath;
			}
		}
		return Promise.reject(error);
	}
)

export default service;
