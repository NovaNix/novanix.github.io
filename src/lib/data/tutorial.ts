export interface Tutorial
{
    title: string,
    slug: string,

}

export interface TutorialNode
{
    title: string,
    slug: string,

    file?: string,

    children: TutorialNode[]
}