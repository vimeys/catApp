// pages/login/login.js
import url from '../../utils/url'
import  ajax from '../../utils/ajax'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        open_id:'',
        name:"",
        mobile:'',
        select: {
            province: [1, 2, 3],
            provinceIndex: 0,
            provinceId: [],
            provinceUse:false,
            city:['全部'],
            cityIndex:0,
            cityId:[],
            cityUse:true,
            area:['全部'],
            areaIndex:0,
            areaId:[],
            areaUse:true,
            stress:['全部'],
            stressIndex:0,
            stressId:[],
            stressUse:true
        },
        Data:[1,2,3,4,[1,3,55,6],6,8,3,3,3,3],
        json:'',
        showModel:false,
        address:'',//具体地址
        people:'',//联系人
        phone:'',//联系电话
        brand:[],//经营品牌
        brandselect:[],
        brandselectId:[],
        brandinput:[],
        sellMoney:'',//年销量
        show:false,//查看经营品牌选项
        showInput:false,//查看输入框
        showLevel:false,//查看权益
        src:'../image/noPhoto.png',//营业执照
        srcUp:'',//上传营业执照
        srcID1:'../image/noPhoto.png',//身份证正面
        srcID1Up:'',//
        srcID2:'../image/noPhoto.png',//身份证反面
        srcID2Up:'',
        srcShop:'../image/noPhoto.png',//店铺外景
        srcShopUp:'',
        level1:'',
        level2:'',
        red:'',//会员等级
        chooseID:'',//选中的会员等级id
        money:'',//年销量
        clickUp:{
            click_1:'点击上传',
            click_2:'点击上传',
            click_3:'点击上传',
            click_4:'点击上传',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let open_id=wx.getStorageSync('open_id');
        let name=wx.getStorageSync('name')
        let mobile=options.mobile;
        this.setData({
            mobile:mobile,
            open_id:open_id,
            name:name
        })
        let that=this;
        this.getProvince();
        this.getCardLevel();
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
                red:data[0].id
            })
        },this)
    },

    //获取省份
    getProvince: function (e) {
        let that=this;
        wx.request({
            url:url.url.getProvince,
            method:"POST",
            success:res=>{
                if(res.data.code==200){
                    let arr=[];
                    let arr1=[];
                    var push=(item,index)=>{
                        arr.push(item.areaName);
                        arr1.push(item.areaId)
                    };
                    res.data.data.province_list.forEach(push);
                    var select=that.data.select;
                    select.province=arr;
                    select.provinceId=arr1
                    that.setData({
                        select:select
                    });
                }
            }
        })
    },
    //选择地址
    optionChange:function (e) {
        let that=this;
        let Type=e.currentTarget.dataset.type;
        let value=e.detail.value;
        if(Type==1){
            var select=that.data.select;
            select.provinceIndex=value;
            that.setData({
                select:select
            });
            wx.request({
                url:url.url.getCity,
                method:"POST",
                data:{
                    parentId:that.data.select.provinceId[value]
                },
                success:res=>{
                    console.log(res);
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        var select=that.data.select;
                        select.city=arr;
                        select.cityId=arr1;
                        select.cityUse=false;
                        that.setData({
                            select:select,
                        });
                    }
                }
            })
        }else if(Type==2){
            var select=that.data.select;
            select.cityIndex=value;
            that.setData({
                select:select
            });
            wx.request({
                url:url.url.getCity,
                method:"POST",
                data:{
                    parentId:that.data.select.cityId[value]
                },
                success:res=>{
                    console.log(res);
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        var select=that.data.select;
                        select.area=arr;
                        select.areaId=arr1;
                        select.areaUse=false;
                        that.setData({
                            select:select,
                        });
                    }
                }
            })
        }else  if(Type==3){
            var select=that.data.select;
            select.areaIndex=value;
            that.setData({
                select:select
            });
            wx.request({
                url:url.url.getCity,
                method:"POST",
                data:{
                    parentId:that.data.select.areaId[value]
                },
                success:res=>{
                    console.log(res);
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        var select=that.data.select;
                        select.stress=arr;
                        select.stressId=arr1;
                        select.stressUse=false;
                        that.setData({
                            select:select,
                        });
                    }
                }
            })
        }else if(Type==4){
            var select=that.data.select;
            select.stressIndex=value;
            that.setData({
                select:select
            });
        }

    },
    address:function (e) {
        let value=e.detail.value;
        this.setData({
            address:value
        })
    },
    output:function (e) {
        var value=e.detail.value;
        var Type=e.currentTarget.dataset.type;
        if(Type==1){
            this.setData({
                people:value
            })
        }else if(Type==2){
            this.setData({
                phone:value
            })
        }
    },
    //输入品牌
    inputBrand:function (e) {
        let value=e.detail.value;
        let arrselect=this.data.brand;
        let arr=this.data.brandinput;
        if(value&&value.length<6){
            arrselect.push(value);
            arr.push(value);
            this.setData({
                brand:arrselect,
                brandinput:arr
            })
        }

    },
    //删除品牌
    del:function (e) {
        let Type=e.currentTarget.dataset.type;
        console.log(Type);
        let arr=this.data.brand;
        arr.splice(Type,1);
        this.setData({
            brand:arr
        })
    },
    //选择经营品牌
     choose:function (e) {
        let show=this.data.show;
         this.setData({
             show:!show
         })
     },
    // 获取品牌
    chooseBrand:function (e) {
         console.log(123);
         this.setData({
            show:false,
             showModel:true
        })
        ajax.postAjax(url.url.getBrand,{page:0,pageSize:999,search:''},function (that,json) {
            that.setData({
                Data:json.data.brand_list
            })
            that.classify(that);
        },this)
     },
    //分类品牌
    classify: function (that) {
        var arr=that.data.Data;
        var ARR=[];
        arr.map((item,index)=>{
            ARR.push(item.initials)
        });
        var list=ARR.filter(function(element,index,arr){
            return arr.indexOf(element)==index;
        });
        let OBJ={};
        list.map((item,index)=>{
            OBJ[item]=[];
            arr.map((Ite,Index)=>{
                if(Ite.initials == item){
                    OBJ[item].push(Ite);
                }
            })
        })
        that.setData({
            json:OBJ
        })
    },
    //选中品牌
    click:function (e) {
        let that=this;
        var id=e.currentTarget.dataset.type;
        var json=this.data.Data;
        let brand=that.data.brand;
        let brandId=that.data.brandselectId;
        for(var i=0;i<json.length;i++){
            // return
            if(json[i].id==id){
                json[i].choose=true;
                brand.push(json[i].name);
                brandId.push(json[i].id);
            }
        }
        this.setData({
            Data:json,
            brand:brand,
            brandselect:brand,
            brandselectId:brandId,
        });
        this.classify(this)
    },
     chooseInput:function (e) {
            this.setData({
                show:false,
                showInput:true
            })
     },
     takephoto:function (e) {
        var that=this
         const ctx = wx.createCameraContext()
         ctx.takePhoto({
             quality: 'high',
             success: (res)=> {
                 console.log(res.tempImagePath);
             that.setData({
                 src: res.tempImagePath
             })
         }
     })
     },
     choosePhotoBrand:function (e) {
        var that=this;
         wx.chooseImage({
             count: 1,
             sizeType: ['original', 'compressed'],
             sourceType: ['album', 'camera'],
             success: function (res) {
                 var src = res.tempFilePaths;
                 let clickUp=that.data.clickUp;
                 clickUp.click_1='重新上传';
                 that.setData({
                     src:src,
                     clickUp:clickUp
                 })
                 wx.uploadFile({
                     url: url.url.uploadfile,
                     filePath:src[0],
                     name: 'image',
                     success:res=>{
                         let src=JSON.parse(res.data);
                         that.setData({
                             srcUp:src.data
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
           success: res => {
                let src=res.tempFilePaths;
               let clickUp=that.data.clickUp;
               clickUp.click_2='重新上传';
               that.setData({
                   srcID1:src,
                   clickUp:clickUp
               });
               wx.uploadFile({
                   url: url.url.uploadfile,
                   filePath:src[0],
                   name: 'image',
                   success:res=>{
                       let src=JSON.parse(res.data);
                       that.setData({
                           srcID1Up:src.data
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
            success: res => {
                let src=res.tempFilePaths;
                let clickUp=that.data.clickUp;
                clickUp.click_3='重新上传';
                that.setData({
                    srcID2:src,
                    clickUp:clickUp
                });
                wx.uploadFile({
                    url: url.url.uploadfile,
                    filePath:src[0],
                    name: 'image',
                    success:res=>{
                        let src=JSON.parse(res.data);
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
            success: res => {
                let src=res.tempFilePaths;
                let clickUp=that.data.clickUp;
                clickUp.click_4='重新上传';
                that.setData({
                    srcShop:src,
                    clickUp:clickUp
                });
                wx.uploadFile({
                    url: url.url.uploadfile,
                    filePath:src[0],
                    name: 'image',
                    success:res=>{
                        let src=JSON.parse(res.data);
                        that.setData({
                            srcShopUp:src.data
                        })
                    }

                })
            }
        });
    },
    //年销量
    inputMoney:function (e) {
        let value=e.detail.value;
        this.setData({
            money:value
        })
    },
    //选择会员等级
    level:function (e) {
         let Type=e.currentTarget.dataset.type;
         this.setData({
             red:Type,
             chooseID:Type
         })
        console.log(this.data.chooseID);
    },
    //查看权益
    checkLevel:function (e){
        let that=this;
        if(this.data.showLevel){
            this.setData({
                showLevel:false
            })
        } else{
            this.setData({
                showLevel:true
            })
        }
    },
    //提交信息
    confirm:function (e) {
        var api=url.url.login;

        let obj={};
        let data=this.data;
        obj.open_id=data.open_id;
        obj.nick_name=data.name;
        obj.mobile=data.mobile;
        obj.province=data.select .provinceId[data.select.provinceIndex];
        obj.city=data.select .cityId[data.select.cityIndex];
        obj.areas=data.select .areaId[data.select.areaIndex];
        obj.township=data.select.stressId[data.select.stressIndex];
        obj.address=data.address;
        obj.store_mobile=data.phone;
        obj.store_user_name=data.people;
        obj.store_annual_sales=data.money;
        obj.store_license=data.srcUp;
        obj.store_storefront=data.srcShopUp;
        obj.level_vip_id=data.chooseID;
        obj.card_z=data.srcID1Up;
        obj.card_f=data.srcID2Up;
        obj.brand_id=data.brandselectId;
        let i=0
        for (var key in obj){
            // debugger
            if(obj[key]==''){
                i++;
                // debugger
                // console.log('失败');
                wx.showModal({
                    title: '提示',
                    content: '请完成表单填写',
                    showCancel:false,
                  success: res=>{
                    if (res.confirm) {

                    }
                  }
                })
                break;
                // return
            }
        }
        obj.other_brand=data.brandinput;
        if(i<1){
            ajax.postAjax(api,obj,function (that,json) {
                wx.setStorageSync('user_id', json.user_id);
                let order=json.order;
                let user_id=json.user_id;
                let pay=json.pay;
                wx.requestPayment({
                    timeStamp: pay.timeStamp,
                    nonceStr: pay.nonceStr,
                    package: pay.package,
                    signType: pay.signType,
                    paySign: pay.paySign,
                    success: function (res) {
                        console.log(res);
                        ajax.postAjax(url.url.pay_user, { level_order_sn:order, open_id: pay.openid }, function (that, json) {
                            wx.showModal({
                                title: '支付成功',
                                content: '支付成功',
                                success: function () {
                                    wx.navigateTo({
                                        url: '../index/index',
                                    })
                                }
                            })
                        }, this)
                    },
                    fail: function (res) {
                        wx.showModal({
                            title: res.errMsg,
                            content: res.errMsg,
                        })
                    }
                })
            },this)
        }

    },
    //关闭弹窗
    close:function (e) {
        this.setData({
            showModel:false
        })
    }
});
