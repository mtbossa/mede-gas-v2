import React from "react";
import { View, StatusBar as ReactStatusBar } from "react-native";
import { useHelperBottomSheetContext } from "../contexts/HelperBottomSheet/hook";
import { colors } from "../styles/colors";
import AppCalculator from "./Calculator/AppCalculator";

function Pages() {
	const { isOpen: isHelperSheetOpen } = useHelperBottomSheetContext();

	return (
		<>
			<AppCalculator />
			{isHelperSheetOpen && (
				<View
					style={[
						colors.defaultBackgroundColor,
						{
							width: "100%",
							height: "100%",
							opacity: 0.5,
							position: "absolute",
							top: ReactStatusBar.currentHeight,
							left: 0,
						},
					]}
				></View>
			)}
		</>
	);
}

export default Pages;
