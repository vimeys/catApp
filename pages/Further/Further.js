// pages/Further/Further.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Data:[],
      page:0,
      goodsName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getList()
  },
  //数据请求
    getList:function (e) {
        ajax.postAjax(url.url.allPromotion,{num:this.data.page,name:this.data.goodsName},function (that,json) {
            that.setData({
                Data:json.data.commodity_goods_list
            })
        },this)
    },
    //跳转商品详情
    goodsDetail:function (e) {
        var id=e.currentTarget.dataset.type;
        let is_id=e.currentTarget.dataset.name;
        let arr=[];
        arr.push(id);
        arr.push(is_id);
        wx.navigateTo({
            url: '../goodsDetail/goodsDetail?id='+arr
        })
    },

    input:function (e) {
        let value=e.detail.value;
        if(value){
            this.setData({
                goodsName:value,
                page:0
            })
        }
    },
    //点击请求
    search:function (e) {
        let page=this.data.page;
        this.setData({
            page:0
        });
        this.getList()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let page=this.data.page;
        page++;
        this.setData({
            page:page
        })
        // this.getList();
        ajax.postAjax(url.url.allPromotion,{num:this.data.page,name:this.data.goodsName},function (that,json) {
            let data=that.data.Data;
            if(json.data.commodity_goods_list.length>=1){
                data.push(json.data.commodity_goods_list);
                that.setData({
                    Data:data
                })
            }

        },this)
    },
});