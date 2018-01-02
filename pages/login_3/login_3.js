// pages/login_3/login_3.js
import url from "../../utils/url";
import ajax from "../../utils/ajax";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      src:'',//营业执照
      srcBool:false,
      srcUp:'',//上传营业执照

      srcID1:'',//身份证正面
      srcID1Bool:false,
      srcID1Up:'',//

      srcID2:'',//身份证反面
      srcID2Bool:false,
      srcID2Up:'',
      srcShop:'',//店铺外景
      srcShopBool:false,
      srcShopUp:'',
      next:true//显示按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let storage=wx.getStorageSync('next');
    if(storage){
        this.setData({
            next:false
        })
    }
  },


    //营业执照上传
    choosePhotoBrand:function (e) {
        var that=this;
        wx.chooseImage({
            count: 1,
            sizeType:  'compressed',
            sourceType: ['album', 'camera'],
            success: function (res) {
                var src = res.tempFilePaths;
                console.log(src)
                that.setData({
                    srcBool:true,
                    src:src,
                })
                console.log(that.data.srcUp);
                wx.uploadFile({
                    url: url.url.uploadfile,
                    filePath:src[0],
                    name: 'image',
                    success:res=>{
                        let src=JSON.parse(res.data);
                        wx.setStorageSync('srcUp',src.data);

                        that.setData({
                            srcUp:src.data,

                        })
                    }
                })
            }
        })
    },
    choosePhotoID1:function (e) {
        let that=this;
        wx.chooseImage({
            count:1,
            sizeType:'compressed',
            success: res => {
                let src=res.tempFilePaths;
                that.setData({
                    srcID1:src,
                    srcID1Bool:true
                });
                wx.uploadFile({
                    url: url.url.uploadfile,
                    filePath:src[0],
                    name: 'image',
                    success:res=>{
                        let src=JSON.parse(res.data);
                        wx.setStorageSync('srcID1Up',src.data);
                        that.setData({
                            srcID1Up:src.data,
                        })
                    }

                })
            }
        });
    },
    choosePhotoID2:function (e) {
        let that=this;
        wx.chooseImage({
            count:1,
            sizeType:'compressed',
            success: res => {
                let src=res.tempFilePaths;
                that.setData({
                    srcID2:src,
                    srcID2Bool:true
                });
                wx.uploadFile({
                    url: url.url.uploadfile,
                    filePath:src[0],
                    name: 'image',
                    success:res=>{
                        let src=JSON.parse(res.data);
                        wx.setStorageSync('srcID2Up',src.data);
                        that.setData({
                            srcID2Up:src.data
                        })
                    }

                })
            }
        });
    },
    choosePhotoShop:function (e) {
        let that=this;
        wx.chooseImage({
            count:1,
            sizeType:'compressed',
            success: res => {
                let src=res.tempFilePaths;
                let clickUp=that.data.clickUp;
                that.setData({
                    srcShop:src,
                    srcShopBool:true
                });
                wx.uploadFile({
                    url: url.url.uploadfile,
                    filePath:src[0],
                    name: 'image',
                    success:res=>{
                        let src=JSON.parse(res.data);
                        wx.setStorageSync('srcShop',src.data);
                        that.setData({
                            srcShopUp:src.data
                        })
                    }

                })
            }
        });
    },
    del:function (e) {
        let type=e.currentTarget.dataset.type;
        if(type==1){
            this.setData({
                srcBool:false
            })
        }else if(type==2){
            this.setData({
                srcID1Bool:false
            })
        }else if(type==3){
            this.setData({
                srcID2Bool:false
            })
        }else if(type==4){
            this.setData({
                srcShopBool:false
            })
        }
    },
    href:function () {
      let obj=[];
       let a=wx.getStorageSync('srcUp');
       let b=wx.getStorageSync('srcID1Up');
       let c=wx.getStorageSync('srcID2Up');
       let d=wx.getStorageSync('srcShop');
       if(a){
           obj.push(a)
       }
        if(b){
            obj.push(b)
        }
        if(c){
            obj.push(c)
        }
        if(d){
            obj.push(d)
        }
       // console.log(obj.length);
        if(obj.length<4){
           wx.showModal({})
            wx.showModal({
              title: '提示',
              content: '请完成图片上传',
                showCancel:false,
              success: res=>{

              }
            })
        }else{
            wx.navigateTo({
                url: '../login_4/login_4'
            })
        }

    },
    confirm:function (e) {

        let here=this;
        var api=url.url.rest;
        let obj={};
        let data=this.data;
        obj.id=wx.getStorageSync('user_id');
        obj.nick_name=wx.getStorageSync('name');
        obj.province=wx.getStorageSync('sheng');
        obj.city=wx.getStorageSync('shi');
        obj.areas=wx.getStorageSync('qu');
        obj.township=wx.getStorageSync('zhen');
        obj.address=wx.getStorageSync('addr');
        obj.store_mobile=wx.getStorageSync('phone');
        obj.store_user_name=wx.getStorageSync('people');
        obj.store_license=wx.getStorageSync('srcUp');
        obj.store_storefront=wx.getStorageSync('srcShop');
        obj.card_z=wx.getStorageSync('srcID1Up');
        obj.card_f=wx.getStorageSync('srcID2Up');
        obj.store_annual_sales=wx.getStorageSync('money');
        obj.brand_id=wx.getStorageSync('brandId');
        obj.other_brand=wx.getStorageSync('inputBrand');
        ajax.postAjax(api,obj,function (that,json) {
            wx.removeStorage({
              key: 'next',
            })
           wx.switchTab({
               url:'../my/my'
           })
        },this)
    }
})