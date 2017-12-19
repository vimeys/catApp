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
                    let arr=[];
                    let arr1=[];
                    var push=(item,index)=>{
                        arr.push(item.areaName);
                        arr1.push(item.areaId)
                    };
                    res.data.data.province_list.forEach(push);
                    arr.unshift('全部');
                    arr1.unshift('0');
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
                        arr.unshift('全部');
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
                        arr.unshift('全部');
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
                        arr.unshift('全部');
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
            wx.setStorageSync('phone',value);
            this.setData({
                phone:value
            })
        }
    },
    
    //点击跳转
    href:function () {
        wx.navigateTo({
          url: '../login_2/login_2'
        })
    },


  
})