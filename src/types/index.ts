import React from "react";

export type IContextType = {
  user: IUser,
  isLoading: boolean,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  checkAuthUser: () => Promise<boolean>
}

export type INavLink = {
    imgURL: string;
    route: string;
    label: string;
  };
  
  export type IUpdateUser = {
    userId: string;
    name: string;
    bio?: string;
    imageId?: string;
    imageUrl?: URL | string;
    file: File[];
  };

  export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageurl: string;
    bio: string;
  };

  export type IPostProps = {
    id: number,
    creator_id: string,
    creator: IUser,
    caption: string,
    created_at: string,
    imageid: string, 
    imageurl: string,
    location: string,
    tags?: string[] , 
    likes_count: number,
    has_liked: number,
    has_saved: number,
    saves_details: string[],
  }

  export type IComment = {
    id: number,
    descr: string,
    created_at: string,
    user_id: string,
    post_id: number,
    name: string,
    imageurl: string,
    pageNumber: number
  }

  export type INewComment = {
    descr: string,
    user_id: string,
    post_id: number,
  }
  
  export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
    imageId?: string;
    imageUrl?: URL;
  };
  
  export type IUpdatePost = {
    postId: number;
    caption: string;
    imageId: string;
    imageUrl: string;
    file: File[];
    location?: string;
    tags?: string[] | string, 
  };

  export type ITrendingTag = {
    tag_name: string,
    tag_count: number
  }
  
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };