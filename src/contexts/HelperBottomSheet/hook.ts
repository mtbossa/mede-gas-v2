import { useContext } from "react";
import { HelperBottomSheetContext } from ".";

export const useHelperBottomSheetContext = () => {
	return useContext(HelperBottomSheetContext);
};
