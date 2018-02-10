// pages/weekshow/weekshow.js
import url from "../../utils/url";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      Data:'',
      page:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
    //跳转产品详情
    href:function (e) {
        let id=e.currentTarget.dataset.id;
        let type=e.currentTarget.dataset.type;
        let arr=[];
        arr.push(id);
        arr.push(type);
        wx.navigateTo({
            url: '../goodsDetail/goodsDetail?id='+arr
        })
    },
    // 获取列表
    getList:function (e) {
        let that=this;

        wx.request({
            url:url.url.weekLoad,
            method:'POST',
            data:{

            },
            success:res=>{
                console.log(res);
                that.setData({
                    Data:res.data.data
                })
                // that.setData({
                //     Data:res.data.data
                // })
                // let factoryId=res.data.data[0].factory_id;
                // that.setData({
                //     factoryId: factoryId
                // })
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
  
  }
})