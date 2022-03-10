/**
 * 请求接口
 * @Author: zhangzf
 * @Date: 2019-08-01
 */
import request from "@/util/request";

/**
 * 获取用户信息
 */
export function getUserInfo(e) {
  return request({
    url: "/user/info",
    method: "get"
  });
}
