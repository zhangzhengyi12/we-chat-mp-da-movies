const EN_OUT_MAP = {
  '=': 'yi_dengyu',
  '&': 'yi_yu',
  '\\?': 'yi_wenhao'
}

function reverseKeyMap(obj) {
  let _obj = obj
  let result = {}

  Object.keys(_obj).map(key => {
    // 反转key value
    let _key = _obj[key]
    let _value = key
    result[_key] = _value
  })
  return result
}

const OUT_EN_MAP = reverseKeyMap(EN_OUT_MAP)

function enCodeJSONURI(strJson) {
  Object.keys(EN_OUT_MAP).map((key, index) => {
    strJson = strJson.replace(new RegExp(key, 'g'), EN_OUT_MAP[key])
  })
  return strJson
}

function deCodeJsonURI(strJson) {
  Object.keys(OUT_EN_MAP).map((key, index) => {
    // 特别注意问号
    if (key === 'yi_wenhao') {
      return (strJson = strJson.replace(new RegExp(key, 'g'), '?'))
    }
    strJson = strJson.replace(new RegExp(key, 'g'), OUT_EN_MAP[key])
  })
  return strJson
}

module.exports = {
  enCodeJSONURI: enCodeJSONURI,
  deCodeJsonURI: deCodeJsonURI
}
