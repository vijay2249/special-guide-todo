const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const date = require(__dirname + "/date.js")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
mongoose.connect('mongodb://localhost:27017/todoapp')

const itemsSchema = {
  name: String
}

const todoListModel = mongoose.model("todoListItem", itemsSchema)

const laundry = new todoListModel({
  name: 'Laundry'
})

const Lunch = new todoListModel({
  name: 'Lunch'
})

const Assignments = new todoListModel({
  name: 'Assignments'
})

let send = {
  today: date.getDay(),
  items: [laundry, Lunch, Assignments],
  secretList: [],
  isSecret: false
}


 
app.get("/", async function(request, response){

  await todoListModel.find({}, async function(err, result){
    if(err){
      console.log(err);
    }else{
      if(result.length === 0){
        await todoListModel.insertMany(send.items, function(err){
          if(err)console.log(err);
          else console.log("Successfully inserted records");
        })
        response.redirect("/")
      }else{
        send.items = result
        send.today = date.getDay()
        response.render('lists', {data: send})
      }
    }
  }).clone()
})

app.post("/", async (request, response)=>{
  const item = request.body.item
  if(item.length > 0){
    await new todoListModel({name: request.body.item}).save()
  }
  response.redirect("/")
})

app.post("/delete", async (request, response) =>{
  const item_id = request.body.delete_item
  await todoListModel.deleteOne({_id: item_id}, async function(err){
    if(err)console.log(err);
  }).clone()
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
  if(request.body.item.length > 0) send.secretList.push(request.body.item)
  response.redirect("/secret")
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
})
