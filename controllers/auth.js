const Cryptr = require('cryptr')
const startEncrypt = new Cryptr('kepobanget')
const jwt = require('jsonwebtoken')
const models = require('../models/')
const User = models.user

exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ where: {email, password}})
    .then(user => {
        if(user){
            const token = jwt.sign({ userId: user.id }, 'lolazeita')
            res.send({
                user,
                token
            })
        }
        else {
            res.send({
                error: true,
                message: "Wrong Email Or Password Dude ! ! !"
            })
        }
    })
}

//Register

exports.register = (req, res) => {

    //validasi field
    const { name, password, email } = req.body
    if (!name || !password || !email) {
        return res.status(400).json({
            error: true,
            message: "Please Inser Field Correctly"
        })
    }
  
    //validasi User Terdaftar
    User.findOne({ where: { email } }).then(user => {
        if (!user) {
            req.body.password = startEncrypt.encrypt(req.body.password)
            const token = jwt.sign({
              userId : req.body
            }, 'lolazeita')
  
            User.create(req.body).then(data => {
              res.send({
                data,
                token
              })
            })
        }
  
        else {
          res.send({
            error : true,
            message: "Email already exists"
          })
        }
    }
    ). catch(err => {
      res.send({
        error: true,
        message: `Error : ${err}`
      })
    })
  }