// pages/login_1/login_1.js
import url from "../../utils/url";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      select: {
          province: [1, 2, 3],
          provinceIndex: 0,
          provinceId: [],
          provinceUse:false,
          city:['选 择 城 市'],
          cityIndex:0,
          cityId:[],
          cityUse:true,
          area:['选 择 区/县'],
          areaIndex:0,
          areaId:[],
          areaUse:true,
          stress:['选 择 乡/镇'],
          stressIndex:0,
          stressId:[],
          stressUse:true
      },
      address:'',
      people:'',
      phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setStorageSync('mobile',options.mobile);
      this.getProvince()
  },
    getProvince: function (e) {
        let that=this;
        wx.request({
            url:url.url.getProvince,
            method:"POST",
            success:res=>{
                if(res.data.code==200){
                    // let data=res.data.data.province_list;
                    // data.filter(function (item,index,arr) {
                    //     return item
                    // });
                    let arr=[];
                    let arr1=[];
                    let Array=res.data.data.province_list.filter(function(e){
                        if(e.areaName=='北京市'||e.areaName=='天津市'||e.areaName=='上海市'||e.areaName=='重庆市'){
                            return false
                        }else {
                            return true
                        }
                    })
                    var push=(item,index)=>{
                        arr.push(item.areaName);
                        arr1.push(item.areaId)
                    };

                    Array.forEach(push);
                    arr.unshift('选 择 省 份');
                    arr1.unshift('0');
                    // arr=arr.filter(function (e) {
                    //     console.log(e);
                    //     if(e=='北京市'||e=='天津市'||e=='上海市'||e=='重庆市'){
                    //         return false
                    //     }else {
                    //         return true
                    //     }
                    //     // if(e=='北京市'){
                    //     //     return false
                    //     // }else if(e=='天津市'){
                    //     //     return false
                    //     // }else if(e=='上海市'){
                    //     //     return false
                    //     // }else if(e=='重庆市'){
                    //     //     return false
                    //     // }else {
                    //     //     return true
                    //     // }
                    //
                    // })
                    console.log(arr);
                    var select=that.data.select;
                    select.province=arr;
                    select.provinceId=arr1;
                    that.setData({
                        select:select
                    });

                }
            }
        })
    },
    optionChange:function (e) {
        let that=this;
        let data=this.data;
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
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        arr.unshift('选 择 城 市');
                        arr1.unshift('0');
                        var select=that.data.select;
                        select.city=arr;
                        select.cityId=arr1;
                        select.cityUse=false;
                        that.setData({
                            select:select,
                        });
                        wx.setStorageSync('sheng',data.select .provinceId[data.select.provinceIndex]);
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
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        arr.unshift('选 择 区/县');
                        arr1.unshift('0');
                        var select=that.data.select;
                        select.area=arr;
                        select.areaId=arr1;
                        select.areaUse=false;
                        that.setData({
                            select:select,
                        });
                        wx.setStorageSync('shi',data.select .cityId[data.select.cityIndex]);
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
                    if(res.data.code==200){
                        let arr=[];
                        let arr1=[];
                        var push=(item,index)=>{
                            arr.push(item.areaName);
                            arr1.push(item.areaId)
                        };
                        res.data.data.city_list.forEach(push);
                        var select=that.data.select;
                        arr.unshift('选 择 乡/镇');
                        arr1.unshift('0');
                        select.stress=arr;
                        select.stressId=arr1;
                        select.stressUse=false;
                        that.setData({
                            select:select,
                        });
                        wx.setStorageSync('qu',data.select .areaId[data.select.areaIndex]);
                    }
                }
            })
        }else if(Type==4){
            var select=that.data.select;
            select.stressIndex=value;
            that.setData({
                select:select
            });
            wx.setStorageSync('zhen',data.select.stressId[data.select.stressIndex]);
        }

    },
    address:function (e) {
        let value=e.detail.value;
        wx.setStorageSync('addr',value);
        this.setData({
            address:value
        })
    },
    output:function (e) {
        var value=e.detail.value;
        var Type=e.currentTarget.dataset.type;
        if(Type==1){
            wx.setStorageSync('people',value);
            this.setData({
                people:value
            })
        }else if(Type==2){
            if(/^((1[3,5,8,7,4][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(value)){
                wx.setStorageSync('phone',value);
                this.setData({
                    phone:value
                })
            }

        }
    },
    
    //点击跳转
    href:function () {
      if(!this.data.phone){
          wx.showModal({
            title: '提示',
            content: '请填写正确的手机号码',
              showCancel:false,
            success: res=>{
              if (res.confirm) {

              }
            }
          })
      }else{
          let obj = {};
          obj.zhen = wx.getStorageSync('zhen');
          obj.address = this.data.address;
          obj.phone = this.data.phone;
          obj.people = this.data.people;
          let i = 0;
          for (var key in obj) {
              if (obj[key] == '') {
                  i++
                  wx.showModal({
                      title: '提示',
                      content: '请填写完成所有表格',
                      showCancel: false,
                      success: res => {
                          if (res.confirm) {
                          }
                      }
                  })
              }
          }
          if (i < 1) {
              wx.navigateTo({
                  url: '../login_2/login_2'
              })
          }
      }

    }


  
})