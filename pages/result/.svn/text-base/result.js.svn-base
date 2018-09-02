// pages/result/result.js
const app = getApp();
var util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:"block",
    result:null,
    time:'',
    con1:'',
    con2:'',
    con3:'',
    con4:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());

    var openId = wx.getStorageSync('openId');
    var one_cate_id = wx.getStorageSync('one_cate_id');

    // var questionAndAnswers = wx.getStorageSync('userJson');
    var questionAndAnswers = wx.getStorageSync('questionAndAnswers');
    var u_option = wx.getStorageSync('u_option');

    var url = app.globalData.baseUrl + app.globalData.getUserQuestionAndAnswers;
    wx.request({
      url: url,
      method: "POST",
      data: {
        "openId": openId,
        "one_cate_id": one_cate_id,
        "u_option": u_option,
        "questionAndAnswers": questionAndAnswers
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var con1 = res.data.data.content1
        var con2 = res.data.data.content2
        var con3 = res.data.data.content3
        var con4 = res.data.data.content4
        that.setData({
          show: res.data.data,
          time: time,
          con1: con1,
          con2: con2,
          con3: con3,
          con4: con4,
        })
        console.log("测试结果content1:" + that.data.con1)
        console.log("测试结果content2:" + that.data.con2)
        console.log("测试结果content3:" + that.data.con3)
        console.log("测试结果content4:" + that.data.con4)
        var result = new Array();
        var comLen = '';
        for (let i = 0; i < con2.length; i++) {
          result.push(con2[i].name3)
          if (con2[i].name3 == '正常'){
            comLen ++;
            console.log(comLen)
          }
        }
        if (comLen == result.length){
           that.setData({
             show:"none"
           })
        }
        console.log(comLen, result,result.length)
      }
    })
  },
  trainPlan: function () {
    wx.showToast({
      icon: "loading",
      title: '计划加载中',
      duration: 1000,
      mask: true,
      success:function(){
        setTimeout(function(){
          wx.navigateTo({
            url: '../trainPlan/trainPlan',
          })
        },1000)
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})