
'use strict'
var express = require('express');
var app = express();
app.use(express.static('public'));
var mongoose=require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var userInstance=require('./models/user.js');
var exerciseInstance=require('./models/exercises.js');
var userDBURL='mongodb://'+process.env.USER+':'+process.env.PASSWORD+'@'+process.env.HOST+':'+process.env.DBPORT+'/'+process.env.USERDB;

mongoose.connect(userDBURL,{ useNewUrlParser: true });

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.post('/api/exercise/new-user',function(req,res)
         {
  var username=req.body.username;
  var data=new userInstance(
    {
      username:username
    });
  
  data.save(function(err,userInstance){
    if(err!=null){
               if(err.name === 'MongoError' && err.code === 11000)
                 res.send("username already exist,try new one")}
    else
      res.send(data);
                      });
  
  
});
app.post('/api/exercise/add',function(req,res)
         {
  var uid=req.body.userId;
  console.log(req.body);
  var dur=req.body.duration;
  var desc=req.body.description;
  var date=req.body.date;
  var data=new exerciseInstance({
        username:uid,
        duration:dur,
        description:desc,
        date:date
        
        
      });
  userInstance.find({username:uid},function(err,name){
      console.log(name);
    if(!name.length)
      res.send("user does not exist,please enter correct user id");
    else
    {
      data.save(function(err,exerciseInstance){
                if(err)
        throw err;
      });
      res.send(data);
  }
  });
});
app.get('/api/exercise/log',function(req,res)
{
  var username=req.query.username
  exerciseInstance.find({username:username},function(err,data){
    if(err)
      throw err;
    else if(!data.length)
      res.send("please check user name");
    else
      res.send(data);
  });
});
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
