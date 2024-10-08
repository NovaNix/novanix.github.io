import { browser } from "$app/environment";
import { Buffer } from "buffer";

// Data URL regex taken from https://stackoverflow.com/questions/5714281/regex-to-parse-image-data-uri
const dataURLRegex = /data:(?<mime>[\w/\-\.]+);(?<encoding>\w+),(?<data>.*)/;


export function decodeDataURL(dataurl: string)
{
    let data = getData(dataurl);

    if (data == null)
        return;

    // if (browser)
    // {
    //     // We're running in the browser, use 
    //     return window.btoa(data);
    // }

    // else
    // {
    //     //import Buffer from "@sveltejs/kit/node";
    //     return Buffer.from(data, 'base64').toString('utf8');
    // }

    return Buffer.from(data, 'base64').toString('utf8');
}

function getData(dataurl: string): string | undefined
{
    let match = dataurl.match(dataURLRegex);

    let data = match?.groups?.["data"];

    return data;
}