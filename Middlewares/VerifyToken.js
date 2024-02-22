const verifyToken = (err, req, res, next)=>{
  let secretKey = process.env.SECRET_KEY
  const authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("Auth Header:", authHeader);
  if (!authHeader) {
    res.status(400).send({message: "Authourization not provided"})
  }else{
    if (!authHeader.startswith("Bearer")) {
    res.status(400).send({message: "Invalid Authourization format"})
      
    }else{
      let token = authHeader.split(" ")[1]
      Jwt.verify(token, secretKey, (err, decode)=>{
        if (err) {
          res.status(400).send({message: "Error verifying token"})
        } else {
          console.log("received details: ", decode.user);
          req.user = decode.user
          next()
        }
      })
    }
  }
}

module.exports= verifyToken