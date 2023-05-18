import React from 'react';
import { Box, Typography } from '@mui/material';
const CustomButton=({ text = '', handle = () => {}, fontSize = 16 })=>{
      return(
        <Box
      onClick={handle}
      
    >
      <Typography fontSize={fontSize}>{text}</Typography>
    </Box>
      )

}
export default CustomButton;