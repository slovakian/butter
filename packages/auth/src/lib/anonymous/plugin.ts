import { anonymous } from "better-auth/plugins";

export const anonymousPlugin = anonymous({
	disableDeleteAnonymousUser: true,
});
