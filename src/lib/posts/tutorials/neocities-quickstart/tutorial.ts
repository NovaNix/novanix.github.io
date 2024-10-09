import { completeTutorial, type Tutorial } from "$lib/data/tutorial"

import HTMLSection from "./1. html/section"

const tutorial: Tutorial = completeTutorial({
    title: "Neocities Quickstart",
    slug: "neocities-quickstart",

    children: [
        HTMLSection
    ]
});

export default tutorial;