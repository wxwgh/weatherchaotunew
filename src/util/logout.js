/**
 * 此处填写文件描述
 * @Author: zhangzf
 * @Date: 2019-08-02
 */
import request from "@/util/request";

export function logout() {
  return request({
    url: "/logout",
    method: "get"
  });
}
