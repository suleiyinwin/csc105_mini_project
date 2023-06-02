import React, { useContext, useEffect, useState } from 'react';

import GlobalContext from './GlobalContext';
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Typography, Button, Box, Grid } from '@mui/material';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import PostEditModal from './PostEditModal';
const PostCard=({ postId,title = '', date = '',description='', category='',handleDelete = (id) => {} })=>{
  const {user, setStatus} = useContext(GlobalContext);
  const [openEdit, setOpenEdit] = useState(false);

  const [post, setPost] = useState({
    postId: postId,
    title: title,
    description: description,
    category:category,
    date: date
  });
  console.log(postId);
const handlePostEditOpen = () => {
  setOpenEdit(true);
};
const handlePostEditClose = () => {
  setOpenEdit(false);
};
const handleEdit = () => {
  // handlePostDetailClose();
  handlePostEditOpen();
};
useEffect(()=>{
  console.log(post);
},[]);
    return(
      
       
      <Box sx={{
        display:'flex',
        justifyContent:'center',
        
      }}>
        <Card sx={{width:'100%',
                fontFamily:'Roboto',margin:"1% 0"}}>
          <CardActionArea sx={{bgcolor:'#F5F5F5'}} >
            
            <CardContent>
              {/* input title and description with axios */}
              <Typography variant="h6" component="h1" sx={{fontFamily:'Roboto'}}>
                {post.title}
              </Typography>
              {/* will expand on dot icon */}
              <Typography variant="body1" component="p" sx={{fontFamily:'Roboto'}}>
                {post.description}
              </Typography>
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
            <Box sx={{ flexGrow: 1 }}></Box>
            {/* <Button variant="outlined" startIcon={<CommentRoundedIcon />} onClick={commentToggle} sx={{fontFamily:'Roboto',
                color:'#4059AD'}}>
              Comment
            </Button>
            <CommentModal open={commentOpen} onClose={commentToggle} /> */}
          </CardActions>
        </Card>

      </Box>
        
    )
}
export default PostCard;