

import { Typography } from '@mui/material';
import React from 'react'
import Button from '../../Button';
import './CommentModal.css'

const CommentModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='commentModalContiner'>
      <div className='commentModal'>
        <Button text={"X"} onclick={onClose} />
        <Typography component={"h1"}>thi is me</Typography>
        {
          children
        }
      </div>

    </div>
  )
}

export default CommentModal