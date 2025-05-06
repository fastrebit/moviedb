function description(str, quantity) {
  if (str.length < quantity) return str
  const lastIndex = str.slice(0, quantity).lastIndexOf(' ')
  return `${str.slice(0, lastIndex)}...`
}
export default description
