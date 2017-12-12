// pages/sign/sign.js
import url from '../../utils/url.js';
import  ajax from '../../utils/ajax'
Page({


    data: {
        phoneNum:"",
        word:'获取验证码',
        ok:true,//是否再次点击
        blue:false,
        code:''
    },

    onLoad: function (options) {

    },
    //获取input的值
   phoneNum:function (e) {
        console.log(e);
       let num=e.detail.value;
       var that=this;
       if(/^((1[3,5,8,7,4][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(num)){
           that.setData({
               phoneNum:num
           })
       }

   },
    //获取验证码
    getCode:function (e) {
        var that=this;
        if(this.data.phoneNum.length==11){
            let time=60;
            this.setData({
                word:'60S',
                blue:true
            })
            let ok=e.currentTarget.dataset.type;
            if(ok){
                ajax.getAjax(url.url.msg,{mobile:this.data.phoneNum},function (that,json) {
                    var timer=setInterval(function () {
                        time--;
                        var word=time+'S';
                        that.setData({
                            word:word,
                        //     blue:true
                        })
                        if(time==0){
                            clearInterval(timer)
                            that.setData({
                                word:'点击重新获取',
                                ok:true,
                                blue:false
                            })
                        }
                    },1000)
                },this)
            }
        }else {
            wx.showModal({
              title: '提示',
              content: '请输入正确手机号',
                showCancel:false,
              success: res=>{
                if (res.confirm) {

                }
              }
            })
        }


    },
    //输入验证码
    code:function (e) {
        let num=e.detail.value;
        var that=this;
        that.setData({
            code:num
        })
    },
    //提交注册
    confirm:function (e) {
        let obj={};
        let that=this;
        obj.mobile=this.data.phoneNum;
        obj.code=this.data.code;
        // ajax.getAjax(url.url.sign,obj,function (that,json) {
        //     wx.removeStorageSync('level');
        //     wx.redirectTo({
        //       url: '../login/login?mobile='+that.data.phoneNum
        //     });
        // },this)
        wx.request({
            url:url.url.sign,
            method:'GET',
            data:obj,
            success:res=>{
                console.log(res);
                if(res.data.code==200){
                    wx.removeStorageSync('level');
                        wx.redirectTo({
                          url: '../login/login?mobile='+that.data.phoneNum
                        });
                }else {
                    wx.showModal({
                      title: '提示',
                      content:'验证码错误，请重新输入',
                        showModal:false,
                    })
                }
            }
        })
    }
});