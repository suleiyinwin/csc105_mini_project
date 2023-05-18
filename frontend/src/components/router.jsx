import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Post from './Post';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/post/:postId', element: <Post /> },
    ],
  },
]);

export default router;
