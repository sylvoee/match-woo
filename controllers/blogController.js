 module.exports = postBlog = (req, res)=>{
    res.send({msg : req.body});
    let email = req.body.email;
    console.log(email);
    
  }

  module.exports = getBlogPost =  (req, res)=>{
    res.send("This is home page");
}