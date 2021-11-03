# special-guide-todo

1.  Install nodejs locally to run this locally in your system
2.  Clone the repository
3.  install npm modules by running `npm i` in terminal
4.  Install [`mongodb`](https://www.youtube.com/watch?v=569Q1VNDOnM) and [`mongosh`](https://www.youtube.com/watch?v=569Q1VNDOnM) in your system
5.  Run `mongosh` in terminal and replace mongoose.connect() inside url with the url that is given after running `mongosh` in terminal
6.  Run `npm start` to start the server and navigate to [localhost:3000](https://localhost:3000) in your browser


## Versions and Features
### 0.1.0 (current)
  1.  Create Custom lists by routing to https://ejs-playground.herokuapp.com/<customListName\>
  
### 0.2.0 (beta)
  1.  Login form make separate lists for separate users
  2.  Drag items to make priority of the items


### Issues to fix (currently)
  1. All lists if the listname is found can be seen by everyone
  2. Trying to do all delete operations at one route
