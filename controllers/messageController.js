

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
            message ,receiverID , senderID : req.session.user._id, user:req.session.user._id}) ;
            let sendMess = sendM.save();
            sendMess ? res.status(200).json("Message sent") : res.status(204).json("Message not sent");     
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
    aMessage ?res.status(200).json(aMessage) : res.status(204).json("Failed to fetch Message") ;
   }catch(err){
      console.log(err) ;
   }
}


// get all Message
module.exports = getAllMessage = (req, res)=>{

 messageModel.find({$or :  [{receiverID: req.session.user._id }, {senderID:  req.session.user._id}] }).populate({path:'user', select: 'email fullName'}).exec().
 then((data) => {
  data ? res.json(data) : res.status(204).json("Can not fetch message");
 })
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
         edit ? res.status(200).json("Message edited") : res.status(204).json("Fail to edit") ;
        
    }catch(err){
        console.log(err);
    }
}

// deleteMessage
module.exports = deleteMessage = async(req, res)=>{
    try{
        let delM = await messageModel.findByIdAndDelete(req.body.id) ;
        delM ? res.send("message delete") : res.status(204).json("Message failed to Delete") ;
    }catch(err){
      console.log(err) ;
    }
    
}







