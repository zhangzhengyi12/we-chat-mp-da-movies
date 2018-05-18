const LOW_COL = '#D9534F'
const MID_COL = '#F5C518'
const HIGH_COL = '#00B51D'
const DEF_COL = '#ccc'
function calucateMovieRatingColor(rating) {
  rating = Number(rating)
  if (rating >= 7) {
    return HIGH_COL
  }
  if (rating >= 5) {
    return MID_COL
  }
  if (rating === 0) {
    return '#ccc'
  }
  return LOW_COL
}

module.exports = {
  calucateMovieRatingColor: calucateMovieRatingColor
}
