// pages/CheckedoutTBD/CheckedoutTBD.js
import  url from '../../utils/url'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user_id:'',
      Data:'',
      size:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user_id=wx.getStorageSync('user_id');
    this.getStorage();
    this.setData({
        user_id:user_id
    })
  },

    // 获取缓存
  getStorage:function (e) {
      let order=wx.getStorageSync('TBDorder');
      let size=wx.getStorageSync('size');
      this.setData({
          Data:order,
          size:size
      })
  },
    //提交订单
  confirm:function (e) {
      let obj={}
      obj.user_id=this.data.user_id;
      let id=wx.getStorageSync('goods_id');
      let spic_id=wx.getStorageSync('spic_id');
      let num=this.data.Data.num;
      obj.goods=[{
          goods_id:id,
          spec_id:spic_id,
          num:num,
          brand_id:this.data.Data.brand_id
      }];
      obj.is_car='叫爸爸';
      wx.request({
          url:url.url.orderOkTBD,
          method:'POST',
          data:obj,
          success:res=>{
              console.log(res)
              if(res.data.code==200){
                  wx.setStorageSync('order_id',res.data.data.order_id);
                  wx.navigateTo({
                    url: '../payWay/payWay'
                  })
              }
          }
      })
  },
})