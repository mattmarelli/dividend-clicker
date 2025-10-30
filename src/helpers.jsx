function formatNumber(numberToFormat) {
  var returnNumber = numberToFormat
  var returnSuffix = ""
  if (numberToFormat >= 100000 && numberToFormat < 1000000) {
    returnNumber = numberToFormat / 1000
    returnSuffix = "K"
  } else if (numberToFormat >= 1000000 && numberToFormat < 1000000000) {
    returnNumber = numberToFormat / 1000000
    returnSuffix = "M"
  } else if (numberToFormat >= 1000000000 && numberToFormat < 1000000000000) {
    returnNumber = returnNumber / 1000000000
    returnSuffix = "B"
  }
  return {formattedNumber: returnNumber, suffix: returnSuffix}
}

export default formatNumber