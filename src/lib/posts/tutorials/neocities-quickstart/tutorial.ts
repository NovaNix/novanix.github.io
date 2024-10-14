import { completeTutorial, fileTutorial, type Tutorial } from "$lib/data/tutorial"

import HTMLSection from "./1. html/section"

import introduction from "./0. introduction.md?url";
import setup from "./1. neocities-setup.md?url";

const tutorial: Tutorial = completeTutorial({
    title: "Neocities Quickstart",
    slug: "neocities-quickstart",

    children: [
        fileTutorial("Introduction", "intro", introduction),
        fileTutorial("Setting Up Neocities", "neocities-setup", setup),
        HTMLSection
    ]
});

export default tutorial;