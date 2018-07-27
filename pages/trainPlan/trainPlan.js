// pages/trainPlan/trainPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      name:"阿巴斯",
      age:9,
      sex:"男"
    },
    plan:{
      title:"总体任务",
      duration:45,
      times:3,
      totleTimes:30,
      con: "主要进行XX方面、XX方面、XX方面的强化训练，XXXXXXXXXX"
    },
    array:['1','2','3','4','5'],
    array2: ['1', '2', '3', '4', '5','33'],
    trainingCon:{
      week:'一',
      times:1,
      totleTimes:40,
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
    wx.redirectTo({
      url: '../result/result',
    })
  },
  bindPickerChange: function (e,index) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e, index) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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