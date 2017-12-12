// pages/my/my.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:"",
      vip_time:'',
      user_data:{},
      is_user:true, //判断是否到期
      new_num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var user = wx.getStorageSync('user');
      var userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo:userInfo
      })
      //获取用户信息
      ajax.ask(url.url.user_info, {user_id:user.user_id},'POST',function(that,json){
         if(json.code != 200){
            that.setData({
              is_user:false
            })
         }else{
           wx.setStorageSync('level_vip_end_time', json.data.level_vip_end_time);
           wx.setStorageSync('vip_id', json.data.level_vip_id);
           that.setData({
             user_data:json.data,
           })
         }
      },this);
     
      //消息列表
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
    var user = wx.getStorageSync('user');
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    })
    //获取用户信息
    ajax.ask(url.url.user_info, { user_id: user.user_id }, 'POST', function (that, json) {
      if (json.code != 200) {
        that.setData({
          is_user: false
        })
      } else {
        that.setData({
          user_data: json.data,
        })
      }
    }, this);
    //消息列表
    ajax.postAjax(url.url.new_list, { user_id: user.user_id }, function (that, json) {
      var news = json.data;
      var new_num = that.data.new_num;
      new_num = 0;
      for (var k in news) {
        if (news[k]['status'] == '0') {
          new_num++;
        }
      }
      that.setData({
        new_num: new_num
      })
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
  
  }
})