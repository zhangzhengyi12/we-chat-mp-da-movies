const OK_CODE = 200
const tip = require('../../utils/tips')
const color = require('../../utils/color')
const jsonCode = require('../../utils/code')

Page({
  data: {
    movieData: {},
    ratingTextColor: '#00B51D',
    typeStr: ''
  },
  onLoad(options) {
    let movieData = JSON.parse(jsonCode.deCodeJsonURI(options.movieData))
    // HACK HTTPS TO HTTP
      movieData.coverIamgeLarge = movieData.coverIamgeLarge.replace(/https:/,'http:')
    this.setData({
      movieData,
      typesStr: movieData.types.join('/')
    })
    wx.setNavigationBarTitle({
      title: `DaMovies - ${movieData.name}`
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: `你的朋友向你了分享一个最新资源 - ${this.data.movieData.name}`,
      path: `/pages/doubanMovieDetail/doubanMovieDetail?movieData=${JSON.stringify(this.data.movieData)}`,
      success: function(res) {
        tip.showToast('转发成功')
      },
      fail: function(res) {
        tip.showToast('转发失败')
      }
    }
  },
  onCopy(e) {
    let link = e.currentTarget.dataset.url
    wx.setClipboardData({
      data: link,
      success() {
        tip.showToast('复制成功')
      },
      fail() {
        tip.showToast('复制失败')
      }
    })
  }
})
