//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    current_price:0,
    original_price:0,
    one_cate_id:'',
    content:'',
    detail:'',
    indexImgBg:'',
    PayForXCX:'',
    payResult:''
  },
  //事件处理函数
  buynow:function(){
    var that = this;
    var url = app.globalData.baseUrl + app.globalData.PayForXCX;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        console.log(typeof (res));
        var needAmount = that.data.current_price;
        var openId = res.data;
        console.log("openId：" + openId);
        console.log(that.data.payResult);
        if (that.data.payResult == 1 || needAmount==0 ){
          wx.navigateTo({
            url: '../measinstru/measinstru',
          })
        }else{
          wx.request({
            url: url,
            method: "POST",
            data: {
              one_cate_id: that.data.one_cate_id,
              openid: openId,
              needAmount: needAmount,
              payType: 1
            },
            success: function (res) {
              console.log(res)
              var timeStamp = res.data.data.sign.timeStamp;
              var nonceStr = res.data.data.sign.nonceStr;
              var payPackage = res.data.data.sign.package;
              var signType = res.data.data.sign.signType;
              var paySign = res.data.data.sign.paySign
              wx.requestPayment({
                'timeStamp': timeStamp,
                'nonceStr': nonceStr,
                'package': payPackage,
                'signType': signType,
                'paySign': paySign,
                'success': function (res) {
                  console.log("success" + res)
                  wx.navigateTo({
                    url: '../measinstru/measinstru',
                  })
                },
                'fail': function (res) {
                  console.log("fail" + res)
                }
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }

      },
    })

  },
  onShow() {
    var that = this;
    var openId = wx.getStorageSync('openId');
    var url = app.globalData.baseUrl + app.globalData.getOptions;
    wx.request({
      method: "GET",
      url: url,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        openId: openId
      },
      success: function (data) {
        console.log(data);
        var payResult = data.data.data.payResult;
        var mainCon = data.data.data.option;
        var optionList = mainCon.optionList;
        var one_cate_id = mainCon.one_cate_id;
        var content = mainCon.content;
        var detail = mainCon.detail;
        var remark = mainCon.remark;
        var indexImgBg = mainCon.img_url;
        that.setData({
         current_price: mainCon.current_price,
         original_price: mainCon.original_price,
         one_cate_id: one_cate_id,
         content:content,
         detail: detail,
         indexImgBg: indexImgBg,
         payResult: payResult
       });
       wx.hideToast();
      //  缓存数据
       wx.setStorage({
         key: "optionList",
         data: optionList
       });
       wx.setStorageSync("one_cate_id", one_cate_id);
       wx.setStorageSync("remark", remark)
      }
    });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
