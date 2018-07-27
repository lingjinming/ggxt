const app = getApp();
// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList:null,
    questionList:null,
    progress: '',//进度条长度
    left_vw:'0vw',//容器位移
    width_vw:'',//容器的长度
    isShow:"none",
    option : '',
    userJson:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // var url = app.globalData.baseUrl + app.globalData.getQuestionAndAnswersByOption;
    var that = this;
    wx.getStorage({
      key: 'questionListData',
      success: function (res) {
         //console.log(res)
        try {
          // 获取到缓存数据questionListData
          var optionList = wx.getStorageSync('questionListData').optionList;
          var options_len = optionList.length;
          console.log(optionList,options_len)
          var percent = (1 / options_len) * 100; //计算进度条百分比
          if (optionList) {
            that.setData({
              optionList: optionList,
              progress: percent,
              width_vw: options_len * 100 + 'vw'
            });
          }
        } catch (e) {
          // Do something when catch error
          console.log(e)
        }
      }
    })
  },
  radioChange:function(e){
    var options_len = this.data.optionList.length;//题目个数    
    var questionId = e.target.id; // 题目ID
    var lastQuesId = this.data.optionList[options_len - 1]["id"];//最后一题的ID
    var answerId = e.detail.value.split(',').pop();// 选项的ID
    console.log("问题的ID是" + questionId, "对应选项的ID是" + answerId)
    var percent = (1 / options_len) * 100;
    var max_len = (options_len - 1)*100;
    var step = parseInt(this.data.left_vw);
    step -= 100;
    //控制最大位移
    if (step < -max_len) {
      step = -max_len;
    }
    this.setData({
      left_vw: step + 'vw',
      progress: this.data.progress + percent,
    });
    //如果达到最后一题且所有题目都答完,跳转到完成页面，再跳转到报告页面
    if (e.target.id == lastQuesId){
      wx.navigateTo({
        url: '../complete/complete',
        complete:function(){ //跳转到该页面三秒重定向转到结果页面
          var timer = setTimeout(function(){
            wx.redirectTo({
              url: '../result/result',
            })
          },1500)
        },
      })
    }
  },
  // 上一题
  up: function (e) {
    var options_len = this.data.options_len.length;
    var percent = (1 / options_len) * 100;
    var step = parseInt(this.data.left_vw);
    step += 100;
     //控制最小位移
    if(step==100){
      step=0
    }
    this.setData({
      left_vw: step + 'vw',
      progress: this.data.progress - percent,
    })
  },
})