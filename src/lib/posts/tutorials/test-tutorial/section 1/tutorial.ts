import { fileTutorial, type ITutorialNode, type PartialTutorialNode, type Tutorial } from "$lib/data/tutorial"

import tut1 from "./tut1.md?url";
import tut2 from "./tut2.md?url";

const tutorial: PartialTutorialNode = {
    title: "Section 1",
    slug: "section-1",

    //file: File,

    children: [
        fileTutorial("Tutorial 1", "tut1", tut1),
        fileTutorial("Tutorial 2", "tut2", tut2)
    ]
};

export default tutorial;