import React, { useContext, useEffect, useState } from 'react';

import GlobalContext from './GlobalContext';
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Typography, Button, Box, Grid, CardMedia } from '@mui/material';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import { format } from "date-fns";
import PostDetailModal from './PostDetailModal';
import { format } from 'fecha';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PostEditModal from './PostEditModal';
const PostCard=({ postId,title = '', date = '',description='', category='',handleDelete = (id) => {} })=>{
  const {user, setStatus} = useContext(GlobalContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail,setOpenDetail]=useState(false);
  const [post, setPost] = useState({
    postId: postId,
    title: title,
    description: description,
    category:category,
    date: date
  });
  
  // console.log(postId);
const handlePostEditOpen = () => {
  setOpenEdit(true);
};
const handlePostEditClose = () => {
  setOpenEdit(false);
};
const handlePostDetailOpen=()=>{
  setOpenDetail(true);
};
const handlePostDetailClose=()=>{
  setOpenDetail(false);
};


const handleDetail=()=>{
  handlePostDetailOpen();
};
const handleEdit = () => {
  // handlePostDetailClose();
  handlePostEditOpen();
};
useEffect(()=>{
  console.log(post);
},[]);


// console.log(formattedDate);
    return(
      
       
      <Box sx={{
        display:'flex',
        justifyContent:'center',
        
      }}>
        
        <Card sx={{width:'100%',
                fontFamily:'Roboto',margin:"1% 0"}}>
          <CardActionArea  sx={{bgcolor:'#F5F5F5'}} >
            
            <CardContent>
              {/* input title and description with axios */}
              <Typography variant="subtitle1" color="#023047" sx={{fontFamily:'Roboto'}}>
                {post.category}
              </Typography>
              {/* will expand on dot icon */}
              <Typography variant="h6" color="#000000"  sx={{fontFamily:'Roboto',fontSize:'22px'}}>
                {post.title}
              </Typography>
              {/* <Typography variant="subtitle1" color="#023047">
              {format(new Date(date), 'DD/MM/YYYY hh:mm A')}
                        </Typography> */}
            </CardContent>
           
          </CardActionArea>
          
          <CardActions disableSpacing sx={{ display: 'flex' }}>
            
            <IconButton onClick={handlePostEditOpen}  aria-label="edit post" sx={{color:'#4059AD'}}>
              <ModeEditRoundedIcon />
            </IconButton>
            <PostEditModal setPost={setPost} handleEdit={handleEdit} handleClose={handlePostEditClose} open={openEdit} post={post} />

            <IconButton onClick={()=>handleDelete(post.postId)} aria-label="delete post" sx={{color:'#4059AD'}}>
              <DeleteRoundedIcon />
            </IconButton>
            <Button onClick={handleDetail}>
              Details
           </Button>
           <PostDetailModal handleDetail={handleDetail} handleClose={handlePostDetailClose}   open={openDetail} post={post}/>
            <Box sx={{ flexGrow: 1 }}></Box>
            
          </CardActions>
        </Card>

      </Box>
        
    )
}
export default PostCard;