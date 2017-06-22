// pages/user/user.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: null,
    userInfo: null,
    gallery: [],
    size: 0,

    tx0: 0,
    tx1: 50,
    tx2: 100,
    tx3: 150,
    tx4: 200,
    tx5: 250,
    // ty: 50,
    // tz: 0
    currentPic: 1,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: app.requestHost + 'Store/get_tuser_info/',
      method: 'POST',
      data: {
        tuser_id: options.user_id,
        token: app.TOKEN
      },
      success: function(res){
        that.setData({
          userInfo: res.data.result,
          gallery: res.data.result.album,
          size: res.data.result.album.length
        })
      }
    })
    that.setData({
      userId: app.globalData.userId
    })
  },

  switchToShop(){
    // wx.navigateTo({
    //   url: '/pages/main/main',
    // })
    wx.navigateBack()
  },

  prev() {
    if (this.data.currentPic > 0) {
      this.setData({
        tx0: this.data.tx0 + 50,
        tx1: this.data.tx1 + 50,
        tx2: this.data.tx2 + 50,
        tx3: this.data.tx3 + 50,
        tx4: this.data.tx4 + 50,
        tx5: this.data.tx5 + 50,
        currentPic: this.data.currentPic - 1,
      })
    }
  },

  next() {
    if (this.data.currentPic < this.data.size - 2) {
      this.setData({
        tx0: this.data.tx0 - 50,
        tx1: this.data.tx1 - 50,
        tx2: this.data.tx2 - 50,
        tx3: this.data.tx3 - 50,
        tx4: this.data.tx4 - 50,
        tx5: this.data.tx5 - 50,
        currentPic: this.data.currentPic + 1
      })
    }
  },

  toChatOrConfig(e){
    wx.navigateTo({
      url: this.data.userId === this.data.userInfo.user_id ? '/pages/config/config' : '/pages/chat/chat?friendinfo='+JSON.stringify(e.currentTarget.dataset.friendinfo),
    })
  },

  changeAvatar(){
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        let tempFilePaths = res.tempFilePaths[0]
        wx.request({
          url: app.requestHost + 'member/update_user_avatar/',
          data: {
            token: app.TOKEN,
            avatar: 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKlJWibJZnnAWV84jLeh0ajwva1Y80uz5XOjr87EdVqygucvcD1kdJUbRInCckslQP6pJgSvpO2TAw/0'
          },
          success: function(res) {
            if(res.code === 201){
              that.setData({
                'userInfo.avatar': 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKlJWibJZnnAWV84jLeh0ajwva1Y80uz5XOjr87EdVqygucvcD1kdJUbRInCckslQP6pJgSvpO2TAw/0'
              })
            }
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})