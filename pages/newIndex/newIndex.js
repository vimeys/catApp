// pages/newIndex/newIndex.js
import url from "../../utils/url";
import ajax from "../../utils/ajax";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      data:'',
      img:'',
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
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
      let that = this;
      wx.request({
          url: url.url.Slider,
          method: 'POST',
          success: res => {
              let img = [];
              let imgID = [];
              if (res.data.code == 200) {
                  that.setData({
                      img: res.data.data.banner_list
                  })
              }
          }
      });
      ajax.postAjax(url.url.AD, {}, function (that, json) {
          that.setData({
              scroll: json.data.adv_list
          })
      }, this);
      ajax.postAjax(url.url.factoryList, {}, function (that, json) {
          that.setData({
              factoryList: json.data
          })
      }, this)
  },
    //轮播跳转
    hrefProduct: function (e) {
        let type = e.currentTarget.dataset.type;
        let factory = e.currentTarget.dataset.factory;
        let status = e.currentTarget.dataset.status;
        if (status == 0) {
            wx.navigateTo({
                url: '../chanping/chanping?id=' + type
            })
        } else if (status == 1) {
            wx.navigateTo({
                url: '../factorybrand/factorybrand?id=' + factory
            })
        }

    },
    //更多活动商品
    pMore: function (e) {
        wx.navigateTo({
            url: '../Further/Further'
        })
    },
    //更多众筹商品
    tMore: function (e) {
        wx.navigateTo({
            url: '../TBD/TBD'
        })
    },
    //跳转链接

    //本周推荐
    recommend:(e)=>{
        wx.navigateTo({
          url: '../carload/carload'
        })
    },
    //整车品牌
    weekshow:()=>{
      wx.navigateTo({
        url: '../weekshow/weekshow'
      })
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