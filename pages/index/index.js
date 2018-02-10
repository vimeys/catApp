//index.js
//获取应用实例
var app = getApp();
// var url=require('../../utils/url');
// import {url} from '../../utils/url';
import url from '../../utils/url';
import ajax from '../../utils/ajax'

var test = require('../../utils/testLogin');
Page({
    data: {
        promotion: [],
        img: [],
        TBD: [],
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        order: "",
        num: 50,
        scroll: '',
        marginTop: 20,//搜索顶部
        show: false,
        src: '',//
        changeShow1:true,
        changeShow2:false,//切换显示
    },
    search: function (e) {
        wx.navigateTo({
            url: '../searchGoods/searchGoods'
        })
    },
    click: function (e) {
        var that = this;
        wx.chooseImage({
            success: function (res) {
                that.setData({
                    order: res.tempFilePaths
                })
            },
        })

    },
    change:function (e) {
        let type=e.currentTarget.dataset.type;
        let show=this.data.changeShow;
        if(type==2){
            this.setData({
                changeShow1:false,
                changeShow2:true
            })
        }else if(type==1){
            this.setData({
                changeShow1:true,
                changeShow2:false
            })
        }
    },
    cart: function (e) {
        // wx.navigateTo({
        //     url:'../shoppingcart/shoppingcart'
        // })
        wx.switchTab({
            url: '../shoppingcart/shoppingcart?'
        })
    },
    //获取广告
    getAD: function (e) {
        ajax.postAjax(url.url.AD, {}, function (that, json) {
            that.setData({
                scroll: json.data.adv_list
            })
        }, this)
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    look: function (e) {
        var that = this;
        wx.previewImage({
            urls: ["'" + that.data.order + "'"]
        })
    },

    //搜索页面链接跳转

    //轮播跳转
    hrefProduct: function (e) {
        let type = e.currentTarget.dataset.type;
        let factory = e.currentTarget.dataset.factory;
        let status = e.currentTarget.dataset.status;
        if (status == 0) {
            wx.navigateTo({
                url: '../chanping/chanping?id=' + type
            })
        } else if (status == 1) {
            wx.navigateTo({
                url: '../factorybrand/factorybrand?id=' + factory
            })
        }

    },
    onLoad: function () {
        let that = this;
        //轮播图请求
        // test.test(this)

        this.getAD();
        //   var i=0;
        // var checkUser=setInterval(function () {
        //     console.log(i)
        //     i++;
        //     if(i>20){
        //         let user=wx.getStorageSync('userNmae');
        //         if(!user){
        //             console.log(123);
        //             wx.navigateTo({
        //               url: '../sign/sign'
        //             })
        //         }
        //         clearInterval(checkUser);
        //     }
        // },100);
        //轮播图


        // var that = this;
        // //调用应用实例的方法获取全局数据
        // app.getUserInfo(function(userInfo){
        //   //更新数据
        //   that.setData({
        //     userInfo:userInfo
        //   })
        // })
    },
    href: function (e) {
        let type = e.currentTarget.dataset.type;
        let src = e.currentTarget.dataset.href;
        if (type == 1) {
            this.setData({
                show: true,
                src: src
            })
        }
    },
    goodsDetail: function (e) {
        var id = e.currentTarget.dataset.type;
        let is_id = e.currentTarget.dataset.name;
        let arr = [];
        arr.push(id);
        arr.push(is_id);
        wx.navigateTo({
            url: '../goodsDetail/goodsDetail?id=' + arr
        })
    },
    onShow: function (e) {
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
        let that = this;
        wx.request({
            url: url.url.Slider,
            method: 'POST',
            success: res => {
                let img = [];
                let imgID = [];
                if (res.data.code == 200) {
                    that.setData({
                        img: res.data.data.banner_list
                    })
                }
            }
        });

        wx.request({
            url: url.url.promotion,
            method: 'POST',
            success: function (res) {
                if (res.data.code == 200) {
                    var arr=res.data.data.commodity_goods_list;
                    let arr1=[]
                    arr.map((item,index)=>{
                        arr1.push(parseInt(item.goods_activity_price))
                    });
                    arr1.sort((a,b)=>{
                        return a-b
                    });
                    let arr2=[];
                    arr1.map((item,index)=>{
                        arr.map((Item,index)=>{
                            if(item==Item.goods_activity_price){
                                arr2.push(Item)
                            }
                        })
                    });
                    function unique(arr){
                        var res = [arr[0]];
                        for(var i=1;i<arr.length;i++){
                            var repeat = false;
                            for(var j=0;j<res.length;j++){
                                if(arr[i] == res[j]){
                                    repeat = true;
                                    break;
                                }
                            }
                            if(!repeat){
                                res.push(arr[i]);
                            }
                        }
                        return res;
                    }
                    let arr3=unique(arr2)
                    that.setData({
                        promotion:arr3
                    })
                }
            }
        });
        wx.request({
            url: url.url.TBD,
            success: res => {
                if (res.data.code == 200) {
                    let json = res.data.data.commodity_goods_list;
                    // for(var i=0;i<json.length;i++){
                    //     let data1=parseFloat(json[i].percentage_funding,2)
                    //     json[i].percentage_funding=data1;
                    //     console.log(json[i].percentage_funding);
                    // }
                    that.setData({
                        // TBD:res.data.data.commodity_goods_list
                        TBD: json
                    })
                }
            }
        })
        test.test(this)
    },
    //更多活动商品
    pMore: function (e) {
        wx.navigateTo({
            url: '../Further/Further'
        })
    },
    //更多众筹商品
    tMore: function (e) {
        wx.navigateTo({
            url: '../TBD/TBD'
        })
    },
    //页面滚动
    onPageScroll: function (e) {
        // let that=this;
        // let arr=[100,110,120,130,140,150,160,170,180,190,200];
        // let arr2=[20,18,16,14,12,10,8,6,4,0];
        // (function (arr,arr2) {
        //     for(var i=0;i<arr.length;i++){
        //         if(e.scrollTop>=arr[i]){
        //             that.setData({
        //                 marginTop:arr2[i]
        //             })
        //             console.log(arr2[i])
        //         }
        //     }
        // }(arr,arr2));

        if (e.scrollTop > 200) {
            this.setData({
                marginTop: 0
            })
        } else {
            this.setData({
                marginTop: 20
            })
        }
    },
    onShareAppMessage: function () {
        //     return {
        //         title: '微信小程序联盟',
        //         desc: '最具人气的小程序开发联盟!',
        //         path: '/page/index'
        //     }
    }
})
