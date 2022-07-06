import { checkToken, getClientId, getGroupParam, haierAccountInfo } from '@/assets/http/login';
import { getStore, removeStore, setStore } from '@/assets/utils/storage';
import { configUserCenter, login } from '@haier/fe-stub-usercenter';

export const getTime = (time: any, type = 'yyyy-mm-dd') => {
  // let oDate = new Date(time)
  // let preDate = oDate.setTime(oDate.getTime() - 24 * 60 * 60 * 1000)
  // console.log(new Date(preDate))
  let getDate:any = time ? new Date(time) : new Date()
  let getYear = getDate.getFullYear()
  let getMonth = getDate.getMonth() + 1
  if (getMonth < 10) {
    getMonth = '0' + getMonth
  }
  let getDay = getDate.getDate()
  if (getDay < 10) {
    getDay = '0' + getDay
  }
  let getHour = getDate.getHours()
  if (getHour < 10) {
    getHour = '0' + getHour
  }
  let getMinutes = getDate.getMinutes()
  if (getMinutes < 10) {
    getMinutes = '0' + getMinutes
  }
  var getSeconds = getDate.getSeconds()
  if (getSeconds < 10) {
    getSeconds = '0' + getSeconds
  }
  switch (type) {
    case 'yyyy-mm-dd':
      return getYear + '-' + getMonth + '-' + getDay
    case 'yyyy/mm/dd hh:mm':
      return getYear + '/' + getMonth + '/' + getDay + ' ' + getHour + ':' + getMinutes
    case 'yyyy/mm/dd':
      return getYear + '/' + getMonth + '/' + getDay
    case 'yyyy/mm/dd hh:mm:ss':
      return getYear + '/' + getMonth + '/' + getDay + ' ' + getHour + ':' + getMinutes + ':' + getSeconds
    case 'yyyy.mm.dd':
      return getYear + '.' + getMonth + '.' + getDay
    case 'hh:mm:ss':
      return getHour + ':' + getMinutes + ':' + getSeconds
  }
}

export const getToke = (resolve: any) => {
  let clientCode = 'FA000701';
  getClientId(clientCode).then((data: any) => {
    if (data.code === 200) {
      let clientId = data.data.clientId;
      setStore('pyingkangoaClientId', clientId)
      getGroupParam(clientId, 'haier_auth').then((data: any) => {
        console.log(data);
        let clientId1 = data.data.clientId;
        if (data.code === 200) {
          configUserCenter({
            clientId: clientId1, //账号中心cliendtId
            ssoUrl: data.data.ssoUrl, //账号中心统一登录页
            appId: data.data.appId, //开放平台创建应用获取（open.feishu.cn）
            tokenUrl: `${data.data.tokenUrl}`, //集成了账号中心提供的后端服务的地址
          });
          login()
            .then((data: any) => {
              debugger
              setStore('pyingkangoaJituanToken', data.token)
              setStore('pyingkangoaNickName', data.userInfo.nickName)
              setStore('pyingkangoaUserName', data.userInfo.userName)
              haierAccountInfo(clientId, 'haier_auth').then((data: any) => {
                if (data.code === 200 && data.data) {
                  setStore('pyingkangoaToken', data.data.access_token)
                  console.log(data);
                  // this.getList();
                  resolve()
                }
              })
            })
            .catch(() => {
            });
        }
      });
    }
  });
}

export const checkIsLogin: any = () => {
  return new Promise((resolve: any, reject: any) => {
    if (!getStore('pyingkangoaToken')) {
      removeStore('haier-user-center-user-info')
      removeStore('haier-user-center-access-token')
      removeStore('pyingkangoaNickName')
      removeStore('pyingkangoaUserName')
      getToke(resolve)
    } else {
      debugger
      checkToken().then((data:any) => {
        if (data.code === 200) {
          // this.getList();
          resolve()
        } else {
          removeStore('pyingkangoaToken')
          removeStore('haier-user-center-user-info')
          removeStore('haier-user-center-access-token')
          removeStore('pyingkangoaNickName')
          removeStore('pyingkangoaUserName')
          getToke(resolve)
        }
      }).catch(() => {
        removeStore('haier-user-center-user-info')
        removeStore('haier-user-center-access-token')
        removeStore('pyingkangoaToken')
        removeStore('pyingkangoaNickName')
        removeStore('pyingkangoaUserName')
        getToke(resolve)
      });
    }
  })
}


