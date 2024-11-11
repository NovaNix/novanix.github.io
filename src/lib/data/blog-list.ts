import { getBlogSlug, type BlogPost } from "./blog";

import Posts from "$lib/posts/blog/2024/11/posts";

const blogs: BlogPost[] = [
    ...Posts
];

const blogMap = new Map<string, BlogPost>();

for (let post of blogs)
{
    blogMap.set(getBlogSlug(post), post);
}

export function getBlog(dateString: string, name: string): BlogPost | undefined
{
    return blogMap.get(`${dateString}/${name}`);
}

export default blogs;