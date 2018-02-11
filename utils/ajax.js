
function postAjax(url,data,fn,that){// post方法请求数据
    wx.request({
        url: url,
        data:data,
        method:'POST',
        success:function(res){// 请求链接成功后执行过程
            var json=res.data;
            if(json.code== 200){// 当请求数据成功后执行
                return typeof fn=='function'&&fn(that,json);
            }else{
                console.log(res);
            }
        },
        fail:function(res){  // 请求链接失败后执行
            console.log(res);

        }
    })
}// post请求函数结束
function postAjaxMore(url,data,fn,that) {
    wx.request({
        url: url,
        data:data,
        method:'POST',
        success:function(res){// 请求链接成功后执行过程
            var json=res.data;

            if(json.code== 200||json.code==201){// 当请求数据成功后执行
                return typeof fn=='function'&&fn(that,json);
            }else{
                console.log(res);
            }
        },
        fail:function(res){  // 请求链接失败后执行
            console.log(res);
        }
    })
}
function getAjax(url, data,fn,that){//get方式请求数据开始
    wx.request({// requst请求开始
        url: url,
        data:data,
        header: {},
        method:"GET",
        success:function(res){
            var json=res.data;

            if(json.code==200){
                return typeof fn == "function" && fn(that, json);//封装回调函数
            }else{
                console.log(res);
            }
        },
        fail:function(res){
            console.log(res)
            console.log(res);
        }
    }) // requset请求结束

}// get请求函数结束

function ask(url,data,methd,fn,that){ //通用请求，methd 为请求方式,
    wx.request({
        url: url,
        data:data,
        header:{},
        method:methd,
        success:function(res){
            var json = res.data;
            return typeof fn == "function" && fn(that, json);//封装回调函数
        },
        fail:function(res){
            console.log(res)
        }
    })
}
module.exports = {// 导出函数库
    getAjax: getAjax,
    postAjax: postAjax,
    ask:ask
}