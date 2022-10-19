import React from "react";
import { StatusBar, View } from "react-native";
import { colors } from "../../../styles/colors";

function OpacityOverlay() {
	return (
		<View
			style={[
				colors.defaultBackgroundColor,
				{
					width: "100%",
					height: "100%",
					opacity: 0.5,
					position: "absolute",
					top: StatusBar.currentHeight,
					left: 0,
				},
			]}
		></View>
	);
}

export default OpacityOverlay;
