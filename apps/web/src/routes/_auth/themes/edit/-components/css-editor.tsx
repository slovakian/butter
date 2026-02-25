import { themeVariablesSchema } from "@butter/shared/themes/validation";
import { css } from "@codemirror/lang-css";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { useThemeEditor } from "@/features/themes/editor/provider";
import { formatThemeToCss, parseCssToTheme } from "@/features/themes/parser";

interface CssEditorProps {
	theme: React.ComponentProps<typeof CodeMirror>["theme"];
	isActive: boolean;
}

export function CssEditor({ theme, isActive }: CssEditorProps) {
	const { variables, setVariables } = useThemeEditor((state) => state);
	const [code, setCode] = useState(() => formatThemeToCss(variables));

	useEffect(() => {
		if (!isActive) {
			setCode(formatThemeToCss(variables));
		}
	}, [variables, isActive]);

	const handleChange = (value: string) => {
		setCode(value);

		const parsed = parseCssToTheme(value);

		const result = themeVariablesSchema.safeParse(parsed);
		if (result.success) {
			setVariables(result.data);
		}
	};

	return (
		<div className="h-full w-full overflow-auto bg-[#272822]">
			<CodeMirror
				value={code}
				height="100%"
				theme={theme}
				extensions={[css()]}
				onChange={handleChange}
				className="h-full border-none text-[14px]"
			/>
		</div>
	);
}
