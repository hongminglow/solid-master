import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { SectionCard } from "@/shared/components/SectionCard";
import { CodeBlock } from "@/shared/components/CodeBlock";
import { AlertSuccess } from "./components/alert/AlertSuccess";
import { AlertWarning } from "./components/alert/AlertWarning";
import { AlertInfo } from "./components/alert/AlertInfo";
import { AlertError } from "./components/alert/AlertError";

const alertComponents = {
	success: AlertSuccess,
	warning: AlertWarning,
	error: AlertError,
	info: AlertInfo,
};

export const DynamicDemo: Component = () => {
	const [alertType, setAlertType] = createSignal<keyof typeof alertComponents>("success");

	return (
		<SectionCard
			title="3. Dynamic Component"
			description="Render different components based on runtime values without conditional chains."
		>
			<div class="space-y-4">
				<div class="flex flex-wrap gap-2">
					<For each={Object.keys(alertComponents) as (keyof typeof alertComponents)[]}>
						{(type) => (
							<button
								classList={{
									"rounded px-3 py-1 text-xs font-medium transition": true,
									"bg-emerald-500 text-white": alertType() === type,
									"bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200":
										alertType() !== type,
								}}
								onClick={() => setAlertType(type)}
							>
								{type}
							</button>
						)}
					</For>
				</div>

				<Dynamic
					component={alertComponents[alertType()]}
					message={`This is a ${alertType()} alert rendered dynamically!`}
				/>

				<CodeBlock>
					{`// Define a map of components
const alertComponents = { success: AlertSuccess, warning: AlertWarning, ... };

// Render based on signal
<Dynamic
  component={alertComponents[alertType()]}
  message="Dynamic prop passed here"
/>`}
				</CodeBlock>
			</div>
		</SectionCard>
	);
};
