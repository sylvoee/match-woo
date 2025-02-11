const { default: mongoose } = require("mongoose");

let userSchema = mongoose.Schema({
    id :{type : mongoose.Schema.Types.ObjectId} ,
    fullName : String,
    email : String,
    password: String
});

let userModel = mongoose.model('User', userSchema);
module.exports = userModel ;
