import type { Component } from "solid-js";
import { Router, Route, Navigate } from "@solidjs/router";

import { AuthProvider, useAuth } from "./store/auth";
import { UIProvider } from "./store/ui-store";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";

const FallbackRedirect: Component = () => {
	const { isAuthenticated } = useAuth();
	return <Navigate href={isAuthenticated() ? "/" : "/login"} />;
};

const LoginPage: Component = () => (
	<GuestLayout>
		<Login />
	</GuestLayout>
);

const DashboardPage: Component = () => (
	<AuthLayout>
		<Dashboard />
	</AuthLayout>
);

const App: Component = () => {
	return (
		<AuthProvider>
			<UIProvider>
				<Router>
					<Route path="/login" component={LoginPage} />
					<Route path="/" component={DashboardPage} />
					<Route path="*" component={FallbackRedirect} />
				</Router>
			</UIProvider>
		</AuthProvider>
	);
};

export default App;
