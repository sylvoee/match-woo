
let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId ,
    message : String,
    receiverID : mongoose.Schema.Types.ObjectId ,
    senderID : mongoose.Schema.Types.ObjectId ,
    time : {type: Date, default: Date.now()},

   
    user : {
        ref:'User',
        required:true,
        type:mongoose.Schema.Types.ObjectId,
    }

});

const messageModel =  mongoose.model('Message', messageSchema);
module.exports = messageModel;