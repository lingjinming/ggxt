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
    indexImgBg:''
  },
  //事件处理函数
  buynow:function(){
    // wx.requestPayment({
    //   'timeStamp': '',
    //   'nonceStr': '',
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success': function (res) {
    //     // console.log(res)
    //   },
    //   'fail': function (res) {
    //     // console.log(res)
    //   }
    // })
    wx.navigateTo({
      url: '../measinstru/measinstru',
    })
  },
  onShow() {
    var that = this;
    var url = app.globalData.baseUrl + app.globalData.getOptions;
    wx.request({
      method: "GET",
      url: url,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
      },
      success: function (data) {
        console.log(data);
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
         indexImgBg: indexImgBg
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
  }
})
