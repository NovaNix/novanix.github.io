export interface Tutorial extends ITutorialNode
{
    
}

export interface ITutorialNode
{
    title: string,
    slug: string,

    file?: string,

    children?: ITutorialNode[]
}

export function fileTutorial(title: string, slug: string, file: string): ITutorialNode
{
    console.log("making file tutorial");
    console.log("url: " + import.meta.url);

    return {
        title,
        slug,

        file
        //file: new URL(`./${slug}.md`, import.meta.url).href
    }
}