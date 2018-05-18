//app.js
let req = require('./api/request')
App({
  onLaunch: function() {
    // 尽量提高并发，一次性拿三组数据
  },
  globalData: {
    userInfo: null
  }
})
