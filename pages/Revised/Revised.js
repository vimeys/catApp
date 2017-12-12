// pages/Revised/Revised.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:'',
    sub_order:'',
    show:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var user = wx.getStorageSync('user');
      ajax.getAjax(url.url.order_list, {user_id:user.user_id,status:0},function(that,json){
        var order = json.data;
        that.setData({
          order:order,
        });
      },this);
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

  order_status:function(e){
    var status = e.target.dataset.type;
    var user = wx.getStorageSync('user');
    ajax.getAjax(url.url.order_list, { user_id: user.user_id,status:status}, function (that, json) {
      var order = json.data;
      if(status ==0){
        that.setData({
          order: order,
          show: status
        });
      }else{
        that.setData({
          sub_order: order,
          show: status
        });
      }
    }, this);

  },

  /**跳转订单详情 */
  navto: function (e) {
    var order_id = e.currentTarget.dataset.id;
    var valid = e.currentTarget.dataset.valid;
    var status = e.currentTarget.dataset.status;
    if(valid == 1){
      wx.navigateTo({
        url: '../Reviseda/Reviseda?order_id='+order_id+'&status='+status,
      })
    }
  },

/**
 * 我的转账凭证
 */
  preve:function(e){
    var url = e.currentTarget.dataset.tran;
    wx.previewImage({
      current:'我的转款凭证',
      urls: [url],
    })
  },
  /**
   * 上传转账凭证
   */
  payimg:function(e){
    var id = e.currentTarget.dataset.index;
    var user = wx.getStorageSync('user');
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      success: function (res) {
        wx.uploadFile({
          url: url.url.uploadfile,
          filePath: res.tempFilePaths[0],
          name: 'image',
          success: function (json) {
            var img_path = JSON.parse(json.data);
            ajax.postAjax(url.url.payment, { open_id: user.open_id, order_id: id, pay_way: 3, transfer: img_path.data }, function (that, json) {
              if (json.code == 200) {
                wx.showModal({
                  title: '上传成功',
                  content: '您已上传转款凭证，请等待平台审核....',
                  showCancel: false,
                  success: function () {
                    that.onLoad();
                  }
                })
              }
            }, this);
          }
        })
      },
    })
  },
  /**
   * 确认收货
   */
  confirm:function(e){
    var order_id = e.currentTarget.dataset.order_id;
    var user = wx.getStorageSync('user');
    ajax.postAjax(url.url.take_over, { user_id: user.user_id, order_id:order_id},function(that,json){
      if(json.code == 200){
        wx.showModal({
          title: '收货成功',
          content: '确认收货成功，如有疑问请联系客服',
          success:function(){
            that.onLoad();
          }
        })
      }
    },this);
  },
  /**
   * 微信支付
   */
  payment:function(e){
    var order_id = e.currentTarget.dataset.order_id;
    var user = wx.getStorageSync('user');
    ajax.postAjax(url.url.payment, { order_id: order_id, open_id: user.openid, pay_way:1},function(that,json){
      console.log(json.data);
      var pay = json.data;
      wx.requestPayment({
        timeStamp: pay.timeStamp,
        nonceStr: pay.nonceStr,
        package: pay.package,
        signType: pay.signType,
        paySign: pay.paySign,
        success:function(res){
          
        },
        fail:function(res){

        }
      })
    },this)
  }




})

