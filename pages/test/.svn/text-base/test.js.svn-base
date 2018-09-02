const app = getApp();
// pages/test/test.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    optionList: null,
    questionList: null,
    options_len: '',
    progress: '',//进度条长度
    left_vw: '0vw',//容器位移
    width_vw: '',//容器的长度
    option: '',
    qAaObj: [],
    isshow:"block",
    firstQuesId:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  onShow:function(){
    var that = this;
    wx.getStorage({
      key: 'questionListData',
      success: function (res) {
        try {
          // 获取到缓存数据questionListData
          var optionList = wx.getStorageSync('questionListData').optionList;
          var options_len = optionList.length;
          var firstQuesId = parseInt(optionList[0]["id"]);//第一题的ID
          console.log("题目数量" + options_len, "第一题的ID" + firstQuesId)
          // console.log(optionList,options_len);
          var percent = (1 / options_len) * 100; //计算进度条百分比
          if (optionList) {
            that.setData({
              options_len: options_len,
              optionList: optionList,
              progress: percent,
              width_vw: options_len * 100 + 'vw',
              firstQuesId: firstQuesId
            });
          }
        } catch (e) {
          console.log(e)
        }
      }
    })
  },
  radioChange: function (e) {
    var that = this;
    var url = app.globalData.baseUrl + app.globalData.result;
    var one_cate_id = wx.getStorageSync('one_cate_id');
    var options_len = this.data.optionList.length;//题目个数   
    // console.log('题目个数:' + options_len) 
    var questionId = parseInt(e.target.id); // 题目 ID
    // console.log('题目 ID:' + questionId) 
    var lastQuesId = parseInt(this.data.optionList[options_len - 1]["id"]);//最后一题的ID
    console.log('题目 ID:' + questionId,'最后一题的 ID:' + lastQuesId) 
    var answerId = parseInt(e.detail.value.split(',').pop());// 选项 的ID
    console.log('选项 ID:' + answerId) 
    var two_cate_id = e.currentTarget.dataset.two_cate_id;//每道题所属two_cate_id
    // console.log('每道题所属two_cate_id:' + two_cate_id) 
    that.data.qAaObj.push(
      {
        "two_cate_id": two_cate_id,
        "question_id": questionId,
        "answer_id": answerId
      }
    );
    let obj = {};
    var newqAaObj = that.data.qAaObj;
    newqAaObj = that.data.qAaObj.reduce((cur, next) => {
      obj[next.question_id] ? "" : obj[next.question_id] = true && cur.push(next);
      return cur;
    }, []) //设置cur默认类型为数组，并且初始值为空的数组
    console.log("radioChange" + e)
    //如果达到最后一题且所有题目都答完,跳转到完成页面，再跳转到报告页面
    if (newqAaObj.length == options_len || questionId == lastQuesId) {
      wx.setStorage({
        key: 'questionAndAnswers',
        data: newqAaObj,
      });
      wx.redirectTo({
        url: '../complete/complete',
        success: function () { //跳转到该页面三秒重定向转到结果页面
          wx.hideLoading();
         var timer = setTimeout(function () {
           wx.redirectTo({
             url: '../result/result',
           })
        }, 1000)
        },
      })
    }
    // if (newqAaObj.length !== options_len && questionId == lastQuesId){
    //   if (newqAaObj.length < options_len){
    //     wx.showToast({
    //       icon:'none',
    //       title: '请查看是否有未选中的测试题目',
    //       duration:800
    //     })
    //   }
    // }
  },
  gonext:function(e){
    var that = this;
    console.log("gonext"+e)
    var options_len = that.data.optionList.length;//题目个数  
    var percent = (1 / options_len) * 100;
    var max_len = (options_len - 1) * 100;
    var step = parseInt(that.data.left_vw);
 
    step -= 100;
    //控制最大位移
    if (step < -max_len) {
      step = -max_len;
    };
    that.setData({
      progress: that.data.progress + percent,
      left_vw: step + 'vw'
    });
  },
  // 上一题
  up: function (e) {
    var options_len = this.data.options_len;
    var percent = (1 / options_len) * 100;
    var step = parseInt(this.data.left_vw);
    step += 100;
    console.log(e,step)
    //控制最小位移
    if (step == 100) {
      step = 0
    };
    // this.data.qAaObj.pop();//删掉数组中最后一个数据
    console.log(this.data.qAaObj)
    this.setData({
      options_len: options_len,
      left_vw: step + 'vw',
      progress: this.data.progress - percent,
    })
  }
})