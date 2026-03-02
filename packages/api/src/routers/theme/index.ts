import { applyThemeToBoard, applyThemeToUser } from "./apply";
import { createTheme } from "./create";
import { deleteTheme } from "./delete";
import { getTheme } from "./get";
import { updateTheme } from "./update";

export const themeRouter = {
	get: getTheme,
	applyToUser: applyThemeToUser,
	applyToBoard: applyThemeToBoard,
	create: createTheme,
	update: updateTheme,
	delete: deleteTheme,
};
