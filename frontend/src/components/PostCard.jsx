import React from 'react';
import { Box, Typography } from '@mui/material';
import { format } from 'fecha';

const PostCard=({ title = '', date = '', category='',handleClick = () => {} })=>{
    return(
        <Box onClick={handleClick}
            sx={{
        backgroundColor: 'white',
        padding: '6px 18px',
        borderRadius: 3,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.6)',
          transform: 'scale(1.05)',
          transition: 'all 0.1s ease-in-out',
        },
      }}>
        <Typography
        fontSize={26}
        paddingY={2}
        sx={{ color: '#2B2B2B' }}
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {title}
      </Typography>
      {/* <Typography align="right" fontSize={14} sx={{ color: '#9E9E9E' }}>
        {format(new Date(date), 'DD/MM/YYYY hh:mm A')}
      </Typography> */}
            
        </Box>
    )
}
export default PostCard;