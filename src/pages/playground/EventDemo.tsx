import { Show, For, createSignal } from "solid-js";

import { SectionCard } from "@/shared/components/SectionCard";
import { CodeBlock } from "@/shared/components/CodeBlock";

const eventItems = [
	{ label: "Primary action", detail: "Handles form submissions" },
	{ label: "Secondary action", detail: "Opens a tooltip" },
	{ label: "Tertiary action", detail: "Navigates to docs" },
];

const MAX_LOG_ENTRIES = 8;

export const EventDemo = () => {
	const [activityLog, setActivityLog] = createSignal<string[]>([]);
	const [delegatedHits, setDelegatedHits] = createSignal(0);
	const [nativeHits, setNativeHits] = createSignal(0);
	const [bubbleHits, setBubbleHits] = createSignal(0);

	const logEvent = (message: string) => setActivityLog((prev) => [message, ...prev].slice(0, MAX_LOG_ENTRIES));

	const handleDelegatedClick = (event: MouseEvent) => {
		const button = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>("[data-item]");
		if (!button) return;
		setDelegatedHits((n) => n + 1);
		logEvent(`Delegated onClick (shared) ➜ ${button.dataset.item}`);
	};

	const handleNativeContainerClick = () => {
		setBubbleHits((n) => n + 1);
		logEvent("Parent on:click received bubbled event");
	};

	const handleNativeClick = (event: MouseEvent, label: string, stop = false) => {
		if (stop) event.stopPropagation();
		setNativeHits((n) => n + 1);
		logEvent(stop ? `Native on:click ➜ ${label} (stopPropagation)` : `Native on:click ➜ ${label} (bubbles)`);
	};

	return (
		<SectionCard
			title="8. Event Handling — Delegation vs Native"
			description="Compare one delegated listener against per-element handlers and see how propagation changes."
		>
			<div class="space-y-6">
				<div class="grid gap-3 sm:grid-cols-3">
					<div class="rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
						<p class="text-xs uppercase tracking-[0.2em] text-emerald-500">Delegated (onClick)</p>
						<p class="mt-1 font-semibold text-slate-900 dark:text-slate-100">1 listener on document</p>
						<p class="text-xs text-slate-500">Solid wires this to document and dispatches to children.</p>
					</div>
					<div class="rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
						<p class="text-xs uppercase tracking-[0.2em] text-amber-500">Native (on:click)</p>
						<p class="mt-1 font-semibold text-slate-900 dark:text-slate-100">Direct listeners</p>
						<p class="text-xs text-slate-500">Attached to the element; stopPropagation works as expected.</p>
					</div>
					<div class="rounded-xl border border-slate-200 bg-white/80 p-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
						<p class="text-xs uppercase tracking-[0.2em] text-sky-500">Counts</p>
						<p class="mt-1 text-xs text-slate-600 dark:text-slate-300">Delegated hits: {delegatedHits()}</p>
						<p class="text-xs text-slate-600 dark:text-slate-300">Native hits: {nativeHits()}</p>
						<p class="text-xs text-slate-600 dark:text-slate-300">Parent bubbles: {bubbleHits()}</p>
					</div>
				</div>

				<div class="space-y-2">
					<p class="text-sm font-medium text-slate-700 dark:text-slate-200">Delegated handler (onClick)</p>
					<p class="text-xs text-slate-500">
						One container listener handles every child click (less memory, no repeated closures). Changing the DOM
						structure keeps the single handler.
					</p>
					<div
						class="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
						onClick={handleDelegatedClick}
					>
						<For each={eventItems}>
							{(item) => (
								<button
									data-item={item.label}
									class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
								>
									{item.label}
								</button>
							)}
						</For>
					</div>
				</div>

				<div class="space-y-2">
					<p class="text-sm font-medium text-slate-700 dark:text-slate-200">Native handlers + propagation (on:click)</p>
					<p class="text-xs text-slate-500">
						Each button owns its handler. The outer container logs bubbled clicks unless a child calls{" "}
						<code>stopPropagation</code>.
					</p>
					<div
						class="space-y-2 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
						on:click={handleNativeContainerClick}
					>
						<div class="flex flex-wrap gap-2">
							<button
								class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-amber-300 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
								on:click={(event) => handleNativeClick(event, "Native (bubbles)")}
							>
								Native (bubbles)
							</button>
							<button
								class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600 shadow-sm transition hover:bg-rose-100"
								on:click={(event) => handleNativeClick(event, "Native (stopPropagation)", true)}
							>
								Native (stopPropagation)
							</button>
						</div>
						<p class="text-[0.7rem] text-slate-500">Notice the parent log only when bubbling is allowed.</p>
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
					<p class="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500">Event log</p>
					<ul class="mt-2 space-y-1">
						<For each={activityLog()}>{(entry) => <li class="text-[0.68rem]">{entry}</li>}</For>
						<Show when={activityLog().length === 0}>
							<li class="text-[0.68rem] text-slate-400">Click the buttons to see propagation differences.</li>
						</Show>
					</ul>
				</div>

				<CodeBlock>
					{`// Delegated (onClick): Solid attaches once to document
<div onClick={handleDelegatedClick}>
	<button data-item="Primary">Primary</button>
	<button data-item="Secondary">Secondary</button>
</div>

// Native (on:click): direct listener; stopPropagation works as expected
<div on:click={handleNativeContainerClick}>
	<button on:click={(e) => handleNativeClick(e, "bubbles")}>Bubbles</button>
	<button on:click={(e) => handleNativeClick(e, "stops", true)}>Stops</button>
</div>`}
				</CodeBlock>
			</div>
		</SectionCard>
	);
};
