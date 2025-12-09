import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";

import { SectionCard } from "@/shared/components/SectionCard";
import { CodeBlock } from "@/shared/components/CodeBlock";

type PlaygroundStore = {
	user: {
		profile: {
			firstName: string;
			lastName: string;
			settings: {
				notifications: boolean;
				theme: "light" | "dark" | "system";
			};
		};
		scores: number[];
	};
	items: { id: number; name: string; active: boolean }[];
};

export const StoreDemo = () => {
	const [store, setStore] = createStore<PlaygroundStore>({
		user: {
			profile: {
				firstName: "Jane",
				lastName: "Doe",
				settings: {
					notifications: true,
					theme: "light",
				},
			},
			scores: [85, 92, 78],
		},
		items: [
			{ id: 1, name: "Item A", active: true },
			{ id: 2, name: "Item B", active: false },
			{ id: 3, name: "Item C", active: true },
		],
	});

	return (
		<SectionCard
			title="1. Global Store — Path Syntax"
			description="Solid stores allow precise updates using path syntax, avoiding full re-renders."
		>
			<div class="space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<p class="text-sm font-medium text-slate-700 dark:text-slate-200">User Profile</p>
						<div class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800">
							<p>
								<span class="text-slate-500">Name:</span>{" "}
								<span class="font-medium">
									{store.user.profile.firstName} {store.user.profile.lastName}
								</span>
							</p>
							<p>
								<span class="text-slate-500">Theme:</span>{" "}
								<span class="font-medium capitalize">{store.user.profile.settings.theme}</span>
							</p>
							<p>
								<span class="text-slate-500">Notifications:</span>{" "}
								<span class="font-medium">{store.user.profile.settings.notifications ? "On" : "Off"}</span>
							</p>
						</div>

						<div class="flex flex-wrap gap-2">
							{/* Path syntax: direct nested property update */}
							<button
								class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
								onClick={() => setStore("user", "profile", "firstName", "John")}
							>
								Set firstName → "John"
							</button>
							<button
								class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
								onClick={() => setStore("user", "profile", "settings", "theme", "dark")}
							>
								Set theme → "dark"
							</button>
							<button
								class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
								onClick={() => setStore("user", "profile", "settings", "notifications", (n) => !n)}
							>
								Toggle notifications
							</button>
						</div>
					</div>

					<div class="space-y-2">
						<p class="text-sm font-medium text-slate-700 dark:text-slate-200">Scores Array</p>
						<div class="flex gap-2">
							<For each={store.user.scores}>
								{(score, i) => (
									<span class="rounded bg-slate-200 px-2 py-1 text-sm font-mono dark:bg-slate-700">
										[{i()}]: {score}
									</span>
								)}
							</For>
						</div>
						<div class="flex flex-wrap gap-2">
							{/* Array index update */}
							<button
								class="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-400"
								onClick={() => setStore("user", "scores", 0, (s) => s + 5)}
							>
								scores[0] += 5
							</button>
							{/* Push using produce */}
							<button
								class="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-400"
								onClick={() => setStore("user", "scores", (arr) => [...arr, Math.floor(Math.random() * 100)])}
							>
								Push random
							</button>
						</div>
					</div>
				</div>

				<div class="space-y-2">
					<p class="text-sm font-medium text-slate-700 dark:text-slate-200">Items (using produce)</p>
					<div class="flex flex-wrap gap-2">
						<For each={store.items}>
							{(item) => (
								<span
									classList={{
										"rounded px-2 py-1 text-xs font-medium": true,
										"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200": item.active,
										"bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300": !item.active,
									}}
								>
									{item.name} ({item.active ? "active" : "inactive"})
								</span>
							)}
						</For>
					</div>
					<div class="flex flex-wrap gap-2">
						<button
							class="rounded bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-400"
							onClick={() =>
								setStore(
									"items",
									(item) => item.id === 2,
									"active",
									(a) => !a
								)
							}
						>
							Toggle Item B (predicate)
						</button>
						<button
							class="rounded bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-400"
							onClick={() =>
								setStore(
									produce((s) => {
										s.items.push({ id: Date.now(), name: `Item ${s.items.length + 1}`, active: true });
									})
								)
							}
						>
							Add item (produce)
						</button>
					</div>
				</div>

				<CodeBlock>
					{`// Path syntax examples
setStore("user", "profile", "firstName", "John");
setStore("user", "profile", "settings", "theme", "dark");
setStore("user", "scores", 0, (s) => s + 5);

// Predicate to find item
setStore("items", (item) => item.id === 2, "active", (a) => !a);

// Using produce for complex mutations
setStore(produce((s) => s.items.push({ id: 4, name: "New", active: true })));`}
				</CodeBlock>
			</div>
		</SectionCard>
	);
};
