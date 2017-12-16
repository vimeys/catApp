// pages/TBD/TBD.js
import url from '../../utils/url'
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
      let page=this.data.page;
      let name=this.data.goodsName;
      this.getList(page,name)
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
      let name=this.goodsName;
      this.getList(page,name)
  },
  getList:function (page,name) {
    let that=this;
      wx.request({
          url:url.url.allTBD,
          method:'POST',
          data:{
            page:page,
              name:name
          },
          success:function (res) {
              if(res.data.code==200){
                let data=that.data.Data;
        let json=res.data.data.commodity_goods_list;
                if(json.length>=1){
                    data.push(json)
                    that.setData({
                        Data:res.data.data.commodity_goods_list
                    })
                }
              }
          }
      })
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
        let name=this.data.goodsName;
        this.setData({
            page:0
        });
        this.getList(page,name)
    },

})