const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const jwtToken = req.body.jwtToken
  
    if (!jwtToken){
        console.log('tokens doesnt exist')
        //res.status(400).json({ error: "User not Authenticated!" })
        return res.redirect('/')
    }
  
    try {
      const validToken = jwt.verify(jwtToken, process.env.JWT_SECRET)
      if (validToken) {
        return next()
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
}

const createToken = (user) => {
    return( 
        jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET
        )
    )
}

const validateTokenGraphql = (jwtToken) => {

  if (!jwtToken){
      console.log('tokens doesnt exist')
      return res.status(400).json({ error: "User not Authenticated!" })
  }

  try {
    const validToken = jwt.verify(jwtToken, process.env.JWT_SECRET)
    console.log(validToken)
    return validToken
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}

module.exports = { validateToken, validateTokenGraphql, createToken }