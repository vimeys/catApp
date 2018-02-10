//app.js
import url from './utils/url';
var test =require("./utils/testLogin");
App({
  url:'https://mela.scmxkj.com/index.php/cat/',
    onLaunch: function () {
        var url=this.url;
        // wx.authorize({
        //     scope: 'scope.writePhotosAlbum',
        //     success() {
        //         console.log(1);
        //         // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        //         // wx.startRecord()
        //     }
        // })
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
                    that.globalData.userInfo = res.userInfo;
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },

    globalData: {
        userInfo: null
    }
})
