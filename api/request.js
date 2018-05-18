function calulateGetUrlForProxy(target) {
  const baseUrl = 'https://wxapi.hotapp.cn/proxy/?appkey=hotapp11377340&url=http://api.yinode.tech/'
  return baseUrl + target
}

function wxRequestPromisify(target) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: calulateGetUrlForProxy(target),
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  calulateGetUrlForProxy: calulateGetUrlForProxy,
  wxRequestPromisify: wxRequestPromisify
}
