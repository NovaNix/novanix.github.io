import dark_vs from "./dark_vs.json";
import dark_plus from "./dark_plus.json";
import dark_modern from "./dark_modern.json";
import { convertTheme, mergeTheme, type VSCodeTheme } from "./vs_code_theme";

// Combine all of the individual files into a single file
const theme = mergeTheme(mergeTheme(dark_vs, dark_plus), dark_modern);

export default convertTheme(theme);
