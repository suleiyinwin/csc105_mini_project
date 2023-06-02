import { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import GlobalContext from './GlobalContext';
import Axios from './AxiosFront';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
//handleOpen,hC,postarr
const PostCreateModal=({ open = false, post=()=>{}, handleClose = () => {}, setPosts = () => {} })=>{
 
    //input
    const [newPost, setNewPost] = useState({
        title: '',
        category:'',
        description: '',
      });
      const [error, setError] = useState({});
      const { setStatus } = useContext(GlobalContext);
    const validateForm=()=>{
        const error={};
        if(!newPost.title) error.title='Title is required';
        if(!newPost.category) error.category='Category is required';
        if(!newPost.description) error.description='Description is required';setError(error);
        if(Object.keys(error).length) return false;
        return true;
      }
      const submit = async () =>  {
        if(!validateForm()) return;
        try{
          const userToken = Cookies.get('UserToken');
          const response = await Axios.post('/post', newPost, {
            headers: { Authorization: `Bearer ${userToken}`},
          })
          console.log(response.data);
          if(response.data.success){
            setPosts((prev) => [...prev, response.data.data]);
            resetAndClose();
          }
        } catch (error) {
          if(error instanceof AxiosError && error.response) {
            setStatus({severity:'error', msg:error.response.data.error});
      } else {
        // TODO: show status of other errors here
        setStatus({severity:'error',msg: error.message});
      }
        }
        // setPosts([...post,newPost]);
        // setNewPost(" ");
        // setError(true);
        // handleClose();
        
      };
      const resetAndClose = () => {
        setTimeout(() => {
          setNewPost({
            title: '',
            category:'',
            description: '',
          });
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
      return(
        <Dialog fullWidth maxWidth="sm" open={open} onClose={resetAndClose}>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
      <TextField
          
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
          
          multiline
          margin="dense"
          id="description"
          name="description"
          label="Description"
          placeholder="Write your post here..."
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
          Post
        </Button>
      </DialogActions>
      </Dialog>
      )
}
export default PostCreateModal;
