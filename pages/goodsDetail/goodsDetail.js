// pages/goodsDetail/goodsDetail.js
import url from '../../utils/url';
import ajax from '../../utils/ajax'
Page({


    /**
     * 页面的初始数据
     */
    data: {
        open_id:'',
        user_id:'',//用户id
        goodsDetail:[],//商品id
        img: [],//轮播图片
        size:{},//规格
        index:0,
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        width: 450,
        brand:'',//商品名称
        factory:'',//工厂
        goodsName:'',//商品名称
        goodsImage:[],//商品图片
        goodsSales:'',//商品销量
        goodsPrice:'',//商品售价
        goodsDelPrice:'',//商品原价
        goodsStorage:999,//商品库存
        goodsStorageTrue:'',//真实数量
        crowd_raise_number:'',//以众筹人数
        crowd_start_time:'',//众筹开始时间
        crowd_end_time:'',//众筹结束时间
        Raise_the_total_price:'',//众筹金额
        percentage_funding:'',//众筹百分比
        goods_crowd_raise_price:'',//众筹价格
        day:'',// 众筹剩余天数
        goodszcPeople:'',
        promotion: true,
        TBD: false,
        normal: false,
        storage:0,//收藏
        storageImage:'../image/storage.png',//收藏图标
        storageWord:'收藏',
        hideShopPopup:true,//显示弹窗
        hideShopTBD:true,//众筹显示弹窗
        sizeID:'',//规格ID
        brandID:'',//品牌ID
        goods_id:'',//商品ID
        factory_id:'',//工厂ID
        SIZEID:'',

        buyNumber:1,//默认购买数量
        buyNumberMin:1,//最小购买数量
        buyNumberMax:999,//最大购买数量
        height:[1000,1000,1000],
        over:false,//结束不能点击按钮
        text1:true,
        text2:false,
        cover:''//规格图片
    },


    onLoad: function (options) {
        let that=this;
        let str = options.id;
        let arr = str.split(',');
        // console.log(options.options);
         let open=wx.getStorageSync('open_id');
         let user=wx.getStorageSync('user_id');
        that.setData({
            goodsDetail:arr,
            open_id:open,
            user_id:user,
            goods_id:arr[0]
        })

        if (arr[1] == 0) {
            that.setData({
                promotion:false,
                TBD:false,
                normal:true,
            })
        }else  if(arr[1]==1){
            that.setData({
                promotion:true,
                TBD:false,
                normal:false,
            })
        }else if(arr[1]==2){
            that.setData({
                promotion:false,
                TBD:true,
                normal:false,
            })
        }
        this.getDetail();
        // this.loadImage();
    },
    //获取图片高度
    loadImage:function () {
      let  that=this;
      let image=this.data.goodsImage;
        let arr=[];
        for(var i=0;i<image.length;i++){
            getImage(that,i)
        }
         function getImage(that,i){
             wx.getImageInfo({
                 src:that.data.goodsImage[i],
                 success:function (res) {
                     // var height=[];
                     arr.unshift(res.height);
                     that.setData({
                         height:arr
                     })
                 }
             });
         }

    },
    //页面加载请求
    getDetail:function (e) {
        let that=this;
        wx.request({
            url:url.url.getDetail,
            method:'POST',
            data:{
                goods_id:that.data.goodsDetail[0],
                is_type:that.data.goodsDetail[1],
            },
            success:res=>{
                let json=res.data.data.commodity_goods_list;
                if(res.data.code==200){
                    if(json.is_type==1){//活动写入
                        that.setData({
                            img:json.goods_img,
                            goodsName:json.goods_name,
                            goodsImage:json.goods_info,
                            goodsSales:json.goods_sales,
                            goodsPrice:json.goods_activity_price,
                            goodsDelPrice:json.goods_shopping_price,
                            brandID:json.brand_id,
                            factory_id:json.factory_id,
                            brand:json.brand,
                            factory:json.factory,
                            cover:json.cover
                        });
                        that.loadImage();
                    }else if(json.is_type==2){//众筹数据写入
                        let num=json.crowd_raise_number_total-json.crowd_raise_number;
                        let number=new Number();
                        let time=Date.parse(new Date())/1000;
                        if(json.crowd_end_time-time>0){
                            number=Math.floor((json.crowd_end_time-time)/86400);
                            let int=Math.floor(json.Raise_the_total_price);
                            that.setData({
                                img:json.goods_img,
                                goodsName:json.goods_name,
                                goodsImage:json.goods_info,
                                crowd_raise_number:json.crowd_raise_number,
                                crowd_start_time:json.crowd_start_time,
                                crowd_end_time:json.crowd_end_time,
                                Raise_the_total_price:int,
                                percentage_funding:json.percentage_funding,
                                goods_crowd_raise_price:json.goods_crowd_raise_price,
                                goodsStorage:num,
                                goodsStorageTrue:num,
                                brandID:json.brand_id,
                                factory_id:json.factory_id,
                                sizeID:json.spec_id,
                                brand:json.brand,
                                factory:json.factory,
                                day:number,
                                cover:json.cover
                            })
                        }else {
                            let int=Math.floor(json.Raise_the_total_price);
                            that.setData({
                                img:json.goods_img,
                                goodsName:json.goods_name,
                                goodsImage:json.goods_info,
                                crowd_raise_number:json.crowd_raise_number,
                                crowd_start_time:json.crowd_start_time,
                                crowd_end_time:json.crowd_end_time,
                                Raise_the_total_price:int,
                                percentage_funding:json.percentage_funding,
                                goods_crowd_raise_price:json.goods_crowd_raise_price,
                                goodsStorage:num,
                                goodsStorageTrue:num,
                                brandID:json.brand_id,
                                factory_id:json.factory_id,
                                sizeID:json.spec_id,
                                brand:json.brand,
                                factory:json.factory,
                                day:number,
                                cover:json.cover
                            })
                            that.setData({
                                // percentage_funding:100,
                                over:true,
                                text1:false,
                                text2:true
                            })
                        }
                        that.loadImage();
                    }else if(json.is_type==0){//正常商品写入
                        that.setData({
                            img:json.goods_img,
                            goodsName:json.goods_name,
                            goodsImage:json.goods_info,
                            goodsSales:json.goods_sales,
                            // goodsPrice:json.goods_shopping_price,
                            goodsDelPrice:json.goods_shopping_price,
                            brandID:json.brand_id,
                            factory_id:json.factory_id,
                            brand:json.brand,
                            factory:json.factory,
                            cover:json.cover
                        });
                        that.loadImage();
                    }

                }
            }
        });
        let storageObj={};
        storageObj.user_id=that.data.user_id;
        storageObj.goods_id=that.data.goodsDetail[0];
        wx.request({
            url:url.url.testStorege,
            data:storageObj,
            method:'POST',
            success:function (res) {
                if(res.data.code==200){
                    that.setData({
                        storage:0,
                        storageWord:'已收藏',
                        storageImage:'../image/chooseStorage.png',
                    })
                }else if(res.data.code==201){
                    that.setData({
                        storage:1,
                        storageWord:'收藏',
                        storageImage:'../image/storage.png',
                    })
                }
            }
        })
    },
    //跳转购物才
    goCart:function (e) {
        wx.switchTab({
            url:'../shoppingcart/shoppingcart'
        })
    },
    //收藏接口
    storageRequest:function (e) {
        ajax.postAjax(url.url.storage,)
    },
    //关闭按钮
    close:function (e) {
        this.setData({
            hideShopPopup:true,
            buyNumber:1
        })
    },
    closeTBD:function (e) {
      this.setData({
          hideShopTBD:true,
          buyNumber:1
      })
    },
    //收藏
    storage:function (e) {
        let Type=e.currentTarget.dataset.type;
        if(Type==1){
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
            });
            this.setData({
                storage:0,
                storageImage:'../image/chooseStorage.png',
                storageWord:'已收藏'
            })
            wx.request({
                url:url.url.storage,
                method:'POST',
                data:{
                    user_id:this.data.user_id,
                    goods_id:parseInt(this.data.goodsDetail[0]),
                    is_collection:this.data.storage
                },
                success:res=>{
                }
            })
        }else{
            this.setData({
                storage:1,
                storageImage:'../image/storage.png',
                storageWord:'收藏'
            });
            wx.request({
                url:url.url.storage,
                method:'POST',
                data:{
                    user_id:this.data.user_id,
                    goods_id:parseInt(this.data.goodsDetail[0]),
                    is_collection:this.data.storage
                },
                success:res=>{
                }
            })
        }
    },
    //获取规格
    getSize:function (e) {
        let that=this;
        this.setData({
            hideShopPopup:false
        })
        ajax.getAjax(url.url.getSize,{pid:parseInt(this.data.goodsDetail[0])},function (that,json) {
            let SIZEID=[];
            for(var key in json.data){
                json.data[key].active=false;
                SIZEID.push(json.data[key])
            }

            SIZEID[0].active=true;
                that.setData({
                    SIZEID:SIZEID,
                    goodsStorage:SIZEID[0].stock,
                    goodsStorageTrue:SIZEID[0].stock,
                    sizeID:SIZEID[0].id
                })
        },this);
    },
    // 众筹获取规格
    getSizeTBD:function () {
            let that=this;
            this.setData({
                hideShopTBD:false
            })
            ajax.getAjax(url.url.getSize,{pid:parseInt(this.data.goodsDetail[0])},function (that,json) {
                wx.setStorageSync('size',json.data);
                that.setData({
                    SIZEID:json.data
                })
            },this);
        },
    //选择规格
    chooseSize:function (e) {
        let id=e.currentTarget.dataset.id;
        let num=e.currentTarget.dataset.num;
        let size=this.data.SIZEID;
        function chose(item,index) {
            item.active=false
        }
        size.forEach(chose);
        size[num].active=true;

        this.setData({
            goodsStorage:size[num].stock,
            goodsStorageTrue:size[num].stock,
            SIZEID:size,
            index:num,
            sizeID:id,
            buyNumber:1
        });
        // this.requestSize()
    },

    //规格请求
    requestSize:function (e) {
        let that=this;
        let obj={};
        obj.pid=parseInt(this.data.goodsDetail[0]);
        obj.color=this.data.color[this.data.choosecolor];
        obj.voltage=this.data.voltage[this.data.choosevoltage];
        obj.power=this.data.power[this.data.choosepower];
        ajax.getAjax(url.url.getSize,obj,function (that,json) {

            that.setData({
                color:json.data.color,
                voltage:json.data.voltage,
                power:json.data.power,
            })
        },this);
        ajax.postAjax(url.url.getPrice,obj,function (that,json) {
                that.setData({
                    goodsPrice:json.data.price,
                    goodsStorage:json.data.stock,
                    buyNumberMax:json.data.stock,
                    sizeID:json.data.id,
                })
        },this)
    },


    //购买数量
    inputBuy:function (e) {
        let value=e.detail.value;
        let storage=this.data.goodsStorage;
        let storageTrue=this.data.goodsStorageTrue;
        if(value!=0&&value<storageTrue){
            storage=storageTrue-value;
            this.setData({
                buyNumber:value,
                goodsStorage:storage
            })
        }else{
            this.setData({
                buyNumber:1

            })
        }
    },
    //按钮数量加1
    numJianTap:function (e) {
        let  value=this.data.buyNumber;
        let storage=this.data.goodsStorage;
        let storageTrue=this.data.goodsStorageTrue;
        if(value>1){
            value--;
            storage=storageTrue-value;
            this.setData({
                buyNumber:value,
                goodsStorage:storage
            })
        }
    },
    //按钮数量减1
    numJiaTap:function (e) {
        let  value=this.data.buyNumber;
        let storage=this.data.goodsStorage;
        let storageTrue=this.data.goodsStorageTrue;
        if(value<storageTrue){
            value++;
            storage=storageTrue-value;
            this.setData({
                buyNumber:value,
                goodsStorage:storage
            })
        }
    },
    //加入购物车
    joinCart:function (e) {

        var obj={};
        let data=this.data;
        obj.user_id=data.user_id;
        obj.goods_id=data.goods_id;
        obj.buy_number=data.buyNumber;
        obj.brand_id=data.brandID;
        obj.factory_id=data.factory_id;
        obj.spec_id=data.sizeID;
        if(obj.spec_id){
            this.addCart(obj,url.url.joinCart)
        }else {
            wx.showModal({
              title: '提示',
              content: '请选择规格',
                showCancel:false,
              success: res=>{
                if (res.confirm) {

                }
              }
            })
        }
    },
    //立即购买
    buyNow:function () {

        let obj={};
        let data=this.data;
        obj.user_id=data.user_id;
        obj.goods_id=data.goods_id;
        obj.num=data.buyNumber;
        obj.spec_id=data.sizeID;
        // this.addCart(obj,url.url.buyNow);
        wx.request({
            url:url.url.buyNow,
            method:'POST',
            data:obj,
            success:res=>{
                if(res.data.code==200){
                    wx.setStorageSync('TBDorder', res.data.data);
                    wx.setStorageSync('goods_id',data.goods_id);
                    wx.setStorageSync('spic_id',data.sizeID);
                    wx.redirectTo({
                        url: '../CheckedoutTBD/CheckedoutTBD'
                    })
                }else if(res.data.code==201){
                    wx.showModal({
                      title: '警告',
                      content:'会员权益已过期，请续费',
                        showCancel:false,
                      success: res=>{
                        if (res.confirm) {
                            wx.redirectTo({
                              url: '../vip/vip'
                            })
                        }
                      }
                    })
                }
            }
        })
    },

    //加入购物车
    addCart:function (obj,url) {
        let that=this
        wx.request({
            url:url,
            method:'POST',
            data:obj,
            success:res=>{
                let code=res.data.code;
                 if(res.data.code==200){
                     that.setData({
                         sizeID:'',
                         hideShopPopup:true,
                         buyNumber:1
                     });
                     wx.showToast({
                       title: '加入购物车成功',
                        icon:'success',
                         duration:2000
                     })
                 }else if(code==202){
                     wx.showModal({
                         title:'提示',
                         content:'请选择规格',
                         showCancel:false
                     })
                 }else if(code==203){
                     that.setData({
                         sizeID:'',
                         hideShopPopup:true
                     });
                     wx.showModal({
                         title:'提示',
                         content:'库存不足,请购买其他品牌',
                         showCancel:false
                     })
                 }else if(code==204){
                     that.setData({
                         sizeID:'',
                         hideShopPopup:true
                     });
                     wx.showModal({
                         title:'提示',
                         content:'加入购物车失败,请重试',
                         showCancel:false
                     })
                 }else if(code==205){
                     that.setData({
                         sizeID:'',
                         hideShopPopup:true
                     });
                     wx.showModal({
                         title:'提示',
                         content:'该品牌在您所在区域已被代理',
                         showCancel:false
                     })
                 }
            }
        })
    }
})