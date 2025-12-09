import { createContext, useContext, JSX, createEffect, createMemo } from "solid-js";
import { createStore } from "solid-js/store";

export type User = {
	email: string;
	name: string;
};

type AuthState = {
	status: "idle" | "authenticated";
	user: User | null;
	token: string | null;
};

type AuthContextValue = {
	state: AuthState;
	isAuthenticated: () => boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
};

const STORAGE_KEY = "solid-demo-auth";

const AuthContext = createContext<AuthContextValue>();

export const AuthProvider = (props: { children: JSX.Element }) => {
	const [state, setState] = createStore<AuthState>({
		status: "idle",
		user: null,
		token: null,
	});

	// Load persisted session on boot.
	createEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsed = JSON.parse(saved) as AuthState;
				if (parsed.token && parsed.user) {
					setState({ ...parsed, status: "authenticated" });
				}
			} catch (err) {
				console.warn("Unable to parse auth cache", err);
			}
		}
	});

	// Persist current session.
	createEffect(() => {
		if (state.status === "authenticated" && state.user && state.token) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
	});

	const isAuthenticated = createMemo(() => state.status === "authenticated");

	const login = async (email: string, password: string) => {
		// Pretend we hit an API; basic password check to keep the example deterministic.
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (!email || password.length < 4) {
			throw new Error("Invalid credentials. Try any email and a 4+ char password.");
		}

		setState({
			status: "authenticated",
			user: {
				email,
				name: email.split("@")[0] || "Solid User",
			},
			token: "demo-token",
		});
	};

	const logout = () => {
		setState({ status: "idle", user: null, token: null });
	};

	const value: AuthContextValue = {
		state,
		isAuthenticated,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
	return ctx;
};
