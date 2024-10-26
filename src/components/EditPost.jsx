import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material'

export function EditPostModal({ open, onClose, post, onSave }) {
  const [title, setTitle] = useState(post?.title || '')
  const [contents, setContents] = useState(post?.contents || '')

  useEffect(() => {
    setTitle(post?.title || '')
    setContents(post?.contents || '')
  }, [post])

  const handleSave = () => {
    onSave({ ...post, title, contents })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Title'
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin='normal'
        />
        <TextField
          fullWidth
          label='Contents'
          variant='outlined'
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          multiline
          rows={4}
          margin='normal'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary' variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EditPostModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string,
    contents: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
}
