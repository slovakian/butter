import { themeVariablesSchema } from "@butter/shared/themes/validation";
import CodeMirror from "@uiw/react-codemirror";
import { jsonSchema } from "codemirror-json-schema";
import type React from "react";
import { useEffect, useState } from "react";
import { useThemeEditor } from "@/features/themes/editor/provider";

interface JsonEditorProps {
	theme: React.ComponentProps<typeof CodeMirror>["theme"];
	isActive: boolean;
}

export function JsonEditor({ theme, isActive }: JsonEditorProps) {
	const { variables, setVariables } = useThemeEditor((state) => state);
	const [code, setCode] = useState(() => JSON.stringify(variables, null, 2));

	// Sync from store when not active
	useEffect(() => {
		if (!isActive) {
			setCode(JSON.stringify(variables, null, 2));
		}
	}, [variables, isActive]);

	const handleChange = (value: string) => {
		setCode(value);
		try {
			const parsed = JSON.parse(value);
			// Validate using the schema before updating the store
			// The user said: "The JSON editor is enforced natively using themeVariablesSchema.toJSONSchema()... When the user inputs valid JSON, update the Zustand variables store."
			// CodeMirror JSON schema extension helps with validation UI, but we should also validate before setting store.
			// Actually, Zod schema validation is good practice.
			const result = themeVariablesSchema.safeParse(parsed);
			if (result.success) {
				setVariables(result.data);
			}
		} catch (e) {
			// Invalid JSON, ignore
		}
	};

	return (
		<div className="h-full w-full overflow-auto bg-[#272822]">
			<CodeMirror
				value={code}
				height="100%"
				theme={theme}
				extensions={[jsonSchema(themeVariablesSchema.toJSONSchema())]}
				onChange={handleChange}
				className="h-full border-none text-[14px]"
			/>
		</div>
	);
}
