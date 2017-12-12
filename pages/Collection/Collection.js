// pages/Collection/Collection.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection:'',
    show:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync('user');
    var show = this.data.show;
    ajax.postAjax(url.url.collection,{user_id:17},function(that,json){
      var li = json.data;
      for(var k in li){
        li[k]['show'] = show;
      }
      that.setData({
        collection:li,
      });
    },this);
  
  },


  //全选
  selected:function(e){
    var show = this.data.show;
    var li = this.data.collection;
    for(var k in li){
      li[k]['show'] = !show;
    }
    this.setData({
      show:!show,
      collection:li,
    });
  },
  //单选
  checked:function(e){
    var data = e.currentTarget.dataset;
    var li = this.data.collection;
    for (var k in li) {
      if(k == data.index){
        li[k]['show'] = !data.show;
      }
    }
    this.setData({
      collection:li,
    });
  },
  //删除
  del:function(){
    var li= this.data.collection;
    var id='';
    for(var i in li){
      if(li[i]['show']){
        id += li[i]['id']+',';
      }
    }
    ajax.postAjax(url.url.delCollection,{id:id},function(that,json){
      if(json.data){
        wx.showModal({
          title: '删除收藏',
          content: '删除收藏成功',
          success:function(){
            wx.redirectTo({
              url: '../Collection/Collection',
            })
          }
        })
      }
    },this); 
  }
})