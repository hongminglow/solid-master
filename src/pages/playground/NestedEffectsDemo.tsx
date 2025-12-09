import { createSignal, createEffect, For, onCleanup } from "solid-js";

import { SectionCard } from "@/shared/components/SectionCard";
import { CodeBlock } from "@/shared/components/CodeBlock";

export const NestedEffectsDemo = () => {
	const [outerCount, setOuterCount] = createSignal(0);
	const [innerEnabled, setInnerEnabled] = createSignal(true);
	const [logs, setLogs] = createSignal<string[]>([]);

	const addLog = (msg: string) => setLogs((prev) => [...prev.slice(-9), msg]);

	// Outer effect
	createEffect(() => {
		const outer = outerCount();
		addLog(`[Outer] outerCount changed to ${outer}`);

		// Nested effect — only runs when innerEnabled is true
		// When innerEnabled becomes false, this nested effect is disposed
		if (innerEnabled()) {
			createEffect(() => {
				addLog(`  [Inner] Running inside outer (outer=${outer})`);

				onCleanup(() => {
					addLog(`  [Inner] Cleanup (outer was ${outer})`);
				});
			});
		}
	});

	return (
		<SectionCard
			title="6. Nested Effects"
			description="Effects can be nested; inner effects are disposed when outer effect re-runs or when conditions change."
		>
			<div class="space-y-4">
				<div class="flex flex-wrap gap-2">
					<button
						class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
						onClick={() => setOuterCount((c) => c + 1)}
					>
						Increment outer ({outerCount()})
					</button>
					<button
						classList={{
							"rounded px-3 py-1 text-xs font-medium text-white": true,
							"bg-blue-500 hover:bg-blue-400": innerEnabled(),
							"bg-slate-500 hover:bg-slate-400": !innerEnabled(),
						}}
						onClick={() => setInnerEnabled((v) => !v)}
					>
						Inner effect: {innerEnabled() ? "ON" : "OFF"}
					</button>
					<button
						class="rounded bg-slate-400 px-3 py-1 text-xs font-medium text-white hover:bg-slate-300"
						onClick={() => setLogs([])}
					>
						Clear logs
					</button>
				</div>

				<div class="max-h-48 overflow-y-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-300 font-mono dark:bg-slate-950">
					<For each={logs()} fallback={<p class="text-slate-500">No logs yet...</p>}>
						{(log) => <p>{log}</p>}
					</For>
				</div>

				<CodeBlock>
					{`createEffect(() => {
  console.log("Outer effect runs");

  if (condition()) {
    createEffect(() => {
      console.log("Inner effect runs");

      onCleanup(() => {
        console.log("Inner cleanup");
      });
    });
  }
});`}
				</CodeBlock>
			</div>
		</SectionCard>
	);
};
