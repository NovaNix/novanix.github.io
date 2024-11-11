export interface BlogPost
{
    slug: string;

    title: string;
    description?: string;

    publishDate: Date;

    file: string;
}

export function formatBlogDate(date: Date): string
{
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()}`;
}

export function getBlogSlug(post: BlogPost)
{
    return `${formatBlogDate(post.publishDate)}/${post.slug}`;
}