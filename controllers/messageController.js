

const messageModel = require("../model/messageScema") ;


// create Message
module.exports = createMessage =(req, res)=>{
    let{message ,receiverID } = req.body ;

    if(Object.keys(req.body).length < 1 ){
        res.send("You can not send empty message")
    }else{
       // sinking data into collection
      try{
        let sendM = new messageModel({
            message ,receiverID , senderID : req.session.user._id, user:req.session.user._id
           }) ;
           sendM.save();
           res.send("Message sent")
      }catch(err){
        console.log(err) ;
      } ;

    }
}

// Get a Message 
module.exports = getAMessage = async(req, res)=>{
    let ID = req.body.id ;
   try{
    let aMessage = await messageModel.findById(ID).populate({path:'user', select: 'email fullName'}).exec();
    res.json(aMessage);
   }catch(err){
      console.log(err) ;
   }
}


// get all Message
module.exports = getAllMessage =  (req, res)=>{

 messageModel.find({$or :  [{receiverID: req.session.user._id }, {senderID:  req.session.user._id}] }).populate({path:'user', select: 'email fullName'}).exec().
 then(data => res.json(data))
 .catch((err)=>{
    console.log(err)
 });
  
}


// edit Message
module.exports = editMessage= async(req, res)=>{
    const{ message, id}  = req.body ;

    try{
        let edit = await messageModel.findByIdAndUpdate(id, {
            message
         }) ;
         res.json("Message edited");
        
    }catch(err){
        console.log(err);
    }
}

// deleteMessage
module.exports = deleteMessage = async(req, res)=>{
    try{
        await messageModel.findByIdAndDelete(req.body.id) ;
        res.send("message delete");
    }catch(err){
      console.log(err) ;
    }
    
}







