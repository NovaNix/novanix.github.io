import { fileTutorial, type ITutorialNode, type PartialTutorialNode, type Tutorial } from "$lib/data/tutorial"

import css_intro from "./0. css-intro.md?url";
import selectors from "./1. selectors.md?url";
import basic_styling from "./2. basic-styling.md?url";
import text_formatting from "./3. text-formatting.md?url";
import basic_layout from "./4. basic-layout.md?url";

const tutorial: PartialTutorialNode = {
    title: "CSS",
    slug: "css",

    //file: File,

    children: [
        fileTutorial("CSS Introduction", "css-intro", css_intro),
        fileTutorial("Selectors", "selectors", selectors),
        fileTutorial("Basic Styling", "basic-styling", basic_styling),
        fileTutorial("Text Formatting", "text-formatting", text_formatting),
        fileTutorial("Basic Layout", "basic-layout", basic_layout)
    ]
};

export default tutorial;