import { chatroomRouter } from "./chatroom";
import { getBySlug as getBoardBySlug } from "./get";
import { itemRouter } from "./item";
import { list } from "./list";

export const boardRouter = {
	getBySlug: getBoardBySlug,
	chatroom: chatroomRouter,
	item: itemRouter,
	list,
};
