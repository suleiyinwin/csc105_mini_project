import { useEffect, useState, useContext } from "react";
import {
  Stack,
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CustomButton from "./CustomButton";
import GlobalContext from "./GlobalContext";
import Cookies from "js-cookie";
import Axios from "./AxiosFront";
import PostCreateModal from "./PostCreateModal";
import PostDetailModal from "./PostDetailModal";
import PostDeleteModal from "./PostDetailModal";
import PostCard from "./PostCard";
import PostEditModal from "./PostEditModal";
import { createTheme, ThemeProvider } from "@mui/material";

const Home = () => {
  const { user, setStatus } = useContext(GlobalContext);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [targetPost, setTargetPost] = useState({});
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   // TODO: Implement get posts by user's token
  //   // 1. check if user is logged in
  //   const userToken = Cookies.get('UserToken');
  //   if (userToken !== undefined && userToken !== 'undefined') {
  //     // 2. call API to get posts
  //     Axios.get('/posts', { headers: { Authorization: `Bearer ${userToken}` } }).then((res) => {
  //       // 3. set posts to state
  //       setPosts(res.data.data);
  //     });
  //   }
  // }, [user]);

  // Post Create Modal
  const handlePostCreateOpen = () => {
    if (!user) {
      setStatus({
        msg: 'You must login to create post',
        severity: 'error',
      });
    } else {
    setOpenCreate(true);
    }

    setTimeout(() => setStatus(), 2000);
  };
  const handlePostCreateClose = () => {
    setOpenCreate(false);
  };
  // Post Edit Modal
  const handlePostEditOpen = () => {
    setOpenEdit(true);
  };
  const handlePostEditClose = () => {
    setOpenEdit(false);
  };

  // Post Detail Modal
  const handlePostDetailOpen = () => {
    setOpenDetail(true);
  };
  const handlePostDetailClose = () => {
    setOpenDetail(false);
  };

  const handleTargetPostChange = (post) => {
    setTargetPost(post);
    handlePostDetailOpen();
  };

  // Edit Post
  const handleEdit = () => {
    handlePostDetailClose();
    handlePostEditOpen();
  };

  // Delete Post
  // const handleDelete = async () => {
  //   // TODO: Implement delete post
  //   try{
  //     // 1. call API to delete post
  //   const userToken=Cookies.get('UserToken');
  //   const response=await Axios.delete(`/post/${targetPost.id}`,{
  //     headers:{Authorization:`Bearer ${userToken}`},
  //   });
  //   // 2. if successful, set status and remove post from state
  //   if(response.data.success) {
  //     setStatus({severity:'success',msg:'Delete post successfully'});
  //     setPosts(posts.filter((n)=>n.id!==targetPost.id));
  //     handlePostDetailClose();}
  //   }catch(error){
  //     // 3. if delete post failed, check if error is from calling API or not
  //     if(error instanceof AxiosError && error.response) {
  //       setStatus({severity:'error',msg:error.response.data.error});
  //     }else{
  //       setStatus({severity:'error',msg:error.message});
  //     }
  //   }
  // };
  const entry = {
    padding: "6% 6% 2% 6%",
    backgroundColor: "#A3D6EE",
    color: "#023047",
    borderBottom: 1,
    borderColor: "#023047",
  };
  const theme = createTheme({
    typography: {
      fontFamily: ["Roboto", "Arial"].join(","),
    },
  });
  return (
    <Box>
      <PostDetailModal
        post={targetPost}
        open={openDetail}
        handleClose={handlePostDetailClose}
        handleEdit={handleEdit}
        // handleDelete={handleDelete}
      />
      <PostEditModal
        post={targetPost}
        open={openEdit}
        handleClose={handlePostEditClose}
        setPosts={setPosts}
      />
      <PostCreateModal
        open={openCreate}
        handleClose={handlePostCreateClose}
        post={posts}
        setPosts={setPosts}
      />
      <Box sx={entry}>
        <Grid container>
          <Grid item md={7} sm={12} xs={12}>
            <Typography variant="h3">What today?</Typography>
            <br />
            <Typography variant="h6" theme={theme}>
              I stay up through the night; because that is when the moon and I have our conversations.<br/>
              I tell her about how I drown in the sparkle of your brown eyes and she tells me about how the makes__ even the darkest parts of__ her shine.
            </Typography>
          </Grid>
          <Grid item sx={{ display: { xs: "none", md: "block" } }} md={5}>
            <img
              style={{ padding: "0 0 0 15%" }}
              src="./assets/greentypewriter.png"
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={4}
        >
          <Box
            sx={{
              backgroundColor: "#023047",
              "&:hover": {
                //you want this to be the same as the backgroundColor above
                backgroundColor: "#023047",
              },
              color: "white",
              border: "1px solid #023047",
              borderRadius: "30px",
              textTransform: "none",
              padding: "10px 22px 10px 20px",
            }}
          >
            <CustomButton
              text="Create Post"
              handle={handlePostCreateOpen}
              fontSize={18}
            />
          </Box>
        </Stack>
      </Box>
      <Container maxWidth="md">
        {user ? (
          posts.length === 0 ? (
            <Typography
              textAlign="center"
              fontSize={18}
              color="black"
              fontWeight={300}
              marginTop={8}
            >
              No post to show... <br />
              Let's create a new post.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {posts.map((post, index) => (
                <Grid item xs={4} key={index}>
                  <PostCard
                    title={post.title}
                    date={post.updatedAt}
                    category={posts.category}
                    handleClick={() => handleTargetPostChange(post)}
                  />
                </Grid>
              ))}
            </Grid>
          )
        ) : (
          <Typography
            textAlign="center"
            fontSize={18}
            color="white"
            fontWeight={300}
            marginTop={8}
          >
            No post to show... <br />
            Please login to create a new post.
          </Typography>
        )}

         
       </Container>
    </Box>
  );
};
export default Home;
