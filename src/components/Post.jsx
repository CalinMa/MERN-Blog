import PropTypes from 'prop-types'
import { Typography, Box, Button, Stack } from '@mui/material'

export function Post({ title, contents, author, onDelete, onUpdate }) {
  return (
    <Box
      component='article'
      p={2}
      border={1}
      borderColor='grey.300'
      borderRadius={2}
      mb={2}
    >
      <Typography variant='h6' component='h3'>
        {title}
      </Typography>
      <Typography variant='body1' mt={1}>
        {contents}
      </Typography>
      {author && (
        <Box mt={2}>
          <Typography variant='body2' color='text.secondary'>
            Written by{' '}
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
              component='span'
            >
              <strong>{author}</strong>
              <Button
                variant='outlined'
                color='error'
                size='small'
                onClick={onDelete}
              >
                Delete
              </Button>
              <Button
                variant='outlined'
                color='info'
                size='small'
                onClick={onUpdate}
              >
                Update
              </Button>
            </Stack>
          </Typography>
        </Box>
      )}
    </Box>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}
