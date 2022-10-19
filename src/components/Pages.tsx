import React from "react";
import { View, StatusBar as ReactStatusBar } from "react-native";
import { useHelperBottomSheetContext } from "../contexts/HelperBottomSheet/hook";
import { colors } from "../styles/colors";
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
