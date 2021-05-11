import Product from './product.model'
import User from './user.model'
import bcrypt from 'bcrypt'
import { validateToken, createToken } from '../utils/jwt'
const onlyLetters = new RegExp(/^[a-zA-Z-åäöÅÄÖ\@\. ]+$/)
const router = require("express").Router()

router.route("/login").post((req, res) => {
    User.find({email: req.body.email})
    .then(user => {
        if(user.length <= 0){
            res.status(400).json({ error: "Emailen är inte registrerad" })
        }else{
            const dbPassword = user[0].password
            bcrypt.compare(req.body.password, dbPassword)
            .then((match) => {
                user[0].password = ''
                if (!match) {
                    res.status(400).json({error: 'felaktigt lösenord'})   
                }else if(user[0].admin){
                    const jwtToken = createToken(user[0])
                    res.send({user, jwtToken})
                }else{
                    res.send({user})
                }
            })
        }
        })
        .catch(err => res.status(400).json({ error: "User Doesn't Exist" })
)
    .catch(err => res.send(err))
})

router.route("/validateJWT").post( validateToken, (req, res) => {
    res.send(true)
})

router.route("/registeruser").post( (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = {...req.body, password: hash, admin: false}
        const newUser = User(user)
        newUser.save( err => {
            if (err) {
                return res.status(422).send(err);
            }
            res.json({
                success: true
            })
        } )
    })
    .catch(err => res.status(400).json('Error: ' + err))
    console.log('saved')
})

router.route('/updateuser').post((req, res) => {
    User.findOneAndUpdate({email: req.body.email},req.body,{new: true})
      .then(user => 
        res.json(user))
      .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/removeuser').post( validateToken, (req, res) => {
    User.findOneAndRemove({_id: req.body.id})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/getusers').post( validateToken, (req, res) => {
    User.find({})
    .then(users => res.send(users))
    .catch(err => res.send(err))
})

router.route('/searchproducts').post( (req, res) => {
    const stringified = JSON.stringify(req.body)
    let regex
    const temp_string = JSON.parse(stringified).name.slice(1, -1)
    if(onlyLetters.test(temp_string)){
        regex = new RegExp(temp_string, 'i')
    }else{
        regex = ''
    }

    Product.find({name: regex})
        .then(products => res.send(products))
        .catch(err => res.send(err))
})

router.route("/addproduct").post( validateToken, (req, res) => {
    const newProduct = Product(req.body.product)
    newProduct.save( err => {
        if (err) {
            return res.status(422).send(err);
        }
        res.json({
            success: true
        })
    } )
    console.log('saved')
})

router.route('/updateproduct').post( validateToken, (req, res) => {
    Product.findOneAndUpdate({name: req.body.product.name},req.body.product,{new: true})
      .then(product => 
        res.json(product))
      .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/search').post( (req, res) => {
    Product.find(req.body)
        .then(products => res.send(products))
        .catch(err => res.send(err))
})

// TA INTE BORT - AVSTÄNGD!!!
// router.route('/removeproduct').post( validateToken, (req, res) => {
//     Product.findOneAndRemove({_id: req.body.id})
//         .then(product => res.json(product))
//         .catch(err => res.status(400).json('Error: ' + err))
// })

router.route('/getcart').post( (req, res) => {
    Product.find({_id:{$in:req.body}})
        .then(products => res.send(products))
        .catch(err => res.send(err))
})

export default router