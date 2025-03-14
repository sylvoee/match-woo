const userModel = require("../model/userSchema");
const bcrypt = require('bcrypt');

  module.exports = register =  async(req, res)=>{
 let{fullName, email, password, confirmPassword} = req.body ;
 // validate
 let errors = {} ;

 if(!email)errors.email = "email must not be empty" ;
 if(email.toString().length < 1)errors.email = "email must not be empty" ;
 if(email.toString().includes('@') == false && email.toString().includes('.') == false)errors.email ="invalid email";
 if(email == password)errors.password = "Password must not be the same with your email";

 if(password.toString().length < 8) errors.password = "Password must be more than 7 characters";
  if(password.toString().length < 1)errors.email = "Password must not be empty" ;

if(password.toString().length < 1)errors.password = "Password field must not be empty" ;
 if(confirmPassword.toString() != password)errors.confirmPassword = "Password does not match comfirmpassword";

 let regex =  /^[a-zA-Z ]{2,60}$/
 if(!regex.test(fullName ) ) errors.fullName ="Name field must contain only alphabets and must be more than one character" ;

// check if user already exist
try {
  let data = await userModel.findOne({email}).exec();
if(data)errors.exist = "User Already Exist" ;

} catch (error) {
  console.log(error);
}
  // if no error
  if(Object.keys(errors).length < 1){

   // hasing password 
   const salt = bcrypt.genSaltSync(10);
   const hashPassword = bcrypt.hashSync(password, salt);

   try {
    
    let user = userModel({
      email,
      fullName,
      password  : hashPassword
    });
  
    user.save().
    then( ()=> res.status(200).json({msg: "Registered successfully"}) );

   } catch (error) {
    throw new error ;
    console.log(error)
   }
  
  }else{
    // if error
    res.status(200).json(errors);
  }
  

  

}

module.exports = getLogin  =  (req, res)=>{
  res.send("This is login page");
}

 module.exports = login = async(req, res)=>{
  let loginErrors = [];
  // if not JSON
if(Object.keys(req.body).length < 1){
  res.status(400).json({msg : "Bad Request or empty filed(s)"})
}else{
  let{email, password} = req.body ;
  // cjeck if user exist
  try {
    let data = await userModel.findOne({email}).exec();
  if(!data){
    // user does not exist
    loginErrors.push("invalid email");
    res.status(201).json("invalid email");

  }else{
    // if user exist
if(bcrypt.compareSync(password, data.password) ) {
 
  const{_id, fullName, email} = data ;
  data  ={_id, fullName, email} ;
  // session variable
  req.session.user = data ;
  req.session.login = true ;
  res.status(200).json({user :  req.session.user, login :  req.session.login});
}else{
  res.status(401).json("Wrong password");
}
    

  }
  
  } catch (error) {
    console.log(error);
  }

}


 }

// logout

 module.exports = logout  = (req, res)=>{
   // sestroy session
   req.session.destroy(()=>{
    res.send("Yu are logout") ;
   })
 }

 module.exports = home  = (req, res)=>{
   res.send(req.session.login) ;
 } 
 
  