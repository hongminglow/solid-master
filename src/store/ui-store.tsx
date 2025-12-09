import { createContext, JSX, useContext, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export type UIState = {
	theme: "light" | "dark";
	showHints: boolean;
	globalClicks: number;
};

type UIContextValue = {
	state: UIState;
	toggleTheme: () => void;
	toggleHints: () => void;
	incrementClicks: () => void;
};

const UIContext = createContext<UIContextValue>();

export const UIProvider = (props: { children: JSX.Element }) => {
	const [state, setState] = createStore<UIState>({
		theme: "light",
		showHints: true,
		globalClicks: 0,
	});

	createEffect(() => {
		document.documentElement.classList.toggle("dark", state.theme === "dark");
	});

	const toggleTheme = () => setState("theme", (theme) => (theme === "light" ? "dark" : "light"));
	const toggleHints = () => setState("showHints", (value) => !value);
	const incrementClicks = () => setState("globalClicks", (value) => value + 1);

	const value: UIContextValue = {
		state,
		toggleTheme,
		toggleHints,
		incrementClicks,
	};

	return <UIContext.Provider value={value}>{props.children}</UIContext.Provider>;
};

export const useUI = () => {
	const ctx = useContext(UIContext);
	if (!ctx) throw new Error("useUI must be used within <UIProvider>");
	return ctx;
};
