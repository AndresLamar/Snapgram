export enum QUERY_KEYS {
    // AUTH KEYS
    CREATE_USER_ACCOUNT = "createUserAccount",
  
    // USER KEYS
    GET_CURRENT_USER = "getCurrentUser",
    GET_USERS = "getUsers",
    GET_USER_BY_ID = "getUserById",
    GET_FOLLOWS_FOR_USER = "getFollowsForUser",
    GET_SAVED_POSTS_FOR_USER = "getSavedPostsForUser",
  
    // POST KEYS
    GET_POSTS = "getPosts",
    GET_INFINITE_POSTS = "getInfinitePosts",
    GET_RECENT_POSTS = "getRecentPosts",
    GET_POST_BY_ID = "getPostById",
    GEt_COMMENTS_FOR_POST = "getCommentsForPost",
    GET_STATS_FOR_POST = "getStatsForPost",
    GET_LIKES_FOR_POST = "getLikesForPost",
    GET_SAVES_FOR_POST = "getSavesForPost",
    GET_USER_POSTS = "getUserPosts",
    GET_USER_LIKED_POSTS = "getUserLikedPosts",
    GET_FILE_PREVIEW = "getFilePreview",
    GET_TRENDING_TAGS = "getTrendingTags",
  
    //  SEARCH KEYS
    SEARCH_POSTS = "getSearchPosts",
  }