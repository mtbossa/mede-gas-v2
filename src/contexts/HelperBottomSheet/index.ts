import { createContext } from "react";

interface HelperBottomSheetValues {
	state: {
		openHelper: () => void;
		closeHelper: () => void;
	};
}

export const HelperBottomSheetContext =
	createContext<HelperBottomSheetValues>(null);
