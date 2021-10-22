// module.exports = returnDate  - this is also an option to export a module
module.exports = {
  getDate: returnDate,
  getDay: returnDay
}

function returnDate(){
  let date = new Date()
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  return date.toLocaleString('en-US', options)
}

function returnDay(){
  let date = new Date()
  var options = {
    weekday: 'long',
  };
  return date.toLocaleString('en-US', options)
}