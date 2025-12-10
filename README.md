## SolidJS auth + dashboard demo

This repo is a compact SolidJS playground tailored for React developers. It highlights the syntax differences, reactivity model, and control-flow helpers that Solid provides while keeping familiar screen flows like login, auth guards, and dashboards.

### What’s inside

- Login flow with guarded routes using `@solidjs/router` (guest vs. authenticated layout)
- Basic auth store (persisted to `localStorage`) and a UI store for theme + global counters
- Form handling and validation with `@modular-forms/solid`
- Data fetching with `createResource` from two public endpoints (users + todos)
- A small dashboard UI with cards, todo list, and global state interactions
- Light/dark toggle with Tailwind v4

### Quickstart

```bash
npm install
npm run dev
# open http://localhost:3000
```

Use any email and any password with 4+ characters to sign in.

### Project structure

- `src/App.tsx`: Router setup, guest/home routing, fallbacks
- `src/layouts/GuestLayout.tsx`: Public shell for login
- `src/layouts/AuthLayout.tsx`: Protected shell + sign-out and theme toggle
- `src/routes/Login.tsx`: Modular-forms login + global click demo
- `src/routes/Dashboard.tsx`: Protected dashboard with data fetching + stats
- `src/store/auth.tsx`: Minimal auth store with persistence
- `src/store/ui-store.tsx`: Global UI preferences store (theme, hints, click counter)
- `src/shared/StatCard.tsx`: Reusable stat card component

### SolidJS patterns shown

- Signals/effects: `createEffect` responds to theme changes
- Context + stores: `AuthProvider` and `UIProvider` wrap the app
- Routing guards: guest layout redirects authenticated users, auth layout redirects guests
- Data fetching: `createResource` + derived data for counts
- Forms: `createForm` with `required` + `minLength` validators and field-level errors

### Playground highlights

- **Global store demo** (`StoreDemo`): shows Solid store path syntax, nested updates with `produce`, and array mutations so React developers can compare to `useReducer` or Zustand-style setters.
- **Control flow demos** (`ConditionalDemo`, `ListRenderingDemo`, `DynamicDemo`): illustrate `<Show>`, `<Switch>`, `<Suspense>`, `<For>`, and `<Dynamic>` in action with concise UI patterns.
- **Error boundary & nested effects**: `ErrorBoundaryDemo` and `NestedEffectsDemo` demonstrate Solid’s granular rendering/disposal for error recovery and cleanup-friendly effects.
- **Data fetching** (`ResourceDemo`): contrasts `createResource`, manual refetch/mutate, and how Solid components stay reactive with async data.
- **Event handling case study** (`EventDemo`): explains the `onClick` (delegated) vs `on:click` (native) distinction from the docs, showcases shared handlers, propagation differences, and how to stop bubbling when you need to.

### Build

```bash
npm run build
npm run preview
```

### Notes for React devs

- Components are functions; hooks like `createSignal`/`createEffect` run outside render cycles.
- JSX is the same, but class bindings use `classList` for conditional classes.
- Routing nests `<Route>` elements directly under `<Router>`; use components for layout composition.
