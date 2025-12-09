import type { Component } from "solid-js";
import { createSignal, Show } from "solid-js";
import { createForm, minLength, required } from "@modular-forms/solid";
import { useNavigate, useLocation } from "@solidjs/router";

import { useAuth } from "../store/auth";
import { useUI } from "../store/ui-store";

export type LoginForm = {
	email: string;
	password: string;
	remember?: boolean;
};

const Login: Component = () => {
	const { login } = useAuth();
	const { incrementClicks } = useUI();
	const navigate = useNavigate();
	const location = useLocation();

	const [form, { Form, Field }] = createForm<LoginForm>({
		initialValues: { email: "", password: "" },
	});

	const [submitting, setSubmitting] = createSignal(false);
	const [error, setError] = createSignal<string | null>(null);

	const onSubmit = async (values: LoginForm) => {
		setError(null);
		setSubmitting(true);
		try {
			await login(values.email, values.password);
			const redirect = (location.state as { from?: string } | undefined)?.from || "/";
			navigate(redirect, { replace: true });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to sign in");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div class="space-y-6">
			<div class="rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-sm dark:bg-slate-800">
				<p class="font-semibold">Demo credentials</p>
				<p class="text-slate-200">Any email + any password with at least 4 characters.</p>
			</div>

			<Form onSubmit={onSubmit} class="space-y-4">
				<Field name="email" validate={[required("Email is required")]}>
					{(field, props) => (
						<label class="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-200">
							<div>Email</div>
							<input
								{...props}
								value={field.value ?? ""}
								type="email"
								placeholder="you@example.com"
								class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-emerald-500"
							/>
							<Show when={field.error}>
								<p class="text-xs text-rose-500">{field.error}</p>
							</Show>
						</label>
					)}
				</Field>

				<Field name="password" validate={[required("Password is required"), minLength(4, "Min 4 characters")]}>
					{(field, props) => (
						<label class="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-200">
							<div>Password</div>
							<input
								{...props}
								value={field.value ?? ""}
								type="password"
								placeholder="••••••"
								class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-emerald-500"
							/>
							<Show when={field.error}>
								<p class="text-xs text-rose-500">{field.error}</p>
							</Show>
						</label>
					)}
				</Field>

				<Show when={error()}>
					<div class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-200">
						{error()}
					</div>
				</Show>

				<button
					type="submit"
					disabled={submitting()}
					class="flex mt-2 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{submitting() ? "Signing in…" : "Sign in"}
				</button>
			</Form>

			<div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-inner dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
				<p class="font-semibold">Global store demo</p>
				<p class="text-sm text-slate-600 dark:text-slate-400">
					Clicks are tracked in a global store and reused across the app.
				</p>
				<button
					type="button"
					onClick={incrementClicks}
					class="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:-translate-y-px hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/60"
				>
					Increment global counter
				</button>
			</div>
		</div>
	);
};

export default Login;
