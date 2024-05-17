import { IPostProps } from '@/types'
import Loader from './Loader'
import GridPostList from '@/_root/pages/GridPostList'
import { useState } from 'react'
import PostDetailsModal from './PostDetailsModal'

type SearchResultsProps = {
  isSearchFetching: boolean
  searchedPosts: IPostProps[]
}

function SearchResults({ isSearchFetching, searchedPosts }: SearchResultsProps) {
  const [selectedPost, setSelectedPost] = useState<IPostProps | null>(null);

  const handlePostClick = (post: IPostProps) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  if(isSearchFetching) return <Loader /> 

  if(searchedPosts?.length > 0){
    return (
      <>
        <GridPostList posts={searchedPosts} handlePostClick={handlePostClick}/>
        {selectedPost && <PostDetailsModal post={selectedPost} closeModal={closeModal} />}

      </>
    )
  } 

  return (
    <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
  )
}

export default SearchResults