const color = require('../../utils/color')

Component({
  properties: {
    rating: {
      type: Number,
      value: 0
    }
  },
  data: {
    realWidth: '0%',
    innerBarColor: '#ccc'
  },
  attached() {
    setTimeout(() => {
      let width = `${Math.floor(Number(this.data.rating) * 10)}%`
      this.setData({
        realWidth: width,
        innerBarColor: color.calucateMovieRatingColor(this.data.rating)
      })
    }, 0)
  }
})
