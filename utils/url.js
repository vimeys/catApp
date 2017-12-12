const allUrl ="http://test.scmxkj.com/index.php/cat/";

var  url={};


url.login = allUrl +"part/get_openid";//登录接口
url.AD=allUrl+'index/adv';//广告位
url.Slider=allUrl+'index/banner';//首页轮播图
url.promotion=allUrl+'index/movable_commodity_goods';//首页活动商品
url.TBD=allUrl+'index/mass_goods';//首页众筹商品
url.getDetail=allUrl+'goods/Particulars_of_goods';//商品详情接口
url.getList=allUrl+'index/recommend_brand';//商品分类大项接口
url.brandList=allUrl+'goods/goods_brand_search';//品牌列表接口
url.getProvince=allUrl+'index/getProvince';//获取省份
url.getCity=allUrl+'index/getParent';//获取市县区
url.uploadfile=allUrl+'index/upload';//上传图片接口
url.cardList=allUrl+'Personalhome/Membership_card_list';//会员等级
url.login=allUrl+'user/user';//注册提交接口
url.storage=allUrl+'goods/Collection';//是否收藏的接口
url.msg=allUrl+'user/sms_send';//发送短信
url.sign=allUrl+'user/sms_check';//提交注册
url.testStorege=allUrl+"goods/is_Collection";//首次进入收藏
url.getSize=allUrl+'goods/goods_spec';//获取规格
url.getBrand=allUrl+'index/brand';//获取所有品牌
url.getPrice=allUrl+"goods/goods_spec";//获取价格
url.joinCart=allUrl+'goods/Add_to_cart';//加入购物车
url.goodsSearch=allUrl+'goods/goods_search';//商品搜索页面
url.factoryBrand=allUrl+'goods/factory_brand';//工厂品牌
url.allPromotion=allUrl+'index/movable_commodity_goods';//所有活动商品
url.allTBD=allUrl+'index/mass_goods';//所有众筹商品
url.shopCartList=allUrl+'goods/Shopping_cart_list';//购物车列表
url.buyNow=allUrl+'order/Crowd_funding_order';//众筹商品购买
url.orderOkTBD=allUrl+'order/Place_order';//众筹订单确认页面
url.payWay=allUrl+"order/payment";//选择支付方式
url.delCart=allUrl+'goods/Shopping_cart_list_del';//删除购物车商品
url.confirmCart=allUrl+'order/Confirm_order';//确认订单



//余智仙
url.user_info   = allUrl + 'Personalhome/index';//个人主页
url.new_list    = allUrl + 'Personalhome/News_list'; //消息列表
url.myshop      = allUrl + 'Personalhome/My_personal';  //我的店铺
url.order_list  = allUrl + 'order/order_list'; //订单列表
url.order_info  = allUrl + 'order/order_info';//订单详情
url.payment     = allUrl + 'order/payment';  // 确认支付
url.collection  = allUrl + 'Personalhome/My_collection'; //我的收藏
url.delCollection = allUrl + 'Personalhome/del_collection'; //删除收藏
url.more_rights   = allUrl + 'user/more_rights';  // 更多权益
url.Upgrade     = allUrl + 'Personalhome/Upgrade'; // 会员升级
url.is_news     = allUrl + 'Personalhome/is_news_look'; //查看消息
url.contact_brand    = allUrl + 'Personalhome/Contact_manufacturers';//联系厂家
url.my_brand    = allUrl + 'Personalhome/my_brand';//品牌管理
url.my_factory_brand = allUrl + 'Personalhome/Manufacturer_brand_list';//我代理的厂商品牌
url.complan     = allUrl + 'Personalhome/Complaint_factory'; //投诉厂家
url.take_over   = allUrl + 'order/take_over';   //确认收货
url.pay_user    = allUrl + 'user/pay_user';  //缴费成功
url.pay_success = allUrl + 'order/pay_success'; //微信支付成功




module.exports={
    url:url
};