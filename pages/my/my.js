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
      news:'',
      url:'../myshop/myshop'
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
              is_user:false,
                news:json.message
            })
         }else{
           wx.setStorageSync('level_vip_end_time', json.data.level_vip_end_time);
           wx.setStorageSync('vip_id', json.data.level_vip_id);
           that.setData({
               is_user:true,
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
      wx.getUserInfo({
          success: function (res) {
              var userInfoAvatar = res.userInfo.avatarUrl;
              var nickname = res.userInfo.nickName;
              wx.setStorageSync('name', nickname);
              wx.setStorageSync('userInfo',res.userInfo);
              // wx.setStorageSync('UserID', nickname);
              // console.log("在onlaunch里面的url"+url);
              // console.log("nickname"+nickname)
              // console.log("nickname"+userInfoAvatar);
              // console.log(res);
              // return;
              wx.login({
                  success: function (res) {
                      if (res.code) {
                          //发起网络请求

                          wx.request({
                              url:'https://mela.scmxkj.com/index.php/cat/part/get_openid',
                              method: "POST",
                              data: {
                                  code: res.code,
                                  // img: userInfoAvatar,
                                  // uname: nickname
                              },
                              success: function (res) {
                                  wx.setStorageSync('user',res.data.data);
                                  if(res.data.code==200){
                                      wx.removeStorageSync('level');
                                      wx.setStorageSync('open_id',res.data.data.openid);
                                      wx.setStorageSync('user_id',res.data.data.user_id);
                                  }
                                  if(res.data.code==202){//没有注册
                                      wx.setStorageSync('open_id',res.data.data.openid);
                                      wx.setStorageSync('level', 'none');
                                      test.test(this);
                                  }
                                  if(res.data.code==203){//没有付款
                                      wx.setStorageSync('open_id',res.data.data.openid);
                                      wx.setStorageSync('user_id',res.data.data.user_id);
                                      wx.reLaunch({
                                          url: '../vip/vip'
                                      })
                                  }
                                  if(res.data.code==204){//已过期
                                      wx.setStorageSync('open_id',res.data.data.openid);
                                      wx.setStorageSync('user_id',res.data.data.user_id);
                                      wx.reLaunch({
                                          url: '../vip/vip'
                                      })
                                  }
                              },
                              fail: function () {

                                  wx.setStorageSync('user', userInfoAvatar);
                              },
                              complete: function () {

                              }
                          })
                      } else {
                      }
                  }
              })
          },
          fail: function (res) {
              // fail
          },
          complete: function () {
              // complete
          }
      })
    var user = wx.getStorageSync('user');
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    })
    //获取用户信息
    ajax.ask(url.url.user_info, { user_id: user.user_id }, 'POST', function (that, json) {
      if (json.code != 200) {

        that.setData({
            url:'../myshop/myshop',
            news:json.message,
          is_user: false
        })
          if(json.data.status==2){
            wx.setStorageSync('next', 'rest');
            that.setData({
                url:'../login_1/login_1'
            })
          }
      } else {
        that.setData({
            url:'../myshop/myshop',
          is_user:true,
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