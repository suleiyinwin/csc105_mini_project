const mysql=require('mysql2');
var jwt = require("jsonwebtoken");

module.exports=(req,res)=>{
    const token = req.cookies.UserToken;
	var decoded = jwt.verify(token, "ZJGX1QL7ri6BGJWj3t");
    const title=req.body.title;
    const category=req.body.category;
    const description=req.body.description;
    // const visibility=req.body.visibility;
    connection.query("Insert into posts (userId,title,description,category) values (?,?,?,?)",[decoded.user.id,title,description,category],(err,rows)=>{
        if(err) {
            return res.json({
                success: false,
                data: null,
                error: err.message,
            });
        }
        else{
            console.log(rows);
            const newPost = {
                title:title,
                description:description,
                id: rows.insertId,
                // visibility:visibility,
                userId:decoded.user.id,
            }
                res.json({
                    success: true,
                    data: newPost,
                    message: "Post created",
                });
        }
    })
}