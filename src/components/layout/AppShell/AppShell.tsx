import React from "react";
import {BottomNav} from "../BottomNav";
import styles from "./AppShell.module.css";

interface AppShellProps {
	children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({children}) => {
	return (
		<div className={styles.appShell}>
			<div className={styles.content}>{children}</div>
			<BottomNav />
		</div>
	);
};
