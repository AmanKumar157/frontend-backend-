const express = require('express');
const {UserModel, TodoModel} = require('./db.js');
const jwt= require('jsonwebtoken');
const JWT_SECRET = 'iamankumarr';

mongoose.connect('mongodb://localhost:27017/todoapp');
const app = express();
app.use(express.json());

app.post('/signup',async (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

});

app.post('/signin',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    });
    console.log(user);
    if(user){
        const token= jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({
            message: 'user signed in successfully',
            token: token
        }) 

    }else{
        res.json({
            message: 'user not found'
        })
    }
});

app.post('/todo',auth,(req,res)=>{
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

});
app.get('/todos',auth,(req,res)=>{

});
function auth(req,res,next){
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({message: "Access denied"});
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    }catch(err){
        res.status(401).json({message: "Invalid token"});
    }
}

app.listen(3000);
