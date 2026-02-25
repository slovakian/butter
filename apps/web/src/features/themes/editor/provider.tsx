import type { ThemeVariables } from "@butter/shared/themes/types";
import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

interface ThemeEditorState {
	name: string;
	isDark: boolean;
	variables: ThemeVariables;
}

interface ThemeEditorActions {
	setName: (name: string) => void;
	setIsDark: (isDark: boolean) => void;
	setVariables: (variables: ThemeVariables) => void;
	setVariable: (key: keyof ThemeVariables, value: string) => void;
}

export type ThemeEditorStore = ThemeEditorState & ThemeEditorActions;

// Helper to create the store
const createThemeEditorStore = (initProps?: Partial<ThemeEditorState>) => {
	const DEFAULT_PROPS: ThemeEditorState = {
		name: "",
		isDark: false,
		variables: {} as ThemeVariables,
	};
	return createStore<ThemeEditorStore>((set) => ({
		...DEFAULT_PROPS,
		...initProps,
		setName: (name) => set({ name }),
		setIsDark: (isDark) => set({ isDark }),
		setVariables: (variables) => set({ variables }),
		setVariable: (key, value) =>
			set((state) => ({
				variables: { ...state.variables, [key]: value },
			})),
	}));
};

type ThemeEditorStoreApi = ReturnType<typeof createThemeEditorStore>;

const ThemeEditorContext = createContext<ThemeEditorStoreApi | undefined>(
	undefined,
);

interface ThemeEditorProviderProps {
	children: React.ReactNode;
	initialData?: Partial<ThemeEditorState>;
}

export const ThemeEditorProvider = ({
	children,
	initialData,
}: ThemeEditorProviderProps) => {
	const storeRef = useRef<ThemeEditorStoreApi>(null);
	if (!storeRef.current) {
		storeRef.current = createThemeEditorStore(initialData);
	}

	return (
		<ThemeEditorContext.Provider value={storeRef.current}>
			{children}
		</ThemeEditorContext.Provider>
	);
};

export const useThemeEditor = <T,>(
	selector: (store: ThemeEditorStore) => T,
): T => {
	const themeEditorContext = useContext(ThemeEditorContext);

	if (!themeEditorContext) {
		throw new Error("useThemeEditor must be used within ThemeEditorProvider");
	}

	return useStore(themeEditorContext, selector);
};
