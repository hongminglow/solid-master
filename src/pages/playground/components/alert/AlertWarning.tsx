export const AlertWarning = (props: { message: string }) => (
	<div class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
		⚠️ {props.message}
	</div>
);
