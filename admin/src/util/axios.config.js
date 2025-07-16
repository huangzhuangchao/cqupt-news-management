import axios from "axios";
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("accessToken")
    config.headers.Authorization = `Bearer ${token}`
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response.headers);
    const {authorization} = response.headers
    authorization && localStorage.setItem("accessToken", authorization)
    return response;
  }, async function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const {status} = error.response
    const config = error.config
    // console.log("✈️error's --> config: ", config)
    // console.log("✈️error's --> status: ", status)
    if(status == 401 && !config.url.includes('/refresh')){
        const res = await refresh()
        console.log("✈️refresh's --> data: ", res)
        if(res.data.ActionType == "OK"){
          return axios(config)
        }

        window.location.href="login"
    } else localStorage.removeItem("accessToken")
   
    return Promise.reject(error);
  });

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