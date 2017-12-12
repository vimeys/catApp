// pages/belief/belief.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     news:'',
     userInfo:'',
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
    var userinfo = wx.getStorageSync('userInfo');
    var user = wx.getStorageSync('user');
    ajax.postAjax(url.url.new_list, { user_id: user.user_id }, function (that, json) {
      var news = json.data;
      wx.setStorageSync('news', news);
       that.setData({
         news:news,
         userInfo: userinfo
       });
    }, this);
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
  open_news:function(e){
    var id = e.currentTarget.dataset.index;
    var new_list = wx.getStorageSync('news');
    console.log(new_list);
    wx.setStorageSync('news_info', new_list[id]);
    wx.navigateTo({
      url: '../news/news',
    })
  }
})