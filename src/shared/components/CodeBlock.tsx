import type { Component, JSX } from "solid-js";

type CodeBlockProps = {
	children: JSX.Element;
};

export const CodeBlock = (props: CodeBlockProps) => {
	return (
		<pre class="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-emerald-300 dark:bg-slate-950">
			<code>{props.children}</code>
		</pre>
	);
};
