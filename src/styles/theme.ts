export const theme = {
	colors: {
		primary: "#FF6B35",
		primaryLight: "#FF8C5A",
		primaryDark: "#E55A2B",
		secondary: "#2D3748",
		background: "#FFFFFF",
		backgroundSecondary: "#F7F8FA",
		backgroundTertiary: "#EDF2F7",
		text: "#1A202C",
		textSecondary: "#718096",
		textLight: "#A0AEC0",
		border: "#E2E8F0",
		success: "#48BB78",
		error: "#F56565",
		warning: "#ED8936",
		overlay: "rgba(0, 0, 0, 0.5)",
		white: "#FFFFFF",
		black: "#000000",
	},
	spacing: {
		xs: "4px",
		sm: "8px",
		md: "16px",
		lg: "24px",
		xl: "32px",
		xxl: "48px",
	},
	borderRadius: {
		sm: "8px",
		md: "12px",
		lg: "16px",
		xl: "24px",
		full: "9999px",
	},
	shadows: {
		sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
		md: "0 4px 6px rgba(0, 0, 0, 0.07)",
		lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
		xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
	},
	typography: {
		fontFamily:
			"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
		sizes: {
			xs: "12px",
			sm: "14px",
			md: "16px",
			lg: "18px",
			xl: "20px",
			xxl: "24px",
			xxxl: "32px",
		},
		weights: {
			normal: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
		},
	},
	transitions: {
		fast: "150ms ease",
		normal: "250ms ease",
		slow: "350ms ease",
	},
	zIndex: {
		dropdown: 100,
		modal: 200,
		popup: 300,
		toast: 400,
	},
};

export type Theme = typeof theme;
