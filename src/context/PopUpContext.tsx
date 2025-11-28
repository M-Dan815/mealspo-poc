import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";
import {PopupType} from "../types";

interface PopupContextType {
	currentPopup: PopupType;
	showPopup: (type: PopupType) => void;
	hidePopup: () => void;
	hasSeenInitialPopup: boolean;
	setHasSeenInitialPopup: (value: boolean) => void;
	emailSubmitted: boolean;
	setEmailSubmitted: (value: boolean) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{children: React.ReactNode}> = ({
	children,
}) => {
	const [currentPopup, setCurrentPopup] = useState<PopupType>(null);
	const [hasSeenInitialPopup, setHasSeenInitialPopup] = useState(false);
	const [emailSubmitted, setEmailSubmitted] = useState(false);

	const showPopup = useCallback((type: PopupType) => {
		setCurrentPopup(type);
	}, []);

	const hidePopup = useCallback(() => {
		setCurrentPopup(null);
	}, []);

	// Show initial popup after 20 seconds
	useEffect(() => {
		if (hasSeenInitialPopup) return;

		const timer = setTimeout(() => {
			if (!hasSeenInitialPopup) {
				showPopup("email");
			}
		}, 20000);

		return () => clearTimeout(timer);
	}, [hasSeenInitialPopup, showPopup]);

	return (
		<PopupContext.Provider
			value={{
				currentPopup,
				showPopup,
				hidePopup,
				hasSeenInitialPopup,
				setHasSeenInitialPopup,
				emailSubmitted,
				setEmailSubmitted,
			}}
		>
			{children}
		</PopupContext.Provider>
	);
};

export const usePopup = (): PopupContextType => {
	const context = useContext(PopupContext);
	if (!context) {
		throw new Error("usePopup must be used within PopupProvider");
	}
	return context;
};
