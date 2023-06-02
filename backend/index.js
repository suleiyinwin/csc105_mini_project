const cors=require('cors');
const express=require('express');
const mysql=require('mysql2');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

const connection=mysql.createConnection({
    host:"server2.bsthun.com",
    port:"6105",
    user:"lab_1ljbcl",
    password:"ms9uPTcGiA3Hgx2h",
    database:"lab_blank01_1l3uvrc"
});
global.connection=connection;

connection.connect();
const port=3000;
const app=express();
app.use(express.json());
app.use(bodyParser.json({type:"application/json"}));
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }));
app.use(cookieParser());
// app.get("/",(req,res)=>{
//     res.send("Hello World!")
// });
app.post("/register", require('./register'));
app.post("/login", require("./login"));
app.get('/me', require('./getUserById'));
app.post("/post",require("./CreatePost"));
app.get("/postsByUser",require('./postsByUser'));
app.patch('/post',require('./editPost'));
app.delete('/post/:postId',require("./deletePost"));

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});                                               