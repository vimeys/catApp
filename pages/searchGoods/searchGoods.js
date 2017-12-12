// pages/searchGoods/searchGoods.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        check: 0,//选中
        Data: [1, 2, 3],//
        page: 0,
        goodsName: '',
        showNothing: false,
        margin:false,
        // inputValue:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let page = this.data.page;
        let type = this.data.check;
        this.ajax(page, type);
    },
    //选择请求
    change: function (e) {
        let value = e.currentTarget.dataset.type;
        this.setData({
            check: value
        });
        let page = this.data.page;
        let type = this.data.check;
        this.ajax(page, type)
    },
    //输入存值
    input: function (e) {
        let value = e.detail.value;
        if (value) {
            this.setData({
                goodsName: value,
                page: 0
            })
        }
    },
    //点击请求
    search: function (e) {
        let page = this.data.page;
        let type = 1;
        this.setData({
            page: 0,
            check: 0
        })
        this.ajax(page, type);
    },
    // 数据请求
    ajax: function (page, type) {
        let that = this;
        let obj = {};
        obj.page = page;
        obj.type = type;
        obj.goods_name = this.data.goodsName;

        wx.request({
            url: url.url.goodsSearch,
            method: 'POST',
            data: obj,
            success: res => {
                let json=[];
                    if(res.data.data){
                        // json.push(res.data.data);
                        that.setData({
                            Data: res.data.data,
                            showNothing: false
                        })
                    }

                // else if (res.data.code == 201) {
                //     that.setData({
                //         Data: [],
                //         showNothing: true
                //     })
                // }
            }
        })
    },
    //页面跳转
    href: function (e) {
        let arr = []
        let id = e.currentTarget.dataset.type;
        let type = e.currentTarget.dataset.name;
        arr.push(id)
        arr.push(type)
        wx.navigateTo({
            url: '../goodsDetail/goodsDetail?id=' + arr
        })
    },

    //触底刷新
    onReachBottom: function () {
        let page = this.data.page;
        page++;
        this.setData({
            page: page
        });

        let paged = this.data.page;
        let type = this.data.check;
        this.ajax(paged, type)
    },
    //屏幕滚动
})