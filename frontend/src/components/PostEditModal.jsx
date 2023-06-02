import { useEffect, useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
// import GlobalContext from '../../../share/Context/GlobalContext';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import Axios from './AxiosFront';
import GlobalContext from './GlobalContext';
// import Axios from '../../../share/AxiosInstance';

const PostEditModal = ({ post = {}, open = false, handleClose = () => {}, setPost = () => {} }) => {
  const [newPost, setNewPost] = useState(post);
  const [error, setError] = useState({});
  const { user, setStatus } = useContext(GlobalContext);
  const validateForm=()=>{
    const error={};
    if(!newPost.title) error.title='Title is required';
    if(!newPost.category) error.category='Category is required';
    if(!newPost.description) error.description='Description is required';
    setError(error);
    if(Object.keys(error).length) return false;
    return true;
  }
  useEffect(() => {
    setNewPost(post);
  }, [post]);
console.log(post.postId);
  const submit = async () => {
    // TODO: Implement update note
    // 1. validate form
    if (!validateForm()) return;
    try{
      // 2. call API to update note
      const userToken=Cookies.get('UserToken');
      const response=await Axios.patch(
        '/post',
        {
            postId: newPost.postId,
          title: newPost.title,
          description: newPost.description,
          category: newPost.category,
          
        },
        {
          headers: {Authorization: `Bearer ${userToken}`},
        }
      );
      // 3. if successful, update note in state and close modal
      if(response.data.success){
        setStatus({severity: 'success', msg:'Update post successfully'});
        // setPosts((prev)=> prev.map((n)=>(n.id===newPost.id?
        //   response.data.data :n)));
        console.log(response.data)
        setPost(newPost);
          resetAndClose();
      }
    } catch (error){
      // 4. if update note failed, check if error is from calling API or not
      if(error instanceof AxiosError && error.response){
        setStatus({severity: 'error', msg: error.response.data.error});
      } else{
        setStatus({severity:'error', msg: error.message});
      }
    }
    
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setNewPost(post);
      setError({});
    }, 500);
    handleClose();
  };

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={resetAndClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={newPost.title}
          onChange={handleChange}
          error={!!error.title}
          helperText={error.title}
        />
        <TextField
          
          margin="dense"
          id="category"
          name="category"
          label="Category"
          fullWidth
          variant="outlined"
          value={newPost.category}
          onChange={handleChange}
          error={!!error.category}
          helperText={error.category}
        />
        <TextField
          required
          multiline
          margin="dense"
          id="description"
          name="description"
          label="Description"
          placeholder="Write your posts here..."
          fullWidth
          value={newPost.description}
          onChange={handleChange}
          error={!!error.description}
          helperText={error.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={resetAndClose} color="error" sx={{ textTransform: 'capitalize' }}>
          Cancel
        </Button>
        <Button onClick={submit} type="submit" sx={{ textTransform: 'capitalize' }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostEditModal;