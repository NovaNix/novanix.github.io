export interface ITreeNode
{
    text: string;
    url: string;

    children?: ITreeNode[];
}