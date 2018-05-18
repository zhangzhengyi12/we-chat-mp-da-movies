
Component({
  properties: {
    coverSrc: {
      type: String,
      value: ''
    }
  },
  data: {
    topShowBg: '#ccc',
  },
  methods: {
    coverLoad() {
      this.setData({
        topShowBg: `url(${this.data.coverSrc})`
      })
    }
  }
})
