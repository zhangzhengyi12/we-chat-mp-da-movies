const req = require('../../api/request')
const DETAIL_BASE = 'douban/movie/subject/'
const OK_CODE = 200
const tip = require('../../utils/tips')
const color = require('../../utils/color')

Page({
  data: {
    movieData: {},
    topShowBg: '#ccc',
    typesStr: '',
    akaStr: '',
    countriesStr: '',
    detailData: null,
    ratingTextColor: '#00B51D'
  },
  onLoad(options) {
    let movieData = JSON.parse(options.movieData)
    this.setData({
      movieData
    })
    wx.setNavigationBarTitle({
      title: `DaMovies - ${movieData.title}`
    })
    this.getMovieDetailData(movieData.id)
  },
  getMovieDetailData(id) {
    let target = DETAIL_BASE + id
    req.wxRequestPromisify(target).then(
      res => {
        if (res.statusCode === OK_CODE) {
          let doubanRat = res.data.rating.average
          // 补成.0结构，更好看
          if (doubanRat !== 0 && doubanRat % 1 === 0) {
            res.data.rating.average = doubanRat + '.0'
          }
          this.setData({
            detailData: res.data,
            typesStr: res.data.genres.join('/'),
            akaStr: res.data.aka.join('/'),
            countriesStr: res.data.countries.join('/'),
            ratingTextColor: color.calucateMovieRatingColor(res.data.rating.average)
          })
        }
      },
      err => {
        tip.showToast('网络错误')
      }
    )
  },
  onShareAppMessage: function(res) {
    return {
      title: `你的朋友邀请你看爽片 - ${this.data.movieData.title}`,
      path: `/pages/doubanMovieDetail/doubanMovieDetail?movieData=${JSON.stringify(this.data.movieData)}`,
      success: function(res) {
        tip.showToast('转发成功')
      },
      fail: function(res) {
        tip.showToast('转发失败')
      }
    }
  }
})
