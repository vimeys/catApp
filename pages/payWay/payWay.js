// pages/payWay/payWay.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      chose:1,
      open_id:"",
      order_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let open_id=wx.getStorageSync('open_id');
      let order_id=wx.getStorageSync('order_id');
      this.setData({
          open_id:open_id,
          order_id:order_id
      })
  },
  //选择方式
    click:function (e) {
        let type=e.currentTarget.dataset.type;
        this.setData({
            chose:type
        })
    },
    // confirm: function (e) {
    //     let obj = {};
    //     obj.order_id=this.data.order_id;
    //     obj.open_id=this.data.open_id;
    //     obj.pay_way=this.data.chose;
    //     if(this.data.chose==1){
    //         wx.request({
    //             url: url.url.payWay,
    //             method: 'POST',
    //             data: obj,
    //             success: res => {
    //                 console.log(res);
    //             }
    //         })
    //     }else if(this.data.chose==3){
    //       wx.navigateTo({
    //         url: '../iccount/iccount'
    //       })
    //     }
    //
    // }
    confirm: function (e) {
      let that=this;
        let obj = {};
        obj.order_id=this.data.order_id;
        obj.open_id=this.data.open_id;
        obj.pay_way=this.data.chose;
        var user = wx.getStorageSync('user');
        if(this.data.chose==1){
            // wx.request({
            //     url: url.url.payWay,
            //     method: 'POST',
            //     data: obj,
            //     success: function(res) {
            //         var pay = res.data.data;
            //         console.log(pay);
            //         wx.requestPayment({
            //             timeStamp: pay.timeStamp,
            //             nonceStr: pay.nonceStr,
            //             package: pay.package,
            //             signType: pay.signType,
            //             paySign: pay.paySign,
            //             success: function (res) {
            //                 ajax.postAjax(url.url.pay_success, { id:obj.order_id, user_id: user.user_id }, function (that, json) {
            //                     wx.removeStorageSync('cartId');
            //                     wx.showModal({
            //                         title: '支付成功',
            //                         content: '支付成功',
            //                         success: function () {
            //                             let order_id=wx.getStorageSync('order_id');
            //                             wx.redirectTo({
            //                                 url: '../Revised/Revised?order_id='+order_id+'&status='+1,
            //                             })
            //                         }
            //                     })
            //                 }, that)
            //             },
            //             fail: function (res) {
            //                 wx.showModal({
            //                     title: res.errMsg,
            //                     content: res.errMsg,
            //                 })
            //             }
            //         })
            //     }
            // })
            wx.showModal({
              title: '提示',
              content: '功能暂未开放，请选择其他方式',
                showCancel:false,
              success: res=>{
                if (res.confirm) {

                }
              }
            })
        }else if(this.data.chose==3){
            wx.navigateTo({
                url: '../account/account?go=1&order_id='+that.data.order_id
            })
        }

    }

})