import React from "react";
import {AppProvider} from "./context/AppContext";
import {AnalyticsProvider} from "./context/AnalyticsContext";
import {AppShell} from "./components/layout/AppShell";
import {PopupManager} from "./components/popup";
import {FloatingCartButton} from "./components/layout/FloatingCartButton";
import {AppRouter} from "./AppRouter";
import "./styles/global.css";

const App: React.FC = () => {
	return (
		<AnalyticsProvider>
			<AppProvider>
				<AppShell>
					<AppRouter />
					<FloatingCartButton />
					<PopupManager />
				</AppShell>
			</AppProvider>
		</AnalyticsProvider>
	);
};

export default App;
