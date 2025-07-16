import axios from "axios";

// 队列相关定义
let refreshing = false;
const queue = [];

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("accessToken")
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    console.log(response.headers);
    const {authorization} = response.headers
    authorization && localStorage.setItem("accessToken", authorization)
    return response;
  }, async function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    const {status} = error.response
    const config = error.config

    // 队列控制逻辑
    if(refreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ config, resolve, reject });
      });
    }

    if(status == 401 && !config.url.includes('/refresh')){
        refreshing = true;
        try {
          const res = await refresh();
          refreshing = false;
          if(res.data.ActionType == "OK"){
            // 刷新成功，重放队列请求
            queue.forEach(({config, resolve}) => {
              resolve(axios(config));
            });
            queue.length = 0;
            return axios(config);
          } else {
            // 刷新失败，清空队列并跳转
            queue.forEach(({reject}) => reject(error));
            queue.length = 0;
            window.location.href="login"
          }
        } catch (e) {
          refreshing = false;
          queue.forEach(({reject}) => reject(e));
          queue.length = 0;
          window.location.href="login"
        }
    } else {
      localStorage.removeItem("accessToken")
      return Promise.reject(error);
    }
  });

// 刷新 token 方法
const refresh = async () => {
  console.log("✈️refreshing token...");
  const res = await axios.get("/adminapi/user/refresh",{
      params: {
        refreshToken: localStorage.getItem("refreshToken")
      },
  })
  console.log("✈️refresh's data: ", res.data.data);
  if(res.data.ActionType == "OK"){
    localStorage.setItem("refreshToken", res.data.data.refreshToken)
  }
  return res;
}