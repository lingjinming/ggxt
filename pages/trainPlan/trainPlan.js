const app = getApp();
var util = require('../../utils/util.js');

// pages/trainPlan/trainPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'none',
    time: '',
    title: "总体任务",
    duration: 0,
    times: 0,
    totleTimes: 0,
    con: "",
    content:'训练计划,实盘指导',
    current_price:'',
    original_price:'',
    one_cate_id:'',
    currentTargetInfo:null
  },
  backToResul: function() {
    wx.showToast({
      icon: "loading",
      title: '结果加载中',
      duration: 5000,
      mask: true,
      success: function() {
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var openId = wx.getStorageSync('openId');
    var one_cate_id = wx.getStorageSync('one_cate_id');
    var url = app.globalData.baseUrl + app.globalData.getPlayForEvaluction + "?one_cate_id=" + one_cate_id + "&openId=" + openId;

that.setData({
  one_cate_id
})
    var time = util.formatTime(new Date());

    wx.request({
      url: url,
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        var plan = res.data.data;
        var trainingCon = plan.project;
        console.log(plan, trainingCon)
        that.setData({
          time: time,
          title: plan.title,
          duration: plan.duration,
          times: plan.times,
          totleTimes: plan.totleTimes,
          con: plan.con,
          trainingCon: trainingCon
        })
      }
    })
  },
  closevideopay:function(){
    var that = this;

    that.setData({
      show: 'none'
    })
  },
  showVideo: function(e) {
    var that = this;
    var currentTargetInfo = e.currentTarget.dataset;
    that.setData({
      currentTargetInfo: currentTargetInfo
    })
    var one_cate_id = wx.getStorageSync('one_cate_id');
    var playName = currentTargetInfo.projectname;
    console.log(playName)
    var openId = wx.getStorageSync('openId');
     var openId =9541311211112111;
    var url = app.globalData.baseUrl + app.globalData.addVideoRecord + '?openId=' + openId + "&one_cate_id=" + one_cate_id + "&playName=" + playName;

    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {},
      success: function(res) {
        console.log(res)
        var respcode = res.data.respCode;
        var content = res.data.data.content;
        var current_price = res.data.data.current_price;
        var original_price = res.data.data.original_price;
        that.setData({
          content: content,
          current_price: current_price,
          original_price: original_price
        })
        console.log(respcode, res.data)

        if (currentTargetInfo.projectvideourl) {
          if (respcode == '0005') {
              that.setData({
                show:'block'
              })
          } else if (respcode == '0000') {

            that.setData({
              show: 'none'

            })
            wx.setStorage({
              key: 'currentTargetInfo',
              data: currentTargetInfo,
              success: function(res) {
                wx.navigateTo({
                  url: '../trainvideo/trainvideo',
                })
              }
            })

          }
        } else {
          wx.showToast({
            icon: 'none',
            title: "此视频暂无教学视频",
          })
        }

      }
    })



  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  buynow: function () {
    var that = this;
    var url = app.globalData.baseUrl + app.globalData.PayForXCX;
    that.setData({
      show: 'none'
    })
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        console.log(that.data.current_price);

        var needAmount = parseFloat(that.data.current_price.substr(1));
        console.log(needAmount);

        var openId = res.data;
        console.log("openId：" + openId);
        wx.request({
          url: url,
          method: "POST",
          data: {
            one_cate_id: that.data.one_cate_id,
            openid: openId,
            payType:2,
            needAmount: needAmount         
           },
          success: function (res) {
            console.log("视频支付成功"+ res.data)
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
                wx.setStorage({
                  key: 'currentTargetInfo',
                  data: that.data.currentTargetInfo,
                  success: function (res) {
                    wx.navigateTo({
                      url: '../trainvideo/trainvideo',
                    })
                  }
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
      },
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})