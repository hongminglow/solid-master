import type { Component } from "solid-js";
import { createSignal, Show, Switch, Match } from "solid-js";
import { SectionCard } from "@/shared/components/SectionCard";
import { CodeBlock } from "@/shared/components/CodeBlock";

export const ConditionalDemo: Component = () => {
	const [status, setStatus] = createSignal<"idle" | "loading" | "success" | "error">("idle");
	const [showDetails, setShowDetails] = createSignal(false);

	return (
		<SectionCard
			title="2. Conditional Rendering — Show / Switch / Match"
			description="Solid provides declarative control flow components for conditional rendering."
		>
			<div class="space-y-4">
				{/* Show example */}
				<div class="space-y-2">
					<p class="text-sm font-medium text-slate-700 dark:text-slate-200">&lt;Show&gt; with fallback</p>
					<button
						class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
						onClick={() => setShowDetails((v) => !v)}
					>
						Toggle details
					</button>
					<div class="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
						<Show
							when={showDetails()}
							fallback={<p class="text-sm text-slate-500">Details hidden. Click to reveal.</p>}
						>
							<p class="text-sm text-emerald-600 dark:text-emerald-400">
								🎉 Details are now visible! This content only renders when showDetails() is true.
							</p>
						</Show>
					</div>
				</div>

				{/* Switch / Match example */}
				<div class="space-y-2">
					<p class="text-sm font-medium text-slate-700 dark:text-slate-200">&lt;Switch&gt; / &lt;Match&gt;</p>
					<div class="flex flex-wrap gap-2">
						<button
							class="rounded bg-slate-500 px-3 py-1 text-xs font-medium text-white hover:bg-slate-400"
							onClick={() => setStatus("idle")}
						>
							Idle
						</button>
						<button
							class="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-400"
							onClick={() => setStatus("loading")}
						>
							Loading
						</button>
						<button
							class="rounded bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-400"
							onClick={() => setStatus("success")}
						>
							Success
						</button>
						<button
							class="rounded bg-rose-500 px-3 py-1 text-xs font-medium text-white hover:bg-rose-400"
							onClick={() => setStatus("error")}
						>
							Error
						</button>
					</div>
					<div class="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
						<Switch fallback={<p class="text-sm text-slate-500">Unknown status</p>}>
							<Match when={status() === "idle"}>
								<p class="text-sm text-slate-600 dark:text-slate-300">⏸️ Status: Idle — waiting for action</p>
							</Match>
							<Match when={status() === "loading"}>
								<p class="text-sm text-blue-600 dark:text-blue-400">⏳ Status: Loading — please wait...</p>
							</Match>
							<Match when={status() === "success"}>
								<p class="text-sm text-emerald-600 dark:text-emerald-400">✅ Status: Success — operation completed!</p>
							</Match>
							<Match when={status() === "error"}>
								<p class="text-sm text-rose-600 dark:text-rose-400">❌ Status: Error — something went wrong</p>
							</Match>
						</Switch>
					</div>
				</div>

				<CodeBlock>
					{`// <Show> — renders children when condition is truthy
<Show when={showDetails()} fallback={<p>Hidden</p>}>
  <p>Visible content</p>
</Show>

// <Switch> / <Match> — like switch/case
<Switch fallback={<p>Default</p>}>
  <Match when={status() === "loading"}>Loading...</Match>
  <Match when={status() === "success"}>Done!</Match>
  <Match when={status() === "error"}>Failed</Match>
</Switch>`}
				</CodeBlock>
			</div>
		</SectionCard>
	);
};
