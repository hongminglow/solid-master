import type { Component, JSX } from "solid-js";

type SectionCardProps = {
	title: string;
	description?: string;
	children: JSX.Element;
};

export const SectionCard = (props: SectionCardProps) => {
	return (
		<div class="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
			<div class="mb-4">
				<h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{props.title}</h3>
				{props.description && <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{props.description}</p>}
			</div>
			{props.children}
		</div>
	);
};
