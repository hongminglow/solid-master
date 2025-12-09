import { createSignal, For, Index } from "solid-js";

import { SectionCard } from "@/shared/components/SectionCard";
import { CodeBlock } from "@/shared/components/CodeBlock";

export const ListRenderingDemo = () => {
	const [forList, setForList] = createSignal(["Apple", "Banana", "Cherry"]);
	const [indexList, setIndexList] = createSignal([100, 200, 300]);

	const shuffleForList = () => {
		const arr = [...forList()];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		setForList(arr);
	};

	return (
		<SectionCard
			title="4. List Rendering — For vs Index"
			description="<For> tracks by identity (good for reordering), <Index> tracks by position (good for value updates)."
		>
			<div class="grid gap-6 sm:grid-cols-2">
				{/* <For> example */}
				<div class="space-y-3">
					<p class="text-sm font-medium text-slate-700 dark:text-slate-200">&lt;For&gt; — identity-based</p>
					<div class="space-y-2">
						<For each={forList()}>
							{(item, i) => (
								<div class="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
									<span>
										<span class="text-slate-400">[{i()}]</span> {item}
									</span>
									<button
										class="text-rose-500 hover:text-rose-400"
										onClick={() => setForList((arr) => arr.filter((_, idx) => idx !== i()))}
									>
										✕
									</button>
								</div>
							)}
						</For>
					</div>
					<div class="flex gap-2">
						<button
							class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
							onClick={() => setForList((arr) => [...arr, `Fruit ${arr.length + 1}`])}
						>
							Add
						</button>
						<button
							class="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-400"
							onClick={shuffleForList}
						>
							Shuffle
						</button>
					</div>
					<p class="text-xs text-slate-500">DOM nodes move with their items when shuffled (check DevTools).</p>
				</div>

				{/* <Index> example */}
				<div class="space-y-3">
					<p class="text-sm font-medium text-slate-700 dark:text-slate-200">&lt;Index&gt; — position-based</p>
					<div class="space-y-2">
						<Index each={indexList()}>
							{(value, i) => (
								<div class="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
									<span>
										<span class="text-slate-400">[{i}]</span> {value()}
									</span>
									<button
										class="rounded bg-slate-200 px-2 py-0.5 text-xs hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
										onClick={() => setIndexList((arr) => arr.map((v, idx) => (idx === i ? v + 10 : v)))}
									>
										+10
									</button>
								</div>
							)}
						</Index>
					</div>
					<div class="flex gap-2">
						<button
							class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
							onClick={() => setIndexList((arr) => [...arr, (arr.length + 1) * 100])}
						>
							Add
						</button>
						<button
							class="rounded bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-400"
							onClick={() => setIndexList((arr) => arr.map((v) => v * 2))}
						>
							Double all
						</button>
					</div>
					<p class="text-xs text-slate-500">DOM nodes stay fixed; only text content updates.</p>
				</div>
			</div>

			<CodeBlock>
				{`// <For> — item is the value, index is a getter
<For each={list()}>
  {(item, i) => <div>[{i()}] {item}</div>}
</For>

// <Index> — value is a getter, index is a number
<Index each={list()}>
  {(value, i) => <div>[{i}] {value()}</div>}
</Index>`}
			</CodeBlock>
		</SectionCard>
	);
};
