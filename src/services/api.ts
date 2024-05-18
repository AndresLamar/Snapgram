import { INewUser, INewPost, IUpdatePost, IUpdateUser, INewComment } from "@/types";

const BASE_URL = 'https://snapgram-backend-z81v.onrender.com'

/* LOGIN */

export async function signInAccount(user: { email: string, password: string}){
    try{
        const logedUser = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        
        if(!logedUser) throw Error

        const logedUserJson = await logedUser.json()     
        
        return logedUserJson
    } catch ( error ){
        console.log(error);
    }
}

/* USERS */

export async function createUserAccount(user: INewUser){
    try {

        const newAccount = await fetch(`${BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });

        // const newAccoutJson = await newAccount.json()


        if(!newAccount) throw Error
        
        return newAccount
    } catch (error) {
        console.log(error);
        return error
    }
}

export async function getCurrentUser (user: { username: string }) {
    try {                        
        const currentUser = await fetch(`${BASE_URL}/api/users/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)    
        })

        const currentUserJson = await currentUser.json()

        return currentUserJson
        
    } catch (error) {
        console.log(error);
    }
}

export async function getUserById (user_id: string) {
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const response = await fetch(`${BASE_URL}/api/users/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,    
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        const user = await response.json();
                
        return user;

    } catch (error) {
        console.error(error);
        throw error;
    }

}

export async function getPostsForUser({ pageParam, limit, userId }: { pageParam: number; limit: number, userId: string }) {
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const response = await fetch(`${BASE_URL}/api/users/getPostsForUser/${userId}?page=${pageParam}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,  
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();  
                
        return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getPostsLikedForUser({ pageParam, limit, userId }: { pageParam: number; limit: number, userId: string }) {
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const response = await fetch(`${BASE_URL}/api/users/getPostsLikedForUser/${userId}?page=${pageParam}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,  
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();  
                
        return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUsers({ pageParam, limit }: { pageParam: number; limit: number }) {
    try {

        const token = localStorage.getItem('cookieFallback') ?? ''

        const response = await fetch(`${BASE_URL}/api/users/getUsers?page=${pageParam}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,    
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const users = await response.json();  
                
        return users;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function followUser(followerId: string, followingId: string, isFollow: boolean){
    
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const method = isFollow ? 'POST' : 'DELETE';

        await fetch(`${BASE_URL}/api/users/${isFollow ? 'follow' : 'unFollow'}`, {
            method,
            headers: {
                'Authorization': `bearer ${token}`,    
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ follower: followerId, following: followingId })     
        }) 

    } catch (error) {
        console.log(error)
    }
}

export async function getFollows(userId: string){

    try {        
        const result = await fetch(`${BASE_URL}/api/users/follows/${userId}`, {
            method: 'GET',
        })


        const follows = await result.json()

        return follows
    } catch (error) {
        console.log(error)
    }
}

export async function getPostsSavedByuser({ pageParam, limit, userId }: { pageParam: number; limit: number, userId: string }) {
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const response = await fetch(`${BASE_URL}/api/users/getPostsSaved/${userId}?page=${pageParam}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,  
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();  
                
        return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateProfile(user: IUpdateUser ){
    const hasFileToUpdate = user.file.length > 0

    try{

        if(hasFileToUpdate){
            // Upload image to storage
            // await deleteFile(post.imageId)
            const uploadedFile = await uploadProfileFile(user.file[0])

            if(!uploadedFile) throw Error
            
            user.imageUrl = uploadedFile.optimizedUrl
            user.imageId = uploadedFile.public_id

        }

        
        const token = localStorage.getItem('cookieFallback') ?? ''

        // Save post to database
        const updatedUser = await fetch(`${BASE_URL}/api/users/${user.userId} `, {
            method: 'PUT',
            headers: {
                'Authorization': `bearer ${token}`,    
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)      
        })  


        const updatedUserJson = await updatedUser.json()    

        return updatedUserJson;
    } catch(error){
        console.log(error)
    }
}

/* POSTS */	

export async function createPost(post: INewPost){
    try{

        // Upload image to storage
        const uploadedFile = await uploadPostFile(post.file[0])

        if(!uploadedFile) throw Error

        post.imageUrl = uploadedFile.optimizedUrl
        post.imageId = uploadedFile.public_id

        console.log(post)
        
        const token = localStorage.getItem('cookieFallback') ?? ''

        // Save post to database
        const newPost = await fetch(`${BASE_URL}/api/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,    
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(post)      
        })  

        const newPostJson = await newPost.json()             

        return newPostJson[0];
    } catch(error){
        console.log(error)
    }
}

export async function getRecentPosts(){
    try {          
        
        const token = localStorage.getItem('cookieFallback') ?? ''

        
        const recentPosts = await fetch(`${BASE_URL}/api/posts`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`,    
            },    
        })

        const recentPostsJson = await recentPosts.json()        

        return recentPostsJson
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function getPostById(postId: number){
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''
        
        const post = await fetch(`${BASE_URL}/api/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        })

        const postJson = await post.json()

        return postJson
    } catch (error) {
        console.log(error)
    }
}

