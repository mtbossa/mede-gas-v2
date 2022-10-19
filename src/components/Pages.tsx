import React from "react";
import { useHelperBottomSheetContext } from "../contexts/HelperBottomSheet/hook";
import AppCalculator from "./Calculator/AppCalculator";
import OpacityOverlay from "./Shared/OpacityOverlay";

function Pages() {
	const { isOpen: isHelperSheetOpen } = useHelperBottomSheetContext();

	return (
		<>
			<AppCalculator />
			{isHelperSheetOpen && <OpacityOverlay />}
		</>
	);
}

export default Pages;
