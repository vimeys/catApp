// pages/platform/platform.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.postAjax(url.url.contact,{},function(that,json){
      that.setData({
        data:json.data
      })
    },this)
  },
  save:function () {
      console.log(this.data.data.qrcode)
      // wx.saveImageToPhotosAlbum({
      //
      // })
      wx.getImageInfo({
          src: this.data.data.qrcode,
          success: function (ret) {
              var path = ret.path;
              wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success(result) {
                      console.log(result)
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
  /**
   * 拨打电话
   */
  phone:function(e){
    var mobile = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: mobile,
    })
  }
})