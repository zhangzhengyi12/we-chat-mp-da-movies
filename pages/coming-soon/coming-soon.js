const COM_SOON_TARGET = 'douban/movie/coming_soon'
const app = getApp()
let req = require('../../api/request')
let tip = require('../../utils/tips')

const CODE_OK = 200
const CODE_ERR = 201

let initialTag = true

Page({
  onLoad: function() {
    wx.startPullDownRefresh()
  },
  data: {
    onLoading: true,
    comingSoon: [],
    polifillComingSoon: []
  },
  getInTheatherData() {
    return new Promise((resolve, reject) => {
      req.wxRequestPromisify(COM_SOON_TARGET).then(
        res => {
          if (res.statusCode === 200 && res.data.subjects.length !== 0) {
            let polifillData = res.data.subjects.map(this.polifilPreviewData)
            this.setData({
              comingSoon: res.data.subjects,
              polifillComingSoon: polifillData
            })
            resolve(CODE_OK)
          }
        },
        err => {
          tip.showToast('网络错误')
          reject(CODE_ERR)
        }
      )
    })
  },
  polifilPreviewData(cData, index) {
    // 接收完成的豆瓣数据，返回一个精简版的
    let rating = cData.rating.average
    // 补成.0结构，更好看
    if (rating !== 0 && rating % 1 === 0) {
      rating = rating + '.0'
    }
    return {
      movieTitle: cData.title,
      movieOriginTitle: cData.original_title,
      rating,
      types: cData.genres,
      coverUrl: cData.images.large,
      index
    }
  },
  onPullDownRefresh() {
    this.getInTheatherData().then(
      res => {
        wx.stopPullDownRefresh()
        // 如果是后续刷新
        if (!initialTag) {
          tip.showToast('刷新成功')
        }
        initialTag = false
      },
      err => {
        initialTag = false
        wx.stopPullDownRefresh()
        tip.showToast('干啊，刷新失败了！')
      }
    )
  },
  onTapDetail(event) {
    let index = event.detail.index
    let movieData = this.data.comingSoon[index]
    this.toggleToMovieDetail(movieData)
  },
  toggleToMovieDetail(movieData) {
    movieData = JSON.stringify(movieData)
    wx.navigateTo({
      url: `/pages/doubanMovieDetail/doubanMovieDetail?movieData=${movieData}`
    })
  }
})
