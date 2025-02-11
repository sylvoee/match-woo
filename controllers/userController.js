const userModel = require("../model/userSchema")


  module.exports = register =  (req, res)=>{
 const{fullName, email, password, confirmPassword} = req.body ;

  let user = userModel({
    email,
    fullName,
    password 
  });

  user.save().
  then( ()=> console.log("Registered successfully") );

}

// read all users
module.exports = allUsers = (req , res)=>{
  let users = userModel.find({}).exec().then((data)=>{
    res.send(data)
  })

}

// read a user

module.exports = aUser = (req , res)=>{

  const ID = req.params.id ;
  let aUser = userModel.findById(ID).exec().then((data)=>{
    res.send(data)
  })

}


// edit a user
module.exports = editUser = (req, res)=>{
  
  const{fullName, password, id} = req.body  ;
let editProfile = userModel.findByIdAndUpdate(id, {fullName, password}).then(()=>{
  res.send("User edited successfully");
})

} 


// delete a user
module.exports = deleteUser = (req, res)=>{
  let deleteUser = userModel.findByIdAndDelete(req.body.id).then(()=>{
    res.send("Deleted successfully");
  })
}