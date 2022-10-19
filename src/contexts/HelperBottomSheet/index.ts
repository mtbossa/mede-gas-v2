import { createContext, ReactNode } from "react";

interface HelperBottomSheetValues {
	openHelper: (helperComponent: ReactNode) => void;
	closeHelper: () => void;
}

export const HelperBottomSheetContext =
	createContext<HelperBottomSheetValues>(null);
