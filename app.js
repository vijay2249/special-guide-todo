const bodyParser = require('body-parser')
const express = require('express')

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

let send = {
  today: '',
  items: ["laundry", 'Lunch', 'Assignments'],
  len: ''
}
// default page change to weather app - weather.html
app.get("/", function(request, response){
  let date = new Date()
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  let thisDay = date.toLocaleString('en-US', options)
  send.today = thisDay
  send.len = send.items.length
  response.render('lists', {data: send})
})

app.post("/", (request, response)=>{
  console.log(request.body);
  send.items.push(request.body.item)
  console.log(send.items);
  response.redirect("/")
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
})
