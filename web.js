const express = require('express')
const bodyparser = require('body-parser')

const app = express()
app.use(bodyparser.urlencoded({extended:false}));


app.use((req, res, next)=>{
    var d = new Date();
    var content = req.originalUrl + ":" + d.toDateString()
        + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(); 
    console.log(content);
    fs.appendFileSync(fileName, '\n' + content);
    next();
})

app.post('/sendUs',(req, res)=>{
    var name = req.body.txtName;
    var email = req.body.txtEmail;
    var country = req.body.country;
    res.end('xin chao ' + name + " : " + email + " : " + country );  
  

})

app.get('/', (req, res)=>
{
    //res.end('Hello     World');
    res.sendFile(__dirname + '/Public/index.html');
})

app.get('/about' ,(req,res)=>{
    res.sendFile(__dirname + '/Public/about.html');

})


const PORT =5000;
app.listen(process.env.PORT || PORT);
console.log('Server is running')