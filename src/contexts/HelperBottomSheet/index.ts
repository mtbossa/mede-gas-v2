import { createContext, ReactNode } from "react";

interface HelperBottomSheetValues {
	openHelper: (helperComponent: ReactNode) => void;
	closeHelper: () => void;
	isOpen: boolean;
}

export const HelperBottomSheetContext = createContext<HelperBottomSheetValues>({
	isOpen: false,
	openHelper: null,
	closeHelper: null,
});
