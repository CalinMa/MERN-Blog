import { PostList } from './components/PostList.jsx'
import CreatePost from './components/createPost.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts.js'
import { useState } from 'react'
import { useDebounce } from './hooks/useDebounce'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // Debounced values to avoid unnecessary API calls on every change
  const debouncedAuthor = useDebounce(author, 300)
  const debouncedSortBy = useDebounce(sortBy, 300)
  const debouncedSortOrder = useDebounce(sortOrder, 300)

  const postsQuery = useQuery({
    queryKey: [
      'posts',
      { debouncedAuthor, debouncedSortBy, debouncedSortOrder },
    ],
    queryFn: () =>
      getPosts({
        author: debouncedAuthor,
        sortBy: debouncedSortBy,
        sortOrder: debouncedSortOrder,
      }),
  })

  const posts = postsQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
        fields={['createdAt', 'updatedAt']}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
