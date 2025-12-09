import type { ParentComponent } from "solid-js";
import { createMemo, Show } from "solid-js";
import { A, Navigate, useLocation } from "@solidjs/router";

import { useAuth } from "@/store/auth";
import { useUI } from "@/store/ui-store";

export const AuthLayout: ParentComponent = ({ children }) => {
	const { isAuthenticated, state, logout } = useAuth();
	const { state: ui, toggleTheme } = useUI();
	const location = useLocation();

	const authed = createMemo(() => isAuthenticated());

	return (
		<Show when={authed()} fallback={<Navigate href="/login" state={{ from: location.pathname }} />}>
			<div classList={{ dark: ui.theme === "dark" }}>
				<div class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
					<header class="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
						<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
							<div class="flex items-center gap-6">
								<div>
									<p class="text-xs uppercase tracking-[0.2em] text-emerald-500">Solid Demo</p>
									<p class="text-lg font-semibold">Dashboard</p>
								</div>
								<nav class="hidden sm:flex items-center gap-1">
									<A
										href="/"
										end
										class="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800"
										activeClass="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
										inactiveClass="text-slate-600 dark:text-slate-400"
									>
										Home
									</A>
									<A
										href="/playground"
										class="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800"
										activeClass="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
										inactiveClass="text-slate-600 dark:text-slate-400"
									>
										Playground
									</A>
								</nav>
							</div>
							<div class="flex items-center gap-3 text-sm">
								<div class="hidden md:block text-left">
									<p class="text-xs text-slate-500">Signed in as</p>
									<p class="font-medium">{state.user?.name}</p>
									<p class="text-xs text-slate-500">{state.user?.email}</p>
								</div>
								<button
									class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium shadow-sm transition hover:-translate-y-px hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/40"
									type="button"
									onClick={toggleTheme}
								>
									{ui.theme === "dark" ? "☀️" : "🌙"}
								</button>
								<button
									class="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400"
									type="button"
									onClick={logout}
								>
									Sign out
								</button>
							</div>
						</div>
					</header>

					<main class="mx-auto max-w-6xl space-y-8 px-6 pb-16 pt-10">{children}</main>
				</div>
			</div>
		</Show>
	);
};
