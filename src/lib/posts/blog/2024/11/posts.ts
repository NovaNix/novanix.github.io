import type { BlogPost } from "$lib/data/blog";

import TestPost from "./2024-11-7 testpost.md?url";
import RotationPost from "./2024-12-4 blender-rotation.md?url";

const posts: BlogPost[] = [
    {
        slug: "test-post",

        title: "Test Post",
        publishDate: new Date('2024-11-7'),
        file: TestPost
    },
    {
        slug: "blender-rotation",

        title: "Blender Rotation Modes",
        publishDate: new Date('2024-12-4'),
        file: RotationPost
    }
];

export default posts;