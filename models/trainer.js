var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var trai = new Schema(
    {
         date : {
             type:Date,
            default:Date.now
        }, 
            name : {
                type:String,
                unique:true
            },
            email:{
                type:String
            },
            exp:{
                type:String
            },
            cat:{
                type:String
            }
            
    }
    );
    mongoose.model('trainers',trai);