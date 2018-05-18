Component({
  properties: {
    avatarSrc: {
      type: String,
      value: 'https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png'
    },
    name: {
      type: String,
      value: '无名氏'
    }
  },
  data: {
    safeAvatarSrc: 'https://img3.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png'
  },
  attached() {
    // 给头像做放空保护
    if (this.data.avatarSrc !== null && this.data.avatarSrc !== '') {
      this.setData({
        safeAvatarSrc: this.data.avatarSrc
      })
    }
  }
})
