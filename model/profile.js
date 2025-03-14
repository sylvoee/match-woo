
let mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId ,
    age : Number,
    location : String,
    maritalStatus : String,
    TypeofPerson : String,
    height : String,
    gender: String,
    LevelOfEducation : String,
    profession : String,
    IdealPartner : String,

    user : {
        ref:'User',
        required:true,
        type:mongoose.Schema.Types.ObjectId,
    }

});

const profileModel =  mongoose.model('Profile', profileSchema);
module.exports = profileModel;