Component({
  properties: {
    movieData: {
      type: Object,
      value: {
        movieTitle: '电影名称',
        movieOriginTitle: 'origin title',
        rating: 0,
        types: [],
        movieCoverUrl: ''
      }
    }
  },
  data: {
    stars: []
  },
  attached() {
    // 进行star的计算，添加一个src数组到data中
    let stars = this.calulateRatingStar(this.data.movieData.rating)
    let strType = this.data.movieData.types.join('/')
    this.setData({
      stars,
      strType
    })
  },
  methods: {
    calulateRatingStar(rating) {
      const aStarPath = './cc-star.svg'
      const oStarPath = './cc-star-o.svg'
      const hStarPath = './cc-star-half.svg'

      let hRat = Number(rating) / 2
      let starts = Array(5)
        .fill(1)
        .map((item, index) => {
          let diff = hRat - (index + 1)
          // diff代表第一个层级（共五层）即两分与影片总分之差

          // 默认行为，给空星
          let result = oStarPath
          if (diff >= 0) {
            // 差大于0 代表评分大于这个层级的标准分，给满星
            result = aStarPath
          }
          if (diff >= -0.5 && diff < 0) {
            // 差小于0.5 代表评分高于这个层级的一半，勉强，给个半星
            // 注意，这里的diff是负数，也就是说在0与-.5之间
            result = hStarPath
          }

          return result
        })
      return starts
    },
    onTapDetail() {
      this.triggerEvent('tapDetail', { index: this.data.movieData.index })
    }
  }
})
