
const mysql=require('mysql2');
const bcrypt=require('bcrypt');
var jwt = require("jsonwebtoken");

module.exports=(req,res)=>{
	const token = req.cookies.UserToken;
	var decoded = jwt.verify(token, "ZJGX1QL7ri6BGJWj3t");
	console.log(decoded);
	console.log(decoded.user.id);

	connection.query("SELECT * FROM Users WHERE id = ?",[decoded.user.id], (err,rows) => {
        if(err) {
            res.json({
                success: false,
                data: null,
                error: err.message,
            });
        } else {
            res.json({
                success: true,
                user: rows[0],
                error: null,
            });
        }
    });

}