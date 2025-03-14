const mongoose = require('mongoose');

let fileSchema = mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    fileName : String,
    
    user:{
      ref:'User',
      type:mongoose.Schema.Types.ObjectId, 
    },
  createdAt: {type: Date, default: Date.now}
});

let fileModel = mongoose.model('File', fileSchema);
module.exports = fileModel ;