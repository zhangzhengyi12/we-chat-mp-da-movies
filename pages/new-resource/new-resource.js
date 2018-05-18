const IN_T_TARGET = 'movie/lastMovies'
const app = getApp()
const req = require('../../api/request')
const tip = require('../../utils/tips')
const jsonCode = require('../../utils/code')

const CODE_OK = 200
const CODE_ERR = 201

let initialTag = true

Page({
  onLoad: function() {
    wx.startPullDownRefresh()
  },
  data: {
    onLoading: true,
    newResource: [],
    polifillResource: []
  },
  getInTheatherData() {
    return new Promise((resolve, reject) => {
      req.wxRequestPromisify(IN_T_TARGET).then(
        res => {
          if (res.statusCode === 200 && res.data.length !== 0) {
            let polifillData = res.data.map(this.polifilPreviewData)
            this.setData({
              newResource: res.data,
              polifillResource: polifillData
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
    const imdbRat = cData.rating.imdb.rating
    const doubanRat = cData.rating.douban.rating
    let coverUrl = cData.coverImageSmall
    let finallyRat = '0'

    // 豆瓣拥有更高的优先级
    if (imdbRat !== '0') finallyRat = imdbRat
    if (doubanRat !== '0') finallyRat = doubanRat

    // 需要https的的图片做处理
    if (coverUrl.match(/https:/)) {
      coverUrl = coverUrl.replace('https', 'http')
    }
    return {
      movieTitle: cData.name,
      movieOriginTitle: cData.location,
      rating: finallyRat,
      types: cData.types,
      coverUrl,
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
    let movieData = this.data.newResource[index]
    this.toggleToMovieDetail(movieData)
  },
  toggleToMovieDetail(movieData) {
    // 转码工具，避免其中的特殊字符入？&=干扰query传送
    movieData = jsonCode.enCodeJSONURI(JSON.stringify(movieData))
    wx.navigateTo({
      url: `/pages/dygangMovieDetail/dygangMovieDetail?movieData=${movieData}`
    })
  }
})
