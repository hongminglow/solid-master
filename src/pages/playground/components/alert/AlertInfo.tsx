export const AlertInfo = (props: { message: string }) => (
	<div class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
		ℹ️ {props.message}
	</div>
);
