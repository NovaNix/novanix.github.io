import type { BlogPost } from "$lib/data/blog";

import TestPost from "./2024-11-7 testpost.md?url";

const posts: BlogPost[] = [
    {
        slug: "test-post",

        title: "Test Post",
        publishDate: new Date('2024-11-7'),
        file: TestPost
    }
];

export default posts;