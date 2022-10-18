import { createContext } from "react";

interface HelperBottomSheetValues {
	state: {
		openHelper: (helperText: string) => void;
		closeHelper: () => void;
	};
}

export const HelperBottomSheetContext =
	createContext<HelperBottomSheetValues>(null);
