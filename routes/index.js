var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// register api

router.post("/register",function (req,res,next){
  res.json({login:true});
});

require("../models/batch");
require("../models/User");
require("../models/cont");
require("../models/trainer");
require("../models/register");
var mongoose=require("mongoose");
var myfit=mongoose.model("myfitness");
var user =mongoose.model("users");
var comment=mongoose.model("comments");
var trai=mongoose.model("trainers");
var userRegister=mongoose.model("UserRegister");




router.post('/addd', function(req, res) {
  new myfit({name : req.body.name,
    username: req.body.username}
)
  .save(function(err, myfit) {
    console.log(err);
    console.log(myfit);
    res.json(myfit);
  });
});




router.get('/view',function(req,res){
myfit.find(function(err,myfit){
  console.log(err);
  console.log(myfit);  
  res.json(myfit);  
});
});




router.put('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name,  username: req.body.username};
  var options = {new: true};
  myfit.findOneAndUpdate(query, update, options, function(err,myfit){
    console.log(myfit)
    res.json(myfit);
  });
});



 
router.delete('/delete/:id', function(req, res) {
  var query = {"_id": req.params.id};
  myfit.findOneAndRemove(query, function(err, myfit){
    try {
      if(myfit===null){
        res.json({msg:"No User Exists"});
      }
      res.json({msg:"user Deleted"});
    } catch (err) {
      console.log('user not exists');
    }
  });
});




router.post('/add', function(req, res) {
  try {
  if(req.body.password===req.body.confirmpassword){
  new user({
    username: req.body.username,
    password: req.body.password,
    email:req.body.email,
  }
)
  .save(function(err, user) {
    console.log(err);
    console.log(user);
    res.json(user);
  });
}
else{
  res.json({msg:"Password not Matched"});
}
} catch (err) {
    console.log(err);
}
});




router.get('/useriew',async (req,res) =>{
  const users = await user.find().select('-password');
  res.json(users);  
  });




  router.put('/user/update/:id', function(req, res) {
    var query = {"_id": req.params.id};
    var update = {username : req.body.username,  password: req.body.password,  email:req.body.email };
    var options = {new: true};
    user.findOneAndUpdate(query, update, options, function(err,user){
      console.log(user)
      res.json(user).select('-password');
    });
  });



   
  router.delete('/user/delete/:id', function(req, res) {
    var query = {"_id": req.params.id};
    myfit.findOneAndRemove(query, function(err, user){
      try {
        if(user===null){
          res.json({msg:"No User Exists"});
        }
        res.json({msg:"user Deleted"});
      } catch (err) {
        console.log('user not exists');
      }
    });
  });





  router.post('/addcomment', function(req, res) {
    new comment({name : req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      comm: req.body.comm
    })
    .save(function(err, comment) {
      console.log(err);
      console.log(comment);
      res.json(comment);
    });
  });
  
  
  
  
  router.get('/viewcomment',function(req,res){
  comment.find(function(err,comment){
    console.log(err);
    console.log(comment);  
    res.json(comment);  
  });
  });
  
  
  
  
  router.put('/updatecomment/:id', function(req, res) {
    var query = {"_id": req.params.id};
    var update = {comm : req.body.comm};
    var options = {new: true};
    comment.findOneAndUpdate(query, update, options, function(err,comment){
      console.log(comment)
      res.json(comment);
    });
  });
  
  
  
   
  router.delete('/deletecomment/:id', function(req, res) {
    var query = {"_id": req.params.id};
    comment.findOneAndRemove(query, function(err, comment){
      try {
        if(comment===null){
          res.json({msg:"No comment Exists"});
        }
        res.json({msg:"comment Deleted"});
      } catch (err) {
        console.log('user not exists');
      }
    });
  });
  


  router.post('/addtrainer', function(req, res) {
    new trai({name : req.body.name,
      email: req.body.email,
      exp: req.body.exp,
      cat: req.body.cat
    })
    .save(function(err, trai) {
      console.log(err);
      console.log(trai);
      res.json(trai);
    });
  });
  
  
  
  
  router.get('/viewtrainer',function(req,res){
  trai.find(function(err,trai){
    console.log(err);
    console.log(trai);  
    res.json(trai);  
  });
  });
  
  
  
  
  router.put('/updatetrainer/:id', function(req, res) {
    var query = {"_id": req.params.id};
    var update = {email : req.body.email,
                  exp:req.body.exp,
                  cat:req.body.cat,       
    };
    var options = {new: true};
    trai.findOneAndUpdate(query, update, options, function(err,trai){
      console.log(trai);
      res.json(trai);
    });
  });
  
  
  
   
  router.delete('/deletecomment/:id', function(req, res) {
    var query = {"_id": req.params.id};
    trai.findOneAndRemove(query, function(err, trai){
      try {
        if(trai===null){
          res.json({msg:"No trainer Exists"});
        }
        res.json({msg:"trainer Deleted"});
      } catch (err) {
        console.log('user not exists');
      }
    });
  });
  
  





router.post('/signin',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    userRegister.findOne({
        email:email
    },(err,user)=>{
        if(err){
            res.json(err);
        }
        else{
            console.log(user);
            if(user == null ){
              res.json({message:"Check your Credentials"});
            }
            else if (user.password != password){
                res.json({message:"Check your password"});
            }
            else{
                res.json(user);
            }
        }
    })
})
/////////////////////getdatabyid/////////////////////////////////////
router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;
    userRegister.findOne({
        _id:id
    },(err,user)=>
    {
        if(err){
            console.log(err);
        }
        else{
            if(user==null)
            {
                res.json({message:"Does not exist"});
            }
            else{
                res.json(user);
            }
        }
    })
})


router.post('/addRegister',function(req,res){
    const city=req.body.city
    const email=req.body.email
    const name=req.body.name
    const password=req.body.password
    const address=req.body.address
    new userRegister({
        address:address,
        email:email,
        name:name,
        city:city,
        password:password
    }).save(function(err,data){
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
            res.json(data)
        }
    })
})


module.exports = router;
