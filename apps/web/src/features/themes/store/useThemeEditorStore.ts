import { create } from "zustand";
import type { ThemeVariables } from "@butter/shared/themes/types";

interface ThemeEditorState {
	name: string;
	isDark: boolean;
	variables: ThemeVariables;
	setName: (name: string) => void;
	setIsDark: (isDark: boolean) => void;
	setVariables: (variables: ThemeVariables) => void;
	setVariable: (key: keyof ThemeVariables, value: string) => void;
}

export const useThemeEditorStore = create<ThemeEditorState>((set) => ({
	name: "",
	isDark: false,
	// Initial empty state, will be populated by the loader or initial props
	variables: {} as ThemeVariables,
	setName: (name) => set({ name }),
	setIsDark: (isDark) => set({ isDark }),
	setVariables: (variables) => set({ variables }),
	setVariable: (key, value) =>
		set((state) => ({
			variables: { ...state.variables, [key]: value },
		})),
}));
