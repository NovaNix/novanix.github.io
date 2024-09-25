/** @type {import('./$types').PageLoad} */
export function load({ params }) 
{ 
    return { 
        
        title: `Title for ${params.slug} goes here`, 
        content: `Content for ${params.slug} goes here` 
        
    }; 
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return [
		{ slug: 'hello-world' },
		{ slug: 'another-blog-post' }
	];
}