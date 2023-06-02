 
const mysql=require('mysql2');
const bcrypt=require('bcrypt');

module.exports=(req,res)=>{
	const postId=req.params.postId;
    // console.log(postId);
	connection.query("SELECT * FROM posts WHERE id = ?",[postId], (err,rows) => {
        if(err) {
            res.json({
                success: false,
                data: null,
                error: err.message,
            });
        } else {
            res.json({
                success: true,
                data: rows[0],
                error: null,
            });
        }
    });

}