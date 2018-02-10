// pages/account/account.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: '',
        show: false,
        order_id: '',
        height:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let show = options.go;
        let order_id = options.order_id
        if (show == 1) {
            this.setData({
                show: true,
                order_id: order_id
            })
        }
        ajax.postAjax(url.url.banks_list, {}, function (that, json) {
            that.setData({
                list: json.data,
            })
            that.loadImage();
        }, this);
    },
    loadImage:function () {
        let  that=this;
        let image=this.data.list[0].bank_ico;
        let windowsWidth="";
        wx.getSystemInfo({
            success:function (res) {
                windowsWidth=res.windowWidth*2
            }
        });
        // let arr=[];
        // for(var i=0;i<image.length;i++){
        //     // debugger
        //     getImage(that,i)
        // }
        // function getImage(that,i){
            wx.getImageInfo({
                src:that.data.list[0].bank_ico,
                success:function (res) {
                    let imageWidth=res.width;
                    let point=imageWidth/windowsWidth;
                    let imageHeight=res.height/point;
                    // var height=[];
                    // let obj={};
                    // obj.image=that.data.goodsImage[i];
                    // height=imageHeight;
                    console.log(imageHeight);
                    that.setData({
                        height:imageHeight
                    })
                }
            });
        // }

    },
    click: function () {
        wx.redirectTo({
            url: '../Revised/Revised??order_id=' + this.data.order_id + '&status=1'
        })
    },
    big:function () {
        wx.previewImage({
            current: this.data.list[0].bank_ico, // 当前显示图片的http链接
            urls: [this.data.list[0].bank_ico] // 需要预览的图片http链接列表
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})