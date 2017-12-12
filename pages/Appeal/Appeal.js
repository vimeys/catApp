// pages/Appeal/Appeal.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    three_img:'',
    parts_img:'',
    three:'',
    parts:'',
    text:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  takePhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          three_img:tempFilePaths,
        });
        wx.uploadFile({
          url: url.url.uploadfile,
          filePath: tempFilePaths[0],
          name: 'image',
          success: function (json) {
            var res = JSON.parse(json.data);
            that.setData({
              three:res.data
            })
          },
          fail: function () {
            wx.showModal({
              title: '上传失败',
              content: '上传失败请重新上传',
            })
          }
        })
      }
    }) 
   }, 
  /**
   * 破损零件图片上传
   */
  parts_up:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          parts_img: tempFilePaths,
        });
        wx.uploadFile({
          url: url.url.uploadfile,
          filePath: tempFilePaths[0],
          name: 'image',
          success: function (json) {
            var res = JSON.parse(json.data);
            that.setData({
              parts: res.data
            })
          },
          fail: function () {
            wx.showModal({
              title: '上传失败',
              content: '上传失败请重新上传',
            })
          }
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
  
  },
  text:function(e){
    var text = e.detail.value;
    this.setData({
        text:text,
    });
  },
  submit:function(){
    var data = this.data;
    var user = wx.getStorageSync('user');
    var post_data = {};
    post_data.user_id = user.user_id;
    post_data.describe = data.text;
    post_data.three_image = data.three;
    post_data.orther_image = data.parts;
    ajax.postAjax(url.url.complan,post_data,function(that,json){
      if(json.code==200){
        wx.showModal({
          title: '投诉成功',
          content: '您投诉成功，请等待平台处理',
          success:function(){
            wx.redirectTo({
              url: '../contFactory/contFactory',
            })
          }
        })
      }
    },this)
  }
})