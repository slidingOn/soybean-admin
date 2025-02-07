import { mockRequest, request } from '../request';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return mockRequest.post<boolean>('/getSmsCode', { phone });
}

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(username: string, password: string) {
  // axios({
  //               method: 'post',
  //               url: 'http://localhost:8080/token',
  //               auth: {
  //                 username: 'user',
  //                 password: 'password1'
  //               }
  //             }).then(result=>{
  //               console.log(result);
  //             });

  return request
    .post<ApiAuth.Token>(
      '/token',
      {},
      {
        auth: {
          username,
          password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }
    )
    .then(result => {
      // 如果result.data不为空，就将token加上Bearer前缀
      if (result.data) result.data.token = `Bearer ${result.data?.token}`;
      return result;
    });
}

/** 获取用户信息 */
export function fetchUserInfo() {
  return request.get<ApiAuth.UserInfo>('/getUserInfo');
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return mockRequest.post<ApiRoute.Route>('/getUserRoutes', { userId });
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
  return mockRequest.post<ApiAuth.Token>('/updateToken', { refreshToken });
}
