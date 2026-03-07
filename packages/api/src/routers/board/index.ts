import { chatroomRouter } from "./chatroom";
import { getBySlug as getBoardBySlug } from "./get";
import { list } from "./list";

export const boardRouter = {
	getBySlug: getBoardBySlug,
	chatroom: chatroomRouter,
	list,
};
