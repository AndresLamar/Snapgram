import SearchResults from '@/components/shared/SearchResults'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import GridPostList from './GridPostList'
import { useGetPosts, useGetTrendingTags, useSearchPosts } from '@/lib/react-query/queriesAndMutations'
import useDebounce from '@/hooks/useDebounce'
import Loader from '@/components/shared/Loader'
import { useInView } from "react-intersection-observer";
import { IPostProps, ITrendingTag } from '@/types'
import PostDetailsModal from '@/components/shared/PostDetailsModal'
import ExploreSkeleton from '@/components/skeletons/ExploreSkeleton'
import { TagsSkeleton } from '@/components/skeletons/TagsSkeleton'


function Explore() {
  const [selectedPost, setSelectedPost] = useState<IPostProps | null>(null);

  const handlePostClick = (post: IPostProps) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const { ref, inView} = useInView({
    /* Optional options */
    rootMargin: '500px 500px',
    threshold: 0.1,
  })

  const user_id = localStorage.getItem('userId') ?? ''

  const { data: posts, fetchNextPage, hasNextPage, isPending: isPostFetching} = useGetPosts(6, user_id)

  const {data: trendingTags, isPending: isTrendingTagsPending } = useGetTrendingTags()

  const [searchValue, setSearchValue] = useState('')

  // const observer = useRef<IntersectionObserver>();

  // const lastElementRef = useCallback(
  //   (node: HTMLDivElement) => {
  //     if (isPending) return;

  //     if (observer.current) observer.current.disconnect();

  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasNextPage && !isFetching) {
  //         fetchNextPage();
  //       }
  //     });

  //     if (node) observer.current.observe(node);
  //   },
  //   [fetchNextPage, hasNextPage, isFetching, isPending]
  // );

  const debouncedValue = useDebounce(searchValue, 500)

  const { data: searchedPosts, isFetching: isSearchFetching,  } = useSearchPosts(debouncedValue, user_id)

  useEffect(() => {
    if(inView && !searchValue && hasNextPage) fetchNextPage()
  },[inView, searchValue, fetchNextPage, hasNextPage])

  // if(!posts || isTrendingTagsPending) {
  //   return (
  //     <div className = 'flex-center w-full h-full'>
  //       <Loader />
  //     </div>
  //   )
  // }

  const shouldShowSearchResults = searchValue !== ''
  const shouldShowPosts = !shouldShowSearchResults && 
    posts?.pages.every((item) => item.length === 0);

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h2-bold md:h1-bold w-full ml-4 text-center'>Search Hashtags</h2>
        <div className='flex flex-center gap-1 px-4 md:w-[50%] rounded-lg bg-dark-4'>
          <img 
            src='/assets/icons/search.svg'
            alt='search'
            width={24}
            height={24}
          />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <nav className='hidden md:flex -mt-8'>
            <ul className='flex flex-center text-center flex-wrap gap-3 mt-6'>
              {isTrendingTagsPending ? <TagsSkeleton /> : (
                <>
                  {trendingTags.filter((tag: ITrendingTag) => tag.tag_name !== '').map((tag: ITrendingTag, index: number) => (
                    <li 
                      key={index} 
                      className='explore-tags'
                      onClick={() => setSearchValue(tag.tag_name)}
                    >
                        #{tag.tag_name}
                    </li>
                  ))}
                </>
              )}
              
            </ul>
          </nav>
      </div>

      <div className='flex-between w-full max-w-5xl mt-12 mb-7'>
        <h3 className='body-bold h3-bold md:h2-bold'>Popular Today</h3>

        {/* <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img 
            src="/assets/icons/filter.svg" 
            alt="filter"
            width={20}
            height={20} 
          />
        </div> */}
      </div>

      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {isPostFetching ? (
          <ExploreSkeleton />
        ) : shouldShowSearchResults && searchedPosts ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          /> 
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts?.pages.map((item, index) => {
            if (item)
              return (
                <GridPostList key={`page-${index}`} posts={item} handlePostClick={handlePostClick} />
              );
          })
        )}   
      </div>

      {selectedPost && <PostDetailsModal post={selectedPost} closeModal={closeModal} />}

      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore