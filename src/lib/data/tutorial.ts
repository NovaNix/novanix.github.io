interface TutorialProps
{

}

export interface PartialTutorial extends PartialTutorialNode
{

}

export interface Tutorial extends ITutorialNode
{
    
}

export interface PartialTutorialNode
{
    title: string,
    slug: string,

    file?: string,

    children?: PartialTutorialNode[] | null
}

export interface ITutorialNode extends PartialTutorialNode
{
    parent: ITutorialNode | null;

    url: string;

    children?: ITutorialNode[] | null;

    // parent: ITutorialNode;
}

export function completeTutorial(tutorial: PartialTutorial): Tutorial
{
    let complete: Tutorial = {
        ...tutorial,
        parent: null,
        url: tutorial.slug,
        children: null
    };

    // This is a little messy but it works
    return {...complete, ...finishNodes(null, tutorial)}
}

export function finishNodes(parent: ITutorialNode | null, tutorial: PartialTutorialNode): ITutorialNode
{
    let url = `${parent?.url ?? "/tutorials"}/${tutorial.slug}`;

    let node: ITutorialNode = {
        ...tutorial,
        parent,
        url,
        children: null
    } 

    for (let child of tutorial.children ?? [])
    {
        let childNode = finishNodes(node, child);

        if (node.children == null)
        {
            node.children = [];
        }

        node.children.push(childNode);
    }

    return node;
}

export function fileTutorial(title: string, slug: string, file: string): PartialTutorialNode
{
    //console.log("making file tutorial");
    //console.log("url: " + import.meta.url);

    return {
        title,
        slug,

        file
        //file: new URL(`./${slug}.md`, import.meta.url).href
    }
}