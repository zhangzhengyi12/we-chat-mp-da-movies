function showToast(text, time = 1000) {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: time,
    mask: true
  })
}

module.exports = {
  showToast: showToast
}
