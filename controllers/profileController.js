

// creating profile

const profileModel = require("../model/profile")
const userModel = require('../model/userSchema');

module.exports = createProfile =(req, register)=>{
    // from the cient
    const{ age ,
        location,
        maritalStatus ,
        TypeofPerson,
        height ,
        gender ,
        LevelOfEducation ,
        profession ,
        IdealPartner}  = req.body

        // sink it in the collection
    let aUser = new profileModel({
        age ,
    location,
    maritalStatus ,
    TypeofPerson,
    height ,
    gender ,
    LevelOfEducation ,
    profession ,
    IdealPartner ,
    user : req.session.user._id

    });

    aUser.save();
    res.send("Registered Succeesfully")

  

}

// Get a Profile
module.exports = getAProfile = async(req, res)=>{
   let ID = req.params.id ;
   let aUser = await profileModel.findById(ID).populate({path:'user', select: 'email fullName'}).exec();
   res.json(aUser);
   
}

// get all profile
module.exports = getAllProfile =async (req, res)=>{
   let profile = await profileModel.find({}).populate({path:'user', select: 'email fullName'}).exec();
   res.json(profile);
}

// edit Profile
module.exports =  editProfile =(req, res)=>{

    const{ age ,
        location,
        maritalStatus ,
        TypeofPerson,
        height ,
        gender ,
        LevelOfEducation ,
        profession ,
        id,
        IdealPartner}  = req.body

   
    let edit = profileModel.findByIdAndUpdate(id, {
        location,
        maritalStatus ,
        TypeofPerson,
        height ,
        gender ,
        LevelOfEducation ,
        profession ,
        IdealPartner,
        
     }).then(()=>{
        res.send("Profile Edited")
     }) ;

 
 
    

}
