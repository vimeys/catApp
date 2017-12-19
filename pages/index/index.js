//index.js
//获取应用实例
var app = getApp();
// var url=require('../../utils/url');
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
        src: ''//
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
                    that.setData({
                        promotion: res.data.data.commodity_goods_list
                    })
                }
            }
        })
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
