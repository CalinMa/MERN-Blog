import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'
import { TextField, Button, Typography, Grid2 } from '@mui/material'
// import Grid2 from '@mui/material/Unstable_Grid2';

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h5' gutterBottom>
        Create a New Post
      </Typography>

      <Grid2 container spacing={2} direction={'column'}>
        <Grid2 xs={12}>
          <TextField
            fullWidth
            label='Title'
            variant='outlined'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid2>

        <Grid2 xs={12}>
          <TextField
            fullWidth
            label='Author'
            variant='outlined'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Grid2>

        <Grid2 xs={12}>
          <TextField
            fullWidth
            label='Contents'
            variant='outlined'
            multiline
            rows={4}
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          />
        </Grid2>

        <Grid2 xs={12}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={!title || createPostMutation.isPending}
          >
            {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
          </Button>
        </Grid2>

        {createPostMutation.isSuccess && (
          <Grid2 xs={12}>
            <Typography color='success.main'>
              Post created successfully!
            </Typography>
          </Grid2>
        )}
      </Grid2>
    </form>
  )
}
