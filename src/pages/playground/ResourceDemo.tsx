import { createSignal, createResource, For, Show } from "solid-js";

import { SectionCard } from "@/shared/components/SectionCard";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { api } from "@/shared/services/api";

export const ResourceDemo = () => {
	const [selectedPostId, setSelectedPostId] = createSignal<number | null>(null);

	// Posts resource
	const [posts, { refetch: refetchPosts, mutate: mutatePosts }] = createResource(() => api.getPosts(5));

	// Todos resource with manual trigger
	const [todoSource, setTodoSource] = createSignal(false);
	const [todos, { refetch: refetchTodos, mutate: mutateTodos }] = createResource(todoSource, () => api.getTodos(5));

	// Optimistic update example
	const toggleTodoOptimistic = (id: number) => {
		// Optimistically update the UI
		mutateTodos((prev) => prev?.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

		// In a real app you'd call the API here and handle errors
		// api.updateTodo(id, { completed: newValue }).catch(() => refetchTodos());
	};

	return (
		<SectionCard
			title="7. createResource — Fetching, Mutate & Refetch"
			description="Solid's createResource handles async data with loading states, manual refetch, and optimistic updates."
		>
			<div class="space-y-6">
				{/* Posts section */}
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-slate-700 dark:text-slate-200">Posts (auto-fetch on mount)</p>
						<button
							class="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-400"
							onClick={() => refetchPosts()}
						>
							Refetch
						</button>
					</div>

					<Show when={!posts.loading} fallback={<p class="text-sm text-slate-500">Loading posts...</p>}>
						<div class="space-y-2">
							<For each={posts()}>
								{(post) => (
									<div
										classList={{
											"cursor-pointer rounded-lg border px-3 py-2 text-sm transition": true,
											"border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30":
												selectedPostId() === post.id,
											"border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600":
												selectedPostId() !== post.id,
										}}
										onClick={() => setSelectedPostId(post.id)}
									>
										<p class="font-medium text-slate-800 dark:text-slate-100 truncate">{post.title}</p>
									</div>
								)}
							</For>
						</div>
					</Show>
				</div>

				{/* Todos section with manual trigger */}
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-slate-700 dark:text-slate-200">Todos (manual trigger)</p>
						<div class="flex gap-2">
							<Show
								when={todoSource()}
								fallback={
									<button
										class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
										onClick={() => setTodoSource(true)}
									>
										Load todos
									</button>
								}
							>
								<button
									class="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-400"
									onClick={() => refetchTodos()}
								>
									Refetch
								</button>
							</Show>
						</div>
					</div>

					<Show when={todoSource()}>
						<Show when={!todos.loading} fallback={<p class="text-sm text-slate-500">Loading todos...</p>}>
							<div class="space-y-2">
								<For each={todos()}>
									{(todo) => (
										<div class="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
											<span
												classList={{
													"line-through text-slate-400": todo.completed,
													"text-slate-700 dark:text-slate-200": !todo.completed,
												}}
											>
												{todo.title.slice(0, 40)}...
											</span>
											<button
												classList={{
													"rounded px-2 py-1 text-xs font-medium": true,
													"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300":
														todo.completed,
													"bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300": !todo.completed,
												}}
												onClick={() => toggleTodoOptimistic(todo.id)}
											>
												{todo.completed ? "Done" : "Pending"}
											</button>
										</div>
									)}
								</For>
							</div>
							<p class="text-xs text-slate-500">
								Click status buttons for optimistic updates (instant UI, no server call in demo).
							</p>
						</Show>
					</Show>
				</div>

				<CodeBlock>
					{`// Basic resource
const [posts, { refetch, mutate }] = createResource(() => api.getPosts());

// With source signal (triggers when source changes)
const [source, setSource] = createSignal(false);
const [todos] = createResource(source, () => api.getTodos());

// Optimistic update
mutate((prev) => prev?.map((t) =>
  t.id === id ? { ...t, completed: !t.completed } : t
));

// Manual refetch
refetch();`}
				</CodeBlock>
			</div>
		</SectionCard>
	);
};
