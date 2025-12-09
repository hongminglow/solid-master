import { createSignal, ErrorBoundary } from "solid-js";

import { SectionCard } from "@/shared/components/SectionCard";
import { CodeBlock } from "@/shared/components/CodeBlock";

const BuggyComponent = (props: { shouldThrow: boolean }) => {
	if (props.shouldThrow) {
		throw new Error("💥 Intentional error from BuggyComponent!");
	}
	return <p class="text-sm text-emerald-600 dark:text-emerald-400">✅ Component rendered without errors.</p>;
};

export const ErrorBoundaryDemo = () => {
	const [shouldThrow, setShouldThrow] = createSignal(false);

	return (
		<SectionCard title="5. Error Boundary" description="Catch errors in child components and render a fallback UI.">
			<div class="space-y-4">
				<button
					class="rounded bg-rose-500 px-3 py-1 text-xs font-medium text-white hover:bg-rose-400"
					onClick={() => setShouldThrow((v) => !v)}
				>
					{shouldThrow() ? "Reset (stop throwing)" : "Trigger error"}
				</button>

				<div class="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
					<ErrorBoundary
						fallback={(err, reset) => (
							<div class="space-y-2">
								<p class="text-sm text-rose-600 dark:text-rose-400">Error caught: {(err as Error).message}</p>
								<button
									class="rounded bg-slate-600 px-3 py-1 text-xs font-medium text-white hover:bg-slate-500"
									onClick={() => {
										setShouldThrow(false);
										reset();
									}}
								>
									Reset boundary
								</button>
							</div>
						)}
					>
						<BuggyComponent shouldThrow={shouldThrow()} />
					</ErrorBoundary>
				</div>

				<CodeBlock>
					{`<ErrorBoundary
  fallback={(err, reset) => (
    <div>
      <p>Error: {err.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  )}
>
  <BuggyComponent />
</ErrorBoundary>`}
				</CodeBlock>
			</div>
		</SectionCard>
	);
};
