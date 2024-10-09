import { fileTutorial, type ITutorialNode, type PartialTutorialNode, type Tutorial } from "$lib/data/tutorial"

import html_intro from "./0. html-intro.md?url";
import adding_text from "./1. adding-text.md?url";
import adding_links from "./2. adding-links.md?url";

const tutorial: PartialTutorialNode = {
    title: "HTML",
    slug: "html",

    //file: File,

    children: [
        fileTutorial("HTML Introduction", "html-intro", html_intro),
        fileTutorial("Adding Text", "adding-text", adding_text),
        fileTutorial("Adding Links", "adding-links", adding_links)
    ]
};

export default tutorial;