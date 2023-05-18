const mysql=require('mysql2');
const bcrypt=require('bcrypt');
module.exports=async(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password1=req.body.password1;
    
    const salt1=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password1,salt1);

    var sql=mysql.format(
        `Insert into Users (username,email,password) values (?,?,?)`, [username,email,hashPassword]
    );

    connection.query(sql,(err,rows)=>{
        if(err){
            return res.json({
                success: false,
                data:null,
                error:err.message,
            });
        }
        res.json({
            success:true,
            message:'User has been created',
        });
    });
   
};