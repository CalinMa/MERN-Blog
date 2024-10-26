import PropTypes from 'prop-types'
import { Post } from './Post.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost, updatePost } from '../api/posts.js'
import { EditPostModal } from './EditPost.jsx'
import { useState } from 'react'

export function PostList({ posts = [] }) {
  const queryClient = useQueryClient()
  const [selectedPost, setSelectedPost] = useState(null)
  const [isEditModalOpen, setEditModalOpen] = useState(false)

  const deletePostMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
    onSettled: () => {
      queryClient.refetchQueries(['posts'])
    },
  })
  const updatePostMutation = useMutation({
    mutationFn: ({ postId, updatedPost }) => updatePost(postId, updatedPost),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
    onSettled: () => {
      queryClient.refetchQueries(['posts'])
    },
  })

  const handleUpdate = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId)
    setSelectedPost(postToEdit)
    setEditModalOpen(true)
  }
  const handleDelete = (postId) => {
    deletePostMutation.mutate(postId)
  }
  const handleSave = (updatedPost) => {
    updatePostMutation.mutate({ postId: updatedPost._id, updatedPost })
  }
  return (
    <div>
      {posts.map((post) => (
        <Post
          {...post}
          key={post._id}
          onDelete={() => handleDelete(post._id)}
          onUpdate={() => handleUpdate(post._id)}
        />
      ))}
      <EditPostModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        post={selectedPost}
        onSave={handleSave}
      />
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      author: PropTypes.string,
      contents: PropTypes.string,
      tags: PropTypes.array,
      onDelete: PropTypes.func,
      onUpdate: PropTypes.func,
    }),
  ).isRequired,
}
