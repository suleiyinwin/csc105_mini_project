import { useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import './App.css'
import router from './components/router';

export default function App() {

  return (
       <RouterProvider router={router} />
  )
}