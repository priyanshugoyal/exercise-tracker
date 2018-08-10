var mongoose=require('mongoose');
var schema = mongoose.Schema({
  
   username: {type:String,required:true},
                             description:{type:String,require:true},
  duration:{type:Number,require:true},
  date:{type:Date,require:true},

  
});
var modelClass = mongoose.model("exercise", schema);
module.exports=modelClass;