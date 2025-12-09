export const AlertSuccess = (props: { message: string }) => (
	<div class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
		✅ {props.message}
	</div>
);
