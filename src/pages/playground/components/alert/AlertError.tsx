const AlertError = (props: { message: string }) => (
	<div class="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300">
		❌ {props.message}
	</div>
);
