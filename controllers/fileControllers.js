const fileModel = require('../model/fileSchema');
let fs = require('fs');
const multer  = require('multer');
// upload
module.exports = upload = multer({ dest: 'myUploads/' })

module.exports = uploadFile = (req, res)=>{
 
     console.log(req.file);
    let aFile = new fileModel({
        fileName : req.file.filename,
        src : `myUploads/${req.file.filename}`,
        user : req.session.user._id
    });

    try {
         let saveFile = aFile.save() ;
     saveFile ?    res.status(200).json("photo upload successful") : res.status(200).json("File upload failed")
    } catch (error) {
        res.send({err : error});
    }
  
  }

    // read all file
    module.exports = viewFile  = async(req, res)=>{

        try {
          // read all file
             let docs = await fileModel.find({}).exec();
          docs ?   res.status(200).json({docs}) : res.status(200).json("No record found") ;
            // console.log(docs);
        } catch (error) {
              res.status(200).send("No record found/ error")     
        }
         
        }


        // read a file
    module.exports = viewAFile  = async(req, res)=>{

      try {
        // read all file
           let docs = await fileModel.find({fileName: req.body.id}).exec();
        docs ?   res.status(200).json({docs}) : res.status(200).json("No record found") ;
        
      } catch (error) {
            res.status(200).send("Error")     
      }
       
      }


        
        // delete file
        module.exports = deleteFile = async(req, res)=>{
          let ID = req.body.fileName; 
         
          try {
            let dFile = await fileModel.findOneAndDelete({fileName : ID});
            // remove file from the folder
            fs.unlinkSync('./myUploads/'+ ID)  ;   
      
            dFile ? res.status(200).json("File successfully deleted") : res.status(200).json("Failed to delete")  ;
           
          } catch (error) {  res.send(error) ;}
          
          

        
              
        }