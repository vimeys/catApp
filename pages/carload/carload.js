// pages/carload/carload.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      active:1,
  },

  // 切换分类
    toggle:function (e) {
        let value=e.currentTarget.dataset.idx;
        let that=this;
        this.setData({
            active:value
        })
        ajax.postAjax(url.url.cargoods,{cate_id:that.data.carlist[that.data.active].id},function (that,json) {
            that.setData({
                Data:json.data
            });
        },that)
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
      ajax.postAjax(url.url.carlist,{},function (that,json) {
          console.log(json);
          console.log(that);
          function get_object_first_attribute(data){
              for (var key in data)
                return data[key];
          }
          let active=get_object_first_attribute(json.data)
          that.setData({
              active:active.id
          })
          ajax.postAjax(url.url.cargoods,{cate_id:get_object_first_attribute(json.data).id},function (that,json) {
              that.setData({
                  Data:json.data
              });
              console.log(json);
          },that)
          that.setData({
            carlist:json.data
          })
      },this)
  },
    //链接跳转
    href:(e)=>{
        let id=e.currentTarget.dataset.id;
        let type=e.currentTarget.dataset.type;
        let arr=[id,type];
        wx.navigateTo({
          url: '../goodsDetail/goodsDetail?id='+arr
        })
    },
    hrefSearch:(e)=>{
        wx.navigateTo({
          url: '../searchGoods/searchGoods'
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
  
  }
})