export async function createComment(comment: INewComment){
    try{
        const token = localStorage.getItem('cookieFallback') ?? ''

        // Save post to database
        const response = await fetch(`${BASE_URL}/api/posts/comment`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,    
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(comment)      
        })  

        const newComment = await response.json()
        
        return newComment;
    } catch(error){
        console.log(error)
    }
}

export async function getCommentsForPost({ pageParam, limit, postId }: { pageParam: number; limit: number, postId: number }) {
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const response = await fetch(`${BASE_URL}/api/posts/comments/${postId}?page=${pageParam}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,  
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }

        const comments = await response.json();  
                
        return comments;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function likePost(postId: number, userId: string, isLike: boolean){
    
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const method = isLike ? 'POST' : 'DELETE';

        await fetch(`${BASE_URL}/api/posts/${isLike ? 'like' : 'unlike'}`, {
            method,
            headers: {
                'Authorization': `bearer ${token}`,    
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ post_id: postId, user_id: userId })     
        }) 

    } catch (error) {
        console.log(error)
    }
}

export async function getStats(postId: number){
    try {        
        const result = await fetch(`${BASE_URL}/api/posts/stats/${postId}`, {
            method: 'GET',
        })

        const stats = await result.json()


        return stats
    } catch (error) {
        console.log(error)
    }
}

export async function getLikes(postId: number){
    try {        
        const result = await fetch(`${BASE_URL}/api/posts/likes/${postId}`, {
            method: 'GET',
        })


        const likes = await result.json()

        return likes
    } catch (error) {
        console.log(error)
    }
}

export async function getSaves(postId: number){
    try {        
        const result = await fetch(`${BASE_URL}/api/posts/saves/${postId}`, {
            method: 'GET',
        })

        const saves = await result.json()

        return saves
    } catch (error) {
        console.log(error)
    }
}

export async function savePost(postId: number, userId: string, isSave: boolean){


    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const method = isSave ? 'POST' : 'DELETE';

        await fetch(`${BASE_URL}/api/posts/${isSave ? 'save' : 'unsave'}`, {
            method,
            headers: {
                'Authorization': `bearer ${token}`,    
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ post_id: postId, user_id: userId })     
        }) 
    } catch (error) {
        console.log(error)
    }
}

export async function updatePost(post: IUpdatePost ){
    const hasFileToUpdate = post.file.length > 0

    try{

        if(hasFileToUpdate){
            // Upload image to storage
            // await deleteFile(post.imageId)
            const uploadedFile = await uploadPostFile(post.file[0])

            if(!uploadedFile) throw Error
            
            post.imageUrl = uploadedFile.optimizedUrl
            post.imageId = uploadedFile.public_id

        }

        
        const token = localStorage.getItem('cookieFallback') ?? ''

        // Save post to database
        const updatedPost = await fetch(`${BASE_URL}/api/posts/${post.postId} `, {
            method: 'PUT',
            headers: {
                'Authorization': `bearer ${token}`,    
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(post)      
        })  

        // const updatedPostJson = await updatedPost.json()    
        

        return updatedPost;
    } catch(error){
        console.log(error)
    }
}

export async function deletePost(postId: number){
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        await fetch(`${BASE_URL}/api/posts/${postId} `, {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${token}`,  
                'Content-Type': 'application/json;charset=utf-8'  
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export async function getInfinitePosts({ pageParam, limit }: { pageParam: number; limit: number }) {
    try {

        const token = localStorage.getItem('cookieFallback') ?? ''

        const response = await fetch(`${BASE_URL}/api/posts/infinite?page=${pageParam}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,  
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();  
                
        return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTrendingTags(){
    try {          
        
        const token = localStorage.getItem('cookieFallback') ?? ''

        const trendingTags = await fetch(`${BASE_URL}/api/posts/trendingTags`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`,    
            },    
        })

        const trendingTagsJson = await trendingTags.json()        

        return trendingTagsJson
        
    } catch (error) {
        console.log(error);
    }
}

export async function searchPosts(searchTerm: string) {

    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        const response = await fetch(`${BASE_URL}/api/posts/search/${searchTerm}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,  
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();        

        return posts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/* UPLOADS */

export async function uploadProfileFile(file: File ){
    try {

        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('cookieFallback') ?? ''

        const result = await fetch(`${BASE_URL}/api/upload/ProfileImage`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,    
            },
            body: formData
        });

        const resultJson = await result.json()
        

        return resultJson
        
    } catch (error) {
        console.log(error)
    }
}

export async function uploadPostFile(file: File ){
    try {

        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('cookieFallback') ?? ''

        const result = await fetch(`${BASE_URL}/api/upload/PostImage`, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,    
            },
            body: formData
        });

        const resultJson = await result.json()
        

        return resultJson
        
    } catch (error) {
        console.log(error)
    }
}

export async function deleteFile(fileId: string){
    try {
        const token = localStorage.getItem('cookieFallback') ?? ''

        await fetch(`${BASE_URL}/api/upload/deleteImage`, {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${token}`,  
                'Content-Type': 'application/json;charset=utf-8'  
            },
            body: JSON.stringify({ fileId }) 
        });
    } catch (error) {
        console.log(error)
    }
}       