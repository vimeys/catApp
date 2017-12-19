// pages/factory/factory.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      image:'',//图片
      id:'',
      height:''//图标高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this;
    let id=options.id;
    ajax.postAjax(url.url.factory,{id:id},function (that,json) {
        that.setData({
            image:json.data
        })
        that.loadImage()
    },this)
  },
    loadImage:function () {
        let  that=this;
        let image=this.data.image;
        let arr=[];
        for(var i=0;i<image.length;i++){
            getImage(that,i)
        }
        function getImage(that,i){
            wx.getImageInfo({
                src:that.data.image[i],
                success:function (res) {
                    // var height=[];
                    arr.unshift(res.height);
                    that.setData({
                        height:arr
                    })
                }
            });
        }

    },


})