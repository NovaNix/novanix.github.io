import light_vs from "./light_vs.json";
import light_plus from "./light_plus.json";
import light_modern from "./light_modern.json";
import { convertTheme, mergeTheme, type VSCodeTheme } from "./vs_code_theme";

// Combine all of the individual files into a single file
const theme = mergeTheme(mergeTheme(light_vs, light_plus), light_modern);

export default convertTheme(theme);
