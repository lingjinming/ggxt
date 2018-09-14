//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var appid = "wxd48d83d618bda279"
        var screat = "dc60e91f50ae0a6b49074f5767f2847d"
        console.log(that.globalData.baseUrl)
        
        var url = that.globalData.baseUrl + 'openIdUtil/getOpenId?code=' + res.code + '&appid=' + appid + '&secret=' + screat;
        console.log('code : ' + res.code);
        wx.setStorage({
          key: "PayForXCX",
          data: {
            appid: appid,
            screat: screat,
            code: res.code
          },
        });
        if (res.code) {
          wx.request({
            url, 
            method: "GET",
            data: {
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log("res.data.data.openid :" + res.data.data.openid)
              if (res.data.data.openid) {
                wx.setStorage({
                  key: "openId",
                  data: res.data.data.openid,
                })
              }
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                console.log(res)
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // baseUrl: "https://www.easy-mock.com/mock/5b2cb6258d65cf66ca86b00f",
    // baseUrl:"http://z2110457p6.iask.in:25300/yibk-app/",
    //baseUrl: "https://wx.ybc365.com/yibk-app/",

   baseUrl: "https://www.ybc365.com/yibk-app/",
    getOptions:"evaluation/getOptions",
    getQuestionAndAnswersByOption:"evaluation/getQuestionAndAnswersByOption?option=",
    getUserQuestionAndAnswers:"evaluation/getUserQuestionAndAnswers",
    getPlayForEvaluction:"evaluation/getPlayForEvaluction",
    PayForXCX:"evaluation/wechatPayForXCX",
    addVideoRecord:"evaluation/addVideoRecord"  }
})