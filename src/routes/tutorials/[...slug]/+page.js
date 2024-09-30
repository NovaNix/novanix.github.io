/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params })
{
    return {tutorial: params.slug};
}

/** @type {import('./$types').EntryGenerator} */
export function entries() 
{
    return [{slug: "temp"}];
    //return projects.map(value => ({slug: value.id}));
}