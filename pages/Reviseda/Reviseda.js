// pages/Reviseda/Reviseda.js
import url from '../../utils/url.js';
import ajax from '../../utils/ajax.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:'',
    show:false,
    order_id:'',
    status:'',
      lastTime:'',
      h:'',
      m:'',
      s:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id;
    var status = options.status;
    var user = wx.getStorageSync('user');
    ajax.postAjax(url.url.order_info,{order_id:order_id,user_id:user.user_id,status:status},function(that,json){
        let time=json.data.create_time;
        // let reg=new RegExp('.')
        time=time.replace(/\./g,'-');
        console.log(time);
        let timer=new Date(time).getTime();
        console.log(timer.toString());
        if (timer.toString()=='NaN'){
            console.log(1)
            time = time.replace(/\-/g, '/');
            timer = new Date(time).getTime();
        }
        let newtime=new Date().getTime();
        let lastTime=((172800000-(newtime-timer))/1000);
      that.setData({
          lastTime:lastTime,
        order:json.data,
        order_id:order_id,
        status:status
      });
        that.intv()
    },this);

  },
    intv:function () {
      let lastTime=this.data.lastTime;
      let that=this;
      setInterval(function () {
        lastTime=Math.floor(lastTime)-1;
          let hours=Math.floor(lastTime/3600);

          let min=Math.floor((lastTime-hours*3600)/60);
          let s=Math.floor(lastTime-hours*3600-min*60);
          that.setData({
              h:hours,
              m:min,
              s:s
          })
      },1000)

    },
  /**
   * 物流图片关闭
   */
  wl_close:function(){
    this.setData({
      show:false,
    });
  },
  /**
   * 物流图片打开
   */
  wl_open:function(){
    this.setData({
      show: true,
    });
  },
  upload:function(){
    var user = wx.getStorageSync('user');
    var order_id = this.data.order_id;
    wx.chooseImage({
      count:1,
      sizeType:'compressed',
      success: function(res) {
         wx.uploadFile({
           url: url.url.uploadfile,
           filePath: res.tempFilePaths[0],
           name: 'image',
           success:function(json){
             var img_path = JSON.parse(json.data);
             ajax.postAjax(url.url.payment, { open_id: user.open_id, order_id: order_id, pay_way: 3, transfer:img_path.data},function(that,json){
               if(json.code == 200){
                 wx.showModal({
                   title: '上传成功',
                   content: '您已上传转款凭证，请等待平台审核....',
                   showCancel:false,
                   success:function(){
                      wx.navigateBack({
                        delta:1
                      })
                   }
                 })
               }
             },this);
           }
         })
      },
    })
  },
    //支付
    payment: function (e) {
        var order_id = e.currentTarget.dataset.order_id;
        var user = wx.getStorageSync('user');
        ajax.postAjax(url.url.payment, { order_id: order_id, open_id: user.openid, pay_way: 1 }, function (that, json) {
            var pay = json.data;
            wx.requestPayment({
                timeStamp: pay.timeStamp,
                nonceStr: pay.nonceStr,
                package: pay.package,
                signType: pay.signType,
                paySign: pay.paySign,
                success: function (res) {
                    ajax.postAjax(url.url.pay_success, { id: order_id, user_id: user.user_id }, function (that, json) {
                        wx.showModal({
                            title: '支付成功',
                            content: '支付成功',
                            success: function () {
                                wx.navigateBack({
                                    url: '../my/my',
                                })
                            }
                        })
                    }, this)
                },
                fail: function (res) {

                }
            })
        }, this)
    },

    /**
     * 确认收货
     */
    confirm: function (e) {
        var order_id = e.currentTarget.dataset.order_id;
        var user = wx.getStorageSync('user');
        ajax.postAjax(url.url.take_over, { user_id: user.user_id, order_id: order_id }, function (that, json) {
            if (json.code == 200) {
                wx.showModal({
                    title: '收货成功',
                    content: '确认收货成功，如有疑问请联系客服',
                    success: function () {
                        that.onLoad();
                    }
                })
            }
        }, this);
    },

    /**
     * 我的转账凭证
     */
    preve: function (e) {
      var url = e.currentTarget.dataset.tran;
      wx.previewImage({
        current: '我的转款凭证',
        urls: [url],
      })
    },

})