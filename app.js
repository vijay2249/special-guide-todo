const bodyParser = require('body-parser')
const express = require('express')
const date = require(__dirname + "/date.js")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

let send = {
  today: date.getDay(),
  items: ["laundry", 'Lunch', 'Assignments'],
  secretList: [],
  len: '',
  isSecret: false
}
 
app.get("/", function(request, response){
  send.today = date.getDay()
  send.len = send.items.length
  response.render('lists', {data: send})
})

app.post("/", (request, response)=>{
  console.log(request.body);
  if(request.body.item.length != 0) send.items.push(request.body.item)
  response.redirect("/")
})

app.get("/about", (request, response)=>{
  response.render("about")
})

app.get("/secret", (request, response)=>{
  send.isSecret = true
  response.render("lists", {data: send})
})

app.post("/secret", (request, response)=>{
  send.secretList.push(request.body.item)
  response.redirect("/secret")
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
})
