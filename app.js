//app.js
import url from './utils/url';
var test =require("./utils/testLogin");
App({
    url:'http://192.168.0.110/cat/index.php/cat/',
    onLaunch: function () {
        var url=this.url;
        //调用API从本地缓存中获取数据
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
                                url:'http://test.scmxkj.com/index.php/cat/part/get_openid',
                                method: "POST",
                                data: {
                                    code: res.code,
                                    // img: userInfoAvatar,
                                    // uname: nickname
                                },
                                success: function (res) {
                                    console.log(res);
                                    wx.setStorageSync('user',res.data.data);
                                    if(res.data.code==200){

                                        wx.setStorageSync('open_id',res.data.data.openid);
                                        wx.setStorageSync('user_id',res.data.data.user_id);
                                    }
                                    if(res.data.code==202){
                                        wx.setStorageSync('open_id',res.data.data.openid);
                                        wx.setStorageSync('level', 'none');
                                        test.test(this);
                                    }
                                    if(res.data.code==204){
                                        wx.setStorageSync('open_id',res.data.data.openid);
                                        wx.setStorageSync('user_id',res.data.data.user_id);
                                        // wx.reLaunch({
                                        //   url: '../vip/vip'
                                        // })
                                    }
                                },
                                fail: function () {

                                    wx.setStorageSync('user', userInfoAvatar);
                                },
                                complete: function () {

                                }
                            })
                        } else {
                            console.log('获取用户登录态失败！' + res.errMsg)
                        }
                    }
                })
            },
            fail: function (res) {
                // fail
                console.log(res);
                console.log("获取失败！")
            },
            complete: function () {
                // complete
            }
        })
    },

    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    globalData: {
        userInfo: null
    }
})
