const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const date = require(__dirname + "/date.js")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
mongoose.connect('mongodb://localhost:27017/todoapp')

const itemsSchema = { name: String }
const todoListModel = mongoose.model("todoListItem", itemsSchema)

const routesSchema = {
  name: String,
  items: [itemsSchema]
}
const List = mongoose.model("list", routesSchema)

// const laundry = new todoListModel({
//   name: 'Laundry'
// })

// const Lunch = new todoListModel({
//   name: 'Lunch'
// })

// const Assignments = new todoListModel({
//   name: 'Assignments'
// })

const send = {
  today: date.getDay(),
  items: [],
  title: '',
}
 
app.get("/", async function(request, response){
  await todoListModel.find({}, async function(err, result){
    if(err){
      console.log(err);
    }else{
      if(result.length === 0){
        await todoListModel.insertMany(send.items, function(err){
          if(err){
            console.log(err);
            response.render("404")
          }
          else console.log("Successfully inserted records");
        })
        response.redirect("/")
      }else{
        send.items = result
        send.title = ''
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

app.get("/:route", async (request, response)=>{
  const route = request.params.route
  await List.findOne({name: route}, async function(err, result){
    if(err){
      console.log(err);
      response.render("404")
    }
    else{
      if(!result){
        await new List({
          name: route
        }).save()
        response.redirect(`/${route}`)
      }else{
        send.title = route
        send.items = result.items
        response.render("lists", {data: send})
      }
    }
  }).clone()
})

app.post("/:route", async (request, response)=>{
  const newtodoItem = request.body.item
  const route = request.params.route
  const item = new todoListModel({name: request.body.item})
  if(newtodoItem.length > 0){
    await List.findOne({name: route}, async (err, result)=>{
      if(err){
        console.log(err);
        response.render("404")
      }
      else{
        result.items.push(item)
        result.save()
        response.redirect(`/${route}`)
      }
    }).clone()
  }
})

app.post("/delete/:route", async (request, response) =>{
  const item_id = request.body.delete_item
  const route = request.params.route
  if(route === ''){
    await todoListModel.deleteOne({_id: item_id}, async function(err){
      if(err){
        console.log(err);
        response.render("404")
      }
    }).clone()
    response.redirect("/")
  }else{
    await List.findOneAndUpdate({name: route}, {$pull : {items : {_id: item_id}}}, async function(err, result){
      if(err){
        console.log(err);
        response.render("404")
      }else{
        response.redirect(`/${route}`)
      }
    }).clone()
  }
})

app.listen(3000, () => {
  console.log("Server started on port 3000");
})
