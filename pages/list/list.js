// pages/list/list.js
import url from '../../utils/url'
var test=require('../../utils/testLogin');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],//列表页面
        marginTop:20,
        page:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getList();
    },
    //点击品牌跳转品牌详情
    brandDetail:function (e) {
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
        wx.getUserInfo({
            success: function (res) {
                var userInfoAvatar = res.userInfo.avatarUrl;
                var nickname = res.userInfo.nickName;
                wx.setStorageSync('name', nickname);
                wx.setStorageSync('userInfo',res.userInfo);
                // wx.setStorageSync('UserID', nickname);
                // console.log("在onlaunch里面的url"+url);
                // console.log("nickname"+nickname)
                // console.log("nickname"+userInfoAvatar);
                // console.log(res);
                // return;
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            //发起网络请求

                            wx.request({
                                url:'https://mela.scmxkj.com/index.php/cat/part/get_openid',
                                method: "POST",
                                data: {
                                    code: res.code,
                                    // img: userInfoAvatar,
                                    // uname: nickname
                                },
                                success: function (res) {
                                    wx.setStorageSync('user',res.data.data);
                                    if(res.data.code==200){
                                        wx.removeStorageSync('level');
                                        wx.setStorageSync('open_id',res.data.data.openid);
                                        wx.setStorageSync('user_id',res.data.data.user_id);
                                    }
                                    if(res.data.code==202){//没有注册
                                        wx.setStorageSync('open_id',res.data.data.openid);
                                        wx.setStorageSync('level', 'none');
                                        test.test(this);
                                    }
                                    if(res.data.code==203){//没有付款
                                        wx.setStorageSync('open_id',res.data.data.openid);
                                        wx.setStorageSync('user_id',res.data.data.user_id);
                                        wx.reLaunch({
                                            url: '../vip/vip'
                                        })
                                    }
                                    if(res.data.code==204){//已过期
                                        wx.setStorageSync('open_id',res.data.data.openid);
                                        wx.setStorageSync('user_id',res.data.data.user_id);
                                        wx.reLaunch({
                                            url: '../vip/vip'
                                        })
                                    }
                                },
                                fail: function () {

                                    wx.setStorageSync('user', userInfoAvatar);
                                },
                                complete: function () {

                                }
                            })
                        } else {
                        }
                    }
                })
            },
            fail: function (res) {
                // fail
            },
            complete: function () {
                // complete
            }
        })
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
        if(e.scrollTop>200){
            this.setData({
                marginTop:0
            })
        }else{
            this.setData({
                marginTop:20
            })
        }
    },
    onShareAppMessage: function () {
        //     return {
        //         title: '微信小程序联盟',
        //         desc: '最具人气的小程序开发联盟!',
        //         path: '/page/index'
        //     }
    },
    onReachBottom: function () {
        let page=this.data.page;
        page++;
        this.setData({
            page:page
        })

    },
})