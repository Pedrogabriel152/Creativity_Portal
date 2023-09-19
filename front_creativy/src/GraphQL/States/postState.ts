import { makeVar } from "@apollo/client";

// Interfaces
import { IMainPost } from "../../interfaces/IMainPost";
import { IFeaturedPosts } from "../../interfaces/IFeaturedPosts";
import { IPost } from "../../interfaces/IPost";
import { IResponse } from "../../interfaces/IResponse";

export const getMainPostVar = makeVar<IMainPost | null>(null);
export const getFeaturedPostsVar = makeVar<IFeaturedPosts | null>(null);
export const getPostVar = makeVar<IPost | null>(null);
export const getMyPostsVar = makeVar<IFeaturedPosts | null>(null);
export const likePostVar = makeVar<IResponse | null>(null);
export const createdPostVar = makeVar<IResponse | null>(null);
export const deletedPostVar = makeVar<IResponse | null>(null);