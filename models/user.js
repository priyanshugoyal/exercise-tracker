var mongoose=require('mongoose');
var schema = mongoose.Schema({
   username: {type:String,required:true,unique:true},
}, {
  timestamps: true,

  
});
var modelClass = mongoose.model("user", schema);
module.exports=modelClass;