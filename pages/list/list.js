// pages/list/list.js
import url from '../../utils/url'
var test=require('../../utils/testLogin');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],//列表页面
        marginTop:20
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getList();
    },
    //点击品牌跳转品牌详情
    brandDetail:function (e) {
        console.log(1);
        let Type=e.currentTarget.dataset.type;
        let name=e.currentTarget.dataset.name;
        wx.setStorageSync('brandName', name);
        wx.navigateTo({
          url: '../chanping/chanping?id='+Type
          // url: '../brand/brand?id='+Type
        })
    },

    //页面加载请求
    getList: function (e) {
        let that=this;
        wx.request({
            url:url.url.getList,
            method:'POST',
            success:res=>{
                let json=res.data.data.recommend_brand_list;
                // JSON.parse(json[0].goods_num);
                // console.log(json);
                that.setData({
                    list:json,
                })
            }
        })
    },
    onShow:function (e) {
        test.test(this)
    },
    //获取更多品牌列表
    more:function (e) {
        wx.navigateTo({
          url: '../search/search'
        })
    },
    //跳转页面
    search:function () {
        wx.navigateTo({
            url: '../searchGoods/searchGoods'
        })
    },
    // 页面滚动
    onPageScroll:function (e) {
        console.log(e.scrollTop);
        if(e.scrollTop>200){
            this.setData({
                marginTop:0
            })
        }else{
            this.setData({
                marginTop:20
            })
        }
    }
})