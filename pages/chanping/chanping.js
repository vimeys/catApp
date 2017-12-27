// pages/chanping/chanping.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Data:'',//数据
        id:'',//品牌id
        check:3,//选中产品选中
        page:1,
        listShow:false,
        factoryData:[],
        brandName:'',
        factoryId:'',//工厂id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this;
        let id=options.id;
        that.setData({
            id:id
        })
        this.getList();

    },
    //选择分类
    change: function (e) {
        var that = this;
        let Type = e.currentTarget.dataset.type;
        that.setData({
            check:Type
        })
        this.getList();
    },
    // change1:function (e) {
    //     var that = this;
    //     let Type = e.currentTarget.dataset.type;
    //     that.setData({
    //         check:Type
    //     })
    //     this.getListP();
    // },
    // //获取活动商品
    // getListP:function (e) {
    //     var that=this;
    //     wx.request({
    //         url:url.url.promotion,
    //         method:'POST',
    //         data:{
    //             brand_id:that.data.id,
    //             is_type:that.data.check,
    //             // page:that.data.page,
    //             // pageSize:10
    //         },
    //         success:res=>{
    //             // console.log(res);
    //             that.setData({
    //                 Data:res.data.data.commodity_goods_list
    //             })
    //
    //         }
    //     })
    // },
    //获取列表

    getList:function (e) {
        let that=this;
        // ajax.postAjax(url.url.promotion,)
        let brandName=wx.getStorageSync('brandName');
        this.setData({
            brandName:brandName
        })
        wx.request({
            url:url.url.brandList,
            method:'POST',
            data:{
                brand_id:that.data.id,
                is_type:that.data.check,
                page:that.data.page,
                // pageSize:10
            },
            success:res=>{

                that.setData({
                    Data:res.data.data
                })
                let factoryId=res.data.data[0].factory_id;
                that.setData({
                    factoryId: factoryId
                })
            }
        })
    },
    //弹窗的显示
    more:function (e) {
        let show=this.data.listShow;
        ajax.postAjax(url.url.factoryBrand,{brand_id:this.data.id},function (that,json) {
            that.setData({
                factoryData:json.data
            })
        },this);
        this.setData({
            listShow:!show
        })
    },
    //选择其他品牌
    choose:function (e) {
        var id=e.currentTarget.dataset.type;
        let name=e.currentTarget.dataset.name;
        wx.setStorageSync('brandName',name);
        this.setData({
            id:id
        })
        this.getList();
        this.setData({
            listShow:false
        })

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
    hide:function (e) {
        this.setData({
            listShow:false
        })
    },
})