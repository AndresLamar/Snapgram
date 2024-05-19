import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createUserAccount, signInAccount, getFollows,followUser, createPost, getRecentPosts, likePost, savePost, getPostById, updatePost, deletePost, getInfinitePosts, searchPosts, getLikes, getSaves, getUsers, getPostsSavedByuser, getUserById, getPostsForUser, getPostsLikedForUser, getTrendingTags, getCommentsForPost, createComment, getStats } from "@/services/api";
import { INewUser, INewPost, IUpdatePost, IUpdateUser, INewComment } from '@/types'
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { updateProfile } from '../../services/api';


export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useGetUsers = (limit: number) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: ({ pageParam }) => getUsers({ pageParam, limit }),
        initialPageParam: 0,
        getNextPageParam: (lastPage ) => {
            const pageNumber = lastPage[0]?.pageNumber

            if (lastPage && lastPage.length === 0) {
                return null;
            }
   
            return pageNumber; 
        }
    });
};

export const useGetUserById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, id],
        queryFn: () => getUserById(id),
        
    })
}

export const useGetPostsForUser = (limit: number, userId: string) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_USER_POSTS],
        queryFn: ({ pageParam }) => getPostsForUser({ pageParam, limit, userId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage ) => {
            const pageNumber = lastPage[0]?.pageNumber

            if (lastPage && lastPage.length === 0) {
                return null;
            }
   
            return pageNumber; 
        },
    });
};

export const useGetPostsLikedForUser = (limit: number, userId: string) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_USER_LIKED_POSTS],
        queryFn: ({ pageParam }) => getPostsLikedForUser({ pageParam, limit, userId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage ) => {
            const pageNumber = lastPage[0]?.pageNumber

            if (lastPage && lastPage.length === 0) {
                return null;
            }
   
            return pageNumber; 
        },
    });
};

export const useGetFollowersForUser = (userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_FOLLOWS_FOR_USER, userId],
        queryFn: () => getFollows(userId),
        enabled: !!userId 
    })
}

export const useGetSavedPostsForUser = (limit: number, userId: string) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS_FOR_USER],
        queryFn: ({ pageParam }) => getPostsSavedByuser({ pageParam, limit, userId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage ) => {
            const pageNumber = lastPage[0]?.pageNumber

            if (lastPage && lastPage.length === 0) {
                return null;
            }
   
            return pageNumber; 
        },
    });
};

export const useFollowUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({followerId, followingId, isFollow}: {followerId: string, followingId: string, isFollow: boolean}) => followUser(followerId, followingId, isFollow),
        onSuccess: (_data, variables) => {
            const { followingId } = variables;

            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_FOLLOWS_FOR_USER, followingId] })

            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER_BY_ID, followingId] })   
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (user: IUpdateUser) => updateProfile(user),
        // eslint-disable-next-line 
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.id]
            })
        }
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string, 
            password: string
        }) => signInAccount(user)
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
};

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
} 

export const useGetPostById = (postId: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId 
    })
}

export const useGetCommetsForPost = (limit: number, postId: number) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GEt_COMMENTS_FOR_POST],
        queryFn: ({ pageParam }) => getCommentsForPost({ pageParam, limit, postId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage ) => {
            const pageNumber = lastPage[0]?.pageNumber

            if (lastPage && lastPage.length === 0) {
                return null;
            }
   
            return pageNumber; 
        },
    });
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (comment: INewComment) => createComment(comment),
      onMutate: async (comment) => {
        await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_STATS_FOR_POST, comment.post_id] });
        const previousData = queryClient.getQueryData([QUERY_KEYS.GET_STATS_FOR_POST, comment.post_id]);

        queryClient.setQueryData([QUERY_KEYS.GET_STATS_FOR_POST, comment.post_id], (oldData: any) => {
            console.log(oldData)
            return {
                ...oldData,
                comment_count: oldData.comment_count + 1
            }
        })

        return { previousData, comment };
    },
    onError: (error, _variables, context) => {
        console.error(error)
        
        if(context?.previousData != null && context?.comment.post_id != null) {
            queryClient.setQueryData([QUERY_KEYS.GET_STATS_FOR_POST, context.comment.post_id], context?.previousData);
        }
    },
      onSuccess: async () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GEt_COMMENTS_FOR_POST],
        });
      }
    });
};

export const useGetStatsForPost = (postId: number, userId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_STATS_FOR_POST, postId],
        queryFn: () => getStats(postId, userId),
        enabled: !!postId 
    })
}

export const useGetLikesForPost = (postId: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_LIKES_FOR_POST, postId],
        queryFn: () => getLikes(postId),
        enabled: !!postId 
    })
}

export const useGetSavesForPost = (postId: number) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_SAVES_FOR_POST, postId],
        queryFn: () => getSaves(postId),
        enabled: !!postId 
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (post: IUpdatePost) => updatePost(post),
        // eslint-disable-next-line 
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.id]
            })
        }
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ postId }: { postId: number}) => deletePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, userId, isLike}: {postId: number, userId: string, isLike: boolean}) => likePost(postId, userId, isLike),
        onMutate: async ({postId}) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_STATS_FOR_POST, postId] });
            const previousData = queryClient.getQueryData([QUERY_KEYS.GET_STATS_FOR_POST, postId]);

            queryClient.setQueryData([QUERY_KEYS.GET_STATS_FOR_POST, postId], (oldData: any) => {
                return {
                    ...oldData,
                    has_liked: oldData.has_liked === true ? false : true,
                    likes_count: oldData.has_liked === true ? oldData.likes_count - 1 : oldData.likes_count + 1
                }
            })

            return { previousData, postId };
        },
        onError: (error, _variables, context) => {
            console.error(error)
            
            if(context?.previousData != null && context?.postId != null) {
                queryClient.setQueryData([QUERY_KEYS.GET_STATS_FOR_POST, context.postId], context?.previousData);
            }
        },
    })
}

export const useSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, userId, isSave}: {postId: number, userId: string, isSave: boolean}) => savePost(postId, userId, isSave),
        onMutate: async ({postId}) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_STATS_FOR_POST, postId] });
            const previousData = queryClient.getQueryData([QUERY_KEYS.GET_STATS_FOR_POST, postId]);

            queryClient.setQueryData([QUERY_KEYS.GET_STATS_FOR_POST, postId], (oldData: any) => {
                return {
                    ...oldData,
                    has_saved: oldData.has_saved === true ? false : true,
                }
            })

            return { previousData, postId };
        },
        onError: (error, _variables, context) => {
            console.error(error)
            
            if(context?.previousData != null && context?.postId != null) {
                queryClient.setQueryData([QUERY_KEYS.GET_STATS_FOR_POST, context.postId], context?.previousData);
            }
        },
    })
}

export const useGetPosts = (limit: number, user_id: string) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn: ({ pageParam }) => getInfinitePosts({ pageParam, limit, user_id }),
        initialPageParam: 0,
        getNextPageParam: (lastPage ) => {
            const pageNumber = lastPage[0]?.pageNumber

            if (lastPage && lastPage.length === 0) {
                return null;
            }
   
            return pageNumber; 
        },

    });
};

export const useGetTrendingTags = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_TRENDING_TAGS],
        queryFn: getTrendingTags
    })
} 

export const useSearchPosts = (searchTerm: string, user_id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
        queryFn: () => searchPosts(searchTerm, user_id),
        enabled: !!searchTerm
    })
}


