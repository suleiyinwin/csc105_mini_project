import { Box, Grid, IconButton, Modal, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import GlobalContext from "./GlobalContext";
import { format } from 'fecha';

const PostDetailModal=({ post = {}, open = false,handleClose=()=>{}})=>{
  const {user, setStatus} = useContext(GlobalContext);

    const title={
        fontSize:{
            md: '26px',
            xs:'16px'
        }
    } 
    const news={
        padding:{
            md:"4% 16%",
            xs:"5% 6%"
        }
      }
    return(
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: "absolute",
                bgcolor: "white",
                height: { xs: "100%", md: "90%" },
                // overflow:'scroll',
                width: { xs: "100%", md: "60%" },
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                alignItems: "center",
                justifyContent: "center",
                direction: "column",
            }}>
                <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Grid container>
        <Box style={{backgroundColor:'#023047', width:'100%'}}>
            <Grid item xs={12} md={12} sx={news}>
               
                    <Typography variant='h4' sx={title} style={{color:'white'}}>
                    {post.title}
                    </Typography>
               
            </Grid>
            </Box>
            <Grid item xs={12} md={12} sx={news}> 
            <Typography variant='h6' sx={{color:'#023047'}}>
                {user.username}
            </Typography>
            <hr></hr>
            {/* <Typography variant='h6' sx={{color:'#023047'}}>
                Published: {format(new Date(post.date), 'DD/MM/YYYY hh:mm A')}
            </Typography> */}
            <br/>
            <Typography variant='p' sx={{color:'#023047'}}>
                Category: {post.category}
            </Typography>
            
            </Grid>
            <Grid item xs={12} md={12} sx={news}>
            <Typography variant='h6' sx={{color:'#023047'}}>
                Description
            </Typography>
                <br/>
                {post.description}
            </Grid>
            

        </Grid>
          </Box>
        </Modal>
    );
};
export default PostDetailModal;