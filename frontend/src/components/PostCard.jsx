import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const PostCard=({ title = '', date = '', category='',handleClick = () => {} })=>{
    return(
      <Card onClick={handleClick} style={{ borderRadius: "20px" }}>
      <CardContent style={{ backgroundColor: "#F0F0F0" }}>
        <Typography variant="subtitle1" color="#023047">
          {category}
        </Typography>
        <br />
        <Typography
          variant="h6"
          color="#000000"
          height="100px"
          overflow="hidden"
        >
          {title}
        </Typography>
        <br />
        <Typography variant="subtitle1" color="#023047">
          {date}
        </Typography>
      </CardContent>
    </Card>
        
    )
}
export default PostCard;