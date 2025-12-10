import { StoreDemo } from "./StoreDemo";
import { ConditionalDemo } from "./ConditionalDemo";
import { DynamicDemo } from "./DynamicDemo";
import { ListRenderingDemo } from "./ListRenderingDemo";
import { EventDemo } from "./EventDemo";
import { ErrorBoundaryDemo } from "./ErrorBoundaryDemo";
import { NestedEffectsDemo } from "./NestedEffectsDemo";
import { ResourceDemo } from "./ResourceDemo";

export const Playground = () => {
	return (
		<div class="space-y-8">
			<div>
				<p class="text-xs uppercase tracking-[0.2em] text-emerald-500">Solid Concepts</p>
				<h1 class="text-2xl font-semibold text-slate-900 dark:text-slate-50">Playground</h1>
				<p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
					Interactive examples of SolidJS patterns — stores, control flow, effects, and data fetching.
				</p>
			</div>

			<StoreDemo />
			<ConditionalDemo />
			<DynamicDemo />
			<ListRenderingDemo />
			<ErrorBoundaryDemo />
			<NestedEffectsDemo />
			<ResourceDemo />
			<EventDemo />
		</div>
	);
};
