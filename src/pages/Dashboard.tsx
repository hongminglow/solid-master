import type { Component } from "solid-js";
import { createEffect, createResource, For, Show } from "solid-js";

import { useAuth } from "@/store/auth";
import { useUI } from "@/store/ui-store";
import { StatCard } from "@/shared/components/StatCard";
import { api } from "@/shared/services/api";

export const Dashboard = () => {
	const { state } = useAuth();
	const { state: ui, toggleTheme, incrementClicks } = useUI();

	const [users] = createResource(() => api.getUsers());
	const [todos] = createResource(() => api.getTodos(10));

	createEffect(() => {
		// Simple effect to show Solid's reactive tracking: respond to theme changes.
		const mode = ui.theme;
		console.info(`Theme changed to ${mode}`);
	});

	const completedTodos = () => todos()?.filter((item) => item.completed).length ?? 0;

	return (
		<div class="space-y-6">
			<div class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-xs uppercase tracking-[0.2em] text-emerald-500">Welcome</p>
						<h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-50">{state.user?.name}</h1>
						<p class="text-sm text-slate-600 dark:text-slate-400">This page is protected by the auth layout.</p>
					</div>
					<div class="flex gap-2">
						<button
							type="button"
							class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:-translate-y-px hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/60"
							onClick={toggleTheme}
						>
							Toggle theme
						</button>
						<button
							type="button"
							class="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-emerald-400"
							onClick={incrementClicks}
						>
							Global click +1
						</button>
					</div>
				</div>
				<p class="text-sm text-slate-600 dark:text-slate-400">
					Global clicks persist across routes:{" "}
					<span class="font-semibold text-slate-900 dark:text-slate-100">{ui.globalClicks}</span>
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<StatCard
					title="Team members"
					value={users.loading ? "Loading…" : `${users()?.length ?? 0}`}
					helper="Fetched from jsonplaceholder"
				/>
				<StatCard
					title="Todos fetched"
					value={todos.loading ? "Loading…" : `${todos()?.length ?? 0}`}
					helper="Using createResource"
				/>
				<StatCard title="Completed" value={`${completedTodos()}`} helper="Derived from fetched todos" />
			</div>

			<div class="grid gap-4 lg:grid-cols-3">
				<div class="lg:col-span-2 space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-xs uppercase tracking-[0.2em] text-emerald-500">Effect demo</p>
							<p class="text-lg font-semibold text-slate-900 dark:text-slate-50">Todo list (live data)</p>
						</div>
						<Show when={todos.loading}>
							<span class="text-xs text-slate-500">Loading…</span>
						</Show>
					</div>
					<div class="space-y-2">
						<For each={todos()}>
							{(item) => (
								<div class="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition hover:-translate-y-px dark:border-slate-800 dark:bg-slate-950">
									<div class="space-y-1">
										<p class="font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
										<p class="text-xs text-slate-500">Task #{item.id}</p>
									</div>
									<span
										classList={{
											"rounded-full px-3 py-1 text-xs font-semibold": true,
											"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200": item.completed,
											"bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200": !item.completed,
										}}
									>
										{item.completed ? "Done" : "In progress"}
									</span>
								</div>
							)}
						</For>
					</div>
				</div>

				<div class="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
					<p class="text-xs uppercase tracking-[0.2em] text-emerald-500">Global store</p>
					<p class="text-lg font-semibold text-slate-900 dark:text-slate-50">UI preferences</p>
					<ul class="space-y-2 text-sm text-slate-700 dark:text-slate-200">
						<li class="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
							<span>Theme</span>
							<span class="font-semibold capitalize">{ui.theme}</span>
						</li>
						<li class="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
							<span>Show hints</span>
							<span class="font-semibold">{ui.showHints ? "On" : "Off"}</span>
						</li>
						<li class="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
							<span>Global clicks</span>
							<span class="font-semibold">{ui.globalClicks}</span>
						</li>
					</ul>
					<div class="space-y-2 text-sm">
						<button
							type="button"
							class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-900 shadow-sm transition hover:-translate-y-px hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/60"
							onClick={toggleTheme}
						>
							Toggle theme
						</button>
						<button
							type="button"
							class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium text-slate-900 shadow-sm transition hover:-translate-y-px hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/60"
							onClick={incrementClicks}
						>
							Add click
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
