function testLogin(that){
  var level=wx.getStorageSync("level");
  if(level){
      wx.reLaunch({
        url: '../sign/sign',
      })
  }
}
module.exports={
  test:testLogin
}