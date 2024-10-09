import { completeTutorial, type Tutorial } from "$lib/data/tutorial"

import File from "./intro.md?url";

import Section1 from "./section 1/tutorial"

const tutorial: Tutorial = completeTutorial({
    title: "Test Tutorial",
    slug: "test-tutorial",

    file: File,

    children: [
        Section1
    ]
});

export default tutorial;