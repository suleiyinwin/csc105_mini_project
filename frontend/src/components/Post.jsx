import React from 'react';
import { useParams } from 'react-router-dom';
const Post=()=>{
    const { postId } = useParams();

  return <div>Post id : {postId}</div>;
}
export default Post;