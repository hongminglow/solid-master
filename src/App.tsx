import { Router, Route, Navigate } from "@solidjs/router";
import { AuthProvider, useAuth } from "./store/auth";
import { UIProvider } from "./store/ui-store";
import { Playground } from "./pages/playground/Playground";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { GuestLayout } from "./shared/layout/GuestLayout";
import { AuthLayout } from "./shared/layout/AuthLayout";

const FallbackRedirect = () => {
	const { isAuthenticated } = useAuth();
	return <Navigate href={isAuthenticated() ? "/" : "/login"} />;
};

const LoginPage = () => (
	<GuestLayout>
		<Login />
	</GuestLayout>
);

const DashboardPage = () => (
	<AuthLayout>
		<Dashboard />
	</AuthLayout>
);

const PlaygroundPage = () => (
	<AuthLayout>
		<Playground />
	</AuthLayout>
);

const App = () => {
	return (
		<AuthProvider>
			<UIProvider>
				<Router>
					<Route path="/login" component={LoginPage} />
					<Route path="/" component={DashboardPage} />
					<Route path="/playground" component={PlaygroundPage} />
					<Route path="*" component={FallbackRedirect} />
				</Router>
			</UIProvider>
		</AuthProvider>
	);
};

export default App;
