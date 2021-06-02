const express = require('express')
const bodyparser = require('body-parser')
const fs=require('fs')

const app = express()
var fileName= 'log.txt';
app.use(bodyparser.urlencoded({extended:false}));
app.get('/about',(req,res)=>{
    res.sendFile(__dirname +'/Public/about.html');
})
app.get('/',(req,res)=>{
    
    res.sendFile(__dirname +'/Public/index.html');
})
app.use((req,res,next)=>{
    var d= new Date();
    var content = req.originalUrl +  ":" +d.getHours() +" : "+d.getMinutes()+" : "+d.getSeconds()+" : "+d.toDateString();
    console.log(content);
    // console.log('ban da truy cap '+req.originalUrl);
    // console.log('Thoi gian truy cap ' +d.getHours() +" : "+d.getMinutes()+" : "+d.getSeconds()+" : "+d.toDateString());
    fs.appendFileSync(fileName,'\n'+content);
    next();
})
app.post('/sendUs',(req,res)=>{
    var name = req.body.txtName;
    var email = req.body.txtEmail;
    var country = req.body.Country
    res.end('Hell0 ' + name + ' email : '+ email + country);
})
const PORT= 5000;
app.listen(process.env.PORT || PORT);
console.log("Server is running")