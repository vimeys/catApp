// pages/login_4/login_4.js
import ajax from "../../utils/ajax";
import url from "../../utils/url";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:true,
      chooseID:'',
      level1:'',
      level2:'',
      showModal:false,
      leveltext:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCardLevel();
      this.more();
  },
    //获取会员等级及赋值
    getCardLevel:function (e) {
        // var  that=this;
        let api=url.url.cardList;
        ajax.postAjax(api,{},function (that,json) {
            let data=json.data;
            that.setData({
                level1:data[0].id,
                level2:data[1].id,
                red:data[0].id,
                chooseID:data[0].id
            })
        },this)
    },
    //更多权益
    more:function (e) {
      let user=wx.getStorageSync('user_id');
        ajax.postAjax(url.url.more_rights,{user_id:user},function (that,json) {
            let arr=[];
            let list = json.data.list;
            for(var  key in list){
                list[key]['level_service']=parseInt(list[key]['level_service']);
                list[key]['level_money']=parseInt(list[key]['level_money']);
                arr.push(list[key]);
            }
            console.log(list);
            // arr.forEach(function (item,index) {
            //     item.level_service=parseInt(item.level_service)
            //     item.level_money=parseInt(item.level_money)
            // });
            that.setData({
                leveltext:arr
            })
        },this)
    },

    //选择会员等级
    level:function (e) {
        let Type=e.currentTarget.dataset.type;
        let show=this.data.show;
        this.setData({
            show:!show,
            chooseID:Type
        });
        console.log(this.data.chooseID);
    },


    //提交信息
    confirm:function (e) {
      let type=e.currentTarget.dataset.type;
      if(type==this.data.level1){
          this.setData({
              chooseID:type
          })
      }else if(type==this.data.level2){
            this.setData({
                chooseID:type
            })
        }
        console.log(this.data.chooseID);
        let here=this;
        var api=url.url.login;
        let obj={};
        let data=this.data;
        obj.open_id=wx.getStorageSync('open_id');
        obj.nick_name=wx.getStorageSync('name');
        obj.mobile=wx.getStorageSync('mobile');
        obj.province=wx.getStorageSync('sheng');
        obj.city=wx.getStorageSync('shi');
        obj.areas=wx.getStorageSync('qu');
        obj.township=wx.getStorageSync('zhen');
        obj.address=wx.getStorageSync('addr');
        obj.store_mobile=wx.getStorageSync('phone');
        obj.store_user_name=wx.getStorageSync('people');
        obj.store_license=wx.getStorageSync('srcUp');
        obj.store_storefront=wx.getStorageSync('srcShop');
        obj.level_vip_id=data.chooseID;
        obj.card_z=wx.getStorageSync('srcID1Up');
        obj.card_f=wx.getStorageSync('srcID2Up');
        obj.store_annual_sales=wx.getStorageSync('money');
        obj.brand_id=wx.getStorageSync('brandId');
        obj.other_brand=wx.getStorageSync('inputBrand');
            ajax.postAjax(api,obj,function (that,json) {
                wx.setStorageSync('user_id', json.data.user_id);
                wx.setStorageSync('user',json,data);
                let order=json.data.order;
                let user_id=json.data.user_id;
                let pay=json.data.pay;
                wx.requestPayment({
                    timeStamp: pay.timeStamp,
                    nonceStr: pay.nonceStr,
                    package: pay.package,
                    signType: pay.signType,
                    paySign: pay.paySign,
                    success: function (res) {
                        ajax.postAjax(url.url.pay_user, { level_order_sn:order, user_id: user_id }, function (that, json) {
                            // that.setData({
                            //     showModel:true
                            // })
                            wx.showModal({
                                title: '支付成功',
                                content: '支付成功',
                                success: function () {
                                    wx.removeStorage({
                                      key: 'srcUp',
                                    });
                                    wx.removeStorage({
                                        key: 'srcShop',
                                    });
                                    wx.removeStorage({
                                        key: 'srcID1Up',
                                    });
                                    wx.removeStorage({
                                        key: 'srcID2Up',
                                    });
                                    wx.switchTab({
                                        url: '../index/index',
                                    })

                                }
                            })
                        }, here)
                    },
                    fail: function (res) {
                        wx.showModal({
                            title: "警告",
                            content: '支付失败',
                        })
                    }
                })
            },this)
        }
});