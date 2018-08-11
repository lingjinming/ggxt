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
    val_len:'',
    option_len:'',
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

    try {
      value.forEach(function (current, index, array){
        var imgArr = current.img_url.split("|");
        var u_optionArr = current.u_option.split("|");

        value[index].newImg_url = imgArr;
        value[index].newU_option = u_optionArr;

        that.setData({
          optionList: value,
          val_len: val_len,
          one_cate_id: one_cate_id
        });
      });
    } catch (e) {
      console.log("错误："+e)
    }
    console.log(val_len)
  },
  radioChange: function (e) { //当点击单选框时触发事件
    var that = this;
    var optionArr = that.data.option;//获取选项
    var id = e.target.id; //选项的id
    var val = e.detail.value;//选项的value
    var timeStamp = e.timeStamp;//时间戳
    var Target = { "id": id, "val": val, "timeStamp": timeStamp}
    optionArr.push(Target) 
    var optionArr1 = optionArr.sort(function (a, b) {
      return b.timeStamp - a.timeStamp;
    });
    let obj = {};
    optionArr1 = optionArr1.reduce((cur, next) => {
      obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
      return cur;
    }, []) //设置cur默认类型为数组，并且初始值为空的数组
    var optionArr2 = optionArr1.sort(function (a, b) {
      return a.id - b.id;
    });
    console.log(optionArr2);
    var optionStr = [];
    optionArr2.forEach(function (current, index, array){
      console.log(current.val, index, array)
      optionStr.push(current.val);
    })
    var option_len = optionStr.length; //选项个数
    console.log( option_len)

    optionStr = optionStr.join("|")
    that.setData({
      optionStr: optionStr,
      option_len: option_len
    });
    console.log(that.data.optionStr,option_len)

    wx.setStorageSync('u_option', optionStr)
  },
  beginTest: function () { //跳转到测试前提选项页面
    var that = this;
    var url = app.globalData.baseUrl + app.globalData.getQuestionAndAnswersByOption +   that.data.optionStr + "&one_cate_id=" + that.data.one_cate_id;

    var option = that.data.option;
    var len = that.data.val_len;
    console.log("开始测评" + option[0]["id"], "选项个数：" + len)
  
    if (len == that.data.option_len){
      wx.showToast({
        icon: "loading",
        title: '题目加载中',
        duration: 5000,
        mask: true
      });
      wx.request({
        url: url,
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
        },
        success: function (res) {
          var questionListData = res.data.data;
          console.log(questionListData)
          wx.setStorage({
            key: "questionListData",
            data: questionListData
          });
          wx.redirectTo({
            url: '../test/test',
          });         
        }
      });
    }else{
      wx.showToast({
        title: '请检查一下是否有未选择的选项！',
        icon: 'none',
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {
  },
})