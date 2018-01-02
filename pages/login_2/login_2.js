// pages/login_2/login_2.js
import ajax from "../../utils/ajax";
import url from "../../utils/url";

Page({

  /**
   * 页面的初始数据
   */
  data: {
      showInput:false,
      brand:[],//手动输入品牌


      brandselect:[],
      brandselectId:[],
      brandList:[],//选择品牌列表
      brand_id:'',
      showModal:false,
      json:'',
      Data:'',
      money:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
    //自定义输入显示
    chooseInput:function (e) {
          this.setData({
              showInput:true
          })
    },
    // 手动输入品牌
    inputBrand:function (e) {
        let value=e.detail.value;
        let arrselect=this.data.brand;
        // let arr=this.data.brandinput;
        if(value&&value.length<8){
            arrselect.push(value);
            // arr.push(value);
            wx.setStorageSync('inputBrand',arrselect);
            this.setData({
                brand:arrselect,
                // brandinput:arr
            })
        }
        e.detail.value=''
    },


    // 删除品牌
    delInput:function (e) {
        let Type=e.currentTarget.dataset.type;
        let arr=this.data.brand;
        arr.splice(Type,1);
        this.setData({
            brand:arr
        })
    },
    del:function (e) {
        let Type=e.currentTarget.dataset.type;
        let arr=this.data.brandList;
        console.log(Type);
        arr.splice(Type,1);
        this.setData({
            brandList:arr
        })
    },



    // 获取品牌及弹窗
    chooseModal:function (e) {
        this.setData({
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
        console.log(ARR);
        var list=ARR.filter(function(element,index,arr){
            return arr.indexOf(element)==index;
        });
        console.log(list)
        let OBJ={};
        list.map((item,index)=>{
            OBJ[item]=[];
            arr.map((Ite,Index)=>{
                if(Ite.initials == item){
                    OBJ[item].push(Ite);
                }
            })
        });
        console.log(OBJ);
        that.setData({
            json:OBJ
        })
    },
    //选中品牌
    click:function (e) {
        let that=this;
        var id=e.currentTarget.dataset.type;
        var json=this.data.Data;
        let brand=that.data.brandList;
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
            brandList:brand,
            Data:json,
            // brand:brand,
            brandselect:brand,
            brandselectId:brandId,
        });
        wx.setStorageSync('brandId',brandId);
        this.classify(this)
    },
    //关闭弹窗
    close:function (e) {
        this.setData({
            showModel:false
        })
    },
    //年销量
    inputMoney:function (e) {
        let value=e.detail.value;
        wx.setStorageSync('money',value);
        this.setData({
            money:value
        })
    },
        href:function () {
            wx.navigateTo({
                url: '../login_3/login_3'
            })
        },
})