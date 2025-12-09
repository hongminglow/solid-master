import type { JSX } from "solid-js";

type StatCardProps = {
	title: string;
	value: string;
	helper?: string | JSX.Element;
};

export const StatCard = (props: StatCardProps) => {
	return (
		<div class="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-px dark:border-slate-800 dark:bg-slate-900/80">
			<p class="text-xs uppercase tracking-[0.2em] text-emerald-500">{props.title}</p>
			<p class="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">{props.value}</p>
			{props.helper && <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{props.helper}</p>}
		</div>
	);
};
