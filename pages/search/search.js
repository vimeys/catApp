// pages/search/search.js
import url from '../../utils/url'
import ajax from '../../utils/ajax'
var order = ['red', 'yellow', 'blue', 'green', 'red'];
Page({

  /**
   * 页面的初始数据
   */
  data: {
      toView: 'red',
      scrollTop: 100,
      choose:false,
      Data:[1,2,3,4,[1,3,55,6],6,8,3,3,3,3],
      json:[],
      showSearch:false,
      input:'',
      searchData:[]
  },
    // //点击跳转
    // click:function(){
    //     this.setData({
    //         choose:true
    //     })
    // },
    //输入input
    input:function (e) {
        let value=e.detail.value;
        if(value){
            this.setData({
                input:value
            })
        }else{
            this.setData({
                showSearch:false
            })
        }

    },
    //点击搜索
    search:function (e) {
        let obj={};
        obj.page=1;
        obj.pageSize=999;
        obj.search=this.data.input;
        if(obj.search){
            ajax.postAjax(url.url.getBrand,obj,function (that,json) {
                var arr;
                arr=json.data.brand_list;
                that.setData({
                    showSearch:true,
                    searchData:arr
                    // searchData:json.data.brand_list
                })
            },this)
        }

    },
  /**
   * 生命周期函数--监听页面加载
   */
  upper: function (e) {
  },
  lower: function (e) {
  },
  scroll: function (e) {
  },
  tap: function (e) {
      for (var i = 0; i < order.length; ++i) {
          if (order[i] === this.data.toView) {
              this.setData({
                  toView: order[i + 1]
              })
              break
          }
      }
  },
  tapMove: function (e) {
      this.setData({
          scrollTop: this.data.scrollTop + 10
      })
  },
  onLoad: function (options) {
    this.getBrand()
  
  },
  getBrand:function (e) {

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
        var name=e.currentTarget.dataset.name;
        wx.setStorageSync('brandName', name);
        wx.redirectTo({
            url:'../chanping/chanping?id='+id
        })
        // var json=this.data.Data;
        // let brand=that.data.brand;
        // for(var i=0;i<json.length;i++){
        //     // return
        //     if(json[i].id==id){
        //         json[i].choose=true;
        //         brand.push(json[i].name);
        //     }
        // }
        // this.setData({
        //     Data:json,
        //     brand:brand,
        //     brandselect:brand
        // });
        // this.classify(this)
    },
})