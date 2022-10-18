import { createContext } from "react";

export const HelperBottomSheetContext = createContext<{
	openHelper?: () => void;
}>({});
