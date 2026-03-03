import { applyThemeToBoard, applyThemeToUser } from "./apply";
import { createTheme } from "./create";
import { deleteTheme } from "./delete";
import { getTheme, getUserTheme } from "./get";
import { updateTheme } from "./update";

export const themeRouter = {
	get: { byId: getTheme, ofUser: getUserTheme },
	apply: {
		toUser: applyThemeToUser,
		toBoard: applyThemeToBoard,
	},
	create: createTheme,
	update: updateTheme,
	delete: deleteTheme,
};
