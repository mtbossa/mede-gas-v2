import React from "react";
import { StatusBar, View } from "react-native";
import { colors } from "../../../styles/colors";

function OpacityOverlay() {
	return (
		<View
			style={[
				{
					backgroundColor: colors.defaultBackground,
					width: "100%",
					height: "100%",
					opacity: 0.5,
					position: "absolute",
					left: 0,
				},
			]}
		></View>
	);
}

export default OpacityOverlay;
