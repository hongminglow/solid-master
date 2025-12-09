import { ParentComponent, Show } from "solid-js";
import { Navigate } from "@solidjs/router";

import { useAuth } from "@/store/auth";
import { useUI } from "@/store/ui-store";

export const GuestLayout: ParentComponent = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const { state: ui } = useUI();

	return (
		<Show when={!isAuthenticated()} fallback={<Navigate href="/" />}>
			<div classList={{ dark: ui.theme === "dark" }}>
				<div class="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-emerald-50 to-slate-100 px-6 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
					<div class="w-full max-w-lg space-y-8 rounded-2xl border border-slate-200/70 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
						<div class="space-y-2 text-center">
							<p class="text-xs uppercase tracking-[0.3em] text-emerald-500">Solid playground</p>
							<h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-50">Welcome back</h1>
						</div>
						{children}
					</div>
				</div>
			</div>
		</Show>
	);
};
