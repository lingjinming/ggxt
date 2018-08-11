const app = getApp();
var util = require('../../utils/util.js');

// pages/trainPlan/trainPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // user:{
    //   name:"阿巴斯",
    //   age:9,
    //   sex:"男"
    // },
    time: '',
    title:"总体任务",
    duration:0,
    times:0,
    totleTimes:0,
    con:"主要进行XX方面、XX方面、XX方面的强化训练，XXXXXXXXXX",
    trainingCon:{
      duration:45,
      aim:"训练前庭、本体",
      project:[{
        projectName:"仰卧花生球",
        projectTimes:20,
        projectGroup:2,
        projectMaxTime:10
      },{
          projectName: "羊角球",
          projectTimes: 20,
          projectGroup: 2,
          projectMaxTime: 10
      },{
          projectName: "圆筒吊缆",
          projectTimes: 20,
          projectGroup: 2,
          projectMaxTime: 10
      },{
        projectName: "圆筒吊缆",
        projectTimes: 20,
        projectGroup: 4,
        projectMaxTime: 10
      }]
    }
  },
  backToResul:function(){
    wx.showToast({
      icon: "loading",
      title: '结果加载中',
      duration: 5000,
      mask: true,
      success:function(){
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
        },1000)
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openId = wx.getStorageSync('openId');
    var one_cate_id = wx.getStorageSync('one_cate_id');
    var url = app.globalData.baseUrl + app.globalData.getPlayForEvaluction + "?one_cate_id=" + one_cate_id + "&openId=" + openId;

    var time = util.formatTime(new Date());

    wx.request({
      url: url,
      method:"GET",
      // method: "POST",
      // data: {
      //   "openId": openId,
      //   "one_cate_id": one_cate_id
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var plan = res.data.data;
        var trainingCon = plan.project;
        console.log(plan,trainingCon)
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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