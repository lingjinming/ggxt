var app = getApp();
// pages/choose/choose.js
Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    optionList:null,
    imgAndOption:null,
    option:[],
    optionStr:'',
    one_cate_id:''
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    var that = this;
    var value = wx.getStorageSync('optionList');
    var val_len = value.length;
    var one_cate_id = wx.getStorageSync('one_cate_id');

    console.log(value,val_len,one_cate_id);
    try {
      value.forEach(function (current, index, array){
        var imgArr = current.img_url.split("|");
        var u_optionArr = current.u_option.split("|");

        value[index].newImg_url = imgArr;
        value[index].newU_option = u_optionArr;

        that.setData({
          optionList: value,
          one_cate_id: one_cate_id
        });
      });
    } catch (e) {
      console.log("错误："+e)
    }
  },
  radioChange: function (e) {
    var that = this;
    var optionArr = that.data.option;
    if(e.detail.value){
      optionArr.push(e.detail.value);
      var optionStr = optionArr.join("|");
    }
    that.setData({
      optionStr: optionStr
    })
  },
  beginTest: function () { //跳转到测试前提选项页面
    // if (radioChange){
     
    // }
    var that = this;
    //console.log(that)
    var url = app.globalData.baseUrl + app.globalData.getQuestionAndAnswersByOption;
    wx.request({
      url: url,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        option: that.data.optionStr + "&one_cate_id=" + that.data.one_cate_id
      },
      success: function (res) {
        var questionListData = res.data.data;
        // console.log(questionListData)
        wx.setStorage({
          key: "questionListData",
          data: questionListData
        })
        wx.navigateTo({
          url: '../test/test',
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  }
})